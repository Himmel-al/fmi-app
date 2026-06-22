import { Navigate, Outlet } from "react-router-dom";

export default function CustomerRoute() {
  const role = localStorage.getItem("role");

  return role === "customer"
    ? <Outlet />
    : <Navigate to="/dashboard" />;
}