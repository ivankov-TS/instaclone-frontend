import { $session } from "@/shared/session/model";
import { useUnit } from "effector-react";
import type React from "react";
import { Navigate, useLocation } from "react-router";

type GuestGuardProps = {
  children: React.ReactNode;
};

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const session = useUnit($session);
  const location = useLocation();

  const from = location.state?.from || "/profile";

  if (session) return <Navigate to={from} />;
  return children;
};
