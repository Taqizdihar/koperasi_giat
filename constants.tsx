
import React from 'react';
import { 
  Home, 
  Info, 
  Briefcase, 
  Users, 
  Newspaper, 
  Phone,
  Wallet,
  TrendingUp,
  Award,
  ShieldCheck
} from 'lucide-react';
import { NavItem, ServiceItem } from './types';

export const NAV_LINKS: NavItem[] = [
  { label: 'Beranda', path: '/' },
  { label: 'Tentang Kami', path: '/tentang' },
  { label: 'Layanan & Produk', path: '/layanan' },
  { label: 'Informasi', path: '/informasi' },
  { label: 'Kontak', path: '/kontak' },
];

export const LATEST_INFO = [
  {
    id: 1,
    title: "Rapat Anggota Tahunan (RAT) 2026",
    date: "10 Mei 2026",
    category: "Berita",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Undangan resmi bagi seluruh anggota untuk menghadiri musyawarah tertinggi koperasi...",
    content: "Rapat Anggota Tahunan (RAT) 2026 Koperasi GIAT akan diselenggarakan pada akhir bulan ini. Acara ini merupakan momen krusial bagi seluruh anggota untuk berpartisipasi dalam menentukan arah strategis koperasi untuk satu tahun ke depan. Agenda utama meliputi laporan pertanggungjawaban pengurus, rencana kerja tahun buku berjalan, serta pembagian Sisa Hasil Usaha (SHU).\n\nKami mengundang kehadiran fisik maupun virtual demi terciptanya transparansi dan akuntabilitas. Dalam rapat tahun ini, kami juga akan memperkenalkan beberapa program baru yang fokus pada digitalisasi dan pemberdayaan komunitas hijau. Penting bagi setiap anggota untuk memahami bahwa suara Anda menentukan masa depan koperasi kita bersama.\n\nSelain itu, rapat kali ini akan memberikan penghargaan khusus bagi anggota paling aktif selama setahun terakhir sebagai bentuk apresiasi kami terhadap loyalitas Anda. Pastikan Anda telah terdaftar melalui aplikasi eKop untuk mendapatkan link akses zoom bagi yang hadir secara virtual."
  },
  {
    id: 2,
    title: "Peluncuran Fitur eKop GIAT Mobile",
    date: "05 Mei 2026",
    category: "Inovasi",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1974&auto=format&fit=crop",
    excerpt: "Kini akses simpan pinjam lebih mudah hanya dalam genggaman smartphone Anda.",
    content: "Setelah melalui tahap pengembangan intensif selama enam bulan, eKop GIAT Mobile resmi diluncurkan hari ini. Aplikasi ini dirancang untuk memberikan kemudahan bagi anggota dalam memantau saldo simpanan, mengajukan pinjaman darurat, hingga melakukan transaksi pembayaran rutin secara instan.\n\nDengan fitur keamanan biometrik, autentikasi dua faktor, dan enkripsi tingkat tinggi, kami menjamin keamanan data finansial seluruh anggota tetap terjaga dari ancaman siber. Aplikasi ini juga memungkinkan anggota untuk melakukan transfer antar rekening koperasi tanpa biaya admin, yang merupakan salah satu keuntungan eksklusif bagi pemegang akun aktif.\n\nKami terus berkomitmen untuk memperbarui aplikasi ini dengan fitur-fitur baru setiap bulannya berdasarkan masukan dari para pengguna. Saat ini, versi Android dan iOS sudah tersedia untuk diunduh di Google Play Store dan Apple App Store. Mari rasakan kemudahan bertransaksi di era ekonomi digital bersama GIAT."
  },
  {
    id: 3,
    title: "Program Pendampingan UMKM Binaan",
    date: "28 April 2026",
    category: "Sosial",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Kolaborasi bersama dalam meningkatkan kapasitas produksi bagi pelaku usaha kecil.",
    content: "Dalam upaya memperkuat ekonomi kerakyatan, Koperasi GIAT meluncurkan Program Pendampingan UMKM yang komprehensif. Program ini tidak hanya memberikan bantuan modal, tetapi juga mencakup pelatihan manajemen keuangan, strategi pemasaran digital yang efektif, hingga pembukaan akses ke pasar yang lebih luas di tingkat nasional.\n\nKami percaya bahwa pemberdayaan UMKM adalah kunci pertumbuhan ekonomi yang berkelanjutan di level akar rumput. Melalui kurikulum pelatihan yang disusun oleh para ahli industri, kami berharap para pelaku usaha binaan kami dapat naik kelas dalam kurun waktu satu tahun pendampingan. Sesi mentoring rutin akan diadakan setiap dua minggu sekali untuk memantau perkembangan dan memberikan solusi atas kendala yang dihadapi.\n\nHingga saat ini, sudah ada lebih dari 50 UMKM yang bergabung dalam batch pertama tahun ini. Kami mentargetkan untuk menjangkau lebih banyak pelaku usaha kreatif di daerah perdesaan agar tercipta pemerataan kesejahteraan ekonomi."
  },
  {
    id: 4,
    title: "Update Keanggotaan & Sertifikat Digital",
    date: "15 April 2026",
    category: "Layanan",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Sistem keanggotaan kini lebih transparan dengan pengenalan sertifikat digital berbasis QR.",
    content: "Transformasi digital terus kami gulirkan dengan penuh semangat. Kini setiap anggota aktif Koperasi GIAT akan mendapatkan Sertifikat Keanggotaan Digital yang dilengkapi dengan kode QR unik dan tanda tangan elektronik tersertifikasi. Sertifikat ini berfungsi sebagai identitas resmi keanggotaan yang sah secara hukum di lingkungan koperasi.\n\nSelain itu, sertifikat digital ini juga mempermudah akses anggota ke berbagai promo eksklusif dari mitra strategis kami seperti hotel, maskapai penerbangan, dan retail. Keamanan data pada sertifikat ini dijamin dengan teknologi blockchain untuk mencegah pemalsuan identitas. Anggota dapat dengan mudah mengunduh sertifikat mereka melalui dashboard portal masing-masing di aplikasi eKop.\n\nLangkah ini merupakan bagian dari komitmen kami untuk meminimalkan penggunaan kertas (paperless) dan mempercepat proses verifikasi identitas anggota saat melakukan pengajuan layanan finansial di kantor cabang."
  },
  {
    id: 5,
    title: "Workshop Literasi Finansial Anggota",
    date: "10 April 2026",
    category: "Edukasi",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Meningkatkan pemahaman mengenai pengelolaan investasi dan manajemen risiko keluarga.",
    content: "Pentingnya pemahaman finansial menjadi dasar utama diadakannya workshop berkala ini. Koperasi GIAT secara khusus mengundang pakar ekonomi dan perencana keuangan bersertifikat untuk berbagi tips cerdas mengenai cara mengelola keuangan rumah tangga di tengah tantangan ekonomi global yang dinamis.\n\nSelama sesi workshop, peserta diberikan simulasi langsung mengenai cara membedakan investasi aman dengan skema investasi bodong yang merugikan. Kami juga membahas mengenai manajemen risiko melalui dana darurat dan asuransi mikro yang tersedia di layanan kami. Literasi finansial bukan hanya soal menabung, tapi soal membuat uang bekerja untuk kesejahteraan masa depan keluarga.\n\nWorkshop ini diadakan secara tatap muka dengan protokol kesehatan dan juga disiarkan secara langsung agar bisa dinikmati oleh anggota di luar kota. Kami sangat senang melihat antusiasme anggota yang sangat besar dalam sesi tanya jawab interaktif."
  },
  {
    id: 6,
    title: "Pemanfaatan Teknologi Cloud di Koperasi",
    date: "02 April 2026",
    category: "Teknologi",
    image: "https://images.unsplash.com/photo-1451187530230-b23b995183ef?q=80&w=2069&auto=format&fit=crop",
    excerpt: "Modernisasi infrastruktur IT untuk menjamin ketersediaan layanan 24/7.",
    content: "Koperasi GIAT secara resmi telah mengadopsi teknologi cloud hybrid untuk meningkatkan stabilitas dan performa sistem informasi kami. Dengan migrasi ini, waktu henti layanan (downtime) dapat ditekan hingga minimum, sehingga anggota tetap dapat mengakses layanan eKop kapan saja dan di mana saja tanpa hambatan teknis yang berarti.\n\nInfrastruktur baru ini memberikan skalabilitas tinggi, yang berarti sistem kami mampu menangani lonjakan transaksi secara bersamaan dengan sangat mulus. Keamanan siber juga menjadi fokus utama dalam implementasi teknologi cloud ini, di mana kami menggunakan firewall tingkat perusahaan dan pemantauan ancaman secara real-time.\n\nKami berencana untuk terus mengeksplorasi pemanfaatan kecerdasan buatan (AI) di atas infrastruktur cloud ini untuk memberikan rekomendasi finansial yang lebih personal bagi setiap anggota. Modernisasi ini adalah bukti nyata bahwa koperasi mampu bersaing di barisan depan inovasi teknologi finansial nasional."
  }
];

export const PARTNERS = [
  { name: "Telkom University", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/d/d3/Telkom_University_Logo.svg/1200px-Telkom_University_Logo.svg.png" },
  { name: "Yayasan Pendidikan Telkom", logo: "https://ypt.or.id/wp-content/uploads/2021/04/Logo-YPT-Horizontal.png" },
  { name: "Bank Mandiri", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png" },
  { name: "Bank BCA", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1200px-Bank_Central_Asia.svg.png" },
  { name: "Ko+Lab", logo: "https://kolab.id/wp-content/uploads/2022/06/Logo-KoLab-Primary.png" },
  { name: "Mitra Strategis 1", logo: "https://placehold.co/200x100/e11d48/ffffff?text=MITRA+1" },
  { name: "Mitra Strategis 2", logo: "https://placehold.co/200x100/1e3a8a/ffffff?text=MITRA+2" }
];

export const RETAIL_PRODUCTS = [
  {
    id: 1,
    title: "GIAT Fotocopy",
    location: "Gedung Kuliah Umum",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop",
    description: "Layanan penggandaan dokumen, penjilidan, dan penyediaan alat tulis kantor terlengkap."
  },
  {
    id: 2,
    title: "GIAT Express",
    location: "Logistik & Pengiriman",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    description: "Layanan pengiriman paket cepat, aman, dan terpercaya untuk seluruh civitas akademika."
  },
  {
    id: 3,
    title: "GIAT Retail FIK",
    location: "Fakultas Industri Kreatif",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    description: "Toserba yang menyediakan kebutuhan harian mahasiswa dan staf di lingkungan FIK."
  },
  {
    id: 4,
    title: "GIAT Retail FEB",
    location: "Fakultas Ekonomi & Bisnis",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=2074&auto=format&fit=crop",
    description: "Mini market modern dengan beragam pilihan konsumsi dan kebutuhan perkantoran."
  }
];

export const ORGANIZATION_STRUCTURE = {
  pengawas: [
    { name: "Dr. Ir. Ahmad Sudrajat", role: "Ketua Pengawas", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" },
    { name: "Siti Aminah, M.Ak", role: "Anggota Pengawas", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" }
  ],
  pengurus: [
    { name: "H. Bambang Irawan", role: "Ketua Koperasi", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" },
    { name: "Dra. Elly Risman", role: "Bendahara", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" },
    { name: "Budi Santoso, S.T", role: "Sekretaris", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop" }
  ],
  manajemen: [
    { name: "Rizky Ramadhan, MBA", role: "Manager Koperasi", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" }
  ]
};

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Anggota (UMKM)",
    content: "Koperasi GIAT sangat membatu dalam permodalan usaha saya. Bunganya sangat bersahabat dan prosesnya profesional.",
    avatar: "https://i.pravatar.cc/150?u=budi"
  },
  {
    id: 2,
    name: "Siti Aminah",
    role: "Ibu Rumah Tangga",
    content: "Program simpanan berjangkanya sangat menguntungkan. Saya merasa aman menaruh masa depan keuangan keluarga di sini.",
    avatar: "https://i.pravatar.cc/150?u=siti"
  },
  {
    id: 3,
    name: "Andi Saputra",
    role: "Karyawan Swasta",
    content: "Aplikasi eKop GIAT mempermudah segalanya. Cek saldo dan pengajuan pinjaman jadi lebih cepat.",
    avatar: "https://i.pravatar.cc/150?u=andi"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    title: 'Simpan Pinjam',
    description: 'Solusi keuangan aman dan terpercaya dengan bunga kompetitif untuk kesejahteraan anggota.',
    icon: <Wallet className="w-8 h-8" />,
  },
  {
    title: 'Usaha Produktif',
    description: 'Pengembangan berbagai unit bisnis strategis yang memberikan nilai tambah bagi ekosistem koperasi.',
    icon: <TrendingUp className="w-8 h-8" />,
  },
  {
    title: 'Layanan Anggota',
    description: 'Fasilitas eksklusif dan kemudahan akses informasi bagi seluruh pemegang saham koperasi.',
    icon: <Award className="w-8 h-8" />,
  },
  {
    title: 'Pemberdayaan',
    description: 'Program pelatihan dan pendampingan untuk meningkatkan kapasitas ekonomi anggota.',
    icon: <ShieldCheck className="w-8 h-8" />,
  },
];

export const HERO_SLIDES = [
  {
    id: 1,
    title: "Membangun Ekonomi Bersama",
    subtitle: "Koperasi Pilihan Rakyat",
    description: "Koperasi GIAT menghadirkan solusi finansial cerdas berbasis semangat gotong royong untuk masa depan yang lebih baik.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    cta: "Gabung Jadi Anggota",
    link: "/keanggotaan"
  },
  {
    id: 2,
    title: "Layanan Simpan Pinjam Modern",
    subtitle: "Aman & Terpercaya",
    description: "Nikmati kemudahan akses permodalan dengan bunga kompetitif dan proses yang transparan bagi seluruh anggota.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
    cta: "Lihat Layanan",
    link: "/layanan"
  },
  {
    id: 3,
    title: "Unit Usaha Produktif",
    subtitle: "Investasi Strategis",
    description: "Kami mengembangkan berbagai unit bisnis kreatif untuk menciptakan nilai tambah dan bagi hasil yang maksimal bagi anggota.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
    cta: "Pelajari Unit Usaha",
    link: "/layanan"
  }
];
