import { cn } from "@/lib/utils";
import React from "react";

type TagType = {
  tagName: string;
  className?: string;
  handleClick?: Function;
  suffix?: React.ReactNode;
};

const Tag = ({ className, handleClick, tagName, suffix }: TagType) => {
  return (
    <li
      className={cn(
        "h-8 leading-8 cursor-pointer rounded-3xl bg-gray-200/60 px-4 hover:bg-purple-200 hover:text-white",
        className
      )}
      onClick={() => {
        handleClick && handleClick();
      }}
    >
      <span>{tagName}</span>
      {suffix && suffix}
    </li>
  );
};

export default Tag;
