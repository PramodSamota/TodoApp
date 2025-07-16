import { create } from "zustand";
import axiosInstance from "@/utils/axios";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  // Add other user properties as needed
}

interface AuthState {
  authUser: User | null;
  error: string | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  isLoggingOut: boolean;
  isAuthenticated: boolean;
  
  // Auth methods
  getMe: () => void;
  signUp: (credentials: SignUpCredentials) => void;
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
  clearError: () => void;
}

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  error: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  isLoggingOut: false,
  isAuthenticated: false,

  getMe: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const res = await axiosInstance.get("/auth/getMe");
      console.log("res",res.data); 
      set({ 
        authUser: res.data,
        isAuthenticated: true 
      });
      return res.data.data;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch user",
        isAuthenticated: false 
      });
      return null;
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (credentials) => {
    set({ isSigningUp: true, error: null });
    try {
         console.log("Signup data being sent:", credentials);
      console.log(
        "Request URL:",
        axiosInstance.defaults.baseURL + "/auth/register"
      );
      const res = await axiosInstance.post("/auth/register", credentials);
      console.log("authUser", res.data.data);
     return { success: true, user: res.data.data };
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Signup failed" 
      });
       const errorMessage =error.response?.data?.message || "login failed";
      return {success:false,error:errorMessage}
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true, error: null });
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      set({ 
        authUser: res.data.data,
        isAuthenticated: true 
      });
      console.log("authUser", res.data.data);
      return { success: true, user: res.data.data };
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || "Login failed" 
      });
      const errorMessage =error.response?.data?.message || "login failed";
      return {success:false,error:errorMessage}
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
     const res= await axiosInstance.post("/auth/logout");
      set({ 
        authUser: null,
        isAuthenticated: false 
      });
      return { success: true, user: res.data.data };
    } catch (error: any) {
        set({ 
            error: error.response?.data?.message || "Logout failed" 
        });
        const errorMessage =error.response?.data?.message || "Logout failed";
      return {success:false,error:errorMessage}
    } finally {
      set({ isLoggingOut: false });
    }
  },

  clearError: () => set({ error: null }),
}));