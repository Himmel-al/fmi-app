import { useState, useEffect } from "react";
<<<<<<< HEAD
import { User, Phone, MapPin, ShieldCheck, Sparkles } from "lucide-react";
=======
import axios from "../../api/axios"; // Pastikan path ke file axios.js Anda benar
>>>>>>> 72c10f18e93c636a004982ef69796af07a75a264

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

<<<<<<< HEAD
  const handleSave = () => {
    localStorage.setItem("customerProfile", JSON.stringify(profile));
    alert("Profil dan Alamat Utama Berhasil Diperbarui dalam Sistem Premium!");
=======
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
>>>>>>> 72c10f18e93c636a004982ef69796af07a75a264
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-base-content/60">
        Sedang memuat data profil...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto rounded-2xl bg-[#1a1610]/80 border border-[#c9a84c]/20 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl text-white overflow-hidden">
      {/* Aksentuasi Emas Atas Card */}
      <div className="h-2 bg-gradient-to-r from-[#c9a84c] via-[#e8c97a] to-[#c9a84c]" />
      
      <div className="p-6 md:p-8 space-y-6">
        {/* AVATAR & HEADER INFO */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#c9a84c]/10">
          <div className="avatar">
            <div className="w-24 h-24 rounded-full ring-2 ring-[#c9a84c] ring-offset-4 ring-offset-[#1a1610] shadow-xl">
              <img src="https://i.pravatar.cc/150?img=33" alt="Premium Client Avatar" />
            </div>
          </div>
<<<<<<< HEAD
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#c9a84c]">
              <ShieldCheck size={16} />
              <span className="text-[10px] tracking-[0.2em] font-bold uppercase">Verified Premium Member</span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-white tracking-wide">{profile.nama}</h2>
            <p className="text-sm text-white/50">{profile.email}</p>
=======
          <div>
            <h2 className="text-2xl font-bold text-base-content">{profile.name}</h2>
            <p className="text-sm text-base-content/60">{profile.email}</p>
>>>>>>> 72c10f18e93c636a004982ef69796af07a75a264
          </div>
        </div>

        {/* FORM INPUT SECTION */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#c9a84c] font-serif tracking-wider text-sm mb-2">
            <Sparkles size={14} />
            <span>Pengaturan Akun & Kredensial</span>
          </div>

<<<<<<< HEAD
          {/* INPUT NAMA */}
          <div className="form-control w-full">
            <label className="label-text mb-2 text-white/70 text-xs uppercase tracking-wider flex items-center gap-2">
              <User size={12} className="text-[#c9a84c]" /> Nama Lengkap
            </label>
            <input
              type="text"
              className="input w-full bg-[#0d0b08] text-white border border-[#c9a84c]/20 rounded-xl focus:border-[#c9a84c] focus:outline-none text-sm h-11 transition-all"
              value={profile.nama}
              onChange={(e) => setProfile({ ...profile, nama: e.target.value })}
            />
          </div>

          {/* INPUT HANDPHONE */}
          <div className="form-control w-full">
            <label className="label-text mb-2 text-white/70 text-xs uppercase tracking-wider flex items-center gap-2">
              <Phone size={12} className="text-[#c9a84c]" /> Nomor Handphone
            </label>
            <input
              type="text"
              className="input w-full bg-[#0d0b08] text-white border border-[#c9a84c]/20 rounded-xl focus:border-[#c9a84c] focus:outline-none text-sm h-11 transition-all"
              value={profile.hp}
              onChange={(e) => setProfile({ ...profile, hp: e.target.value })}
            />
          </div>

          {/* INPUT ALAMAT */}
          <div className="form-control w-full">
            <label className="label-text mb-2 text-white/70 text-xs uppercase tracking-wider flex items-center gap-2">
              <MapPin size={12} className="text-[#c9a84c]" /> Alamat Utama Pengiriman
            </label>
            <textarea
              className="textarea w-full bg-[#0d0b08] text-white border border-[#c9a84c]/20 rounded-xl focus:border-[#c9a84c] focus:outline-none text-sm p-3 transition-all resize-none"
              rows="3"
              value={profile.alamat}
              onChange={(e) => setProfile({ ...profile, alamat: e.target.value })}
            />
          </div>
        </div>

        {/* BUTTON ACTION */}
        <button 
          onClick={handleSave} 
          className="btn bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] text-[#0d0b08] hover:from-[#e8c97a] hover:to-[#c9a84c] border-none w-full font-bold rounded-xl shadow-lg shadow-[#c9a84c]/10 transition-all duration-300 h-12 mt-4"
        >
          Simpan Perubahan Akun
=======
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
>>>>>>> 72c10f18e93c636a004982ef69796af07a75a264
        </button>
      </div>
    </div>
  );
}