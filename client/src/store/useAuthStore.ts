import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

type SignInData = {
  email: string;
  password: string;
};

type SignUpData = SignInData & {
  name: string;
};

type AuthUser = {
  email: string;
  name: string;
  profilePic: string;
  createdAt: string;
};

type AuthStore = {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isSigningIn: boolean;
  isUpdatingProfilePic: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfilePic: (data: object) => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isUpdatingProfilePic: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in checkAuth:", error);

      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data: Object) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      console.error("An error occurred:", error);

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error((error as Error).message);
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  signIn: async (data: Object) => {
    set({ isSigningIn: true });
    try {
      const res = await axiosInstance.post("/signIn", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("An error occurred:", error);

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error((error as Error).message);
      }
    } finally {
      set({ isSigningIn: false });
    }
  },

  signOut: async () => {
    try {
      await axiosInstance.post("/logout");
      set({ authUser: null });

      toast.success("Logged out successfully");
    } catch (error) {
      console.error("An error occurred:", error);

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error((error as Error).message);
      }
    }
  },

  updateProfilePic: async (data: object) => {
    set({ isUpdatingProfilePic: true });
    try {
      const res = await axiosInstance.put("/updateUserProfilePic", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("An error occurred:", error);

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error((error as Error).message);
      }
    } finally {
      set({ isUpdatingProfilePic: false });
    }
  },
}));
