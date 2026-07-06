import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const ownerMenu = [
  { path: "/owner", label: "Dashboard" },
  { path: "/ownerLaporanKeuangan", label: "Laporan Keuangan" },
  { path: "/ownerStockGudang", label: "Stock Gudang" },
];

const OwnerNav = () => {
  const location = useLocation();
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
      {ownerMenu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            color: location.pathname === item.path ? "#0d0f14" : "#c9a84c",
            background: location.pathname === item.path ? "#c9a84c" : "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.3)",
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

const DashboardOwner = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/owner/dashboard')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal memuat data dashboard:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const formatRupiah = (number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number || 0);

  return (
    <div className="min-h-screen bg-[#121418] text-gray-300 p-6 font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard Owner</h1>
        <p className="text-sm text-gray-400 mt-1">Data Real-time Database Laravel</p>
      </div>

      <OwnerNav />

      {loading && <div className="text-gray-400">Memuat data dari database...</div>}

      {!loading && error && (
        <div className="text-red-400">Gagal memuat data: {error}</div>
      )}

      {!loading && !error && data && (
        <>
          {/* Grid Finansial & Produk dari DB */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#1e2128] border border-gray-800 p-5 rounded-xl shadow-lg">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Pendapatan Kotor</p>
              <h3 className="text-2xl font-bold text-white mt-2 font-mono">{formatRupiah(data.stats.total_pendapatan)}</h3>
            </div>
            <div className="bg-[#1e2128] border border-gray-800 p-5 rounded-xl shadow-lg">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Produk Terdaftar</p>
              <h3 className="text-2xl font-bold text-white mt-2 font-mono">{data.stats.total_produk} Produk</h3>
            </div>
            <div className="bg-[#1e2128] border border-gray-800 p-5 rounded-xl shadow-lg">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pesanan Pending</p>
              <h3 className="text-2xl font-bold text-white mt-2 font-mono">{data.stats.pesanan_masuk} Transaksi</h3>
            </div>
            <div className="bg-[#1e2128] border border-gray-800 p-5 rounded-xl shadow-lg">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pembayaran Terverifikasi</p>
              <h3 className="text-2xl font-bold text-white mt-2 font-mono">{data.stats.pembayaran_terverifikasi} Sukses</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pesanan Terbaru dari DB */}
            <div className="lg:col-span-2 bg-[#1e2128] border border-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-4">📦 Pesanan Terbaru</h2>
              <div className="space-y-4">
                {data.orders.length === 0 && (
                  <p className="text-sm text-gray-500">Belum ada pesanan.</p>
                )}
                {data.orders.map((order, idx) => (
                  <div key={idx} className="bg-[#121418] border border-gray-800 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-mono px-2 py-0.5 bg-yellow-600/20 text-yellow-500 rounded border border-yellow-600/30">ORDER #{order.id_order ?? order.id}</span>
                      <p className="text-xs text-gray-400 mt-1">{order.shipping_address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-400 font-mono">{formatRupiah(order.total_price)}</p>
                      <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded border border-amber-500/20 uppercase font-bold">{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Log Pembayaran Terbaru dari DB */}
            <div className="bg-[#1e2128] border border-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-4">💳 Log Pembayaran</h2>
              <div className="space-y-4">
                {data.payments.length === 0 && (
                  <p className="text-sm text-gray-500">Belum ada pembayaran.</p>
                )}
                {data.payments.map((payment, idx) => (
                  <div key={idx} className="bg-[#121418] p-4 rounded-xl border border-gray-800 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-white">{payment.sender_name}</p>
                      <p className="text-xs text-gray-400">Bank: <span className="text-blue-400 font-bold">{payment.bank_name}</span></p>
                    </div>
                    <span className="text-xs bg-green-500/20 text-green-400 font-semibold px-2 py-1 rounded border border-green-500/30">{payment.payment_status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardOwner;