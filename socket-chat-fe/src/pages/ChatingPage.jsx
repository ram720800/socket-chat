import { useChatStore } from "../store/useChatStore.js"
import Socket from "../components/Socket.jsx";
import Sidebar from "../components/Sidebar.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";

export const ChatingPage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen">
      <div className="flex h-full overflow-hidden bg-[var(--color-bl1)]">
        <Socket />
        <Sidebar />
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
   

  </div>
  )
}
