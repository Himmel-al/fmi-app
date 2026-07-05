import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function Keranjang() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map((item) => (item.id === id ? { ...item, qty: newQty } : item));
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.harga * item.qty, 0);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight border-b pb-3">Keranjang Belanja</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 card bg-base-200">
          <p className="text-lg text-base-content/60 mb-4">Keranjang belanja kamu masih kosong.</p>
          <button onClick={() => navigate("/customer/produk")} className="btn btn-primary btn-sm mx-auto w-fit">Belanja Sekarang</button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 overflow-x-auto card bg-base-100 border border-base-200 shadow-sm p-4">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Harga</th>
                  <th className="text-center">Kuantitas</th>
                  <th>Subtotal</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="hover:bg-base-200/40">
                    <td>
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.nama} className="w-12 h-12 object-cover rounded-md bg-base-200" />
                        <span className="font-semibold text-sm line-clamp-1">{item.nama}</span>
                      </div>
                    </td>
                    <td>Rp {item.harga.toLocaleString("id-ID")}</td>
                    <td>
                      <div className="flex justify-center items-center gap-1">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="btn btn-xs btn-outline">-</button>
                        <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="btn btn-xs btn-outline">+</button>
                      </div>
                    </td>
                    <td className="font-semibold text-primary">Rp {(item.harga * item.qty).toLocaleString("id-ID")}</td>
                    <td>
                      <button onClick={() => removeItem(item.id)} className="btn btn-ghost btn-xs text-error">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card bg-base-100 border border-base-200 shadow-sm p-6 space-y-4">
            <h3 className="text-xl font-bold">Ringkasan Belanja</h3>
            <div className="flex justify-between border-b pb-2 text-sm">
              <span>Total Item</span>
              <span className="font-semibold">{cartItems.reduce((acc, i) => acc + i.qty, 0)} unit</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-md font-medium">Total Harga</span>
              <span className="text-2xl font-bold text-primary">Rp {calculateTotal().toLocaleString("id-ID")}</span>
            </div>
            <button onClick={() => navigate("/customer/checkout")} className="btn btn-primary w-full mt-2">Lanjut Ke Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}