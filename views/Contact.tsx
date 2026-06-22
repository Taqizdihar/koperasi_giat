
import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquareOff } from 'lucide-react';
import { motion } from 'motion/react';
import { fetchCmsPages } from '../services/dataService';
import { CmsPage } from '../types';
import { useSettings } from '../components/SettingsContext';

const Contact: React.FC = () => {
  const { settings } = useSettings();
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

  const contactPage = pages?.find(p => p.slug === 'kontak') || pages?.find(p => p.slug === 'koperasi-giat') || pages?.[0];
  const isFormActive = contactPage ? contactPage.is_contact_form_active : true;

  const heroBlocks = contactPage?.content?.filter((block: any) => block.type === 'hero') || [];
  const heroBlock = heroBlocks[0];
  const contactsBlock = contactPage?.content?.find((block: any) => block.type === 'contacts');
  const waChannelHeroBlock = heroBlocks.length > 2 ? heroBlocks[1] : undefined;
  const mapHeroBlock = heroBlocks.length > 2 ? heroBlocks[2] : heroBlocks[1];

  const heroHeadline = heroBlock?.data?.headline || "Kontak Kami";
  const heroSubHeadline = heroBlock?.data?.sub_headline || "Kami siap melayani dan menjawab setiap pertanyaan Anda tentang Koperasi GIAT dengan sepenuh hati.";
  const heroBgImage = heroBlock?.data?.background_image || "";

  const contactTitle = contactsBlock?.data?.title || "Informasi Kontak";
  
  // Helper to extract fallback contacts from settings
  const settingsAddresses = settings?.footer_contacts
    ?.filter(c => c.label.toLowerCase().includes('alamat') || c.label.toLowerCase().includes('address'))
    .map(c => c.value);
  const settingsPhones = settings?.footer_contacts
    ?.filter(c => c.label.toLowerCase().includes('telp') || c.label.toLowerCase().includes('phone') || c.label.toLowerCase().includes('wa') || c.label.toLowerCase().includes('hp') || c.label.toLowerCase().includes('no.'))
    .map(c => c.value);
  const settingsEmails = settings?.footer_contacts
    ?.filter(c => c.label.toLowerCase().includes('email') || c.label.toLowerCase().includes('mail'))
    .map(c => c.value);

  const defaultAddress = settingsAddresses && settingsAddresses.length > 0
    ? settingsAddresses[0]
    : settings?.google_maps_url || "Jl. Ekonomi Makmur No. 88, Tebet, Jakarta Selatan, 12810";

  const addressesList = contactsBlock?.data?.addresses && contactsBlock.data.addresses.length > 0
    ? contactsBlock.data.addresses
    : [defaultAddress];
  
  const phoneNumbersList = contactsBlock?.data?.phone_numbers && contactsBlock.data.phone_numbers.length > 0
    ? contactsBlock.data.phone_numbers
    : (settingsPhones && settingsPhones.length > 0 ? settingsPhones : ["(021) 1234-5678 / +62 812 3456 7890"]);

  const emailsList = contactsBlock?.data?.emails && contactsBlock.data.emails.length > 0
    ? contactsBlock.data.emails
    : (settingsEmails && settingsEmails.length > 0 ? settingsEmails : ["info@koperasigiat.co.id"]);

  const workingHours = contactsBlock?.data?.working_hours || "Senin - Jumat: 08:00 - 17:00 WIB\nSabtu: 08:00 - 12:00 WIB";

  const getMapLink = (urlOrAddress: string) => {
    if (!urlOrAddress) return "https://maps.app.goo.gl/iiTW4j6tM33NAkpj9";
    if (urlOrAddress.startsWith("http://") || urlOrAddress.startsWith("https://")) {
      return urlOrAddress;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(urlOrAddress)}`;
  };

  const mapLocationUrl = contactsBlock?.data?.map_location_url || getMapLink(settings?.google_maps_url || "https://maps.app.goo.gl/iiTW4j6tM33NAkpj9");

  // Dynamic values for WA/Email redirections if online form is disabled
  const rawPhone = phoneNumbersList[0] || "";
  const cleanPhone = rawPhone.replace(/\D/g, "");
  const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.substring(1) : (cleanPhone.startsWith('8') ? '62' + cleanPhone : cleanPhone);
  const waLink = waPhone ? `https://wa.me/${waPhone}` : "https://wa.me/6281234567890";
  const contactEmail = emailsList[0] || settings?.support_email || "info@koperasigiat.co.id";

  const mapHeroHeadline = mapHeroBlock?.data?.headline || "Lokasi Kantor Pusat";
  const mapHeroSubHeadline = mapHeroBlock?.data?.sub_headline || addressesList[0];
  const mapHeroBgImage = mapHeroBlock?.data?.background_image || "https://picsum.photos/id/164/1920/600";
  const mapHeroCtaText = mapHeroBlock?.data?.cta_buttons?.[0]?.text || "Buka di Google Maps →";
  const mapHeroCtaUrl = mapHeroBlock?.data?.cta_buttons?.[0]?.url || mapLocationUrl;

  const waChannelHeadline = waChannelHeroBlock?.data?.headline || "Follow our WhatsApp Channel";
  const waChannelCtaText = waChannelHeroBlock?.data?.cta_buttons?.[0]?.text || "WhatsApp Channel";
  const waChannelCtaUrl = waChannelHeroBlock?.data?.cta_buttons?.[0]?.url || "#";
  const waChannelImage = waChannelHeroBlock?.data?.images?.[0]?.url || "";

  return (
    <div>
      {/* Hero Section - Redesigned to be flush with Navbar */}
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
        {/* Background Patterns */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-black mb-6">{heroHeadline}</h1>
          <p className="text-blue-100/70 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            {heroSubHeadline}
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-giat-blue">{contactTitle}</h2>
                <p className="text-gray-600">Silakan kunjungi kantor kami atau hubungi kami melalui saluran berikut.</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-red-50 p-4 rounded-xl text-giat-red shadow-sm"><MapPin /></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-giat-blue">Alamat Kantor</h4>
                    {addressesList.map((addr: string, i: number) => (
                      <p key={i} className="text-gray-500">{addr}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="bg-blue-50 p-4 rounded-xl text-giat-blue shadow-sm"><Phone /></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-giat-blue">Telepon / WA</h4>
                    {phoneNumbersList.map((phone: string, i: number) => (
                      <p key={i} className="text-gray-500">{phone}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="bg-red-50 p-4 rounded-xl text-giat-red shadow-sm"><Mail /></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-giat-blue">Email</h4>
                    {emailsList.map((email: string, i: number) => (
                      <p key={i} className="text-gray-500">{email}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="bg-blue-50 p-4 rounded-xl text-giat-blue shadow-sm"><Clock /></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-giat-blue">Jam Operasional</h4>
                    <p className="text-gray-500 font-medium whitespace-pre-line">{workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl">
              {loading ? (
                <div className="space-y-6 animate-pulse">
                  <div className="h-8 bg-gray-200 rounded-md w-1/3 mb-8"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="h-4 bg-gray-200 rounded-md w-1/4 mb-2"></div>
                      <div className="h-12 bg-gray-200 rounded-xl"></div>
                    </div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded-md w-1/4 mb-2"></div>
                      <div className="h-12 bg-gray-200 rounded-xl"></div>
                    </div>
                  </div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded-md w-1/4 mb-2"></div>
                    <div className="h-12 bg-gray-200 rounded-xl"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded-md w-1/4 mb-2"></div>
                    <div className="h-28 bg-gray-200 rounded-xl"></div>
                  </div>
                  <div className="h-14 bg-gray-200 rounded-xl"></div>
                </div>
              ) : isFormActive ? (
                <>
                  <h3 className="text-2xl font-bold text-giat-blue mb-8">Kirim Pesan</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                        <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-giat-red transition-all" placeholder="Masukkan nama" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nomor WhatsApp</label>
                        <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-giat-red transition-all" placeholder="Contoh: 0812..." />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Pilih Topik</label>
                      <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-giat-red transition-all">
                        <option>Pendaftaran Anggota</option>
                        <option>Pengajuan Pinjaman</option>
                        <option>Kerjasama Kemitraan</option>
                        <option>Lainnya</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Pesan Anda</label>
                      <textarea rows={4} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-giat-red transition-all" placeholder="Tuliskan pesan atau pertanyaan Anda..."></textarea>
                    </div>
                    <button type="button" className="w-full bg-giat-red text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-500/30 active:scale-[0.98]">
                      Kirim Pesan Sekarang
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col justify-center items-center text-center relative overflow-hidden min-h-[400px]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-giat-red/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-giat-blue/5 rounded-full blur-2xl -ml-10 -mb-10"></div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-red-50 p-6 rounded-full text-giat-red mb-6 shadow-inner relative z-10"
                  >
                    <MessageSquareOff size={48} className="animate-pulse" />
                  </motion.div>

                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-2xl font-black text-giat-blue mb-4 relative z-10"
                  >
                    Layanan Pesan Dinonaktifkan
                  </motion.h3>

                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-gray-600 max-w-md mb-8 leading-relaxed relative z-10"
                  >
                    Saat ini formulir pengiriman pesan online kami sedang dinonaktifkan untuk pemeliharaan sistem atau pembaruan. 
                    Anda tetap dapat menghubungi kami secara langsung melalui kontak alternatif di samping.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 w-full justify-center relative z-10"
                  >
                    <a 
                      href={waLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-green-500/20 hover:scale-105 active:scale-95"
                    >
                      <Phone size={20} />
                      <span>Hubungi via WhatsApp</span>
                    </a>
                    <a 
                      href={`mailto:${contactEmail}`} 
                      className="bg-giat-blue hover:bg-blue-900 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-giat-blue/20 hover:scale-105 active:scale-95"
                    >
                      <Mail size={20} />
                      <span>Kirim Email</span>
                    </a>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WA Channel Section */}
      {waChannelHeroBlock && (
        <section className="py-24 bg-gradient-to-br from-green-50 to-green-100 relative overflow-hidden">
          {/* Background Decorative Pattern */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px] -mr-64 -mt-64"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px] -ml-64 -mb-64"></div>
          
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-16 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 border border-green-100">
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm">
                  <Phone size={16} />
                  <span>Komunitas GIAT</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-800 leading-tight">
                  {waChannelHeadline}
                </h2>
                <p className="text-gray-500 text-lg">
                  Dapatkan pembaruan langsung, berita terkini, dan informasi eksklusif dari Koperasi GIAT langsung di genggaman Anda.
                </p>
                <a 
                  href={waChannelCtaUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-xl shadow-green-500/30 hover:-translate-y-1"
                >
                  {waChannelCtaText}
                </a>
              </div>
              
              {waChannelImage && (
                <div className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0 bg-white p-4 rounded-3xl shadow-xl border border-gray-100 rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src={waChannelImage} 
                    alt="WhatsApp Channel QR Code" 
                    className="w-full h-full object-contain rounded-2xl"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Map Section */}
      <section className="h-[450px] bg-gray-200 relative group overflow-hidden">
        <a href={mapHeroCtaUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500 max-w-md mx-4">
            <MapPin size={48} className="mx-auto mb-4 text-giat-red" />
            <p className="font-bold text-giat-blue text-lg mb-2">{mapHeroHeadline}</p>
            <p className="text-sm font-medium text-gray-700">{mapHeroSubHeadline}</p>
            <span className="text-[10px] text-giat-red font-black uppercase tracking-widest mt-4 block">{mapHeroCtaText}</span>
          </div>
        </a>
        <img src={mapHeroBgImage} alt={mapHeroHeadline} className="w-full h-full object-cover opacity-60 grayscale group-hover:scale-105 transition-transform duration-1000" />
      </section>
    </div>
  );
};

export default Contact;
