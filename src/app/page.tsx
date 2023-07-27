"use client";

import { useQuery } from "@tanstack/react-query";
import PostCard from "@/components/post/PostCard";
import request from "@/lib/request";
import { IPost, IResponse } from "@/types";
import DataLoading from "@/components/shared/DataLoading";

const getPosts = async () => {
  const res = await request({
    url: "/posts",
    method: "GET"
  });
  return res.data;
};

export default function Home() {
  const { data: posts, isLoading } = useQuery({
    queryFn: getPosts,
    queryKey: ["posts"]
  }) as { data: IResponse; isLoading: boolean };

  return (
    <section className="flex h-full flex-col">
      <div className="flex-center h-40 flex-col border-b px-10 md:h-[12.5rem]">
        <div className="max-w-xl">
          <h2 className="pb-2 text-2xl font-bold md:text-3xl">
            Explore, be curious.
          </h2>
          <p>
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
        </div>
      </div>

      <div className="relative mx-5 flex-1 divide-y-2 py-10 md:mx-[15%]">
        {isLoading && <DataLoading />}
        {posts?.data?.map((post: IPost) => {
          return <PostCard post={post} key={post.id} />;
        })}
      </div>
    </section>
  );
}
