import axios from "axios";
import { toast } from "react-toastify";
import { io, Socket } from "socket.io-client";
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
  _id: string;
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
  socket?: Socket;
  onlineUsers: [];
  checkAuth: () => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfilePic: (data: object) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
};

const API_URL = import.meta.env.VITE_SOCKET_URL;

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isUpdatingProfilePic: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: undefined,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error in checkAuth:", error);

      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data: object) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/signup", data);

      set({ authUser: res.data });

      toast.success("Account created successfully");

      get().connectSocket();
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

  signIn: async (data: object) => {
    set({ isSigningIn: true });
    try {
      const res = await axiosInstance.post("/signIn", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
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

      get().disconnectSocket();
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

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket: Socket = io(API_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
}));
