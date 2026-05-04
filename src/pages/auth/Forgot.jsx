import React from "react";
import { Link } from "react-router-dom";

export default function Forgot() {
  return (
    <div className="bg-[#1a1c23] border border-gray-800 rounded-2xl p-8 shadow-2xl">
      <div className="mb-6">
        <Link to="/login" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-4">
          ← Kembali ke Login
        </Link>
        <h2 className="text-xl font-bold text-white mb-1">Lupa Kata Sandi?</h2>
        <p className="text-sm text-gray-400">Masukkan email Anda dan kami akan mengirimkan tautan untuk mereset kata sandi.</p>
      </div>

      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Email Terdaftar</label>
          <input 
            type="email" 
            placeholder="admin@sippfurniture.com"
            className="w-full bg-[#0f1015] border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-orange-500 transition-colors"
            required
          />
        </div>

        <button 
          type="button" 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-orange-500/20"
        >
          Kirim Tautan Reset
        </button>
      </form>
    </div>
  );
}