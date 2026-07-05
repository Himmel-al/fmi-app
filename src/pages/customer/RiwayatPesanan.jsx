import { useState, useEffect } from "react";

export default function RiwayatPesanan() {
  const [orders, setOrders] = useState([]);
  const [detailOrder, setDetailOrder] = useState(null); // State untuk modal detail rekening

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const getStatusBadge = (status) => {
    switch(status) {
      case "Selesai": return <span className="badge badge-success font-medium">Selesai</span>;
      case "Diproses": return <span className="badge badge-warning font-medium">Diproses</span>;
      case "Gagal": return <span className="badge badge-error font-medium">Gagal</span>;
      default: return <span className="badge badge-ghost">Pending</span>;
    }
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold tracking-tight border-b pb-3">Riwayat Pesanan Saya</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-base-200 rounded-2xl">
          <p className="text-lg font-medium text-base-content/60">Kamu belum pernah melakukan pemesanan.</p>
        </div>
      ) : (
        <div className="overflow-x-auto card bg-base-100 border border-base-200 shadow-sm">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200/50">
                <th>ID Order</th>
                <th>Tanggal Pembelian</th>
                <th>Item Perabotan</th>
                <th>Total Pembayaran</th>
                <th>Metode Bayar</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-base-200/30">
                  <td className="font-bold text-sm text-base-content/70">#TRX-{order.id}</td>
                  <td>{order.tanggal}</td>
                  <td>
                    <div className="max-w-xs space-y-1">
                      {order.items?.map((item, index) => (
                        <p key={index} className="text-xs truncate">
                          • {item.nama} <span className="text-base-content/60">({item.qty}x)</span>
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="font-semibold text-primary">Rp {order.total.toLocaleString("id-ID")}</td>
                  <td>
                    <div className="flex flex-col gap-1 items-start">
                      <span className="text-xs uppercase font-extrabold tracking-wide">
                        {order.metodeBayar === "transfer" ? "💳 Transfer Bank" : "🚚 COD"}
                      </span>
                      {order.metodeBayar === "transfer" && (
                        <button 
                          onClick={() => setDetailOrder(order)}
                          className="btn btn-xs btn-outline btn-info rounded-md"
                        >
                          Lihat Rekening
                        </button>
                      )}
                    </div>
                  </td>
                  <td>{getStatusBadge(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL DETAIL PEMBAYARAN TRANSFER */}
      {detailOrder && (
        <div className="modal modal-open">
          <div className="modal-box rounded-2xl border border-base-300 shadow-2xl bg-base-100 text-base-content">
            <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2">
              💳 Detail Rekening Pembayaran #TRX-{detailOrder.id}
            </h3>
            <div className="py-4 space-y-4">
              <div className="bg-base-200 p-4 rounded-xl space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Tagihan:</span>
                  <span className="font-bold text-primary">Rp {detailOrder.total.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status Pesanan:</span>
                  <span>{getStatusBadge(detailOrder.status)}</span>
                </div>
              </div>

              <div className="border border-dashed border-primary/40 bg-primary/5 p-4 rounded-xl text-center space-y-1">
                <p className="text-xs font-bold text-primary uppercase tracking-widest">BANK MANDIRI</p>
                <p className="text-2xl font-mono font-black tracking-wider text-base-content">123-00-998877-6</p>
                <p className="text-xs text-base-content/70">a/n PT SIPP Perabotan</p>
              </div>
              <p className="text-xs text-center text-base-content/50 italic">*Mohon lakukan transfer sesuai nominal tagihan Anda.</p>
            </div>
            <div className="modal-action">
              <button onClick={() => setDetailOrder(null)} className="btn btn-primary rounded-xl btn-sm">
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}