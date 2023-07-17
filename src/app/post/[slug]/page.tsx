"use client";

import { PostComment } from "@/components/post/PostComment";
import PostLike from "@/components/post/PostLike";
import PostView from "@/components/post/PostReview";
import request from "@/lib/request";
import { useQueries } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const getPost = async (postId: string) => {
  const res = await request({
    url: `/posts/${postId}`,
    method: "GET"
  });
  return res.data;
};

const getComments = async (postId: string) => {
  const res = await request({
    url: `/posts/${postId}/getComments`,
    method: "GET"
  });

  return res.data;
};

const PostDetail = () => {
  const slug = useParams()["slug"];
  const [post, comments] = useQueries({
    queries: [
      { queryKey: ["post", slug], queryFn: () => getPost(slug) },
      { queryKey: ["comments", slug], queryFn: () => getComments(slug) }
    ]
  });

  if (post.isLoading) {
    return <div>Loading...</div>;
  }

  if (!post.data.data) {
    return <div>Not found post</div>;
  }
  return (
    <section>
      <PostView data={post.data.data} />
      <div className="mx-auto flex max-w-3xl gap-x-5 py-16">
        <PostLike />
        <PostComment source={comments.data} />
      </div>
    </section>
  );
};

export default PostDetail;
