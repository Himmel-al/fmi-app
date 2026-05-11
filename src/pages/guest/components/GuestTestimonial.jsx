import { testimonials } from "../data/guestData";

export default function GuestTestimonial() {
  return (
    <section id="testimoni" className="py-24 px-8 md:px-16" style={{ background: "#ffffff" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#4CAF50" }}>
            Ulasan Pengguna
          </span>
          <h2 className="text-4xl font-black mt-2" style={{ color: "#1a1a2e" }}>Apa Kata Mereka?</h2>
          <p className="mt-3" style={{ color: "#757575" }}>
            Ribuan pelanggan puas sudah memesan lewat Sedap
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id}
              className="p-6 rounded-2xl border hover:shadow-lg transition-all"
              style={{ background: "#f8f9fa", borderColor: "#e0e0e0" }}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-sm" style={{ color: "#FF9800" }}>★</span>
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#616161" }}>
                "{t.review}"
              </p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border-2"
                  style={{ borderColor: "#4CAF50" }}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${t.name}&background=4CAF50&color=fff`;
                  }} />
                <div>
                  <p className="text-sm font-bold" style={{ color: "#1a1a2e" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "#9e9e9e" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}