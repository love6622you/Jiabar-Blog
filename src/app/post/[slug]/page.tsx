"use client";

import { PostComment } from "@/components/post/PostComment";
import PostLike from "@/components/post/PostLike";
import PostView from "@/components/post/PostReview";
import DataLoading from "@/components/shared/DataLoading";
import NoData from "@/components/shared/NoData";
import request from "@/lib/request";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/rootStore";
import { IResponse } from "@/types";
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

const POST_CONENT_LIMIT_WIDTH = "w-10/12 max-w-3xl";

const PostDetail = () => {
  const postId = useParams()["slug"];
  const setPost = useStore().setPost;

  const [{ data: postData, isLoading: postIsLoading }, { data: commentsData, isLoading: commentsIsLoading }] =
    useQueries({
      queries: [
        {
          queryKey: ["posts", postId],
          queryFn: () => getPost(postId),
          onSuccess: (data: IResponse) => {
            setPost(data.data);
          }
        },
        { queryKey: ["comments", postId], queryFn: () => getComments(postId) }
      ]
    }) as [{ data: IResponse; isLoading: boolean }, { data: IResponse; isLoading: boolean }];

  return (
    <section className="flex h-full flex-col">
      {postIsLoading ? (
        <DataLoading />
      ) : !postData?.data ? (
        <NoData />
      ) : (
        <>
          <PostView data={postData?.data} contentClassName={POST_CONENT_LIMIT_WIDTH} />
          <div className={cn("mx-auto flex gap-x-5 py-16", POST_CONENT_LIMIT_WIDTH)}>
            <PostLike postId={postId} count={postData?.data.hearts_count} />
            {!commentsIsLoading && <PostComment data={commentsData?.data} />}
          </div>
        </>
      )}
    </section>
  );
};

export default PostDetail;
