import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Shield, Wallet, TrendingUp, Award, ShieldCheck, ChevronLeft, ChevronRight, Calendar, User, Quote, Star, CreditCard, Smartphone, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, HERO_SLIDES, LATEST_INFO, PARTNERS, TESTIMONIALS } from '../constants';
import { fetchCmsPages, fetchCmsPosts } from '../services/dataService';
import { CmsPage, CmsPost, PageBlock } from '../types';

// Helper function to format created_at date into Indonesian format
const formatPostDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr);
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch (e) {
    return dateStr;
  }
};

// Helper function to normalize CmsPost into UI expected format
const normalizeCmsPost = (post: CmsPost) => {
  const contentItem = post.content?.[0];
  return {
    id: post.id,
    title: post.title,
    date: formatPostDate(post.created_at),
    category: contentItem?.tags || post.category || "Berita",
    image: contentItem?.featured_image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1974&auto=format&fit=crop",
    excerpt: post.excerpt || contentItem?.excerpt || "",
    content: contentItem?.body_content || ""
  };
};
import { useSettings } from '../components/SettingsContext';

// Helper to map icon names to Lucide components
const IconMap: Record<string, any> = {
  Wallet, TrendingUp, Award, ShieldCheck, Users, Target, Shield
};

// Helper function to parse rich text content from CMS
const parseRichTextContent = (htmlContent: string) => {
  if (!htmlContent) return null;
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Find subtitle, title, description
    const subtitle = doc.querySelector('h2')?.textContent || doc.querySelector('h3')?.textContent || 'Inovasi Layanan & Produk';
    const title = doc.querySelector('h1')?.innerHTML || 'Ekosistem <br/> Mandiri.';
    const description = doc.querySelector('p')?.textContent || 'Platform digital pemberdayaan ekonomi yang dirancang untuk akselerasi kesejahteraan bersama.';
    
    return { subtitle, title, description };
  } catch (e) {
    // Basic regex fallback if DOMParser fails
    const h2Match = htmlContent.match(/<h2[^>]*>(.*?)<\/h2>/i);
    const h1Match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const pMatch = htmlContent.match(/<p[^>]*>(.*?)<\/p>/i);
    
    return {
      subtitle: h2Match ? h2Match[1].replace(/&amp;/g, '&') : 'Inovasi Layanan & Produk',
      title: h1Match ? h1Match[1] : 'Ekosistem <br/> Mandiri.',
      description: pMatch ? pMatch[1].replace(/&amp;/g, '&') : 'Platform digital pemberdayaan ekonomi yang dirancang untuk akselerasi kesejahteraan bersama.'
    };
  }
};

// Helper function to parse rich text content for Information Section
const parseInfoRichText = (htmlContent: string) => {
  if (!htmlContent) return null;
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    const subtitle = doc.querySelector('h2')?.textContent || doc.querySelector('h3')?.textContent || 'Update Terkini';
    const title = doc.querySelector('h1')?.innerHTML || 'Informasi.';
    
    const aTag = doc.querySelector('a');
    const linkText = aTag?.textContent || 'Semua Berita';
    let linkUrl = '/informasi';
    if (aTag) {
      const href = aTag.getAttribute('href') || '';
      if (href) {
        if (href.includes('#/')) {
          linkUrl = href.substring(href.indexOf('#/') + 1);
        } else if (href.includes('#')) {
          linkUrl = href.substring(href.indexOf('#') + 1);
        } else if (href.startsWith('http')) {
          try {
            const urlObj = new URL(href);
            if (urlObj.hostname === window.location.hostname || urlObj.hostname === 'localhost') {
              linkUrl = urlObj.pathname + urlObj.hash;
              if (linkUrl.includes('#/')) {
                linkUrl = linkUrl.substring(linkUrl.indexOf('#/') + 1);
              }
            } else {
              linkUrl = href;
            }
          } catch(e) {
            linkUrl = href;
          }
        } else {
          linkUrl = href;
        }
      }
    }
    
    return { subtitle, title, linkText, linkUrl };
  } catch (e) {
    const h2Match = htmlContent.match(/<h2[^>]*>(.*?)<\/h2>/i);
    const h1Match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const aMatch = htmlContent.match(/<a[^>]*href=["'](.*?)["'][^>]*>(.*?)<\/a>/i);
    
    let linkUrl = '/informasi';
    let linkText = 'Semua Berita';
    if (aMatch) {
      const href = aMatch[1];
      linkText = aMatch[2].replace(/&amp;/g, '&');
      if (href) {
        if (href.includes('#/')) {
          linkUrl = href.substring(href.indexOf('#/') + 1);
        } else if (href.includes('#')) {
          linkUrl = href.substring(href.indexOf('#') + 1);
        } else if (href.startsWith('http')) {
          try {
            const urlObj = new URL(href);
            if (urlObj.hostname === window.location.hostname || urlObj.hostname === 'localhost') {
              linkUrl = urlObj.pathname + urlObj.hash;
              if (linkUrl.includes('#/')) {
                linkUrl = linkUrl.substring(linkUrl.indexOf('#/') + 1);
              }
            } else {
              linkUrl = href;
            }
          } catch(e) {
            linkUrl = href;
          }
        } else {
          linkUrl = href;
        }
      }
    }
    
    return {
      subtitle: h2Match ? h2Match[1].replace(/&amp;/g, '&') : 'Update Terkini',
      title: h1Match ? h1Match[1] : 'Informasi.',
      linkText,
      linkUrl
    };
  }
};

// Helper function to map service titles or icon URLs to Lucide Icons
const getServiceIcon = (title: string, iconUrl?: string | null) => {
  if (iconUrl) {
    return <img src={iconUrl} alt={title} className="w-8 h-8 object-contain" />;
  }
  
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('simpan') || lowerTitle.includes('pinjam') || lowerTitle.includes('wallet') || lowerTitle.includes('keuangan')) {
    return <Wallet className="w-8 h-8" />;
  }
  if (lowerTitle.includes('usaha') || lowerTitle.includes('produktif') || lowerTitle.includes('trending') || lowerTitle.includes('bisnis')) {
    return <TrendingUp className="w-8 h-8" />;
  }
  if (lowerTitle.includes('layanan') || lowerTitle.includes('anggota') || lowerTitle.includes('award') || lowerTitle.includes('fasilitas')) {
    return <Award className="w-8 h-8" />;
  }
  if (lowerTitle.includes('pemberdayaan') || lowerTitle.includes('shield') || lowerTitle.includes('pelatihan')) {
    return <ShieldCheck className="w-8 h-8" />;
  }
  // Default fallback icon
  return <Sparkles className="w-8 h-8" />;
};

// Helper function to map app feature titles to Lucide Icons
const getAppFeatureIcon = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes('trusted') || lower.includes('security') || lower.includes('aman') || lower.includes('keamanan') || lower.includes('shield')) {
    return <Shield size={24} />;
  }
  if (lower.includes('instant') || lower.includes('transaction') || lower.includes('transaksi') || lower.includes('credit') || lower.includes('card') || lower.includes('pembayaran')) {
    return <CreditCard size={24} />;
  }
  if (lower.includes('one-touch') || lower.includes('access') || lower.includes('smartphone') || lower.includes('hp') || lower.includes('aplikasi') || lower.includes('simpanan')) {
    return <Smartphone size={24} />;
  }
  if (lower.includes('community') || lower.includes('first') || lower.includes('users') || lower.includes('anggota')) {
    return <Users size={24} />;
  }
  return <Sparkles size={24} />;
};

interface Partner {
  name: string;
  logo: string;
  website?: string;
}

const PartnerLogo: React.FC<{ partner: Partner }> = ({ partner }) => {
  const [imageError, setImageError] = useState(false);

  // If there's no logo URL, or the image failed to load, render a clean text badge
  if (!partner.logo || imageError) {
    const badgeContent = (
      <div className="px-6 py-3 bg-[#F8F9FA] border border-gray-200 rounded-2xl text-giat-blue font-black text-sm tracking-wider uppercase shadow-sm">
        {partner.name}
      </div>
    );

    if (partner.website && partner.website !== '#') {
      return (
        <a 
          href={partner.website} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:scale-110 transition-transform relative flex items-center justify-center"
        >
          {badgeContent}
        </a>
      );
    }

    return (
      <div className="hover:scale-110 transition-transform relative flex items-center justify-center">
        {badgeContent}
      </div>
    );
  }

  const imgContent = (
    <img 
      src={partner.logo} 
      alt={partner.name} 
      className="h-12 md:h-16 lg:h-20 w-auto object-contain"
      onError={() => setImageError(true)}
    />
  );

  if (partner.website && partner.website !== '#') {
    return (
      <a 
        href={partner.website} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:scale-110 transition-transform relative flex items-center justify-center"
      >
        {imgContent}
      </a>
    );
  }

  return (
    <div className="hover:scale-110 transition-transform relative flex items-center justify-center">
      {imgContent}
    </div>
  );
};

const TestimonialAvatar: React.FC<{ src?: string | null; name: string }> = ({ src, name }) => {
  const [error, setError] = useState(false);
  
  if (!src || error) {
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || '?';
    return (
      <div className="w-24 h-24 rounded-[2rem] bg-giat-red/20 border border-giat-red/30 flex items-center justify-center text-giat-red font-black text-2xl ring-4 ring-giat-red/20 transition-transform group-hover:scale-110">
        {initials}
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={name} 
      className="w-24 h-24 rounded-[2rem] object-cover ring-4 ring-giat-red/20 transition-transform group-hover:scale-110"
      onError={() => setError(true)}
    />
  );
};

const Home: React.FC = () => {
  const { settings } = useSettings();
  const [pages, setPages] = useState<CmsPage[] | null>(null);
  const [posts, setPosts] = useState<CmsPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const [pagesData, postsData] = await Promise.all([
        fetchCmsPages(),
        fetchCmsPosts()
      ]);
      if (pagesData) setPages(pagesData);
      if (postsData) setPosts(postsData);
      setLoading(false);
    };
    loadData();
  }, []);

  const homePage = pages?.find(p => p.slug === 'koperasi-giat') || pages?.[0];
  const heroBlocks = homePage?.content?.filter((block: PageBlock) => block.type === 'hero') || [];

  // Find the App Hero Section block (eKop GIAT App)
  const appHeroBlock = heroBlocks.find(block => 
    block.data?.headline?.toLowerCase().includes('masa depan') ||
    block.data?.headline?.toLowerCase().includes('koperasi kita') || 
    (block.data?.stats && block.data.stats.some((s: any) => s && (s.value === 'Trusted Security' || s.label?.includes('Enkripsi'))))
  );

  // Filter out the app section block from the hero slider blocks
  const sliderHeroBlocks = heroBlocks.filter(block => block.id !== appHeroBlock?.id);

  // Format stat value into number and suffix
  const formatStatValue = (val: string) => {
    const match = val.match(/^(\d+)(.*)$/);
    if (match) {
      return { number: match[1], suffix: match[2] };
    }
    return { number: val, suffix: "" };
  };

  const defaultStats = [
    { label: "Anggota Aktif", value: "15rb+" },
    { label: "Aset Kelolaan", value: "50M+" },
    { label: "Unit Usaha", value: "12+" },
    { label: "Dedikasi Luhur", value: "25th" }
  ];

  // Find features blocks
  const featuresBlocks = homePage?.content?.filter((block: PageBlock) => block.type === 'features') || [];
  
  // Stats block is typically the one with "pencapaian" or "kepercayaan", or the first one if only one exists
  const statsBlock = featuresBlocks.find(block => 
    block.data?.title?.toLowerCase().includes('pencapaian') || 
    block.data?.subtitle?.toLowerCase().includes('kepercayaan')
  ) || featuresBlocks[0];

  // Services block is the one with "ekosistem" or "layanan", or the second one if two exist
  const servicesBlock = featuresBlocks.find(block => 
    block.data?.title?.toLowerCase().includes('ekosistem') || 
    block.data?.subtitle?.toLowerCase().includes('layanan') ||
    (statsBlock && block.id !== statsBlock.id)
  );

  const featuresTitle = statsBlock?.data?.title;
  const featuresSubtitle = statsBlock?.data?.subtitle;

  // Helper to extract non-empty, valid stats from features block or any of the hero blocks
  const getStats = () => {
    // 1. Coba ambil dari block bertipe 'features' yang dikonfigurasi di CMS
    if (statsBlock?.data?.items && statsBlock.data.items.length > 0) {
      return statsBlock.data.items.map((item: any) => ({
        label: item.description || '',
        value: item.title || ''
      }));
    }

    // 2. Fallback ke block hero lama jika ada data stats di dalamnya
    const blockWithStats = heroBlocks.find(block => 
      block.data?.stats && 
      block.data.stats.length > 0 && 
      block.data.stats.some((s: any) => s && (typeof s === 'string' || (s.label?.trim() || s.value?.trim())))
    );

    if (blockWithStats?.data?.stats) {
      const validStats = blockWithStats.data.stats.filter((s: any) => 
        s && (typeof s === 'string' || (s.label?.trim() || s.value?.trim()))
      );
      if (validStats.length > 0) {
        return validStats.map((s: any) => ({
          label: typeof s === 'string' ? '' : (s.label || ''),
          value: typeof s === 'string' ? s : (s.value || '')
        }));
      }
    }
    return defaultStats;
  };

  const stats = getStats();

  // Build slides from CMS hero blocks (excluding the app hero block)
  const slides = sliderHeroBlocks.length > 0 ? sliderHeroBlocks.map((block: PageBlock, idx: number) => ({
    id: idx + 1,
    title: block.data?.headline || "Unit Usaha Produktif",
    subtitle: settings?.site_name || homePage?.title || "Koperasi Pilihan Rakyat",
    description: block.data?.sub_headline || "Kami mengembangkan berbagai unit bisnis kreatif untuk menciptakan nilai tambah dan bagi hasil yang maksimal bagi anggota.",
    image: block.data?.background_image || HERO_SLIDES[idx % HERO_SLIDES.length].image,
    cta: "Akses eKop GIAT App",
    link: "https://ekop.kopgiat.id/"
  })) : HERO_SLIDES;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides.length, currentSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Extract and parse rich-text header block for services section
  const servicesHeaderBlock = homePage?.content?.find((block: PageBlock) => 
    block.type === 'rich-text' && 
    block.data?.content && 
    (block.data.content.toLowerCase().includes('ekosistem') || block.data.content.toLowerCase().includes('inovasi'))
  );

  // Extract and parse rich-text header block for info section
  const infoHeaderBlock = homePage?.content?.find((block: PageBlock) => 
    block.type === 'rich-text' && 
    block.data?.content && 
    (block.data.content.toLowerCase().includes('update terkini') || block.data.content.toLowerCase().includes('informasi'))
  );

  // Fallback for services rich text block if we have a single rich text block which might not match the keywords
  const firstRichTextBlock = homePage?.content?.find((block: PageBlock) => block.type === 'rich-text');
  const activeServicesBlock = servicesHeaderBlock || (firstRichTextBlock && firstRichTextBlock.id !== infoHeaderBlock?.id ? firstRichTextBlock : null);

  const parsedRichText = activeServicesBlock?.data?.content ? parseRichTextContent(activeServicesBlock.data.content) : null;
  
  const servicesSubtitle = parsedRichText?.subtitle || "Inovasi Layanan & Produk";
  const servicesTitle = parsedRichText?.title || "Ekosistem <br/> Mandiri.";
  const servicesDescription = parsedRichText?.description || "Platform digital pemberdayaan ekonomi yang dirancang untuk akselerasi kesejahteraan bersama.";

  // Extract and parse rich-text header block for info section
  const parsedInfoRichText = infoHeaderBlock?.data?.content ? parseInfoRichText(infoHeaderBlock.data.content) : null;

  const infoSubtitle = parsedInfoRichText?.subtitle || "Update Terkini";
  const infoTitle = parsedInfoRichText?.title || "Informasi.";
  const infoLinkText = parsedInfoRichText?.linkText || "Semua Berita";
  const infoLinkUrl = parsedInfoRichText?.linkUrl || "/informasi";

  // Find dynamic post feed block
  const postFeedBlock = homePage?.content?.find((block: PageBlock) => block.type === 'dynamic-post-feed');

  // Filter and limit posts based on CMS configuration
  const getFilteredPosts = () => {
    const staticPosts = LATEST_INFO.map(p => ({
      ...p,
      content: p.content
    }));

    const cmsPosts = posts && Array.isArray(posts) 
      ? posts.filter(p => p && p.id).map(normalizeCmsPost) 
      : [];

    const allPostsMap = new Map<number, any>();
    staticPosts.forEach(p => allPostsMap.set(p.id, p));
    cmsPosts.forEach(p => allPostsMap.set(p.id, p));

    const allUnifiedPosts = Array.from(allPostsMap.values());
    
    let postsToDisplay = [...allUnifiedPosts];

    if (!postFeedBlock) {
      return postsToDisplay.slice(0, 4);
    }
    
    const { category, limit, sort_order, selection_mode, selected_post_ids } = postFeedBlock.data || {};
    
    if (selection_mode === 'manual' && Array.isArray(selected_post_ids) && selected_post_ids.length > 0) {
      postsToDisplay = postsToDisplay.filter(post => selected_post_ids.map(id => Number(id)).includes(Number(post.id)));
    } else {
      if (category && category !== 'Semua Kategori' && category !== 'All') {
        postsToDisplay = postsToDisplay.filter(post => post.category?.toLowerCase() === category.toLowerCase());
      }
    }
    
    if (sort_order === 'asc') {
      postsToDisplay = postsToDisplay.reverse();
    }
    
    const maxLimit = typeof limit === 'number' ? limit : parseInt(limit) || 4;
    return postsToDisplay.slice(0, maxLimit);
  };

  const displayPosts = getFilteredPosts();

  // Find partners block from CMS
  const partnersBlock = homePage?.content?.find((block: PageBlock) => block.type === 'partners');

  const partnersTitle = partnersBlock?.data?.title || "Mitra Kami";

  const partnersList = partnersBlock?.data?.logos && partnersBlock.data.logos.length > 0
    ? partnersBlock.data.logos.map((logoItem: any) => {
        let logo = logoItem.logo_url;
        if (!logo) {
          const lowerName = logoItem.partner_name?.toLowerCase() || '';
          if (lowerName.includes('bca')) {
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1200px-Bank_Central_Asia.svg.png";
          } else if (lowerName.includes('mandiri')) {
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png";
          } else if (lowerName.includes('telkom university') || lowerName.includes('tel-u')) {
            logo = "https://upload.wikimedia.org/wikipedia/id/thumb/d/d3/Telkom_University_Logo.svg/1200px-Telkom_University_Logo.svg.png";
          } else if (lowerName.includes('pendidikan telkom') || lowerName.includes('ypt')) {
            logo = "https://ypt.or.id/wp-content/uploads/2021/04/Logo-YPT-Horizontal.png";
          } else if (lowerName.includes('ko+lab') || lowerName.includes('kolab')) {
            logo = "https://kolab.id/wp-content/uploads/2022/06/Logo-KoLab-Primary.png";
          }
        }
        return {
          name: logoItem.partner_name || 'Mitra',
          logo: logo || '',
          website: logoItem.website_url || '#'
        };
      })
    : PARTNERS.map(p => ({ name: p.name, logo: p.logo, website: '#' }));

  const services = servicesBlock?.data?.items && servicesBlock.data.items.length > 0
    ? servicesBlock.data.items.map((item: any) => ({
        title: item.title || '',
        description: item.description || '',
        icon: getServiceIcon(item.title || '', item.icon_url),
        link: item.link_url || '/layanan'
      }))
    : SERVICES;

  // eKop App Section dynamic mapping
  const appHeadline = appHeroBlock?.data?.headline || "Masa Depan Koperasi Kita.";
  const appSubHeadline = appHeroBlock?.data?.sub_headline || "eKop GIAT App mengintegrasikan seluruh layanan koperasi dalam satu platform digital yang aman, cerdas, dan transparan.";
  const appBackgroundImg = appHeroBlock?.data?.background_image || "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=2070&auto=format&fit=crop";

  const appFeatures = appHeroBlock?.data?.stats && appHeroBlock.data.stats.length > 0
    ? appHeroBlock.data.stats.filter((s: any) => s && (s.value || s.label)).map((s: any) => ({
        icon: getAppFeatureIcon(s.value || s.label || ''),
        title: s.value || '',
        desc: s.label || ''
      }))
    : [
        { icon: <Shield size={24} />, title: "Trusted Security", desc: "Enkripsi tingkat tinggi untuk keamanan data Anda." },
        { icon: <CreditCard size={24} />, title: "Instant Transaction", desc: "Kemudahan pembayaran dan transfer digital." },
        { icon: <Smartphone size={24} />, title: "One-Touch Access", desc: "Kelola simpanan dan pinjaman dalam satu klik." },
        { icon: <Users size={24} />, title: "Community First", desc: "Fitur eksklusif khusus untuk anggota koperasi." }
      ];

  const appLabels = appHeroBlock?.data?.labels && appHeroBlock.data.labels.length >= 2 
    ? appHeroBlock.data.labels 
    : ["eKop Super App", "5000+ Active Users"];

  const appCta = appHeroBlock?.data?.cta_buttons && appHeroBlock.data.cta_buttons.length > 0
    ? appHeroBlock.data.cta_buttons[0]
    : { text: "Jelajahi App", url: "https://ekop.kopgiat.id/" };

  const appMobileImg = appHeroBlock?.data?.images && appHeroBlock.data.images.length > 0 && appHeroBlock.data.images[0].url
    ? appHeroBlock.data.images[0].url
    : "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop";

  // Find testimonials block from CMS
  const testimonialsBlock = homePage?.content?.find((block: PageBlock) => block.type === 'testimonials');

  const testimonialsTitle = testimonialsBlock?.data?.title || "Testimoni.";

  const cmsTestimonialsItems = testimonialsBlock?.data?.items || testimonialsBlock?.data?.testimonials;
  const testimonialsList = cmsTestimonialsItems && cmsTestimonialsItems.length > 0
    ? cmsTestimonialsItems.map((item: any, index: number) => ({
        id: item.id || index + 1,
        name: item.name || item.author_name || item.title || 'Anggota Koperasi',
        role: item.role || item.author_role || item.subtitle || item.description || 'Anggota',
        content: item.content || item.text || item.testimonial || item.quote || '',
        avatar: item.image || item.image_url || item.avatar || item.avatar_url || item.author_image_url || null,
        rating: Number(item.rating) || 5
      }))
    : TESTIMONIALS;

  if (loading) {
    return (
      <div className="h-screen bg-[#020617] flex flex-col items-center justify-center space-y-6">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-16 h-16 border-4 border-t-giat-red border-r-transparent border-b-white border-l-transparent rounded-full shadow-2xl shadow-giat-red/20"
        />
        <div className="flex flex-col items-center space-y-1">
          <span className="text-2xl font-black tracking-tighter text-white">
            {settings?.site_name ? settings.site_name.split(' ')[0] : 'GIAT'}
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            {settings?.site_name ? settings.site_name.split(' ').slice(1).join(' ') : 'KOPERASI'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section with 3D Slide Transition */}
      <section className="relative h-screen flex items-center overflow-hidden bg-black perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, rotateY: 45, z: -500, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -45, z: -500, scale: 0.9 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-0 preserve-3d"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-giat-blue/20 via-transparent to-giat-red/20 z-10 opacity-60" />
            <motion.img 
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 15, ease: "linear" }}
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title} 
              className="w-full h-full object-cover brightness-[0.5]"
            />
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="space-y-8"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center space-x-2 bg-giat-red/30 border border-giat-red/40 px-6 py-2.5 rounded-full text-white text-xs font-black tracking-widest uppercase backdrop-blur-xl"
                >
                  <span className="relative flex h-2 w-2 mr-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-giat-red opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-giat-red"></span>
                  </span>
                  {slides[currentSlide].subtitle}
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter"
                >
                  {slides[currentSlide].title.split(' ').map((word, i) => (
                    <span key={i} className="inline-block mr-6 last:mr-0">
                      {word === "Koperasi" || word === "Membangun" ? <span className="text-white">{word}</span> : <span className="text-giat-red drop-shadow-[0_0_30px_rgba(225,29,72,0.5)]">{word}</span>}
                    </span>
                  ))}
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-xl md:text-3xl text-white/80 leading-relaxed max-w-2xl font-semibold italic border-l-8 border-giat-red pl-8"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row gap-8 pt-8"
                >
                  <a 
                    href="https://ekop.kopgiat.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-giat-red text-white px-12 py-6 rounded-[2.5rem] font-black text-xl transition-all overflow-hidden flex items-center justify-center shadow-2xl shadow-giat-red/40"
                  >
                    <span className="relative z-10 flex items-center">
                      Akses eKop GIAT App
                      <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                    <style>{`.group:hover span { color: #E11D48; }`}</style>
                  </a>
                  <Link 
                    to="/layanan" 
                    className="px-12 py-6 rounded-[2.5rem] font-black text-xl text-white border-2 border-white/20 hover:bg-white hover:text-giat-blue transition-all flex items-center justify-center backdrop-blur-md"
                  >
                    Layanan & Produk
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Controls - only show if there are multiple slides */}
        {slides.length > 1 && (
          <div className="absolute bottom-12 right-12 z-30 flex space-x-6">
            <button 
              onClick={prevSlide}
              className="w-20 h-20 rounded-3xl border border-white/20 flex items-center justify-center text-white hover:bg-giat-red hover:border-giat-red hover:scale-110 transition-all backdrop-blur-xl"
            >
              <ChevronLeft size={40} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-20 h-20 rounded-3xl border border-white/20 flex items-center justify-center text-white hover:bg-giat-red hover:border-giat-red hover:scale-110 transition-all backdrop-blur-xl"
            >
              <ChevronRight size={40} />
            </button>
          </div>
        )}
      </section>

      {/* Stats Section with Colorful Accents */}
      <section className="py-24 bg-[#0A0A0A] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {featuresTitle && (
            <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
              {featuresSubtitle && (
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-giat-red font-black tracking-[0.4em] uppercase text-xs block"
                >
                  {featuresSubtitle}
                </motion.span>
              )}
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter"
              >
                {featuresTitle}
              </motion.h3>
              <div className="h-1 w-24 bg-giat-red mx-auto mt-6" />
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-0 divide-x-0 lg:divide-x divide-white/10">
            {stats.map((stat: any, idx: number) => {
              const formatted = formatStatValue(stat.value);
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center px-8 group"
                >
                  <div className="text-6xl lg:text-8xl font-black text-white mb-4 group-hover:text-giat-red transition-colors">
                    {formatted.number}
                    <span className="text-giat-red">{formatted.suffix}</span>
                  </div>
                  <div className="text-white/40 font-black uppercase tracking-[0.3em] text-xs">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section className="py-24 bg-white relative overflow-hidden bg-mesh-gradient">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
            <div className="max-w-3xl space-y-6">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-giat-red font-black tracking-[0.4em] uppercase text-xs block"
              >
                {servicesSubtitle}
              </motion.span>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-black text-giat-blue leading-tight tracking-tighter"
                dangerouslySetInnerHTML={{ __html: servicesTitle }}
              />
            </div>
            <div className="max-w-md space-y-8">
              <p className="text-gray-500 text-xl font-bold leading-relaxed">
                {servicesDescription}
              </p>
              <div className="h-2 w-32 bg-giat-red" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {services.map((s: any, idx: number) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-[#F8F9FA] p-12 rounded-[3.5rem] border border-transparent hover:border-giat-red/20 hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(225,29,72,0.15)] transition-all duration-700 overflow-hidden"
              >
                <div className="mb-10 text-giat-red group-hover:scale-125 transition-transform duration-700 origin-left">
                  {s.icon}
                </div>
                <h4 className="text-2xl font-black mb-4 text-giat-blue group-hover:text-giat-red transition-colors leading-tight">{s.title}</h4>
                <p className="text-gray-500 leading-relaxed mb-10 font-bold text-base group-hover:text-gray-600">
                  {s.description}
                </p>
                {s.link && s.link.startsWith('http') ? (
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-giat-blue font-black group-hover:text-giat-red transition-colors gap-4">
                    <span className="uppercase tracking-[0.2em] text-[10px]">Selengkapnya</span>
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:bg-giat-red group-hover:text-white group-hover:border-giat-red transition-all shadow-sm">
                      <ArrowRight size={20} className="translate-x-0 group-hover:translate-x-1" />
                    </div>
                  </a>
                ) : (
                  <Link to={s.link || "/layanan"} className="inline-flex items-center text-giat-blue font-black group-hover:text-giat-red transition-colors gap-4">
                    <span className="uppercase tracking-[0.2em] text-[10px]">Selengkapnya</span>
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:bg-giat-red group-hover:text-white group-hover:border-giat-red transition-all shadow-sm">
                      <ArrowRight size={20} className="translate-x-0 group-hover:translate-x-1" />
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: eKop GIAT App Section - Livin' inspired Premium UI */}
      <section className="py-32 bg-[#020617] relative overflow-hidden">
        {/* Advanced Ambient Background */}
        <div className="absolute inset-0 bg-mesh-gradient opacity-10" />
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-400/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Device Mockups Side (Desktop & Mobile 3D) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1 h-[500px] md:h-[700px] flex items-center justify-center lg:justify-start"
            >
              {/* MacBook Pro - Desktop View */}
              <div className="absolute left-0 top-[15%] w-[85%] md:w-[90%] z-0 transform -rotate-2 hover:rotate-0 transition-transform duration-1000">
                <div className="relative rounded-[2rem] overflow-hidden shadow-[0_100px_200px_-50px_rgba(0,0,0,0.9)] border-[1px] border-white/10 bg-[#111] p-1">
                  <div className="bg-[#0a0a0a] rounded-[1.5rem] overflow-hidden">
                    <img 
                      src={appBackgroundImg} 
                      alt="eKop GIAT Desktop Interface" 
                      className="w-full h-auto opacity-90 brightness-110"
                    />
                  </div>
                  {/* Laptop lid reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* iPhone 15 Pro - Mobile View */}
              <div className="absolute right-[5%] bottom-0 w-[40%] md:w-[280px] z-20 transform translate-y-[-10%] translate-x-[-10%] hover:translate-y-[-15%] transition-transform duration-700 select-none">
                <div className="relative rounded-[3.5rem] overflow-hidden shadow-[0_80px_160px_-40px_rgba(0,0,0,1)] border-[8px] border-[#1C1C1F] bg-black ring-1 ring-white/20">
                  <img 
                    src={appMobileImg} 
                    alt="eKop GIAT Mobile App" 
                    className="w-full h-auto object-cover"
                  />
                  {/* Screen gloss effect */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                </div>
                {/* Floating Shadow for Phone */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-black/60 blur-2xl rounded-full" />
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12 order-1 lg:order-2"
            >
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 px-5 py-2 rounded-full overflow-hidden group"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-blue-400 font-black tracking-[0.3em] uppercase text-[10px] block">{appLabels[0]}</span>
                </motion.div>
                <h3 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                  {appHeadline.split(' ').slice(0, -2).join(' ')} <br/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                    {appHeadline.split(' ').slice(-2).join(' ')}
                  </span>
                </h3>
                <p className="text-slate-400 text-xl font-bold leading-relaxed max-w-xl">
                  {appSubHeadline}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {appFeatures.map((feat: any, i: number) => (
                  <div key={i} className="space-y-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-400 group-hover:text-white transition-all duration-300">
                      {feat.icon}
                    </div>
                    <div>
                      <h5 className="text-white font-black text-lg mb-1">{feat.title}</h5>
                      <p className="text-slate-500 font-bold text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-8 pt-10">
                <a 
                  href={appCta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#020617] px-14 py-6 rounded-[2.5rem] font-black text-xl shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:bg-blue-50 hover:scale-105 transition-all text-center flex items-center justify-center gap-4"
                >
                  {appCta.text}
                  <ArrowRight size={24} />
                </a>
                <div className="flex items-center gap-6">
                  <div className="h-12 w-px bg-white/10" />
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(s => <Sparkles key={s} size={12} className="text-blue-400" />)}
                    </div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{appLabels[1]}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NEW: Information Section (Colorfully updated) */}
      <section className="py-40 bg-[#F0F2F5] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(225,29,72,0.05),_transparent)]" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="space-y-6">
              <span className="text-giat-red font-black tracking-[0.4em] uppercase text-xs block">{infoSubtitle}</span>
              <h3 className="text-5xl md:text-7xl font-black text-giat-blue leading-none tracking-tighter" dangerouslySetInnerHTML={{ __html: infoTitle }} />
            </div>
            {infoLinkUrl.startsWith('http') ? (
              <a href={infoLinkUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 text-giat-blue font-black uppercase tracking-[0.2em] text-xs">
                {infoLinkText}
                <div className="w-16 h-16 rounded-full border-2 border-giat-blue/10 flex items-center justify-center group-hover:bg-giat-red group-hover:border-giat-red group-hover:text-white transition-all shadow-xl">
                  <ArrowRight size={28} />
                </div>
              </a>
            ) : (
              <Link to={infoLinkUrl} className="group flex items-center gap-6 text-giat-blue font-black uppercase tracking-[0.2em] text-xs">
                {infoLinkText}
                <div className="w-16 h-16 rounded-full border-2 border-giat-blue/10 flex items-center justify-center group-hover:bg-giat-red group-hover:border-giat-red group-hover:text-white transition-all shadow-xl">
                  <ArrowRight size={28} />
                </div>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {displayPosts.map((info, idx) => (
              <motion.div
                key={info.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-[0_20px_40px_-20px_rgba(30,58,138,0.1)] hover:shadow-[0_40px_80px_-20px_rgba(30,58,138,0.2)] transition-all duration-700"
              >
                <Link to={`/informasi/${info.id}`} className="block">
                  <div className="relative h-56 overflow-hidden">
                    <img src={info.image} alt={info.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xl px-4 py-1.5 rounded-xl text-[10px] font-black text-giat-red uppercase tracking-widest shadow-2xl">
                      {info.category}
                    </div>
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex items-center text-gray-400 text-[10px] font-black uppercase tracking-widest gap-4">
                      <div className="flex items-center gap-2"><Calendar size={12} className="text-giat-red" /> {info.date}</div>
                      <div className="flex items-center gap-2"><User size={12} className="text-giat-red" /> GIAT</div>
                    </div>
                    <h4 className="text-xl font-black text-giat-blue leading-tight group-hover:text-giat-red transition-colors line-clamp-2">
                      {info.title}
                    </h4>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Partners Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-20 px-4">
            <span className="text-gray-400 font-black tracking-[0.5em] uppercase text-[10px] block mb-8">{partnersTitle}</span>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-giat-red to-transparent mx-auto" />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-16 lg:gap-32 opacity-40 hover:opacity-100 transition-all duration-1000 grayscale hover:grayscale-0">
            {partnersList.map((p, idx) => (
              <PartnerLogo key={idx} partner={p} />
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Testimony Section (Vibrant Dark) */}
      <section className="py-40 bg-[#0A0A0A] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(225,29,72,0.1),_transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-32 space-y-6">
            <span className="text-giat-red font-black tracking-[0.4em] uppercase text-sm block">Suara Kebersamaan</span>
            <h3 className="text-4xl md:text-7xl font-black leading-tight tracking-tighter">{testimonialsTitle}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {testimonialsList.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 p-16 rounded-[5rem] border border-white/5 relative group hover:bg-white/10 transition-all duration-700 shadow-2xl"
              >
                <div className="absolute -top-10 left-16 w-20 h-20 bg-giat-red rounded-3xl flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-2xl">
                  <Quote size={40} className="text-white" />
                </div>
                <div className="flex gap-2 mb-8 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      fill={i < (t.rating || 5) ? "#E11D48" : "none"} 
                      stroke="#E11D48" 
                    />
                  ))}
                </div>
                <p className="text-2xl font-bold text-white/90 leading-relaxed mb-12 italic">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-8">
                  <div className="relative">
                    <TestimonialAvatar src={t.avatar} name={t.name} />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-giat-red rounded-full border-4 border-[#0A0A0A] flex items-center justify-center text-[10px] font-black">GIAT</div>
                  </div>
                  <div>
                    <h5 className="font-black text-2xl mb-1">{t.name}</h5>
                    <p className="text-giat-red text-xs font-black uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
