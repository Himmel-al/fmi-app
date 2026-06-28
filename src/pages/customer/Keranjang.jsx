export default function Keranjang() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">
        Keranjang Belanja
      </h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Produk</th>
              <th>Harga</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Sofa Minimalis</td>
              <td>Rp 2.500.000</td>
              <td>
                <input
                  type="number"
                  defaultValue="1"
                  className="input input-bordered w-20"
                />
              </td>
              <td>Rp 2.500.000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-right mt-6">
        <h2 className="text-2xl font-bold">
          Total : Rp 2.500.000
        </h2>

        <button className="btn btn-primary mt-3">
          Checkout
        </button>
      </div>
    </div>
  );
}