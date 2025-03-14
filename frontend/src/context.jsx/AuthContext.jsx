import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { login, signup, logout, getProfile } from "../components/Auth";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch the authenticated user's profile
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
    retry: false,
  });

  // Signup mutation: On success, update the user and navigate to dashboard.
  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });

  // Login mutation: On success, update the user and navigate to dashboard.
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  // Logout mutation: On success, clear user data and navigate to login.
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isError,
        loginMutation,
        signupMutation,
        logoutMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
