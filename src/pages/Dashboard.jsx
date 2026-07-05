import { useState, useEffect } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import api from "../api/axios";

/* Format angka jadi Rupiah singkat: 8500000 -> "Rp 8.5Jt", 400000 -> "Rp 400K" */
const fmtRupiah = (v) => {
  const n = Number(v) || 0;
  if (n >= 1e6) return `Rp ${(n / 1e6).toFixed(1)}Jt`;
  if (n >= 1e3) return `Rp ${(n / 1e3).toFixed(0)}K`;
  return `Rp ${n}`;
};

const statusStyle = {
  pending:    { background: "rgba(245,158,11,0.15)", color: "#f59e0b" },
  diproses:   { background: "rgba(59,130,246,0.15)", color: "#3b82f6" },
  dikirim:    { background: "rgba(139,92,246,0.15)", color: "#8b5cf6" },
  selesai:    { background: "rgba(16,185,129,0.15)", color: "#10b981" },
  dibatalkan: { background: "rgba(239,68,68,0.15)",  color: "#ef4444" },
};

function RevenueChart({ data }) {
  const W = 520, H = 160, padL = 44, padR = 16, padT = 12, padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const values = data.map((d) => d.revenue);
  const maxVal = Math.max(...values, 10);
  const minVal = 0;

  const toX = (i) => padL + (i / (data.length - 1 || 1)) * chartW;
  const toY = (v) => padT + chartH - ((v - minVal) / (maxVal - minVal || 1)) * chartH;

  const revPoints = data.map((d, i) => `${toX(i)},${toY(d.revenue)}`).join(" ");
  const areaPoints =
    `${padL},${padT + chartH} ` +
    data.map((d, i) => `${toX(i)},${toY(d.revenue)}`).join(" ") +
    ` ${toX(data.length - 1)},${padT + chartH}`;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(maxVal * f));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 170 }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </linearGradient>
      </defs>
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={padL} y1={toY(v)} x2={W - padR} y2={toY(v)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <text x={padL - 6} y={toY(v) + 4} textAnchor="end" fontSize="9" fill="#4b5563">{v}Jt</text>
        </g>
      ))}
      {data.map((d, i) => (
        <text key={i} x={toX(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="#4b5563">{d.bulan}</text>
      ))}
      <polygon points={areaPoints} fill="url(#areaGrad)" />
      <polyline fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" points={revPoints} />
      {data.map((d, i) => (
        <circle key={i} cx={toX(i)} cy={toY(d.revenue)} r="4" fill="#f59e0b" stroke="#1a1d27" strokeWidth="2" />
      ))}
    </svg>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalDelivered: 0,
    totalCanceled: 0,
    totalRevenue: 0,
  });
  const [revenueTrend, setRevenueTrend] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await api.get("/dashboard/summary");
        setStats(res.data.stats);
        setRevenueTrend(res.data.revenueTrend);
        setTopProducts(res.data.topProducts);
        setRecentOrders(res.data.recentOrders);
        setActivities(res.data.activities);
      } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);
        setError("Gagal memuat data dashboard dari server.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const statCards = [
    { icon: <FaShoppingCart />, value: stats.totalOrders, label: "Total Orders", iconBg: "#10b981" },
    { icon: <FaTruck />, value: stats.totalDelivered, label: "Total Delivered", iconBg: "#3b82f6" },
    { icon: <FaBan />, value: stats.totalCanceled, label: "Total Canceled", iconBg: "#ef4444" },
    { icon: <FaDollarSign />, value: fmtRupiah(stats.totalRevenue), label: "Total Revenue", iconBg: "#f59e0b" },
  ];

  if (loading) {
    return (
      <div className="w-full min-h-full flex items-center justify-center" style={{ background: "#111318", color: "#9ca3af" }}>
        <p className="text-sm">Memuat data dashboard...</p>
      </div>
    );
  }

  return (
    <div id="dashboard-container" className="w-full min-h-full" style={{ background: "#111318" }}>
      <PageHeader title="Dashboard" breadcrumb={[{ label: "Dashboard" }]} />

      <div className="p-6 space-y-6">
        {error && (
          <div className="rounded-xl p-3 text-xs" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)" }}>
            {error}
          </div>
        )}

        {/* STAT CARDS */}
        <div id="dashboard-grid" className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="flex items-center gap-5 rounded-2xl p-5"
              style={{ background: "#1a1d27", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shrink-0"
                style={{ background: card.iconBg }}
              >
                {card.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>{card.value}</span>
                <span className="text-sm" style={{ color: "#6b7280" }}>{card.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl p-5" style={{ background: "#1a1d27", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-sm font-bold" style={{ color: "#f1f5f9" }}>Tren Revenue Bulanan</p>
            <p className="text-xs mb-3" style={{ color: "#6b7280" }}>6 bulan terakhir (order Selesai, juta Rp)</p>
            {revenueTrend.length > 0 ? (
              <RevenueChart data={revenueTrend} />
            ) : (
              <p className="text-xs" style={{ color: "#4b5563" }}>Belum ada data penjualan.</p>
            )}
          </div>

          <div className="rounded-2xl p-5" style={{ background: "#1a1d27", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-sm font-bold" style={{ color: "#f1f5f9" }}>Produk Terlaris</p>
            <p className="text-xs mb-4" style={{ color: "#6b7280" }}>Berdasarkan order berstatus Selesai</p>
            {topProducts.length > 0 ? (
              <div className="space-y-3">
                {topProducts.map((p) => (
                  <div key={p.rank} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-black shrink-0"
                      style={{
                        background: p.rank <= 2 ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.05)",
                        color: p.rank <= 2 ? "#f59e0b" : "#4b5563",
                      }}
                    >
                      {p.rank}
                    </div>
                    <p className="text-xs flex-1 truncate" style={{ color: "#9ca3af" }}>{p.name}</p>
                    <div className="w-16 h-1 rounded-full shrink-0" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: p.color }} />
                    </div>
                    <span className="text-xs font-bold w-6 text-right shrink-0" style={{ color: "#f1f5f9" }}>{p.sold}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs" style={{ color: "#4b5563" }}>Belum ada produk terjual.</p>
            )}
          </div>
        </div>

        {/* ROW 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl p-5" style={{ background: "#1a1d27", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-sm font-bold" style={{ color: "#f1f5f9" }}>Pesanan Terkini</p>
            <p className="text-xs mb-4" style={{ color: "#6b7280" }}>5 transaksi terakhir</p>
            {recentOrders.length > 0 ? (
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    {["ID Pesanan", "Pelanggan", "Produk", "Total", "Status"].map((h) => (
                      <th
                        key={h}
                        className="text-left font-bold uppercase tracking-wide pb-3"
                        style={{ fontSize: "10px", color: "#374151", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => {
                    const key = (order.status || "").toLowerCase();
                    const style = statusStyle[key] || { background: "rgba(255,255,255,0.06)", color: "#9ca3af" };
                    return (
                      <tr key={order.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                        <td className="py-2.5 font-bold" style={{ color: "#f59e0b" }}>{order.id}</td>
                        <td className="py-2.5" style={{ color: "#9ca3af" }}>{order.customer}</td>
                        <td className="py-2.5" style={{ color: "#6b7280" }}>{order.product}</td>
                        <td className="py-2.5 font-bold" style={{ color: "#f1f5f9" }}>{fmtRupiah(order.total)}</td>
                        <td className="py-2.5">
                          <span
                            className="inline-flex items-center gap-1.5 font-bold px-2 py-1 rounded-full"
                            style={{ fontSize: "10px", ...style }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "currentColor" }} />
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="text-xs" style={{ color: "#4b5563" }}>Belum ada pesanan masuk.</p>
            )}
          </div>

          <div className="rounded-2xl p-5" style={{ background: "#1a1d27", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-sm font-bold" style={{ color: "#f1f5f9" }}>Aktivitas Terbaru</p>
            <p className="text-xs mb-4" style={{ color: "#6b7280" }}>Log sistem real-time</p>
            {activities.length > 0 ? (
              <div>
                {activities.map((a, i) => (
                  <div key={i} className="flex gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: a.color }} />
                    <div>
                      <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
                        {a.text.split(a.bold).map((part, j, arr) =>
                          j < arr.length - 1 ? (
                            <span key={j}>
                              {part}
                              <span style={{ color: "#d1d5db", fontWeight: 600 }}>{a.bold}</span>
                            </span>
                          ) : (
                            part
                          ),
                        )}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#374151" }}>
                        {new Date(a.time).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs" style={{ color: "#4b5563" }}>Belum ada aktivitas terbaru.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}