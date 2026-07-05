import { Outlet, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Package, Home, LogOut, Layers } from "lucide-react";

export default function CustomerLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Tambahkan logika hapus token/session di sini jika ada (misal: localStorage.removeItem("token"))
    const konfirmasi = window.confirm("Apakah Anda yakin ingin keluar?");
    if (konfirmasi) {
      alert("Anda telah berhasil logout.");
      navigate("/login"); // Mengarahkan ke halaman login setelah logout
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-base-100 via-base-200 to-base-100 flex flex-col font-sans selection:bg-primary selection:text-primary-content">
      
      {/* ── NAVBAR/HEADER LUXURY & FUTURISTIC ── */}
      <header className="sticky top-0 z-50 px-4 pt-4">
        <div className="navbar max-w-7xl mx-auto rounded-2xl bg-base-100/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] border border-white/10 dark:border-white/5 px-6 md:px-8 transition-all duration-300 hover:shadow-primary/5">
          
          {/* LOGO AREA */}
          <div className="flex-1">
            <Link to="/customer" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl text-white shadow-md shadow-primary/20 transform transition-transform group-hover:rotate-12 duration-300">
                <Layers size={20} />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent tracking-wider group-hover:opacity-80 transition-opacity">
                SIPP
              </span>
            </Link>
          </div>

          {/* MENU NAVIGATION */}
          <div className="flex items-center gap-1 md:gap-3">
            <nav className="hidden md:flex gap-1 items-center">
              <Link className="btn btn-ghost btn-sm rounded-xl gap-2 hover:bg-primary/10 hover:text-primary transition-all duration-200" to="/customer">
                <Home size={16} />
                Home
              </Link>

              <Link className="btn btn-ghost btn-sm rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200" to="/customer/produk">
                Produk
              </Link>

              <Link className="btn btn-ghost btn-sm rounded-xl gap-2 hover:bg-primary/10 hover:text-primary transition-all duration-200" to="/customer/pesanan">
                <Package size={16} />
                Pesanan
              </Link>
            </nav>

            <div className="w-[1px] h-6 bg-base-content/10 hidden md:block mx-1"></div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2 items-center">
              {/* Keranjang Belanja */}
              <Link className="btn btn-ghost btn-circle btn-sm hover:bg-primary/10 hover:text-primary transition-all duration-200 relative group" to="/customer/keranjang">
                <ShoppingCart size={18} />
                {/* Efek Ping Dot Menandakan Aktif */}
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
              </Link>

              {/* Profile */}
              <Link className="btn btn-primary btn-sm rounded-xl gap-2 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300" to="/customer/profil">
                <User size={16} />
                <span className="hidden sm:inline">Profil</span>
              </Link>

              {/* Tombol Logout Futuristik */}
              <button 
                onClick={handleLogout}
                className="btn btn-ghost btn-sm btn-circle text-error/80 hover:text-error hover:bg-error/10 rounded-xl transition-all duration-200 group"
                title="Keluar Akun"
              >
                <LogOut size={18} className="transform transition-transform group-hover:translate-x-0.5 duration-200" />
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* ── KONTEN HALAMAN UTAMA ── */}
      <main className="container max-w-7xl mx-auto px-6 py-8 flex-grow">
        <div className="animate-fadeIn">
          <Outlet />
        </div>
      </main>

      {/* ── FOOTER MODERN ── */}
      <footer className="w-full bg-base-100 border-t border-base-200 mt-auto">
        <div className="max-w-7xl mx-auto footer footer-center p-6 text-base-content/60 text-xs tracking-wide">
          <div>
            <p className="font-medium">
              © 2026 <span className="font-bold text-primary">SIPP</span> — Crafted with premium experience.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}