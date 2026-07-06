import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../api/productService";
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

export default function ProdukCustomer() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ── STATE UNTUK PAGINATION ──
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Menampilkan 3 produk per halaman agar tombol pagination langsung aktif

  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) setSelectedCategory(catParam);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); 
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products via service:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Reset ke halaman 1 setiap kali user mengetik pencarian atau mengubah kategori filter
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = currentCart.find((item) => item.id_product === product.id_product);
    
    if (exist) {
      exist.qty += 1;
    } else {
      currentCart.push({ ...product, qty: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(currentCart));
    window.dispatchEvent(new Event("storage")); 
    alert(`Sukses menambahkan "${product.product_name}" ke dalam keranjang premium Anda.`);
  };

  // 1. Dapatkan data hasil filter pencarian & kategori terlebih dahulu
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryName = product.category ? product.category.category_name : "";
    const matchCategory = selectedCategory === "Semua" || categoryName === selectedCategory;
    
    return matchSearch && matchCategory;
  });

  // ── 2. LOGIKA MATEMATIKA PAGINATION ──
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  
  // Memotong data yang sudah difilter untuk ditampilkan di halaman aktif saja
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Hitung total halaman berdasarkan sisa produk hasil filter (minimal 1)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Auto-scroll ke atas halaman saat ganti page
    }
  };

  return (
    <div className="space-y-10 text-white min-h-screen pb-16">
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
        <div className="text-center py-24 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-[#c9a84c]/20 border-t-[#c9a84c] animate-spin mb-4"></div>
          <p className="text-sm uppercase tracking-widest text-white/50">Menyelaraskan Koleksi Mewah...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#1a1610]/40 rounded-2xl border border-[#c9a84c]/10 backdrop-blur-sm max-w-xl mx-auto p-6">
          <p className="text-md font-serif text-white/70">
            Maaf, mahakarya furnitur yang Anda cari tidak ditemukan dalam koleksi kurasi saat ini.
          </p>
        </div>
      ) : (
        <>
          {/* KISI-KISI GRID PRODUK (Menggunakan currentProducts) */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {currentProducts.map((item) => (
              <div key={item.id_product} className="transform transition-transform hover:-translate-y-1 duration-300">
                <ProductCard product={item} onAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>

          {/* ── TOMBOL NAVIGASI PAGINATION (DIPAKSA RENDERING) ── */}
          <div className="flex justify-center items-center gap-3 pt-12 mt-6 border-t border-[#c9a84c]/10 relative z-30">
            {/* Tombol Previous */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2.5 rounded-lg border border-[#c9a84c]/20 bg-[#1a1610] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0d0b08] disabled:opacity-20 disabled:pointer-events-none transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Angka Halaman */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`w-10 h-10 rounded-lg text-sm font-bold transition-all duration-300 border ${
                  currentPage === page
                    ? "bg-[#c9a84c] text-[#0d0b08] border-[#c9a84c] shadow-[0_0_15px_rgba(201,168,76,0.3)]"
                    : "bg-[#1a1610] text-white/70 border-[#c9a84c]/20 hover:border-[#c9a84c]/60 hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Tombol Next */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-lg border border-[#c9a84c]/20 bg-[#1a1610] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0d0b08] disabled:opacity-20 disabled:pointer-events-none transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}