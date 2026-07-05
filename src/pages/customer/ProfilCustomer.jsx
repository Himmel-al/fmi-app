import { useState, useEffect } from "react";

export default function ProfilCustomer() {
  const [profile, setProfile] = useState({
    nama: "Hafiz",
    email: "hafiz@email.com",
    hp: "08123456789",
    alamat: "Jl. Soekarno Hatta No. 45"
  });

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("customerProfile"));
    if (savedProfile) setProfile(savedProfile);
  }, []);

  const handleSave = () => {
    localStorage.setItem("customerProfile", JSON.stringify(profile));
    alert("Profil dan Alamat Default Berhasil Diperbarui!");
  };

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
            <h2 className="text-2xl font-bold text-base-content">{profile.nama}</h2>
            <p className="text-sm text-base-content/60">{profile.email}</p>
          </div>
        </div>

        <div className="divider my-1">Pengaturan Akun</div>

        <div className="form-control">
          <label className="label-text mb-1 font-medium">Nama Lengkap</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={profile.nama}
            onChange={(e) => setProfile({ ...profile, nama: e.target.value })}
          />
        </div>

        <div className="form-control">
          <label className="label-text mb-1 font-medium">Nomor Handphone</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={profile.hp}
            onChange={(e) => setProfile({ ...profile, hp: e.target.value })}
          />
        </div>

        <div className="form-control">
          <label className="label-text mb-1 font-medium">Alamat Utama Pengiriman</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows="3"
            value={profile.alamat}
            onChange={(e) => setProfile({ ...profile, alamat: e.target.value })}
          />
        </div>

        <button onClick={handleSave} className="btn btn-primary w-full mt-2">
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}