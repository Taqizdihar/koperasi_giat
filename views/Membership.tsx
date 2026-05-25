import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  UserPlus, 
  ClipboardCheck, 
  Wallet, 
  UserCheck, 
  Quote, 
  Users, 
  Heart, 
  Star,
  Sparkles
} from 'lucide-react';
import { MemberProfile, Testimonial, CmsPage, PageBlock } from '../types';
import { fetchCmsPages } from '../services/dataService';

const MEMBERS: MemberProfile[] = [
  { name: "Bpk. Hendra", role: "Ketua Pengurus", quote: "Kepercayaan anggota adalah amanah terbesar kami.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" },
  { name: "Ibu Siti", role: "Anggota (Mitra UMKM)", quote: "Berkat GIAT, warung kelontong saya kini punya cabang.", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop" },
  { name: "Andi Wijaya", role: "Anggota Muda", quote: "Simpanan di GIAT bikin masa depan terasa lebih aman.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop" },
  { name: "Ibu Ratna", role: "Sekretaris Koperasi", quote: "Transparansi adalah kunci gotong royong modern.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop" },
  { name: "Bpk. Yusuf", role: "Mitra Petani", quote: "Pinjaman modal GIAT cair cepat saat musim tanam.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop" },
  { name: "Maya Sastra", role: "Anggota Kreatif", quote: "Komunitasnya hangat, terasa seperti keluarga sendiri.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop" },
  { name: "Bpk. Budi", role: "Dewan Pengawas", quote: "Kami memastikan setiap rupiah anggota aman dan produktif.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop" },
  { name: "Ibu Lani", role: "Anggota Senior", quote: "20 tahun bersama GIAT, saya saksi nyata pertumbuhannya.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop" },
];

const TESTIMONIALS: Testimonial[] = [
  { name: "Deni Saputra", city: "Bandung", content: "Proses pendaftaran sangat mudah. Admin responsif dan menjelaskan semua manfaat dengan sangat detail.", image: "https://i.pravatar.cc/150?u=deni" },
  { name: "Linda Kusuma", city: "Surabaya", content: "SHU yang dibagikan setiap tahun sangat membantu tambahan tabungan keluarga saya. Sangat terpercaya!", image: "https://i.pravatar.cc/150?u=linda" },
  { name: "Eko Prasetyo", city: "Yogyakarta", content: "Bukan sekadar simpan pinjam, pelatihan UKM dari GIAT benar-benar mengubah cara saya berbisnis.", image: "https://i.pravatar.cc/150?u=eko" },
];

// Helper function to parse rich text content for Membership description
const parseDescriptionRichText = (htmlContent: string) => {
  if (!htmlContent) return '';
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    return doc.body.textContent || '';
  } catch (e) {
    return htmlContent.replace(/<[^>]*>/g, '').trim();
  }
};

interface SyaratParsed {
  title: string;
  rows: { label: string; value: string }[];
  footer: string;
}

const parseSyaratRichText = (htmlContent: string): SyaratParsed => {
  const defaultResult: SyaratParsed = {
    title: "Syarat Bergabung",
    rows: [
      { label: "Dokumen", value: "KTP & NPWP" },
      { label: "Usia", value: "Min. 17 Tahun" },
      { label: "Setoran Pokok", value: "Rp 100.000" },
      { label: "Setoran Wajib", value: "Rp 50.000/bln" },
    ],
    footer: "Data Anda aman bersama kami dan dijamin kerahasiaannya."
  };

  if (!htmlContent) return defaultResult;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // 1. Try to find the title. Look for headings (h1, h2, h3, h4, h5, h6).
    let title = "Syarat Bergabung";
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length > 0) {
      title = headings[0].textContent?.trim() || title;
      headings[0].remove();
    } else {
      // Check if the first child is just text
      const firstChild = doc.body.firstChild;
      if (firstChild && firstChild.nodeType === Node.TEXT_NODE && firstChild.textContent?.trim()) {
        title = firstChild.textContent.trim();
        firstChild.remove();
      }
    }

    // 2. Find the footer. Look for em or i tags, or text containing "aman" or "rahasia".
    let footer = "Data Anda aman bersama kami dan dijamin kerahasiaannya.";
    const ems = doc.querySelectorAll('em, i');
    if (ems.length > 0) {
      footer = ems[ems.length - 1].textContent?.trim() || footer;
      ems[ems.length - 1].remove();
    }

    // 3. Parse rows using strong tags or splitting
    const rows: { label: string; value: string }[] = [];
    const strongs = doc.querySelectorAll('strong, b');
    if (strongs.length > 0) {
      strongs.forEach(strong => {
        const value = strong.textContent?.trim() || '';
        let label = '';
        let prev = strong.previousSibling;
        while (prev) {
          if (prev.nodeType === Node.TEXT_NODE) {
            label = prev.textContent + label;
          } else if (prev.nodeType === Node.ELEMENT_NODE && prev.nodeName !== 'BR') {
            label = prev.textContent + label;
          }
          prev = prev.previousSibling;
        }

        label = label.replace(/[\r\n\t]+/g, ' ').trim();
        if (!label && strong.parentElement) {
          const parentText = strong.parentElement.textContent || '';
          const strongText = strong.textContent || '';
          const idx = parentText.indexOf(strongText);
          if (idx > 0) {
            label = parentText.substring(0, idx).trim();
          }
        }

        // Clean punctuation from label
        label = label.replace(/^[:\-\s\u2022]+|[:\-\s]+$/g, '').trim();

        if (label && value) {
          rows.push({ label, value });
        }
      });
    }

    if (rows.length === 0) {
      const text = doc.body.textContent || '';
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      lines.forEach(line => {
        if (line.toLowerCase() === title.toLowerCase()) return;
        if (line.toLowerCase() === footer.toLowerCase()) return;

        const match = line.match(/^([^:\-\d]+)[:\-\s]+(.*)$/);
        if (match) {
          rows.push({ label: match[1].trim(), value: match[2].trim() });
        } else {
          const words = line.split(/\s+/);
          if (words.length > 1) {
            const label = words.slice(0, Math.ceil(words.length / 2)).join(' ');
            const value = words.slice(Math.ceil(words.length / 2)).join(' ');
            rows.push({ label, value });
          }
        }
      });
    }

    return {
      title: title || defaultResult.title,
      rows: rows.length > 0 ? rows : defaultResult.rows,
      footer: footer || defaultResult.footer
    };
  } catch (e) {
    console.error("Error parsing syarat rich text:", e);
    return defaultResult;
  }
};

const getValueColorClass = (label: string, value: string): string => {
  const lowerLabel = (label || '').toLowerCase();
  const lowerValue = (value || '').toLowerCase();
  if (
    lowerLabel.includes('setoran') || 
    lowerLabel.includes('pokok') || 
    lowerLabel.includes('wajib') || 
    lowerLabel.includes('biaya') ||
    lowerValue.includes('rp') || 
    lowerValue.includes('rupiah')
  ) {
    return 'text-giat-red';
  }
  return 'text-giat-blue';
};


const Membership: React.FC = () => {
  const [pages, setPages] = useState<CmsPage[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCmsPages();
      if (data) setPages(data);
      setLoading(false);
    };
    loadData();
  }, []);

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

  const membershipPage = pages?.find(p => p.slug === 'keanggotaan') || pages?.[0];
  const heroBlock = membershipPage?.content?.find((block: PageBlock) => block.type === 'hero');
  const richTextBlocks = membershipPage?.content?.filter((block: PageBlock) => block.type === 'rich-text') || [];
  const teamBlock = membershipPage?.content?.find((block: PageBlock) => block.type === 'team');

  const heroHeadline = heroBlock?.data?.headline || "Keluarga Besar GIAT";
  const heroSubHeadline = heroBlock?.data?.sub_headline || "Koperasi Ini Dibangun oleh Kita";
  
  // Find description (first rich-text block)
  const descBlock = richTextBlocks[0];
  const description = descBlock?.data?.content ? parseDescriptionRichText(descBlock.data.content) : "Koperasi GIAT bukan sekadar institusi keuangan, melainkan komunitas nyata di mana setiap wajah memiliki cerita dan peran penting.";

  // Find syarat block: either the one containing "syarat" or the second rich-text block
  const syaratBlock = richTextBlocks.find(block => block.data?.content?.toLowerCase().includes('syarat')) || richTextBlocks[1];
  const parsedSyarat = parseSyaratRichText(syaratBlock?.data?.content || '');

  const teamTitle = teamBlock?.data?.title || "Wajah-Wajah GIAT";
  const teamSubtitle = teamBlock?.data?.subtitle || "Kenali lebih dekat orang-orang hebat yang bersama-sama menggerakkan roda ekonomi gotong royong di Koperasi GIAT.";

  // Helper to resolve fallback image and quote for members matching by name or index
  const getMemberFallback = (name: string, index: number) => {
    const normalized = (name || '').toLowerCase().trim();
    const found = MEMBERS.find(m => m.name.toLowerCase().trim() === normalized);
    return found || MEMBERS[index % MEMBERS.length];
  };

  const dynamicMembers = teamBlock?.data?.members && Array.isArray(teamBlock.data.members) && teamBlock.data.members.length > 0
    ? teamBlock.data.members.map((member: any, idx: number) => {
        const fallback = getMemberFallback(member.name, idx);
        return {
          name: member.name || fallback.name,
          role: member.role || fallback.role,
          quote: member.bio || "", // Leave empty if not added in CMS as requested
          image: member.photo_url || fallback.image
        };
      })
    : MEMBERS;

  // Helper to resolve fallback image and city for testimonials matching by name or index
  const getTestimonialFallback = (name: string, index: number) => {
    const normalized = (name || '').toLowerCase().trim();
    const found = TESTIMONIALS.find(t => normalized.includes(t.name.toLowerCase().trim()) || t.name.toLowerCase().trim().includes(normalized));
    return found || TESTIMONIALS[index % TESTIMONIALS.length];
  };

  // Helper to format CTA headline (highlights Keluarga GIAT in red)
  const formatCtaHeadline = (headline: string) => {
    if (!headline) return null;
    const regex = /(Keluarga GIAT)/i;
    const parts = headline.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? <span key={i} className="text-giat-red">{part}</span> : part
    );
  };

  // Features block for Why Join Us
  const whyJoinBlock = membershipPage?.content?.find((block: PageBlock) => block.type === 'features');
  const whyJoinTitle = whyJoinBlock?.data?.title || "Mengapa Gabung Bersama Kami?";
  const whyJoinSubtitle = whyJoinBlock?.data?.subtitle || "Manfaat yang Anda dapatkan lebih dari sekadar bunga simpanan.";

  const getBenefitIcon = (title: string) => {
    const lower = (title || '').toLowerCase();
    if (lower.includes('shu')) return <Star className="text-giat-red" />;
    if (lower.includes('bunga') || lower.includes('rendah') || lower.includes('pinjam')) return <Wallet className="text-giat-red" />;
    if (lower.includes('pelatihan') || lower.includes('gratis') || lower.includes('workshop')) return <Sparkles className="text-giat-red" />;
    if (lower.includes('proteksi') || lower.includes('sosial') || lower.includes('dana') || lower.includes('heart')) return <Heart className="text-giat-red" />;
    return <Star className="text-giat-red" />;
  };

  const dynamicBenefits = whyJoinBlock?.data?.items && Array.isArray(whyJoinBlock.data.items) && whyJoinBlock.data.items.length > 0
    ? whyJoinBlock.data.items.map((item: any) => ({
        title: item.title || '',
        desc: item.description || '',
        icon: getBenefitIcon(item.title)
      }))
    : [
        { title: "SHU Tahunan", desc: "Pembagian sisa hasil usaha yang transparan.", icon: <Star className="text-giat-red" /> },
        { title: "Bunga Rendah", desc: "Pinjaman modal dengan sistem yang meringankan.", icon: <Wallet className="text-giat-red" /> },
        { title: "Pelatihan Gratis", desc: "Workshop bisnis & keuangan rutin untuk anggota.", icon: <Sparkles className="text-giat-red" /> },
        { title: "Proteksi Sosial", desc: "Dana sosial bagi anggota yang membutuhkan.", icon: <Heart className="text-giat-red" /> },
      ];

  // Testimonials block
  const testimonialsBlock = membershipPage?.content?.find((block: PageBlock) => block.type === 'testimonials');
  const testimonialsTitle = testimonialsBlock?.data?.title || "Kisah Sukses Anggota";

  const dynamicTestimonials = testimonialsBlock?.data?.items && Array.isArray(testimonialsBlock.data.items) && testimonialsBlock.data.items.length > 0
    ? testimonialsBlock.data.items.map((item: any, idx: number) => {
        const fallback = getTestimonialFallback(item.author_name || item.name || "", idx);
        return {
          name: item.author_name || item.name || fallback.name,
          city: item.author_role || item.city || fallback.city,
          content: item.content || fallback.content,
          image: item.author_image || item.image || fallback.image
        };
      })
    : TESTIMONIALS;

  // CTA Banner block
  const ctaBlock = membershipPage?.content?.find((block: PageBlock) => block.type === 'cta-banner');
  const ctaHeadline = ctaBlock?.data?.headline || "Yuk Jadi Bagian dari Keluarga GIAT";
  const ctaSubHeadline = ctaBlock?.data?.sub_headline || "Langkah kecil Anda hari ini adalah awal dari kemandirian ekonomi yang lebih baik bagi semua.";
  const ctaButtonText = ctaBlock?.data?.button_text || "Daftar Jadi Anggota Sekarang";
  const ctaButtonLink = ctaBlock?.data?.button_link || "#";
  const ctaBgColor = ctaBlock?.data?.background_color || "#153B8F"; // default bg-giat-blue

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-giat-red pt-32 pb-20 md:pt-40 md:pb-32 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-[0.2em] text-white/60 mb-10">
            <Link to="/" className="hover:text-blue-100 transition-colors">HOME</Link>
            <span className="text-white/30">›</span>
            <span className="text-white">KEANGGOTAAN</span>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
              <Sparkles size={16} className="text-yellow-300" />
              <span className="text-xs font-bold uppercase tracking-widest">{heroHeadline}</span>
            </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            {heroSubHeadline}
          </h1>
          <p className="text-red-50 max-w-2xl mx-auto text-xl font-medium opacity-90 leading-relaxed">
            {description}
          </p>
          </div>
        </div>
      </section>

      {/* Faces of GIAT Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-giat-blue font-black text-4xl">{teamTitle}</h2>
            <div className="w-24 h-1.5 bg-giat-red mx-auto rounded-full"></div>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {teamSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {dynamicMembers.map((member, idx) => (
              <div key={idx} className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-giat-blue via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                  <div className="bg-giat-red inline-block px-3 py-1 rounded-lg text-[10px] font-bold uppercase mb-2">
                    {member.role}
                  </div>
                  <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                  {member.quote && (
                    <p className="text-sm text-blue-100 italic opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      "{member.quote}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simplified Benefits & Requirements */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Benefits List */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-giat-blue">{whyJoinTitle}</h2>
                <p className="text-gray-500">{whyJoinSubtitle}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {dynamicBenefits.map((benefit, i) => (
                  <div key={i} className="flex space-x-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-red-50 p-3 rounded-xl h-fit">{benefit.icon}</div>
                    <div>
                      <h4 className="font-bold text-giat-blue">{benefit.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements Card */}
            <div className="lg:col-span-5">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-giat-red/5 rounded-full -mr-16 -mt-16"></div>
                <h3 className="text-2xl font-black text-giat-blue mb-8">{parsedSyarat.title}</h3>
                <div className="space-y-4 mb-8">
                  {parsedSyarat.rows.map((row, index) => (
                    <div 
                      key={index} 
                      className={`flex justify-between items-center py-3 ${
                        index < parsedSyarat.rows.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <span className="text-gray-600 font-medium">{row.label}</span>
                      <span className={`text-sm font-bold ${getValueColorClass(row.label, row.value)}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-400 bg-gray-50 p-4 rounded-xl">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  <p>{parsedSyarat.footer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-giat-blue">{testimonialsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dynamicTestimonials.map((testi, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative hover:shadow-xl transition-all">
                <div className="absolute -top-4 -right-4 bg-giat-red text-white p-3 rounded-full shadow-lg">
                  <Quote size={20} fill="currentColor" />
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed italic">"{testi.content}"</p>
                <div className="flex items-center space-x-4">
                  <img src={testi.image} alt={testi.name} className="w-12 h-12 rounded-full border-2 border-giat-red" />
                  <div>
                    <h5 className="font-bold text-giat-blue">{testi.name}</h5>
                    <p className="text-xs text-gray-400">{testi.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Massive CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div 
            style={{ backgroundColor: ctaBgColor }}
            className="rounded-[3.5rem] p-12 md:p-24 text-center text-white relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-10">
              <div className="flex justify-center -space-x-4 mb-4">
                {[1,2,3,4,5].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/150?img=${i+10}`} className="w-14 h-14 rounded-full border-4 border-giat-blue" alt="Avatar" />
                ))}
                <div className="w-14 h-14 rounded-full border-4 border-giat-blue bg-giat-red flex items-center justify-center font-bold text-sm">+5k</div>
              </div>
              <h2 className="text-3xl md:text-5xl font-black">{formatCtaHeadline(ctaHeadline)}</h2>
              <p className="text-xl text-blue-100/70">
                {ctaSubHeadline}
              </p>
              {ctaBlock?.data?.button_link ? (
                <a 
                  href={ctaButtonLink}
                  className="inline-block bg-giat-red text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-red-700 transition-all shadow-2xl hover:shadow-red-500/50 hover:scale-105 active:scale-95"
                >
                  {ctaButtonText}
                </a>
              ) : (
                <button className="bg-giat-red text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-red-700 transition-all shadow-2xl hover:shadow-red-500/50 hover:scale-105 active:scale-95">
                  {ctaButtonText}
                </button>
              )}
              <p className="text-xs text-blue-100/30">Hanya membutuhkan waktu 5 menit untuk pendaftaran online.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
