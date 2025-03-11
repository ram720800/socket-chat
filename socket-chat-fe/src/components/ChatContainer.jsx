import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { MessageSkeleton } from "./Animation";
import { formatMessageTime } from "@/lib/utils";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]);

  if (isMessagesLoading) {
    return (
      <div className="w-full flex flex-1 flex-col mt-4 bg-[var(--color-bl3)] text-[var(--color-wl1)] relative">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-1 flex-col mt-4 bg-[var(--color-bl3)] text-[var(--color-wl1)] relative">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="mx-4 mt-4">
          <div className="">
            <img
              src={selectedUser.profilePic || "/sc_mini.svg"}
              alt={selectedUser.fullName}
              className="size-20 rounded-full object-cover border-1 border-bl1 bg-bl3 "
            />
          </div>
        </div>
        <div className="space-y-2 mx-4 mt-4">
          <h4 className="font-semibold text-wl1 text-3xl">
            {selectedUser.fullName}
          </h4>
          <p className="text-lg4 text-sm mt-4">{`This is the beginning of your direct message history with ${selectedUser.fullName}.`}</p>
        </div>
        <div className="my-6 mx-4 w-auto h-[0.1px] bg-bl2 shadow-2xl"></div>

        {messages.map((message) => (
          <div key={message._id} 
          >
            <div className="space-y-4 flex gap-3 items-start mx-1">
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || "/sc_mini.svg"
                    : selectedUser.profilePic || "/sc_mini.svg"
                }
                alt="profile pic"
                className="size-12 rounded-full object-cover bg-[var(--color-bl3)]"
              />
              <div>
                <div className="flex mx-2">
                  <div className="font-medium text-md">
                    {message.senderId === authUser._id
                      ? authUser.fullName
                      : selectedUser.fullName}
                  </div>
                  <div className="mx-2">
                    <time className="text-xs opacity-25">
                      {formatMessageTime(message.createdAt)}
                    </time>
                  </div>
                </div>
                <div className="mx-2 flex flex-col">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="message"
                      className="sm:max-w-[200px] rounded-lg mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
