import axios from "axios";
import Cookies from "js-cookie";

const NO_AUTH_NEEDED = ["/api/login", "/api/signup", "/api/forgot-password"];

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "https://productivity-pal-7h8y.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Ensure login/signup requests do NOT send tokens
    if (!NO_AUTH_NEEDED.includes(config.url)) {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config; // ✅ Always return config
  },
  (error) => Promise.reject(error)
);

// Response interceptor - simplified without refresh logic
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
