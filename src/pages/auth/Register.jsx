import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Lemah", "Sedang", "Kuat"];
  const strengthColor = ["", "#ef4444", "#f97316", "#22c55e"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.glowTop} />
      <div style={styles.glowLeft} />

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

        {/* Heading */}
        <div style={styles.headingBlock}>
          <h2 style={styles.heading}>Buat Akun Baru</h2>
          <p style={styles.subheading}>Daftarkan bisnis furnitur Anda hari ini.</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Nama Lengkap */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Nama Lengkap</label>
            <div className="input-wrap" style={styles.inputWrapper}>
              <svg style={styles.inputIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                placeholder="John Doe"
                style={styles.input}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email</label>
            <div className="input-wrap" style={styles.inputWrapper}>
              <svg style={styles.inputIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                type="email"
                placeholder="email@domain.com"
                style={styles.input}
                required
              />
            </div>
          </div>

          {/* Kata Sandi */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Kata Sandi</label>
            <div className="input-wrap" style={styles.inputWrapper}>
              <svg style={styles.inputIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimal 8 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...styles.input, paddingRight: "44px" }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                {showPassword ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {/* Password strength bar */}
            {password.length > 0 && (
              <div style={styles.strengthWrapper}>
                <div style={styles.strengthBars}>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        ...styles.strengthBar,
                        background: i <= strength ? strengthColor[strength] : "rgba(255,255,255,0.08)",
                        transition: "background 0.3s",
                      }}
                    />
                  ))}
                </div>
                <span style={{ ...styles.strengthLabel, color: strengthColor[strength] }}>
                  {strengthLabel[strength]}
                </span>
              </div>
            )}
          </div>

          {/* Terms note */}
          <p style={styles.terms}>
            Dengan mendaftar, Anda menyetujui{" "}
            <a href="#" style={styles.termsLink}>Syarat & Ketentuan</a>{" "}
            kami.
          </p>

          {/* Submit */}
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
                Memproses...
              </span>
            ) : (
              <span style={styles.btnRow}>
                Daftar Sekarang
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            )}
          </button>
        </form>

        <p style={styles.footer}>
          Sudah punya akun?{" "}
          <Link to="/login" style={styles.loginLink}>Masuk di sini</Link>
        </p>

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
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
  glowLeft: {
    position: "absolute",
    bottom: "-80px",
    left: "15%",
    width: "280px",
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
  headingBlock: { marginBottom: "20px" },
  heading: { fontSize: "19px", fontWeight: "700", color: "#fff", margin: "0 0 4px", letterSpacing: "-0.01em" },
  subheading: { fontSize: "13px", color: "rgba(255,255,255,0.38)", margin: 0 },
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
  eyeBtn: {
    position: "absolute",
    right: "11px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "rgba(255,255,255,0.28)",
    display: "flex",
    alignItems: "center",
    padding: "4px",
    borderRadius: "6px",
    transition: "color 0.15s",
  },
  strengthWrapper: { display: "flex", alignItems: "center", gap: "10px", marginTop: "2px" },
  strengthBars: { display: "flex", gap: "5px", flex: 1 },
  strengthBar: { flex: 1, height: "3px", borderRadius: "2px" },
  strengthLabel: { fontSize: "11.5px", fontWeight: "600", minWidth: "40px" },
  terms: { fontSize: "12px", color: "rgba(255,255,255,0.3)", margin: "0", lineHeight: "1.5" },
  termsLink: { color: "#f97316", textDecoration: "none", fontWeight: "500" },
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
    marginTop: "2px",
  },
  btnRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", letterSpacing: "0.02em" },
  footer: { fontSize: "13px", color: "rgba(255,255,255,0.33)", textAlign: "center", marginTop: "20px", marginBottom: 0 },
  loginLink: { color: "#f97316", fontWeight: "600", textDecoration: "none" },
};