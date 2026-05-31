import { useParams, Link } from "react-router-dom"
import PageHeader from "../components/PageHeader"

const stockItems = [
  {
    id: 1,
    sku: "SF-001",
    name: "Sofa Premium L-Shape",
    category: "Sofa",
    price: "Rp 8.500.000",
    stock: 12,
    status: "Aman",
    statusColor: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    icon: "🛋️",
    description: "Sofa premium berbentuk L dengan bahan berkualitas tinggi, cocok untuk ruang tamu modern.",
  },
  {
    id: 2,
    sku: "MJ-002",
    name: "Meja Makan Minimalis",
    category: "Meja",
    price: "Rp 3.200.000",
    stock: 8,
    status: "Aman",
    statusColor: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    icon: "🪵",
    description: "Meja makan dengan desain minimalis modern, terbuat dari kayu solid pilihan.",
  },
  {
    id: 3,
    sku: "LM-003",
    name: "Lemari Pakaian 4 Pintu",
    category: "Lemari",
    price: "Rp 5.400.000",
    stock: 5,
    status: "Aman",
    statusColor: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    icon: "🗄️",
    description: "Lemari pakaian 4 pintu dengan ruang penyimpanan luas, dilengkapi cermin di bagian dalam.",
  },
  {
    id: 4,
    sku: "TT-005",
    name: "Tempat Tidur Queen",
    category: "Kasur",
    price: "Rp 7.800.000",
    stock: 3,
    status: "Menipis",
    statusColor: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
    icon: "🛏️",
    description: "Tempat tidur ukuran queen dengan rangka kayu jati kokoh dan desain elegan.",
  },
  {
    id: 5,
    sku: "KR-008",
    name: "Kursi Makan Kayu Jati",
    category: "Kursi",
    price: "Rp 850.000",
    stock: 0,
    status: "Habis",
    statusColor: "bg-red-500/10 text-red-500 border border-red-500/20",
    icon: "🪑",
    description: "Kursi makan dari kayu jati asli, kuat dan tahan lama dengan finishing natural.",
  },
]

export default function ProductDetail() {
  const { id } = useParams()
  const product = stockItems.find((item) => item.id === parseInt(id))

  if (!product) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">❌</p>
          <p className="text-gray-400 text-lg mb-4">Produk tidak ditemukan.</p>
          <Link
            to="/stockgudang"
            className="text-emerald-400 hover:text-emerald-500 transition-colors"
          >
            ← Kembali ke Stock Gudang
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="text-white min-h-screen">
      <PageHeader
        title="Detail Produk"
        breadcrumb={[
          { label: "Dashboard" },
          { label: "Stock Gudang", href: "/stockgudang" },
          { label: product.name },
        ]}
      />

      <div className="p-6 md:p-8 max-w-4xl">

        {/* Tombol Kembali */}
        <Link
          to="/stockgudang"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors mb-6"
        >
          ← Kembali ke Stock Gudang
        </Link>

        {/* Card Utama */}
        <div className="bg-[#1a1c23] rounded-xl border border-gray-800 overflow-hidden shadow-lg">

          {/* Hero Banner */}
          <div className="bg-[#14151a] flex items-center justify-center h-48 border-b border-gray-800">
            <span className="text-8xl">{product.icon}</span>
          </div>

          <div className="p-6">
            {/* Nama & Status */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-gray-500 text-xs font-mono mb-1">{product.sku}</p>
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <p className="text-gray-400 text-sm mt-2">{product.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${product.statusColor}`}>
                {product.status}
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              <div className="bg-[#14151a] rounded-lg p-4 border border-gray-800">
                <p className="text-gray-500 text-xs mb-1">SKU</p>
                <p className="text-gray-200 text-sm font-mono font-medium">{product.sku}</p>
              </div>
              <div className="bg-[#14151a] rounded-lg p-4 border border-gray-800">
                <p className="text-gray-500 text-xs mb-1">Kategori</p>
                <p className="text-gray-200 text-sm font-medium">{product.category}</p>
              </div>
              <div className="bg-[#14151a] rounded-lg p-4 border border-gray-800">
                <p className="text-gray-500 text-xs mb-1">Jumlah Stok</p>
                <p className={`text-sm font-bold ${product.stock === 0 ? "text-red-500" : product.stock < 5 ? "text-amber-500" : "text-gray-200"}`}>
                  {product.stock} unit
                </p>
              </div>
            </div>

            {/* Harga */}
            <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
              <span className="text-gray-400 text-sm">Harga Satuan</span>
              <span className="text-emerald-400 text-xl font-bold">{product.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
