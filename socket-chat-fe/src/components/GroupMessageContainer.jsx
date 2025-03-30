import { useGroupStore } from "@/store/useGroupStore";
import { useAuthStore } from "@/store/useAuthStore";
import { formatMessageTime, getRandomUserBg } from "@/lib/utils";
import { MessageSkeleton } from "./Animation";
import { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";

const GroupMessageContainer = () => {
  const {
    groupMessages,
    selectedGroup,
    getGroupMessages,
    isMessagesLoading,
    subscribeToGroupMessage,
    unSubscribeToGroupMessage,
  } = useGroupStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedGroup?._id) return;
    getGroupMessages(selectedGroup._id);
    subscribeToGroupMessage(selectedGroup._id);

    return () => unSubscribeToGroupMessage();
  }, [
    selectedGroup?._id,
    getGroupMessages,
    subscribeToGroupMessage,
    unSubscribeToGroupMessage,
  ]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [groupMessages]);

  if (isMessagesLoading) {
    return (
      <div className="w-full flex flex-1 flex-col mt-4 bg-[var(--color-bl3)] text-[var(--color-wl1)] relative">
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="mx-4 mt-4">
            <div>
              <img
                src={selectedGroup.avatar || "/sc_mini.svg"}
                alt={selectedGroup.groupName}
                className={`size-20 rounded-full object-cover border-1 border-bl1 ${getRandomUserBg(
                  selectedGroup._id
                )}`}
              />
            </div>
          </div>
          <div className="space-y-2 mx-4 mt-4">
            <h4 className="font-semibold text-wl1 text-3xl">
              {`Welcom to ${selectedGroup.groupName}'s group.`}
            </h4>
            <p className="text-wl3 text-sm mt-4">{`This is your brand new, shiny group`}</p>
          </div>
        </div>
        <div className="my-6 mx-4 w-auto h-[0.1px] bg-wl3/80 shadow-2xl"></div>

        {groupMessages.map((message) => (
          <div
            key={message._id}
            ref={messageEndRef}
            className="hover:bg-bl2 p-2 rounded-md text-wl1"
          >
            <div className="flex gap-3 items-start mx-1">
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || "/sc_mini.svg"
                    : message.senderId.profilePic || "/sc_mini.svg"
                }
                alt="profile"
                className={`size-12 rounded-full object-cover ${getRandomUserBg(
                  message.senderId._id
                )}`}
              />
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-md">
                    {message.senderId === authUser._id
                      ? authUser.fullName
                      : message.senderId.fullName}
                  </span>
                  <time className="text-xs opacity-25 mx-2">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
                <div className="mt-1">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="message"
                      className="sm:max-w-[200px] rounded-lg mb-2"
                    />
                  )}
                  {message.text && <p className="text-sm">{message.text}</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </>
  );
};

export default GroupMessageContainer;
