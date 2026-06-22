
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { LATEST_INFO } from '../constants';
import { Search, Filter, Calendar, User, ArrowRight } from 'lucide-react';
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

const normalizeCmsPost = (post: CmsPost | any) => {
  const contentItem = post.content?.[0];
  return {
    id: post.id,
    title: post.title,
    date: formatPostDate(post.created_at),
    category: contentItem?.tags || post.category_name || post.category || "Berita",
    image: contentItem?.featured_image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1974&auto=format&fit=crop",
    excerpt: post.excerpt || contentItem?.excerpt || "",
    content: contentItem?.body_content || ""
  };
};

// Helper function to parse rich text content for Information Header Section
const parseInfoRichText = (htmlContent: string) => {
  if (!htmlContent) return null;
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    const subtitle = doc.querySelector('p strong')?.textContent || 'Pusat Informasi';
    const title = doc.querySelector('h1')?.textContent || 'Info GIAT';
    
    // Find description paragraph
    const pElements = Array.from(doc.querySelectorAll('p'));
    let description = 'Kumpulan berita terbaru, inovasi layanan, dan pembaruan strategis dari ekosistem Koperasi GIAT.';
    
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
      subtitle: 'Pusat Informasi',
      title: 'Info GIAT',
      description: 'Kumpulan berita terbaru, inovasi layanan, dan pembaruan strategis dari ekosistem Koperasi GIAT.'
    };
  }
};

const Information: React.FC = () => {
  const [pages, setPages] = useState<CmsPage[] | null>(null);
  const [posts, setPosts] = useState<CmsPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);

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

  const infoPagesArray = pages && Array.isArray(pages) ? pages : [];
  const infoPage = infoPagesArray.find(p => p && p.slug === 'informasi') || infoPagesArray[0];
  const richTextBlock = infoPage?.content?.find((block: PageBlock) => block && block.type === 'rich-text');
  const feedBlocks = infoPage?.content?.filter((block: PageBlock) => block && block.type === 'dynamic-post-feed') || [];
  const ctaBlock = infoPage?.content?.find((block: PageBlock) => block && block.type === 'cta-banner');

  const parsedHeader = richTextBlock?.data?.content ? parseInfoRichText(richTextBlock.data.content) : null;
  const headerSubtitle = parsedHeader?.subtitle || "Pusat Informasi";
  const headerTitle = parsedHeader?.title || "Info GIAT";
  const headerDesc = parsedHeader?.description || "Kumpulan berita terbaru, inovasi layanan, dan pembaruan strategis dari ekosistem Koperasi GIAT.";

  // Safe CTA block values
  const ctaHeadline = ctaBlock?.data?.headline || "Ingin tahu lebih lanjut?";
  const ctaSubHeadline = ctaBlock?.data?.sub_headline || "Hubungi layanan bantuan kami untuk mendapatkan informasi mendalam mengenai program-program Koperasi GIAT.";
  const ctaButtonText = ctaBlock?.data?.button_text || "Hubungi Kami";
  const ctaButtonLink = ctaBlock?.data?.button_link || "/kontak";
  const ctaBgColor = ctaBlock?.data?.background_color || '#F9FAFB';
  const ctaBgImageUrl = ctaBlock?.data?.background_image_url || null;

  // Filter and pool posts based on all dynamic-post-feed blocks
  const getCmsPostsPool = () => {
    // Normalize static fallback posts
    const staticPosts = LATEST_INFO.map(p => ({
      ...p,
      content: p.content // ensure standard format
    }));

    // Normalize CMS fetched posts
    const cmsPosts = posts && Array.isArray(posts) 
      ? posts.filter(p => p && p.id).map(normalizeCmsPost) 
      : [];

    // Combine them in a Map to avoid duplicates by ID (CMS overwrites static ones if they share ID)
    const allPostsMap = new Map<number, any>();
    staticPosts.forEach(p => allPostsMap.set(p.id, p));
    cmsPosts.forEach(p => allPostsMap.set(p.id, p));

    const allUnifiedPosts = Array.from(allPostsMap.values());

    if (feedBlocks.length === 0) {
      return allUnifiedPosts;
    }

    const matchedPostsMap = new Map<number, any>();
    
    feedBlocks.forEach(block => {
      if (!block || !block.data) return;
      // Sort descending by ID so newest posts are first
      let postsList = [...allUnifiedPosts].sort((a, b) => b.id - a.id);
      const { category, limit, sort_order, selection_mode, selected_post_ids } = block.data || {};
      
      if (selection_mode === 'manual' && Array.isArray(selected_post_ids) && selected_post_ids.length > 0) {
        postsList = postsList.filter(post => post && selected_post_ids.map(id => Number(id)).includes(Number(post.id)));
      } else {
        if (category && category !== 'Semua Kategori' && category !== 'All') {
          postsList = postsList.filter(post => post && post.category && post.category.toLowerCase() === category.toLowerCase());
        }
      }
      
      if (sort_order === 'asc') {
        postsList = postsList.reverse();
      }
      
      const maxLimit = typeof limit === 'number' ? limit : parseInt(limit) || 6;
      postsList.slice(0, maxLimit).forEach(post => {
        if (post && post.id) {
          matchedPostsMap.set(post.id, post);
        }
      });
    });
    
    return Array.from(matchedPostsMap.values());
  };

  const basePosts = getCmsPostsPool();

  const filteredInfo = basePosts.filter(info => 
    info && info.title && (
      info.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (info.excerpt && info.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  const displayedInfo = filteredInfo.slice(0, visibleCount);
  const hasMore = visibleCount < filteredInfo.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 2);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="max-w-4xl mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-giat-red font-black tracking-[0.2em] uppercase text-sm block"
          >
            {headerSubtitle}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-giat-blue leading-tight"
          >
            {headerTitle}
          </motion.h1>
          <p className="text-gray-500 text-xl font-bold leading-relaxed max-w-2xl">
            {headerDesc}
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="flex-grow relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Cari berita atau informasi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-5 bg-white rounded-[2rem] border-none shadow-sm focus:ring-2 focus:ring-giat-red/20 outline-none font-medium"
            />
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-5 bg-white rounded-[2rem] shadow-sm font-bold flex items-center gap-3 text-giat-blue hover:text-giat-red transition-all">
              <Filter size={18} />
              Kategori
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimatePresence mode='popLayout'>
            {displayedInfo.map((info, idx) => (
              <motion.div
                key={info.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group bg-white rounded-[3rem] overflow-hidden border border-transparent hover:border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <Link to={`/informasi/${info.id}`} className="block">
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={info.image} 
                      alt={info.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-giat-red text-xs font-black uppercase tracking-widest shadow-lg">
                      {info.category}
                    </div>
                  </div>
                  <div className="p-10 space-y-6">
                    <div className="flex items-center gap-6 text-gray-400 text-sm font-bold">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-giat-red" />
                        {info.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-giat-red" />
                        Admin
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-giat-blue leading-tight group-hover:text-giat-red transition-colors">
                      {info.title}
                    </h3>
                    <p className="text-gray-500 font-medium leading-relaxed line-clamp-2">
                      {info.excerpt}
                    </p>
                    <div className="pt-4">
                      <div className="inline-flex items-center text-giat-blue font-black group-hover:text-giat-red transition-colors">
                        Baca Selengkapnya
                        <div className="ml-3 w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-giat-red transition-colors">
                          <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="mt-20 text-center">
            <button 
              onClick={handleLoadMore}
              className="px-12 py-5 bg-giat-blue text-white rounded-full font-black text-lg hover:bg-giat-red transition-all shadow-xl shadow-giat-blue/20 transform hover:scale-105 active:scale-95"
            >
              Muat Lebih Banyak
            </button>
          </div>
        )}

        {filteredInfo.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-gray-500 font-bold text-xl">Tidak ada informasi yang sesuai dengan pencarian Anda.</p>
          </div>
        )}

        {/* CTA Banner from CMS */}
        {ctaBlock && (
          <div className="mt-24 max-w-5xl mx-auto">
            <div 
              style={{ 
                backgroundColor: ctaBgImageUrl ? undefined : ctaBgColor,
                backgroundImage: ctaBgImageUrl ? `url(${ctaBgImageUrl})` : undefined,
                backgroundSize: ctaBgImageUrl ? 'cover' : undefined,
                backgroundPosition: ctaBgImageUrl ? 'center' : undefined,
              }}
              className="rounded-[3rem] p-12 md:p-16 text-center border border-gray-100 shadow-sm relative overflow-hidden group"
            >
              <div className="relative z-10 space-y-6">
                <h3 className="text-3xl md:text-4xl font-black text-giat-blue">
                  {ctaHeadline}
                </h3>
                <p className="text-gray-500 text-lg font-bold max-w-2xl mx-auto leading-relaxed">
                  {ctaSubHeadline}
                </p>
                <div className="pt-4">
                  <Link 
                    to={ctaButtonLink}
                    className="inline-flex bg-giat-red text-white px-10 py-5 rounded-2xl font-black hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 hover:-translate-y-1"
                  >
                    {ctaButtonText}
                  </Link>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-giat-red/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-giat-blue/5 rounded-full blur-2xl -ml-10 -mb-10"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Information;
