import React from "react";
import { BiLike } from "react-icons/bi";

const PostLike = () => {
  return (
    <div className="group cursor-pointer">
      <BiLike className="inline-block h-6 w-8 group-hover:text-rose-400" />
      <span>2 Like</span>
    </div>
  );
};

export default PostLike;
