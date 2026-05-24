
import React, { useEffect, useState } from 'react';
import { Target, Eye, Heart, Shield, Users, Sparkles, UserCheck, Briefcase, Glasses } from 'lucide-react';
import { ORGANIZATION_STRUCTURE } from '../constants';
import { motion } from 'motion/react';
import { fetchCmsPages } from '../services/dataService';
import { CmsPage, PageBlock } from '../types';

// Helper function to parse rich text content for About/History Section
const parseAboutRichText = (htmlContent: string) => {
  if (!htmlContent) return null;
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Find badge/subtitle
    const badge = doc.querySelector('p strong')?.textContent || 'Sejarah Kami';
    
    // Find title
    const title = doc.querySelector('h1')?.textContent || 'Dua Dekade Mengabdi';
    
    // Find all paragraphs
    const pElements = Array.from(doc.querySelectorAll('p'));
    const paragraphs: string[] = [];
    let quote = '';
    
    pElements.forEach(p => {
      // Skip if it contains strong (which is the badge)
      if (p.querySelector('strong')) return;
      
      const text = p.textContent?.trim();
      if (!text) return;
      
      // Check if it's a quote (contains em or i, or is the last non-empty one with italic characteristics)
      if (p.querySelector('em') || p.querySelector('i')) {
        quote = text;
      } else {
        paragraphs.push(text);
      }
    });

    return { badge, title, paragraphs, quote };
  } catch (e) {
    // Regex fallback if DOMParser fails
    const strongMatch = htmlContent.match(/<p>[^<]*<strong>(.*?)<\/strong>[^<]*<\/p>/i);
    const h1Match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
    
    let title = 'Dua Dekade Mengabdi';
    if (h1Match) {
      title = h1Match[1].replace(/<[^>]*>/g, '');
    }

    return {
      badge: strongMatch ? strongMatch[1] : 'Sejarah Kami',
      title,
      paragraphs: [
        'Koperasi GIAT didirikan pada tahun 1999 oleh sekelompok profesional yang memiliki visi yang sama untuk memajukan ekonomi kerakyatan melalui sistem gotong royong yang modern.',
        'Berawal dari hanya 50 anggota pendiri dengan modal swadaya, kini Koperasi GIAT telah tumbuh menjadi salah satu koperasi terbesar di wilayahnya dengan ribuan anggota yang tersebar di berbagai sektor industri.'
      ],
      quote: 'Kami terus bertransformasi mengikuti perkembangan teknologi tanpa meninggalkan nilai-nilai dasar kekeluargaan yang telah menjadi pondasi kami selama lebih dari dua dekade.'
    };
  }
};

// Helper to parse Misi block text into bullet items
const parseMisiItems = (misiText: string) => {
  if (!misiText) return [];
  return misiText
    .split(/\.\s+/)
    .map(item => item.trim())
    .filter(item => item.length > 0)
    .map(item => item.endsWith('.') ? item : item + '.');
};

// Helper function to parse rich text content for Team Section
const parseTeamRichText = (htmlContent: string) => {
  if (!htmlContent) return null;
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    const subtitle = doc.querySelector('p strong')?.textContent || 'Tim Kami';
    const title = doc.querySelector('h1')?.textContent || 'Struktur Organisasi';
    
    const pElements = Array.from(doc.querySelectorAll('p'));
    let description = 'Dikelola oleh tenaga profesional dan berpengalaman untuk menjamin tata kelola koperasi yang baik dan berkelanjutan.';
    
    pElements.forEach((p, idx) => {
      if (idx > 0 && p.textContent?.trim() && !p.querySelector('strong')) {
        description = p.textContent.trim();
      } else if (idx > 0 && p.querySelector('strong')?.textContent?.trim()) {
        description = p.querySelector('strong')?.textContent?.trim() || description;
      }
    });
    
    return { subtitle, title, description };
  } catch (e) {
    return {
      subtitle: 'Tim Kami',
      title: 'Struktur Organisasi',
      description: 'Dikelola oleh tenaga profesional dan berpengalaman untuk menjamin tata kelola koperasi yang baik dan berkelanjutan.'
    };
  }
};

// Helper to resolve profile photos
const getMemberImage = (name: string, photoUrl?: string | null) => {
  if (photoUrl) return photoUrl;
  
  const normalized = name.toLowerCase();
  if (normalized.includes('sudrajat')) {
    return "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop";
  }
  if (normalized.includes('aminah')) {
    return "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop";
  }
  if (normalized.includes('bambang')) {
    return "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop";
  }
  if (normalized.includes('elly')) {
    return "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop";
  }
  if (normalized.includes('budi')) {
    return "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop";
  }
  if (normalized.includes('rizky')) {
    return "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop";
  }
  
  return `https://i.pravatar.cc/150?u=${encodeURIComponent(name)}`;
};

const About: React.FC = () => {
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

  const aboutPage = pages?.find(p => p.slug === 'tentang-kami') || pages?.[0];
  const heroBlock = aboutPage?.content?.find((block: PageBlock) => block.type === 'hero');
  const richTextBlocks = aboutPage?.content?.filter((block: PageBlock) => block.type === 'rich-text') || [];
  
  // Sejarah Kami rich-text block is the first one
  const historyBlock = richTextBlocks[0];
  
  // Tim Kami rich-text block is the one containing "Tim Kami" or "Struktur Organisasi", or the second one
  const teamHeaderBlock = richTextBlocks.find((block: PageBlock) => 
    block.data?.content && 
    (block.data.content.toLowerCase().includes('tim kami') || block.data.content.toLowerCase().includes('struktur organisasi'))
  ) || richTextBlocks[1];

  // Dynamic values with fallback to static content
  const heroHeadline = heroBlock?.data?.headline || "Tentang Kami";
  const heroSubHeadline = heroBlock?.data?.sub_headline || "Mengenal lebih dekat visi, misi, dan sejarah panjang Koperasi GIAT dalam melayani anggota dengan penuh integritas.";
  const heroBgImage = heroBlock?.data?.background_image || "";

  const parsedHistory = historyBlock?.data?.content ? parseAboutRichText(historyBlock.data.content) : null;
  const historyBadge = parsedHistory?.badge || "Sejarah Kami";
  const historyTitle = parsedHistory?.title || "Dua Dekade Mengabdi";
  const historyParagraphs = parsedHistory?.paragraphs && parsedHistory.paragraphs.length > 0
    ? parsedHistory.paragraphs
    : [
        "Koperasi GIAT didirikan pada tahun 1999 oleh sekelompok profesional yang memiliki visi yang sama untuk memajukan ekonomi kerakyatan melalui sistem gotong royong yang modern.",
        "Berawal dari hanya 50 anggota pendiri dengan modal swadaya, kini Koperasi GIAT telah tumbuh menjadi salah satu koperasi terbesar di wilayahnya dengan ribuan anggota yang tersebar di berbagai sektor industri."
      ];
  const historyQuote = parsedHistory?.quote || "Kami terus bertransformasi mengikuti perkembangan teknologi tanpa meninggalkan nilai-nilai dasar kekeluargaan yang telah menjadi pondasi kami selama lebih dari dua dekade.";

  // Visi & Misi Block
  const featuresBlocks = aboutPage?.content?.filter((block: PageBlock) => block.type === 'features') || [];
  const visiMisiBlock = featuresBlocks.find((block: PageBlock) => 
    !block.data?.title || block.data.items?.some((item: any) => item.title?.toLowerCase().includes('visi'))
  ) || featuresBlocks[0];
  const visiItem = visiMisiBlock?.data?.items?.find((item: any) => item.title?.toLowerCase().includes('visi'));
  const misiItem = visiMisiBlock?.data?.items?.find((item: any) => item.title?.toLowerCase().includes('misi'));
  
  const visiTitle = visiItem?.title || "Visi Kami";
  const visiText = visiItem?.description || "Menjadi lembaga ekonomi kerakyatan terdepan yang profesional, mandiri, dan inklusif untuk mewujudkan kesejahteraan anggota yang berkelanjutan di era digital.";
  
  const misiTitle = misiItem?.title || "Misi Kami";
  const misiText = misiItem?.description || "";
  const misiItems = misiText ? parseMisiItems(misiText) : [
    "Menyelenggarakan unit usaha simpan pinjam yang aman dan transparan.",
    "Mengembangkan kemitraan strategis untuk memperluas manfaat ekonomi anggota.",
    "Meningkatkan literasi keuangan dan digital bagi seluruh anggota.",
    "Membangun ekosistem bisnis yang inovatif dan berorientasi pada hasil."
  ];

  // Nilai-Nilai Koperasi Block
  const nilaiBlock = featuresBlocks.find((block: PageBlock) => 
    block.data?.title?.toLowerCase().includes('nilai') || block.id === '1779604705341d0pvewo'
  ) || featuresBlocks[1];
  const nilaiTitle = nilaiBlock?.data?.title || "Nilai-Nilai Koperasi GIAT";
  const nilaiSubtitle = nilaiBlock?.data?.subtitle || "Prinsip Kami";

  const getNilaiIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('integritas') || lower.includes('jujur') || lower.includes('heart')) {
      return <Heart size={40} />;
    }
    if (lower.includes('kekeluargaan') || lower.includes('users') || lower.includes('anggota')) {
      return <Users size={40} />;
    }
    if (lower.includes('transparansi') || lower.includes('shield') || lower.includes('terbuka')) {
      return <Shield size={40} />;
    }
    return <Sparkles size={40} />;
  };

  const getNilaiColor = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('kekeluargaan')) {
      return 'blue';
    }
    return 'red';
  };

  const nilaiItems = nilaiBlock?.data?.items?.map((item: any) => ({
    title: item.title || '',
    desc: item.description || '',
    icon: getNilaiIcon(item.title || ''),
    color: getNilaiColor(item.title || '')
  })) || [
    { title: 'Integritas', desc: 'Bekerja dengan jujur, transparan, dan menjunjung tinggi kode etik profesional dalam setiap transaksi.', icon: <Heart size={40} />, color: 'red' },
    { title: 'Kekeluargaan', desc: 'Membangun hubungan erat antar anggota dan pengurus layaknya keluarga besar yang saling mendukung.', icon: <Users size={40} />, color: 'blue' },
    { title: 'Transparansi', desc: 'Keterbukaan informasi dan laporan keuangan yang akurat serta dapat diakses oleh seluruh anggota.', icon: <Shield size={40} />, color: 'red' }
  ];

  // Tim Kami / Struktur Organisasi Header
  const parsedTeamHeader = teamHeaderBlock?.data?.content ? parseTeamRichText(teamHeaderBlock.data.content) : null;
  const teamSubtitle = parsedTeamHeader?.subtitle || "Tim Kami";
  const teamTitle = parsedTeamHeader?.title || "Struktur Organisasi";
  const teamDesc = parsedTeamHeader?.description || "Dikelola oleh tenaga profesional dan berpengalaman untuk menjamin tata kelola koperasi yang baik dan berkelanjutan.";

  // Team blocks (Pengawas, Pengurus, Manajemen)
  const teamBlocks = aboutPage?.content?.filter((block: PageBlock) => block.type === 'team') || [];
  
  const pengawasBlock = teamBlocks.find((block: PageBlock) => block.data?.title?.toLowerCase().includes('pengawas'));
  const pengurusBlock = teamBlocks.find((block: PageBlock) => block.data?.title?.toLowerCase().includes('pengurus'));
  const manajemenBlock = teamBlocks.find((block: PageBlock) => block.data?.title?.toLowerCase().includes('manajemen'));

  const pengawasTitle = pengawasBlock?.data?.title || "Dewan Pengawas";
  const pengawasMembers = pengawasBlock?.data?.members?.map((m: any) => ({
    name: m.name,
    role: m.role,
    image: getMemberImage(m.name, m.photo_url)
  })) || ORGANIZATION_STRUCTURE.pengawas;

  const pengurusTitle = pengurusBlock?.data?.title || "Pengurus Koperasi";
  const pengurusMembers = pengurusBlock?.data?.members?.map((m: any) => ({
    name: m.name,
    role: m.role,
    image: getMemberImage(m.name, m.photo_url)
  })) || ORGANIZATION_STRUCTURE.pengurus;

  const manajemenTitle = manajemenBlock?.data?.title || "Manajemen Operasional";
  const manajemenMembers = manajemenBlock?.data?.members?.map((m: any) => ({
    name: m.name,
    role: m.role,
    image: getMemberImage(m.name, m.photo_url)
  })) || ORGANIZATION_STRUCTURE.manajemen;

  // CTA Block
  const ctaBlock = aboutPage?.content?.find((block: PageBlock) => block.type === 'cta-banner');
  const ctaHeadline = ctaBlock?.data?.headline || "Mari Tumbuh Bersama Kami";
  const ctaSubHeadline = ctaBlock?.data?.sub_headline || "Bergabunglah dengan ribuan anggota lainnya dan rasakan manfaat nyata dari ekonomi gotong royong yang modern.";
  const ctaButtonText = ctaBlock?.data?.button_text || "Mulai Bergabung Sekarang";
  const ctaBgColor = ctaBlock?.data?.background_color || "#163C8F";
  const ctaBgImage = ctaBlock?.data?.background_image_url || "";

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

  return (
    <div>
      {/* Header - Redesigned to be flush with Navbar */}
      <section className={`relative pt-32 pb-20 md:pt-44 md:pb-32 text-white overflow-hidden ${heroBgImage ? 'bg-black' : 'bg-giat-blue'}`}>
        {heroBgImage && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
            <img 
              src={heroBgImage} 
              alt={heroHeadline} 
              className="absolute inset-0 w-full h-full object-cover brightness-50 z-0"
            />
          </>
        )}
        {/* Decorative Background */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-black mb-6">{heroHeadline}</h1>
          <p className="text-blue-100/70 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            {heroSubHeadline}
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative group">
              <div className="absolute -inset-4 bg-giat-red/10 rounded-[2.5rem] blur-2xl group-hover:bg-giat-red/20 transition-all duration-700"></div>
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
                alt="History" 
                className="relative rounded-[2rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center space-x-2 text-giat-red font-bold uppercase tracking-widest text-sm mb-2">
                <Sparkles size={16} />
                <span>{historyBadge}</span>
              </div>
              <h2 className="text-3xl font-black text-giat-blue">{historyTitle}</h2>
              <div className="w-20 h-1.5 bg-giat-red mb-8 rounded-full"></div>
              {historyParagraphs.map((para, i) => (
                <p key={i} className={`text-gray-600 leading-relaxed ${i === 0 ? 'text-lg' : 'text-base'}`}>
                  {para}
                </p>
              ))}
              {historyQuote && (
                <p className="text-gray-600 leading-relaxed italic border-l-4 border-giat-red pl-6 py-2 bg-gray-50 rounded-r-xl">
                  {historyQuote}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-giat-blue/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border-t-8 border-giat-red hover:shadow-xl transition-all duration-500">
              <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Target className="text-giat-red" size={32} />
              </div>
              <h3 className="text-2xl font-black text-giat-blue mb-6">{visiTitle}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {visiText}
              </p>
            </div>
            
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border-t-8 border-giat-blue hover:shadow-xl transition-all duration-500">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="text-giat-blue" size={32} />
              </div>
              <h3 className="text-2xl font-black text-giat-blue mb-6">{misiTitle}</h3>
              <ul className="space-y-4 text-gray-600">
                {misiItems.map((item, i) => (
                  <li key={i} className="flex items-start space-x-3 group">
                    <div className="mt-1.5 bg-giat-red w-2 h-2 rounded-full shrink-0 group-hover:scale-150 transition-transform"></div>
                    <span className="group-hover:text-giat-blue transition-colors font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai-Nilai Koperasi GIAT */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <div className="mb-20 space-y-4">
            <h2 className="text-giat-red font-bold tracking-widest uppercase text-sm">{nilaiSubtitle}</h2>
            <h3 className="text-3xl md:text-4xl font-black text-giat-blue">{nilaiTitle}</h3>
            <div className="w-24 h-1.5 bg-giat-red mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {nilaiItems.map((item, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white p-12 rounded-[2.5rem] border border-gray-100 hover:border-giat-red/30 transition-all duration-300 shadow-sm hover:shadow-2xl hover:-translate-y-2 outline-none overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-giat-red/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                
                <div className={`
                  mb-8 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto transition-all duration-500
                  ${item.color === 'red' ? 'bg-red-50 text-giat-red group-hover:bg-giat-red group-hover:text-white' : 'bg-blue-50 text-giat-blue group-hover:bg-giat-blue group-hover:text-white'}
                  group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl shadow-giat-red/20
                `}>
                  {item.icon}
                </div>
                
                <h4 className="text-2xl font-black text-giat-blue mb-4 group-hover:text-giat-red transition-colors">{item.title}</h4>
                <p className="text-gray-500 leading-relaxed text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Struktur Organisasi Section */}
      <section className="py-32 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-giat-red font-bold tracking-widest uppercase text-sm">{teamSubtitle}</h2>
            <h3 className="text-3xl md:text-5xl font-black text-giat-blue">{teamTitle}</h3>
            <div className="w-24 h-1.5 bg-giat-red mx-auto rounded-full"></div>
            <p className="text-gray-500 font-bold max-w-2xl mx-auto pt-4 leading-relaxed">
              {teamDesc}
            </p>
          </div>

          <div className="space-y-32">
            {/* Pengawas */}
            {pengawasMembers.length > 0 && (
              <div className="space-y-12">
                <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
                  <div className="p-3 bg-giat-red text-white rounded-xl shadow-lg shadow-red-500/20">
                    <Glasses size={24} />
                  </div>
                  <h4 className="text-3xl font-black text-giat-blue">{pengawasTitle}</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {pengawasMembers.map((person: any, i: number) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -10 }}
                      className="flex flex-col items-center text-center space-y-6 bg-white p-10 rounded-[3rem] shadow-sm border border-transparent hover:border-giat-red/20 transition-all duration-500 group"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-giat-red rounded-[2.5rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-10"></div>
                        <img src={person.image} alt={person.name} className="relative w-48 h-48 rounded-[2.5rem] object-cover shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <div>
                        <h5 className="text-2xl font-black text-giat-blue leading-tight mb-2 group-hover:text-giat-red transition-colors">{person.name}</h5>
                        <p className="text-giat-red font-black text-xs uppercase tracking-widest">{person.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Pengurus */}
            {pengurusMembers.length > 0 && (
              <div className="space-y-12">
                <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
                  <div className="p-3 bg-giat-blue text-white rounded-xl shadow-lg shadow-giat-blue/20">
                    <UserCheck size={24} />
                  </div>
                  <h4 className="text-3xl font-black text-giat-blue">{pengurusTitle}</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {pengurusMembers.map((person: any, i: number) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -10 }}
                      className="flex flex-col items-center text-center space-y-6 bg-white p-10 rounded-[3rem] shadow-sm border border-transparent hover:border-giat-blue/20 transition-all duration-500 group"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-giat-blue rounded-[2.5rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-10"></div>
                        <img src={person.image} alt={person.name} className="relative w-48 h-48 rounded-[2.5rem] object-cover shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <div>
                        <h5 className="text-2xl font-black text-giat-blue leading-tight mb-2 group-hover:text-giat-red transition-colors">{person.name}</h5>
                        <p className="text-giat-blue font-black text-xs uppercase tracking-widest">{person.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Manajemen */}
            {manajemenMembers.length > 0 && (
              <div className="space-y-12">
                <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
                  <div className="p-3 bg-gray-800 text-white rounded-xl shadow-lg shadow-gray-800/20">
                    <Briefcase size={24} />
                  </div>
                  <h4 className="text-3xl font-black text-giat-blue">{manajemenTitle}</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {manajemenMembers.map((person: any, i: number) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -10 }}
                      className="flex flex-col items-center text-center space-y-6 bg-white p-10 rounded-[3rem] shadow-sm border border-transparent hover:border-gray-800/20 transition-all duration-500 group"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gray-800 rounded-[2.5rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-10"></div>
                        <img src={person.image} alt={person.name} className="relative w-48 h-48 rounded-[2.5rem] object-cover shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <div>
                        <div className="space-y-1">
                          <h5 className="text-2xl font-black text-giat-blue leading-tight mb-2 group-hover:text-giat-red transition-colors">{person.name}</h5>
                          <p className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-black text-[10px] uppercase tracking-widest">{person.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div 
            style={{ 
              backgroundColor: ctaBgImage ? undefined : ctaBgColor,
              backgroundImage: ctaBgImage ? `url(${ctaBgImage})` : undefined,
              backgroundSize: ctaBgImage ? 'cover' : undefined,
              backgroundPosition: ctaBgImage ? 'center' : undefined,
            }}
            className="bg-giat-blue rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-giat-blue/40 group"
          >
            {ctaBgImage && <div className="absolute inset-0 bg-black/50 z-0" />}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] -mr-48 -mt-48 group-hover:bg-white/10 transition-colors duration-700 z-10"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-20 space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-tight" dangerouslySetInnerHTML={{ __html: ctaHeadline.replace('\n', '<br/>') }} />
              <p className="text-blue-100/70 text-xl max-w-2xl mx-auto font-bold leading-relaxed">
                {ctaSubHeadline}
              </p>
              <div className="pt-6">
                <button className="bg-giat-red text-white px-12 py-6 rounded-3xl font-black text-xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 hover:-translate-y-2 active:scale-95">
                  {ctaButtonText}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

