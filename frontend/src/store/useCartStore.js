import {create} from 'zustand';
import toast from 'react-hot-toast';

import axios from '../lib/axios.js';

export const useCartStore = create((set, get) => ({
    cart: [],
    loading: false,
    coupon: null,
    total: 0,
    subtotal: 0,
    isCouponApplied: false,

    getCartItem: async () => {
        set({loading: true});
        try {
            const res = await axios.get("/cart");

            set({cart: res.data, loading:false});
        } catch (error) {
            set({loading: false});
            console.log("Error in getCartItem useCartStore: ", error.message);
            throw new Error(error.message);
        }
    },

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

    removeFromCart: async (productId) => {
        try {
            await axios.delete("/cart", {data: productId});

            set((state) => ({
                cart: state.cart.filter((item) => item._id !== productId)
            }));

            get().calculateTotals();
            toast.success("Removed item successfully")
        } catch (error) {
            console.log("Error in removeFromCart: ", error.message);
            throw new Error(error.message);
        }
    },

    updateQuantity: async (productId, quantity) => {
        try {
            if(quantity === 0){
                get().removeFromCart(productId);
                return;
            };

            await axios.put(`/cart/${productId}`, {quantity});
            set((state) => ({
                cart: state.cart.map((item) => item._id === productId ? {...item, quantity} : item)
            }));

            get().calculateTotals();
        } catch (error) {
            console.log("Error in updateQuantity: ", error.message);
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