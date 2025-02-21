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
      <Card className="w-[360px] z-20">
        <CardHeader>
          <CardTitle className="text-center">Profile</CardTitle>
          <span className="text-sm text-center">
            This is how others will see you on the site.
          </span>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={selectedImg || authUser.profilePic || avatar}
              alt="user Avatar"
              className="size-32 rounded-full object-cover border-4"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-500 ${
                isUpdating ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="size-5 text-[var(--color-b1)] border-2 rounded-full" />
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
          <p className="text-center text-sm">
            {isUpdating ? "working on it....." : "Click on the camera"}
          </p>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-start font-medium">Full Name</span>
              <p className="px-4 py-2 rounded-lg border">
                {authUser?.fullName}
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-start font-medium">Email</span>
              <p className="px-4 py-2 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
