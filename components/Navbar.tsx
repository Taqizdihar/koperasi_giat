
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NAV_LINKS } from '../constants';
import { fetchCmsPages } from '../services/dataService';
import { CmsPage } from '../types';

const Navbar: React.FC = () => {
  const [pages, setPages] = useState<CmsPage[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCmsPages();
      if (data) setPages(data);
    };
    loadData();
  }, []);

  const getPathFromSlug = (slug: string) => {
    if (slug === 'koperasi-giat') return '/';
    if (slug === 'tentang-kami') return '/tentang';
    if (slug === 'layanan-produk') return '/layanan';
    return `/${slug}`;
  };

  const navLinks = pages && pages.length > 0
    ? pages
        .filter(p => p.is_in_navbar === 1 && p.status === 'published')
        .sort((a, b) => a.priority - b.priority)
        .map(p => ({
          label: p.title === "Koperasi Giat" ? "Beranda" : p.title,
          path: getPathFromSlug(p.slug)
        }))
    : NAV_LINKS;


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isWhiteBg = scrolled || !isHome || isOpen;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm' 
        : isHome 
          ? 'py-8 bg-transparent' 
          : 'py-4 bg-white border-b border-gray-100'
    }`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group perspective-1000">
          <motion.div 
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 bg-giat-red rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-giat-red/20 preserve-3d"
          >
            G
          </motion.div>
          <div className="flex flex-col -space-y-1">
            <span className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${
              isWhiteBg ? 'text-giat-blue' : 'text-white'
            }`}>
              GIAT
            </span>
            <span className={`text-[10px] font-black uppercase tracking-[0.3em] opacity-50 ${
              isWhiteBg ? 'text-giat-blue' : 'text-white'
            }`}>
              KOPERASI
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-base font-black uppercase tracking-widest transition-all group ${
                isWhiteBg ? 'text-giat-blue/70 hover:text-giat-red' : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
              <motion.div 
                className={`absolute -bottom-2 left-0 h-0.5 bg-giat-red rounded-full ${
                  location.pathname === link.path ? 'w-full' : 'w-0'
                }`}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute -bottom-2 left-0 h-0.5 w-0 bg-giat-red rounded-full group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <a 
            href="https://ekop.kopgiat.id/"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-8 py-3 rounded-full font-black text-base tracking-widest transition-all transform hover:scale-105 active:scale-95 ${
              isWhiteBg 
                ? 'bg-giat-red text-white shadow-xl shadow-giat-red/20' 
                : 'bg-white text-giat-blue shadow-xl shadow-white/10'
            }`}
          >
            eKop GIAT App
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`lg:hidden p-2 transition-colors ${isWhiteBg ? 'text-giat-blue' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden absolute top-0 left-0 w-full bg-white z-[-1] overflow-hidden"
          >
            <div className="flex flex-col justify-center h-full p-8 pt-24 space-y-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`text-5xl font-black tracking-tighter transition-colors ${
                      location.pathname === link.path ? 'text-giat-red' : 'text-giat-blue'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-10"
              >
                <a 
                  href="https://ekop.kopgiat.id/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-giat-red text-white text-center py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-giat-red/20"
                  onClick={() => setIsOpen(false)}
                >
                  eKop GIAT App
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
