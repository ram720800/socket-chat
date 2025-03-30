import { useChatStore } from "../store/useChatStore.js";
import { useGroupStore } from "@/store/useGroupStore.js";
import Socket from "../components/Socket.jsx";
import Sidebar from "../components/Sidebar.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import GroupChatContainer from "@/components/GroupChatContainer.jsx";
import Bonfire from "@/components/Bonfire.jsx";
import Active from "@/components/Active.jsx";
import NoActive from "@/components/NoActive.jsx";

export const ChatingPage = () => {
  const { selectedUser } = useChatStore();
  const { selectedGroup } = useGroupStore();

  return (
    <div className="h-screen">
      <div className="flex h-full overflow-hidden bg-[var(--color-bl1)]">
        <Socket />
        <Sidebar />

        {!selectedUser && !selectedGroup && <NoChatSelected />}

        {selectedUser === "Bonfire Bot" ? (
          <Bonfire />
        ) : selectedUser ? (
          <ChatContainer />
        ) : selectedGroup ? (
          <GroupChatContainer />
        ) : null}

        {!selectedUser && !selectedGroup ? <NoActive /> : <Active />}
      </div>
    </div>
  );
};
