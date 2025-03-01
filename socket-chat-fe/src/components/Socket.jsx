const Socket = () => {
  return (
    <div className="w-[4.5rem] bg-[var(--color-bl1)]">
      <div className="flex flex-col justify-center items-center gap-y-2.5 mt-1">
        <span className="text-[0.6rem] uppercase font-bold text-[var(--color-lg4)] text-center">
          socket
        </span>
        <div className="relative">
          <img src="/images/sc_before.svg" alt="before" className="size-12" />
          <div className="pointer-events-none">
            <span className="w-2 h-9 bg-[var(--color-wl1)] rounded-xl absolute -translate-y-[2.6rem] -translate-x-[1rem]"></span>
            <span className="w-10 h-0.5 rounded-xl bg-[var(--color-bl3)] absolute mt-2 mx-1"></span>
          </div>
        </div>
        <div className="relative">
          <img src="/images/sc_bot.svg" alt="bot" className="size-12 mt-2" />
          <span className="absolute size-3 bg-[var(--color-wl1)] rounded-full -translate-y-[2rem] -translate-x-[1.2rem]"></span>
        </div>
      </div>
    </div>
  );
};

export default Socket;
