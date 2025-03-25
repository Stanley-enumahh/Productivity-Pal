import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context.jsx/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}
