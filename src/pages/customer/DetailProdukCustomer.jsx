import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingBag, ArrowLeft, Plus, Minus, Sparkles, CreditCard } from "lucide-react";
import { MASTER_PRODUCTS } from "../../data/products";

export default function DetailProduk() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  // Cari produk berdasarkan id murni ataupun id_product yang dikirim dari database/MASTER_PRODUCTS
  const product = MASTER_PRODUCTS.find((p) => {
    const pId = p.id_product || p.id;
    return String(pId) === String(id);
  });

  // Gulir ke atas otomatis saat halaman detail dimuat
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-20 min-h-[60vh] flex flex-col items-center justify-center bg-[#0d0b08] text-white rounded-2xl border border-[#c9a84c]/10">
        <h2 className="text-2xl font-bold font-serif text-[#c9a84c] mb-2">Koleksi Eksklusif Tidak Ditemukan</h2>
        <p className="text-sm text-white/40 mb-6 max-w-md">Item yang Anda cari mungkin telah diamankan oleh pelanggan lain atau berada di katalog rahasia kami.</p>
        <button 
          onClick={() => navigate("/customer/produk")} 
          className="btn bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] text-[#0d0b08] hover:from-[#e8c97a] hover:to-[#c9a84c] border-none px-6 font-bold rounded-xl transition-all"
        >
          Kembali ke Galeri Produk
        </button>
      </div>
    );
  }

  // Sinkronisasi penamaan properti database (Laravel Fallback)
  const productId = product.id_product || product.id;
  const productName = product.product_name || product.nama || "Premium Furniture Item";
  const productPrice = Number(product.price || product.harga || 0);
  const categoryName = product.category?.category_name || product.kategori || "Exclusive Collection";
  const productDesc = product.description || product.deskripsi || "Tidak ada deskripsi tambahan untuk mahakarya ini.";

  const addToCart = (goToCheckout = false) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Cari kecocokan ID item di keranjang belanja
    const exist = currentCart.find((item) => (item.id_product || item.id) === productId);
    
    if (exist) {
      exist.qty = (exist.qty || exist.kuantitas || 0) + qty;
    } else {
      currentCart.push({ 
        ...product, 
        id_product: productId, // jaminan struktur data konsisten
        product_name: productName,
        price: productPrice,
        qty: qty 
      });
    }
    
    localStorage.setItem("cart", JSON.stringify(currentCart));
    
    // Memicu sinkronisasi angka di keranjang navbar secara realtime
    window.dispatchEvent(new Event("storage"));

    if (goToCheckout) {
      navigate("/customer/checkout");
    } else {
      alert(`Sukses! ${qty} unit "${productName}" telah dialokasikan ke keranjang belanja Anda.`);
    }
  };

  return (
    <div className="space-y-6 text-white max-w-6xl mx-auto">
      
      {/* TOMBOL KEMBALI */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-xs tracking-widest text-white/60 hover:text-[#c9a84c] transition-colors uppercase font-medium bg-[#1a1610] px-4 py-2 rounded-xl border border-[#c9a84c]/10"
      >
        <ArrowLeft size={14} /> Kembali
      </button>

      {/* CONTAINER DETAIL UTAMA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-[#1a1610] border border-[#c9a84c]/10 p-6 md:p-8 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] items-start">
        
        {/* PANEL KIRI: PRESTIGIOUS IMAGE VIEWER */}
        <div className="overflow-hidden rounded-2xl bg-[#0d0b08] border border-[#c9a84c]/10 aspect-square max-h-[520px] shadow-inner relative group">
          <img 
            src={product.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc"} 
            alt={productName} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08]/30 to-transparent pointer-events-none" />
        </div>

        {/* PANEL KANAN: SPESIFIKASI & INFORMASI PRODUK */}
        <div className="flex flex-col justify-between h-full py-1 space-y-6">
          <div className="space-y-4">
            {/* Tag Kategori Eksklusif */}
            <div className="inline-flex items-center gap-1.5 bg-[#0d0b08] text-[#c9a84c] border border-[#c9a84c]/30 px-3 py-1 text-[10px] uppercase tracking-widest font-extrabold rounded-md shadow-sm">
              <Sparkles size={10} className="animate-pulse" />
              {categoryName}
            </div>
            
            {/* Nama Mahakarya */}
            <h1 className="text-3xl md:text-4xl font-bold font-serif tracking-wide text-white leading-tight">
              {productName}
            </h1>
            
            {/* Tag Harga Elegan */}
            <p className="text-2xl md:text-3xl font-bold text-[#c9a84c] font-mono tracking-tight pt-1">
              Rp {productPrice.toLocaleString("id-ID")}
            </p>
            
            {/* Pembatas Minimalis */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-[#c9a84c]/10"></div>
              <span className="flex-shrink mx-4 text-[10px] uppercase tracking-widest text-white/30 font-medium">Deskripsi Properti</span>
              <div className="flex-grow border-t border-[#c9a84c]/10"></div>
            </div>
            
            {/* Deskripsi Panjang */}
            <p className="text-white/70 text-sm leading-relaxed font-sans font-light antialiased">
              {productDesc}
            </p>
          </div>

          {/* KONTROL JUMLAH & TOMBOL EKSEKUSI BELANJA */}
          <div className="space-y-6 pt-4 border-t border-[#c9a84c]/10">
            {/* Selektor Kuantitas */}
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-wider text-white/50 font-medium">Alokasi Jumlah :</span>
              <div className="flex items-center bg-[#0d0b08] border border-[#c9a84c]/20 rounded-xl overflow-hidden p-0.5">
                <button 
                  disabled={qty <= 1} 
                  onClick={() => setQty(qty - 1)} 
                  className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-[#c9a84c] disabled:opacity-20 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="px-3 font-mono font-bold text-sm text-center min-w-[2.5rem] text-[#c9a84c]">
                  {qty}
                </span>
                <button 
                  onClick={() => setQty(qty + 1)} 
                  className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-[#c9a84c] transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Kelompok Tombol CTA */}
            <div className="flex flex-col sm:flex-row gap-3.5">
              {/* Tambah Ke Keranjang */}
              <button 
                onClick={() => addToCart(false)} 
                className="btn bg-[#0d0b08] hover:bg-[#2a2218] text-white border border-[#c9a84c]/30 hover:border-[#c9a84c] flex-1 font-bold rounded-xl h-12 transition-all duration-300 flex items-center justify-center gap-2 uppercase text-xs tracking-wider"
              >
                <ShoppingBag size={15} className="text-[#c9a84c]" />
                Masukkan Keranjang
              </button>
              
              {/* Beli Langsung */}
              <button 
                onClick={() => addToCart(true)} 
                className="btn bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] hover:from-[#e8c97a] hover:to-[#c9a84c] text-[#0d0b08] border-none flex-1 font-extrabold rounded-xl h-12 transition-all duration-300 flex items-center justify-center gap-2 uppercase text-xs tracking-wider shadow-lg shadow-[#c9a84c]/10"
              >
                <CreditCard size={15} />
                Akuisisi Sekarang
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}