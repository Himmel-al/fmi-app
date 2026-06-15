import React, { useState, useEffect } from "react";
import {
  MdDashboard,
  MdOutlineChair,
  MdShoppingCart,
  MdOutlineInventory2,
  MdBarChart,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   INJECTED CSS (Modernized, Smooth Transitions & Micro-Interactions)
───────────────────────────────────────────────────────────── */
const SidebarStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

    :root {
      --sb-gold:      #c9a84c;
      --sb-gold-lt:   #e8c97a;
      --sb-bg:        #09090b;
      --sb-bg2:       #111113;
      --sb-border:    rgba(201,168,76,0.09);
      --sb-white:     #ffffff;
      --font-display: 'Playfair Display', serif;
      --font-body:    'DM Sans', sans-serif;
      --sb-curve:     cubic-bezier(0.25, 1, 0.5, 1); /* Ultra smooth curve */
    }

    /* ── KEYFRAMES ── */
    @keyframes sb-orb1 {
      0%,100% { transform: translate(0,0) scale(1); }
      50%      { transform: translate(18px,-22px) scale(1.06); }
    }
    @keyframes sb-orb2 {
      0%,100% { transform: translate(0,0) scale(1); }
      50%      { transform: translate(-12px,18px) scale(1.04); }
    }
    @keyframes sb-scan {
      0%   { top: -2px; opacity: 0; }
      4%   { opacity: 1; }
      96%  { opacity: 0.7; }
      100% { top: 100%; opacity: 0; }
    }
    @keyframes sb-grid-pulse {
      0%,100% { opacity: 0.5; }
      50%      { opacity: 1; }
    }
    @keyframes sb-logo-dot {
      0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.6); }
      50%      { box-shadow: 0 0 0 6px rgba(201,168,76,0); }
    }
    @keyframes sb-online {
      0%,100% { box-shadow: 0 0 0 0 rgba(52,211,153,0.55); }
      50%      { box-shadow: 0 0 0 5px rgba(52,211,153,0); }
    }
    @keyframes sb-shimmer {
      0%   { background-position: -300% center; }
      100% { background-position: 300% center; }
    }

    /* ── ROOT WRAP (SMOOTH WIDTH CHANGE) ── */
    .sb-root {
      font-family: var(--font-body);
      width: 76px; /* Collapsed state default */
      min-height: 100vh;
      flex-shrink: 0;
      background: var(--sb-bg);
      border-right: 1px solid var(--sb-border);
      display: flex;
      flex-direction: column;
      padding: 20px 12px;
      position: relative;
      overflow: hidden;
      transition: width 0.45s var(--sb-curve), border-color 0.3s;
      z-index: 100;
    }
    
    /* Expanded State Triggered via State Class */
    .sb-root.sb-expanded {
      width: 260px;
      border-right-color: rgba(201,168,76,0.2);
    }

    /* Glowing Right Edge Accent Line */
    .sb-root::after {
      content: '';
      position: absolute; right: 0; top: 0; bottom: 0; width: 1px;
      background: linear-gradient(to bottom, transparent, var(--sb-gold), transparent);
      opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
    }
    .sb-root.sb-expanded::after { opacity: 0.4; }

    /* ── BACKGROUND LAYERS ── */
    .sb-bg-grid {
      position: absolute; inset: 0; z-index: 0; pointer-events: none;
      background-image:
        linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px);
      background-size: 30px 30px;
      mask-image: radial-gradient(ellipse 70% 60% at 20% 10%, black, transparent);
      animation: sb-grid-pulse 8s ease-in-out infinite;
    }
    .sb-orb-1 {
      position: absolute; z-index: 0; pointer-events: none;
      border-radius: 50%; filter: blur(40px);
      width: 240px; height: 240px;
      top: -90px; left: -70px;
      background: radial-gradient(circle, rgba(201,168,76,0.1), transparent 65%);
      animation: sb-orb1 16s ease-in-out infinite;
    }
    .sb-orb-2 {
      position: absolute; z-index: 0; pointer-events: none;
      border-radius: 50%; filter: blur(35px);
      width: 180px; height: 180px;
      bottom: 100px; right: -50px;
      background: radial-gradient(circle, rgba(201,168,76,0.06), transparent 65%);
      animation: sb-orb2 20s ease-in-out infinite;
    }
    .sb-scan-line {
      position: absolute; left: 0; right: 0; height: 1px; z-index: 0;
      background: linear-gradient(90deg, transparent, rgba(201,168,76,0.35) 40%, rgba(201,168,76,0.6) 50%, rgba(201,168,76,0.35) 60%, transparent);
      animation: sb-scan 11s linear infinite;
      pointer-events: none;
    }

    /* ── DYNAMIC FADING ELEMENTS CONTROL ── */
    .sb-fade-el {
      opacity: 0;
      transform: translateX(-8px);
      pointer-events: none;
      white-space: nowrap;
      transition: opacity 0.3s var(--sb-curve), transform 0.35s var(--sb-curve);
    }
    .sb-expanded .sb-fade-el {
      opacity: 1;
      transform: translateX(0);
      pointer-events: auto;
    }

    /* ── LOGO AREA ── */
    .sb-logo-zone {
      position: relative; z-index: 2;
      padding: 4px 4px 22px;
    }
    .sb-logo-badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 10px; border-radius: 20px;
      border: 1px solid rgba(201,168,76,0.2);
      background: rgba(201,168,76,0.05);
      font-size: 0.6rem; font-weight: 700; letter-spacing: 1.8px;
      text-transform: uppercase; color: rgba(201,168,76,0.7);
      margin-bottom: 16px;
      transition: all 0.3s;
    }
    .sb-root:not(.sb-expanded) .sb-logo-badge {
      opacity: 0; transform: scale(0.8); width: 0; padding: 4px 0; margin-bottom: 8px;
    }
    .sb-badge-pulse {
      width: 5px; height: 5px; border-radius: 50%; background: var(--sb-gold);
      animation: sb-logo-dot 2.5s ease-in-out infinite;
    }
    .sb-logo-row {
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 5px;
    }
    .sb-logo-icon-box {
      width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
      background: linear-gradient(135deg, rgba(201,168,76,0.22), rgba(201,168,76,0.07));
      border: 1px solid rgba(201,168,76,0.3);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.3rem; transition: transform 0.4s var(--sb-curve);
    }
    .sb-root.sb-expanded .sb-logo-icon-box {
      transform: rotate(-5deg) scale(1.05);
    }
    .sb-logo-text {
      font-family: var(--font-display);
      font-size: 1.4rem; font-weight: 900; color: var(--sb-white);
      line-height: 1; letter-spacing: -0.3px;
    }
    .sb-logo-text span { color: var(--sb-gold); }
    .sb-logo-sub {
      font-size: 0.58rem; font-weight: 700; letter-spacing: 2px;
      text-transform: uppercase; color: rgba(255,255,255,0.18);
      padding-left: 2px; margin-top: 4px;
    }
    .sb-logo-divider {
      margin-top: 16px; height: 1px;
      background: linear-gradient(90deg, rgba(201,168,76,0.35), rgba(201,168,76,0.06) 70%, transparent);
      position: relative;
    }
    .sb-logo-divider::after {
      content: ''; position: absolute; left: 0; top: -1px;
      width: 50%; height: 3px;
      background: linear-gradient(90deg, var(--sb-gold), transparent);
      border-radius: 2px; background-size: 200% auto;
      animation: sb-shimmer 4s linear infinite;
    }

    /* ── SECTION LABEL ── */
    .sb-section-label {
      display: flex; align-items: center; gap: 8px;
      padding: 0 4px 6px; margin-top: 20px; margin-bottom: 4px;
      min-height: 15px;
    }
    .sb-section-text {
      font-size: 0.6rem; font-weight: 700; letter-spacing: 2px;
      text-transform: uppercase; color: rgba(255,255,255,0.2);
    }
    .sb-section-line {
      flex: 1; height: 1px;
      background: linear-gradient(90deg, rgba(201,168,76,0.15), transparent);
    }
    .sb-root:not(.sb-expanded) .sb-section-label {
      justify-content: center;
    }
    .sb-root:not(.sb-expanded) .sb-section-line { display: none; }

    /* ── NAV ITEMS ── */
    .sb-nav-item {
      display: flex; align-items: center; gap: 12px;
      padding: 0 14px; height: 48px;
      border-radius: 14px; cursor: pointer; text-decoration: none;
      position: relative; overflow: visible; /* modification for modern tooltip visibility */
      border: 1px solid transparent;
      transition: all 0.25s var(--sb-curve);
      margin-bottom: 5px;
    }

    /* Radial Light Effect on hover */
    .sb-nav-item::before {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(circle at 20% 50%, rgba(201,168,76,0.08), transparent 60%);
      opacity: 0; transition: opacity 0.25s; border-radius: 14px;
    }
    .sb-nav-item:hover::before { opacity: 1; }

    /* INACTIVE HOVER */
    .sb-nav-inactive:hover {
      background: rgba(255,255,255,0.04);
      border-color: rgba(255,255,255,0.05);
      transform: translateX(3px);
    }
    .sb-root:not(.sb-expanded) .sb-nav-inactive:hover {
      transform: scale(1.05);
    }
    .sb-nav-inactive:hover .sb-nav-icon {
      background: rgba(201,168,76,0.12);
      color: rgba(201,168,76,0.85);
      transform: scale(1.05);
    }
    .sb-nav-inactive:hover .sb-nav-label {
      color: rgba(255,255,255,0.8);
    }

    /* ACTIVE */
    .sb-nav-active {
      background: rgba(201,168,76,0.08);
      border-color: rgba(201,168,76,0.25);
      box-shadow: inset 3px 0 0 var(--sb-gold), 0 4px 20px rgba(201,168,76,0.08);
      transform: translateX(4px);
    }
    .sb-root:not(.sb-expanded) .sb-nav-active {
      transform: scale(1.02);
    }
    .sb-nav-active .sb-nav-icon {
      background: rgba(201,168,76,0.2) !important;
      color: var(--sb-gold) !important;
      box-shadow: 0 0 14px rgba(201,168,76,0.25);
    }
    .sb-nav-active .sb-nav-label {
      color: var(--sb-gold-lt) !important;
      font-weight: 700 !important;
    }

    /* ICON BOX */
    .sb-nav-icon {
      width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 19px;
      background: rgba(255,255,255,0.04);
      color: rgba(255,255,255,0.35);
      transition: all 0.25s var(--sb-curve);
    }

    /* LABEL */
    .sb-nav-label {
      font-size: 13.5px; font-weight: 500; flex: 1;
      color: rgba(255,255,255,0.4); letter-spacing: 0.1px;
    }

    /* BADGE (Floating notification counter) */
    .sb-badge {
      font-size: 9px; font-weight: 800; letter-spacing: 0.3px;
      padding: 2px 7px; border-radius: 20px;
      flex-shrink: 0;
    }
    .sb-badge-gold { background: rgba(201,168,76,0.18); color: var(--sb-gold-lt); }
    .sb-badge-red  { background: rgba(239,68,68,0.2);  color: #f87171; }
    
    /* Auto adjust badge position when collapsed */
    .sb-root:not(.sb-expanded) .sb-badge {
      position: absolute; top: 4px; right: 4px;
      padding: 2px 5px; font-size: 8px; box-shadow: 0 0 6px rgba(0,0,0,0.5);
    }

    /* ── INTELLIGENT HOVER TOOLTIP (Shows ONLY when sidebar is collapsed) ── */
    .sb-tooltip {
      position: absolute; left: 62px; top: 50%; transform: translateY(-50%) translateX(12px);
      background: #0f0f11; border: 1px solid rgba(201,168,76,0.3);
      color: var(--sb-white); font-size: 11px; font-weight: 600; letter-spacing: 0.3px;
      padding: 6px 12px; border-radius: 8px; white-space: nowrap;
      opacity: 0; pointer-events: none;
      box-shadow: 0 4px 18px rgba(0,0,0,0.6), 0 0 10px rgba(201,168,76,0.05);
      transition: opacity 0.2s var(--sb-curve), transform 0.2s var(--sb-curve);
      z-index: 999;
    }
    .sb-tooltip::before {
      content: ''; position: absolute; left: -4px; top: 50%; transform: translateY(-50%) rotate(45deg);
      width: 8px; height: 8px; background: #0f0f11; border-left: 1px solid rgba(201,168,76,0.3); border-bottom: 1px solid rgba(201,168,76,0.3);
    }
    .sb-root:not(.sb-expanded) .sb-nav-item:hover .sb-tooltip {
      opacity: 1; transform: translateY(-50%) translateX(0);
    }

    /* ── SPACER DIVIDER ── */
    .sb-divider {
      height: 1px; margin: 12px 4px;
      background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.02));
    }

    /* ── FOOTER ZONE ── */
    .sb-footer-zone {
      margin-top: auto; padding-top: 14px;
      border-top: 1px solid rgba(255,255,255,0.04);
      position: relative; z-index: 2;
    }
    .sb-footer-label {
      font-size: 0.6rem; font-weight: 700; letter-spacing: 1.8px;
      text-transform: uppercase; color: rgba(255,255,255,0.15);
      padding: 0 4px; margin-bottom: 10px;
    }

    /* USER CARD (Floating Glassmorphism Style) */
    .sb-user-card {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 14px; padding: 10px;
      display: flex; align-items: center; gap: 10px;
      cursor: pointer; transition: all 0.3s var(--sb-curve);
      position: relative; overflow: hidden;
    }
    .sb-root:not(.sb-expanded) .sb-user-card {
      border-color: transparent; background: transparent; padding: 4px 0; justify-content: center;
    }
    .sb-user-card::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(circle at 10% 50%, rgba(201,168,76,0.06), transparent 60%);
      opacity: 0; transition: opacity 0.3s; pointer-events: none;
    }
    .sb-user-card:hover::before { opacity: 1; }
    .sb-user-card:hover {
      background: rgba(201,168,76,0.05);
      border-color: rgba(201,168,76,0.18);
    }

    .sb-avatar {
      width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0;
      background: linear-gradient(135deg, var(--sb-gold), #8f6929);
      display: flex; align-items: center; justify-content: center;
      font-size: 11.5px; font-weight: 900; color: #09090b; letter-spacing: 0.5px;
      box-shadow: 0 2px 8px rgba(201,168,76,0.15);
    }
    .sb-user-info { flex: 1; min-width: 0; }
    .sb-user-name {
      font-size: 12.5px; font-weight: 700;
      color: rgba(255,255,255,0.85);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      margin-bottom: 2px;
    }
    .sb-user-role {
      font-size: 10.5px; font-weight: 500;
      color: rgba(255,255,255,0.3);
    }
    .sb-online-dot {
      width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
      background: #34d399;
      animation: sb-online 2.5s ease-in-out infinite;
    }
    .sb-root:not(.sb-expanded) .sb-online-dot {
      position: absolute; bottom: 4px; right: 16px; border: 2px solid var(--sb-bg);
    }

    /* LOGOUT BTN (Modern Hover Pull Effect) */
    .sb-logout-btn {
      display: flex; align-items: center; gap: 12px;
      padding: 0 14px; height: 42px; margin-top: 8px;
      border-radius: 12px; cursor: pointer; border: none;
      background: transparent; width: 100%; text-align: left;
      color: rgba(255,255,255,0.25); font-size: 13px; font-weight: 600;
      font-family: var(--font-body); letter-spacing: 0.2px;
      transition: all 0.25s var(--sb-curve);
    }
    .sb-root:not(.sb-expanded) .sb-logout-btn {
      justify-content: center; padding: 0;
    }
    .sb-logout-btn:hover {
      background: rgba(239,68,68,0.08);
      color: #f87171;
      transform: translateX(2px);
    }
    .sb-root:not(.sb-expanded) .sb-logout-btn:hover { transform: scale(1.05); }
    .sb-logout-icon { font-size: 18px; flex-shrink: 0; }

    /* CONTENT DISPLAY LAYER */
    .sb-content { position: relative; z-index: 2; flex: 1; }

    /* ACTIVE ITEM INDICATOR BAR */
    .sb-active-marker {
      position: absolute; left: 0; top: 50%;
      transform: translateY(-50%);
      width: 3px; height: 55%; border-radius: 0 3px 3px 0;
      background: linear-gradient(to bottom, var(--sb-gold-lt), var(--sb-gold));
      box-shadow: 0 0 10px rgba(201,168,76,0.6);
    }
  `}</style>
);

/* ── DATA DEFINITIONS ── */
const navItems = [
  { id: "dashboard", path: "/dashboard",     icon: MdDashboard,         label: "Dashboard"      },
  { id: "katalog",   path: "/katalogproduk", icon: MdOutlineChair,      label: "Katalog Produk" },
  { id: "pesanan",   path: "/PesananMasuk",  icon: MdShoppingCart,      label: "Pesanan Masuk", badge: "3", badgeColor: "red" },
  { id: "stok",      path: "/StockGudang",   icon: MdOutlineInventory2, label: "Stok Gudang"    },
];
const reportItems = [
  { id: "analitik",   path: "/analitik",   icon: MdBarChart, label: "Analitik"    },
  { id: "pengaturan", path: "/pengaturan", icon: MdSettings, label: "Pengaturan"  },
];

/* ── INTERACTIVE NAV ITEM COMPONENT ── */
const NavItem = ({ item }) => (
  <NavLink
    to={item.path}
    className={({ isActive }) =>
      `sb-nav-item ${isActive ? "sb-nav-active" : "sb-nav-inactive"}`
    }
  >
    {({ isActive }) => (
      <>
        {isActive && <div className="sb-active-marker" />}
        <div className="sb-nav-icon">
          <item.icon />
        </div>
        
        {/* Wrap texts and badges into fading animation layer */}
        <span className="sb-nav-label sb-fade-el">{item.label}</span>
        
        {item.badge && (
          <span className={`sb-badge ${item.badgeColor === "red" ? "sb-badge-red" : "sb-badge-gold"}`}>
            {item.badge}
          </span>
        )}

        {/* Modern Tooltip strictly visible only when sidebar closes */}
        <div className="sb-tooltip">{item.label}</div>
      </>
    )}
  </NavLink>
);

/* ── SECTION LABEL COMPONENT ── */
const SectionLabel = ({ text, isExpanded }) => (
  <div className="sb-section-label">
    {isExpanded ? (
      <>
        <span className="sb-section-text sb-fade-el">{text}</span>
        <div className="sb-section-line" />
      </>
    ) : (
      <div style={{ width: 12, height: 1, background: "rgba(255,255,255,0.1)", margin: "8px 0" }} />
    )}
  </div>
);

/* ── MAIN ADVANCED SIDEBAR COMPONENT ── */
export default function Sidebar() {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  
  // State control for Modern Hover Expand system
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const timeStr = time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  const dateStr = time.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" });

  return (
    <>
      <SidebarStyles />
      <aside 
        className={`sb-root ${isExpanded ? "sb-expanded" : ""}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >

        {/* ── AMBIENT ART BACKGROUND EFFECTS ── */}
        <div className="sb-bg-grid" />
        <div className="sb-orb-1" />
        <div className="sb-orb-2" />
        <div className="sb-scan-line" />

        {/* ══════════════════════════════
             LOGO ZONE
        ══════════════════════════════ */}
        <div className="sb-logo-zone">
          <div className="sb-logo-badge">
            <div className="sb-badge-pulse" />
            Admin Portal
          </div>

          <div className="sb-logo-row">
            <div className="sb-logo-icon-box">🛋️</div>
            <div className="sb-fade-el">
              <div className="sb-logo-text">
                BM<span>Perabot</span>
              </div>
            </div>
          </div>

          {isExpanded && (
            <div className="sb-logo-sub sb-fade-el">Sistem Informasi Pemesanan</div>
          )}
          <div className="sb-logo-divider" />
        </div>

        {/* ══════════════════════════════
             NAV CONTENT
        ══════════════════════════════ */}
        <div className="sb-content">

          {/* Elegant Micro Live Time Widget */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: isExpanded ? "space-between" : "center",
            padding: "9px 12px", marginBottom: 16, height: 36,
            background: isExpanded ? "rgba(255,255,255,0.02)" : "transparent",
            border: isExpanded ? "1px solid rgba(255,255,255,0.04)" : "1px solid transparent",
            borderRadius: 11, transition: "all 0.3s",
          }}>
            {isExpanded ? (
              <>
                <span className="sb-fade-el" style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.22)", fontWeight: 600, letterSpacing: "0.5px" }}>
                  {dateStr}
                </span>
                <span className="sb-fade-el" style={{
                  fontSize: "0.78rem", fontWeight: 700,
                  color: "rgba(201,168,76,0.7)", fontVariantNumeric: "tabular-nums",
                  letterSpacing: "0.5px",
                }}>
                  {timeStr}
                </span>
              </>
            ) : (
              // Tiny abstract clock indicator when collapsed
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(201,168,76,0.4)" }} />
            )}
          </div>

          {/* MAIN MENU */}
          <SectionLabel text="Main Menu" isExpanded={isExpanded} />
          <nav>
            {navItems.map(item => <NavItem key={item.id} item={item} />)}
          </nav>

          <div className="sb-divider" />

          {/* LAPORAN */}
          <SectionLabel text="Laporan" isExpanded={isExpanded} />
          <nav>
            {reportItems.map(item => <NavItem key={item.id} item={item} />)}
          </nav>
        </div>

        {/* ══════════════════════════════
             FOOTER ZONE
        ══════════════════════════════ */}
        <div className="sb-footer-zone">
          {isExpanded && <div className="sb-footer-label sb-fade-el">Akun Aktif</div>}

          {/* User Profile Card */}
          <div className="sb-user-card" title="Hafiz Anshori">
            <div className="sb-avatar">HA</div>
            <div className="sb-user-info sb-fade-el">
              <div className="sb-user-name">Hafiz Anshori</div>
              <div className="sb-user-role">Manajer Operasional</div>
            </div>
            <div className="sb-online-dot" />
          </div>

          {/* Modern Interactive Logout */}
          <button className="sb-logout-btn" onClick={handleLogout}>
            <MdLogout className="sb-logout-icon" />
            <span className="sb-fade-el">Keluar</span>
          </button>
        </div>

      </aside>
    </>
  );
}