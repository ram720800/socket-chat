const NoActive = () => {
  return (
    <div className="w-72 max-xl:hidden bg-[var(--color-bl3)] border-l-2 border-[var(--color-bl1)] mt-4 p-2">
          <div className="my-4 text-center ml-2 font-bold text-xl text-wl1">Active Now</div>
          <p className="my-2 text-center font-medium text-md text-wl1">It's quit for now...</p>
          <span className="text-center font-normal text-sm text-wl3">Start a chat to know about your friend</span>
    </div>
  );
};

export default NoActive;
