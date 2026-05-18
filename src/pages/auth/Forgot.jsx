import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.glowTop} />
      <div style={styles.glowRight} />

      <div style={styles.card}>
        <div style={styles.accentLine} />

        {/* Logo */}
        <div style={styles.logoBlock}>
          <div style={styles.logoRow}>
            <span style={styles.logoText}>SIPP</span>
            <span style={styles.logoDot}>.</span>
          </div>
          <p style={styles.logoSub}>Furniture Management</p>
        </div>

        <div style={styles.divider} />

        {!sent ? (
          <>
            {/* Back link */}
            <Link to="/login" style={styles.backLink}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Kembali ke Login
            </Link>

            {/* Heading */}
            <div style={styles.headingBlock}>
              <div style={styles.iconCircle}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h2 style={styles.heading}>Lupa Kata Sandi?</h2>
              <p style={styles.subheading}>
                Masukkan email Anda dan kami akan mengirimkan tautan untuk mereset kata sandi.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Email Terdaftar</label>
                <div className="input-wrap" style={styles.inputWrapper}>
                  <svg style={styles.inputIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    type="email"
                    placeholder="admin@sippfurniture.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="submit-btn"
                style={{
                  ...styles.submitBtn,
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? (
                  <span style={styles.btnRow}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 0.8s linear infinite" }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Mengirim...
                  </span>
                ) : (
                  <span style={styles.btnRow}>
                    Kirim Tautan Reset
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </span>
                )}
              </button>
            </form>
          </>
        ) : (
          /* Success state */
          <div style={styles.successBlock}>
            <div style={styles.successIconWrap}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 style={styles.successHeading}>Email Terkirim!</h2>
            <p style={styles.successText}>
              Tautan reset kata sandi telah dikirim ke{" "}
              <span style={styles.successEmail}>{email}</span>.
              Periksa kotak masuk Anda.
            </p>
            <div style={styles.successNote}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Tautan akan kedaluwarsa dalam 15 menit.
            </div>
            <Link to="/login" style={styles.backToLoginBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Kembali ke Login
            </Link>
          </div>
        )}

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .input-wrap:focus-within { border-color: #f97316 !important; box-shadow: 0 0 0 3px rgba(249,115,22,0.12) !important; }
          .submit-btn:hover:not(:disabled) { background: linear-gradient(135deg, #fb923c 0%, #ea580c 100%) !important; transform: translateY(-1px); }
          .submit-btn:active:not(:disabled) { transform: translateY(0); }
        `}</style>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#0c0d11",
    overflow: "hidden",
    fontFamily: "'DM Sans', 'Inter', sans-serif",
  },
  glowTop: {
    position: "absolute",
    top: "-120px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "500px",
    height: "300px",
    background: "radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  glowRight: {
    position: "absolute",
    top: "30%",
    right: "-60px",
    width: "260px",
    height: "200px",
    background: "radial-gradient(ellipse, rgba(249,115,22,0.06) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    width: "100%",
    maxWidth: "420px",
    background: "linear-gradient(160deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.02) 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "34px 36px 28px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
    overflow: "hidden",
  },
  accentLine: {
    position: "absolute",
    top: 0,
    left: "36px",
    right: "36px",
    height: "2px",
    background: "linear-gradient(90deg, transparent, #f97316 40%, transparent)",
    borderRadius: "0 0 2px 2px",
  },
  logoBlock: { marginBottom: "22px" },
  logoRow: { display: "flex", alignItems: "baseline", gap: "1px", marginBottom: "5px" },
  logoText: { fontSize: "30px", fontWeight: "800", letterSpacing: "0.12em", color: "#fff", lineHeight: 1 },
  logoDot: { fontSize: "40px", fontWeight: "800", color: "#f97316", lineHeight: "0.6" },
  logoSub: { fontSize: "9.5px", letterSpacing: "0.24em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase", fontWeight: "600", margin: 0 },
  divider: { height: "1px", background: "linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.11), rgba(255,255,255,0.04))", marginBottom: "22px" },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12.5px",
    color: "rgba(255,255,255,0.35)",
    textDecoration: "none",
    marginBottom: "20px",
    fontWeight: "500",
    transition: "color 0.15s",
  },
  headingBlock: { marginBottom: "22px" },
  iconCircle: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: "rgba(249,115,22,0.1)",
    border: "1px solid rgba(249,115,22,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },
  heading: { fontSize: "19px", fontWeight: "700", color: "#fff", margin: "0 0 6px", letterSpacing: "-0.01em" },
  subheading: { fontSize: "13px", color: "rgba(255,255,255,0.38)", margin: 0, lineHeight: "1.6" },
  form: { display: "flex", flexDirection: "column", gap: "14px" },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "7px" },
  label: { fontSize: "11.5px", fontWeight: "700", color: "rgba(255,255,255,0.45)", letterSpacing: "0.07em", textTransform: "uppercase" },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  inputIcon: { position: "absolute", left: "12px", color: "rgba(255,255,255,0.22)", pointerEvents: "none" },
  input: {
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    padding: "11px 13px 11px 36px",
    color: "rgba(255,255,255,0.82)",
    fontSize: "13.5px",
    fontFamily: "inherit",
    borderRadius: "10px",
  },
  submitBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    border: "none",
    borderRadius: "10px",
    padding: "13px",
    color: "#fff",
    fontWeight: "700",
    fontSize: "14px",
    fontFamily: "inherit",
    transition: "all 0.2s",
    boxShadow: "0 4px 20px rgba(249,115,22,0.28)",
  },
  btnRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", letterSpacing: "0.02em" },
  // Success state
  successBlock: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "8px 0 4px", animation: "fadeUp 0.4s ease" },
  successIconWrap: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "rgba(34,197,94,0.1)",
    border: "1px solid rgba(34,197,94,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "18px",
  },
  successHeading: { fontSize: "19px", fontWeight: "700", color: "#fff", margin: "0 0 10px" },
  successText: { fontSize: "13.5px", color: "rgba(255,255,255,0.45)", lineHeight: "1.65", margin: "0 0 16px" },
  successEmail: { color: "rgba(255,255,255,0.75)", fontWeight: "600" },
  successNote: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    fontSize: "12px",
    color: "rgba(255,255,255,0.28)",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "8px",
    padding: "9px 13px",
    marginBottom: "22px",
    width: "100%",
  },
  backToLoginBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    fontSize: "13.5px",
    color: "#f97316",
    textDecoration: "none",
    fontWeight: "600",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "1px solid rgba(249,115,22,0.3)",
    background: "rgba(249,115,22,0.06)",
    transition: "all 0.2s",
  },
};