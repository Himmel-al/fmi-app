import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api-url.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Otomatis sisipkan token di setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tangani response error global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired/invalid → paksa logout
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;