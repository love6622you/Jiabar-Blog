"use client";

import { PostComment } from "@/components/post/PostComment";
import PostLike from "@/components/post/PostLike";
import PostView from "@/components/post/PostReview";
import { useParams } from "next/navigation";

const PostDetail = () => {
  const slug = useParams()["slug"];

  return (
    <section>
      <PostView />
      <div className="mx-auto flex max-w-3xl gap-x-5 py-16">
        <PostLike />
        <PostComment />
      </div>
    </section>
  );
};

export default PostDetail;
