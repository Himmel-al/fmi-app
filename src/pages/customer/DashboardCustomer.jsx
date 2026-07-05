import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import axios from "../../api/axios"; // Pastikan path axios.js kamu sudah benar

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

  // 2. DIUBAH: Menyesuaikan handleAddToCart dengan struktur id_product & product_name
  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = currentCart.find((item) => item.id_product === product.id_product);
    
    if (exist) {
      exist.qty += 1;
    } else {
      currentCart.push({ ...product, qty: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(currentCart));
    alert(`${product.product_name} berhasil masuk keranjang!`);
  };

  return (
    <div className="space-y-12">
      {/* HERO SECTION */}
      <div 
        className="hero min-h-[450px] rounded-3xl overflow-hidden shadow-xl"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80')` }}
      >
        <div className="hero-overlay bg-opacity-60 bg-neutral"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold tracking-tight mb-4">Furniture Modern Rumah Impian</h1>
            <p className="mb-6 text-lg text-neutral-content/90">
              Temukan berbagai perabotan berkualitas ekspor untuk ruang tamu, kamar tidur, dapur, dan kantor dengan penawaran terbaik.
            </p>
            <button onClick={() => navigate("/customer/produk")} className="btn btn-primary btn-lg px-8">
              Belanja Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* KATEGORI */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-base-content border-b pb-2">Belanja Berdasarkan Kategori</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { tag: "Sofa", emoji: "🛋️" },
            { tag: "Kursi", emoji: "🪑" },
            { tag: "Tempat Tidur", emoji: "🛏️" },
            { tag: "Meja Kerja", emoji: "🧑‍💻" }
          ].map((cat, idx) => (
            <div 
              key={idx} 
              onClick={() => navigate(`/customer/produk?category=${cat.tag}`)}
              className="card bg-base-100 border border-base-200 shadow-sm hover:bg-primary hover:text-primary-content transition-all cursor-pointer py-6 text-center"
            >
              <span className="text-4xl mb-2">{cat.emoji}</span>
              <h3 className="font-semibold">{cat.tag}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUK TERLARIS */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-base-content">Produk Unggulan Terlaris</h2>
          <button onClick={() => navigate("/customer/produk")} className="btn btn-sm btn-ghost gap-1">
            Lihat Semua →
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center text-base-content/60 py-8">
              Sedang memuat produk unggulan...
            </div>
          ) : (
            // Mengambil 4 produk teratas yang didapatkan dari API Laravel
            products.slice(0, 4).map((product) => (
              <ProductCard 
                key={product.id_product} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))
          )}
        </div>
      </section>

      {/* PROMO BANNER */}
      <div className="alert alert-success shadow-md text-success-content font-medium flex gap-3">
        <span>🎉</span>
        <div>
          <span className="font-bold">Diskon Kilat Minggu Ini!</span> Dapatkan potongan harga langsung hingga 30% untuk seluruh varian sofa ruang tamu tanpa minimum belanja.
        </div>
      </div>
    </div>
  );
}