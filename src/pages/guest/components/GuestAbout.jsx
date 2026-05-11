const keunggulan = [
  {
    icon: "⚡",
    title: "Pengiriman Cepat",
    desc: "Estimasi tiba 30 menit dengan driver terbaik kami",
  },
  {
    icon: "🍱",
    title: "Menu Beragam",
    desc: "200+ restoran dan ribuan pilihan menu setiap hari",
  },
  {
    icon: "💳",
    title: "Bayar Mudah",
    desc: "Dukung semua metode pembayaran digital & tunai",
  },
  {
    icon: "⭐",
    title: "Rating Terjamin",
    desc: "Hanya restoran dengan rating 4.5+ yang bergabung",
  },
];

export default function GuestAbout() {
  return (
    <section
      id="tentang"
      className="py-24 px-8 md:px-16"
      style={{ background: "#ffffff" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80"
              className="w-full h-96 object-cover rounded-3xl shadow-xl"
              alt="about"
            />
            <div
              className="absolute -bottom-6 -right-6 text-white p-6 rounded-2xl shadow-xl"
              style={{ background: "#4CAF50" }}
            >
              <p className="text-3xl font-black">5+</p>
              <p className="text-sm font-semibold">Tahun Melayani</p>
            </div>
          </div>

          <div>
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#4CAF50" }}
            >
              Tentang Kami
            </span>
            <h2
              className="text-4xl font-black mt-2 mb-6"
              style={{ color: "#1a1a2e" }}
            >
              Kenapa Pilih <span style={{ color: "#4CAF50" }}>Sedap?</span>
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: "#757575" }}>
              Sedap adalah aplikasi pesan antar makanan yang menghubungkan
              pelanggan dengan ratusan restoran terbaik di kota Anda. Kami
              percaya bahwa makanan enak harus bisa dinikmati kapan saja dan di
              mana saja tanpa kerumitan.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {keunggulan.map((k) => (
                <div
                  key={k.title}
                  className="p-4 rounded-xl border hover:border-green-300 transition-all"
                  style={{ background: "#f8f9fa", borderColor: "#e0e0e0" }}
                >
                  <span className="text-2xl">{k.icon}</span>
                  <p
                    className="text-sm font-bold mt-2"
                    style={{ color: "#1a1a2e" }}
                  >
                    {k.title}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#9e9e9e" }}>
                    {k.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
