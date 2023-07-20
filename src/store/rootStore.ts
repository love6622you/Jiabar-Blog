import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PostState, createPostSlice } from "./postStoreSlice";
import { AuthState, createAuthSlice } from "./authStoreSlice";

const createRootSlice = create<PostState & AuthState>()((...state) => ({
  ...createPostSlice(...state),
  ...createAuthSlice(...state)
}));

export const useStore = createRootSlice;
