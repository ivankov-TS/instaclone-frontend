import { attach, createEffect } from "effector";
import { $session } from "../session/model";

type Config = {
  method?: "POST" | "GET" | "PUT";
  body: any;
  url: string;
};

export const apiClient = attach({
  source: $session,
  mapParams: (params: Config, session) => {
    return {
      ...params,
      token: session?.token,
    };
  },
  effect: createEffect(
    async ({
      method,
      body,
      url,
      token,
    }: {
      method?: string;
      body: any;
      url: string;
      token?: string;
    }) => {
      return fetch(`http://localhost:3000/api/${url}`, {
        method: method || "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    },
  ),
});
