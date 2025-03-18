import api from "../utils/api";

export const signup = async (userData) => {
  try {
    const response = await api.post("/api/register/", userData, {
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
    const response = await api.post("/api/login/", credentials, {
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

// export const getProfile = async () => {
//   const response = await api.get("/api/get-profile-info/");
//   if (!response.ok) {
//     throw new Error("Failed to fetch profile");
//   }
//   console.log(response.data);
//   return response.data;
// };

// ✅ Add Forgot Password Function
export const requestPasswordReset = async (email) => {
  try {
    const response = await api.post("/password-reset/", { email });

    console.log("Password reset email sent:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Password reset failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ✅ Add Reset Password Function (for setting a new password)
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post("/password-reset/confirm/", {
      token,
      password: newPassword,
    });

    console.log("Password successfully reset:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Password reset confirmation failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};
