import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { getRandomUserBg } from "@/lib/utils";

const ChatHeader = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="w-full size-12 bg-[var(--color-bl3)] drop-shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center">         
          <div className="relative p-2 ml-8">
            <img
              src={selectedUser.profilePic || "/sc_mini.svg"}
              alt={selectedUser.fullName}
              className={`size-7 rounded-full object-cover border-[var(--color-dg3)] ${getRandomUserBg(selectedUser._id)}`}
            />
            {onlineUsers.includes(selectedUser._id) ? (
              <span className="absolute size-4 bottom-1 right-1 bg-[var(--color-g1)] rounded-full border-4 border-[var(--color-bl1)]"></span>
            ) : (
              <span className="absolute size-4 bottom-1 right-1 bg-[var(--color-lg4)] rounded-full border-4 border-[var(--color-bl2)]"></span>
            )}
          </div>
          <div>
            <h5 className="font-medium">{selectedUser.fullName}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
