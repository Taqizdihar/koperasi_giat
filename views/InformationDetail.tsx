import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { LATEST_INFO } from '../constants';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';
import { fetchCmsPosts } from '../services/dataService';
import { CmsPost } from '../types';

// Helper function to format date
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

// Helper function to normalize CmsPost
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

const InformationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [posts, setPosts] = useState<CmsPost[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchCmsPosts();
      if (data) setPosts(data);
      setLoading(false);
    };
    loadPosts();
  }, []);

  // Find post in static or CMS data
  const getPost = () => {
    // Search CMS posts first
    const cmsPost = posts?.find(p => p.id === Number(id));
    if (cmsPost) {
      return normalizeCmsPost(cmsPost);
    }
    
    // Fallback to static info
    return LATEST_INFO.find(item => item.id === Number(id));
  };

  const info = getPost();

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
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Loading Post...</span>
        </div>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h2 className="text-2xl font-black text-giat-blue mb-6">Informasi tidak ditemukan.</h2>
        <Link to="/informasi" className="text-giat-red font-bold hover:underline flex items-center justify-center gap-2">
          <ArrowLeft size={18} /> Kembali ke Informasi
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Breadcrumb / Back */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link 
            to="/informasi" 
            className="group inline-flex items-center gap-3 text-gray-500 font-bold hover:text-giat-red transition-colors"
          >
            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-giat-red transition-colors">
              <ArrowLeft size={18} />
            </div>
            Kembali ke Info GIAT
          </Link>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="space-y-6 mb-12">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-2 bg-giat-red/10 text-giat-red text-xs font-black uppercase tracking-widest rounded-full"
            >
              {info.category}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-giat-blue leading-tight tracking-tight"
            >
              {info.title}
            </motion.h1>
            
            <div className="flex flex-wrap items-center gap-8 text-gray-400 text-sm font-bold pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-giat-red" />
                {info.date}
              </div>
              <div className="flex items-center gap-2">
                <User size={18} className="text-giat-red" />
                Diterbitkan oleh Admin
              </div>
              <div className="flex items-center gap-4 ml-auto">
                <span className="text-xs uppercase tracking-widest text-gray-300">Bagikan:</span>
                <button className="text-gray-400 hover:text-giat-red transition-colors"><Facebook size={18} /></button>
                <button className="text-gray-400 hover:text-giat-red transition-colors"><Twitter size={18} /></button>
                <button className="text-gray-400 hover:text-giat-red transition-colors"><LinkIcon size={18} /></button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-[3rem] overflow-hidden mb-16 shadow-2xl"
          >
            <img 
              src={info.image} 
              alt={info.title} 
              className="w-full h-auto aspect-video object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-xl prose-slate max-w-none"
          >
            {info.content.startsWith('<') ? (
              <div 
                className="text-gray-600 leading-relaxed font-medium text-xl prose max-w-none"
                dangerouslySetInnerHTML={{ __html: info.content }}
              />
            ) : (
              <p className="text-gray-600 leading-relaxed font-medium text-xl whitespace-pre-wrap">
                {info.content}
              </p>
            )}
            
            <div className="mt-16 p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100">
              <h4 className="text-giat-blue font-black text-xl mb-4">Ingin tahu lebih lanjut?</h4>
              <p className="text-gray-500 font-bold mb-8">
                Hubungi layanan bantuan kami untuk mendapatkan informasi mendalam mengenai program-program Koperasi GIAT.
              </p>
              <Link 
                to="/kontak"
                className="inline-flex bg-giat-blue text-white px-8 py-4 rounded-2xl font-black hover:bg-giat-red transition-all shadow-lg shadow-giat-blue/20"
              >
                Hubungi Kami
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InformationDetail;
