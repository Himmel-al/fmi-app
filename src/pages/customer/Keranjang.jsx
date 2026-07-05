import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";

export default function Keranjang() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // 1. Mengubah pencarian ID menjadi item.id_product
  const updateQty = (id_product, newQty) => {
    if (newQty < 1) return;
<<<<<<< HEAD
    // Disesuaikan menggunakan id_product sesuai data dari katalog produk
    const updated = cartItems.map((item) => (item.id_product === id ? { ...item, qty: newQty } : item));
=======
    const updated = cartItems.map((item) => 
      item.id_product === id_product ? { ...item, qty: newQty } : item
    );
>>>>>>> 72c10f18e93c636a004982ef69796af07a75a264
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage")); // Memicu update badge navbar layout secara instan
  };

<<<<<<< HEAD
  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id_product !== id);
=======
  // 2. Mengubah filter hapus menjadi item.id_product
  const removeItem = (id_product) => {
    const updated = cartItems.filter((item) => item.id_product !== id_product);
>>>>>>> 72c10f18e93c636a004982ef69796af07a75a264
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage")); // Memicu update badge navbar layout secara instan
  };

  // 3. Mengubah perhitungan total harga menggunakan item.price
  const calculateTotal = () => {
<<<<<<< HEAD
    // Disesuaikan menggunakan properti price/harga dari objek produk database Anda
    return cartItems.reduce((acc, item) => acc + (item.price || item.harga || 0) * item.qty, 0);
=======
    return cartItems.reduce((acc, item) => acc + Number(item.price || 0) * item.qty, 0);
>>>>>>> 72c10f18e93c636a004982ef69796af07a75a264
  };

  return (
    <div className="space-y-8 text-white relative">
      {/* HEADER UTAMA */}
      <div className="border-b border-[#c9a84c]/20 pb-5">
        <h1 className="text-3xl font-bold font-serif tracking-wide text-white">
          Keranjang <span className="text-[#c9a84c]">Belanja</span>
        </h1>
        <p className="text-xs text-white/50 uppercase tracking-widest mt-1">Eksklusif Suite</p>
      </div>

      {cartItems.length === 0 ? (
        /* KONDISI KERANJANG KOSONG */
        <div className="text-center py-20 rounded-2xl bg-[#1a1610]/60 border border-[#c9a84c]/10 backdrop-blur-md max-w-2xl mx-auto p-8 shadow-xl">
          <div className="w-16 h-16 bg-[#c9a84c]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#c9a84c]">
            <ShoppingBag size={28} />
          </div>
          <h3 className="text-xl font-bold font-serif mb-2 text-white">Keranjang Anda Kosong</h3>
          <p className="text-sm text-white/60 mb-8 max-w-sm mx-auto">
            Belum ada perabot premium yang Anda pilih untuk memperindah ruangan Anda.
          </p>
          <button 
            onClick={() => navigate("/customer/produk")} 
            className="btn bg-[#c9a84c] text-[#0d0b08] hover:bg-[#e8c97a] border-none font-bold rounded-xl px-8 shadow-lg shadow-[#c9a84c]/10 transition-all duration-300"
          >
            Mulai Menjelajah Katalog
          </button>
        </div>
      ) : (
        /* KONDISI ADS ITEM */
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* DAFTAR ITEM TABEL */}
          <div className="lg:col-span-2 overflow-x-auto rounded-2xl bg-[#1a1610]/80 border border-[#c9a84c]/10 shadow-[0_12px_40px_rgba(0,0,0,0.4)] p-2 backdrop-blur-xl">
            <table className="table w-full text-white/90">
              <thead>
                <tr className="border-b border-[#c9a84c]/10 text-[#c9a84c] uppercase font-serif tracking-wider text-xs">
                  <th className="bg-transparent py-4">Produk</th>
                  <th className="bg-transparent py-4">Harga</th>
                  <th className="bg-transparent py-4 text-center">Kuantitas</th>
                  <th className="bg-transparent py-4">Subtotal</th>
                  <th className="bg-transparent py-4 text-center">Hapus</th>
                </tr>
              </thead>
<<<<<<< HEAD
              <tbody className="divide-y divide-[#c9a84c]/5">
                {cartItems.map((item) => {
                  const currentPrice = item.price || item.harga || 0;
                  const currentName = item.product_name || item.nama;
                  const currentImg = item.image || item.image_url;

                  return (
                    <tr key={item.id_product} className="hover:bg-[#c9a84c]/5 transition-colors group">
                      <td className="bg-transparent py-5">
                        <div className="flex items-center gap-4">
                          <img 
                            src={currentImg} 
                            alt={currentName} 
                            className="w-14 h-14 object-cover rounded-xl border border-[#c9a84c]/20 bg-[#0d0b08] shadow-inner" 
                          />
                          <span className="font-medium text-sm max-w-[180px] truncate block group-hover:text-[#c9a84c] transition-colors">
                            {currentName}
                          </span>
                        </div>
                      </td>
                      <td className="bg-transparent text-sm">Rp {currentPrice.toLocaleString("id-ID")}</td>
                      <td className="bg-transparent">
                        <div className="flex justify-center items-center gap-2">
                          <button 
                            onClick={() => updateQty(item.id_product, item.qty - 1)} 
                            className="btn btn-xs btn-square bg-[#2a2218] text-[#c9a84c] border-none hover:bg-[#c9a84c] hover:text-[#0d0b08] rounded-md transition-all duration-200"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold font-mono">{item.qty}</span>
                          <button 
                            onClick={() => updateQty(item.id_product, item.qty + 1)} 
                            className="btn btn-xs btn-square bg-[#2a2218] text-[#c9a84c] border-none hover:bg-[#c9a84c] hover:text-[#0d0b08] rounded-md transition-all duration-200"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </td>
                      <td className="bg-transparent font-semibold text-[#c9a84c] text-sm">
                        Rp {(currentPrice * item.qty).toLocaleString("id-ID")}
                      </td>
                      <td className="bg-transparent text-center">
                        <button 
                          onClick={() => removeItem(item.id_product)} 
                          className="btn btn-ghost btn-sm btn-circle text-red-400 hover:text-white hover:bg-red-500/20"
                        >
=======
              <tbody>
                {cartItems.map((item) => {
                  // Memastikan harga dikonversi ke tipe angka
                  const itemPrice = Number(item.price || 0);
                  
                  return (
                    <tr key={item.id_product} className="hover:bg-base-200/40">
                      <td>
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.image} 
                            alt={item.product_name} 
                            className="w-12 h-12 object-cover rounded-md bg-base-200" 
                          />
                          {/* 4. Menggunakan item.product_name */}
                          <span className="font-semibold text-sm line-clamp-1">{item.product_name}</span>
                        </div>
                      </td>
                      {/* 5. Menggunakan itemPrice dari database */}
                      <td>Rp {itemPrice.toLocaleString("id-ID")}</td>
                      <td>
                        <div className="flex justify-center items-center gap-1">
                          <button onClick={() => updateQty(item.id_product, item.qty - 1)} className="btn btn-xs btn-outline">-</button>
                          <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                          <button onClick={() => updateQty(item.id_product, item.qty + 1)} className="btn btn-xs btn-outline">+</button>
                        </div>
                      </td>
                      <td className="font-semibold text-primary">Rp {(itemPrice * item.qty).toLocaleString("id-ID")}</td>
                      <td>
                        <button onClick={() => removeItem(item.id_product)} className="btn btn-ghost btn-xs text-error">
>>>>>>> 72c10f18e93c636a004982ef69796af07a75a264
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* RINGKASAN PEMBAYARAN BOX */}
          <div className="rounded-2xl bg-gradient-to-b from-[#1a1610] to-[#120f0a] border border-[#c9a84c]/20 shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-6 space-y-6 backdrop-blur-xl sticky top-28">
            <h3 className="text-lg font-bold font-serif text-white tracking-wide border-b border-[#c9a84c]/10 pb-3">
              Ringkasan Pesanan
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-xs tracking-wide text-white/60">
                <span>Total Kuantitas</span>
                <span className="font-semibold text-white">{cartItems.reduce((acc, i) => acc + i.qty, 0)} unit</span>
              </div>
              <div className="flex justify-between text-xs tracking-wide text-white/60">
                <span>Layanan Portir Lounge</span>
                <span className="text-emerald-400 font-medium">Gratis / Premium</span>
              </div>
            </div>

            <div className="border-t border-[#c9a84c]/10 pt-4 flex justify-between items-center">
              <span className="text-sm font-medium text-white/80">Total Investasi</span>
              <span className="text-xl font-bold text-[#c9a84c] font-mono tracking-tight">
                Rp {calculateTotal().toLocaleString("id-ID")}
              </span>
            </div>

            <button 
              onClick={() => navigate("/customer/checkout")} 
              className="btn bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] text-[#0d0b08] hover:from-[#e8c97a] hover:to-[#c9a84c] border-none w-full font-bold rounded-xl shadow-lg shadow-[#c9a84c]/10 transition-all duration-300 py-3 flex items-center justify-center gap-2 group"
            >
              Lanjutkan ke Prosedur Checkout
              <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-1 duration-200" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}