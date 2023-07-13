import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeAgo(timeStamp: string) {
  const current = dayjs();
  const previous = dayjs(timeStamp);

  const timeAgo = previous.from(current);
  return timeAgo;
}
