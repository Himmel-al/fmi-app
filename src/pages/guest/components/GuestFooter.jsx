import { partners } from "../data/guestData";

export default function GuestFooter() {
  return (
    <footer className="py-16 px-8 md:px-16 border-t" style={{ background: "#1a1a2e", borderColor: "#2d2d44" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ background: "#4CAF50" }}>🍽️</div>
              <span className="text-xl font-black text-white">
                Sedap<span style={{ color: "#4CAF50" }}>.</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "#9e9e9e" }}>
              Aplikasi pesan antar makanan terpercaya. Makanan enak, pengiriman cepat, harga terjangkau.
            </p>
            <div className="flex gap-3">
              {["IG", "FB", "TW", "TT"].map((s) => (
                <a key={s} href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-lg border text-xs font-bold transition-all hover:text-green-400"
                  style={{ borderColor: "#2d2d44", color: "#616161" }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4">Kontak</h4>
            <div className="space-y-3 text-sm" style={{ color: "#9e9e9e" }}>
              <p>📍 Jl. Kuliner No. 1, Jakarta</p>
              <p>📞 (021) 8888-9999</p>
              <p>✉️ hello@sedap.id</p>
              <p>🕐 Buka 24 Jam</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4">Navigasi</h4>
            <div className="space-y-2 text-sm" style={{ color: "#9e9e9e" }}>
              {["Beranda", "Tentang Kami", "Menu", "Testimoni", "Masuk", "Daftar"].map((m) => (
                <p key={m}>
                  <a href="#" className="hover:text-green-400 transition-colors">{m}</a>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-8 mb-8" style={{ borderColor: "#2d2d44" }}>
          <p className="text-xs text-center mb-5 uppercase tracking-widest" style={{ color: "#616161" }}>
            Metode Pembayaran (Partner)
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((p) => (
              <span key={p}
                className="text-sm font-bold px-5 py-2 rounded-lg border transition-colors hover:text-green-400"
                style={{ borderColor: "#2d2d44", color: "#9e9e9e" }}>
                {p}
              </span>
            ))}
          </div>
        </div>

        <p className="text-center text-xs" style={{ color: "#616161" }}>
          © 2026 Sedap. Hak Cipta Dilindungi.
        </p>
      </div>
    </footer>
  );
}