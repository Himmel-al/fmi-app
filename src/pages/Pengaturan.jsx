import React from "react";
import PageHeader from "../components/PageHeader";

export default function Pengaturan() {
  return (
    <div className="text-white min-h-screen">
      <PageHeader
        title="Pengaturan"
        breadcrumb={[{ label: "Dashboard" }, { label: "Pengaturan" }]}
      />

      <div className="p-6 md:p-8">       
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* --- Menu Navigasi Pengaturan (Kiri) --- */}
          <div className="md:col-span-3 lg:col-span-3">
            <div className="bg-[#1a1c23] rounded-xl border border-gray-800 overflow-hidden sticky top-6">
              <div className="flex flex-col">
                <button className="flex items-center gap-3 w-full text-left p-4 bg-gray-800/50 border-l-4 border-orange-500 text-orange-500 transition-colors">
                  <span className="text-lg">🏢</span>
                  <span className="font-medium">Profil Perusahaan</span>
                </button>
                <button className="flex items-center gap-3 w-full text-left p-4 text-gray-400 hover:bg-gray-800/30 hover:text-gray-200 border-l-4 border-transparent transition-colors">
                  <span className="text-lg">👤</span>
                  <span className="font-medium">Akun Pengguna</span>
                </button>
                <button className="flex items-center gap-3 w-full text-left p-4 text-gray-400 hover:bg-gray-800/30 hover:text-gray-200 border-l-4 border-transparent transition-colors">
                  <span className="text-lg">🔔</span>
                  <span className="font-medium">Notifikasi</span>
                </button>
                <button className="flex items-center gap-3 w-full text-left p-4 text-gray-400 hover:bg-gray-800/30 hover:text-gray-200 border-l-4 border-transparent transition-colors">
                  <span className="text-lg">🔒</span>
                  <span className="font-medium">Keamanan</span>
                </button>
                <button className="flex items-center gap-3 w-full text-left p-4 text-gray-400 hover:bg-gray-800/30 hover:text-gray-200 border-l-4 border-transparent transition-colors">
                  <span className="text-lg">💳</span>
                  <span className="font-medium">Metode Pembayaran</span>
                </button>
              </div>
            </div>
          </div>

          {/* --- Konten Form Pengaturan (Kanan) --- */}
          <div className="md:col-span-9 lg:col-span-9">
            <div className="bg-[#1a1c23] rounded-xl border border-gray-800 p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-800">
                Detail Bisnis
              </h2>

              {/* Upload Logo Section */}
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-[#14151a] border-2 border-dashed border-gray-600 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:border-orange-500 transition-colors">
                  <span className="text-3xl">📷</span>
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-white">Ubah</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-200 mb-1">Logo Toko</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Format yang didukung: JPG, PNG. Ukuran maksimal 2MB.
                  </p>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm text-white rounded-lg border border-gray-700 transition-colors">
                      Pilih File
                    </button>
                    <button className="px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                      Hapus
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Nama Bisnis / Toko
                  </label>
                  <input
                    type="text"
                    defaultValue="SIPP Furniture"
                    className="w-full bg-[#14151a] border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Email Bisnis
                  </label>
                  <input
                    type="email"
                    defaultValue="admin@sippfurniture.com"
                    className="w-full bg-[#14151a] border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    defaultValue="+62 812 3456 7890"
                    className="w-full bg-[#14151a] border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Mata Uang Default
                  </label>
                  <select className="w-full bg-[#14151a] border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-orange-500 transition-colors">
                    <option>IDR (Rupiah Indonesia)</option>
                    <option>USD (Dolar AS)</option>
                    <option>SGD (Dolar Singapura)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">
                    Alamat Lengkap
                  </label>
                  <textarea
                    rows="3"
                    defaultValue="Jl. Sudirman No. 123, Pusat Bisnis, Kota Pekanbaru, Riau 28111"
                    className="w-full bg-[#14151a] border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Status Operasional (Toggle Switch Simulation) */}
              <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-800 mt-10">
                Status Operasional
              </h2>
              <div className="flex items-center justify-between bg-[#14151a] p-4 rounded-lg border border-gray-700 mb-8">
                <div>
                  <h3 className="font-medium text-gray-200">
                    Toko Aktif Menerima Pesanan
                  </h3>
                  <p className="text-sm text-gray-500">
                    Matikan jika Anda sedang libur atau tidak dapat memproses
                    pesanan.
                  </p>
                </div>
                {/* Custom Toggle (On) */}
                <button className="w-12 h-6 rounded-full bg-orange-500 relative transition-colors focus:outline-none">
                  <div className="w-4 h-4 rounded-full bg-white absolute top-1 right-1 transition-transform"></div>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-800">
                <button className="px-6 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors font-medium">
                  Batal
                </button>
                <button className="px-6 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors font-medium shadow-lg shadow-orange-500/20">
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
