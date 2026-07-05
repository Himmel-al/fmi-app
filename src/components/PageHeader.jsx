// src/components/PageHeader.jsx
export default function PageHeader({
  title = "Dashboard",
  breadcrumb = [],          // contoh: [{ label: "Dashboard", href: "/" }, { label: "Katalog Produk" }]
  buttonLabel = null,       // null = tombol tidak muncul
  onButtonClick = () => {},
  buttonStyle = "green",    // "green" | "orange"
}) {
  const btnColor =
    buttonStyle === "orange"
      ? { background: "linear-gradient(135deg,#f59e0b,#d97706)", boxShadow: "0 4px 14px rgba(245,158,11,0.25)" }
      : { background: "#10b981", boxShadow: "0 4px 14px rgba(16,185,129,0.2)" };

  return (
    <div
      className="flex items-center justify-between p-6 mb-2"
      id="pageheader-container"
    >
      {/* Kiri: Judul & Breadcrumb */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold" style={{ color: "#f1f5f9" }}>
          {title}
        </h1>

        {breadcrumb.length > 0 && (
          <div className="flex items-center gap-1.5 text-sm font-medium">
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <span style={{ color: "#374151" }}>/</span>
                )}
                <span
                  style={{
                    color: i < breadcrumb.length - 1 ? "#f59e0b" : "#6b7280",
                    cursor: crumb.href ? "pointer" : "default",
                  }}
                >
                  {crumb.label}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Kanan: Tombol (opsional) */}
      {buttonLabel && (
        <button
          onClick={onButtonClick}
          className="text-white px-5 py-2.5 rounded-xl font-semibold transition-opacity hover:opacity-90"
          style={{ border: "none", cursor: "pointer", ...btnColor }}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
}