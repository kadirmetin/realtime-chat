import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export type Message = {
  _id: string;
  senderId: string;
  createdAt: Date | undefined;
  text: string;
  image: string | null;
};

type User = {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
};

type ChatStore = {
  messages: Message[];
  users: User[] | null;
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (selectedUser: User | null) => void;
  sendMessage: (message: Message) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeToMessages: () => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  users: null,
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

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

      set({ messages: res.data.messages });
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

  sendMessage: async (message: Message) => {
    const { selectedUser, messages } = get();

    try {
      const res = await axiosInstance.post(
        `/send/${selectedUser?._id}`,
        message
      );

      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.error("An error occurred:", error);

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error((error as Error).message);
      }
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    // Önceki dinleyicileri temizle
    socket?.off("newMessage");

    // Yeni mesaj dinleyicisini ekle
    socket?.on("newMessage", (newMessage: Message) => {
      const currentMessages = get().messages;
      // Mesajın zaten var olup olmadığını kontrol et
      const messageExists = currentMessages.some(
        (msg) => msg._id === newMessage._id
      );

      if (!messageExists) {
        set({
          messages: [...currentMessages, newMessage],
        });
      }
    });

    // Debug için
    console.log(
      "Socket message subscription active for user:",
      selectedUser._id
    );
  },

  unsubscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;

    socket?.off("newMessage");
  },

  setSelectedUser: (selectedUser: User | null) => set({ selectedUser }),
}));
