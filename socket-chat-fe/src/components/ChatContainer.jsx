import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { MessageSkeleton } from "./Animation";
import { formatMessageTime, getRandomUserBg } from "@/lib/utils";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { motion } from "motion/react";

const ChatContainer = () => {
  const {
    users,
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    setSelectedUser,
    subscribeToMessages,
    unSubscribeToMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unSubscribeToMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unSubscribeToMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

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
    <>
      {selectedUser && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-1 flex-col mt-4 bg-[var(--color-bl3)] text-[var(--color-wl1)] relative"
        >
          <div className="absolute z-100 cursor-pointer">
            <button onClick={() => setSelectedUser(null)} className="p-2">
              <img
                src="/images/arrow.png"
                alt="arrow back"
                className="size-6 cursor-pointer"
              />
            </button>
          </div>
          <ChatHeader />

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="mx-4 mt-4">
              <div className="">
                <img
                  src={selectedUser.profilePic || "/sc_mini.svg"}
                  alt={selectedUser.fullName}
                  className={`size-20 rounded-full object-cover border-1 border-bl1 ${getRandomUserBg(selectedUser._id)}`}
                />
              </div>
            </div>
            <div className="space-y-2 mx-4 mt-4">
              <h4 className="font-semibold text-wl1 text-3xl">
                {selectedUser.fullName}
              </h4>
              <p className="text-lg4 text-sm mt-4">{`This is the beginning of your direct message history with ${selectedUser.fullName}.`}</p>
            </div>
            <div className="my-6 mx-4 w-auto h-[0.1px] bg-wl3/80 shadow-2xl"></div>

            {messages.map((message) => (
              <div key={message._id} ref={messageEndRef} className="">
                <div className="space-y-4 flex gap-3 items-start mx-1 hover:bg-bl2 p-2 rounded-md">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/sc_mini.svg"
                        : selectedUser.profilePic || "/sc_mini.svg"
                    }
                    alt="profile pic"
                    className={`size-12 rounded-full object-cover ${getRandomUserBg(selectedUser._id)}`}
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
                      {message.text && (
                        <p className="text-sm">{message.text}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <MessageInput />
        </motion.div>
      )}
    </>
  );
};

export default ChatContainer;
