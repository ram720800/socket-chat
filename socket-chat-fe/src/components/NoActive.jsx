const NoActive = () => {
  return (
    <div className="relative w-72 max-xl:hidden bg-bl3 border-l-2 border-[var(--color-bl1)] p-2">
      <div className="my-4 text-center ml-2 font-bold text-xl text-wl1 z-100">
        Active Now
      </div>
      <p className="my-2 text-center font-medium text-md text-wl1">
        It's quit for now...
      </p>
      <p className="my-4 text-center font-semibold text-sm text-wl3">
        Start a chat to know about your friend
      </p>
    </div>
  );
};

export default NoActive;
