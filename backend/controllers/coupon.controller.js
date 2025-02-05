import Coupon from "../models/coupon.model.js";

export const getCoupon = async(req, res) => {
    try {
        const userId = req.user._id;
        
        const coupon = await Coupon.findOne({userId: userId, isActive: false});
        if(!coupon){
            return res.status(200).json({message: "No available coupon"})
        };

        return res.status(200).json(coupon);
    } catch (error) {
        console.log("Error in getCoupon controller: ", error.message);
        res.status(500).json({message: error.message})
    }
};

export const validateCoupon = async(req, res) => {
    try {
        const {code} = req.body;
        const userId = req.user._id;

        const coupon = await Coupon.findOne({cod: code, isActive: true, userId: userId});
        if(!coupon){
            return res.status(200).json({message: "Coupon is not validate"})
        };

        if(coupon.expireDate < new Date()){
            coupon.isActive = false;
            await coupon.save();

            return res.status(200).json({message: "Coupon already expired"})
        };

        return res.status(200).json({
            message: "Coupon is available",
            coupon: {
                code: coupon.code,
                discountPercentage: coupon.discountPercentage,

            }
        });
    } catch (error) {
        console.log('Error in  coupon controller: ', error.message);
        res.status(500).json({message: error.message})
    };
};