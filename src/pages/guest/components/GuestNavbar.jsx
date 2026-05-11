import { Link } from "react-router-dom";

export default function GuestNavbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 border-b border-gray-100"
      style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)" }}>
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
          style={{ background: "#4CAF50" }}>🍽️</div>
        <div>
          <span className="text-xl font-black" style={{ color: "#1a1a2e" }}>Sedap</span>
          <span className="text-2xl leading-none" style={{ color: "#4CAF50" }}>.</span>
          <p className="text-[9px] tracking-widest uppercase -mt-1" style={{ color: "#9e9e9e" }}>
            Modern Food App
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {[
          { label: "Beranda", href: "#beranda" },
          { label: "Tentang", href: "#tentang" },
          { label: "Menu", href: "#produk" },
          { label: "Testimoni", href: "#testimoni" },
        ].map((m) => (
          <a key={m.label} href={m.href}
            className="text-sm font-medium transition-colors hover:text-green-600"
            style={{ color: "#616161" }}>
            {m.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Link to="/login"
          className="text-sm font-medium px-4 py-2 rounded-lg border transition-all hover:border-green-500"
          style={{ color: "#616161", borderColor: "#e0e0e0" }}>
          Masuk
        </Link>
        <Link to="/register"
          className="text-sm font-bold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
          style={{ background: "#4CAF50" }}>
          Daftar Gratis
        </Link>
      </div>
    </nav>
  );
}