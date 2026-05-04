import "./App.css";
import "./assets/tailwind.css";

import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import KatalogProduk from "./pages/KatalogProduk";
import PesananMasuk from "./pages/PesananMasuk";
import StockGudang from "./pages/StockGudang";
import { Route, Routes } from "react-router-dom";
import Analitik from "./pages/Analitik";
import Pengaturan from "./pages/Pengaturan";

function App() {
  return (
    <div
      id="app-container"
      style={{ background: "#0d0f14", minHeight: "100vh", display: "flex" }}
    >
      <div
        id="layout-wrapper"
        style={{ display: "flex", flexDirection: "row", flex: 1 }}
      >
        <Sidebar />

        <div
          id="main-content"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#0d0f14",
            overflow: "hidden",
          }}
        >
          <Header />

          <div style={{ flex: 1, overflowY: "auto", background: "#0d0f14" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/katalogproduk" element={<KatalogProduk />} />
              <Route path="/pesananmasuk" element={<PesananMasuk />} />
              <Route path="/stockgudang" element={<StockGudang />} />             
              <Route path="/analitik" element={<Analitik />} />
              <Route path="/pengaturan" element={<Pengaturan />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
