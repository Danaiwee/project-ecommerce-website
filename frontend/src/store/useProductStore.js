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
    }
}))