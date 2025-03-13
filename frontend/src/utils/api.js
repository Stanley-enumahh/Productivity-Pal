import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
//   withCredentials: true, // Sends cookies with requests
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       try {
//         const refreshResponse = await api.post("/token/refresh/");
//         const { access } = refreshResponse.data;

//         // Set new access token
//         api.defaults.headers["Authorization"] = `Bearer ${access}`;

//         return api(error.config); // Retry the failed request
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
