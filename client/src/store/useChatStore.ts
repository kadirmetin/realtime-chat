import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

type Message = {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
};

type ChatStore = {
  messages: Message[] | null;
  users: User[] | null;
  selectedUser: string | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  onlineUsers: [];
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (selectedUser: string) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  messages: null,
  users: null,
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  onlineUsers: [],

  getUsers: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await axiosInstance.get("/users");

      set({ users: res.data.filteredUsers });
    } catch (error) {
      console.error("An error occurred:", error);

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error((error as Error).message);
      }
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(`/messages/${userId}`);

      set({ messages: res.data });
    } catch (error) {
      console.error("An error occurred:", error);

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error((error as Error).message);
      }
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser: (selectedUser: string) => set({ selectedUser }),
}));
