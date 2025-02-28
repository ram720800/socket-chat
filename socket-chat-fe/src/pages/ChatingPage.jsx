import { useChatStore } from "@/store/useChatStore"
import Socket from "@/components/Socket";
import Sidebar from "@/components/Sidebar";
import ChatContainer from "@/components/ChatContainer";
import NoChatSelected from "@/components/NoChatSelected";

export const ChatingPage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen">
      <div className="flex h-full overflow-hidden bg-[var(--color-bl1)]">
        <Socket />
        <Sidebar />
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
   

  </div>
  )
}
