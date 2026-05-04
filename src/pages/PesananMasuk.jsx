import React from "react";
import PageHeader from "../components/PageHeader";

export default function PesananMasuk() {
  // Data dummy (sementara) untuk tabel pesanan
  const orders = [
    {
      id: "#ORD-2850",
      date: "15 Mei 2026",
      customer: "Budi Santoso",
      product: "Sofa L-Shape (1)",
      total: "Rp 8.5M",
      payment: "Transfer Bank",
      status: "Selesai",
      statusColor:
        "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    },
    {
      id: "#ORD-2849",
      date: "15 Mei 2026",
      customer: "Siti Rahma",
      product: "Meja Makan (2)",
      total: "Rp 6.4M",
      payment: "E-Wallet",
      status: "Sedang Diproses",
      statusColor: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
    },
    {
      id: "#ORD-2848",
      date: "14 Mei 2026",
      customer: "Andi Setiawan",
      product: "Lemari 4 Pintu (1)",
      total: "Rp 5.4M",
      payment: "COD",
      status: "Menunggu Pembayaran",
      statusColor: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
    },
    {
      id: "#ORD-2847",
      date: "14 Mei 2026",
      customer: "Rina Kartika",
      product: "Kursi Kerja (1)",
      total: "Rp 2.1M",
      payment: "Transfer Bank",
      status: "Selesai",
      statusColor:
        "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    },
    {
      id: "#ORD-2846",
      date: "13 Mei 2026",
      customer: "Adi Pradana",
      product: "Meja Makan (1), Lemari (1)",
      total: "Rp 9.6M",
      payment: "Transfer Bank",
      status: "Dibatalkan",
      statusColor: "bg-red-500/10 text-red-500 border border-red-500/20",
    },
  ];

  return (
    <div className="text-white min-h-screen">
      <PageHeader
        title="Pesanan Masuk"
        breadcrumb={[{ label: "Dashboard" }, { label: "Pesanan Masuk" }]}
        buttonLabel="+ Tambah Pesanan"
        buttonStyle="orange"
      />

      <div className="p-6 md:p-8">
        {/* --- 4 Kartu Ringkasan Atas --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a1c23] p-5 rounded-xl border border-gray-800 flex items-center gap-4 shadow-sm">
            <div className="bg-emerald-500/20 p-3 rounded-xl flex items-center justify-center h-12 w-12">
              <span className="text-emerald-500 text-xl">🛒</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">58</h3>
              <p className="text-gray-400 text-sm">Total Pesanan Masuk</p>
            </div>
          </div>

          <div className="bg-[#1a1c23] p-5 rounded-xl border border-gray-800 flex items-center gap-4 shadow-sm">
            <div className="bg-blue-500/20 p-3 rounded-xl flex items-center justify-center h-12 w-12">
              <span className="text-blue-500 text-xl">⏳</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">32</h3>
              <p className="text-gray-400 text-sm">Sedang Diproses</p>
            </div>
          </div>

          <div className="bg-[#1a1c23] p-5 rounded-xl border border-gray-800 flex items-center gap-4 shadow-sm">
            <div className="bg-amber-500/20 p-3 rounded-xl flex items-center justify-center h-12 w-12">
              <span className="text-amber-500 text-xl">💳</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">15</h3>
              <p className="text-gray-400 text-sm">Menunggu Pembayaran</p>
            </div>
          </div>

          <div className="bg-[#1a1c23] p-5 rounded-xl border border-gray-800 flex items-center gap-4 shadow-sm">
            <div className="bg-red-500/20 p-3 rounded-xl flex items-center justify-center h-12 w-12">
              <span className="text-red-500 text-xl">✖</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">11</h3>
              <p className="text-gray-400 text-sm">Dibatalkan</p>
            </div>
          </div>
        </div>

        {/* --- Baris Filter & Search --- */}
        <div className="bg-[#1a1c23] p-4 rounded-xl border border-gray-800 mb-6 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center bg-[#14151a] border border-gray-700 rounded-lg overflow-hidden w-full md:w-auto md:min-w-[300px]">
            <span className="pl-3 text-gray-500">🔍</span>
            <input
              type="text"
              placeholder="Cari Pesanan (ID, Pelanggan...)"
              className="bg-transparent text-sm text-gray-200 p-2.5 w-full focus:outline-none"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
            <button className="px-4 py-2 rounded-lg border border-orange-500 text-orange-500 bg-orange-500/10 text-sm whitespace-nowrap transition-colors">
              Semua
            </button>
            <button className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800 text-sm whitespace-nowrap transition-colors">
              Diproses
            </button>
            <button className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800 text-sm whitespace-nowrap transition-colors">
              Menunggu Pembayaran
            </button>
            <button className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800 text-sm whitespace-nowrap transition-colors">
              Selesai
            </button>
            <button className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800 text-sm whitespace-nowrap transition-colors">
              Dibatalkan
            </button>
          </div>
        </div>

        {/* --- Tabel Data Pesanan --- */}
        <div className="bg-[#1a1c23] rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="bg-[#1e2029]">
                <tr className="text-gray-400 text-sm border-b border-gray-800">
                  <th className="p-4 font-medium">ID Pesanan</th>
                  <th className="p-4 font-medium">Tanggal Pesanan</th>
                  <th className="p-4 font-medium">Pelanggan</th>
                  <th className="p-4 font-medium">Detail Produk</th>
                  <th className="p-4 font-medium">Total Bayar</th>
                  <th className="p-4 font-medium">Pembayaran</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="p-4 text-orange-500 font-semibold">
                      {order.id}
                    </td>
                    <td className="p-4 text-gray-300">{order.date}</td>
                    <td className="p-4 text-gray-300">{order.customer}</td>
                    <td className="p-4 text-gray-400">{order.product}</td>
                    <td className="p-4 text-gray-200 font-medium">
                      {order.total}
                    </td>
                    <td className="p-4 text-gray-400">{order.payment}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 flex justify-center gap-2">
                      <button className="px-3 py-1.5 border border-gray-600 text-gray-300 rounded hover:bg-gray-700 flex items-center gap-1 transition-colors">
                        📄 Detail
                      </button>
                      <button className="px-3 py-1.5 border border-orange-500/50 text-orange-500 rounded hover:bg-orange-500/10 flex items-center gap-1 transition-colors">
                        🖨️ Invois
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
