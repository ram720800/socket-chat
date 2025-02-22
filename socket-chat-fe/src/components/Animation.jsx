import { motion } from "motion/react";

export const AnimatedBG1 = () => {
  return (
    <motion.div
      className="h-screen bg-[url('/bat_sc.png')] bg-no-repeat bg-[200px] translate-y-[300px] bg-[length:150px_150px]"
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
      className="h-screen bg-[url('/coin_sc.png')] bg-no-repeat bg-[900px] translate-y-[200px] bg-[length:150px_150px]"
      animate={{
        backgroundPositionY: ["0%", "2%", "0%"],
      }}
      transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 1]}}
    ></motion.div>
  );
};
