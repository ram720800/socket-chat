import { useChatStore } from "@/store/useChatStore";
import { ChatSkeleton } from "@/components/Animation";
import { useEffect } from "react";
import { User } from "lucide-react";

const Sidebar = () => {
  const { users, selectedUser, isUsersLoading, getUsers, setSelectedUser } =
    useChatStore();

  const onlineUsers = [];

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <ChatSkeleton />;

  return (
    <aside className="flex flex-col h-full w-20 lg:w-72 transition-all duration-500 border-r rounded-tl-lg mt-4 bg-[var(--color-bl2)]">
      <div className="border-b-2 border-[var(--color-bl1)] w-full p-2">
        <span className="uppercase font-bold text-xs text-[var(--color-lg4)] mx-4">
          direct messages
        </span>
        <div className="flex justify-centre items-start gap-x-2 mx-2 my-4">
            <img
              src="/images/sc_friends.svg"
              alt="friends"
              className="size-6"
            />
            <div className="font-medium hidden lg:block text-[var(--color-lg4)] mx-2">
              Friends
          </div>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
      </div>
    </aside>
  );
};

export default Sidebar;
