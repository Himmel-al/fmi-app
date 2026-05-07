import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  };

  return (
    <div className="bg-[#1a1c23] border border-gray-800 rounded-2xl p-8 shadow-2xl">
      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white tracking-wider flex items-end justify-center">
          SIPP
          <span className="text-orange-500 text-5xl leading-[0.5] ml-0.5">
            .
          </span>
        </h1>
        <p className="text-[10px] text-gray-500 tracking-[0.2em] mt-2 font-medium uppercase">
          Furniture Management
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">
          Selamat Datang Kembali
        </h2>
        <p className="text-sm text-gray-400">
          Masuk ke akun Anda untuk melanjutkan.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="admin@sippfurniture.com"
            className="w-full bg-[#0f1015] border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-orange-500 transition-colors"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-400">
              Kata Sandi
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-orange-500 hover:text-orange-400 transition-colors"
            >
              Lupa sandi?
            </Link>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-[#0f1015] border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-orange-500 transition-colors"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-orange-500/20 mt-2"
        >
          Masuk
        </button>
      </form>

      <p className="text-sm text-gray-400 text-center mt-6">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="text-orange-500 hover:text-orange-400 font-medium transition-colors"
        >
          Daftar di sini
        </Link>
      </p>
    </div>
  );
}
