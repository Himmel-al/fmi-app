import React from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardOwner() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px", background: "#0c0d11", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "20px" }}>
        <div>
          <h1 style={{ margin: 0, color: "#f97316" }}>SIPP Owner Portal</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", margin: "5px 0 0" }}>Selamat datang, Pemilik Sistem.</p>
        </div>
        <button 
          onClick={handleLogout}
          style={{ background: "#ef4444", border: "none", color: "#fff", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          Keluar
        </button>
      </div>

      <div style={{ marginTop: "30px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: "20px", borderRadius: "12px" }}>
          <h3 style={{ margin: "0 0 10px", color: "rgba(255,255,255,0.6)" }}>Total Pendapatan</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0, color: "#22c55e" }}>Rp 0</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: "20px", borderRadius: "12px" }}>
          <h3 style={{ margin: "0 0 10px", color: "rgba(255,255,255,0.6)" }}>Transaksi Baru</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>0 Pesanan</p>
        </div>
      </div>
    </div>
  );
}