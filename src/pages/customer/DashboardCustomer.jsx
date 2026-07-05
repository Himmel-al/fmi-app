import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import axios from "../../api/axios"; // Pastikan path axios.js kamu sudah benar
import { 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Truck, 
  Zap 
} from "lucide-react";

export default function DashboardCustomer() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // 1. Mengambil data produk terlaris/unggulan langsung dari API Laravel
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products");
        // Jika data dari Laravel dibungkus dlm objek 'data' atau 'products', sesuaikan penangkapannya
        const data = response.data.products || response.data;
        setProducts(data);
      } catch (error) {
        console.error("Gagal memuat produk unggulan:", error);
      }
    };
    fetchProducts();
  }, []);

  // 2. Menyesuaikan handleAddToCart dengan struktur id_product & product_name
  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productId = product.id_product || product.id;
    const productName = product.product_name || product.nama || "Produk";

    const exist = currentCart.find((item) => (item.id_product || item.id) === productId);
    
    if (exist) {
      exist.qty += 1;
    } else {
      currentCart.push({ ...product, qty: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(currentCart));
    
    // Memicu sinkronisasi angka di keranjang navbar secara realtime
    window.dispatchEvent(new Event("storage"));
    
    alert(`${productName} berhasil masuk keranjang!`);
  };

  return (
    <div className="space-y-16 pb-12 text-[#faf7f0] relative">
      {/* ── AMBIENT GLOW EFFECTS (FUTURISTIC ORB) ── */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c9a84c]/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-[#c9a84c]/3 rounded-full filter blur-[80px] pointer-events-none" />

      {/* ── LUXURY HERO BANNER SECTION ── */}
      <div 
        className="hero min-h-[500px] rounded-[32px] overflow-hidden shadow-[0_24px_60px_-15px_rgba(13,11,8,0.7)] border border-[#c9a84c]/20 relative group"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80')` }}
      >
        <div className="hero-overlay bg-gradient-to-r from-[#0d0b08]/95 via-[#0d0b08]/80 to-transparent"></div>
        
        {/* Decorative Lines Overlay mimicking theme */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="hero-content justify-start text-left px-8 md:px-16 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/10 text-[#e8c97a] text-xs font-bold tracking-widest uppercase mb-6 animate-pulse">
              <Sparkles size={12} className="text-[#c9a84c]" /> Eksklusif Katalog Premium
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black font-serif tracking-tight text-white mb-6 leading-[1.15]">
              Kemewahan <span className="text-[#c9a84c] italic relative inline-block">Furniture<span className="absolute bottom-1 left-0 w-full h-[4px] bg-gradient-to-r from-[#c9a84c] to-transparent rounded-full" /></span> Sejati Untuk Rumah Anda
            </h1>
            
            <p className="mb-8 text-base md:text-lg text-white/60 font-light leading-relaxed max-w-lg">
              Kurasi perabotan berkualitas ekspor terbaik dari bahan kayu pilihan. Desain fungsional berkelas untuk kenyamanan hunian modern kelas atas.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate("/customer/produk")} 
                className="px-8 py-4 text-sm font-bold bg-[#c9a84c] text-[#0d0b08] rounded-xl hover:bg-[#e8c97a] transition-all duration-300 transform hover:-translate-y-1 shadow-[0_8px_25px_rgba(201,168,76,0.25)] flex items-center gap-2 group/btn"
              >
                Mulai Belanja 
                <ArrowRight size={16} className="transform transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── DYNAMIC VALUE PROPOSITION MARQUEE BAR ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#1a1610] p-6 rounded-2xl border border-[#c9a84c]/10">
        <div className="flex items-center gap-4 px-4">
          <div className="p-3 rounded-xl bg-[#c9a84c]/10 text-[#c9a84c]"><ShieldCheck size={24} /></div>
          <div>
            <h4 className="font-bold text-sm text-white">Garansi Kayu Pilihan Resmi</h4>
            <p className="text-xs text-white/40">100% Kualitas Kayu Jati & Mahoni Terbaik</p>
          </div>
        </div>
        <div className="flex items-center gap-4 px-4 border-y md:border-y-0 md:border-x border-[#c9a84c]/10 py-4 md:py-0">
          <div className="p-3 rounded-xl bg-[#c9a84c]/10 text-[#c9a84c]"><Truck size={24} /></div>
          <div>
            <h4 className="font-bold text-sm text-white">Pengiriman Profesional</h4>
            <p className="text-xs text-white/40">Proteksi ekstra aman hingga ke dalam rumah</p>
          </div>
        </div>
        <div className="flex items-center gap-4 px-4">
          <div className="p-3 rounded-xl bg-[#c9a84c]/10 text-[#c9a84c]"><Zap size={24} /></div>
          <div>
            <h4 className="font-bold text-sm text-white">Proses Instan & Transparan</h4>
            <p className="text-xs text-white/40">Invoice digital & pembaruan stok real-time</p>
          </div>
        </div>
      </div>

      {/* ── SELEKSI KATEGORI PREMIUM ── */}
      <section className="relative">
        <div className="flex flex-col mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c9a84c] mb-1">Kurasi Ruang</span>
          <h2 className="text-3xl font-black font-serif text-white tracking-tight">Belanja Berdasarkan Kategori</h2>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { tag: "Sofa", emoji: "🛋️", desc: "Kenyamanan berkelas" },
            { tag: "Kursi", emoji: "🪑", desc: "Sandaran ergonomis" },
            { tag: "Tempat Tidur", emoji: "🛏️", desc: "Tidur lebih lelap" },
            { tag: "Meja Kerja", emoji: "🧑‍💻", desc: "Produktivitas maksimal" }
          ].map((cat, idx) => (
            <div 
              key={idx} 
              onClick={() => navigate(`/customer/produk?category=${cat.tag}`)}
              className="group card bg-[#1a1610] border border-[#c9a84c]/10 p-6 rounded-2xl shadow-md transition-all duration-300 hover:border-[#c9a84c]/40 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between min-h-[160px]"
            >
              <div className="flex justify-between items-start">
                <span className="text-4xl filter drop-shadow-md bg-[#2a2218] p-3 rounded-xl transform transition-transform group-hover:scale-110 duration-300">{cat.emoji}</span>
                <div className="text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={18} />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-serif font-bold text-lg text-white group-hover:text-[#c9a84c] transition-colors">{cat.tag}</h3>
                <p className="text-xs text-white/40 mt-0.5">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUK UNGGULAN TERLARIS ── */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c9a84c] mb-1">Koleksi Teratas</span>
            <h2 className="text-3xl font-black font-serif text-white tracking-tight">Produk Unggulan Terlaris</h2>
          </div>
          <button 
            onClick={() => navigate("/customer/produk")} 
            className="group font-medium text-sm text-[#c9a84c] hover:text-[#e8c97a] flex items-center gap-1 transition-colors"
          >
            Lihat Semua Koleksi 
            <ArrowRight size={14} className="transform transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center text-white/40 py-12 bg-[#1a1610] rounded-2xl border border-[#c9a84c]/10 animate-pulse">
              Sedang memuat mahakarya pilihan...
            </div>
          ) : (
            // Mengambil 4 produk teratas yang didapatkan dari API Laravel
            products.slice(0, 4).map((product) => (
              <ProductCard 
                key={product.id_product || product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))
          )}
        </div>
      </section>

      {/* ── EXCLUSIVE PROMO BANNER (FLASH SALE LUXE) ── */}
      <div className="relative rounded-[24px] bg-gradient-to-r from-[#2a2218] via-[#1a1610] to-[#0d0b08] p-8 md:p-10 border border-[#c9a84c]/20 shadow-2xl overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Subtle background decoration patterns */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#c9a84c]/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex text-3xl p-4 bg-[#c9a84c]/10 border border-[#c9a84c]/20 text-[#c9a84c] rounded-2xl h-fit">
            ✦
          </div>
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-block px-3 py-0.5 bg-[#c9a84c] text-[#0d0b08] font-bold text-[10px] uppercase tracking-wider rounded-md mb-1">
              Penawaran Terbatas
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-white">Diskon Kilat Minggu Ini!</h3>
            <p className="text-sm text-white/50 max-w-xl">
              Dapatkan potongan harga langsung hingga <span className="text-[#e8c97a] font-bold">30%</span> untuk seluruh varian sofa ruang tamu tanpa minimum belanja. Nikmati gratis ongkir khusus wilayah kota.
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => navigate("/customer/produk?category=Sofa")}
          className="px-6 py-3 text-xs font-bold border border-[#c9a84c] text-[#c9a84c] bg-transparent rounded-lg hover:bg-[#c9a84c] hover:text-[#0d0b08] transition-all duration-300 whitespace-nowrap"
        >
          Klaim Diskon Sofa
        </button>
      </div>
    </div>
  );
}