import { useState, useEffect, useRef } from "react";
// PERBAIKAN: Dikembalikan ke '../../' karena jaraknya hanya 2 tingkat dari src
import axios from "../../api/axios"; 
import { Sparkles, User, Phone, MapPin, Save, Camera } from "lucide-react";

export default function ProfilCustomer() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [avatar, setAvatar] = useState(null); 
  const [avatarPreview, setAvatarPreview] = useState("https://i.pravatar.cc/150?img=33"); 
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token"); 
        
        // Method GET ini berhasil ke "/user"
        const response = await axios.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfile({
          name: response.data.name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          address: response.data.address || ""
        });

        if (response.data.avatar) {
          setAvatarPreview(response.data.avatar);
        }
      } catch (error) {
        console.error("Gagal memuat data profil dari database:", error);
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("phone", profile.phone || "");
      formData.append("address", profile.address || "");
      
      // Method Spoofing untuk Laravel
      formData.append("_method", "PUT"); 
      
      if (avatar) {
        formData.append("avatar", avatar);
      }

      // Endpoint disamakan dengan GET yaitu ke "/user"
      await axios.post("/user", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        }
      });

      localStorage.setItem("customerProfile", JSON.stringify(profile));
      alert("Profil dan Foto Berhasil Diperbarui!");
    } catch (error) {
      console.error("Gagal memperbarui profil:", error);
      if (error.response?.data?.message) {
        alert(`Gagal menyimpan: ${error.response.data.message}`);
      } else {
        alert("Terjadi kesalahan saat menyimpan perubahan ke server.");
      }
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
      <div className="h-1.5 bg-gradient-to-r from-[#c9a84c] via-[#e8c97a] to-[#c9a84c]" />
      
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#c9a84c]/10">
          
          <div 
            className="avatar group relative cursor-pointer" 
            onClick={() => fileInputRef.current.click()}
            title="Klik untuk ubah foto profil"
          >
            <div className="w-24 h-24 rounded-full ring-2 ring-[#c9a84c] ring-offset-4 ring-offset-[#1a1610] shadow-xl overflow-hidden relative">
              <img src={avatarPreview} alt="Premium Client Avatar" className="object-cover w-full h-full" />
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1">
                <Camera size={18} className="text-[#c9a84c]" />
                <span className="text-[10px] text-white/80 font-medium">Ubah Foto</span>
              </div>
            </div>

            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden" 
            />
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-2xl font-bold font-serif text-white tracking-wide">{profile.name || "Klien Premium"}</h2>
            <p className="text-sm text-white/40 font-mono">{profile.email || "email@berkelas.com"}</p>
          </div>
        </div>

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