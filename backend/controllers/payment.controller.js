import Coupon from "../models/coupon.model.js";
import {stripe} from '../lib/stripe.js';
import Order from "../models/order.model.js";


export const createCheckoutSession = async (req, res) => {
    try {
        const {products, couponCode} = req.body;

        //check products === array || products is empty
        if(!Array.isArray(products) || products.length === 0){
            return res.status(400).json({message: "Invalid or empty products"})
        };

        let totalAmount = 0;
        const lineItems = products.map((product) => {
            const amount = Math.round(product.price * 100) //unit = cents
            totalAmount += amount * product.quantity;

            //this is what stripe need
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        image: [product.image]
                    },
                    unit_amount: amount
                },
                quantity: product.quantity || 1
            }
        });

        let coupon = null;
        if(couponCode){
            coupon = await Coupon.findOne({code: couponCode, isActive: true, userId: req.user._id});

            if(coupon){
                totalAmount -= Math.round(totalAmount*coupon.discountPercentage/100);
            }
        };

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHEKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
            discounts: coupon 
                    ? [{coupon: await createStripeCoupon(coupon.discountPercentage)}]
                    : [],
            metadata: {
                userId: req.user._id.toString(),
                couponCode: couponCode || '',
                products: JSON.stringify(
                    products.map((product) => ({
                        id: product.id,
                        quantity: product.quantity,
                        price: product.price
                    }))
                )
            }
        });

        //if total amount > 20000 cents, create coupon for using next time
        if(totalAmount >= 20000){
            await createNewCoupon(req.user._id);
        };
        
        return res.status(200).json({id: session.id, totalAmount: totalAmount/100})
            
    } catch (error) {
        console.log("Error processing checkout: ", error.message);
        res.status(500).json({message: error.message})
    }
};

export const checkoutSuccess = async(req, res) => {
    try {
        const {sessionId} = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if(session.payment_status === 'paid'){
            if(session.metadata.couponCode){
                await Coupon.findOneAndUpdate(
                    {
                        code: session.metadata.couponCode,
                        userId: session.metadata.userId
                    },
                    {
                        isActive: false
                    }
                )
            };

            //create order (after paid)
            const products = JSON.parse(session.metadata.products);
            const newOrder = new Order({
                user: session.metadata.userId,
                products: products.map((product) => ({
                    product: product.id,
                    quantity: product.quantity,
                    price: product.price
                })),
                totalAmount: session.amount_total/100, //convert from cents >>> dollars
                stripeSessionId: sessionId
            });

            await newOrder.save();

            res.status(200).json({
                success: true,
                message: "Payment successful, order created, and coupon deactivated if used",
                orderId: newOrder._id
            });
        }
    } catch (error) {
        console.log("Error in checkoutSucess controller: ", error.message);
        res.status(500).json({message: error.message})
    }
};

async function createStripeCoupon(discountPercentage){
    const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: "once"
    });

    return coupon.id;
};

async function createNewCoupon(userId){
    await Coupon.findOneAndDelete({userId});

    const newCoupon = new Coupon({
        code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        discountPercentage: 10,
        expireDate: new Date(Date.now() + 30*24*60*60*1000),
        userId: userId
    });

    await newCoupon.save();

    return newCoupon;
}