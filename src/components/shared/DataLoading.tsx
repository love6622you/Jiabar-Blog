import React from "react";
import { LuLoader2 } from "react-icons/lu";

const DataLoading = () => {
  return (
    <div className="absolute h-full w-full z-30 flex-center">
      <LuLoader2 className="h-12 w-12 animate-spin" />
    </div>
  );
};

export default DataLoading;
