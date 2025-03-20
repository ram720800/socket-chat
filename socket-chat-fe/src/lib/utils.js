import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    am: true,
    pm: true,
  });
}

export const getRandomUserBg = (userId) => {
  const colors = [
    "bg-rd1",
    "bg-rd2",
    "bg-rd3",
    "bg-rd4",
    "bg-rd5",
    "bg-rd6",
    "bg-rd7",
  ];

  let sum = 0;
  for (let i = 0; i < userId.length; i++) {
    sum += userId.charCodeAt(i);
  }
  const index = sum % colors.length;
  return colors[index];
};

export const getRandomBg = () => {
  const colors = [
    "bg-rd1",
    "bg-rd2",
    "bg-rd3",
    "bg-rd4",
    "bg-rd5",
    "bg-rd6",
    "bg-rd7",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
