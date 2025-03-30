import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGroupStore } from "@/store/useGroupStore";
import { Plus } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const CreateServerModel = ({ isOpen, onClose }) => {
  const [step, SetStep] = useState(1);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);
  const { createGroup, loading } = useGroupStore();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64 = reader.result;
      setAvatar(base64);
    };
  };

  const handelCreateGroup = async () => {
    if (!groupName.trim()) {
      toast.error("Group name is required");
      return;
    }
    /* const formData = new FormData();
    formData.append("groupName", groupName);
    formData.append("description", description);
    formData.append("avatar", avatar);
 */
    const groupData = {
      groupName,
      description,
      avatar,
    };
    await createGroup(groupData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[320px] md:w-[400px] bg-bl2 txt-wl1 rounded-xl z-50">
        {step === 1 ? (
          <div className="text-center">
            <DialogHeader>
              <DialogTitle className="text-wl1 text-center text-2xl">
                Create your Group
              </DialogTitle>
            </DialogHeader>
            <p className="my-4 text-wl2 text-sm">
              Your group is where you and your friends discuss. Make yours and
              start chatting.
            </p>
            <Button
              className="w-full text-wl1 bg-bl3 flex items-center justify-between cursor-pointer shadow-2xl"
              onClick={() => SetStep(2)}
            >
              <div className="flex items-center gap-4">
                <img src="/images/pencil.svg" alt="pencil" />
                <div className="text-lg4 font-light text-sm">Creat My Own</div>
              </div>
              <div>
                <ChevronRight className="size-4 text-lg4" />
              </div>
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <DialogHeader>
              <DialogTitle className="text-2xl text-wl1 text-center">
                Customize Your group
              </DialogTitle>
            </DialogHeader>
            <p className="text-wl2 my-4 text-sm">
              Give your new group a personality with a name and an icon
            </p>
            <div className="flex flex-col items-center gap-2 mb-4">
              <input
                type="file"
                id="avatarUpload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <label htmlFor="avatarUpload" className="cursor-pointer">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar-preview"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-2 border-wl3 border-dashed flex items-center justify-center text-xs font-bold text-wl3">
                      UPLOAD
                    </div>
                    <span className="absolute rounded-full bg-db2 top-1 right-1">
                      <Plus className="size-4" />
                    </span>
                  </div>
                )}
              </label>
            </div>
            <div className="mb-4">
              <div className="text-start uppercase text-wl2 text-xs font-bold mb-1">
                Group Name
              </div>
              <Input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group name"
                className="bg-bl1 text-wl1 border-none"
              />
            </div>
            <div className="mb-4">
              <div className="text-start uppercase text-wl2 text-xs font-bold mb-1">
                description
              </div>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's this group about?"
                className="bg-bl1 text-wl1 border-none"
              />
            </div>
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => SetStep(1)}
                className="text-wl1 font-bold text-xs cursor-pointer"
              >
                Back
              </button>
              <Button
                onClick={handelCreateGroup}
                className="p-1 rounde-md bg-b1 hover:bg-db2 text-wl1 cursor-pointer w-32"
              >
                {loading ? (
                  <Loader className="s-7 animate-spin" />
                ) : (
                  "Create group"
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModel;
