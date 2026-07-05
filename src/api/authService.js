import api from "./axios";

export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const registerUser = async (formData) => {
  const response = await api.post("/auth/register", {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    phone: formData.phone,
    address: formData.address,
    role: "customer", // dipaksa customer, tidak bisa diubah dari form
  });
  return response.data;
};

export const logoutUser = async () => {
  await api.post("/auth/logout");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("token");
};