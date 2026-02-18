import { createStore } from "effector";
import { persist } from "effector-storage/local";

type User = {
  avatar: string;
  bio: string;
  email: string;
  id: string;
  username: string;
};

type Session = {
  token: string;
  user: User;
};

export const $session = createStore<Session | null>(null);

persist({ store: $session, key: "session" });
