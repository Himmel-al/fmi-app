import api from "./axios";

export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data; // { user, token }
};

export const registerUser = async (name, email, password) => {
  const response = await api.post("/auth/register", { name, email, password });
  return response.data;
};

export const logoutUser = async () => {
  await api.post("/auth/logout");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("token");
};