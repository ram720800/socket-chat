import { useChatStore } from "@/store/useChatStore";
import { useGroupStore } from "@/store/useGroupStore";
import { ChatSkeleton } from "./Animation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "react-router-dom";
import { getRandomUserBg } from "@/lib/utils";

const Sidebar = () => {
  const { users, selectedUser, isUsersLoading, getUsers, setSelectedUser } =
    useChatStore();
  const { onlineUsers, authUser, selectedImg } = useAuthStore();
  const { selectedGroup } = useGroupStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <ChatSkeleton />;

  return (
    <aside
      className={`h-full w-[354px] md:w-64 border-r-2 border-[var(--color-bl1)] rounded-tl-lg mt-4 bg-[var(--color-bl2)] ${
        selectedUser || selectedGroup ? "hidden md:block" : "block"
      }`}
    >
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
      <div className="h-[calc(100vh-180px)] overflow-y-auto scroll-hidden">
        <div className="w-[354px] md:w-64 py-3">
          {users.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`p-3 flex items-center gap-2 transition-colors w-full rounded-lg hover:bg-bl3 my-1
              ${selectedUser?._id === user._id ? "bg-[var(--color-dg3)]" : ""}`}
            >
              <div className="relative">
                <img
                  src={user.profilePic || "/sc_mini.svg"}
                  alt={user.fullName}
                  className={`size-10 rounded-full object-cover ${getRandomUserBg(
                    user._id
                  )}`}
                />
                <span
                  className={`absolute size-4 bottom-0 right-0 rounded-full ${
                    onlineUsers.includes(user._id)
                      ? "bg-[var(--color-g1)] border-4 border-[var(--color-bl1)]"
                      : "bg-[var(--color-lg4)] border-4 border-[var(--color-bl2)]"
                  } `}
                ></span>
              </div>
              <div className="text-left ml-2 relative">
                <div className="font-medium text-md text-[var(--color-lg4)]">
                  {user.fullName}
                </div>
                <div className="font-medium text-[10px] text-[var(--color-lg4)]">
                  {user.interests}
                </div>
              </div>
            </button>
          ))}
          <div className="mt-10 w-[354px] md:w-64 h-auto bottom-0 fixed">
            <div className="p-2 bg-[var(--color-dg3)] flex items-center justify-between">
              <Link to="/profile" className="flex-shrink-0">
                <div className="flex items-center hover:bg-bl3 rounded p-1 cursor-pointer">
                  <div className="relative size-10">
                    <img
                      src={selectedImg || authUser.profilePic || "/sc_mini.svg"}
                      alt="user Avatar"
                      className={`size-full rounded-full object-cover border-[var(--color-dg3)] ${getRandomUserBg(
                        authUser._id
                      )}`}
                    />
                    <span className="absolute size-4 bottom-0 right-0 bg-[var(--color-g1)] rounded-full border-4 border-[var(--color-bl1)]" />
                  </div>

                  <div className="leading-none mt-2 min-w-0 flex-1">
                    <p className="text-[var(--color-wl2)] text-sm font-medium mx-3 truncate w-28">
                      {authUser?.fullName}
                    </p>
                    <p className="text-xs text-[var(--color-wl3)] mx-3">
                      Online
                    </p>
                  </div>
                </div>
              </Link>
              <div className="max-sm:mr-12">
                <Link to="/profile" className="flex-shrink-0">
                  <div className="hover:bg-bl3 p-1 rounded">
                    <img src="/images/gear.svg" alt="gear" className="size-5" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
