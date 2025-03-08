import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";

export const AnimatedBG1 = () => {
  return (
    <motion.div
      className="h-screen bg-[url('/images/bat_sc.png')] bg-no-repeat bg-[350px] bg-[length:150px_150px] max-lg:bg-[100px]"
      animate={{
        backgroundPositionY: ["0%", "2%", "0%"],
      }}
      transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 1] }}
    ></motion.div>
  );
};

export const AnimatedBG2 = () => {
  return (
    <motion.div
      className="h-screen bg-[url('/images/coin_sc.png')] bg-no-repeat bg-[850px] bg-[length:150px_150px] max-lg:bg-[100px]"
      animate={{
        backgroundPositionY: ["0%", "2%", "0%"],
      }}
      transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 1] }}
    ></motion.div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="space-y-4 w-20 lg:w-72 bg-bl2 mt-4 p-2">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex gap-3 items-start w-[100%] mx-1">
          <Skeleton className="h-10 w-10 rounded-full bg-bl3" />
          <Skeleton className="h-4 w-32 bg-bl3" />
        </div>
      ))}
    </div>
  );
};
export const MessageSkeleton = () => {
  return (
    <div className="space-y-14 w-full flex flex-1 flex-col mt-4 bg-[var(--color-bl3)]">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex gap-3 items-start mx-1">
          <Skeleton className="h-12 w-12 rounded-full bg-bl1" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32 bg-bl1" />
            <Skeleton className="h-20 w-64 bg-bl1" />
          </div>
        </div>
      ))}
    </div>
  );
};
