import { useGroupStore } from "@/store/useGroupStore";
import { Crown } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
const GroupMembersContainer = () => {
  const {
    fetchGroupMembers,
    groupMembers,
    removeMember,
    disableGroup,
    selectedGroup,
  } = useGroupStore();
  const [isAdmin, setIsAdmin] = useState(false);
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (selectedGroup) {
      fetchGroupMembers(selectedGroup._id); 
      fetchGroupMembers(selectedGroup._id).then(() => {
        const updatedGroup = useGroupStore.getState().groupMembers; 
        const adminCheck = updatedGroup.find(
          (member) => member.userId._id === authUser._id && member.role === "admin"
        );
        setIsAdmin(!!adminCheck);
      });
    }
  }, [selectedGroup, authUser]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="text-wl1 text-xl font-extrabold uppercase mb-4">
        Group Members
      </div>
      {groupMembers.length === 0 ? (
        <p className="text-wl3 font-medium text-lg text-center">
          No members found
        </p>
      ) : (
        <ul className="space-y-4">
          {groupMembers.map((member) => (
            <li
              key={member.userId._id}
              className="flex items-center justify-between p-4 bg-bl1/30 hover:bg-bl2 rounded-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.userId.profilePic}
                  alt={member.userId.fullName}
                  className="size-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-wl3 text-sm">{member.userId.fullName}</p>
                  <p className="text-amber-300">
                    {member.role === "admin" ? <Crown size={12} /> : ""}
                  </p>
                </div>
              </div>
              <Button
                className="bg-bl2 border border-r3 hover:bg-r3 rounded-md p-2 text-wl2 text-xs"
                key={member.userId._id}
                onClick={() =>
                  removeMember(selectedGroup._id, member.userId._id)
                }
                disabled={!isAdmin}
              >
                Remove Member
              </Button>
            </li>
          ))}
        </ul>
      )}
      {isAdmin && (
        <div>
          <div className="uppercase text-xs text-wl3 font-bold my-1">
            Group removal
          </div>
          <p className="text-wl3 text-xs mb-2">
            Disabling group means you cannot recover it at any time after taking
            this action
          </p>
          <Button
            className="bg-bl2 border border-r3 hover:bg-r3 rounded-md p-2 text-wl2 text-xs"
            onClick={() => disableGroup(selectedGroup._id)}
          >
            Disable Group
          </Button>
        </div>
      )}
    </div>
  );
};

export default GroupMembersContainer;
