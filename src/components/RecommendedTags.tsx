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

const RecommendedTags = () => {
  const router = useRouter();

  const { data: tags, isLoading } = useQuery({
    queryFn: () => getTags(),
    queryKey: ["RecommendedTags"]
  });

  const handleClick = (searchText: string) => {
    router.push(`/search?query=${searchText}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className="flex flex-wrap gap-x-1.5 gap-y-2.5">
      {tags?.data.map((tag: TagType) => {
        return (
          <li
            className="cursor-pointer rounded-3xl bg-gray-200/60 px-4 py-1.5"
            key={tag.id}
            onClick={() => handleClick(tag.name)}
          >
            {tag.name}
          </li>
        );
      })}
    </ul>
  );
};

export default RecommendedTags;
