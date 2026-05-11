export default function GuestHero() {
  return (
    <section id="beranda" className="relative min-h-[90vh] flex items-center px-8 md:px-16 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #fef9f0 100%)" }}>

      <div className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{ background: "#4CAF50" }} />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-10 pointer-events-none"
        style={{ background: "#FF9800" }} />

      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center w-full max-w-6xl mx-auto">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full"
            style={{ background: "#e8f5e9", color: "#2e7d32" }}>
            🔥 #1 Aplikasi Pesan Makanan
          </span>
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6"
            style={{ color: "#1a1a2e" }}>
            Makanan Enak,{" "}
            <span style={{ color: "#4CAF50" }}>Diantar </span>
            Cepat!
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "#757575" }}>
            Sedap menghadirkan ratusan pilihan makanan lezat dari restoran terbaik langsung ke pintu rumah Anda. Pesan sekarang, nikmati dalam 30 menit!
          </p>
          <div className="flex items-center gap-4">
            <a href="#produk"
              className="font-bold px-8 py-3.5 rounded-xl text-white transition-all hover:-translate-y-0.5"
              style={{ background: "#4CAF50", boxShadow: "0 4px 15px rgba(76,175,80,0.3)" }}>
              Pesan Sekarang
            </a>
            <a href="#tentang"
              className="font-medium px-8 py-3.5 rounded-xl border transition-all"
              style={{ color: "#616161", borderColor: "#e0e0e0" }}>
              Pelajari Lebih
            </a>
          </div>

          <div className="flex gap-8 mt-12">
            {[["200+", "Restoran"], ["50K+", "Pelanggan"], ["30 Mnt", "Estimasi"]].map(([val, label]) => (
              <div key={label}>
                <p className="text-2xl font-black" style={{ color: "#4CAF50" }}>{val}</p>
                <p className="text-xs" style={{ color: "#9e9e9e" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <img src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&q=80"
              className="w-full h-52 object-cover rounded-2xl shadow-lg" alt="nasi goreng" />
            <img src="https://images.unsplash.com/photo-1547592180-85f173990554?w=300&q=80"
              className="w-full h-32 object-cover rounded-2xl shadow-lg" alt="soto" />
          </div>
          <div className="space-y-4 mt-8">
            <img src="https://images.unsplash.com/photo-1598103442097-8b74394b95c2?w=300&q=80"
              className="w-full h-32 object-cover rounded-2xl shadow-lg" alt="ayam" />
            <img src="https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=300&q=80"
              className="w-full h-52 object-cover rounded-2xl shadow-lg" alt="mie" />
          </div>
        </div>
      </div>
    </section>
  );
}