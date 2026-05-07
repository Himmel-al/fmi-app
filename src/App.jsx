import "./App.css";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";

import Dashboard from "./pages/Dashboard";
import KatalogProduk from "./pages/KatalogProduk";
import PesananMasuk from "./pages/PesananMasuk";
import StockGudang from "./pages/StockGudang";
import Analitik from "./pages/Analitik";
import Pengaturan from "./pages/Pengaturan";

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forgot />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/katalogproduk" element={<KatalogProduk />} />
          <Route path="/pesananmasuk" element={<PesananMasuk />} />
          <Route path="/stockgudang" element={<StockGudang />} />
          <Route path="/analitik" element={<Analitik />} />
          <Route path="/pengaturan" element={<Pengaturan />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
