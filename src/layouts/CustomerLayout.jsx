import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingCart, User, Package, Home, LogOut, Layers, Sparkles } from "lucide-react";

export default function CustomerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  // Fungsi unik untuk memantau jumlah item di keranjang secara real-time
  useEffect(() => {
    const updateCartCount = () => {
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = currentCart.reduce((acc, item) => acc + item.qty, 0);
      setCartCount(totalItems);
    };

    updateCartCount();
    // Memantau perubahan localStorage dari komponen lain (seperti DashboardCustomer)
    window.addEventListener("storage", updateCartCount);
    const interval = setInterval(updateCartCount, 1000); // Polling pelengkap jika dalam tab yang sama

    return () => {
      window.removeEventListener("storage", updateCartCount);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin keluar dari portal premium?");
    if (konfirmasi) {
      localStorage.removeItem("token"); // Atur jika menggunakan token auth
      navigate("/login");
    }
  };

  // Helper untuk menandai menu aktif dengan aksen Emas Klasik
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#0d0b08] flex flex-col font-sans relative selection:bg-[#c9a84c] selection:text-[#0d0b08]">
      
      {/* ── BACKGROUND ORNAMENT LUXURY (GRID & GLOW) ── */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-[#c9a84c]/5 to-transparent filter blur-3xl pointer-events-none" />

      {/* ── NAVBAR/HEADER LUXURY GLASSMORPHISM ── */}
      <header className="sticky top-0 z-50 px-4 pt-4 pb-2 backdrop-blur-md bg-[#0d0b08]/10">
        <div className="navbar max-w-7xl mx-auto rounded-2xl bg-[#1a1610]/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-[#c9a84c]/20 px-6 md:px-8 transition-all duration-300 hover:border-[#c9a84c]/40">
          
          {/* BRAND LOGO AREA */}
          <div className="flex-1">
            <Link to="/customer" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-[#c9a84c] to-[#e8c97a] p-2 rounded-xl text-[#0d0b08] shadow-lg shadow-[#c9a84c]/20 transform transition-transform group-hover:rotate-12 duration-300">
                <Layers size={20} className="stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black font-serif text-white tracking-widest group-hover:text-[#c9a84c] transition-colors">
                  SIPP<span className="text-[#c9a84c]">.</span>
                </span>
                <span className="text-[9px] text-[#c9a84c] font-bold tracking-[0.2em] uppercase -mt-1 hidden sm:block">
                  Premium Portal
                </span>
              </div>
            </Link>
          </div>

          {/* PORTAL NAVIGATION LINKS */}
          <div className="flex items-center gap-2 md:gap-4">
            <nav className="hidden md:flex gap-2 items-center">
              <Link 
                className={`btn btn-sm font-medium rounded-xl gap-2 transition-all duration-300 border-none ${
                  isActive("/customer") 
                    ? "bg-[#c9a84c] text-[#0d0b08] shadow-md shadow-[#c9a84c]/20" 
                    : "bg-transparent text-white/70 hover:text-[#c9a84c] hover:bg-[#c9a84c]/5"
                }`} 
                to="/customer"
              >
                <Home size={15} />
                Dashboard
              </Link>

              <Link 
                className={`btn btn-sm font-medium rounded-xl transition-all duration-300 border-none ${
                  isActive("/customer/produk") 
                    ? "bg-[#c9a84c] text-[#0d0b08] shadow-md shadow-[#c9a84c]/20" 
                    : "bg-transparent text-white/70 hover:text-[#c9a84c] hover:bg-[#c9a84c]/5"
                }`} 
                to="/customer/produk"
              >
                Katalog Produk
              </Link>

              <Link 
                className={`btn btn-sm font-medium rounded-xl gap-2 transition-all duration-300 border-none ${
                  isActive("/customer/pesanan") 
                    ? "bg-[#c9a84c] text-[#0d0b08] shadow-md shadow-[#c9a84c]/20" 
                    : "bg-transparent text-white/70 hover:text-[#c9a84c] hover:bg-[#c9a84c]/5"
                }`} 
                to="/customer/pesanan"
              >
                <Package size={15} />
                Riwayat Pesanan
              </Link>
            </nav>

            {/* Separator Line */}
            <div className="w-[1px] h-6 bg-[#c9a84c]/20 hidden md:block mx-1"></div>

            {/* ACTION INTERACTIVE BUTTONS */}
            <div className="flex gap-2 items-center">
              
              {/* Keranjang Belanja dengan Badge Dinamis Eksklusif */}
              <Link 
                className={`btn btn-circle btn-sm transition-all duration-300 relative border-none ${
                  isActive("/customer/keranjang")
                    ? "bg-[#c9a84c] text-[#0d0b08]"
                    : "bg-[#2a2218] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0d0b08]"
                }`} 
                to="/customer/keranjang"
                title="Keranjang Belanja Premium"
              >
                <ShoppingCart size={16} />
                {cartCount > 0 ? (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#0d0b08] text-[10px] font-black border border-[#c9a84c] animate-bounce">
                    {cartCount}
                  </span>
                ) : (
                  <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9a84c] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#c9a84c]"></span>
                  </span>
                )}
              </Link>

              {/* Tombol Profil Pengguna */}
              <Link 
                className={`btn btn-sm rounded-xl gap-2 transition-all duration-300 border-none ${
                  isActive("/customer/profil")
                    ? "bg-white text-[#0d0b08]"
                    : "bg-[#2a2218] text-white hover:bg-white hover:text-[#0d0b08]"
                }`} 
                to="/customer/profil"
              >
                <User size={14} />
                <span className="hidden sm:inline text-xs font-semibold">Profil</span>
              </Link>

              {/* Tombol Keluar / Logout */}
              <button 
                onClick={handleLogout}
                className="btn btn-sm btn-circle bg-transparent border border-red-500/30 text-red-400 hover:text-white hover:bg-red-500 hover:border-red-500 rounded-xl transition-all duration-200 group"
                title="Keluar dari SIPP"
              >
                <LogOut size={15} className="transform transition-transform group-hover:translate-x-0.5 duration-200" />
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* ── KONTEN UTAMA DENGAN VIEW PORT ANIMASI ── */}
      <main className="container max-w-7xl mx-auto px-6 py-10 flex-grow relative z-10">
        <div className="transition-all duration-500 ease-out">
          <Outlet />
        </div>
      </main>

      {/* ── FOOTER CLASSIC LUXE ── */}
      <footer className="w-full bg-[#1a1610] border-t border-[#c9a84c]/10 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs tracking-wider">
          <div className="flex items-center gap-2 text-white/50">
            <Sparkles size={14} className="text-[#c9a84c]" />
            <p className="font-light">
              © {new Date().getFullYear()} <span className="font-bold font-serif text-white tracking-widest">SIPP</span> — Crafted for ultimate luxury experience.
            </p>
          </div>
          <div className="text-[#c9a84c]/60 text-[10px] font-bold uppercase tracking-[0.15em] hidden md:block">
            Sistem Informasi Pemesanan Perabot · Premium Client Suite
          </div>
        </div>
      </footer>

    </div>
  );
}