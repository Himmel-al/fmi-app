import ProductCard from "../../components/ProductCard";

export default function DashboardCustomer() {
  return (
    <div className="space-y-12">
      {/* HERO */}
      <div className="hero min-h-[450px] rounded-3xl bg-base-200">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-6xl font-bold">
              Furniture Modern
            </h1>

            <p className="py-6 max-w-xl">
              Temukan berbagai furniture berkualitas
              untuk ruang tamu, kamar tidur,
              dapur, dan kantor.
            </p>

            <button className="btn btn-primary btn-lg">
              Belanja Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* KATEGORI */}
      <section>
        <h2 className="text-3xl font-bold mb-6">
          Kategori
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="card bg-base-100 shadow">
            <div className="card-body text-center">
              🛋️
              <h3 className="font-semibold">
                Sofa
              </h3>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body text-center">
              🪑
              <h3 className="font-semibold">
                Kursi
              </h3>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body text-center">
              🛏️
              <h3 className="font-semibold">
                Tempat Tidur
              </h3>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body text-center">
              🧑‍💻
              <h3 className="font-semibold">
                Meja Kerja
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUK */}
      <section>
        <div className="flex justify-between mb-5">
          <h2 className="text-3xl font-bold">
            Produk Terlaris
          </h2>

          <button className="btn btn-outline">
            Lihat Semua
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </section>

      {/* PROMO */}
      <div className="alert alert-success">
        🎉 Diskon hingga 30% untuk pembelian
        furniture ruang tamu minggu ini.
      </div>
    </div>
  );
}