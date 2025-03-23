import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { getRandomUserBg } from "@/lib/utils.js";

export const ProfilePage = () => {
  const {
    authUser,
    updating,
    isUpdating,
    selectedImg,
    setSelectedImg,
    logOut,
  } = useAuthStore();

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
      <div className="bg-[url('/sc_bg_img.png')] bg-center bg-cover w-full h-screen absolute"></div>

      <Card className="w-[300px] md:w-[600px] transition-all delay-5 bg-bl3 border-none mt-4 relative">
        <Link
          to="/chat"
          className="absolute z-50 top-2 right-2 p-1 rounded-full border-2 border-wl3 transition"
        >
          <X className="size-5 text-wl3" />
        </Link>
        <CardHeader>
          <CardTitle className="text-start font-bold text-[var(--color-wl2)] text-2xl">
            <div>My Account</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 bg-bl1 rounded-b-md">
            <div className="bg-r3 w-full rounded-t-md">
              <img
                src={selectedImg || authUser.profilePic || "/sc_mini.svg"}
                alt="user Avatar"
                className={`relative top-14 left-4 size-24 rounded-full object-cover border-[6px] border-bl1 ${getRandomUserBg(authUser._id)}`}
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute right-8 my-2 hover:scale-105 p-1 rounded-sm cursor-pointer transition-all duration-500 bg-b1 hover:bg-db2 text-wl1 text-sm max-sm:text-xs font-medium`}
              >
                {isUpdating ? (
                  <>
                    <Loader className="s-7 animate-spin" />
                  </>
                ) : (
                  "Edit User Profile"
                )}
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
            <div className="w-full">
            <div className="bg-bl2 h-auto rounded-md p-4 mt-12 mx-3 mb-3">
              <div className="uppercase text-start font-bold text-xs text-wl3 mb-0.5">
                Display Name
              </div>
              <div className=" text-sm text-wl1 font-normal mb-2">
                {authUser.fullName}
              </div>
              <div className="uppercase text-start font-bold text-xs text-wl3 mb-0.5">
                email
              </div>
              <div className=" text-sm text-wl1 font-normal mb-2">
                {authUser.email}
              </div>
              <div className="uppercase text-start font-bold text-xs text-wl3 mb-0.5">
                Your interests
              </div>
              <div className=" text-sm text-wl1 font-normal mb-2">
                {authUser?.interests || "#User"}
              </div>
            </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-2">
          <div className="mx-7 mb-4">
            <div className="uppercase text-start font-bold text-xs text-wl3 mb-0.5">
              member since
            </div>
            <div className=" text-sm text-wl1 font-normal mb-2">
              {authUser.createdAt?.split("T")[0]}
            </div>
            <div className="uppercase text-xs text-wl3 font-bold my-1">
              Account removal
            </div>
            <p className="text-wl3 text-xs mb-2">Disabling account means you can recover it at any time after taking this action</p>
            <div>
              <Button
                onClick={logOut}
                className="text-wl1 w-26 h-7 text-xs font-medium !bg-[var(--color-bl1)] hover:!bg-[var(--color-r3)] !border-[var(--color-r3)] border-[1px] cursor-pointer"
              >
                Disable Account
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
