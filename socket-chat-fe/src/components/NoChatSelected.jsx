const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col justify-center items-center p-40 mt-4 bg-[var(--color-bl3)] relative">
      <div className="absolute top-0 size-12 bg-[var(--color-bl2)] w-full">
        <div className="flex justify-start items-center gap-x-2 mx-1 py-2">
          <img src="/images/sc_friends.svg" alt="friends" className="size-6" />
          <div className="font-medium text-[var(--color-wl1)] mx-2">
            Friends
          </div>
          <div className="w-[0.1px] h-6 rounded-md bg-bl1 shadow-2xl"></div>
          <div className="relative z-50 hover:bg-bl3 border-1 border-g2 cursor-pointer rounded-md py-0.5 px-2">
            <button className="text-wl1 text-sm font-medium">Online</button>
          </div>
        </div>
      </div>
      <div className="w-96">
        <img src="/images/nochat_sc1.png" alt="noChat" className="w-[100%]" />
      </div>
      <p className="body-1 ">There are no friends online at this time.</p>
    </div>
  );
};

export default NoChatSelected;
