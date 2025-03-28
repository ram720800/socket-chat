import { create } from "zustand";
import { instance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:3000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isUpdating: false,
  isMeAuth: true,
  selectedImg: null,
  onlineUsers: [],
  socket: null,

  setSelectedImg: (img) => set({ selectedImg: img }),

  me: async () => {
    try {
      const res = await instance.get("/auth/me");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in auth", error);
      set({ authUser: null });
    } finally {
      set({ isMeAuth: false });
    }
  },
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await instance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  signIn: async (data) => {
    set({ isSigningIn: true });
    try {
      const res = await instance.post("/auth/signin", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isSigningIn: false });
    }
  },
  logOut: async () => {
    try {
      await instance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error("An error occurred");
    }
  },
  updating: async (data) => {
    set({ isUpdating: true });
    try {
      const res = await instance.put("/auth/update", data);
      set((state) => ({
        authUser: {
          ...state.authUser,
          ...res.data,
          profilepic: res.data.profilepic || state.authUser.profilepic,
        },
      }));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdating: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: { userId: authUser._id },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("onlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
