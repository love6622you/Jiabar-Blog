import { IPost } from "@/types";
import { StateCreator } from "zustand";

export type PostState = {
  post: IPost | object;
  setPost: (post: IPost) => void;
};

export const createPostSlice: StateCreator<PostState> = (set) => ({
  post: {},
  setPost: (post: IPost) =>
    set((state) => ({
      ...state,
      post
    }))
});
