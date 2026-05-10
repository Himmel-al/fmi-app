function LoadingScreen() {
  return (
    <div
      style={{
        background: "#0d0f14",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Spinner */}
      <div
        style={{
          width: "36px",
          height: "36px",
          border: "3px solid #ffffff15",
          borderTop: "3px solid #f59e0b",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p style={{ color: "#64748b", fontSize: "13px" }}>Memuat halaman...</p>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}