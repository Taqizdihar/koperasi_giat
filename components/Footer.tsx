
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white pt-32 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5 space-y-10">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-14 h-14 bg-giat-red rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-giat-red/20 transition-transform group-hover:rotate-12">G</div>
              <div className="flex flex-col -space-y-1">
                <span className="text-3xl font-black tracking-tighter">GIAT</span>
                <span className="text-xs font-black uppercase tracking-[0.4em] text-giat-red">KOPERASI</span>
              </div>
            </Link>
            
            <p className="text-xl text-white/50 leading-relaxed font-medium max-w-md">
              Membangun masa depan ekonomi Indonesia melalui inovasi koperasi digital yang inklusif dan berkelanjutan.
            </p>
            
            <div className="flex space-x-6">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <motion.a 
                  key={idx}
                  href="#" 
                  whileHover={{ y: -5, color: '#E11D48' }}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-giat-red">Navigasi</h4>
            <ul className="space-y-4 text-white/60 font-bold">
              {[
                { label: 'Beranda', path: '/' },
                { label: 'Tentang Kami', path: '/tentang' },
                { label: 'Layanan & Produk', path: '/layanan' },
                { label: 'Keanggotaan', path: '/keanggotaan' },
                { label: 'Kontak', path: '/kontak' },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path} className="hover:text-white transition-colors flex items-center group">
                    {item.label}
                    <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-giat-red">Legal</h4>
            <ul className="space-y-4 text-white/60 font-bold">
              {['Syarat & Ketentuan', 'Kebijakan Privasi', 'Laporan Tahunan', 'Tata Kelola'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-giat-red">Kantor Pusat</h4>
            <ul className="space-y-6 text-white/60 font-bold">
              <li className="flex items-start space-x-4">
                <MapPin size={24} className="text-giat-red shrink-0" />
                <span className="leading-relaxed">Jl. Ekonomi Makmur No. 88, Jakarta Selatan, 12190</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone size={24} className="text-giat-red shrink-0" />
                <span>+62-21-1234-5678</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail size={24} className="text-giat-red shrink-0" />
                <span>hello@koperasigiat.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-sm font-bold uppercase tracking-widest leading-none">
            © {currentYear} Koperasi GIAT. Established 1999.
          </p>
          <div className="flex space-x-8 text-white/30 text-xs font-black uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Youtube</a>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-giat-red/10 rounded-full blur-[120px] pointer-events-none" />
    </footer>
  );
};

export default Footer;
