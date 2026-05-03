import {
  MdDashboard,
  MdOutlineListAlt,
  MdHeadsetMic,
  MdAdd,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

const menuClass = ({ isActive }) =>
  `flex cursor-pointer items-center rounded-xl p-4  space-x-2
        ${
          isActive
            ? "text-hijau bg-green-200 font-extrabold"
            : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`;

export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-70 flex-col bg-white p-6 shadow-sm"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col mb-10 mt-4 px-2">
        <span
          id="logo-title"
          className="font-poppins text-[42px] font-extrabold text-gray-900 leading-none"
        >
          SIPP
          <b id="logo-dot" className="text-hijau">
            .
          </b>
        </span>
        <span
          id="logo-subtitle"
          className="mt-2 text-xs font-semibold text-gray-400"
        >
          Modern Admin Dashboard
        </span>
      </div>

      {/* List Menu */}
      <div id="sidebar-menu" className="flex-1">
        <ul id="menu-list" className="space-y-2">
          <li>
            <NavLink id="menu-1" to="/" className={menuClass}>
              <MdDashboard className="text-2xl" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-2" to="/katalogproduk" className={menuClass}>
              <MdOutlineListAlt className="text-2xl" />
              <span>Katalog Produk</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-3" to="/PesananMasuk" className={menuClass}>
              <MdHeadsetMic className="text-2xl" />
              <span>Pesanan Masuk</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-4" to="/StockGudang" className={menuClass}>
              <MdHeadsetMic className="text-2xl" />
              <span>Stock Gudang</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div id="sidebar-footer" className="mt-auto px-2 pb-4">
        {/* Promo Card (Kotak Hijau) */}
        <div
          id="footer-card"
          className="relative mb-8 flex overflow-hidden rounded-2xl bg-hijau p-4 shadow-lg"
        >
          {/* Sisi Kiri: Teks & Tombol */}
          <div className="z-10 flex w-2/3 flex-col gap-3">
            <span
              id="footer-text"
              className="text-xs font-medium leading-snug text-white"
            >
              Please organize your menus through button below!
            </span>
            <button
              id="add-menu-button"
              className="flex w-max items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              <span className="text-lg">+</span>
              <span>Add Menus</span>
            </button>
          </div>

          {/* Sisi Kanan: Avatar */}
          <img
            id="footer-avatar"
            src="data:image/jpeg;base64,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"
            alt="User Avatar"
            className="h-12 w-12 rounded-full object-cover shadow-sm"
          />
        </div>

        {/* Copyright Text */}
        <div className="flex flex-col gap-1">
          <span id="footer-brand" className="text-sm font-bold text-gray-700">
            Sedap Restaurant Admin Dashboard
          </span>
          <p
            id="footer-copyright"
            className="text-xs font-medium text-gray-400"
          >
            &copy; 2025 All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
