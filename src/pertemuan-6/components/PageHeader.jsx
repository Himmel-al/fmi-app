export default function PageHeader() {
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-6 mb-2">
            
            {/* Sisi Kiri: Judul & Breadcrumb */}
            <div id="pageheader-left" className="flex flex-col gap-1">
                <h1 id="page-title" className="text-3xl font-bold text-teks">
                    Dashboard
                </h1>
                
                <div id="breadcrumb-links" className="flex items-center gap-2 text-sm font-medium text-teks-samping">
                    <span id="breadcrumb-home" className="cursor-pointer hover:text-hijau transition-colors">
                        Dashboard
                    </span>
                    <span id="breadcrumb-separator">/</span>
                    <span id="breadcrumb-current" className="text-hijau">
                        Order List
                    </span>
                </div>
            </div>

            {/* Sisi Kanan: Tombol */}
            <div id="action-button">
                <button 
                    id="add-button" 
                    className="bg-hijau hover:bg-green-600 transition-colors text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm"
                >
                    Add Button
                </button>
            </div>
            
        </div>
    );
}