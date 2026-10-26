
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Wallet, 
  PiggyBank, 
  TrendingUp, 
  Store, 
  ShieldPlus, 
  TicketPercent, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  FileText,
  UserCheck,
  CreditCard,
  PhoneCall,
  Sparkles,
  MapPin,
  Printer,
  Package,
  ShoppingBag
} from 'lucide-react';
import { RETAIL_PRODUCTS } from '../constants';
import { fetchCmsPages } from '../services/dataService';
import { CmsPage, PageBlock } from '../types';

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  requirements: string[];
  steps: string[];
}

const SERVICE_LIST: ServiceDetail[] = [
  {
    id: "simpan-pinjam",
    title: "Simpan Pinjam",
    description: "Solusi keuangan aman dan terpercaya dengan bunga kompetitif untuk kesejahteraan anggota.",
    icon: <Wallet className="w-10 h-10" />,
    benefits: [
      "Bunga menurun yang ringan",
      "Proses pencairan maksimal 2 hari kerja",
      "Tenor fleksibel hingga 36 bulan",
      "Perlindungan asuransi pinjaman"
    ],
    requirements: [
      "Anggota aktif minimal 3 bulan",
      "Fotokopi KTP & Kartu Keluarga",
      "Slip gaji atau bukti penghasilan",
      "Mengisi formulir pengajuan"
    ],
    steps: [
      "Pengisian formulir online/offline",
      "Verifikasi data dan survei internal",
      "Persetujuan komite kredit",
      "Pencairan dana ke rekening anggota"
    ]
  },
  {
    id: "pengadaan",
    title: "Pengadaan",
    description: "Layanan pengadaan barang dan jasa untuk kebutuhan operasional dan proyek mitra kerja.",
    icon: <Package className="w-10 h-10" />,
    benefits: [
      "Harga kompetitif & transparan",
      "Kualitas barang terjamin",
      "Ketepatan waktu pengiriman",
      "Sistem pembayaran fleksibel"
    ],
    requirements: [
      "Profil perusahaan (untuk instansi)",
      "Surat Permohonan Pengadaan",
      "Spesifikasi barang/jasa",
      "Anggota aktif/Mitra resmi"
    ],
    steps: [
      "Pengajuan permintaan barang",
      "Pemberian penawaran harga",
      "Penerbitan PO (Purchase Order)",
      "Pengiriman dan serah terima"
    ]
  },
  {
    id: "ritel",
    title: "Ritel",
    description: "Pengelolaan unit usaha dagang dan toko untuk menyediakan kebutuhan harian civitas akademika.",
    icon: <Store className="w-10 h-10" />,
    benefits: [
      "Lokasi strategis di area kampus",
      "Harga khusus untuk anggota GIAT",
      "Produk lengkap & berkualitas",
      "Dukungan digital payment"
    ],
    requirements: [
      "Terbuka untuk umum",
      "Kartu Anggota (untuk diskon)",
      "Aplikasi eKop terpasang"
    ],
    steps: [
      "Kunjungi unit retail GIAT",
      "Pilih produk kebutuhan Anda",
      "Lakukan transaksi di kasir",
      "Gunakan voucher diskon anggota"
    ]
  },
  {
    id: "marketplace",
    title: "Marketplace",
    description: "Platform jual beli antar anggota untuk memperluas jangkauan pasar produk kreatif anggota.",
    icon: <ShoppingBag className="w-10 h-10" />,
    benefits: [
      "Akses ke ribuan pembeli potensial",
      "Sistem pembayaran aman",
      "Biaya layanan sangat rendah",
      "Fitur promosi produk unggulan"
    ],
    requirements: [
      "Pendaftaran akun penjual",
      "Foto produk berkualitas",
      "Deskripsi produk yang jelas",
      "Rekening bank aktif"
    ],
    steps: [
      "Buka fitur Marketplace di eKop",
      "Unggah produk dan harga",
      "Kelola pesanan masuk",
      "Konfirmasi pengiriman & pencairan"
    ]
  },
  {
    id: "fotocopy-atk",
    title: "Fotocopy ATK",
    description: "Layanan penggandaan dokumen dan penyediaan alat tulis kantor kualitas terbaik.",
    icon: <Printer className="w-10 h-10" />,
    benefits: [
      "Hasil cetak tajam & bersih",
      "Harga pelajar & mahasiswa",
      "Layanan jilid hard/soft cover",
      "Penyediaan ATK merek ternama"
    ],
    requirements: [
      "Terbuka untuk umum",
      "Kartu Anggota (untuk diskon)",
      "File siap cetak (untuk printing)"
    ],
    steps: [
      "Serahkan dokumen/file cetak",
      "Pilih spesifikasi pengerjaan",
      "Proses pengerjaan cepat",
      "Pembayaran dan serah terima"
    ]
  }
];

const FAQ_ITEMS = [
  {
    q: "Apakah harus jadi anggota untuk mengajukan layanan?",
    a: "Ya, sebagian besar layanan simpan pinjam dan pembiayaan kami eksklusif bagi anggota resmi Koperasi GIAT sebagai bagian dari prinsip gotong royong."
  },
  {
    q: "Berapa lama proses pengajuan pinjaman?",
    a: "Proses verifikasi hingga pencairan biasanya memakan waktu 1 hingga 3 hari kerja, tergantung pada kelengkapan dokumen dan nilai pengajuan."
  },
  {
    q: "Apa saja dokumen yang dibutuhkan?",
    a: "Dokumen dasar adalah KTP, Kartu Keluarga, dan bukti penghasilan (slip gaji/mutasi rekening). Untuk pembiayaan modal usaha, dibutuhkan bukti legalitas usaha minimal NIB."
  },
  {
    q: "Apakah ada biaya admin yang tersembunyi?",
    a: "Tidak ada. Kami sangat transparan mengenai biaya admin dan provisi yang akan dijelaskan di awal sebelum Anda menandatangani akad layanan."
  }
];

// Helper to dynamically get icons matching service title
const getServiceIcon = (title: string) => {
  const normalizedTitle = title.toLowerCase().trim();
  if (normalizedTitle.includes('simpan') || normalizedTitle.includes('pinjam')) {
    return <Wallet className="w-10 h-10" />;
  }
  if (normalizedTitle.includes('pengadaan')) {
    return <Package className="w-10 h-10" />;
  }
  if (normalizedTitle.includes('ritel') || normalizedTitle.includes('retail') || normalizedTitle.includes('toko')) {
    return <Store className="w-10 h-10" />;
  }
  if (normalizedTitle.includes('marketplace') || normalizedTitle.includes('pasar')) {
    return <ShoppingBag className="w-10 h-10" />;
  }
  if (normalizedTitle.includes('fotocopy') || normalizedTitle.includes('atk') || normalizedTitle.includes('print')) {
    return <Printer className="w-10 h-10" />;
  }
  return <Wallet className="w-10 h-10" />; // Default fallback
};

// Helper to parse double line breaks for description/benefits separation
const parseCmsServiceItem = (item: any) => {
  const parts = (item.description || '').split('\n\n');
  const mainDescription = parts[0] || '';
  const benefits = parts[1]
    ? parts[1].split('\n').map((line: string) => line.trim()).filter((line: string) => line.length > 0)
    : [];
  return {
    title: item.title || '',
    description: mainDescription,
    benefits: benefits
  };
};

const Services: React.FC = () => {
  const [pages, setPages] = useState<CmsPage[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCmsPages();
      if (data) setPages(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (loading) {
    return (
      <div className="h-screen bg-[#020617] flex flex-col items-center justify-center space-y-6">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-16 h-16 border-4 border-t-giat-red border-r-transparent border-b-white border-l-transparent rounded-full shadow-2xl shadow-giat-red/20"
        />
        <div className="flex flex-col items-center space-y-1">
          <span className="text-2xl font-black tracking-tighter text-white">GIAT</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Loading CMS...</span>
        </div>
      </div>
    );
  }

  const servicesPagesArray = pages && Array.isArray(pages) ? pages : [];
  const servicesPage = servicesPagesArray.find(p => p && (p.slug === 'layanan-produk' || p.slug === 'layanan')) || servicesPagesArray[0];
  
  // Find all blocks of type 'cta-banner'
  const ctaBlocks = servicesPage?.content?.filter((block: PageBlock) => block && block.type === 'cta-banner') || [];
  
  // Hero block is the first cta-banner
  const heroBlock = ctaBlocks[0];

  // Final CTA block is the second cta-banner (or has different ID)
  const finalCtaBlock = ctaBlocks.find((block: PageBlock) => block.id !== heroBlock?.id) || ctaBlocks[1];
  
  // Find all blocks of type 'features'
  const featuresBlocks = servicesPage?.content?.filter((block: PageBlock) => block && block.type === 'features') || [];
  
  // Main features block (Layanan & Produk Unggulan)
  const mainFeaturesBlock = featuresBlocks.find(
    (block: PageBlock) => !block.data?.title?.toLowerCase().includes('retail')
  ) || featuresBlocks[0];

  // Retail features block (Produk Retail GIAT)
  const retailFeaturesBlock = featuresBlocks.find(
    (block: PageBlock) => block.data?.title?.toLowerCase().includes('retail')
  ) || featuresBlocks[1];

  // Extract Hero (cta-banner) details safely
  const heroHeadline = heroBlock?.data?.headline || "Layanan & Produk GIAT";
  const heroSubHeadline = heroBlock?.data?.sub_headline || "Kami menghadirkan ekosistem ekonomi gotong royong melalui akses simpan pinjam yang adil, pembiayaan modal usaha produktif, tabungan masa depan, serta program pemberdayaan UMKM, perlindungan asuransi, dan berbagai produk ekonomi kreatif bagi seluruh anggota.";
  const heroBgColor = heroBlock?.data?.background_color || "#153B8F";
  const heroBgImageUrl = heroBlock?.data?.background_image_url || null;
  const heroButtonText = heroBlock?.data?.button_text || "Konsultasi Sekarang";
  const heroButtonLink = heroBlock?.data?.button_link || "/kontak";

  // Extract Final CTA details safely
  const finalCtaHeadline = finalCtaBlock?.data?.headline || "Wujudkan Impian Anda";
  const finalCtaSubHeadline = finalCtaBlock?.data?.sub_headline || "Siap Memulai Langkah Bersama Koperasi GIAT?";
  const finalCtaDescription = finalCtaBlock?.data?.description || "Ribuan anggota telah merasakan manfaat nyata dari sistem gotong royong kami. Jadilah bagian dari perubahan ekonomi yang lebih adil and produktif.";
  const finalCtaButtonText = finalCtaBlock?.data?.button_text || "Daftar Anggota";
  const finalCtaButtonLink = finalCtaBlock?.data?.button_link || "/keanggotaan";
  const finalCtaBgColor = finalCtaBlock?.data?.background_color || "#E11D48";
  const finalCtaBgImageUrl = finalCtaBlock?.data?.background_image_url || null;

  // Extract features details safely
  const featuresTitle = mainFeaturesBlock?.data?.title || "Layanan & Produk Unggulan";
  const featuresSubtitle = mainFeaturesBlock?.data?.subtitle || "Portofolio Kami";

  // Build the dynamic services list using features block items, with fallback to local SERVICE_LIST
  const dynamicServices = mainFeaturesBlock?.data?.items && Array.isArray(mainFeaturesBlock.data.items) && mainFeaturesBlock.data.items.length > 0
    ? mainFeaturesBlock.data.items.map((item: any, idx: number) => {
        const parsed = parseCmsServiceItem(item);
        return {
          id: `cms-service-${idx}`,
          title: parsed.title,
          description: parsed.description,
          icon: getServiceIcon(parsed.title),
          benefits: parsed.benefits,
          requirements: SERVICE_LIST[idx % SERVICE_LIST.length]?.requirements || [],
          steps: SERVICE_LIST[idx % SERVICE_LIST.length]?.steps || []
        };
      })
    : SERVICE_LIST;

  // Extract retail features details safely
  const retailTitle = retailFeaturesBlock?.data?.title || "Produk Retail GIAT";
  const retailSubtitle = retailFeaturesBlock?.data?.subtitle || "Koperasi GIAT mengelola berbagai unit usaha retail untuk melayani kebutuhan civitas akademika dan masyarakat luas.";

  // Build the dynamic retail products list using the retail features block items, with fallback to local RETAIL_PRODUCTS
  const dynamicRetailProducts = retailFeaturesBlock?.data?.items && Array.isArray(retailFeaturesBlock.data.items) && retailFeaturesBlock.data.items.length > 0
    ? retailFeaturesBlock.data.items.map((item: any, idx: number) => {
        const getFallback = (title: string, index: number) => {
          const normalized = (title || '').toLowerCase().trim();
          const found = RETAIL_PRODUCTS.find(p => p.title.toLowerCase().trim() === normalized);
          return found || RETAIL_PRODUCTS[index % RETAIL_PRODUCTS.length];
        };
        const fallback = getFallback(item.title, idx);
        
        return {
          id: `cms-retail-${idx}`,
          title: item.title || fallback.title,
          description: item.description || fallback.description,
          location: item.alamat || item.location || fallback.location,
          image: item.icon_url || fallback.image,
          link: item.link_url || '/kontak',
          labels: item.labels || []
        };
      })
    : RETAIL_PRODUCTS;

  // FAQ block from CMS
  const faqBlock = servicesPage?.content?.find((block: PageBlock) => block && block.type === 'faq');
  const faqTitle = faqBlock?.data?.title || "Pertanyaan Umum";
  const faqSubtitle = faqBlock?.data?.subtitle || "Hal-hal yang sering ditanyakan oleh anggota mengenai layanan kami.";
  const dynamicFaqs = faqBlock?.data?.items && Array.isArray(faqBlock.data.items) && faqBlock.data.items.length > 0
    ? faqBlock.data.items.map((item: any) => ({
        q: item.question || item.q || '',
        a: item.answer || item.a || ''
      }))
    : FAQ_ITEMS;

  return (
    <div className="bg-white">
      {/* Hero Section - Explicitly centered using flex flex-col items-center */}
      <section 
        style={{ 
          backgroundColor: heroBgImageUrl ? undefined : heroBgColor,
          backgroundImage: heroBgImageUrl ? `url(${heroBgImageUrl})` : undefined,
          backgroundSize: heroBgImageUrl ? 'cover' : undefined,
          backgroundPosition: heroBgImageUrl ? 'center' : undefined,
        }}
        className="text-white pt-[103px] pb-[103px] md:pt-[95px] md:pb-[95px] relative overflow-hidden"
      >
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        
        {/* Glow Effects for depth */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[140px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-giat-red/10 rounded-full blur-[120px] -ml-48 -mb-48"></div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          {/* Badge Label */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full mb-8 shadow-sm">
            <Sparkles size={16} className="text-giat-red" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Solusi Terpadu</span>
          </div>

          {/* Large Focused Title */}
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom duration-1000 max-w-4xl">
            {heroHeadline}
          </h1>

          {/* Red Underline Accent */}
          <div className="w-24 h-1.5 bg-giat-red rounded-full mb-10 shadow-lg shadow-red-500/40 animate-in zoom-in duration-1000 delay-300"></div>

          {/* Professional & Complete Subtitle */}
          <p className="text-blue-100/70 max-w-4xl text-lg md:text-xl font-medium leading-relaxed mb-12 px-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
            {heroSubHeadline}
          </p>

          {/* Prominent CTA Button */}
          <div className="animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
            <Link 
              to={heroButtonLink} 
              className="group relative bg-giat-red text-white px-12 py-5 rounded-2xl font-black text-lg flex items-center shadow-2xl shadow-red-500/50 hover:shadow-red-500/70 transition-all duration-300 hover:-translate-y-1.5 active:scale-95"
            >
              <PhoneCall className="mr-3 w-6 h-6 transition-transform group-hover:rotate-12" />
              <span>{heroButtonText}</span>
              <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Grid Layanan Section */}
      <section className="py-24 bg-white relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-giat-red font-bold tracking-widest uppercase text-xs md:text-sm">{featuresSubtitle}</h2>
            <h3 className="text-2xl md:text-4xl font-black text-giat-blue">{featuresTitle}</h3>
            <div className="w-16 h-1 bg-gray-200 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dynamicServices.map((service) => (
              <div key={service.id} className="group p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 focus-within:ring-2 focus-within:ring-giat-red/20 outline-none">
                <div className="mb-6 text-giat-red bg-red-50 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:bg-giat-red group-hover:text-white transition-all duration-300 shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black text-giat-blue mb-4">{service.title}</h3>
                <p className="text-gray-500 mb-8 leading-relaxed text-sm md:text-base font-medium font-bold">
                  {service.description}
                </p>
                <div className="space-y-3 mb-8">
                  {service.benefits.slice(0, 2).map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-gray-400">
                      <CheckCircle2 size={14} className="text-giat-red" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                <Link 
                  to="/kontak"
                  className="w-full py-4 bg-gray-50 text-giat-blue rounded-xl font-black text-sm flex items-center justify-center group-hover:bg-giat-blue group-hover:text-white transition-all"
                >
                  Ajukan Sekarang <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produk Retail GIAT Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-giat-red font-bold tracking-widest uppercase text-xs md:text-sm">Unit Bisnis Terpadu</h2>
              <h3 className="text-2xl md:text-4xl font-black text-giat-blue">{retailTitle}</h3>
              <div className="w-16 h-1 bg-giat-red rounded-full"></div>
            </div>
            <p className="text-gray-500 font-medium max-w-md">
              {retailSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dynamicRetailProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
                {/* Image Wrap */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-giat-blue/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                    {(product as any).labels && (product as any).labels.length > 0 ? (
                      (product as any).labels.slice(0, 1).map((label: string, i: number) => (
                        <span key={i} className="bg-white/90 backdrop-blur-md text-giat-blue px-4 py-1.5 rounded-full text-xs font-black shadow-lg">
                          {label}
                        </span>
                      ))
                    ) : (
                      <span className="bg-white/90 backdrop-blur-md text-giat-blue px-4 py-1.5 rounded-full text-xs font-black shadow-lg">
                        Retail Unit
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-4 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-giat-red">
                    <MapPin size={16} />
                    <span className="text-[10px] uppercase font-black tracking-widest">{product.location}</span>
                  </div>
                  <h4 className="text-2xl font-black text-giat-blue">{product.title}</h4>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed flex-grow">
                    {product.description}
                  </p>
                  <div className="pt-6 mt-auto border-t border-gray-50">
                    <Link to={product.link} className="inline-flex items-center text-giat-blue font-black text-sm group/btn">
                      Kunjungi Toko 
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16 space-y-4">
            <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-giat-red" />
            </div>
            <h2 className="text-3xl font-black text-giat-blue">{faqTitle}</h2>
            <p className="text-gray-500 font-medium">{faqSubtitle}</p>
          </div>

          <div className="space-y-4">
            {dynamicFaqs.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-giat-blue text-lg">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="text-giat-red shrink-0 ml-4" /> : <ChevronDown className="text-gray-400 shrink-0 ml-4" />}
                </button>
                {openFaq === i && (
                  <div className="p-6 pt-0 text-gray-600 bg-gray-50/30 animate-in slide-in-from-top duration-300 font-medium leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div 
            style={{ 
              backgroundColor: finalCtaBgImageUrl ? undefined : finalCtaBgColor,
              backgroundImage: finalCtaBgImageUrl ? `url(${finalCtaBgImageUrl})` : undefined,
              backgroundSize: finalCtaBgImageUrl ? 'cover' : undefined,
              backgroundPosition: finalCtaBgImageUrl ? 'center' : undefined,
            }}
            className="rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-12">
              <div className="inline-flex bg-white/10 border border-white/20 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest">{finalCtaHeadline}</div>
              <h2 className="text-2xl md:text-4xl font-black leading-tight">{finalCtaSubHeadline}</h2>
              <p className="text-xl text-red-50/90 leading-relaxed font-medium">
                {finalCtaDescription}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
                <Link to="/keanggotaan" className="bg-white text-giat-red px-12 py-5 rounded-2xl font-black text-xl hover:bg-gray-50 transition-all shadow-2xl hover:scale-105 active:scale-95">
                  {finalCtaButtonText}
                </Link>
                <Link to="/kontak" className="border-2 border-white/30 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
