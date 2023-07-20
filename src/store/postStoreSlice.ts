import { Post } from "@prisma/client";
import { StateCreator } from "zustand";
export type PostState = {
  post: any;
  setPost: (post: Post | object) => void;
};

export const createPostSlice: StateCreator<PostState> = (set) => ({
  post: {},
  setPost: (post: object) =>
    set((state) => ({
      ...state,
      post
    }))
});
