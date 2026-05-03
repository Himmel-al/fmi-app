import { MdAdd, MdSearch } from "react-icons/md";
import { FaBell, FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex items-center gap-4 px-6 py-3.5 border-b border-white/[0.06] bg-[#0a0d14]/80 backdrop-blur-sm sticky top-0 z-50">

      {/* Left: Page Info */}
      <div className="flex-1">
        <h1 className="text-[17px] font-black text-slate-100 tracking-tight">Dashboard</h1>
        <p className="text-[11px] text-slate-600">
          Utama / <span className="text-amber-500">Ringkasan Operasional</span> — April 2026
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2 w-52">
        <MdSearch className="text-slate-600 text-base shrink-0" />
        <input
          type="text"
          placeholder="Cari produk, pesanan..."
          className="bg-transparent outline-none text-[12px] text-slate-400 placeholder-slate-700 w-full"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Cart */}
        <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-500 hover:bg-white/[0.08] hover:text-slate-300 transition-all cursor-pointer">
          <FaShoppingCart className="text-sm" />
          <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-amber-500 text-[8px] font-bold text-[#0a0d14] border-2 border-[#0f1117]">3</span>
        </div>

        {/* Bell */}
        <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-500 hover:bg-white/[0.08] hover:text-slate-300 transition-all cursor-pointer">
          <FaBell className="text-sm" />
          <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white border-2 border-[#0f1117]">12</span>
        </div>

        {/* Add Button */}
        <button className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#0a0d14] text-[12px] font-black px-4 py-2 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95">
          <MdAdd className="text-base" />
          Tambah Pesanan
        </button>
      </div>
    </header>
  );
}