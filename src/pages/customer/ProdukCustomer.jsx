import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { MASTER_PRODUCTS } from "../../data/products";

export default function ProdukCustomer() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) setSelectedCategory(catParam);
  }, [searchParams]);

  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = currentCart.find((item) => item.id === product.id);
    if (exist) {
      exist.qty += 1;
    } else {
      currentCart.push({ ...product, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));
    alert(`${product.nama} masuk ke keranjang belanja!`);
  };

  const filteredProducts = MASTER_PRODUCTS.filter((product) => {
    const matchSearch = product.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === "Semua" || product.kategori === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Katalog Furnitur</h1>
          <p className="text-sm text-base-content/60 mt-1">Menampilkan {filteredProducts.length} produk pilihan</p>
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

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-base-200 rounded-2xl">
          <p className="text-lg font-medium text-base-content/60">Produk yang kamu cari tidak ditemukan.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}