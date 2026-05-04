import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="bg-[#1a1c23] border border-gray-800 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white tracking-wider flex items-end justify-center">
          SIPP<span className="text-orange-500 text-4xl leading-[0.5] ml-0.5">.</span>
        </h1>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">Buat Akun Baru</h2>
        <p className="text-sm text-gray-400">Daftarkan bisnis furnitur Anda hari ini.</p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Nama Lengkap</label>
          <input 
            type="text" 
            placeholder="John Doe"
            className="w-full bg-[#0f1015] border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-orange-500 transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
          <input 
            type="email" 
            placeholder="email@domain.com"
            className="w-full bg-[#0f1015] border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-orange-500 transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Kata Sandi</label>
          <input 
            type="password" 
            placeholder="Minimal 8 karakter"
            className="w-full bg-[#0f1015] border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-orange-500 transition-colors"
            required
          />
        </div>

        <button 
          type="button" 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-orange-500/20 mt-4"
        >
          Daftar Sekarang
        </button>
      </form>

      <p className="text-sm text-gray-400 text-center mt-6">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-orange-500 hover:text-orange-400 font-medium transition-colors">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}