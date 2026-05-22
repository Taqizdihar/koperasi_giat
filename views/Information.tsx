
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { LATEST_INFO } from '../constants';
import { Search, Filter, Calendar, User, ArrowRight } from 'lucide-react';

const Information: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInfo = LATEST_INFO.filter(info => 
    info.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    info.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
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
            Pusat Informasi
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-giat-blue leading-tight"
          >
            Info GIAT
          </motion.h1>
          <p className="text-gray-500 text-xl font-bold leading-relaxed max-w-2xl">
            Kumpulan berita terbaru, inovasi layanan, dan pembaruan strategis dari ekosistem Koperasi GIAT.
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
      </div>
    </div>
  );
};

export default Information;
