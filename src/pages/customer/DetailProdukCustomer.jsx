import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MASTER_PRODUCTS } from "../../data/products";

export default function DetailProduk() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const product = MASTER_PRODUCTS.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-error">Produk Tidak Ditemukan</h2>
        <button onClick={() => navigate("/customer/produk")} className="btn btn-primary mt-4">Kembali ke Produk</button>
      </div>
    );
  }

  const addToCart = (goToCheckout = false) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = currentCart.find((item) => item.id === product.id);
    if (exist) {
      exist.qty += qty;
    } else {
      currentCart.push({ ...product, qty: qty });
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));

    if (goToCheckout) {
      navigate("/customer/checkout");
    } else {
      alert(`${qty} ${product.nama} berhasil ditambahkan ke keranjang!`);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-10 bg-base-100 border border-base-200 p-6 rounded-2xl shadow-sm">
      <div className="overflow-hidden rounded-xl bg-base-200 aspect-square max-h-[500px]">
        <img src={product.image} alt={product.nama} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col justify-between py-2">
        <div>
          <span className="badge badge-primary font-semibold mb-2">{product.kategori}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{product.nama}</h1>
          <p className="text-3xl font-bold text-primary mb-6">Rp {product.harga.toLocaleString("id-ID")}</p>
          
          <div className="divider">Deskripsi Produk</div>
          <p className="text-base-content/80 leading-relaxed mb-6">{product.deskripsi}</p>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-semibold text-sm">Jumlah :</span>
            <div className="join border border-base-300">
              <button disabled={qty <= 1} onClick={() => setQty(qty - 1)} className="btn btn-sm join-item">-</button>
              <span className="px-4 py-1 bg-base-100 flex items-center justify-center font-bold text-sm min-w-[3rem]">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="btn btn-sm join-item">+</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => addToCart(false)} className="btn btn-primary flex-1">Tambah ke Keranjang</button>
            <button onClick={() => addToCart(true)} className="btn btn-outline flex-1">Beli Sekarang</button>
          </div>
        </div>
      </div>
    </div>
  );
}