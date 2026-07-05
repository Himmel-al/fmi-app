import "./App.css";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestLayout from "./layouts/GuestLayout";

// Menambahkan lazy import untuk LandingPage
const LandingPage = lazy(() => import("./pages/LandingPage"));

// Ganti import biasa → lazy
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const KatalogProduk = lazy(() => import("./pages/KatalogProduk"));
const PesananMasuk = lazy(() => import("./pages/PesananMasuk"));
const Pengaturan = lazy(() => import("./pages/Pengaturan"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const CustomerRoute = lazy(() => import("./components/CustomerRoute"));
const AdminRoute = lazy(() => import("./components/AdminRoute"));

const CustomerLayout = lazy(() => import("./layouts/CustomerLayout"));

const DashboardCustomer = lazy(
  () => import("./pages/customer/DashboardCustomer"),
);

const ProdukCustomer = lazy(() => import("./pages/customer/ProdukCustomer"));
const Keranjang = lazy(() => import("./pages/customer/Keranjang"));
const RiwayatPesanan = lazy(() => import("./pages/customer/RiwayatPesanan"));
const ProfilCustomer = lazy(() => import("./pages/customer/ProfilCustomer"));

// ── TAMBAHAN IMPORT FITUR BARU CUSTOMER ──
const Checkout = lazy(() => import("./pages/customer/Checkout"));
const DetailProdukCustomer = lazy(() => import("./pages/customer/DetailProdukCustomer"));

// ── PERBAIKAN: LAZY IMPORT UNTUK OWNER ──
const DashboardOwner = lazy(() => import("./pages/owner/DashboardOwner"));
const StockGudangOwner = lazy(() => import("./pages/owner/StockGudang"));
const LaporanKeuangan = lazy(() => import("./pages/owner/LaporanKeuangan"));

function LoadingScreen() {
  return (
    <div
      style={{
        background: "#0d0f14",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          border: "3px solid #ffffff15",
          borderTop: "3px solid #f59e0b",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p style={{ color: "#64748b", fontSize: "13px" }}>Memuat halaman...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Guest / Umum */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* Autentikasi */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot />} />
        </Route>

        {/* Rute Khusus Customer */}
        <Route element={<CustomerRoute />}>
          <Route element={<CustomerLayout />}>
            <Route path="/customer" element={<DashboardCustomer />} />
            <Route path="/customer/produk" element={<ProdukCustomer />} />
            <Route path="/customer/keranjang" element={<Keranjang />} />
            <Route path="/customer/pesanan" element={<RiwayatPesanan />} />
            <Route path="/customer/profil" element={<ProfilCustomer />} />
            
            {/* ── MENAMBAHKAN RUTE BARU DI SINI ── */}
            <Route path="/customer/checkout" element={<Checkout />} />
            <Route path="/customer/produk/:id" element={<DetailProdukCustomer />} />
          </Route>
        </Route>

        {/* Rute Khusus Admin */}
        <Route element={<AdminRoute />}>
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/katalogproduk" element={<KatalogProduk />} />
              <Route path="/pesananmasuk" element={<PesananMasuk />} />
              <Route path="/pengaturan" element={<Pengaturan />} />
              <Route path="/products/:id" element={<ProductDetail />} />
            </Route>
          </Route>
        </Route>

        {/* ── PERBAIKAN: RUTE KHUSUS OWNER ── */}
        {/* Sementara ditaruh di luar middleware auth kustom agar akun dummy aman diakses */}
        <Route path="/owner" element={<DashboardOwner />} />
        <Route path="/ownerStockGudang" element={<StockGudangOwner />} />
        <Route path="/ownerLaporanKeuangan" element={<LaporanKeuangan />} />


      </Routes>
    </Suspense>
  );
}

export default App;