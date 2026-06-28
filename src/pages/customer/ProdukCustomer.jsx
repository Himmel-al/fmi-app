export default function ProdukCustomer() {
  const products = [
    {
      id: 1,
      nama: "Sofa Minimalis",
      harga: "Rp 2.500.000",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
    },
    {
      id: 2,
      nama: "Meja Kerja",
      harga: "Rp 850.000",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    }
  ];

  return (
    <div>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">
          Produk Furniture
        </h1>

        <input
          type="text"
          placeholder="Cari produk..."
          className="input input-bordered"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((item) => (
          <div key={item.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={item.image} alt={item.nama} />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                {item.nama}
              </h2>

              <p>{item.harga}</p>

              <div className="card-actions justify-end">
                <button className="btn btn-outline">
                  Detail
                </button>

                <button className="btn btn-primary">
                  Keranjang
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}