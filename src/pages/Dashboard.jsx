import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

const revenueData = [
  { bulan: "Nov", revenue: 72, target: 80 },
  { bulan: "Des", revenue: 85, target: 80 },
  { bulan: "Jan", revenue: 91, target: 90 },
  { bulan: "Feb", revenue: 78, target: 90 },
  { bulan: "Mar", revenue: 110, target: 100 },
  { bulan: "Apr", revenue: 128, target: 120 },
];

const topProducts = [
  {
    rank: 1,
    name: "Sofa Premium L-Shape",
    sold: 42,
    color: "#f59e0b",
    pct: 100,
  },
  {
    rank: 2,
    name: "Meja Makan Minimalis",
    sold: 32,
    color: "#3b82f6",
    pct: 76,
  },
  {
    rank: 3,
    name: "Lemari Pakaian 4 Pintu",
    sold: 25,
    color: "#10b981",
    pct: 60,
  },
  {
    rank: 4,
    name: "Kursi Kerja Ergonomis",
    sold: 20,
    color: "#8b5cf6",
    pct: 48,
  },
  { rank: 5, name: "Tempat Tidur Queen", sold: 16, color: "#ef4444", pct: 38 },
];

const recentOrders = [
  {
    id: "#ORD-2847",
    customer: "Budi Santoso",
    product: "Sofa L-Shape",
    total: "Rp 8.5M",
    status: "selesai",
  },
  {
    id: "#ORD-2846",
    customer: "Siti Rahma",
    product: "Meja Makan",
    total: "Rp 3.2M",
    status: "proses",
  },
  {
    id: "#ORD-2845",
    customer: "Agus Wijaya",
    product: "Lemari 4 Pintu",
    total: "Rp 5.8M",
    status: "selesai",
  },
  {
    id: "#ORD-2844",
    customer: "Dewi Lestari",
    product: "Kursi Kerja",
    total: "Rp 2.1M",
    status: "pending",
  },
  {
    id: "#ORD-2843",
    customer: "Rina Kusuma",
    product: "Tempat Tidur",
    total: "Rp 6.4M",
    status: "proses",
  },
];

const activities = [
  {
    color: "#10b981",
    text: "Pesanan #ORD-2847 berhasil diselesaikan dan dikirim",
    bold: "#ORD-2847",
    time: "2 menit lalu",
  },
  {
    color: "#f59e0b",
    text: "Stok Sofa Premium tersisa 3 unit — segera restock",
    bold: "Stok Sofa Premium",
    time: "15 menit lalu",
  },
  {
    color: "#3b82f6",
    text: "Pelanggan baru Rina Kusuma mendaftar & memesan",
    bold: "Rina Kusuma",
    time: "32 menit lalu",
  },
  {
    color: "#8b5cf6",
    text: "Laporan April siap diunduh di bagian Analitik",
    bold: "Laporan April",
    time: "1 jam lalu",
  },
  {
    color: "#ef4444",
    text: "Pembayaran #ORD-2844 belum terkonfirmasi",
    bold: "#ORD-2844",
    time: "2 jam lalu",
  },
];

const statCards = [
  {
    icon: <FaShoppingCart />,
    value: "75",
    label: "Total Orders",
    change: "+12%",
    iconBg: "#10b981",
  },
  {
    icon: <FaTruck />,
    value: "124",
    label: "Total Delivered",
    change: "+8%",
    iconBg: "#3b82f6",
  },
  {
    icon: <FaBan />,
    value: "40",
    label: "Total Canceled",
    change: "+23%",
    iconBg: "#ef4444",
  },
  {
    icon: <FaDollarSign />,
    value: "Rp.128",
    label: "Total Revenue",
    change: "+18%",
    iconBg: "#f59e0b",
  },
];

const statusStyle = {
  selesai: { background: "rgba(16,185,129,0.15)", color: "#10b981" },
  proses: { background: "rgba(59,130,246,0.15)", color: "#3b82f6" },
  pending: { background: "rgba(245,158,11,0.15)", color: "#f59e0b" },
};

function RevenueChart() {
  const W = 520,
    H = 160,
    padL = 44,
    padR = 16,
    padT = 12,
    padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const minVal = 50,
    maxVal = 140;
  const toX = (i) => padL + (i / (revenueData.length - 1)) * chartW;
  const toY = (v) =>
    padT + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;
  const revPoints = revenueData
    .map((d, i) => `${toX(i)},${toY(d.revenue)}`)
    .join(" ");
  const tgtPoints = revenueData
    .map((d, i) => `${toX(i)},${toY(d.target)}`)
    .join(" ");
  const areaPoints =
    `${padL},${padT + chartH} ` +
    revenueData.map((d, i) => `${toX(i)},${toY(d.revenue)}`).join(" ") +
    ` ${toX(revenueData.length - 1)},${padT + chartH}`;
  const yTicks = [60, 80, 100, 120, 140];
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
          <line
            x1={padL}
            y1={toY(v)}
            x2={W - padR}
            y2={toY(v)}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
          <text
            x={padL - 6}
            y={toY(v) + 4}
            textAnchor="end"
            fontSize="9"
            fill="#4b5563"
          >
            {v}M
          </text>
        </g>
      ))}
      {revenueData.map((d, i) => (
        <text
          key={i}
          x={toX(i)}
          y={H - 6}
          textAnchor="middle"
          fontSize="10"
          fill="#4b5563"
        >
          {d.bulan}
        </text>
      ))}
      <polygon points={areaPoints} fill="url(#areaGrad)" />
      <polyline
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        points={tgtPoints}
      />
      <polyline
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeLinejoin="round"
        points={revPoints}
      />
      {revenueData.map((d, i) => (
        <circle
          key={i}
          cx={toX(i)}
          cy={toY(d.revenue)}
          r="4"
          fill="#f59e0b"
          stroke="#1a1d27"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export default function Dashboard() {
  return (
    <div
      id="dashboard-container"
      className="w-full min-h-full"
      style={{ background: "#111318" }}
    >
      <PageHeader title="Dashboard" breadcrumb={[{ label: "Dashboard" }]} />

      <div className="p-6 space-y-6">
        {/* STAT CARDS */}
        <div
          id="dashboard-grid"
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {statCards.map((card) => (
            <div
              key={card.label}
              className="flex items-center gap-5 rounded-2xl p-5"
              style={{
                background: "#1a1d27",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shrink-0"
                style={{ background: card.iconBg }}
              >
                {card.icon}
              </div>
              <div className="flex flex-col">
                <span
                  className="text-2xl font-bold"
                  style={{ color: "#f1f5f9" }}
                >
                  {card.value}
                </span>
                <span className="text-sm" style={{ color: "#6b7280" }}>
                  {card.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            className="rounded-2xl p-5"
            style={{
              background: "#1a1d27",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p className="text-sm font-bold" style={{ color: "#f1f5f9" }}>
              Tren Revenue Bulanan
            </p>
            <div className="flex items-center gap-4 mb-3">
              <p className="text-xs" style={{ color: "#6b7280" }}>
                6 bulan terakhir (juta Rp)
              </p>
              <div className="flex items-center gap-3 ml-auto">
                <span
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "#6b7280" }}
                >
                  <span
                    className="w-3 h-0.5 inline-block rounded"
                    style={{ background: "#f59e0b" }}
                  />
                  Aktual
                </span>
                <span
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "#4b5563" }}
                >
                  <span
                    className="w-3 h-0.5 inline-block rounded"
                    style={{ background: "#4b5563" }}
                  />
                  Target
                </span>
              </div>
            </div>
            <RevenueChart />
          </div>

          <div
            className="rounded-2xl p-5"
            style={{
              background: "#1a1d27",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p className="text-sm font-bold" style={{ color: "#f1f5f9" }}>
              Produk Terlaris
            </p>
            <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
              Unit terjual bulan ini
            </p>
            <div className="space-y-3">
              {topProducts.map((p) => (
                <div key={p.rank} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-black shrink-0"
                    style={{
                      background:
                        p.rank <= 2
                          ? "rgba(245,158,11,0.15)"
                          : "rgba(255,255,255,0.05)",
                      color: p.rank <= 2 ? "#f59e0b" : "#4b5563",
                    }}
                  >
                    {p.rank}
                  </div>
                  <p
                    className="text-xs flex-1 truncate"
                    style={{ color: "#9ca3af" }}
                  >
                    {p.name}
                  </p>
                  <div
                    className="w-16 h-1 rounded-full shrink-0"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${p.pct}%`, background: p.color }}
                    />
                  </div>
                  <span
                    className="text-xs font-bold w-6 text-right shrink-0"
                    style={{ color: "#f1f5f9" }}
                  >
                    {p.sold}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            className="rounded-2xl p-5"
            style={{
              background: "#1a1d27",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p className="text-sm font-bold" style={{ color: "#f1f5f9" }}>
              Pesanan Terkini
            </p>
            <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
              5 transaksi terakhir
            </p>
            <table className="w-full text-xs">
              <thead>
                <tr>
                  {["ID Pesanan", "Pelanggan", "Produk", "Total", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left font-bold uppercase tracking-wide pb-3"
                        style={{
                          fontSize: "10px",
                          color: "#374151",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                  >
                    <td
                      className="py-2.5 font-bold"
                      style={{ color: "#f59e0b" }}
                    >
                      {order.id}
                    </td>
                    <td className="py-2.5" style={{ color: "#9ca3af" }}>
                      {order.customer}
                    </td>
                    <td className="py-2.5" style={{ color: "#6b7280" }}>
                      {order.product}
                    </td>
                    <td
                      className="py-2.5 font-bold"
                      style={{ color: "#f1f5f9" }}
                    >
                      {order.total}
                    </td>
                    <td className="py-2.5">
                      <span
                        className="inline-flex items-center gap-1.5 font-bold px-2 py-1 rounded-full"
                        style={{
                          fontSize: "10px",
                          ...statusStyle[order.status],
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: "currentColor" }}
                        />
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="rounded-2xl p-5"
            style={{
              background: "#1a1d27",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p className="text-sm font-bold" style={{ color: "#f1f5f9" }}>
              Aktivitas Terbaru
            </p>
            <p className="text-xs mb-4" style={{ color: "#6b7280" }}>
              Log sistem real-time
            </p>
            <div>
              {activities.map((a, i) => (
                <div
                  key={i}
                  className="flex gap-3 py-2.5"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                    style={{ background: a.color }}
                  />
                  <div>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "#6b7280" }}
                    >
                      {a.text.split(a.bold).map((part, j, arr) =>
                        j < arr.length - 1 ? (
                          <span key={j}>
                            {part}
                            <span style={{ color: "#d1d5db", fontWeight: 600 }}>
                              {a.bold}
                            </span>
                          </span>
                        ) : (
                          part
                        ),
                      )}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#374151" }}>
                      {a.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
