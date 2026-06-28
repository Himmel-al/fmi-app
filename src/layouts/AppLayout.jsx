import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";


export default function AppLayout() {
  return (
    <div style={{ background: "#0d0f14", minHeight: "100vh", display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
        <Sidebar/>
        {/* <Navbar/> */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#0d0f14", overflow: "hidden" }}>
          <Header />
          <div style={{ flex: 1, overflowY: "auto", background: "#0d0f14" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}