import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../api/productService"; // Menggunakan service yang sudah di-import

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

  // Mengubah fetch mentah menjadi getProducts() dari API Service
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); 
        setProducts(data); // Axios di service langsung mengembalikan data berupa array
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
    alert(`${product.product_name} masuk ke keranjang belanja!`);
  };

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Mengambil nama kategori dari relasi database tabel 'categories'
    const categoryName = product.category ? product.category.category_name : "";
    const matchCategory = selectedCategory === "Semua" || categoryName === selectedCategory;
    
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Katalog Furnitur</h1>
          <p className="text-sm text-base-content/60 mt-1">
            Menampilkan {filteredProducts.length} produk pilihan
          </p>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari perabotan..."
            className="input input-bordered w-full md:w-64 input-sm md:input-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            className="select select-bordered select-sm md:select-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="Semua">Semua Kategori</option>
            <option value="Sofa">Sofa</option>
            <option value="Kursi">Kursi</option>
            <option value="Tempat Tidur">Tempat Tidur</option>
            <option value="Meja Kerja">Meja Kerja</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-16">
           <span className="loading loading-spinner loading-lg text-primary"></span>
           <p className="mt-4 text-base-content/60">Memuat produk...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-base-200 rounded-2xl">
          <p className="text-lg font-medium text-base-content/60">Produk yang kamu cari tidak ditemukan.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id_product} product={item} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}