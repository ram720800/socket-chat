import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatStore } from "@/store/useChatStore";
import { useState, useEffect } from "react";

export const AnimatedBG1 = () => {
  return (
    <motion.div
      className="h-screen bg-[url('/images/bat_sc.png')] bg-no-repeat bg-[350px] bg-[length:150px_150px] max-lg:bg-[100px]"
      animate={{
        backgroundPositionY: ["-1%", "-7%", "-1%"],
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
        backgroundPositionY: ["-1%", "-7%", "-1%"],
      }}
      transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 1] }}
    ></motion.div>
  );
};

export const ChatSkeleton = () => {
  const { selectedUser } = useChatStore();
  return (
    <div
      className={`h-full w-64 space-y-4 border-r-2 border-[var(--color-bl1)] rounded-tl-lg mt-4 py-1 bg-[var(--color-bl2)] ${
        selectedUser ? "hidden md:block" : "block"
      }`}
    >
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
    <div className="space-y-12 w-full flex flex-1 flex-col mt-4 bg-[var(--color-bl3)]">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex gap-3 items-start mx-1">
          <Skeleton className="h-12 w-12 rounded-full bg-bl2" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32 bg-bl2" />
            <Skeleton className="h-20 w-64 bg-bl2" />
          </div>
        </div>
      ))}
    </div>
  );
};
export const SocketSkeleton = () => {
  return (
    <div className="space-y-6 min-w-[4.5rem] mt-4 bg-[var(--color-bl1)]">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="relative z-100 flex justify-center items-center">
          <Skeleton className="h-12 w-12 rounded-md bg-bl3" />
        </div>
      ))}
    </div>
  );
};

const ParallaxImage = ({ src, alt, initialTop, speed }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handelScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handelScroll);
    return () => window.removeEventListener("scroll", handelScroll);
  }, []);

  return (
    <div
      className="absolut transition-transform duration-200 ease-out"
      style={{
        top: `${initialTop}px`,
        transform: `translateY(${scrollY * speed}px)`,
      }}
    >
      <img src={src} alt={alt} className="size-40" />
    </div>
  );
};
export default ParallaxImage;
