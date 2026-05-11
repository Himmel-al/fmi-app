import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <div style={{ background: "#0d0f14", minHeight: "100vh" }}>
      <Outlet />
    </div>
  );
}