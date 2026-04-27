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
                        Hello, <b className="text-gray-800">Hafiz</b>
                    </span>
                    <img
                        id="profile-avatar"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXQ0NCxsbG0tLTPz8/MzMy8vLy5ubmysrLGxsbJycnCwsK4uLjExMS/v7/T09Ourq7IXhHVAAAFBElEQVR4nO2d27KbMAxFuZirQf7/v20ISSAJJAY28fap1kwf2ul0WLWxLNnoJImiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKMoZiIy//iQiputLm2WZLdom+WuaktRF6tIHLi2bv+Qo5knvJpnVf8VRGvumNzpaE/rZEIhZ8bs6tvEPY16s+w2KZegHPIjUn/SuZKGf8RD5hwk6KeahH3M3HgMY9yjK5zdwhg39qPvwmqE3yjzCLY6pvP0uuCor6qgspfYfwIelK+vQz+2NtNsFr5KxbOT815h3xyg2cgcEB8eOfhiPCV4UC3JFKY8J0iseHUF6RYQgdVIlPULwotiENllhbxx8pwqtssKOncwafWiXRRqcYJoyZo050I9zEDOoIeGbeDjSP+P4Eo26gBqmRWihdyTpoYqhfZYQA3wXHWceJSVOke9FHLEwQ8Z4MYCLioRLzRWBLTcla4JhUHHRshoKaj3lNUQtp7SzFBb3WVeaJGlBhm1okVU6jCBtJQNnyJgDj4BmaUa70KBWGtZNW4IyJE0trmAyYdp4n4AMCYsYExBD6gsaCEPqIYSsNLx70gFExOeN9gPHE0TiDdsVOVqqIT4+HMh7ezQF5hZEnF7Ygng/AzphYw4WqNSJdxRRx8C8mQXqHJh3440qefMaoqqlvIb/QYaPKepT79sg05TwnsIEpNTGWw1OQKspdfYkgByf+fplghhE4j3byOEbisTBcOTwTW/mUDEidfb+VayvnqO9ZvKE5M0+wd6wv4MT+wy70I/tz74tOHNy/8ausEgfJ+bsyvap96Ov7Ar8vPcvFthzryaCSDhnR8mG+Ox+ie3V/ciGcMebSJ5SLLBxOaU+911m44deMcXCO1uyjOhewhF/xUgFN9Q0YhX0jvt9dMvoHd8CcWSxfoZv9TSqpGKO/76Gugb8Ce8sMaqsYuDxWnmm+rHNUjH2UY7wUnT3+kxPfKw2p58vjh7NhtzjHlvqMv52g1IP/YWmi03fd6eTYH/9naF2nHoImumPPrdUco+Zecu3XJHTOoqZPniuZkdkH86+XfVoLDRtgFgd537pc76X98t1fjcLhM9NJwq+ufril76mtHX5Kumcnde4XxJmZ7nWHGkWPsh/7hgoSdOW2SDmhr9qi3o+FeX9pMNlHc1klXolJrwOg0iSm6Yx5rUJ3VoDNIpetZK31VpAcL4RfDWkuKoP/EZepufKs91mqkcPti8f8g+vazjJLvsaz7MvB0pivtY6XFoEKQLIWgx4c2zXV4yhjbIPX/+j8CyunqvPV3YLb5OIab/OgenfqH6aRH7sgLwyCEXX5IPWwGUT0LSFv97N8Wcd+bb73R7RpZm1trQ2S92ef+FnqQesqdcOx19kkGbj5AIrnt+V17MD8nlU517s29NfNi5FAsFzD+JMaLmREw9TsV3ZdnPa1SJcf52jnHXzBtZe5zDunB0cspXXYU4x5BnCWZkcCeKSOo5TjhxDSz1xxmFORzRJ0zO+jTr8kTYY/JV+bJPZ4+C7EFHsSGfgr+DQ7GfuoF9EttfwhP4gZJMUHxGh7boxgJcaUDMBIOiYT7VluwJeTPkWGvg3RJt+gtNvwOaIbDuaAWxAJFxKwZfh2PZsA9iQj2q8igSbXdDtSlOwIVUR6g7WkDAcgov7JMXuJ7CGw0/UpgNqqCiKoiiKoiiKoiiKoiiKoiiKoiiKoiiKoiiKEgX/AEs0SMeP3JJ6AAAAAElFTkSuQmCC"
                        alt="Profile Avatar"
                        className="h-12 w-12 rounded-full object-cover shadow-sm"
                    />
                </div>
                
            </div>
        </div>
    );
}