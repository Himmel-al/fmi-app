// --- DATA ---
const revenueData = [
  { bulan: "Nov", revenue: 72, target: 80 },
  { bulan: "Des", revenue: 85, target: 80 },
  { bulan: "Jan", revenue: 91, target: 90 },
  { bulan: "Feb", revenue: 78, target: 90 },
  { bulan: "Mar", revenue: 110, target: 100 },
  { bulan: "Apr", revenue: 128, target: 120 },
];

const topProducts = [
  { rank: 1, name: "Sofa Premium L-Shape", sold: 42, color: "#f59e0b", pct: 100 },
  { rank: 2, name: "Meja Makan Minimalis", sold: 32, color: "#3b82f6", pct: 76 },
  { rank: 3, name: "Lemari Pakaian 4 Pintu", sold: 25, color: "#10b981", pct: 60 },
  { rank: 4, name: "Kursi Kerja Ergonomis", sold: 20, color: "#8b5cf6", pct: 48 },
  { rank: 5, name: "Tempat Tidur Queen", sold: 16, color: "#ef4444", pct: 38 },
];

const recentOrders = [
  { id: "#ORD-2847", customer: "Budi Santoso", product: "Sofa L-Shape", total: "Rp 8.5M", status: "selesai" },
  { id: "#ORD-2846", customer: "Siti Rahma", product: "Meja Makan", total: "Rp 3.2M", status: "proses" },
  { id: "#ORD-2845", customer: "Agus Wijaya", product: "Lemari 4 Pintu", total: "Rp 5.8M", status: "selesai" },
  { id: "#ORD-2844", customer: "Dewi Lestari", product: "Kursi Kerja", total: "Rp 2.1M", status: "pending" },
  { id: "#ORD-2843", customer: "Rina Kusuma", product: "Tempat Tidur", total: "Rp 6.4M", status: "proses" },
];

const activities = [
  { color: "#10b981", text: "Pesanan #ORD-2847 berhasil diselesaikan dan dikirim", bold: "#ORD-2847", time: "2 menit lalu" },
  { color: "#f59e0b", text: "Stok Sofa Premium tersisa 3 unit — segera restock", bold: "Stok Sofa Premium", time: "15 menit lalu" },
  { color: "#3b82f6", text: "Pelanggan baru Rina Kusuma mendaftar & memesan", bold: "Rina Kusuma", time: "32 menit lalu" },
  { color: "#8b5cf6", text: "Laporan April siap diunduh di bagian Analitik", bold: "Laporan April", time: "1 jam lalu" },
  { color: "#ef4444", text: "Pembayaran #ORD-2844 belum terkonfirmasi", bold: "#ORD-2844", time: "2 jam lalu" },
];

function Sparkline({ color, points }) {
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-10 mt-3">
      <polyline fill={`${color}18`} stroke="none" points={`${points} 100,40 0,40`} />
      <polyline fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" points={points} />
    </svg>
  );
}

function RevenueChart() {
  const W = 520, H = 160, padL = 44, padR = 16, padT = 12, padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const minVal = 50, maxVal = 140;

  const toX = (i) => padL + (i / (revenueData.length - 1)) * chartW;
  const toY = (v) => padT + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;

  const revPoints = revenueData.map((d, i) => `${toX(i)},${toY(d.revenue)}`).join(" ");
  const tgtPoints = revenueData.map((d, i) => `${toX(i)},${toY(d.target)}`).join(" ");
  const areaPoints = `${padL},${padT + chartH} ` + revenueData.map((d, i) => `${toX(i)},${toY(d.revenue)}`).join(" ") + ` ${toX(revenueData.length - 1)},${padT + chartH}`;
  const yTicks = [60, 80, 100, 120, 140];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 170 }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </linearGradient>
      </defs>
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={padL} y1={toY(v)} x2={W - padR} y2={toY(v)} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <text x={padL - 6} y={toY(v) + 4} textAnchor="end" fontSize="9" fill="#475569">{v}M</text>
        </g>
      ))}
      {revenueData.map((d, i) => (
        <text key={i} x={toX(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="#475569">{d.bulan}</text>
      ))}
      <polygon points={areaPoints} fill="url(#areaGrad)" />
      <polyline fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="5 4" points={tgtPoints} />
      <polyline fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" points={revPoints} />
      {revenueData.map((d, i) => (
        <circle key={i} cx={toX(i)} cy={toY(d.revenue)} r="4" fill="#f59e0b" stroke="#141820" strokeWidth="2" />
      ))}
    </svg>
  );
}

const statCards = [
  { icon: "🛍", value: "75", label: "Pesanan Baru", change: "+12%", accent: "amber", color: "#f59e0b", sparkPoints: "0,30 16,25 33,28 50,15 66,20 83,10 100,8" },
  { icon: "🚛", value: "124", label: "Dalam Proses", change: "+8%", accent: "blue", color: "#3b82f6", sparkPoints: "0,35 16,28 33,32 50,20 66,24 83,15 100,12" },
  { icon: "📦", value: "1.050", label: "Unit Terpasang", change: "+23%", accent: "green", color: "#10b981", sparkPoints: "0,38 16,32 33,35 50,22 66,18 83,12 100,6" },
  { icon: "💰", value: "Rp 128.5M", label: "Total Revenue", change: "+18%", accent: "purple", color: "#8b5cf6", sparkPoints: "0,32 16,26 33,30 50,18 66,22 83,8 100,5" },
];

const accentBar = {
  amber: "from-amber-500/0 via-amber-500 to-transparent",
  blue: "from-blue-500/0 via-blue-500 to-transparent",
  green: "from-emerald-500/0 via-emerald-500 to-transparent",
  purple: "from-violet-500/0 via-violet-500 to-transparent",
};
const accentIcon = {
  amber: "bg-amber-500/10 text-amber-400",
  blue: "bg-blue-500/10 text-blue-400",
  green: "bg-emerald-500/10 text-emerald-400",
  purple: "bg-violet-500/10 text-violet-400",
};
const statusStyle = {
  selesai: "bg-emerald-500/10 text-emerald-400",
  proses: "bg-blue-500/10 text-blue-400",
  pending: "bg-amber-500/10 text-amber-400",
};

export default function Dashboard() {
  return (
    <div className="min-h-full bg-[#0f1117] p-5 space-y-4">

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((card) => (
          <div key={card.label} className="relative bg-[#141820] rounded-2xl border border-white/[0.06] p-5 overflow-hidden hover:border-white/10 transition-colors">
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accentBar[card.accent]}`} />
            <div className="flex items-start justify-between mb-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base ${accentIcon[card.accent]}`}>
                {card.icon}
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">{card.change}</span>
            </div>
            <p className="text-[22px] font-black text-slate-100 tracking-tight leading-none">{card.value}</p>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.5px] mt-1">{card.label}</p>
            <Sparkline color={card.color} points={card.sparkPoints} />
          </div>
        ))}
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-3">
        <div className="bg-[#141820] rounded-2xl border border-white/[0.06] p-5">
          <p className="text-[13px] font-bold text-slate-200">Tren Revenue Bulanan</p>
          <div className="flex items-center gap-4 mb-3">
            <p className="text-[11px] text-slate-600">6 bulan terakhir (juta Rp)</p>
            <div className="flex items-center gap-3 ml-auto">
              <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <span className="w-3 h-0.5 bg-amber-500 rounded inline-block" />Aktual
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-slate-600">
                <span className="w-3 h-0.5 bg-white/20 rounded inline-block" />Target
              </span>
            </div>
          </div>
          <RevenueChart />
        </div>

        <div className="bg-[#141820] rounded-2xl border border-white/[0.06] p-5">
          <p className="text-[13px] font-bold text-slate-200">Produk Terlaris</p>
          <p className="text-[11px] text-slate-600 mb-4">Unit terjual bulan ini</p>
          <div className="space-y-3">
            {topProducts.map((p) => (
              <div key={p.rank} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0"
                  style={{ background: p.rank <= 2 ? "rgba(245,158,11,0.12)" : "rgba(255,255,255,0.04)", color: p.rank <= 2 ? "#f59e0b" : "#475569" }}>
                  {p.rank}
                </div>
                <p className="text-[12px] text-slate-400 flex-1 truncate">{p.name}</p>
                <div className="w-16 h-1 bg-white/[0.05] rounded-full shrink-0">
                  <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: p.color }} />
                </div>
                <span className="text-[11px] font-bold text-slate-200 w-6 text-right shrink-0">{p.sold}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-3">
        <div className="bg-[#141820] rounded-2xl border border-white/[0.06] p-5">
          <p className="text-[13px] font-bold text-slate-200">Pesanan Terkini</p>
          <p className="text-[11px] text-slate-600 mb-4">5 transaksi terakhir</p>
          <table className="w-full text-[12px]">
            <thead>
              <tr>
                {["ID Pesanan", "Pelanggan", "Produk", "Total", "Status"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-bold text-slate-700 uppercase tracking-wide pb-3 border-b border-white/[0.05]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-white/[0.03] last:border-none hover:bg-white/[0.02] transition-colors">
                  <td className="py-2.5 text-amber-500 font-bold">{order.id}</td>
                  <td className="py-2.5 text-slate-400">{order.customer}</td>
                  <td className="py-2.5 text-slate-500">{order.product}</td>
                  <td className="py-2.5 text-slate-200 font-bold">{order.total}</td>
                  <td className="py-2.5">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full ${statusStyle[order.status]}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[#141820] rounded-2xl border border-white/[0.06] p-5">
          <p className="text-[13px] font-bold text-slate-200">Aktivitas Terbaru</p>
          <p className="text-[11px] text-slate-600 mb-4">Log sistem real-time</p>
          <div>
            {activities.map((a, i) => (
              <div key={i} className="flex gap-3 py-2.5 border-b border-white/[0.04] last:border-none">
                <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: a.color, boxShadow: `0 0 6px ${a.color}` }} />
                <div>
                  <p className="text-[12px] text-slate-600 leading-relaxed">
                    {a.text.split(a.bold).map((part, j, arr) =>
                      j < arr.length - 1
                        ? <span key={j}>{part}<span className="text-slate-300 font-semibold">{a.bold}</span></span>
                        : part
                    )}
                  </p>
                  <p className="text-[10px] text-slate-700 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}