"use client";

import { useQuery } from "@tanstack/react-query";
import ArticleCard from "@/components/card/ArticleCard";
import request from "@/lib/request";

const allPosts = async () => {
  const res = await request({
    url: "/posts",
    method: "GET"
  });
  return res.data;
};

export default function Home() {
  const { data: posts, isLoading } = useQuery<[]>({
    queryFn: allPosts,
    queryKey: ["posts"]
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="flex-center h-60 flex-col border-b">
        <div className="max-w-xl">
          <h2 className="pb-2 text-3xl font-bold">Explore, be curious.</h2>
          <p>
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
        </div>
      </div>

      <div className="mx-20 py-10">
        {posts &&
          posts.map((post: any, index) => {
            return <ArticleCard post={post} key={post.id} />;
          })}
      </div>
    </section>
  );
}
