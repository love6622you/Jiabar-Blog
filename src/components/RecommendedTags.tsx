"use client";
import request from "@/lib/request";
import { useQuery } from "@tanstack/react-query";
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
  const { data: tags, isLoading } = useQuery({
    queryFn: () => getTags(),
    queryKey: ["RecommendedTags"]
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className="flex flex-wrap gap-x-1.5 gap-y-2.5">
      {tags?.data.map((tag: TagType) => {
        return (
          <li className="rounded-3xl bg-gray-200/60 px-4 py-1.5" key={tag.id}>
            {tag.name}
          </li>
        );
      })}
    </ul>
  );
};

export default RecommendedTags;
