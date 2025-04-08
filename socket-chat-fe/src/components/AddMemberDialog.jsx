import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGroupStore } from "@/store/useGroupStore";
import { useEffect, useState } from "react";
import { getRandomUserBg } from "@/lib/utils";

const AddMemberDialog = ({ isOpen, onClose }) => {
  const { selectedGroup, fetchGroupUsers, users, addMemberToGroup } =
    useGroupStore();
  const [loadingUserId, setLoadingUserId] = useState(null);

  useEffect(() => {
    if (isOpen && selectedGroup) {
      fetchGroupUsers(selectedGroup._id);
    }
  }, [isOpen, selectedGroup]);

  const handelAddMember = async (groupId, userId) => {
    setLoadingUserId(userId);
    await addMemberToGroup(groupId, userId);
    setLoadingUserId(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[320px] md:w-[400px] bg-bl2 txt-wl1 rounded-xl z-250">
        <DialogHeader>
          <DialogTitle className="text-wl1 text-start text-lg">
            Create your Group
          </DialogTitle>
          <p className="text-wl2 text-sm">{`# ${selectedGroup.description}`}</p>
        </DialogHeader>
        <div className="mt-4">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-2 hover:bg-bl3 rounded-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="relative size-10">
                    <img
                      src={user.profilePic || "/sc_mini.svg"}
                      alt={user.fullName}
                      className={`size-full rounded-full object-cover ${getRandomUserBg(
                        user._id
                      )}`}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-wl3">{user.fullName}</p>
                  </div>
                </div>
                <Button
                  key={user._id}
                  className="bg-bl2 hover:bg-g1 border border-g2 w-16 rounded-lg text-wl2 cursor-pointer"
                  onClick={() => handelAddMember(selectedGroup._id, user._id)}
                  disabled={loadingUserId === user._id}
                >
                  {loadingUserId === user._id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-wl1"></div>
                  ) : (
                    "Add"
                  )}
                </Button>
              </div>
            ))
          ) : (
            <p className="text-wl3 text-sm">No users available to add.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;
