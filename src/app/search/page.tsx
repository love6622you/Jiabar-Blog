"use client";

import PostCard from "@/components/post/PostCard";
import request from "@/lib/request";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const allPosts = async (params: { query: string | null }) => {
  const res = await request({
    url: "/posts",
    method: "GET",
    params
  });

  return res.data;
};

const PostSearch = () => {
  const searchText = useSearchParams().get("query");

  const { data: posts, isLoading } = useQuery({
    queryFn: () => {
      const params = {
        query: searchText
      };
      return allPosts(params);
    },
    queryKey: ["search", searchText]
  });

  if (isLoading) {
    return <div>isLoading...</div>;
  }

  if (!posts?.data.length) {
    return <div>No Data</div>;
  }

  return (
    <section>
      {/* <div className="flex-center h-60 flex-col border-b">
        <div className="max-w-xl">
          <h2 className="pb-2 text-3xl font-bold">Explore, be curious.</h2>
          <p>
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
        </div>
      </div> */}

      <div className="mx-20 py-10">
        {posts?.data?.map((post: any) => {
          return <PostCard post={post} key={post.id} />;
        })}
      </div>
    </section>
  );
};

export default PostSearch;
