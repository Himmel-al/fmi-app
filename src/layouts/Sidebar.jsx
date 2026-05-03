import {
  MdDashboard,
  MdOutlineChair,
  MdShoppingCart,
  MdPeopleOutline,
  MdOutlineInventory2,
  MdBarChart,
  MdSettings,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

const navItems = [
  { id: "dashboard", path: "/", icon: MdDashboard, label: "Dashboard" },
  { id: "katalog", path: "/katalogproduk", icon: MdOutlineChair, label: "Katalog Produk" },
  { id: "pesanan", path: "/PesananMasuk", icon: MdShoppingCart, label: "Pesanan Masuk", badge: "12", badgeColor: "red" },
  { id: "stok", path: "/StockGudang", icon: MdOutlineInventory2, label: "Stok Gudang", badge: "3", badgeColor: "amber" },
  { id: "pelanggan", path: "/DataPelanggan", icon: MdPeopleOutline, label: "Data Pelanggan" },
];

const reportItems = [
  { id: "analitik", path: "/analitik", icon: MdBarChart, label: "Analitik" },
  { id: "pengaturan", path: "/pengaturan", icon: MdSettings, label: "Pengaturan" },
];

const menuClass = ({ isActive }) =>
  `flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer text-[13px] font-semibold transition-all ${
    isActive
      ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
      : "text-slate-500 border border-transparent hover:bg-white/[0.05] hover:text-slate-300"
  }`;

export default function Sidebar() {
  return (
    <div className="flex min-h-screen w-60 flex-col bg-[#0a0d14] border-r border-white/[0.06] p-4">
      
      {/* Logo */}
      <div className="px-2 pt-2 pb-8">
        <span className="text-[32px] font-black text-slate-50 tracking-tight leading-none">
          SIPP<b className="text-amber-500">.</b>
        </span>
        <p className="mt-1 text-[9px] uppercase tracking-[3px] font-bold text-slate-600">
          Furniture Management
        </p>
      </div>

      {/* Main Menu */}
      <p className="px-2 mb-2 text-[9px] uppercase tracking-[2px] font-bold text-slate-700">
        Main Menu
      </p>
      <ul className="space-y-0.5 mb-4">
        {navItems.map((item) => (
          <li key={item.id}>
            <NavLink to={item.path} className={menuClass}>
              <item.icon className="text-[18px] shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    item.badgeColor === "red"
                      ? "bg-red-500 text-white"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Laporan */}
      <p className="px-2 mb-2 text-[9px] uppercase tracking-[2px] font-bold text-slate-700">
        Laporan
      </p>
      <ul className="space-y-0.5">
        {reportItems.map((item) => (
          <li key={item.id}>
            <NavLink to={item.path} className={menuClass}>
              <item.icon className="text-[18px] shrink-0" />
              <span className="flex-1">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-white/[0.05]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[12px] font-black text-[#0a0d14] shrink-0">
            HA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-bold text-slate-200 truncate">Hafiz Anshori</p>
            <p className="text-[10px] text-slate-500">Manajer Operasional</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_theme('colors.emerald.400')]" />
        </div>
      </div>
    </div>
  );
}