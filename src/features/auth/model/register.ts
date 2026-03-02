import { apiClient } from "@/shared/api/api-client";
import { $session } from "@/shared/session/model";
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
  type EventCallable,
} from "effector";

export const formSubmitted = createEvent();

export const usernameField = createField(
  (value) => (value.length > 6 ? "" : "Слишком короткое имя"),
  formSubmitted,
);

export const emailField = createField(
  (value) => (value.includes("@") ? "" : "Неверный Email"),
  formSubmitted,
);
export const passwordField = createField(
  (value) => (value.length >= 8 ? "" : "Слишком короткий пароль"),
  formSubmitted,
);
export const confirmPasswordField = createField((value) => "", formSubmitted);

const registerUserFx = createEffect(async (values: Record<string, string>) => {
  const response = await apiClient({
    url: "auth/register",
    method: "POST",
    body: {
      username: values.username,
      email: values.email,
      password: values.password,
    },
  });
  const user = await response.json();
  return user;
});

sample({
  clock: formSubmitted,
  source: {
    username: usernameField.$value,
    email: emailField.$value,
    password: passwordField.$value,
    errors: combine([
      usernameField.$error,
      emailField.$error,
      passwordField.$error,
    ]),
  },
  filter: ({ errors }) => errors.every((error) => error.length === 0),
  fn: (source) => {
    const { errors, ...others } = source;

    return others;
  },
  target: registerUserFx,
});

sample({
  clock: registerUserFx.doneData,
  target: $session,
});

export function createField(
  validator: (value: string) => string,
  startValidate: EventCallable<void>,
) {
  const $error = createStore("");

  const $value = createStore("");

  const valueChanged = createEvent<string>();

  $value.on(valueChanged, (_, payload) => payload);

  sample({
    clock: startValidate,
    source: $value,
    fn: validator,
    target: $error,
  });

  return { $error, $value, valueChanged };
}
