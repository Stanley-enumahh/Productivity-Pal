import axios from "axios";

const api = axios.create({
  baseURL: "https://productivity-pal-7h8y.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};
export default api;
