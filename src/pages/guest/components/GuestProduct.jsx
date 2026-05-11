import { products, formatRupiah } from "../data/guestData";

export default function GuestProduct() {
  return (
    <section id="produk" className="py-24 px-8 md:px-16" style={{ background: "#f8f9fa" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#4CAF50" }}>
            Menu Pilihan
          </span>
          <h2 className="text-4xl font-black mt-2" style={{ color: "#1a1a2e" }}>Menu Unggulan</h2>
          <p className="mt-3 max-w-xl mx-auto" style={{ color: "#757575" }}>
            Pilihan menu terlaris yang paling banyak dipesan pelanggan kami
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id}
              className="rounded-2xl overflow-hidden border hover:shadow-xl transition-all group hover:-translate-y-1"
              style={{ background: "#ffffff", borderColor: "#e0e0e0" }}>
              <div className="relative overflow-hidden h-52">
                <img src={p.image} alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 text-white text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "#4CAF50" }}>
                  {p.category}
                </span>
                <span className="absolute top-3 right-3 bg-white text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ color: "#FF9800" }}>
                  ★ {p.rating}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold" style={{ color: "#1a1a2e" }}>{p.name}</h3>
                <p className="font-black text-lg mt-1" style={{ color: "#4CAF50" }}>
                  {formatRupiah(p.price)}
                </p>
                <button className="w-full mt-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "#4CAF50" }}>
                  + Pesan Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}