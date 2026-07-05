import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LaporanKeuangan = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/owner/finance')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-[#121418] text-white p-6">Memuat jurnal keuangan...</div>;

  const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

  // Estimasi HPP / Modal produksi (Contoh simulasi statis/perhitungan HPP dari Database jika ada kolomnya)
  const estimasiHPP = 6200000; 
  const labaBersih = data.total_pendapatan - estimasiHPP;

  return (
    <div className="min-h-screen bg-[#121418] text-gray-300 p-6 font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Analisis Laba Rugi</h1>
        <p className="text-sm text-gray-400 mt-1">Berdasarkan Akumulasi OrderDetailSeeder</p>
      </div>

      {/* Perhitungan Laba Rugi Makro */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1e2128] border border-gray-800 p-6 rounded-xl">
          <p className="text-xs text-gray-400 font-medium uppercase">Total Omset Penjualan (Kotor)</p>
          <p className="text-3xl font-mono font-bold text-green-400 mt-2">{formatRupiah(data.total_pendapatan)}</p>
        </div>
        <div className="bg-[#1e2128] border border-gray-800 p-6 rounded-xl">
          <p className="text-xs text-gray-400 font-medium uppercase">Estimasi Modal / HPP</p>
          <p className="text-3xl font-mono font-bold text-red-400 mt-2">{formatRupiah(estimasiHPP)}</p>
        </div>
        <div className="bg-[#1e2128] border border-yellow-900/40 bg-gradient-to-b from-[#1e2128] to-[#27251e] p-6 rounded-xl">
          <p className="text-xs text-yellow-500 font-bold uppercase">Laba Bersih Toko (Profit)</p>
          <p className="text-3xl font-mono font-bold text-yellow-400 mt-2">{formatRupiah(labaBersih)}</p>
        </div>
      </div>

      {/* Tabel Jurnal Breakdown */}
      <div className="bg-[#1e2128] border border-gray-800 rounded-xl p-6">
        <h2 className="text-base font-bold text-white mb-4">📊 Breakdown Subtotal Pendapatan</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-xs text-gray-400 uppercase bg-[#15171d]">
                <th className="py-3 px-4">Nama Produk / Item</th>
                <th className="py-3 px-4 text-center">Qty</th>
                <th className="py-3 px-4 text-right">Harga Satuan</th>
                <th className="py-3 px-4 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {data.order_details.map((detail, idx) => (
                <tr key={idx} className="hover:bg-[#121418]/40">
                  <td className="py-4 px-4 text-gray-200 font-medium">
                    {detail.product ? detail.product.product_name : `Product ID: ${detail.id_product}`}
                  </td>
                  <td className="py-4 px-4 text-center font-mono text-white">{detail.quantity} Pcs</td>
                  <td className="py-4 px-4 text-right font-mono text-gray-400">{formatRupiah(detail.price)}</td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-green-400">{formatRupiah(detail.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LaporanKeuangan;