"use client";
import request, { AxiosError } from "@/lib/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { BiLike } from "react-icons/bi";
import { toast } from "../ui/use-toast";

type PostLikeType = {
  postId: string;
  count: number;
};

const PostLike = ({ postId, count }: PostLikeType) => {
  const queryClient = useQueryClient();
  const { mutate: addLike, isLoading } = useMutation(
    async (data: { postId: string }) => {
      await request({
        url: `/posts/${postId}/like`,
        method: "POST",
        data
      });
    },
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast({
            title: error?.response?.data?.message
          });
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["posts", postId]);
      }
    }
  );

  const handleLike = async () => {
    if (isLoading) return;
    await addLike({ postId });
  };

  return (
    <div className="group cursor-pointer" onClick={handleLike}>
      <BiLike className="inline-block h-6 w-8 group-hover:text-rose-400" />
      <span>{count} Like</span>
    </div>
  );
};

export default PostLike;
