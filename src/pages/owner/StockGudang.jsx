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

const StockGudang = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/owner/stock')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const formatRupiah = (number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number || 0);

  return (
    <div className="min-h-screen bg-[#121418] text-gray-300 p-6 font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Manajemen Stok Gudang</h1>
          <p className="text-sm text-gray-400 mt-1">Data Produk langsung dari Database</p>
        </div>
        <div className="bg-[#1e2128] border border-gray-800 px-4 py-2 rounded-xl text-sm">
          Total SKU: <span className="text-yellow-500 font-bold font-mono">{products.length} Item</span>
        </div>
      </div>

      <OwnerNav />

      {loading && <div className="text-gray-400">Memuat data produk...</div>}

      {!loading && error && (
        <div className="text-red-400">Gagal memuat data: {error}</div>
      )}

      {!loading && !error && (
        <div className="bg-[#1e2128] border border-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-xs text-gray-400 uppercase bg-[#15171d]">
                  <th className="py-4 px-6 font-semibold">ID</th>
                  <th className="py-4 px-6 font-semibold">Nama Furniture</th>
                  <th className="py-4 px-6 font-semibold">Kategori</th>
                  <th className="py-4 px-6 font-semibold text-right">Harga Satuan</th>
                  <th className="py-4 px-6 font-semibold text-center">Stok</th>
                  <th className="py-4 px-6 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-800/40">
                {products.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-4 px-6 text-center text-gray-500">Belum ada produk terdaftar.</td>
                  </tr>
                )}
                {products.map((prod) => {
                  const prodId = prod.id_product ?? prod.id;
                  return (
                    <tr key={prodId} className="hover:bg-[#252830]/40">
                      <td className="py-4 px-6 font-mono text-yellow-500 font-bold">PRD-{prodId}</td>
                      <td className="py-4 px-6 font-medium text-white">{prod.product_name}</td>
                      <td className="py-4 px-6 text-gray-400">{prod.category?.category_name || 'Tanpa Kategori'}</td>
                      <td className="py-4 px-6 text-right font-mono text-gray-200">{formatRupiah(prod.price)}</td>
                      <td className="py-4 px-6 text-center font-mono font-bold text-white">{prod.stock} Pcs</td>
                      <td className="py-4 px-6 text-center">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${prod.stock <= 5 ? 'bg-amber-900/40 text-amber-400 border border-amber-800' : 'bg-green-900/40 text-green-400 border border-green-800'}`}>
                          {prod.stock <= 5 ? '● Hampir Habis' : '● Tersedia'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockGudang;