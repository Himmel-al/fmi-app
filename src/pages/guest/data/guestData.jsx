export const products = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80",
    category: "Nasi",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Ayam Bakar Madu",
    price: 42000,
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c2?w=400&q=80",
    category: "Ayam",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Mie Ayam Bakso",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80",
    category: "Mie",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Soto Betawi",
    price: 38000,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
    category: "Soto",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Gado-Gado Jakarta",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80",
    category: "Sayur",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Es Teh Manis",
    price: 8000,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80",
    category: "Minuman",
    rating: 4.8,
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Andi Pratama",
    role: "Pelanggan Setia",
    review:
      "Makanannya enak banget! Nasi goreng spesialnya selalu bikin nagih. Pengiriman cepat dan masih panas waktu sampai.",
    avatar: "https://avatar-placeholder.iran.liara.run/100/1",
  },
  {
    id: 2,
    name: "Siti Rahayu",
    role: "Food Blogger",
    review:
      "Sedap adalah aplikasi pesan makanan terbaik yang pernah saya coba. Pilihan menunya beragam dan harganya sangat bersahabat!",
    avatar: "https://avatar-placeholder.iran.liara.run/100/2",
  },
  {
    id: 3,
    name: "Budi Santoso",
    role: "Karyawan Swasta",
    review:
      "Setiap hari makan siang pasti pesan lewat Sedap. Praktis, cepat, dan yang penting rasanya konsisten enak!",
    avatar: "https://avatar-placeholder.iran.liara.run/100/3",
  },
  {
    id: 4,
    name: "Maya Indah",
    role: "Ibu Rumah Tangga",
    review:
      "Suka banget dengan fitur tracking pesanannya. Bisa lihat makanan sudah sampai mana. Recommended banget!",
    avatar: "https://avatar-placeholder.iran.liara.run/100/4",
  },
  {
    id: 5,
    name: "Rizky Firmansyah",
    role: "Mahasiswa",
    review:
      "Harganya terjangkau untuk kantong mahasiswa. Porsinya juga besar! Sedap jadi andalan makan sehari-hari saya.",
    avatar: "https://avatar-placeholder.iran.liara.run/100/5",
  },
];

export const partners = ["GoPay", "OVO", "Dana", "BCA", "Mandiri", "BNI"];

export const formatRupiah = (n) => "Rp " + n.toLocaleString("id-ID");
