export default function Checkout() {
  return (
    <div className="max-w-2xl mx-auto card bg-base-100 shadow">
      <div className="card-body">
        <h1 className="card-title text-3xl">
          Checkout
        </h1>

        <input
          className="input input-bordered"
          placeholder="Nama Penerima"
        />

        <input
          className="input input-bordered"
          placeholder="Nomor HP"
        />

        <textarea
          className="textarea textarea-bordered"
          placeholder="Alamat Lengkap"
        />

        <select className="select select-bordered">
          <option>Transfer Bank</option>
          <option>E-Wallet</option>
          <option>COD</option>
        </select>

        <button className="btn btn-primary">
          Buat Pesanan
        </button>
      </div>
    </div>
  );
}