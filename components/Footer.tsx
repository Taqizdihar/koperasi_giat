
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight,
  Linkedin,
  Youtube,
  Globe
} from 'lucide-react';
import { motion } from 'motion/react';
import { useSettings } from './SettingsContext';

const TiktokIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { settings } = useSettings();

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'facebook': return Facebook;
      case 'twitter': return Twitter;
      case 'instagram': return Instagram;
      case 'linkedin': return Linkedin;
      case 'tiktok': return TiktokIcon as any;
      case 'youtube': return Youtube;
      default: return Globe;
    }
  };

  const getMapLink = (urlOrAddress: string) => {
    if (!urlOrAddress) return "https://maps.app.goo.gl/iiTW4j6tM33NAkpj9";
    if (urlOrAddress.startsWith("http://") || urlOrAddress.startsWith("https://")) {
      return urlOrAddress;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(urlOrAddress)}`;
  };

  return (
    <footer className="bg-[#0A0A0A] text-white pt-32 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5 space-y-10">
            <Link to="/" className="flex items-center space-x-3 group">
              {settings?.logo_url ? (
                <img 
                  src={settings.logo_url} 
                  alt={settings.site_name || "Logo"} 
                  className="w-14 h-14 object-contain rounded-2xl"
                />
              ) : (
                <div className="w-14 h-14 bg-giat-red rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-giat-red/20 transition-transform group-hover:rotate-12">G</div>
              )}
              <div className="flex flex-col -space-y-1">
                <span className="text-3xl font-black tracking-tighter">
                  {settings?.site_name ? settings.site_name.split(' ')[0] : 'GIAT'}
                </span>
                <span className="text-xs font-black uppercase tracking-[0.4em] text-giat-red">
                  {settings?.site_name ? settings.site_name.split(' ').slice(1).join(' ') : 'KOPERASI'}
                </span>
              </div>
            </Link>
            
            <p className="text-xl text-white/50 leading-relaxed font-medium max-w-md">
              {settings?.footer_text || settings?.tagline || "Membangun masa depan ekonomi Indonesia melalui inovasi koperasi digital yang inklusif dan berkelanjutan."}
            </p>
            
            <div className="flex space-x-6">
              {settings?.social_links && settings.social_links.length > 0 ? (
                settings.social_links
                  .filter(link => link.url)
                  .map((link, idx) => {
                    const IconComponent = getSocialIcon(link.icon);
                    return (
                      <motion.a 
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, color: '#E11D48' }}
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 transition-colors"
                      >
                        <IconComponent size={20} />
                      </motion.a>
                    );
                  })
              ) : (
                [
                  { icon: 'facebook', url: '#' },
                  { icon: 'instagram', url: 'https://www.instagram.com/giatsejahterabersama/?hl=en' },
                  { icon: 'twitter', url: '#' }
                ].map((link, idx) => {
                  const IconComponent = getSocialIcon(link.icon);
                  return (
                    <motion.a 
                      key={idx}
                      href={link.url} 
                      whileHover={{ y: -5, color: '#E11D48' }}
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 transition-colors"
                    >
                      <IconComponent size={20} />
                    </motion.a>
                  );
                })
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-giat-red">Navigasi</h4>
            <ul className="space-y-4 text-white/60 font-bold">
              {(settings?.footer_nav_1 && settings.footer_nav_1.length > 0
                ? settings.footer_nav_1.map(item => {
                    let path = item.url;
                    if (!path) {
                      const label = item.label.toLowerCase();
                      if (label.includes('beranda') || label.includes('home')) path = '/';
                      else if (label.includes('tentang') || label.includes('about')) path = '/tentang';
                      else if (label.includes('layanan') || label.includes('produk') || label.includes('service')) path = '/layanan';
                      else if (label.includes('keanggotaan') || label.includes('member')) path = '/keanggotaan';
                      else if (label.includes('informasi') || label.includes('info') || label.includes('news')) path = '/informasi';
                      else if (label.includes('kontak') || label.includes('contact')) path = '/kontak';
                      else path = '#';
                    }
                    return { label: item.label, path };
                  })
                : [
                    { label: 'Beranda', path: '/' },
                    { label: 'Tentang Kami', path: '/tentang' },
                    { label: 'Layanan & Produk', path: '/layanan' },
                    { label: 'Keanggotaan', path: '/keanggotaan' },
                    { label: 'Kontak', path: '/kontak' },
                  ]
              ).map((item, idx) => (
                <li key={idx}>
                  {item.path.startsWith('/') ? (
                    <Link to={item.path} className="hover:text-white transition-colors flex items-center group">
                      {item.label}
                      <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                    </Link>
                  ) : (
                    <a href={item.path} className="hover:text-white transition-colors flex items-center group">
                      {item.label}
                      <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-giat-red">Legal</h4>
            <ul className="space-y-4 text-white/60 font-bold">
              {(settings?.footer_nav_2 && settings.footer_nav_2.length > 0
                ? settings.footer_nav_2.map(item => ({ label: item.label, url: item.url || '#' }))
                : [
                    { label: 'Syarat & Ketentuan', url: '#' },
                    { label: 'Kebijakan Privasi', url: '#' },
                    { label: 'Laporan Tahunan', url: '#' },
                    { label: 'Tata Kelola', url: '#' },
                  ]
              ).map((item, idx) => (
                <li key={idx}>
                  <a href={item.url} className="hover:text-white transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-giat-red">Kantor Pusat</h4>
            <ul className="space-y-6 text-white/60 font-bold">
              {settings?.footer_contacts && settings.footer_contacts.length > 0 ? (
                settings.footer_contacts.map((contact, idx) => {
                  const label = contact.label.toLowerCase();
                  if (label.includes('alamat') || label.includes('address')) {
                    return (
                      <li key={idx} className="flex items-start space-x-4">
                        <MapPin size={24} className="text-giat-red shrink-0" />
                        <a 
                          href={getMapLink(contact.value)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="leading-relaxed hover:text-white transition-colors"
                        >
                          {contact.value}
                        </a>
                      </li>
                    );
                  } else if (label.includes('telp') || label.includes('phone') || label.includes('wa') || label.includes('hp') || label.includes('no.')) {
                    return (
                      <li key={idx} className="flex items-center space-x-4">
                        <Phone size={24} className="text-giat-red shrink-0" />
                        <a href={`tel:${contact.value}`} className="hover:text-white transition-colors">
                          {contact.value}
                        </a>
                      </li>
                    );
                  } else if (label.includes('email') || label.includes('mail')) {
                    return (
                      <li key={idx} className="flex items-center space-x-4">
                        <Mail size={24} className="text-giat-red shrink-0" />
                        <a href={`mailto:${contact.value}`} className="hover:text-white transition-colors">
                          {contact.value}
                        </a>
                      </li>
                    );
                  } else {
                    return (
                      <li key={idx} className="flex items-start space-x-4">
                        <span className="text-giat-red shrink-0 font-black">{contact.label}:</span>
                        <span className="leading-relaxed">{contact.value}</span>
                      </li>
                    );
                  }
                })
              ) : (
                <>
                  <li className="flex items-start space-x-4">
                    <MapPin size={24} className="text-giat-red shrink-0" />
                    <a 
                      href={getMapLink(settings?.google_maps_url || "Jl. Ekonomi Makmur No. 88, Jakarta Selatan, 12190")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="leading-relaxed hover:text-white transition-colors"
                    >
                      {settings?.google_maps_url || "Jl. Ekonomi Makmur No. 88, Jakarta Selatan, 12190"}
                    </a>
                  </li>
                  <li className="flex items-center space-x-4">
                    <Phone size={24} className="text-giat-red shrink-0" />
                    <span>+62-21-1234-5678</span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <Mail size={24} className="text-giat-red shrink-0" />
                    <span>hello@koperasigiat.id</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-sm font-bold uppercase tracking-widest leading-none">
            {settings?.copyright_text || `© ${currentYear} Koperasi GIAT. Established 1999.`}
          </p>
          <div className="flex space-x-8 text-white/30 text-xs font-black uppercase tracking-widest">
            {settings?.social_links && settings.social_links.length > 0 ? (
              settings.social_links
                .filter(link => link.url)
                .map((link, idx) => (
                  <a 
                    key={idx} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors capitalize"
                  >
                    {link.icon}
                  </a>
                ))
            ) : (
              <>
                <a href="https://www.instagram.com/giatsejahterabersama/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">Youtube</a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-giat-red/10 rounded-full blur-[120px] pointer-events-none" />
    </footer>
  );
};

export default Footer;
