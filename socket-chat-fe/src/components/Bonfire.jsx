import React from "react";

const Bonfire = () => {
  return (
    <div className="w-full flex flex-1 flex-col mt-4 bg-[var(--color-bl3)] relative">
      <div className="flex items-center gap-2 w-[100%] size-12 bg-[var(--color-bl3)] drop-shadow-2xl">
        <div>
          <img src="/images/arrow.png" alt="back" className="size-6 cursor-pointer"/>
        </div>
        <div className="">
          <img
            src="/images/bonfire.svg"
            alt="bonfirebot"
            className="size-7 rounded-full object-cover border-[var(--color-dg3)] bg-[var(--color-bl3)]"
          />
        </div>
        <div>
          <h5 className="font-medium text-wl1">Bonfirebot</h5>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="mx-4 mt-4">
          <div className="">
            <img
              src="/images/bonfire.svg"
              alt=""
              className="size-20 rounded-full object-cover border-1 border-bl1 bg-bl3 "
            />
          </div>
        </div>
        <div className="space-y-2 mx-4 mt-4">
          <h4 className="font-semibold text-wl1 text-3xl">Hi, Bonfirebot here</h4>
          <p className="text-lg4 text-sm mt-4">{`This is the very beginning of your direct message history with Bonfirebot. Only the two of you are in this conversation.`}</p>
        </div>
        <div className="my-6 mx-4 w-auto h-[0.1px] bg-lg4 shadow-2xl"></div>

        <div className="flex justify-center items-center text-r3">This is the official bot of socketChat. Upcomming in v2</div>
      </div>
    </div>
  );
};

export default Bonfire;
