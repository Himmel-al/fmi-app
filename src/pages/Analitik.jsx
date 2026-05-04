import React from "react";
import PageHeader from "../components/PageHeader";

export default function Analitik() {
  // Data dummy untuk Top Produk
  const topProducts = [
    {
      name: "Sofa Premium L-Shape",
      category: "Sofa",
      sold: 42,
      revenue: "Rp 357.000.000",
      progress: "85%",
    },
    {
      name: "Meja Makan Minimalis",
      category: "Meja",
      sold: 32,
      revenue: "Rp 102.400.000",
      progress: "65%",
    },
    {
      name: "Lemari Pakaian 4 Pintu",
      category: "Lemari",
      sold: 25,
      revenue: "Rp 135.000.000",
      progress: "50%",
    },
    {
      name: "Kursi Kerja Ergonomis",
      category: "Kursi",
      sold: 20,
      revenue: "Rp 42.000.000",
      progress: "40%",
    },
    {
      name: "Tempat Tidur Queen",
      category: "Kasur",
      sold: 16,
      revenue: "Rp 124.800.000",
      progress: "30%",
    },
  ];

  return (
    <div className="text-white min-h-screen">
      <PageHeader
        title="Analitik"
        breadcrumb={[{ label: "Dashboard" }, { label: "Analitik" }]}
      />

      <div className="p-6 md:p-8">
        {/* Header Title & Filter */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">
              Analitik Bisnis
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              Ringkasan performa penjualan dan pendapatan.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select className="bg-[#14151a] border border-gray-700 text-gray-300 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-orange-500">
              <option>Bulan Ini (Mei 2026)</option>
              <option>Bulan Lalu (Apr 2026)</option>
              <option>3 Bulan Terakhir</option>
              <option>Tahun Ini (2026)</option>
            </select>
            <button
              className="bg-gray-800 hover:bg-gray-700 text-white p-2.5 rounded-lg border border-gray-700 transition-colors"
              title="Download Laporan"
            >
              📥
            </button>
          </div>
        </div>

        {/* --- 4 Kartu KPI (Key Performance Indicators) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a1c23] p-5 rounded-xl border border-gray-800 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-emerald-500/5 text-8xl">
              💰
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Pendapatan</p>
            <h3 className="text-2xl font-bold mb-2">Rp 761.2M</h3>
            <div className="flex items-center text-xs">
              <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded font-medium mr-2">
                ↑ 12.5%
              </span>
              <span className="text-gray-500">vs bulan lalu</span>
            </div>
          </div>

          <div className="bg-[#1a1c23] p-5 rounded-xl border border-gray-800 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-blue-500/5 text-8xl">
              🛍️
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Pesanan</p>
            <h3 className="text-2xl font-bold mb-2">135</h3>
            <div className="flex items-center text-xs">
              <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded font-medium mr-2">
                ↑ 8.2%
              </span>
              <span className="text-gray-500">vs bulan lalu</span>
            </div>
          </div>

          <div className="bg-[#1a1c23] p-5 rounded-xl border border-gray-800 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-orange-500/5 text-8xl">
              📈
            </div>
            <p className="text-gray-400 text-sm mb-1">
              Rata-rata Nilai Pesanan
            </p>
            <h3 className="text-2xl font-bold mb-2">Rp 5.6M</h3>
            <div className="flex items-center text-xs">
              <span className="text-red-500 bg-red-500/10 px-2 py-0.5 rounded font-medium mr-2">
                ↓ 2.1%
              </span>
              <span className="text-gray-500">vs bulan lalu</span>
            </div>
          </div>

          <div className="bg-[#1a1c23] p-5 rounded-xl border border-gray-800 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-purple-500/5 text-8xl">
              🎯
            </div>
            <p className="text-gray-400 text-sm mb-1">Tingkat Konversi</p>
            <h3 className="text-2xl font-bold mb-2">4.8%</h3>
            <div className="flex items-center text-xs">
              <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded font-medium mr-2">
                ↑ 1.1%
              </span>
              <span className="text-gray-500">vs bulan lalu</span>
            </div>
          </div>
        </div>

        {/* --- Bagian Tengah: Grafik Utama & Kategori --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Chart (Placeholder) - Mengambil 2/3 lebar pada layar besar */}
          <div className="lg:col-span-2 bg-[#1a1c23] p-6 rounded-xl border border-gray-800 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Tren Pendapatan</h3>
              <div className="flex gap-2">
                <span className="flex items-center text-xs text-gray-400">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>{" "}
                  Aktual
                </span>
                <span className="flex items-center text-xs text-gray-400">
                  <div className="w-3 h-3 bg-gray-600 rounded-full mr-2"></div>{" "}
                  Target
                </span>
              </div>
            </div>

            {/* Tempat untuk komponen chart seperti <LineChart /> dari Recharts */}
            <div className="flex-1 flex items-end gap-2 h-64 border-b border-l border-gray-700 pb-2 pl-2 relative">
              {/* Garis Horizontal Bantuan */}
              <div className="absolute w-full border-t border-dashed border-gray-700/50 bottom-1/4"></div>
              <div className="absolute w-full border-t border-dashed border-gray-700/50 bottom-2/4"></div>
              <div className="absolute w-full border-t border-dashed border-gray-700/50 bottom-3/4"></div>

              {/* Simulasi Bar Chart dengan CSS */}
              {[40, 55, 45, 70, 65, 85, 95].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end group">
                  <div
                    className="bg-orange-500/80 hover:bg-orange-400 rounded-t-sm transition-all duration-300 relative"
                    style={{ height: `${height}%` }}
                  >
                    {/* Tooltip pada hover */}
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs px-2 py-1 rounded">
                      {height}M
                    </div>
                  </div>
                  {/* Label Bulan */}
                  <div className="text-center text-xs text-gray-500 mt-2">
                    {["Nov", "Des", "Jan", "Feb", "Mar", "Apr", "Mei"][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statistik Kategori Penjualan */}
          <div className="bg-[#1a1c23] p-6 rounded-xl border border-gray-800">
            <h3 className="font-bold text-lg mb-6">Penjualan per Kategori</h3>
            <div className="flex flex-col gap-5">
              {[
                { name: "Sofa", percent: "45%", color: "bg-orange-500" },
                { name: "Meja", percent: "25%", color: "bg-blue-500" },
                { name: "Lemari", percent: "15%", color: "bg-emerald-500" },
                { name: "Kasur", percent: "10%", color: "bg-purple-500" },
                { name: "Lainnya", percent: "5%", color: "bg-gray-500" },
              ].map((cat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-300">{cat.name}</span>
                    <span className="text-gray-400 font-mono">
                      {cat.percent}
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className={`${cat.color} h-2 rounded-full`}
                      style={{ width: cat.percent }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Tabel Produk Teratas --- */}
        <div className="bg-[#1a1c23] rounded-xl border border-gray-800 overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex justify-between items-center">
            <h3 className="font-bold text-lg">Produk Terlaris</h3>
            <button className="text-orange-500 text-sm hover:underline">
              Lihat Semua
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="bg-[#1e2029]">
                <tr className="text-gray-400 text-sm border-b border-gray-800">
                  <th className="p-4 font-medium w-12 text-center">No</th>
                  <th className="p-4 font-medium">Nama Produk</th>
                  <th className="p-4 font-medium">Kategori</th>
                  <th className="p-4 font-medium text-center">Unit Terjual</th>
                  <th className="p-4 font-medium">Pendapatan</th>
                  <th className="p-4 font-medium w-48">Proporsi Penjualan</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {topProducts.map((product, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="p-4 text-center text-gray-500 font-medium">
                      {/* Memberikan warna khusus untuk ranking 1, 2, 3 */}
                      {index === 0
                        ? "🥇"
                        : index === 1
                          ? "🥈"
                          : index === 2
                            ? "🥉"
                            : index + 1}
                    </td>
                    <td className="p-4 text-gray-200 font-medium">
                      {product.name}
                    </td>
                    <td className="p-4 text-gray-400">{product.category}</td>
                    <td className="p-4 text-center text-orange-500 font-bold">
                      {product.sold}
                    </td>
                    <td className="p-4 text-gray-300 font-mono">
                      {product.revenue}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                          <div
                            className="bg-orange-500 h-1.5 rounded-full"
                            style={{ width: product.progress }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
