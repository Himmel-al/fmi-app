import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, ShoppingBag } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [alamat, setAlamat] = useState("");
  const [metodeBayar, setMetodeBayar] = useState("transfer");

  // Ambil data keranjang dengan aman dari localStorage saat halaman dimuat
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Gagal memuat data keranjang:", error);
    }
  }, []);

  // Hitung total belanjaan
  const totalHarga = cartItems.reduce((sum, item) => sum + (item.harga * (item.kuantitas || 1)), 0);

  const handleBuatPesanan = (e) => {
    e.preventDefault();
    if (!alamat.trim()) {
      alert("Silakan isi alamat pengiriman terlebih dahulu!");
      return;
    }

    try {
      // 1. Ambil data pesanan terdahulu dari localStorage (jika ada)
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

      // 2. Buat objek transaksi baru dengan mencocokkan struktur data RiwayatPesanan & Admin
      const newOrder = {
        id: Date.now().toString().slice(-5), // Membuat 5 digit ID acak yang unik
        tanggal: new Date().toLocaleDateString("id-ID"),
        customer: "Pelanggan Umum", // Bisa disesuaikan jika ada sistem auth nama user
        items: cartItems.map((item) => ({
          nama: item.nama,
          qty: item.kuantitas || 1, 
        })),
        total: totalHarga,
        alamat: alamat,
        metodeBayar: metodeBayar,
        status: "Diproses",
      };

      // 3. Gabungkan data baru ke baris paling atas
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      // 4. Bersihkan isi keranjang belanja setelah checkout berhasil
      localStorage.removeItem("cart");

      // Tampilkan informasi rekening Mandiri jika memilih metode transfer
      if (metodeBayar === "transfer") {
        alert(
          `Pesanan Berhasil Dibuat!\n\nSilakan transfer sebesar Rp ${totalHarga.toLocaleString("id-ID")} ke:\nBank Mandiri: 123-00-998877-6\na/n PT SIPP Perabotan\n\nDetail rekening dapat Anda lihat kembali di halaman Riwayat Pesanan.`
        );
      } else {
        alert("Pesanan Anda (COD) berhasil dibuat!");
      }
      
      // 5. Mengarahkan rute ke halaman riwayat pesanan
      navigate("/customer/pesanan");
    } catch (error) {
      console.error("Gagal memproses pesanan:", error);
      alert("Terjadi masalah saat menyimpan pesanan.");
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-base-content flex items-center gap-2">
        <ShoppingBag className="text-primary" /> Formulir Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* KIRI: Alamat & Pembayaran */}
        <div className="lg:col-span-2 space-y-6">
          {/* Form Alamat */}
          <div className="card bg-base-100 shadow-md border border-base-200 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-error" /> Alamat Pengiriman
            </h2>
            <textarea
              className="textarea textarea-bordered w-full h-24 focus:textarea-primary"
              placeholder="Tuliskan alamat lengkap pengiriman rumah Anda..."
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required
            />
          </div>

          {/* Metode Pembayaran */}
          <div className="card bg-base-100 shadow-md border border-base-200 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-success" /> Metode Pembayaran
            </h2>
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4 p-3 border rounded-xl mb-2 hover:bg-base-200/50">
                <input
                  type="radio"
                  name="payment"
                  className="radio radio-primary"
                  checked={metodeBayar === "transfer"}
                  onChange={() => setMetodeBayar("transfer")}
                />
                <span className="label-text font-medium">Transfer Bank (Manual)</span>
              </label>
              <label className="label cursor-pointer justify-start gap-4 p-3 border rounded-xl hover:bg-base-200/50">
                <input
                  type="radio"
                  name="payment"
                  className="radio radio-primary"
                  checked={metodeBayar === "cod"}
                  onChange={() => setMetodeBayar("cod")}
                />
                <span className="label-text font-medium">Bayar di Tempat (COD)</span>
              </label>
            </div>
          </div>
        </div>

        {/* KANAN: Ringkasan Pesanan */}
        <div className="card bg-base-100 shadow-md border border-base-200 p-6 rounded-2xl h-fit">
          <h2 className="text-xl font-bold mb-4">Ringkasan Pesanan</h2>
          
          <div className="divide-y divide-base-200 max-h-60 overflow-y-auto mb-4 pr-2">
            {cartItems.length === 0 ? (
              <p className="text-sm text-base-content/60 py-2">Tidak ada produk dalam keranjang.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex justify-between py-3 text-sm">
                  <div>
                    <p className="font-semibold text-base-content line-clamp-1">{item.nama}</p>
                    <p className="text-xs text-base-content/60">{item.kuantitas || 1}x @ Rp {item.harga?.toLocaleString("id-ID")}</p>
                  </div>
                  <p className="font-medium">Rp {((item.harga || 0) * (item.kuantitas || 1)).toLocaleString("id-ID")}</p>
                </div>
              ))
            )}
          </div>

          <div className="border-t pt-4 space-y-2 mb-6">
            <div className="flex justify-between text-base-content/70">
              <span>Subtotal</span>
              <span>Rp {totalHarga.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-base-content/70">
              <span>Biaya Pengiriman</span>
              <span className="text-success font-medium">Gratis</span>
            </div>
            <div className="flex justify-between font-extrabold text-lg pt-2 border-t border-dashed">
              <span>Total Harga</span>
              <span className="text-primary">Rp {totalHarga.toLocaleString("id-ID")}</span>
            </div>
          </div>

          <button 
            onClick={handleBuatPesanan}
            className="btn btn-primary w-full rounded-xl shadow-md text-white font-bold"
            disabled={cartItems.length === 0}
          >
            Selesaikan Pemesanan
          </button>
        </div>
      </div>
    </div>
  );
}