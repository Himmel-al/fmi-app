import { useState, useEffect } from "react";
import { Package, Receipt, Calendar, CreditCard, Truck, Eye, X } from "lucide-react";

export default function RiwayatPesanan() {
  const [orders, setOrders] = useState([]);
  const [detailOrder, setDetailOrder] = useState(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // Badge Kategori Status Premium
  const getStatusBadge = (status) => {
    switch(status) {
      case "Selesai": 
        return <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Selesai</span>;
      case "Diproses": 
        return <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">Diproses</span>;
      case "Gagal": 
        return <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">Gagal</span>;
      default: 
        return <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-white/10 text-white/70 border border-white/10">Pending</span>;
    }
  };

  return (
    <div className="space-y-8 text-white">
      {/* HEADER UTAMA */}
      <div className="border-b border-[#c9a84c]/20 pb-5">
        <h1 className="text-3xl font-bold font-serif tracking-wide text-white">
          Riwayat <span className="text-[#c9a84c]">Pesanan Saya</span>
        </h1>
        <p className="text-xs text-white/50 uppercase tracking-widest mt-1">Eksklusif Portal Transaksi</p>
      </div>

      {orders.length === 0 ? (
        /* JIKA KOSONG */
        <div className="text-center py-20 rounded-2xl bg-[#1a1610]/60 border border-[#c9a84c]/10 backdrop-blur-md max-w-2xl mx-auto p-8 shadow-xl">
          <div className="w-16 h-16 bg-[#c9a84c]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#c9a84c]">
            <Package size={28} />
          </div>
          <h3 className="text-xl font-bold font-serif mb-2 text-white">Belum Ada Transaksi</h3>
          <p className="text-sm text-white/60 max-w-sm mx-auto">
            Anda belum pernah melakukan pemesanan mahakarya furnitur kami sebelumnya.
          </p>
        </div>
      ) : (
        /* TABEL RIWAYAT */
        <div className="overflow-x-auto rounded-2xl bg-[#1a1610]/80 border border-[#c9a84c]/10 shadow-[0_12px_40px_rgba(0,0,0,0.4)] p-2 backdrop-blur-xl">
          <table className="table w-full text-white/90">
            <thead>
              <tr className="border-b border-[#c9a84c]/10 text-[#c9a84c] uppercase font-serif tracking-wider text-xs">
                <th className="bg-transparent py-4">ID Order</th>
                <th className="bg-transparent py-4"><span className="flex items-center gap-1.5"><Calendar size={13}/> Tanggal</span></th>
                <th className="bg-transparent py-4">Item Perabotan</th>
                <th className="bg-transparent py-4">Total Pembayaran</th>
                <th className="bg-transparent py-4">Metode Bayar</th>
                <th className="bg-transparent py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c9a84c]/5">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#c9a84c]/5 transition-colors">
                  <td className="bg-transparent font-mono font-bold text-xs text-[#c9a84c]">
                    #TRX-{order.id}
                  </td>
                  <td className="bg-transparent text-sm text-white/70">
                    {order.tanggal}
                  </td>
                  <td className="bg-transparent">
                    <div className="max-w-xs space-y-1.5 py-1">
                      {order.items?.map((item, index) => (
                        <p key={index} className="text-xs truncate text-white/80 font-medium">
                          • {item.product_name || item.nama} <span className="text-[#c9a84c] font-mono font-bold">({item.qty}x)</span>
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="bg-transparent font-bold text-[#c9a84c] text-sm">
                    Rp {order.total.toLocaleString("id-ID")}
                  </td>
                  <td className="bg-transparent">
                    <div className="flex flex-col gap-1.5 items-start">
                      <span className="text-[10px] uppercase font-black tracking-wider text-white/80 flex items-center gap-1">
                        {order.metodeBayar === "transfer" ? (
                          <> <CreditCard size={12} className="text-[#c9a84c]" /> Transfer Bank </>
                        ) : (
                          <> <Truck size={12} className="text-[#c9a84c]" /> COD Luxury </>
                        )}
                      </span>
                      {order.metodeBayar === "transfer" && (
                        <button 
                          onClick={() => setDetailOrder(order)}
                          className="btn btn-xs bg-[#2a2218] hover:bg-[#c9a84c] hover:text-[#0d0b08] text-[#c9a84c] border border-[#c9a84c]/30 rounded-lg font-medium transition-all duration-200 gap-1"
                        >
                          <Eye size={10} /> Detail Invoice
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="bg-transparent">
                    {getStatusBadge(order.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL DETAL REKENING PREMIUM (GLASSMORPHISM EFFECT) */}
      {detailOrder && (
        <div className="modal modal-open backdrop-blur-md bg-[#0d0b08]/60 transition-all duration-300">
          <div className="modal-box rounded-2xl border border-[#c9a84c]/30 shadow-2xl bg-[#1a1610] text-white p-6 relative max-w-md">
            
            {/* Tombol Close Pojok Atas */}
            <button 
              onClick={() => setDetailOrder(null)} 
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="font-bold font-serif text-lg flex items-center gap-2 border-b border-[#c9a84c]/10 pb-3 text-[#c9a84c]">
              <Receipt size={18} /> Invoice Pembayaran #TRX-{detailOrder.id}
            </h3>

            <div className="py-4 space-y-5">
              {/* Ringkasan Data Pembayaran */}
              <div className="bg-[#0d0b08] p-4 rounded-xl space-y-2.5 text-xs border border-[#c9a84c]/10">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Total Tagihan Pemesanan:</span>
                  <span className="font-bold text-[#c9a84c] text-sm font-mono">Rp {detailOrder.total.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Status Konfirmasi:</span>
                  <span>{getStatusBadge(detailOrder.status)}</span>
                </div>
              </div>

              {/* Box Rekening Vault */}
              <div className="border border-dashed border-[#c9a84c]/40 bg-[#c9a84c]/5 p-5 rounded-xl text-center space-y-2">
                <p className="text-xs font-black text-[#c9a84c] uppercase tracking-[0.2em]">BANK MANDIRI VAULT</p>
                <p className="text-2xl font-mono font-black tracking-widest text-white">123-00-998877-6</p>
                <p className="text-xs text-white/70 font-medium">a/n PT SIPP Perabotan Nusantara</p>
              </div>
              
              <p className="text-[11px] text-center text-white/40 italic">
                *Mohon selesaikan transfer sesuai nominal agar sistem logistik mendeteksi pesanan Anda secara otomatis.
              </p>
            </div>

            <div className="modal-action mt-2">
              <button 
                onClick={() => setDetailOrder(null)} 
                className="btn bg-[#c9a84c] text-[#0d0b08] hover:bg-[#e8c97a] border-none font-bold rounded-xl btn-sm px-6 transition-all"
              >
                Tutup Dokumen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}