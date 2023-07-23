"use client";

import { useQuery } from "@tanstack/react-query";
import PostCard from "@/components/post/PostCard";
import request from "@/lib/request";

const allPosts = async () => {
  const res = await request({
    url: "/posts",
    method: "GET"
  });
  return res.data;
};

export default function Home() {
  const { data: posts, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ["posts"]
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
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

      <div className="mx-5 py-10 md:mx-[15%] divide-y-2">
        {posts?.data?.map((post: any) => {
          return (
            <>
              <PostCard post={post} key={post.id} />
            </>
          );
        })}
      </div>
    </section>
  );
}
