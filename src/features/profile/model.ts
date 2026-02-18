import { $session } from "@/shared/session/model";
import { createEffect, createEvent, createStore, sample } from "effector";

type Profile = {
  avatar: string;
  bio: string;
  username: string;
  id: string;
  stats: Record<"followers" | "following" | "posts", number>;
};

export const profilePageLoaded = createEvent();

export const getProgileFx = createEffect(async (userId: string) => {
  const response = await fetch(`http://localhost:3000/api/users/${userId}`);
  const profile = await response.json();
  return profile;
});

export const $profile = createStore<Profile | null>(null);

export const $profilePagePanding = getProgileFx.pending;

sample({
  clock: profilePageLoaded,
  source: $session,
  filter: Boolean,
  fn: (session) => session?.user.id,
  target: getProgileFx,
});

sample({
  clock: getProgileFx.doneData,
  target: $profile,
});
