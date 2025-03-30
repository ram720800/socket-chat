import { useChatStore } from "@/store/useChatStore";
import { useGroupStore } from "@/store/useGroupStore";
import CreateServerModel from "./CreateServerModel";
import { SocketSkeleton } from "./Animation";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { getRandomUserBg } from "@/lib/utils";

const Socket = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const {
    groups,
    getGroups,
    isGroupsLoading,
    selectedGroup,
    setSelectedGroup,
  } = useGroupStore();
  const [isCreatedServerOpen, setIsCreatedServerOpen] = useState(false);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  const handelSelectGroup = (group) => {
    setSelectedGroup(group);
    setSelectedUser(null);
  };

  const handelSelectUser = (user) => {
    setSelectedGroup(null);
    setSelectedUser(user);
  };
  return (
    <div
      className={`min-w-[4.5rem] bg-[var(--color-bl1)] overflow-y-auto scroll-hidden ${
        selectedUser || selectedGroup ? "hidden md:block" : "block"
      }`}
    >
      <div className="flex flex-col justify-center items-center gap-y-2.5 mt-1">
        <span className="text-[0.6rem] uppercase font-bold text-[var(--color-lg4)] text-center">
          socket
        </span>

        <div className="group relative flex justify-center items-center">
          <div
            className={`absolute -left-5 size-3 rounded-full bg-wl1 transition-all duration-500 ease-in-out group-hover:h-6 ${
              selectedUser ? "h-10" : ""
            }`}
          ></div>
          <button onClick={() => handelSelectUser(null)}>
            <img
              src="/images/sc_before.svg"
              alt="before"
              className={`size-12 cursor-pointer group-hover:rounded-full transition-all duration-100 ${
                !selectedUser ? "rounded-full" : ""
              }`}
            />
          </button>
          <div className="absolute left-[4rem] top-1/2 transform -translate-y-1/2 bg-bl1 text-wl1 text-sm font-semibold px-3 py-1 rounded opacity-0 scale-90 group-hover:opacity-100 whitespace-nowrap group-hover:scale-100 transition-all duration-300 max-sm:hidden pointer-events-none z-20">
            Direct Messages
          </div>
        </div>

        <div className="w-10 h-0.5 rounded-xl bg-[var(--color-bl3)] mx-1"></div>

        <div className="group relative z-100 flex justify-center items-center">
          <div
            className={`absolute -left-5 size-3 rounded-full bg-wl1 transition-all duration-500 ease-in-out group-hover:h-6 ${
              selectedUser === "Bonfire Bot" ? "h-10" : ""
            }`}
          ></div>
          <button onClick={() => handelSelectUser("Bonfire Bot")}>
            <img
              src="/images/bonfire.svg"
              alt="bot"
              className="size-12 cursor-pointer group-hover:rounded-full transition-all duration-100"
            />
          </button>
          <div className="absolute left-[4rem] top-1/2 transform -translate-y-1/2 bg-bl1 text-wl1 text-sm font-semibold px-3 py-1 rounded opacity-0 scale-90 group-hover:opacity-100 whitespace-nowrap group-hover:scale-100 transition-all duration-300 max-sm:hidden pointer-events-none">
            Bonfire Bot
          </div>
        </div>
        {isGroupsLoading ? (
          <SocketSkeleton />
        ) : (
          groups.map((group) => (
            <div
              key={group._id}
              id={group._id}
              className="group relative z-100 flex justify-center items-center"
            >
              <div
                className={`absolute -left-5 size-3 rounded-full bg-wl1 transition-all duration-500 ease-in-out group-hover:h-6 ${
                  selectedGroup ? "h-10" : ""
                }`}
              ></div>
              <button onClick={() => handelSelectGroup(group)}>
                <img
                  src={group.avatar || "/sc_mini.svg"}
                  alt={group.groupName}
                  className={`size-12 cursor-pointer rounded-xl group-hover:rounded-full transition-all duration-100 ${getRandomUserBg(
                    group._id
                  )}`}
                />
              </button>
              <div className="absolute left-[4rem] top-1/2 transform -translate-y-1/2 bg-bl1 text-wl1 text-sm font-semibold px-3 py-1 rounded opacity-0 scale-90 group-hover:opacity-100 whitespace-nowrap group-hover:scale-100 transition-all duration-300 max-sm:hidden pointer-events-none">
                {group.groupName}
              </div>
            </div>
          ))
        )}
        <div className="relative">
          <div className="group relative z-10">
            <button
              className="rounded-xl bg-bl3 hover:bg-b1 p-3 cursor-pointer transition-all duration-300"
              onClick={() => setIsCreatedServerOpen(true)}
            >
              <Plus className="size-6 rounded-full bg-wl1" />
            </button>
          </div>
          <div className="absolute left-[4rem] top-1/2 transform -translate-y-1/2 bg-bl1 text-wl1 text-sm font-semibold px-3 py-1 rounded opacity-0 scale-90 group-hover:opacity-100 whitespace-nowrap group-hover:scale-100 transition-all duration-300 max-sm:hidden pointer-events-none z-20">
            Add group
          </div>
        </div>

        {isCreatedServerOpen && (
          <CreateServerModel
            isOpen={isCreatedServerOpen}
            onClose={() => setIsCreatedServerOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Socket;
