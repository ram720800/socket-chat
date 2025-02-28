import { create } from "zustand";
import { instance } from "@/lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await instance.get("/messages/users", data);
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (opponentId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await instance.get(`/messages/${opponentId}`, data);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
