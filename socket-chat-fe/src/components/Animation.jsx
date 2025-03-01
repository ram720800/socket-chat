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
      transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 1]}}
    ></motion.div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="space-y-4 w-20 lg:w-72">
     
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex gap-3 items-start w-[100%]">         
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-60" />
          </div>
        </div>
      ))}
    </div>
  );
};
