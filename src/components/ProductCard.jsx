import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  // Guard clause jika data product belum di-passing atau kosong
  if (!product) {
    return (
      <div className="card bg-base-100 shadow-xl animate-pulse border border-base-200">
        <div className="h-60 bg-base-300 w-full rounded-t-2xl"></div>
        <div className="card-body gap-3">
          <div className="h-6 bg-base-300 rounded w-3/4"></div>
          <div className="h-5 bg-base-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
      <figure className="relative overflow-hidden aspect-video">
        <img
          src={product.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc"}
          alt={product.nama || "Produk Furniture"}
          className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.kategori && (
          <span className="absolute top-3 right-3 badge badge-secondary font-medium shadow-sm">
            {product.kategori}
          </span>
        )}
      </figure>

      <div className="card-body p-6">
        <h2 className="card-title text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
          {product.nama || "Sofa Minimalis"}
        </h2>
        
        <p className="text-primary text-2xl font-extrabold my-1">
          Rp {(product.harga || 2500000).toLocaleString("id-ID")}
        </p>

        <div className="card-actions justify-end mt-4 gap-2">
          {/* Mengarahkan ke DetailProdukCustomer berdasarkan id */}
          <button 
            className="btn btn-outline btn-sm md:btn-md flex-1"
            onClick={() => navigate(`/customer/produk/${product.id || 1}`)}
          >
            Detail
          </button>

          {/* Menjalankan fungsi push data ke localStorage lewat handler utama */}
          <button 
            className="btn btn-primary btn-sm md:btn-md"
            onClick={() => onAddToCart && onAddToCart(product)}
            aria-label="Tambah ke keranjang"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}