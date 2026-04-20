import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    return (
        <div id="header-container" className="flex items-center justify-between bg-white px-6 py-4">
            
            {/* Search Bar */}
            <div id="search-bar" className="relative w-full max-w-md">
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search Here..."
                    className="w-full rounded-2xl bg-gray-50 px-5 py-3 text-sm text-gray-700 outline-none transition-all focus:ring-2 focus:ring-green-100"
                />
                <FaSearch id="search-icon" className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Icon & Profile Section */}
            <div id="icons-container" className="flex items-center gap-6">
                
                {/* Group Ikon */}
                <div className="flex items-center gap-4">
                    {/* Notification Icon */}
                    <div id="notification-icon" className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-500 transition-colors hover:bg-blue-100">
                        <FaBell />
                        <span id="notification-badge" className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-[10px] font-bold text-white">
                            50
                        </span>
                    </div>
                    
                    {/* Chart Icon */}
                    <div id="chart-icon" className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-blue-50 text-2xl transition-colors hover:bg-blue-100">
                        <FcAreaChart />
                    </div>
                    
                    {/* Settings Icon */}
                    <div id="settings-icon" className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-red-50 text-xl text-red-500 transition-colors hover:bg-red-100">
                        <SlSettings />
                    </div>
                </div>

                {/* Garis Pemisah (Divider) */}
                <div className="h-10 w-px bg-gray-200"></div>

                {/* Profile Section */}
                <div id="profile-container" className="flex items-center gap-3">
                    <span id="profile-text" className="text-sm text-gray-500">
                        Hello, <b className="text-gray-800">Fikri Muhaffizh</b>
                    </span>
                    <img
                        id="profile-avatar"
                        src="https://avatar.iran.liara.run/public/28"
                        alt="Profile Avatar"
                        className="h-12 w-12 rounded-full object-cover shadow-sm"
                    />
                </div>
                
            </div>
        </div>
    );
}