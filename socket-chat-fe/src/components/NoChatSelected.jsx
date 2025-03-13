import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { useState } from "react";

const NoChatSelected = () => {
  const { users, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [allUsers, setAllUsers] = useState(false);

  return (
    <div className="w-full flex flex-1 flex-col mt-4 bg-[var(--color-bl3)] relative">
      <div className="w-full absolute top-0 size-12 bg-[var(--color-bl2)]">
        <div className="flex justify-start items-center gap-x-2 mx-1 py-2">
          <img src="/images/sc_friends.svg" alt="friends" className="size-6" />
          <div className="font-medium text-[var(--color-wl1)] mx-2">
            Friends
          </div>
          <div className="w-[0.1px] h-6 rounded-md bg-bl1 shadow-2xl"></div>
          <div className="relative z-50 hover:bg-bl3 border-1 border-g2 cursor-pointer rounded-md py-0.5 px-3">
            <button className="text-wl1 text-sm font-medium">Online</button>
          </div>
          <div className="relative z-50 hover:bg-bl3 cursor-pointer rounded-md py-0.5 px-3">
            <button
              className="text-wl1 text-sm font-medium"
              onClick={() => setAllUsers(!allUsers)}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div>
        {allUsers ? (
          <>
            <p className="absolute z-50 top-12 text-wl3 text-xs font-semibold mx-4 mt-2">
              All Members - {users.length}
            </p>
            <div className="overflow-y-auto flex flex-col items-center mt-20">
              {users.map((user) => (
                <div
                  key={user._id}
                  className={`w-[420px] lg:w-[600px] xl:w-[640px] 2xl:w-[900px] flex items-center justify-between px-4 py-4 gap-2 rounded-lg hover:bg-bl2 hover:bg-opacity-80 transition-all duration-3 my-1 z-50 border-t border-lg4 hover:border-0`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative size-10">
                      <img
                        src={user.profilePic || "/sc_mini.svg"}
                        alt={user.fullName}
                        className="size-full rounded-full object-cover"
                      />
                      <span
                        className={`absolute size-4 bottom-0 right-0 rounded-full ${
                          onlineUsers.includes(user._id)
                            ? "bg-[var(--color-g1)] border-4 border-[var(--color-bl1)]"
                            : "bg-[var(--color-lg4)] border-4 border-[var(--color-bl2)]"
                        } `}
                      ></span>
                    </div>
                    <div>
                      <p className="font-semibold text-md text-wl1">
                        {user.fullName}
                      </p>
                    </div>
                  </div>
                  <button
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className="p-2 bg-bl3 hover:bg-bl1 cursor-pointer z-100 rounded-full"
                  >
                    <img src="images/chat.svg" alt="chat" className="size-5" />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center my-20">
            <div className="w-96 flex flex-col items-center mx-auto mt-20">
              <img
                src="/images/nochat_sc1.png"
                alt="noChat"
                className="w-[100%]"
              />
            </div>
            <p className="body-1 mx-auto">
              There are no friends online at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoChatSelected;
