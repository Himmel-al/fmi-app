import { useNavigate } from "react-router-dom";
import { ShoppingCart, Eye, Sparkles } from "lucide-react";

export default function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  // Guard clause jika data product belum di-passing atau kosong (Premium Skeleton Loading)
  if (!product) {
    return (
      <div className="card bg-[#1a1610]/40 rounded-2xl border border-[#c9a84c]/10 animate-pulse overflow-hidden">
        <div className="aspect-video bg-[#0d0b08] w-full"></div>
        <div className="card-body p-6 gap-3">
          <div className="h-5 bg-[#0d0b08] rounded w-3/4"></div>
          <div className="h-6 bg-[#0d0b08] rounded w-1/2"></div>
          <div className="h-10 bg-[#0d0b08] rounded w-full mt-2"></div>
        </div>
      </div>
    );
  }

  // Mengambil nama kategori dari relasi database Laravel
  const categoryName = product.category ? product.category.category_name : null;
  
  // Mengantisipasi jika kolom ID di database bernama id_product atau id murni
  const productId = product.id_product || product.id || 1;

  return (
    <div className="card bg-[#1a1610]/80 border border-[#c9a84c]/10 hover:border-[#c9a84c]/40 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(199,168,76,0.15)] hover:-translate-y-1 transition-all duration-500 text-white group">
      
      {/* AREA IMAGE DENGAN EMAS BADGE */}
      <figure className="relative overflow-hidden aspect-video bg-[#0d0b08]">
        <img
          src={product.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc"}
          alt={product.product_name || "Produk Furniture"}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
        />
        
        {/* Lapisan overlay gelap premium */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08]/50 to-transparent opacity-60" />

        {categoryName && (
          <span className="absolute top-3 right-3 bg-[#0d0b08]/80 text-[#c9a84c] border border-[#c9a84c]/30 px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold rounded-md backdrop-blur-md shadow-lg flex items-center gap-1">
            <Sparkles size={8} className="animate-pulse" />
            {categoryName}
          </span>
        )}
      </figure>

      {/* KONTEN KARTU */}
      <div className="card-body p-5 md:p-6 space-y-2">
        <div>
          {/* Nama Produk */}
          <h2 className="text-lg font-bold font-serif line-clamp-1 group-hover:text-[#e8c97a] transition-colors tracking-wide text-white/95">
            {product.product_name || "Nama Produk Tidak Tersedia"}
          </h2>
        </div>
        
        {/* Harga Elegan */}
        <p className="text-[#c9a84c] text-xl font-bold font-mono tracking-tight">
          Rp {Number(product.price || 0).toLocaleString("id-ID")}
        </p>

        {/* TOMBOL AKSI */}
        <div className="card-actions justify-end pt-2 gap-2.5">
          {/* Tombol Detail */}
          <button 
            className="btn btn-sm bg-[#0d0b08] hover:bg-[#2a2218] text-white/80 hover:text-white border border-[#c9a84c]/20 hover:border-[#c9a84c]/50 flex-1 font-medium rounded-xl transition-all duration-300 gap-1.5 uppercase text-[11px] tracking-wider"
            onClick={() => navigate(`/customer/produk/${productId}`)}
          >
            <Eye size={13} className="text-[#c9a84c]" />
            Detail
          </button>

          {/* Tombol Tambah Keranjang */}
          <button 
            className="btn btn-sm bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] hover:from-[#e8c97a] hover:to-[#c9a84c] text-[#0d0b08] border-none font-bold rounded-xl shadow-md transition-all duration-300 px-3.5"
            onClick={() => onAddToCart && onAddToCart(product)}
            aria-label="Tambah ke keranjang"
          >
            <ShoppingCart size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}