import { useChatStore } from "@/store/useChatStore";
import { ChatSkeleton } from "@/components/Animation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useAvatar } from "@/components/avatar.jsx";

const Sidebar = () => {
  const { users, selectedUser, isUsersLoading, getUsers, setSelectedUser } =
    useChatStore();
  const { onlineUsers, authUser, selectedImg } = useAuthStore();
  const avatar = useAvatar();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <ChatSkeleton />;

  return (
    <aside className="flex flex-col h-full w-20 lg:w-64 transition-all duration-500 border-r-2 border-[var(--color-bl1)] rounded-tl-lg mt-4 bg-[var(--color-bl2)] ">
      <div className="w-full p-2 h-28 border-b-2 border-[var(--color-bl1)]">
        <p className="uppercase font-bold text-xs text-[var(--color-lg4)] mx-4">
          direct messages
        </p>
        <div className="relative top-5 z-50">
          <button
            className="w-full h-auto py-3 pl-2 bg-dg3 hover:bg-bl3 rounded-md cursor-pointer flex items-center justify-start gap-2"
            onClick={() => setSelectedUser(null)}
          >
            <img src="/images/sc_friends.svg" alt="friend" className="size-6" />
            <p className="text-wl3 font-medium text-md">Friends</p>
          </button>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`p-3 flex items-center gap-2 transition-colors w-full rounded-lg hover:bg-bl3 my-1
              ${selectedUser?._id === user._id ? "bg-[var(--color-dg3)]" : ""}`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/sc_mini.svg"}
                alt={user.fullName}
                className="size-10 rounded-full object-cover"
              />
              {onlineUsers.includes(user._id) ? (
                <span className="absolute size-4 bottom-0 right-0 bg-[var(--color-g1)] rounded-full border-4 border-[var(--color-bl1)]"></span>
              ) : (
                <span className="absolute size-4 bottom-0 right-0 bg-[var(--color-lg4)] rounded-full border-4 border-[var(--color-bl2)]"></span>
              )}
            </div>
            <div className="text-left min-w-0 ml-2">
              <div className="font-medium text-md text-[var(--color-lg4)]">
                {user.fullName}
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="w-20 lg:w-64 transition-all duration-500 bottom-0 fixed p-2 bg-[var(--color-dg3)] my-2">
        <div className="flex justify-start items-center">
          <div className="relative">
            <img
              src={selectedImg || authUser.profilePic || avatar}
              alt="user Avatar"
              className="size-12 rounded-full object-cover border-[var(--color-dg3)] bg-[var(--color-bl3)]"
            />
            <span className="absolute size-4 bottom-0 right-0 bg-[var(--color-g1)] rounded-full border-4 border-[var(--color-bl1)]" />
          </div>
          <div className="flex flex-col justify-center leading-none mt-2 ">
            <span className="text-[var(--color-wl2)] text-md font-medium mx-3">
              {authUser?.fullName}
            </span>
            <span className="text-sm text-[var(--color-wl3)] mx-3">Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
