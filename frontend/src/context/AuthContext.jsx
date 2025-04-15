import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../utils/api.js";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [storedUserName, setStoredUserName] = useState("");
  const [accessToken, setAccessToken] = useState(
    Cookies.get("accessToken") || null
  );
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    const storedCookie = Cookies.get("accessToken");
    const storedUserName = Cookies.get("username");

    if (storedCookie) {
      try {
        const decoded = jwtDecode(storedCookie);
        setIsAuthenticated(true);
        setUserId(decoded.user_id);
        setUser(storedUserName);

        setTimeout(() => {
          navigate("/app");
        }, 0);

        setUser(storedUserName);
      } catch (error) {
        console.error("Invalid token:", error);
        Cookies.remove("accessToken");
        setIsAuthenticated(false);
        navigate("/login");
      }
    }
  }, []);

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
        Cookies.set("username", username, { expires: 7 });
        setUser(username);
        setIsAuthenticated(true);
        navigate("/app");
        return true;
      }
    } catch (error) {
      toast.success("Error logging, try again");
      console.error("Registration error:", error);
      throw error;
    }
  };

  // Login function

  const login = async (username, password, rememberMe) => {
    try {
      const response = await api.post("/api/login/", { username, password });

      if (response.status === 200) {
        toast.success("Welcome back!");
        const token = response.data.access_token;
        const decoded = jwtDecode(token);

        setAccessToken(token);
        setIsAuthenticated(true);
        setUser(username);
        setUserId(decoded.user_id);

        Cookies.set("username", username, { expires: 7 });

        // Store token based on rememberMe option
        Cookies.set("accessToken", token, {
          expires: rememberMe ? 7 : undefined,
          secure: true,
          sameSite: "Strict",
        });

        navigate("/app");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data);

      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Login failed"
      );
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
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
      }

      Cookies.remove("accessToken");
      Cookies.remove("username");
      setIsAuthenticated(false);
      setAccessToken(null);
      setUser(null);

      navigate("/login"); // sent to login after logout
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
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
        setAccessToken,
        isAuthenticated,
        storedUserName,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
