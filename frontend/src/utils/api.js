import axios from "axios";

const api = axios.create({
  baseURL: "https://productivity-pal-7h8y.onrender.com/api/endpoints",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
