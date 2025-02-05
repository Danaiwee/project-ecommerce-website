import {create} from 'zustand';
import toast from 'react-hot-toast';

import axios from '../lib/axios.js';

export const useUserStore = create((set, get) => ({
    user: null,
    isLoading: false,
    isChekingAuth: true,

    signup: async({name, email, password, confirmPassword}) => {
        set({isLoading: true})
        try {
            if(!name || !email || !password || !confirmPassword){
                set({isLoading: false})
                return toast.error("All fields are required")
            };

            if(password !== confirmPassword){
                set({isLoading: false})
                return toast.error("Both password must be matched")
            };

            const res = await axios.post("/auth/signup", {name, email, password});
            set({user: res.data, isLoading: false})
        } catch (error) {
            console.log("Error in signup useUserStore: ", error.message);
            throw new Error(error.message)
        }
    },

    login: async({email, password}) => {
        set({isLoading: true})
        try {
            if(!email || !password){
                set({isLoading: false});
                return toast.error("Invalid credentials")
            };

            const res = await axios.post("/auth/login", {email, password});
            set({user: res.data, isLoading: false});
        } catch (error) {
            toast.error("Invalid credentials");
            set({isLoading: false});
            console.log("Error in login useUserStore: ", error.message);
            throw new Error(error.message);
        };
    },

    logout: async() => {
        set({isLoading: true})
        try {
            await axios.post("/auth/logout");
            set({user: null, isLoading: false});
            toast.success("Logged out successfully");
        } catch (error) {
            console.log("Error in logout useUserStore: ", error.message);
            throw new Error(error.message);
        }
    },

    checkAuth: async() => {
        set({isChekingAuth: true})
        try {
            const res = await axios.get("/auth/profile");
            set({user: res.data, isCheckingAuth: false});
        } catch (error) {
            console.log("Error in checkAuth: ", error.message);
            throw new Error(error.message);
        }
    }
}));