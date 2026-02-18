import { createEffect, createEvent, sample } from "effector";
import { createField } from "./register";
import { $session } from "@/shared/session/model";

export const formSubmitted = createEvent();

export const emailField = createField((value) => {
  return "";
}, formSubmitted);
export const passwordField = createField((value) => {
  return "";
}, formSubmitted);

const loginFx = createEffect(async (values: Record<string, string>) => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    }),
  });
  const user = await response.json();

  return user;
});

sample({
  clock: formSubmitted,
  source: {
    email: emailField.$value,
    password: passwordField.$value,
  },
  target: loginFx,
});

sample({
  clock: loginFx.doneData,
  target: $session,
});
