
import React from 'react';
import { Target, Eye, Heart, Shield, Users, Sparkles, UserCheck, Briefcase, Glasses } from 'lucide-react';
import { ORGANIZATION_STRUCTURE } from '../constants';
import { motion } from 'motion/react';

const About: React.FC = () => {
  return (
    <div>
      {/* Header - Redesigned to be flush with Navbar */}
      <section className="bg-giat-blue pt-32 pb-20 md:pt-44 md:pb-32 text-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-black mb-6">Tentang Kami</h1>
          <p className="text-blue-100/70 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            Mengenal lebih dekat visi, misi, dan sejarah panjang Koperasi GIAT dalam melayani anggota dengan penuh integritas.
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
                <span>Sejarah Kami</span>
              </div>
              <h2 className="text-3xl font-black text-giat-blue">Dua Dekade Mengabdi</h2>
              <div className="w-20 h-1.5 bg-giat-red mb-8 rounded-full"></div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Koperasi GIAT didirikan pada tahun 1999 oleh sekelompok profesional yang memiliki visi yang sama untuk memajukan ekonomi kerakyatan melalui sistem gotong royong yang modern.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Berawal dari hanya 50 anggota pendiri dengan modal swadaya, kini Koperasi GIAT telah tumbuh menjadi salah satu koperasi terbesar di wilayahnya dengan ribuan anggota yang tersebar di berbagai sektor industri.
              </p>
              <p className="text-gray-600 leading-relaxed italic border-l-4 border-giat-red pl-6 py-2 bg-gray-50 rounded-r-xl">
                Kami terus bertransformasi mengikuti perkembangan teknologi tanpa meninggalkan nilai-nilai dasar kekeluargaan yang telah menjadi pondasi kami selama lebih dari dua dekade.
              </p>
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
              <h3 className="text-2xl font-black text-giat-blue mb-6">Visi Kami</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Menjadi lembaga ekonomi kerakyatan terdepan yang profesional, mandiri, dan inklusif untuk mewujudkan kesejahteraan anggota yang berkelanjutan di era digital.
              </p>
            </div>
            
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border-t-8 border-giat-blue hover:shadow-xl transition-all duration-500">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="text-giat-blue" size={32} />
              </div>
              <h3 className="text-2xl font-black text-giat-blue mb-6">Misi Kami</h3>
              <ul className="space-y-4 text-gray-600">
                {[
                  "Menyelenggarakan unit usaha simpan pinjam yang aman dan transparan.",
                  "Mengembangkan kemitraan strategis untuk memperluas manfaat ekonomi anggota.",
                  "Meningkatkan literasi keuangan dan digital bagi seluruh anggota.",
                  "Membangun ekosistem bisnis yang inovatif dan berorientasi pada hasil."
                ].map((item, i) => (
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
            <h2 className="text-giat-red font-bold tracking-widest uppercase text-sm">Prinsip Kami</h2>
            <h3 className="text-3xl md:text-4xl font-black text-giat-blue">Nilai-Nilai Koperasi GIAT</h3>
            <div className="w-24 h-1.5 bg-giat-red mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                title: 'Integritas', 
                desc: 'Bekerja dengan jujur, transparan, dan menjunjung tinggi kode etik profesional dalam setiap transaksi.',
                icon: <Heart size={40} />,
                color: 'red'
              },
              { 
                title: 'Kekeluargaan', 
                desc: 'Membangun hubungan erat antar anggota dan pengurus layaknya keluarga besar yang saling mendukung.',
                icon: <Users size={40} />,
                color: 'blue'
              },
              { 
                title: 'Transparansi', 
                desc: 'Keterbukaan informasi dan laporan keuangan yang akurat serta dapat diakses oleh seluruh anggota.',
                icon: <Shield size={40} />,
                color: 'red'
              }
            ].map((item, idx) => (
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
            <h2 className="text-giat-red font-bold tracking-widest uppercase text-sm">Tim Kami</h2>
            <h3 className="text-3xl md:text-5xl font-black text-giat-blue">Struktur Organisasi</h3>
            <div className="w-24 h-1.5 bg-giat-red mx-auto rounded-full"></div>
            <p className="text-gray-500 font-bold max-w-2xl mx-auto pt-4 leading-relaxed">
              Dikelola oleh tenaga profesional dan berpengalaman untuk menjamin tata kelola koperasi yang baik dan berkelanjutan.
            </p>
          </div>

          <div className="space-y-32">
            {/* Pengawas */}
            <div className="space-y-12">
              <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
                <div className="p-3 bg-giat-red text-white rounded-xl shadow-lg shadow-red-500/20">
                  <Glasses size={24} />
                </div>
                <h4 className="text-3xl font-black text-giat-blue">Dewan Pengawas</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {ORGANIZATION_STRUCTURE.pengawas.map((person, i) => (
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

            {/* Pengurus */}
            <div className="space-y-12">
              <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
                <div className="p-3 bg-giat-blue text-white rounded-xl shadow-lg shadow-giat-blue/20">
                  <UserCheck size={24} />
                </div>
                <h4 className="text-3xl font-black text-giat-blue">Pengurus Koperasi</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {ORGANIZATION_STRUCTURE.pengurus.map((person, i) => (
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

            {/* Manajemen */}
            <div className="space-y-12">
              <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
                <div className="p-3 bg-gray-800 text-white rounded-xl shadow-lg shadow-gray-800/20">
                  <Briefcase size={24} />
                </div>
                <h4 className="text-3xl font-black text-giat-blue">Manajemen Operasional</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {ORGANIZATION_STRUCTURE.manajemen.map((person, i) => (
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
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-giat-blue rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-giat-blue/40 group">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] -mr-48 -mt-48 group-hover:bg-white/10 transition-colors duration-700"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10 space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Mari Tumbuh <br/> Bersama Kami</h2>
              <p className="text-blue-100/70 text-xl max-w-2xl mx-auto font-bold leading-relaxed">
                Bergabunglah dengan ribuan anggota lainnya dan rasakan manfaat nyata dari ekonomi gotong royong yang modern.
              </p>
              <div className="pt-6">
                <button className="bg-giat-red text-white px-12 py-6 rounded-3xl font-black text-xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 hover:-translate-y-2 active:scale-95">
                  Mulai Bergabung Sekarang
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

