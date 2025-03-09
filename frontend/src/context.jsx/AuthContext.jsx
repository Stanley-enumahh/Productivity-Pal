import { useState, createContext, useEffect } from "react";
import api from "../utils/api";

const AuthContext = createContext();

function AuthProvider({ children, navigate }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem("rememberMe") === "true";
  });

  useEffect(() => {
    localStorage.setItem("rememberMe", rememberMe);
  }, [rememberMe]);

  const setTokens = (token) => {
    setAccessToken(token);
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  };
  const onSignup = async (formData) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await api.post("/register/", formData, {
        withCredentials: true, // Ensures cookies (refresh token) are handled by the browser
      });
      // Backend returns an access token and user data (refresh token is stored in an HTTP‑only cookie)
      const { access_token, ...userData } = response.data;
      setUser(userData);
      setTokens(access_token);
      navigate("/App"); // Redirect after successful signup
    } catch (error) {
      console.error("Signup error:", error.response?.data || error);
      setErrorMessage(
        error.response?.data?.detail || "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // login functionality

  const onLogin = async (formData) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await api.post("/login/", formData, {
        withCredentials: true,
      });
      const { access_token, ...userData } = response.data;
      setUser(userData);
      setTokens(access_token);
      navigate("/App"); // Redirect after successful login
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      setErrorMessage(
        error.response?.data?.detail || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // log out

  const onLogout = async () => {
    setIsLoading(true);
    try {
      await api.post(
        "/logout/",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Clear authentication state and Axios defaults
      setUser(null);
      setAccessToken(null);
      delete api.defaults.headers["Authorization"];
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        onSignup,
        user,
        isLoading,
        onLogin,
        onLogout,
        rememberMe,
        setRememberMe,
        errorMessage,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { AuthProvider, AuthContext };
