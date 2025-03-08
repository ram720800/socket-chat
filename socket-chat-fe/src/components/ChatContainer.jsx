import { useChatStore } from "@/store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { MessageSkeleton } from "./Animation";
import { useEffect } from "react";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

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
      <p>message...</p>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
