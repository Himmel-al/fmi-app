import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authService";

// styles tetap berada di luar komponen
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
    background:
      "radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  glowBottom: {
    position: "absolute",
    bottom: "-100px",
    right: "20%",
    width: "300px",
    height: "200px",
    background:
      "radial-gradient(ellipse, rgba(249,115,22,0.06) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    width: "100%",
    maxWidth: "420px",
    background:
      "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
    padding: "36px 40px 32px",
    backdropFilter: "blur(12px)",
    boxShadow:
      "0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
    overflow: "hidden",
  },
  accentLine: {
    position: "absolute",
    top: 0,
    left: "40px",
    right: "40px",
    height: "2px",
    background: "linear-gradient(90deg, transparent, #f97316, transparent)",
    borderRadius: "0 0 2px 2px",
  },
  logoBlock: {
    marginBottom: "24px",
  },
  logoRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "1px",
    marginBottom: "4px",
  },
  logoText: {
    fontSize: "32px",
    fontWeight: "800",
    letterSpacing: "0.12em",
    color: "#ffffff",
    lineHeight: 1,
  },
  logoDot: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#f97316",
    lineHeight: "0.6",
  },
  logoSub: {
    fontSize: "10px",
    letterSpacing: "0.22em",
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    fontWeight: "500",
    margin: 0,
  },
  divider: {
    height: "1px",
    background:
      "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
    marginBottom: "24px",
  },
  headingBlock: {
    marginBottom: "20px",
  },
  heading: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 4px",
    letterSpacing: "-0.01em",
  },
  subheading: {
    fontSize: "13.5px",
    color: "rgba(255,255,255,0.4)",
    margin: 0,
  },
  errorBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    background: "rgba(239,68,68,0.08)",
    border: "1px solid rgba(239,68,68,0.25)",
    color: "#f87171",
    fontSize: "13px",
    borderRadius: "10px",
    padding: "10px 14px",
    marginBottom: "16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },
  label: {
    fontSize: "12.5px",
    fontWeight: "600",
    color: "rgba(255,255,255,0.5)",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  inputIcon: {
    position: "absolute",
    left: "13px",
    color: "rgba(255,255,255,0.25)",
    pointerEvents: "none",
    flexShrink: 0,
  },
  input: {
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    padding: "12px 14px 12px 38px",
    color: "rgba(255,255,255,0.85)",
    fontSize: "14px",
    borderRadius: "10px",
    fontFamily: "inherit",
  },
  eyeBtn: {
    position: "absolute",
    right: "12px",
    background: "none",
    border: "none",
    padding: "4px",
    cursor: "pointer",
    color: "rgba(255,255,255,0.3)",
    display: "flex",
    alignItems: "center",
    borderRadius: "6px",
    transition: "color 0.15s",
  },
  forgotLink: {
    fontSize: "12px",
    color: "#f97316",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.15s",
  },
  submitBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    border: "none",
    borderRadius: "10px",
    padding: "13px",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "14.5px",
    letterSpacing: "0.02em",
    fontFamily: "inherit",
    transition: "all 0.2s",
    boxShadow: "0 4px 20px rgba(249,115,22,0.3)",
    marginTop: "4px",
  },
  loadingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  footer: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.35)",
    textAlign: "center",
    marginTop: "20px",
    marginBottom: 0,
  },
  registerLink: {
    color: "#f97316",
    fontWeight: "600",
    textDecoration: "none",
  },
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // PERBAIKAN: Mengirim email dan password sebagai dua argumen terpisah sesuai authService.js
      const data = await loginUser(email, password);
      
      // PERBAIKAN: authService langsung me-return response.data, jadi bisa diakses langsung
      const token = data.token;
      const role = data.user?.role; 

      if (!token || !role) {
        throw new Error("Respons login dari server tidak lengkap.");
      }

      // Menyimpan kredensial ke LocalStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", role);
      localStorage.setItem("token", token);

      // Mengarahkan rute berdasarkan role user dari database
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/customer");
      }
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
        error.message ||
        "Login gagal, periksa koneksi atau kredensial Anda."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.glowTop} />
      <div style={styles.glowBottom} />

      <div style={styles.card}>
        <div style={styles.accentLine} />

        <div style={styles.logoBlock}>
          <div style={styles.logoRow}>
            <span style={styles.logoText}>SIPP</span>
            <span style={styles.logoDot}>.</span>
          </div>
          <p style={styles.logoSub}>Furniture Management</p>
        </div>

        <div style={styles.divider} />

        <div style={styles.headingBlock}>
          <h2 style={styles.heading}>Selamat Datang Kembali</h2>
          <p style={styles.subheading}>Masuk ke akun Anda untuk melanjutkan.</p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ flexShrink: 0, marginTop: 1 }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email</label>
            <div style={styles.inputWrapper}>
              <svg
                style={styles.inputIcon}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                type="email"
                placeholder="admin@sippfurniture.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                onFocus={(e) => {
                  e.target.parentNode.style.borderColor = "#f97316";
                  e.target.parentNode.style.boxShadow =
                    "0 0 0 3px rgba(249,115,22,0.12)";
                }}
                onBlur={(e) => {
                  e.target.parentNode.style.borderColor =
                    "rgba(255,255,255,0.08)";
                  e.target.parentNode.style.boxShadow = "none";
                }}
                required
              />
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <div style={styles.labelRow}>
              <label style={styles.label}>Kata Sandi</label>
              <Link to="/forgot-password" style={styles.forgotLink}>
                Lupa sandi?
              </Link>
            </div>
            <div style={styles.inputWrapper}>
              <svg
                style={styles.inputIcon}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...styles.input, paddingRight: "44px" }}
                onFocus={(e) => {
                  e.target.parentNode.style.borderColor = "#f97316";
                  e.target.parentNode.style.boxShadow =
                    "0 0 0 3px rgba(249,115,22,0.12)";
                }}
                onBlur={(e) => {
                  e.target.parentNode.style.borderColor =
                    "rgba(255,255,255,0.08)";
                  e.target.parentNode.style.boxShadow = "none";
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                {showPassword ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.background =
                  "linear-gradient(135deg, #fb923c 0%, #ea580c 100%)";
                e.target.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, #f97316 0%, #ea580c 100%)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            {loading ? (
              <span style={styles.loadingRow}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ animation: "spin 0.8s linear infinite" }}
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Memuat...
              </span>
            ) : (
              <span style={styles.loadingRow}>
                Masuk
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            )}
          </button>
        </form>

        <p style={styles.footer}>
          Belum punya akun?{" "}
          <Link to="/register" style={styles.registerLink}>
            Daftar di sini
          </Link>
        </p>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}