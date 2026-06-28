import { Outlet, Link } from "react-router-dom";
import { ShoppingCart, User, Package } from "lucide-react";

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="navbar bg-base-100 shadow-sm px-8 sticky top-0 z-50">
        <div className="flex-1">
          <Link
            to="/"
            className="text-2xl font-bold text-primary"
          >
            SIPP
          </Link>
        </div>

        <div className="flex gap-2">
          <Link className="btn btn-ghost" to="/">
            Home
          </Link>

          <Link className="btn btn-ghost" to="/produk">
            Produk
          </Link>

          <Link className="btn btn-ghost" to="/pesanan">
            <Package size={18} />
            Pesanan
          </Link>

          <Link className="btn btn-ghost" to="/keranjang">
            <ShoppingCart size={18} />
          </Link>

          <Link className="btn btn-primary" to="/profil">
            <User size={18} />
            Profil
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>

      <footer className="footer footer-center p-10 bg-base-200 mt-20">
        <div>
          <p>
            © 2026 FurniMart - Sistem Pemesanan
            Perabotan
          </p>
        </div>
      </footer>
    </div>
  );
}