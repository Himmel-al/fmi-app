import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
        <div id="dashboard-container" className="w-full">
            <PageHeader/>
            
            {/* Grid Container */}
            <div id="dashboard-grid" className="p-6 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                
                {/* Card 1: Total Orders */}
                <div id="dashboard-orders" className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-5">
                    <div id="orders-icon" className="bg-hijau w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl">
                        <FaShoppingCart />
                    </div>
                    <div id="orders-info" className="flex flex-col">
                        <span id="orders-count" className="text-2xl font-bold text-teks">75</span>
                        <span id="orders-text" className="text-teks-samping text-sm">Total Orders</span>
                    </div>
                </div>

                {/* Card 2: Total Delivered */}
                <div id="dashboard-delivered" className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-5">
                    <div id="delivered-icon" className="bg-biru w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl">
                        <FaTruck />
                    </div>
                    <div id="delivered-info" className="flex flex-col">
                        <span id="delivered-count" className="text-2xl font-bold text-teks">175</span>
                        <span id="delivered-text" className="text-teks-samping text-sm">Total Delivered</span>
                    </div>
                </div>

                {/* Card 3: Total Canceled */}
                <div id="dashboard-canceled" className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-5">
                    <div id="canceled-icon" className="bg-merah w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl">
                        <FaBan />
                    </div>
                    <div id="canceled-info" className="flex flex-col">
                        <span id="canceled-count" className="text-2xl font-bold text-teks">40</span>
                        <span id="canceled-text" className="text-teks-samping text-sm">Total Canceled</span>
                    </div>
                </div>

                {/* Card 4: Total Revenue */}
                <div id="dashboard-revenue" className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-5">
                    <div id="revenue-icon" className="bg-kuning w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl">
                        <FaDollarSign />
                    </div>
                    <div id="revenue-info" className="flex flex-col">
                        <span id="revenue-amount" className="text-2xl font-bold text-teks">Rp.128</span>
                        <span id="revenue-text" className="text-teks-samping text-sm">Total Revenue</span>
                    </div>
                </div>

            </div>
        </div>
    );
}