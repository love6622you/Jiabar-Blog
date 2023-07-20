"use client";

import { PostComment } from "@/components/post/PostComment";
import PostLike from "@/components/post/PostLike";
import PostView from "@/components/post/PostReview";
import request from "@/lib/request";
import { useStore } from "@/store/rootStore";
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
  const postId = useParams()["slug"];
  const setPost = useStore().setPost;

  const [
    { data: postData, isLoading: postIsLoading },
    { data: commentsData, isLoading: commentsIsLoading }
  ] = useQueries({
    queries: [
      {
        queryKey: ["posts", postId],
        queryFn: () => getPost(postId),
        onSuccess: (data: any) => {
          setPost(data.data);
        }
      },
      { queryKey: ["comments", postId], queryFn: () => getComments(postId) }
    ]
  });

  if (postIsLoading) {
    return <div>Loading...</div>;
  }

  if (!postData?.data) {
    return <div>Not found post</div>;
  }
  return (
    <section>
      <PostView data={postData?.data} />
      <div className="mx-auto flex max-w-3xl gap-x-5 py-16">
        <PostLike postId={postId} count={postData?.data.hearts_count} />
        {!commentsIsLoading && <PostComment data={commentsData?.data} />}
      </div>
    </section>
  );
};

export default PostDetail;
