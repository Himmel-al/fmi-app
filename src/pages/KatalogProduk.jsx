// src/pages/KatalogProduk.jsx
import { useState } from "react";
import PageHeader from "../components/PageHeader";

/* ── Tema warna ── */
const C = {
  bg: "#0d0f14",
  card: "#161a23",
  cardHover: "#1c2130",
  border: "rgba(255,255,255,0.07)",
  borderHover: "rgba(245,158,11,0.35)",
  textPrimary: "#f1f5f9",
  textSecondary: "#64748b",
  accent: "#f59e0b",
  accentDim: "rgba(245,158,11,0.12)",
  green: "#22c55e",   greenDim: "rgba(34,197,94,0.12)",
  yellow: "#eab308",  yellowDim: "rgba(234,179,8,0.12)",
  red: "#ef4444",     redDim: "rgba(239,68,68,0.12)",
  blue: "#3b82f6",    blueDim: "rgba(59,130,246,0.12)",
};

const products = [
  { id:1, name:"Sofa Premium L-Shape",   category:"Sofa",   price:8500000, stock:12, sold:42, status:"Tersedia",     sku:"SF-001", rating:4.8 },
  { id:2, name:"Meja Makan Minimalis",   category:"Meja",   price:3200000, stock:8,  sold:32, status:"Tersedia",     sku:"MJ-002", rating:4.5 },
  { id:3, name:"Lemari Pakaian 4 Pintu", category:"Lemari", price:5400000, stock:5,  sold:25, status:"Tersedia",     sku:"LM-003", rating:4.7 },
  { id:4, name:"Kursi Kerja Ergonomis",  category:"Kursi",  price:2100000, stock:20, sold:20, status:"Tersedia",     sku:"KR-004", rating:4.6 },
  { id:5, name:"Tempat Tidur Queen",     category:"Kasur",  price:7800000, stock:3,  sold:18, status:"Hampir Habis", sku:"TT-005", rating:4.9 },
  { id:6, name:"Rak Buku Minimalis",     category:"Rak",    price:1500000, stock:15, sold:14, status:"Tersedia",     sku:"RK-006", rating:4.3 },
  { id:7, name:"Meja TV Modern",         category:"Meja",   price:2800000, stock:0,  sold:11, status:"Habis",        sku:"MJ-007", rating:4.4 },
  { id:8, name:"Sofa Single Velvet",     category:"Sofa",   price:4200000, stock:7,  sold:9,  status:"Tersedia",     sku:"SF-008", rating:4.5 },
  { id:9, name:"Meja Rias Klasik",       category:"Meja",   price:3600000, stock:4,  sold:7,  status:"Tersedia",     sku:"MJ-009", rating:4.2 },
];

const CATS = ["Semua","Sofa","Meja","Lemari","Kursi","Kasur","Rak"];

const statusCfg = {
  Tersedia:       { bg: C.greenDim,  text: C.green  },
  "Hampir Habis": { bg: C.yellowDim, text: C.yellow },
  Habis:          { bg: C.redDim,    text: C.red    },
};

const fmt = (p) => p >= 1e6 ? `Rp ${(p/1e6).toFixed(1)}M` : `Rp ${(p/1e3).toFixed(0)}K`;

/* SVG ikon per kategori */
const Icon = ({ cat, size = 52 }) => {
  const a = C.accent;
  const icons = {
    Sofa: <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="10" y="20" width="44" height="16" rx="5" fill={a} opacity=".55"/>
      <rect x="4"  y="24" width="12" height="18" rx="4" fill={a} opacity=".9"/>
      <rect x="48" y="24" width="12" height="18" rx="4" fill={a} opacity=".9"/>
      <rect x="8"  y="36" width="48" height="12" rx="4" fill={a} opacity=".8"/>
      <rect x="14" y="48" width="6"  height="5"  rx="2" fill={a} opacity=".4"/>
      <rect x="44" y="48" width="6"  height="5"  rx="2" fill={a} opacity=".4"/>
    </svg>,
    Meja: <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="6"  y="20" width="52" height="9"  rx="3" fill={a} opacity=".9"/>
      <rect x="12" y="29" width="6"  height="22" rx="2" fill={a} opacity=".6"/>
      <rect x="46" y="29" width="6"  height="22" rx="2" fill={a} opacity=".6"/>
    </svg>,
    Lemari: <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="10" y="8"  width="44" height="52" rx="5" fill={a} opacity=".55"/>
      <rect x="10" y="8"  width="22" height="52" rx="5" fill={a} opacity=".85"/>
      <line x1="32" y1="8" x2="32" y2="60" stroke="#0d0f14" strokeWidth="2"/>
      <circle cx="30" cy="34" r="3" fill="#0d0f14"/>
      <circle cx="42" cy="34" r="3" fill="#0d0f14" opacity=".5"/>
    </svg>,
    Kursi: <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="18" y="8"  width="28" height="22" rx="5" fill={a} opacity=".55"/>
      <rect x="10" y="28" width="44" height="9"  rx="4" fill={a} opacity=".9"/>
      <rect x="14" y="37" width="6"  height="18" rx="2" fill={a} opacity=".6"/>
      <rect x="44" y="37" width="6"  height="18" rx="2" fill={a} opacity=".6"/>
    </svg>,
    Kasur: <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="6"  y="30" width="52" height="20" rx="5" fill={a} opacity=".85"/>
      <rect x="6"  y="22" width="14" height="10" rx="3" fill={a} opacity=".6"/>
      <rect x="6"  y="26" width="52" height="6"  rx="2" fill={a} opacity=".4"/>
      <rect x="10" y="50" width="5"  height="5"  rx="2" fill={a} opacity=".4"/>
      <rect x="49" y="50" width="5"  height="5"  rx="2" fill={a} opacity=".4"/>
    </svg>,
    Rak: <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="8"  y="8"  width="6" height="50" rx="2" fill={a} opacity=".7"/>
      <rect x="50" y="8"  width="6" height="50" rx="2" fill={a} opacity=".7"/>
      <rect x="8"  y="14" width="48" height="5"  rx="2" fill={a} opacity=".9"/>
      <rect x="8"  y="30" width="48" height="5"  rx="2" fill={a} opacity=".9"/>
      <rect x="8"  y="46" width="48" height="5"  rx="2" fill={a} opacity=".9"/>
    </svg>,
  };
  return icons[cat] ?? <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <rect x="10" y="10" width="44" height="44" rx="8" fill={a} opacity=".5"/>
  </svg>;
};

/* ═══════════ MAIN ═══════════ */
export default function KatalogProduk() {
  const [search, setSearch] = useState("");
  const [cat,    setCat]    = useState("Semua");
  const [sort,   setSort]   = useState("terlaris");
  const [view,   setView]   = useState("grid");
  const [modal,  setModal]  = useState(null);

  const list = products
    .filter(p =>
      (cat === "Semua" || p.category === cat) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
       p.sku.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a,b) =>
      sort==="terlaris" ? b.sold-a.sold :
      sort==="termahal" ? b.price-a.price :
      sort==="termurah" ? a.price-b.price : b.stock-a.stock
    );

  const stats = [
    { label:"Total Produk", val:products.length,                                         icon:"📦", dim:C.blueDim   },
    { label:"Tersedia",     val:products.filter(p=>p.status==="Tersedia").length,         icon:"✅", dim:C.greenDim  },
    { label:"Hampir Habis", val:products.filter(p=>p.status==="Hampir Habis").length,     icon:"⚠️", dim:C.yellowDim },
    { label:"Stok Habis",   val:products.filter(p=>p.status==="Habis").length,            icon:"❌", dim:C.redDim    },
  ];

  return (
    <div style={{ background:C.bg, minHeight:"100%", color:C.textPrimary,
                  fontFamily:"'Segoe UI',system-ui,sans-serif" }}>

      {/* ── PageHeader — sama persis dengan Dashboard ── */}
      <PageHeader
        title="Katalog Produk"
        breadcrumb={[
          { label: "Dashboard", href: "/" },
          { label: "Katalog Produk" },
        ]}
        buttonLabel="+ Tambah Produk"
        buttonStyle="orange"
        onButtonClick={() => setModal("add")}
      />

      {/* ── Konten ── */}
      <div style={{ padding:"0 24px 32px" }}>

        {/* Stat cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
          {stats.map((s,i) => (
            <div key={i} style={{
              background:C.card, borderRadius:14,
              padding:"18px 20px", border:`1px solid ${C.border}`,
              display:"flex", alignItems:"center", gap:14,
            }}>
              <div style={{
                width:46, height:46, borderRadius:12, background:s.dim,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:20, flexShrink:0,
              }}>{s.icon}</div>
              <div>
                <div style={{ fontSize:24, fontWeight:700, color:C.textPrimary, lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:12, color:C.textSecondary, marginTop:4 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div style={{
          background:C.card, borderRadius:12,
          padding:"12px 16px", border:`1px solid ${C.border}`,
          display:"flex", alignItems:"center", gap:10, flexWrap:"wrap",
          marginBottom:14,
        }}>
          {/* Search */}
          <div style={{ position:"relative", flex:1, minWidth:160 }}>
            <span style={{ position:"absolute", left:10, top:"50%",
                           transform:"translateY(-50%)", fontSize:13, color:C.textSecondary }}>🔍</span>
            <input
              value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Cari produk atau SKU..."
              style={{
                width:"100%", boxSizing:"border-box",
                background:"rgba(255,255,255,0.04)",
                border:`1px solid ${C.border}`, borderRadius:8,
                padding:"8px 10px 8px 30px",
                color:C.textPrimary, fontSize:12, outline:"none",
              }}
            />
          </div>

          {/* Category pills */}
          <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
            {CATS.map(c=>(
              <button key={c} onClick={()=>setCat(c)} style={{
                padding:"5px 11px", borderRadius:7, fontSize:12,
                cursor:"pointer", border:"1px solid",
                borderColor: cat===c ? C.accent : C.border,
                background:  cat===c ? C.accentDim : "transparent",
                color:       cat===c ? C.accent : C.textSecondary,
                transition:"all .15s",
              }}>{c}</button>
            ))}
          </div>

          {/* Sort */}
          <select value={sort} onChange={e=>setSort(e.target.value)} style={{
            background:"rgba(255,255,255,0.04)",
            border:`1px solid ${C.border}`, borderRadius:8,
            padding:"7px 10px", color:C.textPrimary, fontSize:12, outline:"none", cursor:"pointer",
          }}>
            <option value="terlaris">Terlaris</option>
            <option value="termahal">Termahal</option>
            <option value="termurah">Termurah</option>
            <option value="stok">Stok Terbanyak</option>
          </select>

          {/* View toggle */}
          <div style={{ display:"flex", border:`1px solid ${C.border}`, borderRadius:8, overflow:"hidden" }}>
            {[["grid","⊞"],["list","☰"]].map(([m,ic])=>(
              <button key={m} onClick={()=>setView(m)} style={{
                padding:"6px 12px", border:"none", cursor:"pointer", fontSize:15,
                background: view===m ? C.accentDim : "transparent",
                color:      view===m ? C.accent : C.textSecondary,
                transition:"all .15s",
              }}>{ic}</button>
            ))}
          </div>
        </div>

        <p style={{ fontSize:12, color:C.textSecondary, marginBottom:14 }}>
          Menampilkan <span style={{ color:C.accent, fontWeight:600 }}>{list.length}</span> produk
        </p>

        {/* Grid / List */}
        {view==="grid" ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:12 }}>
            {list.map(p=><GridCard key={p.id} p={p} onDetail={()=>setModal(p)}/>)}
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 80px 80px 80px 110px 80px",
                          gap:10, padding:"8px 16px" }}>
              {["Produk","Harga","Stok","Terjual","Rating","Status",""].map((h,i)=>(
                <span key={i} style={{ fontSize:10, fontWeight:600, color:C.textSecondary,
                                       textTransform:"uppercase", letterSpacing:".05em",
                                       textAlign:i>1?"center":"left" }}>{h}</span>
              ))}
            </div>
            {list.map(p=><ListRow key={p.id} p={p} onDetail={()=>setModal(p)}/>)}
          </div>
        )}

        {list.length===0 && (
          <div style={{ textAlign:"center", padding:"60px 0", color:C.textSecondary }}>
            <div style={{ fontSize:42, marginBottom:10 }}>📭</div>
            <p style={{ fontSize:14 }}>Produk tidak ditemukan</p>
          </div>
        )}
      </div>

      {modal && <Modal modal={modal} onClose={()=>setModal(null)}/>}
    </div>
  );
}

/* ── Grid Card ── */
function GridCard({ p, onDetail }) {
  const [hov, setHov] = useState(false);
  const sc = statusCfg[p.status];
  return (
    <div onClick={onDetail}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background: hov ? C.cardHover : C.card,
        border:`1px solid ${hov ? C.borderHover : C.border}`,
        borderRadius:12, padding:"14px 14px 12px",
        cursor:"pointer", transition:"all .2s",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? "0 6px 24px rgba(0,0,0,0.35)" : "none",
      }}
    >
      <div style={{ width:"100%", height:100, background:"rgba(255,255,255,0.03)",
                    borderRadius:8, display:"flex", alignItems:"center",
                    justifyContent:"center", marginBottom:11 }}>
        <Icon cat={p.category} size={54}/>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
        <span style={{ fontSize:10, color:C.textSecondary }}>{p.sku}</span>
        <span style={{ fontSize:10, fontWeight:600, padding:"2px 7px", borderRadius:20,
                       background:sc.bg, color:sc.text }}>● {p.status}</span>
      </div>
      <div style={{ fontWeight:600, fontSize:13, color:C.textPrimary, marginBottom:2 }}>{p.name}</div>
      <div style={{ fontSize:11, color:C.textSecondary, marginBottom:9 }}>{p.category}</div>
      <div style={{ fontSize:16, fontWeight:700, color:C.accent, marginBottom:7 }}>{fmt(p.price)}</div>
      <div style={{ display:"flex", gap:8, fontSize:11, color:C.textSecondary }}>
        <span>📦 <strong style={{ color:C.textPrimary }}>{p.stock}</strong></span>
        <span>🏆 <strong style={{ color:C.textPrimary }}>{p.sold}</strong></span>
      </div>
      <div style={{ marginTop:7, fontSize:11, color:C.yellow }}>
        {"★".repeat(Math.floor(p.rating))}
        <span style={{ color:C.textSecondary, marginLeft:4 }}>{p.rating}</span>
      </div>
    </div>
  );
}

/* ── List Row ── */
function ListRow({ p, onDetail }) {
  const [hov, setHov] = useState(false);
  const sc = statusCfg[p.status];
  return (
    <div onClick={onDetail}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        display:"grid", gridTemplateColumns:"2fr 1fr 80px 80px 80px 110px 80px",
        gap:10, padding:"12px 16px", borderRadius:10,
        background: hov ? C.cardHover : C.card,
        border:`1px solid ${hov ? C.borderHover : C.border}`,
        alignItems:"center", cursor:"pointer", transition:"all .18s",
      }}
    >
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:34, height:34, borderRadius:8, flexShrink:0,
                      background:"rgba(255,255,255,0.04)",
                      display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon cat={p.category} size={20}/>
        </div>
        <div>
          <div style={{ fontWeight:600, fontSize:13, color:C.textPrimary }}>{p.name}</div>
          <div style={{ fontSize:11, color:C.textSecondary }}>{p.sku}</div>
        </div>
      </div>
      <div style={{ fontSize:14, fontWeight:700, color:C.accent }}>{fmt(p.price)}</div>
      <div style={{ fontSize:13, color:C.textPrimary, textAlign:"center" }}>{p.stock}</div>
      <div style={{ fontSize:13, color:C.textPrimary, textAlign:"center" }}>{p.sold}</div>
      <div style={{ fontSize:12, color:C.yellow, textAlign:"center" }}>{p.rating}★</div>
      <div style={{ textAlign:"center" }}>
        <span style={{ fontSize:10, fontWeight:600, padding:"3px 9px",
                       borderRadius:20, background:sc.bg, color:sc.text }}>{p.status}</span>
      </div>
      <div style={{ textAlign:"center" }}>
        <button style={{ background:C.accentDim, color:C.accent,
                         border:`1px solid rgba(245,158,11,0.2)`,
                         borderRadius:7, padding:"4px 10px",
                         fontSize:11, fontWeight:600, cursor:"pointer" }}>Detail</button>
      </div>
    </div>
  );
}

/* ── Modal ── */
function Modal({ modal, onClose }) {
  const isAdd = modal === "add";
  const p = isAdd ? null : modal;
  const sc = p ? statusCfg[p.status] : null;
  const inp = {
    width:"100%", boxSizing:"border-box",
    background:"rgba(255,255,255,0.04)",
    border:`1px solid ${C.border}`, borderRadius:8,
    padding:"8px 12px", color:C.textPrimary, fontSize:13, outline:"none",
  };
  return (
    <div style={{ position:"fixed", inset:0, zIndex:999,
                  background:"rgba(0,0,0,0.75)", backdropFilter:"blur(6px)",
                  display:"flex", alignItems:"center", justifyContent:"center" }}
      onClick={onClose}>
      <div style={{ background:C.card, border:`1px solid ${C.border}`,
                    borderRadius:16, padding:"26px 26px 22px",
                    width:420, maxWidth:"92vw", maxHeight:"88vh",
                    overflowY:"auto", position:"relative" }}
        onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} style={{ position:"absolute", top:14, right:14,
                                           background:"none", border:"none",
                                           color:C.textSecondary, fontSize:17, cursor:"pointer" }}>✕</button>
        {isAdd ? (
          <>
            <h2 style={{ margin:"0 0 18px", fontSize:17, color:C.textPrimary }}>Tambah Produk Baru</h2>
            {[
              ["Nama Produk","contoh: Sofa Premium"],
              ["SKU","contoh: SF-010"],
              ["Kategori","Sofa / Meja / Lemari …"],
              ["Harga (Rp)","contoh: 5000000"],
              ["Stok Awal","contoh: 10"],
            ].map(([label,ph])=>(
              <div key={label} style={{ marginBottom:12 }}>
                <label style={{ fontSize:11, color:C.textSecondary, display:"block", marginBottom:4 }}>{label}</label>
                <input placeholder={ph} style={inp}/>
              </div>
            ))}
            <div style={{ display:"flex", gap:10, marginTop:8 }}>
              <button style={{ flex:1, background:`linear-gradient(135deg,${C.accent},#d97706)`,
                               color:"#fff", border:"none", borderRadius:9,
                               padding:"10px", fontWeight:600, cursor:"pointer", fontSize:13 }}>Simpan</button>
              <button onClick={onClose} style={{ flex:1, background:"rgba(255,255,255,0.04)",
                               color:C.textSecondary, border:`1px solid ${C.border}`,
                               borderRadius:9, padding:"10px", fontWeight:600, cursor:"pointer", fontSize:13 }}>Batal</button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ margin:"0 0 16px", fontSize:17, color:C.textPrimary }}>Detail Produk</h2>
            <div style={{ width:"100%", height:100, background:"rgba(255,255,255,0.03)",
                          borderRadius:10, display:"flex", alignItems:"center",
                          justifyContent:"center", marginBottom:14 }}>
              <Icon cat={p.category} size={58}/>
            </div>
            <div style={{ textAlign:"center", marginBottom:12 }}>
              <span style={{ fontSize:10, fontWeight:600, padding:"3px 10px",
                             borderRadius:20, background:sc.bg, color:sc.text }}>● {p.status}</span>
            </div>
            <div style={{ fontWeight:700, fontSize:15, color:C.textPrimary, textAlign:"center", marginBottom:2 }}>{p.name}</div>
            <div style={{ fontSize:11, color:C.textSecondary, textAlign:"center", marginBottom:16 }}>{p.sku} · {p.category}</div>
            <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:10, marginBottom:16 }}>
              {[
                ["Harga",         fmt(p.price),    C.accent],
                ["Stok",          p.stock+" unit", C.textPrimary],
                ["Total Terjual", p.sold+" unit",  C.textPrimary],
                ["Rating",        p.rating+" ★",   C.yellow],
              ].map(([k,v,col],i,arr)=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between",
                                      padding:"10px 14px",
                                      borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none" }}>
                  <span style={{ fontSize:12, color:C.textSecondary }}>{k}</span>
                  <span style={{ fontSize:12, fontWeight:600, color:col }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button style={{ flex:1, background:`linear-gradient(135deg,${C.accent},#d97706)`,
                               color:"#fff", border:"none", borderRadius:9,
                               padding:"9px", fontWeight:600, cursor:"pointer", fontSize:12 }}>✏️ Edit</button>
              <button style={{ flex:1, background:C.redDim, color:C.red,
                               border:`1px solid rgba(239,68,68,0.22)`,
                               borderRadius:9, padding:"9px", fontWeight:600, cursor:"pointer", fontSize:12 }}>🗑️ Hapus</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}