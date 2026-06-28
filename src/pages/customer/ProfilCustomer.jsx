export default function ProfilCustomer() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-5">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src="https://i.pravatar.cc/300" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Hafiz
              </h2>

              <p>hafiz@email.com</p>
            </div>
          </div>

          <div className="divider"></div>

          <input
            className="input input-bordered"
            value="Hafiz"
          />

          <input
            className="input input-bordered"
            value="08123456789"
          />

          <textarea
            className="textarea textarea-bordered"
            value="Jl. Soekarno Hatta"
          />

          <button className="btn btn-primary">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}