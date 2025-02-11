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
    },

    refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
}));

//TODO: Implement the axios intercepter for refreshing access token
let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
)