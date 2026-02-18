import { RegisterPage } from "@/pages/register-page";
import "./index.css";
import { LoginPage } from "@/pages/login-page";
import { ProfilePage } from "@/pages/profile-page";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { profilePageLoaded } from "@/features/profile/model";
import { AuthGuard } from "./auth-guard";
import { GuestGuard } from "./guest-guard";

const router = createBrowserRouter([
  {
    path: "/sign-up",
    element: (
      <GuestGuard>
        <RegisterPage />
      </GuestGuard>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <GuestGuard>
        <LoginPage />
      </GuestGuard>
    ),
  },
  {
    path: "/profile",
    loader: () => {
      profilePageLoaded();
    },
    element: (
      <AuthGuard>
        <ProfilePage />
      </AuthGuard>
    ),
  },
]);

export const Application = () => {
  return <RouterProvider router={router} />;
};
