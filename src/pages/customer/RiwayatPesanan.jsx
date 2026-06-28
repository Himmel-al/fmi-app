export default function RiwayatPesanan() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">
        Riwayat Pesanan
      </h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>01 Juli 2026</td>
              <td>Rp 2.500.000</td>
              <td>
                <div className="badge badge-success">
                  Selesai
                </div>
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>05 Juli 2026</td>
              <td>Rp 850.000</td>
              <td>
                <div className="badge badge-warning">
                  Diproses
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}