import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../store/useAuthStore.js";
import { Camera } from "lucide-react";
import { Loader } from "lucide-react";
import { useAvatar } from "@/components/avatar.jsx";
import { Link } from "react-router-dom";

export const ProfilePage = () => {
  const {
    authUser,
    updating,
    isUpdating,
    selectedImg,
    setSelectedImg,
    logOut,
  } = useAuthStore();
  const avatar = useAvatar();

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
      <div className="bg-[url('/sc_bg_img.png')] bg-center bg-cover w-full h-screen absolute ]">
      </div>
      <div className="absolute z-50 top-14 right-96">
      <Link to="/chat">
          <img src="/images/cross.svg" alt="cross" className="size-5" />
        </Link>
      </div>
      <Card className="w-[360px] z-20 bg-[var(--color-bl2)] border-none mt-4 fixed max-lg:mt-10 max-lg:w-[300px]">
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
              className={`absolute bottom-0 right-0 hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-500`}
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
            {isUpdating ? (
              <>
                <Loader className="s-10 animate-spin" />
              </>
            ) : (
              ""
            )}
          </p>
          <div className="space-y-4">
            <div className="flex flex-row items-center rounded-sm bg-[var(--color-bl1)] w-auto p-2 mx-auto">
              <div className="relative">
                <img
                  src={selectedImg || authUser.profilePic || avatar}
                  alt="user Avatar"
                  className="size-8 rounded-full object-cover border-[var(--color-dg3)] bg-[var(--color-bl3)]"
                />
                <span className=" absolute size-4 bottom-0 right-0 bg-[var(--color-g1)] rounded-full border-4 border-[var(--color-bl1)] translate-y-[0.4rem] translate-x-[0.2rem]" />
              </div>

              <div className="flex flex-col ml-4 items-start">
                <span className="text-[var(--color-wl2)] text-sm font-medium mx-3 -ml-0">
                  {authUser?.fullName}
                </span>
                <span className="text-[var(--color-wl3)] text-xs">
                  {authUser?.email}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="bg-[var(--color-bl1)] w-auto mx-auto pr-20 p-2 rounded-sm">
            <p className="text-[var(--color-wl2)] font-medium text-sm text-start">
              Member Since
            </p>
            <div className="flex mt-2">
              <div>
                <img src="/sc_mini.svg" alt="mini" className="w-4 h-4 mr-2" />
              </div>
              <p className="text-[var(--color-wl3)] text-xs text-start ">
                {authUser.createdAt?.split("T")[0]}
              </p>
            </div>
          </div>
        </CardFooter>
        <div className="ml-22 mb-6">
          <span className="text-xs text-[var(--color-wl1)] font-medium uppercase">
            Account removal
          </span>
          <div>
            <Button
              onClick={logOut}
              className="text-wl1 w-26 h-7 text-xs font-medium !bg-[var(--color-bl1)] hover:!bg-[var(--color-r3)] !border-[var(--color-r3)] border-[1px]"
            >
              Disable Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
