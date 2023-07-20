import { StateCreator } from "zustand";

export type AuthState = {
  accessToken: string;
  setAccessToken: (token: string) => void;
};

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  accessToken: "",
  setAccessToken: (token: string) =>
    set(() => ({
      accessToken: token
    }))
});
