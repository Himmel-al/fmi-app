import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, ShoppingBag, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [alamat, setAlamat] = useState("");
  const [metodeBayar, setMetodeBayar] = useState("transfer");

  // Ambil data keranjang & profil default dari localStorage saat halaman dimuat
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      
      // Mengambil alamat default secara otomatis jika user sudah menyimpannya di profil
      const savedProfile = JSON.parse(localStorage.getItem("customerProfile"));
      if (savedProfile && savedProfile.alamat) {
        setAlamat(savedProfile.alamat);
      }
    } catch (error) {
      console.error("Gagal memuat data pendukung checkout:", error);
    }
  }, []);

<<<<<<< HEAD
  // Hitung total belanjaan dengan fallback property (harga/price dan qty/kuantitas)
  const totalHarga = cartItems.reduce((sum, item) => {
    const itemPrice = item.price || item.harga || 0;
    const itemQty = item.qty || item.kuantitas || 1;
    return sum + (itemPrice * itemQty);
  }, 0);
=======
  // 1. DIUBAH: Menggunakan item.price dan item.qty untuk kalkulasi total
  const totalHarga = cartItems.reduce((sum, item) => sum + (Number(item.price || 0) * (item.qty || 1)), 0);
>>>>>>> 72c10f18e93c636a004982ef69796af07a75a264

  const handleBuatPesanan = (e) => {
    e.preventDefault();
    if (!alamat.trim()) {
      alert("Silakan tentukan alamat pengiriman premium Anda terlebih dahulu!");
      return;
    }

    try {
<<<<<<< HEAD
=======
      // Ambil data pesanan terdahulu dari localStorage (jika ada)
>>>>>>> 72c10f18e93c636a004982ef69796af07a75a264
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const savedProfile = JSON.parse(localStorage.getItem("customerProfile"));

<<<<<<< HEAD
      // Buat objek transaksi baru yang sinkron dengan struktur database & halaman riwayat
=======
      // 2. DIUBAH: Pemetaan items menggunakan product_name dan qty agar selaras
>>>>>>> 72c10f18e93c636a004982ef69796af07a75a264
      const newOrder = {
        id: Date.now().toString().slice(-5), 
        tanggal: new Date().toLocaleDateString("id-ID"),
<<<<<<< HEAD
        customer: savedProfile?.nama || "Premium Client", 
        items: cartItems.map((item) => ({
          product_name: item.product_name || item.nama,
          qty: item.qty || item.kuantitas || 1, 
=======
        customer: "Pelanggan Umum", 
        items: cartItems.map((item) => ({
          nama: item.product_name,
          qty: item.qty || 1, 
>>>>>>> 72c10f18e93c636a004982ef69796af07a75a264
        })),
        total: totalHarga,
        alamat: alamat,
        metodeBayar: metodeBayar,
        status: "Diproses",
      };

<<<<<<< HEAD
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      // Bersihkan isi keranjang belanja dan trigger pembaruan badge navbar layout
=======
      // Gabungkan data baru ke baris paling atas
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      // Bersihkan isi keranjang belanja setelah checkout berhasil
>>>>>>> 72c10f18e93c636a004982ef69796af07a75a264
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("storage"));

      if (metodeBayar === "transfer") {
        alert(
          `Pesanan Berhasil Diamankan!\n\nSilakan mentransfer dana investasi sebesar Rp ${totalHarga.toLocaleString("id-ID")} ke:\nBank Mandiri Vault: 123-00-998877-6\na/n PT SIPP Perabotan\n\nDetail rekening dapat Anda akses setiap saat pada menu Riwayat Pesanan.`
        );
      } else {
        alert("Pesanan dengan metode COD Premium Anda berhasil dijadwalkan!");
      }
      
<<<<<<< HEAD
=======
      // Mengarahkan rute ke halaman riwayat pesanan
>>>>>>> 72c10f18e93c636a004982ef69796af07a75a264
      navigate("/customer/pesanan");
    } catch (error) {
      console.error("Gagal memproses pesanan:", error);
      alert("Terjadi kendala teknis saat mengamankan pesanan Anda.");
    }
  };

  return (
    <div className="container mx-auto text-white space-y-8 relative max-w-6xl">
      
      {/* HEADER UTAMA */}
      <div className="border-b border-[#c9a84c]/20 pb-5">
        <div className="flex items-center gap-2 text-[#c9a84c] mb-1">
          <ShieldCheck size={14} className="animate-pulse" />
          <span className="text-[10px] tracking-[0.3em] font-bold uppercase">Secure Premium Checkout</span>
        </div>
        <h1 className="text-3xl font-bold font-serif tracking-wide text-white flex items-center gap-3">
          <ShoppingBag className="text-[#c9a84c]" size={28} />
          Formulir <span className="text-[#c9a84c]">Pemesanan</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* KOLOM KIRI: ALAMAT & METODE PEMBAYARAN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SEKSI 1: ALAMAT PENGIRIMAN */}
          <div className="rounded-2xl bg-[#1a1610]/80 border border-[#c9a84c]/10 shadow-[0_12px_40px_rgba(0,0,0,0.4)] p-6 backdrop-blur-xl transition-all hover:border-[#c9a84c]/30">
            <h2 className="text-lg font-bold font-serif mb-4 flex items-center gap-2 text-white">
              <MapPin size={18} className="text-[#c9a84c]" /> Destinasi Pengiriman Perabot
            </h2>
            <textarea
              className="textarea w-full bg-[#0d0b08] text-white border border-[#c9a84c]/20 rounded-xl focus:border-[#c9a84c] focus:outline-none text-sm p-4 h-28 transition-all resize-none placeholder:text-white/20"
              placeholder="Tuliskan alamat lengkap pengiriman properti atau kediaman Anda..."
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required
            />
            <p className="text-[10px] text-white/40 mt-2 italic">*Jika Anda sudah mengisi alamat di menu Profil, kolom ini akan terisi otomatis.</p>
          </div>

          {/* SEKSI 2: METODE PEMBAYARAN */}
          <div className="rounded-2xl bg-[#1a1610]/80 border border-[#c9a84c]/10 shadow-[0_12px_40px_rgba(0,0,0,0.4)] p-6 backdrop-blur-xl transition-all hover:border-[#c9a84c]/30">
            <h2 className="text-lg font-bold font-serif mb-4 flex items-center gap-2 text-white">
              <CreditCard size={18} className="text-[#c9a84c]" /> Metode Proteksi Pembayaran
            </h2>
            <div className="form-control space-y-3">
              
              {/* OPSI TRANSFER */}
              <label 
                onClick={() => setMetodeBayar("transfer")}
                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                  metodeBayar === "transfer" 
                    ? "bg-[#c9a84c]/5 border-[#c9a84c] text-white" 
                    : "bg-[#0d0b08] border-[#c9a84c]/10 text-white/60 hover:border-[#c9a84c]/30"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  className="radio border-[#c9a84c]/40 checked:bg-[#c9a84c] checked:border-[#c9a84c]"
                  checked={metodeBayar === "transfer"}
                  onChange={() => {}}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Transfer Bank (Verifikasi Manual Vault)</span>
                  <span className="text-xs text-white/40 mt-0.5">Sistem memunculkan nomor rekening eksklusif Mandiri setelah pemesanan dikonfirmasi.</span>
                </div>
              </label>

              {/* OPSI COD */}
              <label 
                onClick={() => setMetodeBayar("cod")}
                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                  metodeBayar === "cod" 
                    ? "bg-[#c9a84c]/5 border-[#c9a84c] text-white" 
                    : "bg-[#0d0b08] border-[#c9a84c]/10 text-white/60 hover:border-[#c9a84c]/30"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  className="radio border-[#c9a84c]/40 checked:bg-[#c9a84c] checked:border-[#c9a84c]"
                  checked={metodeBayar === "cod"}
                  onChange={() => {}}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Cash On Delivery (Premium COD)</span>
                  <span className="text-xs text-white/40 mt-0.5">Lakukan pelunasan tunai langsung di tempat saat armada logistik internal kami tiba di lokasi Anda.</span>
                </div>
              </label>

            </div>
          </div>
        </div>

        {/* KOLOM KANAN: RINGKASAN PRODUK & TOTAL INVESTASI */}
        <div className="rounded-2xl bg-[#1a1610] border border-[#c9a84c]/20 shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-6 space-y-6 backdrop-blur-xl sticky top-28">
          <h2 className="text-lg font-bold font-serif text-white tracking-wide border-b border-[#c9a84c]/10 pb-3">
            Ringkasan Manifestasi
          </h2>
          
          {/* LIST ITEM DAFTAR BELANJA */}
          <div className="divide-y divide-[#c9a84c]/10 max-h-52 overflow-y-auto mb-4 pr-1 scrollbar-thin scrollbar-thumb-[#c9a84c]/20">
            {cartItems.length === 0 ? (
              <p className="text-xs text-white/40 py-4 italic text-center">Tidak ada produk eksklusif di keranjang.</p>
            ) : (
<<<<<<< HEAD
              cartItems.map((item, idx) => {
                const itemPrice = item.price || item.harga || 0;
                const itemQty = item.qty || item.kuantitas || 1;
                const itemName = item.product_name || item.nama;

                return (
                  <div key={item.id_product || idx} className="flex justify-between items-start py-3.5 text-sm group">
                    <div className="max-w-[70%]">
                      <p className="font-medium text-white group-hover:text-[#c9a84c] transition-colors line-clamp-1">{itemName}</p>
                      <p className="text-xs text-white/40 font-mono mt-0.5">{itemQty}x @ Rp {itemPrice.toLocaleString("id-ID")}</p>
                    </div>
                    <p className="font-bold text-white/90 text-xs font-mono pt-1">Rp {(itemPrice * itemQty).toLocaleString("id-ID")}</p>
=======
              cartItems.map((item) => {
                // 3. DIUBAH: Parsing harga ke tipe Number agar aman dari manipulasi string
                const itemPrice = Number(item.price || 0);
                const itemQty = item.qty || 1;

                return (
                  <div key={item.id_product || item.id} className="flex justify-between py-3 text-sm">
                    <div>
                      {/* 4. DIUBAH: Menampilkan item.product_name */}
                      <p className="font-semibold text-base-content line-clamp-1">{item.product_name}</p>
                      {/* 5. DIUBAH: Menampilkan itemQty dan itemPrice */}
                      <p className="text-xs text-base-content/60">{itemQty}x @ Rp {itemPrice.toLocaleString("id-ID")}</p>
                    </div>
                    <p className="font-medium">Rp {(itemPrice * itemQty).toLocaleString("id-ID")}</p>
>>>>>>> 72c10f18e93c636a004982ef69796af07a75a264
                  </div>
                );
              })
            )}
          </div>

          {/* TOTAL CALCULATION RINCIAN */}
          <div className="border-t border-[#c9a84c]/10 pt-4 space-y-3">
            <div className="flex justify-between text-xs tracking-wide text-white/60">
              <span>Subtotal Produk</span>
              <span className="font-mono">Rp {totalHarga.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-xs tracking-wide text-white/60">
              <span>Proteksi & Pengiriman</span>
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">Complimentary</span>
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t border-dashed border-[#c9a84c]/20">
              <span className="text-sm font-serif font-medium text-white/90">Total Investasi</span>
              <span className="text-xl font-bold text-[#c9a84c] font-mono tracking-tight">
                Rp {totalHarga.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {/* TOMBOL AKSI SUBMIT */}
          <button 
            onClick={handleBuatPesanan}
            className="btn bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] text-[#0d0b08] hover:from-[#e8c97a] hover:to-[#c9a84c] border-none w-full font-bold rounded-xl shadow-lg shadow-[#c9a84c]/10 transition-all duration-300 py-3 flex items-center justify-center gap-2 group disabled:opacity-30 disabled:pointer-events-none"
            disabled={cartItems.length === 0}
          >
            <Sparkles size={14} className="animate-pulse" />
            Amankan & Selesaikan Pesanan
            <ArrowRight size={15} className="transform transition-transform group-hover:translate-x-0.5 duration-200" />
          </button>
        </div>

      </div>
    </div>
  );
}