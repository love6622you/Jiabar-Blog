import { cn } from "@/lib/utils";
import React from "react";

const NoData = () => {
  return (
    <div className="flex-center absolute h-full w-full">
      <h1 className={cn("relative text-3xl sm:text-4xl md:text-5xl", [])}>
        No results found
      </h1>
    </div>
  );
};

export default NoData;
