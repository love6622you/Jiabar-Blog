"use client";

import Tag from "@/components/shared/Tag";
import request from "@/lib/request";
import { IResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

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
  }) as { data: IResponse; isLoading: boolean };

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
        {tags?.data.map((tag: string) => {
          return (
            <Tag
              key={tag}
              tagName={tag}
              handleClick={() => {
                handleClick(tag);
              }}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default RecommendedTopic;
