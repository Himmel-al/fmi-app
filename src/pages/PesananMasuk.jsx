import { useState, useEffect } from "react";
import React from "react";
import PageHeader from "../components/PageHeader";

export default function PesananMasuk() {
  const [orders, setOrders] = useState([]);

  // Ambil data real dari localStorage pembeli saat komponen dimuat
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // Fungsi untuk memperbarui status pesanan dari admin
  const handleUpdateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    alert(`Status pesanan #TRX-${orderId} berhasil diubah menjadi: ${newStatus}`);
  };

  // Fungsi utilitas helper pewarnaan status di dashboard admin
  const getStatusStyles = (status) => {
    switch (status) {
      case "Selesai":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "Gagal":
        return "bg-red-500/10 text-red-400 border border-red-500/20";
      case "Diproses":
      default:
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    }
  };

  // Hitung metrik dinamis berdasarkan data lokal real
  const countTotal = orders.length;
  const countDiproses = orders.filter((o) => o.status === "Diproses").length;
  const countSelesai = orders.filter((o) => o.status === "Selesai").length;
  const countGagal = orders.filter((o) => o.status === "Gagal").length;

  return (
    <div className="text-white min-h-screen bg-[#14151a]">
      

      <div className="p-6 md:p-8">
        {/* --- 4 Kartu Ringkasan Atas (Dinamis) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a1c23] p-5 rounded-xl border border-gray-800 flex items-center gap-4 shadow-sm">
            <div className="bg-emerald-500/20 p-3 rounded-xl flex items-center justify-center h-12 w-12">
              <span className="text-emerald-500 text-xl">🛒</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{countTotal}</h3>
              <p className="text-gray-400 text-sm">Total Pesanan Masuk</p>
            </div>
          </div>

          <div className="bg-[#1a1c23] p-5 rounded-xl border border-gray-800 flex items-center gap-4 shadow-sm">
            <div className="bg-blue-500/20 p-3 rounded-xl flex items-center justify-center h-12 w-12">
              <span className="text-blue-500 text-xl">⏳</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{countDiproses}</h3>
              <p className="text-gray-400 text-sm">Sedang Diproses</p>
            </div>
          </div>

          <div className="bg-[#1a1c23] p-5 rounded-xl border border-gray-800 flex items-center gap-4 shadow-sm">
            <div className="bg-amber-500/20 p-3 rounded-xl flex items-center justify-center h-12 w-12">
              <span className="text-amber-500 text-xl">✅</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{countSelesai}</h3>
              <p className="text-gray-400 text-sm">Pesanan Selesai</p>
            </div>
          </div>

          <div className="bg-[#1a1c23] p-5 rounded-xl border border-gray-800 flex items-center gap-4 shadow-sm">
            <div className="bg-red-500/20 p-3 rounded-xl flex items-center justify-center h-12 w-12">
              <span className="text-red-500 text-xl">✖</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{countGagal}</h3>
              <p className="text-gray-400 text-sm">Pesanan Gagal</p>
            </div>
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
                  <th className="p-4 font-medium text-center">Aksi Konfirmasi Admin</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center p-8 text-gray-500">
                      Belum ada order masuk dari customer.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="p-4 text-orange-500 font-semibold">
                        #TRX-{order.id}
                      </td>
                      <td className="p-4 text-gray-300">{order.tanggal}</td>
                      <td className="p-4 text-gray-300">{order.customer}</td>
                      <td className="p-4 text-gray-400">
                        <div className="max-w-xs space-y-0.5 truncate">
                          {order.items?.map((item, i) => (
                            <span key={i} className="block text-xs">
                              • {item.nama} ({item.qty}x)
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-gray-200 font-medium">
                        Rp {order.total.toLocaleString("id-ID")}
                      </td>
                      <td className="p-4 text-gray-400 uppercase text-xs font-bold">
                        {order.metodeBayar === "transfer" ? "💳 Transfer" : "🚚 COD"}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 flex justify-center gap-1">
                        <button
                          onClick={() => handleUpdateStatus(order.id, "Diproses")}
                          className="px-2.5 py-1 text-xs bg-amber-500 text-black font-semibold rounded hover:bg-amber-400 disabled:opacity-40 transition-all"
                          disabled={order.status === "Diproses"}
                        >
                          Proses
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(order.id, "Selesai")}
                          className="px-2.5 py-1 text-xs bg-emerald-500 text-black font-semibold rounded hover:bg-emerald-400 disabled:opacity-40 transition-all"
                          disabled={order.status === "Selesai"}
                        >
                          Selesai
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(order.id, "Gagal")}
                          className="px-2.5 py-1 text-xs bg-red-600 text-white font-semibold rounded hover:bg-red-500 disabled:opacity-40 transition-all"
                          disabled={order.status === "Gagal"}
                        >
                          Gagal
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}