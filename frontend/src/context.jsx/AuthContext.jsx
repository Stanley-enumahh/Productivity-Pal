import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../utils/api";
import Cookies from "js-cookie";
import { setAuthToken } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // isAuthenticated
  useEffect(() => {
    const localToken = localStorage.getItem("accessToken");
    if (localToken) setIsAuthenticated(true);
    else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setAuthToken(accessToken);
  }, [accessToken]);

  // Signup function
  const signup = async (username, email, password) => {
    try {
      const response = await api.post("/api/register/", {
        username,
        email,
        password,
      });
      if (response.status === 201) {
        const token = response.data.access_token;
        setAccessToken(token);
        setUser(username);
        return true;
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  // Login function
  const login = async (username, password, rememberMe) => {
    try {
      const response = await api.post("/api/login/", {
        username,
        password,
      });

      if (response.status === 200) {
        const token = response.data.access_token;
        setAccessToken(token);
        setUser(username);
        navigate("/app");
        if (rememberMe) {
          localStorage.setItem("accessToken", token);
        } else {
          sessionStorage.setItem("accessToken", token);
        }

        setAccessToken(token);
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data);
      throw new Error(error.response?.data?.error || "Login failed");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (accessToken) {
        await api.post(
          "/api/logout/",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }

      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");

      setAccessToken(null);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);

      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
      setAccessToken(null);
      setUser(null);

      navigate("/");

      throw new Error(error.response?.data || "Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        accessToken,
        setAccessToken,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
