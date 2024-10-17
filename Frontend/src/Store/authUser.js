import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    isSigningIn: false, 
    isCheckingAuth: false,
    isLoggingOut: false,
    isLoggingIn: false,
    signup: async(credentials) => {
        set({ isSigningIn: true });
        try{
            const response = await axios.post("/api/auth/signup", credentials);
            set({ user: response.data.user, isSigningIn: false });
            toast.success("Account created successfully");
        }catch(error){
            toast.error(error.response.data.message || "Signup failed");
            console.error("Error signing up:", error);
            set({ isSigningIn: false, user: null });
            throw error;
        }
    },
    login: async(credentials) => {
        set({ isLoggingIn: true });
        try{
            const response = await axios.post("/api/auth/login", credentials);
            set({ user: response.data.user, isLoggingIn: false });
            toast.success("Logged in successfully");
        }catch(error){
            toast.error(error.response.data.message || "Login failed");
            console.error("Error logging in:", error);
            set({ isLoggingIn: false, user: null });
            throw error;
        }
    },
    logout: async() => {
        set({ isLoggingOut: true });
        try{
            await axios.post("/api/auth/logout");
            set({ user: null, isLoggingOut: false });
            toast.success("Logged out successfully");
        }catch(error){
            console.error("Error logging out:", error);
            toast.error("Error logging out");
            set({ isLoggingOut: false });
            throw error;
        }    
    },
    authCheck: async() => {
        set({ isCheckingAuth: true });
        try{
            const response = await axios.get("/api/auth/authCheck");
            set({ user: response.data.user, isCheckingAuth: false });
        }catch(error){
            console.error("Error checking authentication:", error);
            set({ isCheckingAuth: false,user: null });
            throw error;
        }
    },
}));