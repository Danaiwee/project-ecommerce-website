import {create} from 'zustand';
import toast from 'react-hot-toast';

import axios from '../lib/axios.js';

export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,

    setProducts: (products) => set({products}),

    createProduct: async({name, description, price, category, image}) => {
        set({loading: true})
        try {
            if(!name || !description || !price || !category || !image){
                set({loading: false});
                return toast.error("All fields are required");
            };

            const res = await axios.post("/products/create", {
                name,
                description,
                price,
                category,
                image
            });

            set((state) => ({
                products: [...state.products, res.data],
                loading: false
            }));
            
            toast.success("Created product successfully");

        } catch (error) {
            set({loading: false})
            console.log("Error in createProduct: ", error.message);
            throw new Error(error.message);
        }
    },

    fetchAllProducts: async () => {
        set({loading: true});
        try {
            const res = await axios.get("/products");

            set({products: res.data.products, loading: false});
        } catch (error) {
            set({loadin: false})
            console.log("Error in fetchAllProducts useProductStore: ", error.message);
            throw new Error(error.message)
        }
    },

    toggleFeatured: async(productId) => {
        set({loading: true})
        try {
            const res = await axios.patch(`/products/${productId}`);

            set((state) => ({
                products: state.products.map((product) => product._id === productId ? {...product, isFeatured: res.data.isFeatured} : product),
                loading: false
            }));
        } catch (error) {
            set({loading: false})
            console.log("Error in toggleFeatured: ", error.message);
            throw new Error(error.message);
        }
    },

    deleteProduct: async(productId) => {
        set({loading: true});
        try {
            await axios.delete(`/products/${productId}`);
            set((state) => ({
                products: state.products.filter((product) => product._id !== productId),
                loading: false
            }));
            toast.success("Deleted product successfully");

        } catch (error) {
            set({loading: false})
            console.log("Error in deleteProduct: ", error.message);
            throw new Error(error.message);
        }
    },
}))