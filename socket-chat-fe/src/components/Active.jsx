import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { getRandomBg } from "@/lib/utils";
import { getRandomUserBg } from "@/lib/utils";

const Active = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <>
      {selectedUser !== "Bonfire Bot" ? (
        <div className="w-80 max-xl:hidden bg-[var(--color-bl1)] border-l-2 border-[var(--color-bl1)] mt-4 text-[var(--color-lg4)]">
          <div className={`h-28 relative ${getRandomBg()} `}>
            <div className="absolute top-16 left-2">
              <img
                src={selectedUser.profilePic || "/sc_mini.svg"}
                alt={selectedUser.fullName}
                className={`size-24 rounded-full object-cover border-[6px] border-bl1 ${getRandomUserBg(
                  selectedUser._id
                )}`}
              />
              {onlineUsers.includes(selectedUser._id) ? (
                <span className="absolute size-6 bottom-1 right-1 bg-[var(--color-g1)] rounded-full border-6 border-[var(--color-bl1)]"></span>
              ) : (
                <span className="absolute size-6 bottom-1 right-1 bg-[var(--color-lg4)] rounded-full border-6 border-[var(--color-bl1)]"></span>
              )}
            </div>
          </div>
          <div className="space-y-2 mx-4 mt-14">
            <h4 className="font-semibold text-wl3 text-xl">
              {selectedUser.fullName}
            </h4>
            <div className="font-medium text-md text-[var(--color-lg4)]">
              {selectedUser.interests}
            </div>
          </div>
          <div className="mt-4 mx-2 h-auto w-auto rounded-md bg-bl3 p-2">
            <p className="text-[var(--color-wl1)] font-bold text-xs text-start">
              Member Since
            </p>
            <div className="flex mt-2">
              <div>
                <img src="/sc_mini.svg" alt="mini" className="w-4 h-4 mr-2" />
              </div>
              <p className="text-[var(--color-wl3)] text-xs text-start ">
                {selectedUser.createdAt?.split("T")[0]}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Active;
