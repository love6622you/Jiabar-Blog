import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// n days ago / n hours ago
export function getTimeAgo(dateTime: Date) {
  const current = dayjs();
  const previous = dayjs(dateTime);

  const timeAgo = previous.from(current);
  return timeAgo;
}

// 將 File 物件轉為 Base64 字串的函式
export function convertFileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error: ProgressEvent<FileReader>) => reject(error);
  });
}

// 將 Base64 字串轉換回 File 物件
export function convertBase64ToFile(base64String: string, fileName: string, mimeType: string): File {
  const base64WithoutPrefix = base64String.replace(/^data:[a-z]+\/[a-z]+;base64,/, "");
  const bytes = Uint8Array.from(atob(base64WithoutPrefix), (char) => char.charCodeAt(0));
  const blob = new Blob([bytes], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
}
