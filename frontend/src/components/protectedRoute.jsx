import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context.jsx/AuthContext";

export function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;
  return <Outlet />;
}
