import { useState, useEffect } from "react";
import { User, Phone, MapPin, ShieldCheck, Sparkles } from "lucide-react";

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
    alert("Profil dan Alamat Utama Berhasil Diperbarui dalam Sistem Premium!");
  };

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
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#c9a84c]">
              <ShieldCheck size={16} />
              <span className="text-[10px] tracking-[0.2em] font-bold uppercase">Verified Premium Member</span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-white tracking-wide">{profile.nama}</h2>
            <p className="text-sm text-white/50">{profile.email}</p>
          </div>
        </div>

        {/* FORM INPUT SECTION */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#c9a84c] font-serif tracking-wider text-sm mb-2">
            <Sparkles size={14} />
            <span>Pengaturan Akun & Kredensial</span>
          </div>

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
        </button>
      </div>
    </div>
  );
}