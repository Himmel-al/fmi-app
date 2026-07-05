import React, { useState, useEffect, useRef } from "react";
import { MdSearch } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";

const HeaderStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

    /* ── KEYFRAMES ── */
    @keyframes hd-drop-in {
      from { opacity: 0; transform: translateY(-10px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0)  scale(1); }
    }
    @keyframes hd-shimmer {
      0%   { background-position: -300% center; }
      100% { background-position:  300% center; }
    }
    @keyframes hd-ping {
      0%   { transform: scale(1);   opacity: 0.75; }
      100% { transform: scale(2.6); opacity: 0; }
    }
    @keyframes hd-badge-pop {
      0%  { transform: scale(0.5); }
      65% { transform: scale(1.2); }
      100%{ transform: scale(1); }
    }
    @keyframes hd-online {
      0%,100% { box-shadow: 0 0 0 0 rgba(52,211,153,0.55); }
      50%      { box-shadow: 0 0 0 5px rgba(52,211,153,0); }
    }
    @keyframes hd-scan {
      0%   { background-position: -300% center; }
      100% { background-position:  300% center; }
    }
    @keyframes hd-blink {
      0%,100% { opacity: 1; }
      50%     { opacity: 0; }
    }

    /* ── ROOT ── */
    .hd-root {
      font-family: 'DM Sans', sans-serif;
      display: flex; align-items: center; gap: 10px;
      padding: 0 22px; height: 62px;
      background: rgba(9,9,11,0.86);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255,255,255,0.055);
      position: sticky; top: 0; z-index: 900;
      transition: box-shadow 0.35s;
    }
    .hd-root.hd-scrolled {
      box-shadow: 0 1px 0 rgba(201,168,76,0.1), 0 10px 28px rgba(0,0,0,0.45);
    }
    /* Moving shimmer top edge */
    .hd-root::before {
      content: '';
      position: absolute; left: 0; right: 0; top: 0; height: 1px;
      background: linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.25) 25%, rgba(201,168,76,0.65) 50%, rgba(201,168,76,0.25) 75%, transparent 100%);
      background-size: 200% auto;
      animation: hd-scan 4.5s linear infinite;
    }

    /* ── PAGE INFO ── */
    .hd-title  { font-size: 15px; font-weight: 800; color: rgba(255,255,255,0.92); letter-spacing: -0.25px; margin-bottom: 1px; }
    .hd-crumb  { display: flex; align-items: center; gap: 5px; font-size: 10.5px; color: rgba(255,255,255,0.25); font-weight: 500; }
    .hd-crumb-active { color: #c9a84c; font-weight: 600; }
    .hd-crumb-sep    { font-size: 8px; opacity: 0.4; }

    /* ── LIVE CLOCK ── */
    .hd-clock {
      display: flex; align-items: center; gap: 8px;
      padding: 6px 12px; border-radius: 10px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      flex-shrink: 0;
    }
    .hd-clock-dot  { width: 6px; height: 6px; border-radius: 50%; background: #34d399; flex-shrink: 0; animation: hd-online 2.5s ease-in-out infinite; }
    .hd-clock-time { font-size: 11.5px; font-weight: 700; color: rgba(255,255,255,0.5); letter-spacing: 0.6px; font-variant-numeric: tabular-nums; }
    .hd-clock-colon { animation: hd-blink 1s step-end infinite; }

    /* ── SEARCH ── */
    .hd-search-wrap { position: relative; flex-shrink: 0; }
    .hd-search-box  {
      display: flex; align-items: center; gap: 8px;
      height: 38px; padding: 0 13px; border-radius: 11px; width: 215px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      cursor: text; transition: all 0.28s cubic-bezier(0.4,0,0.2,1);
    }
    .hd-search-box.hd-sf {
      width: 275px;
      border-color: rgba(201,168,76,0.45);
      background: rgba(201,168,76,0.05);
      box-shadow: 0 0 0 3px rgba(201,168,76,0.09);
    }
    .hd-search-icon { font-size: 15px; color: rgba(255,255,255,0.22); flex-shrink: 0; transition: color 0.22s; }
    .hd-search-box.hd-sf .hd-search-icon { color: rgba(201,168,76,0.7); }
    .hd-search-input {
      background: transparent; border: none; outline: none;
      font-size: 12.5px; color: rgba(255,255,255,0.82); width: 100%;
      font-family: 'DM Sans', sans-serif;
    }
    .hd-search-input::placeholder { color: rgba(255,255,255,0.18); }
    .hd-search-kbd {
      font-size: 9px; font-weight: 700; letter-spacing: 0.5px;
      color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.06);
      padding: 2px 7px; border-radius: 5px; border: 1px solid rgba(255,255,255,0.08);
      white-space: nowrap; flex-shrink: 0;
    }
    .hd-search-clear { font-size: 12px; color: rgba(255,255,255,0.22); cursor: pointer; flex-shrink: 0; transition: color 0.18s; }
    .hd-search-clear:hover { color: rgba(255,255,255,0.6); }

    /* Search dropdown */
    .hd-search-drop {
      position: absolute; top: calc(100% + 8px); left: 0; right: 0; z-index: 1001;
      background: #111113; border: 1px solid rgba(201,168,76,0.14);
      border-radius: 14px; padding: 6px; overflow: hidden;
      box-shadow: 0 16px 44px rgba(0,0,0,0.65);
      animation: hd-drop-in 0.18s cubic-bezier(0.4,0,0.2,1);
    }
    .hd-drop-label {
      padding: 5px 10px 6px; font-size: 9px; font-weight: 700;
      letter-spacing: 1.8px; text-transform: uppercase; color: rgba(255,255,255,0.2);
    }
    .hd-srch-item {
      display: flex; align-items: center; gap: 10px;
      padding: 8px 10px; border-radius: 9px; cursor: pointer; transition: background 0.16s;
    }
    .hd-srch-item:hover { background: rgba(201,168,76,0.07); }
    .hd-srch-icon  { width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; font-size: 1rem; }
    .hd-srch-name  { font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.75); margin-bottom: 2px; }
    .hd-srch-type  { font-size: 9.5px; font-weight: 700; letter-spacing: 0.5px; color: rgba(201,168,76,0.6); }
    .hd-srch-enter { font-size: 10px; color: rgba(255,255,255,0.15); margin-left: auto; flex-shrink: 0; }
    .hd-srch-empty { padding: 16px; text-align: center; font-size: 12px; color: rgba(255,255,255,0.22); }

    /* ── ICON BUTTON ── */
    .hd-icon-btn {
      position: relative; width: 38px; height: 38px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      border-radius: 11px; font-size: 14px;
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
      color: rgba(255,255,255,0.35); cursor: pointer;
      transition: all 0.22s; user-select: none;
    }
    .hd-icon-btn:hover { background: rgba(255,255,255,0.07); border-color: rgba(201,168,76,0.18); color: rgba(255,255,255,0.7); }
    .hd-icon-btn.hd-open { background: rgba(201,168,76,0.09); border-color: rgba(201,168,76,0.3); color: #c9a84c; }

    /* Badge */
    .hd-badge {
      position: absolute; top: -5px; right: -5px;
      min-width: 17px; height: 17px; border-radius: 9px; padding: 0 4px;
      display: flex; align-items: center; justify-content: center;
      font-size: 8.5px; font-weight: 800; border: 2px solid #09090b;
      animation: hd-badge-pop 0.25s cubic-bezier(0.4,0,0.2,1);
    }
    .hd-badge-red  { background: #ef4444; color: #fff; }
    .hd-badge-gold { background: #c9a84c; color: #09090b; }

    /* Ping ring around bell badge */
    .hd-ping-ring {
      position: absolute; top: -5px; right: -5px;
      width: 17px; height: 17px; border-radius: 50%;
      background: rgba(239,68,68,0.45);
      animation: hd-ping 1.7s ease-out infinite;
      pointer-events: none;
    }

    /* ── BASE DROPDOWN ── */
    .hd-drop {
      position: absolute; right: 0; top: calc(100% + 10px); z-index: 1000;
      background: #111113; border: 1px solid rgba(201,168,76,0.13);
      border-radius: 16px; overflow: hidden;
      box-shadow: 0 22px 54px rgba(0,0,0,0.72), 0 0 0 1px rgba(201,168,76,0.03);
      animation: hd-drop-in 0.2s cubic-bezier(0.4,0,0.2,1);
    }

    /* ── NOTIFICATION DROPDOWN ── */
    .hd-nd-head {
      display: flex; justify-content: space-between; align-items: center;
      padding: 14px 16px 11px; border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .hd-nd-title   { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.88); }
    .hd-nd-mark    {
      font-size: 10.5px; font-weight: 600; color: rgba(201,168,76,0.65);
      background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
      transition: color 0.18s; padding: 0;
    }
    .hd-nd-mark:hover { color: #c9a84c; }
    .hd-nd-item {
      display: flex; align-items: flex-start; gap: 11px;
      padding: 12px 16px; cursor: pointer; transition: background 0.16s;
      border-bottom: 1px solid rgba(255,255,255,0.03); position: relative;
    }
    .hd-nd-item:last-child { border-bottom: none; }
    .hd-nd-item:hover { background: rgba(201,168,76,0.045); }
    .hd-nd-item.unread { background: rgba(201,168,76,0.028); }
    .hd-nd-unread-dot { position: absolute; top: 16px; right: 14px; width: 6px; height: 6px; border-radius: 50%; background: #c9a84c; }
    .hd-nd-icon  { width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; font-size: 1rem; }
    .hd-nd-name  { font-size: 12.5px; font-weight: 700; color: rgba(255,255,255,0.82); margin-bottom: 3px; }
    .hd-nd-msg   { font-size: 11.5px; color: rgba(255,255,255,0.36); line-height: 1.4; }
    .hd-nd-time  { font-size: 9.5px; color: rgba(255,255,255,0.2); margin-top: 4px; }
    .hd-nd-foot  { padding: 8px; border-top: 1px solid rgba(255,255,255,0.05); }
    .hd-nd-all   {
      display: block; width: 100%; padding: 9px; border-radius: 9px; background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06); text-align: center; font-size: 11.5px; font-weight: 700;
      color: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.18s; font-family: 'DM Sans', sans-serif;
    }
    .hd-nd-all:hover { background: rgba(201,168,76,0.07); color: #c9a84c; border-color: rgba(201,168,76,0.2); }
    .hd-nd-empty { padding: 24px 16px; text-align: center; font-size: 12px; color: rgba(255,255,255,0.25); }
    .hd-nd-loading { padding: 24px 16px; text-align: center; font-size: 12px; color: rgba(255,255,255,0.25); }

    /* ── CART DROPDOWN ── */
    .hd-cd-head {
      display: flex; justify-content: space-between; align-items: center;
      padding: 14px 16px 11px; border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .hd-cd-title { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.88); }
    .hd-cd-count { font-size: 10px; font-weight: 800; color: #09090b; background: #c9a84c; padding: 2px 8px; border-radius: 10px; }
    .hd-cd-item  {
      display: flex; align-items: center; gap: 11px;
      padding: 11px 16px; border-bottom: 1px solid rgba(255,255,255,0.03); transition: background 0.16s;
    }
    .hd-cd-item:last-child { border-bottom: none; }
    .hd-cd-item:hover { background: rgba(255,255,255,0.025); }
    .hd-cd-icon  { width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
    .hd-cd-name  { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.75); margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 155px; }
    .hd-cd-price { font-size: 11.5px; font-weight: 700; color: #c9a84c; }
    .hd-cd-qty   { margin-left: auto; font-size: 10.5px; font-weight: 700; color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.06); border-radius: 7px; padding: 3px 8px; flex-shrink: 0; }
    .hd-cd-foot  { padding: 10px; border-top: 1px solid rgba(255,255,255,0.05); }
    .hd-cd-total {
      display: flex; justify-content: space-between; align-items: center;
      padding: 4px 4px 10px; font-size: 12px; color: rgba(255,255,255,0.42);
    }
    .hd-cd-total-val { font-weight: 800; color: #e8c97a; }
    .hd-cd-checkout {
      display: flex; align-items: center; justify-content: center; gap: 6px;
      width: 100%; padding: 10px; background: linear-gradient(135deg, #c9a84c, #a8813a);
      border: none; border-radius: 10px; cursor: pointer;
      font-size: 12.5px; font-weight: 700; color: #09090b;
      font-family: 'DM Sans', sans-serif; transition: all 0.22s;
    }
    .hd-cd-checkout:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(201,168,76,0.3); }
    .hd-cd-checkout:active { transform: scale(0.98); }

    /* ── USER DROPDOWN ── */
    .hd-ud-profile {
      display: flex; align-items: center; gap: 11px;
      padding: 14px 16px 12px; border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .hd-ud-avatar {
      width: 40px; height: 40px; border-radius: 11px; flex-shrink: 0;
      background: linear-gradient(135deg, #c9a84c, #8f6929);
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 900; color: #09090b; letter-spacing: 0.5px;
    }
    .hd-ud-name  { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.88); margin-bottom: 2px; }
    .hd-ud-email { font-size: 10.5px; color: rgba(255,255,255,0.3); }
    .hd-ud-badge {
      margin-left: auto; flex-shrink: 0;
      display: flex; align-items: center; gap: 5px;
      font-size: 8.5px; font-weight: 700; letter-spacing: 0.8px;
      color: #34d399; text-transform: uppercase;
    }
    .hd-ud-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: #34d399; animation: hd-online 2.5s ease-in-out infinite; }

    .hd-ud-items { padding: 6px; }
    .hd-ud-item  {
      display: flex; align-items: center; gap: 10px;
      padding: 9px 11px; border-radius: 9px; cursor: pointer;
      transition: all 0.18s; margin-bottom: 1px;
    }
    .hd-ud-item:hover             { background: rgba(255,255,255,0.05); }
    .hd-ud-item.hd-danger:hover   { background: rgba(239,68,68,0.09); }
    .hd-ud-item.hd-danger:hover .hd-ud-item-label { color: #f87171; }
    .hd-ud-ibox  { width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; font-size: 13px; }
    .hd-ud-item-label { font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.52); transition: color 0.18s; }
    .hd-ud-divider { height: 1px; background: rgba(255,255,255,0.05); margin: 4px 5px 5px; }

    /* ── ADD BUTTON ── */
    .hd-add-btn {
      display: flex; align-items: center; gap: 6px;
      padding: 0 16px; height: 38px; border-radius: 11px; flex-shrink: 0;
      background: linear-gradient(135deg, #c9a84c 0%, #a8813a 100%);
      color: #09090b; font-size: 12.5px; font-weight: 700; letter-spacing: 0.2px;
      border: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
      box-shadow: 0 4px 16px rgba(201,168,76,0.25);
      transition: all 0.22s; position: relative; overflow: hidden;
    }
    .hd-add-btn::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
      background-size: 200% auto;
      animation: hd-shimmer 2.8s linear infinite;
    }
    .hd-add-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(201,168,76,0.38); }
    .hd-add-btn:active { transform: translateY(0) scale(0.97); }

    /* ── AVATAR TRIGGER ── */
    .hd-av-trigger {
      display: flex; align-items: center; gap: 7px;
      padding: 4px 10px 4px 4px; border-radius: 12px; flex-shrink: 0;
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
      cursor: pointer; transition: all 0.22s;
    }
    .hd-av-trigger:hover, .hd-av-trigger.hd-open {
      background: rgba(201,168,76,0.07); border-color: rgba(201,168,76,0.22);
    }
    .hd-av-sm {
      width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
      background: linear-gradient(135deg, #c9a84c, #8f6929);
      display: flex; align-items: center; justify-content: center;
      font-size: 10px; font-weight: 900; color: #09090b; letter-spacing: 0.3px;
    }
    .hd-av-name   { font-size: 11.5px; font-weight: 700; color: rgba(255,255,255,0.68); }
    .hd-av-caret  { font-size: 9px; color: rgba(255,255,255,0.22); transition: transform 0.2s; }
    .hd-av-trigger.hd-open .hd-av-caret { transform: rotate(180deg); }
  `}</style>
);

/* ═══════════════════════════════════
   STATIC DATA
═══════════════════════════════════ */
const PAGE_TITLES = {
  '/dashboard':     { title: 'Dashboard',      sub: 'Ringkasan Operasional' },
  '/katalogproduk': { title: 'Katalog Produk', sub: 'Manajemen Inventori'   },
  '/PesananMasuk':  { title: 'Pesanan Masuk',  sub: 'Daftar Order Aktif'    },
  '/StockGudang':   { title: 'Stok Gudang',    sub: 'Manajemen Persediaan'  },
  '/analitik':      { title: 'Analitik',       sub: 'Laporan & Statistik'   },
  '/pengaturan':    { title: 'Pengaturan',     sub: 'Konfigurasi Sistem'    },
};

// Notifikasi sekarang di-fetch langsung dari API (/api/notifications), lihat useEffect di bawah.

// Icon untuk tiap jenis notifikasi dari backend
const NOTIF_ICONS = {
  low_stock:  '⚠️',
  new_order:  '🛍️',
  order_done: '✅',
};

// Ubah timestamp dari backend jadi teks "x menit lalu"
function timeAgo(dateString) {
  if (!dateString) return '';
  const now = new Date();
  const past = new Date(dateString);
  const diffSec = Math.floor((now - past) / 1000);

  if (diffSec < 60) return 'Baru saja';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} mnt lalu`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} jam lalu`;
  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay} hari lalu`;
}

const SUGGESTIONS = [
  { emoji:'🛋️', name:'Sofa Premium L-Shape',   type:'Katalog'  },
  { emoji:'🛏️', name:'Ranjang Jati King Size', type:'Katalog'  },
  { emoji:'📋', name:'Order #1042 — Budi S.',  type:'Pesanan'  },
  { emoji:'📦', name:'Stok: Sofa L (2 unit)',  type:'Gudang'   },
  { emoji:'📊', name:'Laporan April 2026',      type:'Analitik' },
];

/* ═══════════════════════════════════
   COMPONENT
═══════════════════════════════════ */
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchVal,  setSearchVal]  = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const [showNotif,  setShowNotif]  = useState(false);
  const [showUser,   setShowUser]   = useState(false);
  const [readSet,    setReadSet]    = useState(new Set());
  const [scrolled,   setScrolled]   = useState(false);
  const [time,       setTime]       = useState(new Date());

  // Notifikasi asli dari backend
  const [notifList,    setNotifList]    = useState([]);
  const [notifLoading, setNotifLoading] = useState(true);

  const notifRef  = useRef(null);
  const userRef   = useRef(null);
  const searchRef = useRef(null);

  /* click-outside → close dropdowns */
  useEffect(() => {
    const h = (e) => {
      if (notifRef.current  && !notifRef.current.contains(e.target))  setShowNotif(false);
      if (userRef.current   && !userRef.current.contains(e.target))   setShowUser(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchFocus(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  /* scroll detect */
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  /* live clock — tick every second */
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* ── FETCH NOTIFIKASI ASLI DARI BACKEND ── */
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/notifications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifList(res.data.notifications || []);
      } catch (err) {
        console.error('Gagal memuat notifikasi:', err);
      } finally {
        setNotifLoading(false);
      }
    };

    fetchNotifications();
    // Refresh otomatis tiap 60 detik biar data selalu update
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  /* helpers */
  const closeAll = () => { setShowNotif(false); setShowUser(false); };
  const toggle   = (fn, cur) => { closeAll(); fn(!cur); };

  const unread    = notifList.filter(n => !readSet.has(n.id)).length;
  const pageInfo  = PAGE_TITLES[location.pathname] || PAGE_TITLES['/dashboard'];
  const filtered  = SUGGESTIONS.filter(s => !searchVal || s.name.toLowerCase().includes(searchVal.toLowerCase()));

  const pad   = n => String(n).padStart(2, '0');
  const h12   = time.getHours() % 12 || 12;
  const ampm  = time.getHours() < 12 ? 'AM' : 'PM';
  const timeStr = `${pad(h12)}:${pad(time.getMinutes())}:${pad(time.getSeconds())} ${ampm}`;

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    navigate('/login');
  };

  /* ── JSX ── */
  return (
    <>
      <HeaderStyles />
      <header className={`hd-root${scrolled ? ' hd-scrolled' : ''}`}>

        {/* ── 1. PAGE INFO ── */}
        <div style={{ flex:1, minWidth:0 }}>
          <div className="hd-title">{pageInfo.title}</div>
          <div className="hd-crumb">
            <span>Utama</span>
            <span className="hd-crumb-sep">›</span>
            <span className="hd-crumb-active">{pageInfo.sub}</span>
          </div>
        </div>

        {/* ── 2. LIVE CLOCK ── */}
        <div className="hd-clock">
          <div className="hd-clock-dot" />
          <span className="hd-clock-time">{timeStr}</span>
        </div>

        {/* ── 3. SEARCH ── */}
        <div className="hd-search-wrap" ref={searchRef}>
          <div className={`hd-search-box${searchFocus ? ' hd-sf' : ''}`} onClick={() => setSearchFocus(true)}>
            <MdSearch className="hd-search-icon" />
            <input
              className="hd-search-input"
              placeholder="Cari produk, pesanan..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              onFocus={() => setSearchFocus(true)}
            />
            {!searchFocus && <span className="hd-search-kbd">⌘K</span>}
            {searchFocus && searchVal && (
              <span className="hd-search-clear" onClick={() => setSearchVal('')}>✕</span>
            )}
          </div>

          {/* Search dropdown */}
          {searchFocus && (
            <div className="hd-search-drop">
              {filtered.length > 0 ? (
                <>
                  <div className="hd-drop-label">{searchVal ? 'Hasil Pencarian' : 'Akses Cepat'}</div>
                  {filtered.map((s, i) => (
                    <div key={i} className="hd-srch-item" onClick={() => setSearchFocus(false)}>
                      <div className="hd-srch-icon">{s.emoji}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div className="hd-srch-name">{s.name}</div>
                        <div className="hd-srch-type">{s.type}</div>
                      </div>
                      <span className="hd-srch-enter">↵</span>
                    </div>
                  ))}
                </>
              ) : (
                <div className="hd-srch-empty">Tidak ada hasil untuk "{searchVal}"</div>
              )}
            </div>
          )}
        </div>

        {/* ── 4. RIGHT ACTIONS ── */}
        <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>

          {/* ── NOTIFICATIONS ── */}
          <div ref={notifRef} style={{ position:'relative' }}>
            <div className={`hd-icon-btn${showNotif ? ' hd-open' : ''}`}
              onClick={() => toggle(setShowNotif, showNotif)}>
              <FaBell />
              {unread > 0 && (
                <>
                  <div className="hd-ping-ring" />
                  <span className="hd-badge hd-badge-red">{unread}</span>
                </>
              )}
            </div>

            {showNotif && (
              <div className="hd-drop" style={{ width:340 }}>
                <div className="hd-nd-head">
                  <span className="hd-nd-title">Notifikasi {unread > 0 && `(${unread} baru)`}</span>
                  {unread > 0 && (
                    <button className="hd-nd-mark"
                      onClick={() => setReadSet(new Set(notifList.map(n => n.id)))}>
                      Tandai semua dibaca
                    </button>
                  )}
                </div>

                {notifLoading ? (
                  <div className="hd-nd-loading">Memuat notifikasi...</div>
                ) : notifList.length === 0 ? (
                  <div className="hd-nd-empty">Tidak ada notifikasi baru 🎉</div>
                ) : (
                  notifList.map(n => {
                    const isUnread = !readSet.has(n.id);
                    return (
                      <div key={n.id}
                        className={`hd-nd-item${isUnread ? ' unread' : ''}`}
                        onClick={() => setReadSet(prev => new Set([...prev, n.id]))}>
                        {isUnread && <div className="hd-nd-unread-dot" />}
                        <div className="hd-nd-icon">{NOTIF_ICONS[n.type] || '🔔'}</div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div className="hd-nd-name">{n.title}</div>
                          <div className="hd-nd-msg">{n.description}</div>
                          <div className="hd-nd-time">{timeAgo(n.time)}</div>
                        </div>
                      </div>
                    );
                  })
                )}

                <div className="hd-nd-foot">
                  <button className="hd-nd-all">Lihat Semua Notifikasi</button>
                </div>
              </div>
            )}
          </div>

          {/* ── USER AVATAR ── */}
          <div ref={userRef} style={{ position:'relative' }}>
            <div className={`hd-av-trigger${showUser ? ' hd-open' : ''}`}
              onClick={() => toggle(setShowUser, showUser)}>
              <div className="hd-av-sm">HA</div>
              <span className="hd-av-name">Hafiz A.</span>
              <span className="hd-av-caret">▾</span>
            </div>

            {showUser && (
              <div className="hd-drop" style={{ width:225 }}>
                {/* Profile card */}
                <div className="hd-ud-profile">
                  <div className="hd-ud-avatar">HA</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div className="hd-ud-name">Hafiz Anshori</div>
                    <div className="hd-ud-email">admin@bmperabot.com</div>
                  </div>
                  <div className="hd-ud-badge">
                    <div className="hd-ud-badge-dot" /> Online
                  </div>
                </div>

                {/* Menu */}
                <div className="hd-ud-items">
                  {[
                    { emoji:'👤', label:'Profil Saya',  path:'/profil'     },
                    { emoji:'⚙️', label:'Pengaturan',  path:'/pengaturan' },
                    { emoji:'📊', label:'Aktivitas',   path:'/analitik'   },
                  ].map((item, i) => (
                    <div key={i} className="hd-ud-item"
                      onClick={() => { setShowUser(false); navigate(item.path); }}>
                      <div className="hd-ud-ibox">{item.emoji}</div>
                      <span className="hd-ud-item-label">{item.label}</span>
                    </div>
                  ))}

                  <div className="hd-ud-divider" />

                  <div className="hd-ud-item hd-danger" onClick={handleLogout}>
                    <div className="hd-ud-ibox" style={{ background:'rgba(239,68,68,0.08)' }}>🚪</div>
                    <span className="hd-ud-item-label">Keluar</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>{/* end right actions */}
      </header>
    </>
  );
}