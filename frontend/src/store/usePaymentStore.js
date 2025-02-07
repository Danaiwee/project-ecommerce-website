import {create} from 'zustand';

import axios from 'axios';
import { stripePromise } from '../lib/stripe.js';

export const usePaymentStore = create(() => ({
    createCheckoutSession: async (cart, coupon) => {
        try {
            const stripe = await stripePromise;

            const res = await axios.post("/payments/create-checkout-session", {
                products: cart,
                couponCode: coupon ? coupon : null
            });

            const session = res.data;
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if(result.error){
                console.log("Error in resultSession: ", result.error);
            }

        } catch (error) {
            console.log("Error in createCheckoutSession: ", error.message);
            throw new Error(error.message)
        }
    },
}))