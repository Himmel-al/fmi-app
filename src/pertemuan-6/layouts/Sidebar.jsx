import { MdDashboard, MdOutlineListAlt, MdHeadsetMic, MdAdd } from "react-icons/md";

export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-[280px] flex-col bg-white p-6 shadow-sm"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col mb-10 mt-4 px-2">
        <span
          id="logo-title"
          className="font-poppins text-[42px] font-extrabold text-gray-900 leading-none"
        >
          Sedap<b id="logo-dot" className="text-hijau">.</b>
        </span>
        <span id="logo-subtitle" className="mt-2 text-xs font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      {/* List Menu */}
      <div id="sidebar-menu" className="flex-1">
        <ul id="menu-list" className="space-y-2">
          <li>
            <div
              id="menu-1"
              className="flex cursor-pointer items-center gap-4 rounded-xl p-4 font-semibold text-gray-500 hover:bg-green-50 hover:text-hijau transition-colors"
            >
              <MdDashboard className="text-2xl" />
              <span>Dashboard</span>
            </div>
          </li>
          <li>
            <div
              id="menu-2"
              className="flex cursor-pointer items-center gap-4 rounded-xl p-4 font-semibold text-gray-500 hover:bg-green-50 hover:text-hijau transition-colors"
            >
              <MdOutlineListAlt className="text-2xl" />
              <span>Orders</span>
            </div>
          </li>
          <li>
            <div
              id="menu-3"
              className="flex cursor-pointer items-center gap-4 rounded-xl p-4 font-semibold text-gray-500 hover:bg-green-50 hover:text-hijau transition-colors"
            >
              <MdHeadsetMic className="text-2xl" />
              <span>Customers</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div id="sidebar-footer" className="mt-auto px-2 pb-4">
        
        {/* Promo Card (Kotak Hijau) */}
        <div
          id="footer-card"
          className="relative mb-8 flex overflow-hidden rounded-2xl bg-hijau p-5 shadow-lg"
        >
          {/* Sisi Kiri: Teks & Tombol */}
          <div className="z-10 w-2/3 flex flex-col gap-4">
            <span id="footer-text" className="text-xs font-medium leading-relaxed text-white">
              Please organize your menus through button below!
            </span>
            <button
              id="add-menu-button"
              className="flex w-max items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              <MdAdd className="text-lg" />
              <span>Add Menus</span>
            </button>
          </div>
          
          {/* Sisi Kanan: Avatar */}
          <img
            id="footer-avatar"
            className="absolute -bottom-2 -right-2 w-24 object-cover"
            src="https://avatar.iran.liara.run/public/28"
            alt="User Avatar"
          />
        </div>

        {/* Copyright Text */}
        <div className="flex flex-col gap-1">
          <span id="footer-brand" className="text-sm font-bold text-gray-700">
            Sedap Restaurant Admin Dashboard
          </span>
          <p id="footer-copyright" className="text-xs font-medium text-gray-400">
            &copy; 2025 All Right Reserved
          </p>
        </div>
        
      </div>
    </div>
  );
}