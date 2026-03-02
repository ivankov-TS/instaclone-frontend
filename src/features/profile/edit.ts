import { createEffect, createEvent, sample } from "effector";
import { createField } from "../auth/model/register";
import { apiClient } from "@/shared/api/api-client";
import { attach } from "effector";
import { $session, type Session } from "@/shared/session/model";

export const saveChangesClicked = createEvent();

export const usernameField = createField(() => {
  return "";
}, saveChangesClicked);

export const bioField = createField(() => {
  return "";
}, saveChangesClicked);

const editProfileFX = attach({
  source: $session,
  effect: createEffect(
    async ({
      userId,
      username,
      bio,
    }: {
      userId: string;
      username: string;
      bio: string;
    }) => {
      const response = await apiClient({
        url: `users/${userId}`,
        method: "PUT",
        body: {
          username,
          bio,
        },
      });
    },
  ),
  mapParams: (params: { username: string; bio: string }, session) => {
    if (!session) throw new Error("No session");
    return {
      username: params.username,
      bio: params.bio,
      userId: session.user.id,
    };
  },
});

sample({
  clock: saveChangesClicked,
  source: {
    username: usernameField.$value,
    bio: bioField.$value,
  },
  target: editProfileFX,
});
