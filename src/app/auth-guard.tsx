import { $session } from "@/shared/session/model";
import { useUnit } from "effector-react";
import { Navigate } from "react-router";

type AuthGuardProps = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const session = useUnit($session);
  if (!session) return <Navigate to={"/sign-in"} />;
  return children;
};
