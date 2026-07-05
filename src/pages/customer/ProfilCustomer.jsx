import { useState, useEffect } from "react";
import axios from "../../api/axios"; // Pastikan path ke file axios.js Anda benar
import { Sparkles, User, Phone, MapPin, Save } from "lucide-react";

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
      <div className="text-center py-20 text-[#c9a84c] bg-[#1a1610] rounded-2xl border border-[#c9a84c]/10 max-w-2xl mx-auto animate-pulse">
        Sedang memuat data profil eksklusif...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto rounded-2xl bg-[#1a1610] border border-[#c9a84c]/20 shadow-[0_12px_40px_rgba(0,0,0,0.5)] text-white overflow-hidden">
      {/* Aksentuasi Emas Atas Card */}
      <div className="h-1.5 bg-gradient-to-r from-[#c9a84c] via-[#e8c97a] to-[#c9a84c]" />
      
      <div className="p-6 md:p-8 space-y-6">
        {/* AVATAR & HEADER INFO */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#c9a84c]/10">
          <div className="avatar">
            <div className="w-24 h-24 rounded-full ring-2 ring-[#c9a84c] ring-offset-4 ring-offset-[#1a1610] shadow-xl overflow-hidden">
              <img src="https://i.pravatar.cc/150?img=33" alt="Premium Client Avatar" className="object-cover" />
            </div>
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-2xl font-bold font-serif text-white tracking-wide">{profile.name || "Klien Premium"}</h2>
            <p className="text-sm text-white/40 font-mono">{profile.email || "email@berkelas.com"}</p>
          </div>
        </div>

        {/* FORM INPUT SECTION */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-[#c9a84c] font-serif tracking-wider text-xs uppercase font-bold mb-2">
            <Sparkles size={14} className="animate-pulse" />
            <span>Pengaturan Akun & Kredensial</span>
          </div>

          <div className="form-control w-full">
            <label className="label-text mb-1.5 font-medium text-white/70 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <User size={13} className="text-[#c9a84c]" /> Nama Lengkap
            </label>
            <input
              type="text"
              className="w-full bg-[#0d0b08] border border-[#c9a84c]/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c9a84c] transition-colors font-sans"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>

          <div className="form-control w-full">
            <label className="label-text mb-1.5 font-medium text-white/70 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Phone size={13} className="text-[#c9a84c]" /> Nomor Handphone
            </label>
            <input
              type="text"
              className="w-full bg-[#0d0b08] border border-[#c9a84c]/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c9a84c] transition-colors font-mono"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="Contoh: 081234567890"
            />
          </div>

          <div className="form-control w-full">
            <label className="label-text mb-1.5 font-medium text-white/70 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin size={13} className="text-[#c9a84c]" /> Alamat Utama Pengiriman
            </label>
            <textarea
              className="w-full bg-[#0d0b08] border border-[#c9a84c]/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c9a84c] transition-colors font-sans resize-none"
              rows="3"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              placeholder="Tulis alamat pengiriman lengkap beserta kode pos..."
            />
          </div>

          <button 
            onClick={handleSave} 
            className="w-full mt-4 h-12 bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] hover:from-[#e8c97a] hover:to-[#c9a84c] text-[#0d0b08] font-extrabold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 uppercase text-xs tracking-wider shadow-lg shadow-[#c9a84c]/10"
          >
            <Save size={15} />
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}