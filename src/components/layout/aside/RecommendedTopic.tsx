"use client";

import request from "@/lib/request";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

type TagType = {
  id: string;
  name: string;
};

const getTags = async () => {
  const res = await request({
    url: "/tags",
    method: "GET"
  });
  return res.data;
};

const RecommendedTopic = () => {
  const router = useRouter();

  const { data: tags, isLoading } = useQuery({
    queryFn: () => getTags(),
    queryKey: ["RecommendedTopic"]
  });

  const handleClick = (searchText: string) => {
    router.push(`/search?query=${searchText}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h4 className="mb-3.5 font-bold">Recommended Topics</h4>
      <ul className="flex flex-wrap gap-x-1.5 gap-y-2.5">
        {tags?.data.map((tag: TagType) => {
          return (
            <li
              className="cursor-pointer rounded-3xl bg-gray-200/60 px-4 py-1.5 hover:bg-purple-200 hover:text-white"
              key={tag.id}
              onClick={() => handleClick(tag.name)}
            >
              {tag.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecommendedTopic;
