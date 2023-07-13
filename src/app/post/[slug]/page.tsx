"use client";

import { PostComment } from "@/components/post/PostComment";
import PostLike from "@/components/post/PostLike";
import PostView from "@/components/post/PostReview";
import request from "@/lib/request";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const getPost = async (id: string) => {
  const res = await request({
    url: `/posts/${id}`,
    method: "GET"
  });
  return res.data;
};

const PostDetail = () => {
  const slug = useParams()["slug"];
  const { data: post, isLoading } = useQuery({
    queryFn: () => getPost(slug),
    queryKey: ["post", slug]
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Not found post</div>;
  }
  return (
    <section>
      <PostView data={post.data} />
      <div className="mx-auto flex max-w-3xl gap-x-5 py-16">
        <PostLike />
        <PostComment />
      </div>
    </section>
  );
};

export default PostDetail;
