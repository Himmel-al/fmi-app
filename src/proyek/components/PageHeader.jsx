import { MdAdd, MdHome } from "react-icons/md";

export default function PageHeader() {
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-6 mb-2 bg-transparent">
            
            {/* Sisi Kiri: Judul & Breadcrumb */}
            <div id="pageheader-left" className="flex flex-col gap-1">
                <h1 id="page-title" className="text-3xl font-black text-slate-800 tracking-tight">
                    Dashboard
                </h1>
                
                <div id="breadcrumb-links" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-amber-600 transition-colors">
                        <MdHome className="text-base" />
                        <span id="breadcrumb-home">Utama</span>
                    </div>
                    <span id="breadcrumb-separator" className="text-slate-300">/</span>
                    <span id="breadcrumb-current" className="text-amber-500">
                        Statistik Pesanan
                    </span>
                </div>
            </div>

            {/* Sisi Kanan: Tombol Aksi */}
            <div id="action-button">
                <button 
                    id="add-button" 
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 transition-all text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-slate-200 active:scale-95"
                >
                    <MdAdd className="text-xl" />
                    <span>Tambah Data Pesanan</span>
                </button>
            </div>
            
        </div>
    );
}