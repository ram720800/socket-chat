import { useChatStore } from "../store/useChatStore.js";
import Socket from "../components/Socket.jsx";
import Sidebar from "../components/Sidebar.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import Bonfire from "@/components/Bonfire.jsx";
import Active from "@/components/Active.jsx";
import NoActive from "@/components/NoActive.jsx";

export const ChatingPage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen">
      <div className="flex h-full overflow-hidden bg-[var(--color-bl1)]">
        <Socket />
        <Sidebar />
        {!selectedUser ? (
          <NoChatSelected />
        ) : selectedUser === "Bonfire Bot" ? (
          <Bonfire />
        ) : (
          <ChatContainer />
        )}
        {!selectedUser ? <NoActive /> : <Active />}
      </div>
    </div>
  );
};
