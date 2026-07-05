import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../api/productService";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";

export default function ProdukCustomer() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) setSelectedCategory(catParam);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); 
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products via service:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = currentCart.find((item) => item.id_product === product.id_product);
    
    if (exist) {
      exist.qty += 1;
    } else {
      currentCart.push({ ...product, qty: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(currentCart));
    window.dispatchEvent(new Event("storage")); // Sinkronisasi otomatis angka keranjang di navbar layout
    alert(`Sukses menambahkan "${product.product_name}" ke dalam keranjang premium Anda.`);
  };

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryName = product.category ? product.category.category_name : "";
    const matchCategory = selectedCategory === "Semua" || categoryName === selectedCategory;
    
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-10 text-white">
      {/* SEKSI HEADER & FILTER */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center border-b border-[#c9a84c]/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#c9a84c] mb-1">
            <Sparkles size={14} className="animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] font-bold uppercase">Signature Collection</span>
          </div>
          <h1 className="text-3xl font-bold font-serif tracking-wide text-white">
            Katalog <span className="text-[#c9a84c]">Furnitur Suite</span>
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Menampilkan <span className="text-[#c9a84c] font-bold">{filteredProducts.length}</span> maha karya perabot pilihan terbaik untuk Anda
          </p>
        </div>

        {/* INPUT PENCARIAN & FILTER SELECTION */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
          {/* Kolom Search Kontemporer */}
          <div className="relative w-full sm:w-64 group">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#c9a84c] transition-colors" />
            <input
              type="text"
              placeholder="Cari perabotan mewah..."
              className="input w-full bg-[#1a1610] text-white pl-11 pr-4 border border-[#c9a84c]/20 rounded-xl focus:border-[#c9a84c] focus:outline-none placeholder:text-white/30 text-sm h-11 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Dropdown Filter */}
          <div className="relative w-full sm:w-52">
            <SlidersHorizontal size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a84c]" />
            <select 
              className="select w-full bg-[#1a1610] text-white pl-11 pr-4 border border-[#c9a84c]/20 rounded-xl focus:border-[#c9a84c] focus:outline-none text-sm h-11 transition-all appearance-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="Semua">Semua Kategori</option>
              <option value="Sofa">Sofa Premium</option>
              <option value="Kursi">Kursi Estetik</option>
              <option value="Tempat Tidur">Tempat Tidur Megah</option>
              <option value="Meja Kerja">Meja Kerja Eksekutif</option>
            </select>
          </div>
        </div>
      </div>

      {/* STATE AREA KONTEN UTAMA */}
      {isLoading ? (
        /* SKELETON / LOADING LOADER */
        <div className="text-center py-24 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-[#c9a84c]/20 border-t-[#c9a84c] animate-spin mb-4"></div>
          <p className="text-sm uppercase tracking-widest text-white/50">Menyelaraskan Koleksi Mewah...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        /* NOT FOUND STATE */
        <div className="text-center py-20 bg-[#1a1610]/40 rounded-2xl border border-[#c9a84c]/10 backdrop-blur-sm max-w-xl mx-auto p-6">
          <p className="text-md font-serif text-white/70">
            Maaf, mahakarya furnitur yang Anda cari tidak ditemukan dalam koleksi kurasi saat ini.
          </p>
        </div>
      ) : (
        /* KISI-KISI GRID PRODUK */
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((item) => (
            <div key={item.id_product} className="transform transition-transform hover:-translate-y-1 duration-300">
              <ProductCard product={item} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}