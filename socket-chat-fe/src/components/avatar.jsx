import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import getRandomAvatar from "@/lib/getRandomAvatar.js";

export const useAvatar = () => {
  const { authUser } = useAuthStore();
  const [avatar, setAvatar] = useState("");
  
  useEffect(() => {
    if (!authUser.profilePic) {
      setAvatar(getRandomAvatar());
    }
  }, [authUser]);

  return avatar;
};
