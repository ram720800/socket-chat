import { create } from "zustand";
import { instance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isUpdating: false,
  isMeAuth: true,

  me: async () => {
    try {
      const res = await instance.get("/auth/me");
      set({ authUser: res.data });
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  signIn: async (data) => {
    set({ isSigningIn: true });
    try {
      const res = await instance.post("/auth/signin", data, {withCredentials: true});
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningIn: false });
    }
  },
  logOut: async () => {
    try {
      await instance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("An error occurred");
    }
  },
  updating: async (data) => {
    set({ isUpdating: true });
    try {
      const res = await instance.put("/auth/update", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdating: false });
    }
  },
}));
