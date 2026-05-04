import React from "react";
import PageHeader from "../components/PageHeader";

export default function StockGudang() {
  // Data dummy untuk tabel stok gudang
  const stockItems = [
    {
      sku: "SF-001",
      name: "Sofa Premium L-Shape",
      category: "Sofa",
      price: "Rp 8.500.000",
      stock: 12,
      status: "Aman",
      statusColor:
        "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    },
    {
      sku: "MJ-002",
      name: "Meja Makan Minimalis",
      category: "Meja",
      price: "Rp 3.200.000",
      stock: 8,
      status: "Aman",
      statusColor:
        "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    },
    {
      sku: "LM-003",
      name: "Lemari Pakaian 4 Pintu",
      category: "Lemari",
      price: "Rp 5.400.000",
      stock: 5,
      status: "Aman",
      statusColor:
        "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    },
    {
      sku: "TT-005",
      name: "Tempat Tidur Queen",
      category: "Kasur",
      price: "Rp 7.800.000",
      stock: 3,
      status: "Menipis",
      statusColor: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
    },
    {
      sku: "KR-008",
      name: "Kursi Makan Kayu Jati",
      category: "Kursi",
      price: "Rp 850.000",
      stock: 0,
      status: "Habis",
      statusColor: "bg-red-500/10 text-red-500 border border-red-500/20",
    },
  ];

  return (
    <div className="text-white min-h-screen">
      <PageHeader
        title="Stock Gudang"
        breadcrumb={[{ label: "Dashboard" }, { label: "Stock Gudang" }]}
        buttonLabel="+ Tambah Stock"
        buttonStyle="orange"
      />

      <div className="p-6 md:p-8">
        {/* --- 4 Kartu Ringkasan Atas --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a1c23] p-5 rounded-xl border border-gray-800 flex items-center gap-4 shadow-sm">
            <div className="bg-blue-500/20 p-3 rounded-xl flex items-center justify-center h-12 w-12">
              <span className="text-blue-500 text-xl">📦</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">148</h3>
              <p className="text-gray-400 text-sm">Total Item Tersedia</p>
            </div>
          </div>

          <div className="bg-[#1a1c23] p-5 rounded-xl border border-gray-800 flex items-center gap-4 shadow-sm">
            <div className="bg-amber-500/20 p-3 rounded-xl flex items-center justify-center h-12 w-12">
              <span className="text-amber-500 text-xl">⚠️</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">4</h3>
              <p className="text-gray-400 text-sm">Stok Menipis ({"<"} 5)</p>
            </div>
          </div>

          <div className="bg-[#1a1c23] p-5 rounded-xl border border-gray-800 flex items-center gap-4 shadow-sm">
            <div className="bg-red-500/20 p-3 rounded-xl flex items-center justify-center h-12 w-12">
              <span className="text-red-500 text-xl">❌</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">1</h3>
              <p className="text-gray-400 text-sm">Stok Habis</p>
            </div>
          </div>

          <div className="bg-[#1a1c23] p-5 rounded-xl border border-gray-800 flex items-center gap-4 shadow-sm">
            <div className="bg-emerald-500/20 p-3 rounded-xl flex items-center justify-center h-12 w-12">
              <span className="text-emerald-500 text-xl">💎</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Rp 1.2B</h3>
              <p className="text-gray-400 text-sm">Estimasi Nilai Aset</p>
            </div>
          </div>
        </div>

        {/* --- Baris Filter & Search --- */}
        <div className="bg-[#1a1c23] p-4 rounded-xl border border-gray-800 mb-6 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center bg-[#14151a] border border-gray-700 rounded-lg overflow-hidden w-full md:w-auto md:min-w-[320px]">
            <span className="pl-3 text-gray-500">🔍</span>
            <input
              type="text"
              placeholder="Cari SKU atau Nama Produk..."
              className="bg-transparent text-sm text-gray-200 p-2.5 w-full focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <select className="bg-[#14151a] border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-gray-500">
              <option>Semua Kategori</option>
              <option>Sofa</option>
              <option>Meja</option>
              <option>Lemari</option>
              <option>Kursi</option>
              <option>Kasur</option>
            </select>

            <select className="bg-[#14151a] border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-gray-500">
              <option>Semua Status</option>
              <option>Aman</option>
              <option>Menipis</option>
              <option>Habis</option>
            </select>
          </div>
        </div>

        {/* --- Tabel Data Stok --- */}
        <div className="bg-[#1a1c23] rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="bg-[#1e2029]">
                <tr className="text-gray-400 text-sm border-b border-gray-800">
                  <th className="p-4 font-medium">SKU</th>
                  <th className="p-4 font-medium">Nama Produk</th>
                  <th className="p-4 font-medium">Kategori</th>
                  <th className="p-4 font-medium">Harga Satuan</th>
                  <th className="p-4 font-medium text-center">Jumlah Stok</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {stockItems.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="p-4 text-gray-400 font-mono">{item.sku}</td>
                    <td className="p-4 text-gray-200 font-medium">
                      {item.name}
                    </td>
                    <td className="p-4 text-gray-400">{item.category}</td>
                    <td className="p-4 text-gray-400">{item.price}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`text-base font-bold ${item.stock === 0 ? "text-red-500" : item.stock < 5 ? "text-amber-500" : "text-gray-200"}`}
                      >
                        {item.stock}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${item.statusColor}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 flex justify-center gap-2">
                      <button
                        className="px-3 py-1.5 border border-gray-600 text-gray-300 rounded hover:bg-gray-700 flex items-center gap-1 transition-colors"
                        title="Update Stok"
                      >
                        ✏️ Update
                      </button>
                      <button
                        className="px-3 py-1.5 border border-gray-600 text-gray-300 rounded hover:bg-gray-700 flex items-center gap-1 transition-colors"
                        title="Riwayat Stok"
                      >
                        🕒 Riwayat
                      </button>
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
