"use client";

import PostCard from "@/components/post/PostCard";
import DataLoading from "@/components/shared/DataLoading";
import NoData from "@/components/shared/NoData";
import request from "@/lib/request";
import { IPost, IResponse } from "@/types";
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
  }) as { data: IResponse; isLoading: boolean };

  return (
    <section className="flex h-full flex-col">
      {/* <div className="flex-center h-60 flex-col border-b">
        <div className="max-w-xl">
          <h2 className="pb-2 text-3xl font-bold">Explore, be curious.</h2>
          <p>
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
        </div>
      </div> */}

      <div className="relative mx-20 h-full py-10">
        {isLoading ? (
          <DataLoading />
        ) : posts?.data.length === 0 ? (
          <NoData />
        ) : (
          posts.data.map((post: any) => <PostCard post={post} key={post.id} />)
        )}
      </div>
    </section>
  );
};

export default PostSearch;
