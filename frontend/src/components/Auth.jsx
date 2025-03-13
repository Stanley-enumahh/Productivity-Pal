import api from "../utils/api";

export const signup = async (userData) => {
  try {
    const response = await api.post("/register/", userData, {
      withCredentials: true,
    });

    // If tokens are included in response data, store manually (optional)
    if (response.data.access) {
      document.cookie = `access_token=${response.data.access}; path=/; Secure; HttpOnly`;
    }

    return response.data; // Return user data
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post("/login/", credentials, {
      withCredentials: true,
    });

    if (response.data.access) {
      document.cookie = `access_token=${response.data.access}; path=/; Secure; HttpOnly`;
    }

    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// Logout functionality
export const logout = async () => {
  try {
    const cookies = document.cookie.split("; ");
    let refreshToken = null;
    cookies.forEach((cookie) => {
      if (cookie.startsWith("refresh_token=")) {
        refreshToken = cookie.split("=")[1];
      }
    });

    if (!refreshToken) {
      console.error("No refresh token found in cookies.");
      return;
    }

    await api.post("logout/", { refresh_token: refreshToken });

    // Remove auth header after logout
    delete api.defaults.headers.common["Authorization"];

    console.log("Logged out successfully");
  } catch (error) {
    // If error is a 401, treat it as logout success
    if (error.response?.status === 401) {
      delete api.defaults.headers.common["Authorization"];
      console.warn("Received 401 after logout. Assuming logout succeeded.");
    } else {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  }
};

// Get Profile: Retrieves the authenticated user's profile.
export const getProfile = async () => {
  const response = await api.get("/profile/");
  return response.data;
};
