import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "../store/useAuthStore.js";
import { useEffect, useState } from "react";
import { Camera } from "lucide-react";

export const ProfilePage = () => {
  const { authUser, updating, isUpdating } = useAuthStore();
  const [avatar, setAvatar] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);

  const getRandomAvatar = () => {
    return `https://api.dicebear.com/8.x/lorelei/svg?seed=${Math.random()}&format=png`;
  };

  useEffect(() => {
    if (!authUser.profilePic) {
      setAvatar(getRandomAvatar());
    }
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64 = reader.result;
      setSelectedImg(base64);
      await updating({ profilePic: base64 });
    };
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen g2">
      <div className="bg-[url('/sc_bg_img.png')] bg-center bg-cover w-full h-screen absolute ]"></div>
      <Card className="w-[360px] z-20 bg-[var(--color-bl2)] border-none ">
        <CardHeader>
          <CardTitle className="text-center font-bold  text-[var(--color-wl2)] text-2xl">
            Profile
          </CardTitle>
          <span className="text-sm text-center text-[var(--color-wl2)]">
            This is how others will see you on the site.
          </span>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={selectedImg || authUser.profilePic || avatar}
              alt="user Avatar"
              className="size-32 rounded-full object-cover bg-[var(--color-bl1)]"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-500 ${
                isUpdating ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="size-5 text-[var(--color-wl1)] rounded-full" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdating}
              />
            </label>
          </div>
          <p className="text-center text-sm text-[var(--color-wl2)]">
            {isUpdating ? "working on it....." : "Click on the camera"}
          </p>
        </CardContent>
        <CardFooter className="space-y-2">
          <div className="flex justify-evenly items-center rounded-sm bg-[var(--color-bl1)] w-auto p-2 mx-auto">
          <img
            src={selectedImg || authUser.profilePic || avatar}
            alt="user Avatar"
            className="size-8 rounded-full object-cover border-[var(--color-dg3)] bg-[var(--color-bl3)]"
          />
          <span className=" absolute size-2 bg-[var(--color-g1)] rounded-full -translate-x-[5.6rem] translate-y-[0.8rem] " />
          <p className="text-[var(--color-wl2)] text-sm font-bold mx-3">
            {authUser?.fullName}
          </p>
          <span className="text-[var(--color-wl3)] text-xs">
            {authUser?.email}
            </span>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
};
