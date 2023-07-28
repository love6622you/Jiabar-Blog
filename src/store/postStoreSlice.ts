import { IPost } from "@/types";
import { StateCreator } from "zustand";

export type PostState = {
  post: IPost | null;
  setPost: (post: IPost | null) => void;
};

export const createPostSlice: StateCreator<PostState> = (set) => ({
  post: null,
  setPost: (post) =>
    set((state) => ({
      ...state,
      post
    }))
});
