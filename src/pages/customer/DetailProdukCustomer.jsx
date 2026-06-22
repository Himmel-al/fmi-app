export default function DetailProduk() {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <img
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
        className="rounded-xl shadow"
      />

      <div>
        <h1 className="text-4xl font-bold">
          Sofa Minimalis
        </h1>

        <p className="text-2xl text-primary my-4">
          Rp 2.500.000
        </p>

        <p>
          Sofa modern dengan desain minimalis dan
          bahan premium yang nyaman digunakan.
        </p>

        <div className="mt-6 flex gap-3">
          <button className="btn btn-primary">
            Tambah ke Keranjang
          </button>

          <button className="btn btn-outline">
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}