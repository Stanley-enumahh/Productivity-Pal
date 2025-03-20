import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context.jsx/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}
