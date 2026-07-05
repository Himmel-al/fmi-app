import { useState, useEffect } from "react";
import axios from "../../api/axios"; // Pastikan path ke file axios.js Anda benar

export default function ProfilCustomer() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [loading, setLoading] = useState(true);

  // 1. Ambil data profil dari API Laravel saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Mengambil token atau data auth jika Anda menyimpannya di localStorage saat login
        const token = localStorage.getItem("token"); 
        
        const response = await axios.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Set data sesuai dengan struktur model database Laravel
        setProfile({
          name: response.data.name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          address: response.data.address || ""
        });
      } catch (error) {
        console.error("Gagal memuat data profil dari database:", error);
        // Fallback ke localStorage jika API gagal atau belum siap
        const savedProfile = JSON.parse(localStorage.getItem("customerProfile"));
        if (savedProfile) {
          setProfile(savedProfile);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // 2. Simpan perubahan profil kembali ke database API Laravel
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Kirim request update ke endpoint profil Laravel (biasanya PUT atau POST)
      await axios.put("/user/profile", profile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Tetap cadangkan ke localStorage jika diperlukan
      localStorage.setItem("customerProfile", JSON.stringify(profile));
      alert("Profil dan Alamat Berhasil Diperbarui di Database!");
    } catch (error) {
      console.error("Gagal memperbarui profil:", error);
      alert("Terjadi kesalahan saat menyimpan perubahan ke server.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-base-content/60">
        Sedang memuat data profil...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto card bg-base-100 border border-base-200 shadow-sm">
      <div className="card-body gap-5">
        <div className="flex items-center gap-5">
          <div className="avatar">
            <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://i.pravatar.cc/150?img=33" alt="Avatar" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-base-content">{profile.name}</h2>
            <p className="text-sm text-base-content/60">{profile.email}</p>
          </div>
        </div>

        <div className="divider my-1">Pengaturan Akun</div>

        <div className="form-control">
          <label className="label-text mb-1 font-medium">Nama Lengkap</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>

        <div className="form-control">
          <label className="label-text mb-1 font-medium">Nomor Handphone</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
        </div>

        <div className="form-control">
          <label className="label-text mb-1 font-medium">Alamat Utama Pengiriman</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows="3"
            value={profile.address}
            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
          />
        </div>

        <button onClick={handleSave} className="btn btn-primary w-full mt-2">
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}