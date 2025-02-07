import {create} from 'zustand';
import toast from 'react-hot-toast';

import axios from '../lib/axios.js';

export const useCartStore = create((set, get) => ({
    cart: [],
    coupon: null,
    total: 0,
    subtotal: 0,
    isCouponApplied: false,

    addToCart: async (product) => {
        try {
            await axios.post("/cart", {productId: product._id});
            toast.success("Added to cart successfully");

            set((prevState) => {
				const existingItem = prevState.cart.find((item) => item._id === product._id);
				const newCart = existingItem
					? prevState.cart.map((item) =>
							item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
					  )
					: [...prevState.cart, { ...product, quantity: 1 }];
				return { cart: newCart };
			});

            get().calculateTotals();
        } catch (error) {
            console.log("Error in addToCart useCartStore: ", error.message);
            throw new Error(error.message);
        }
    },

    calculateTotals: () => {
        const {cart, coupon} = get();
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let total = subtotal;

        if(coupon){
            const discount = total * coupon.discountPercentage/100;
            total = subtotal - discount;
        };

        set({total, subtotal});

    },
}));