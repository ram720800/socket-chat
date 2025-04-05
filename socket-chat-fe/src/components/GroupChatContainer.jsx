import { useGroupStore } from "@/store/useGroupStore";
import { getRandomUserBg } from "@/lib/utils";
import { useState } from "react";
import AddMemberDialog from "./AddMemberDialog";
import GroupMembersContainer from "./GroupMembersContainer";
import GroupMessageContainer from "./GroupMessageContainer";

const GroupChatContainer = () => {
  const { selectedGroup, setSelectedGroup } = useGroupStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);

  return (
    <div className="w-full flex flex-1 flex-col bg-[var(--color-bl3)] relative">
      <div className="flex items-center justify-between gap-2 w-[100%] size-12 bg-[var(--color-bl3)] drop-shadow-2xl">
        <div className="flex items-center gap-2">
          <button
            className="relative z-100"
            onClick={() => setSelectedGroup(null)}
          >
            <img
              src="/images/arrow.png"
              alt="back"
              className="size-6 cursor-pointer"
            />
          </button>
          <div>
            <img
              src={selectedGroup.avatar || "/sc_mini.svg"}
              alt={selectedGroup.groupName}
              className={`size-7 rounded-full object-cover border-[var(--color-dg3)] ${getRandomUserBg(
                selectedGroup._id
              )}`}
            />
          </div>

          <div>
            <h5 className="font-medium text-wl1">{selectedGroup.groupName}</h5>
          </div>
        </div>
        <div className="flex items-center gap-6 mx-4">
          <div className="group relative">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="cursor-pointer"
          >
            <img src="/images/add.svg" alt="add-memebers" className="size-6" />
            </button>
            <div className="absolute right-[1rem] top-10 transform -translate-y-1/2 bg-bl1 text-wl1 text-sm font-semibold px-3 py-1 rounded opacity-0 scale-90 group-hover:opacity-100 whitespace-nowrap group-hover:scale-100 transition-all duration-300 max-sm:hidden pointer-events-none z-1">
            Add Members
          </div>
          </div>
          <div className="group relative">
          <button
            onClick={() => setIsGroupOpen(!isGroupOpen)}
            className="cursor-pointer"
          >
            <img
              src="/images/members1.svg"
              alt="memebers"
              className="size-6 mt-1"
            />
            </button>
            <div className="absolute right-[1rem] top-10 transform -translate-y-1/2 bg-bl1 text-wl1 text-sm font-semibold px-3 py-1 rounded opacity-0 scale-90 group-hover:opacity-100 whitespace-nowrap group-hover:scale-100 transition-all duration-300 max-sm:hidden pointer-events-none z-1">
            Group Members
          </div>
            </div>
        </div>
      </div>

      {isDialogOpen && (
        <AddMemberDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}

      {isGroupOpen ? (
        <GroupMembersContainer />
      ) : (
        <GroupMessageContainer/>
      )}
      
    </div>
  );
};

export default GroupChatContainer;
