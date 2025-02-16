import { create } from "zustand";
import {instance} from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isUpadating: false,
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
}));
