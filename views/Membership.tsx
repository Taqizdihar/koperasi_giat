
import React from 'react';
import { 
  CheckCircle2, 
  UserPlus, 
  ClipboardCheck, 
  Wallet, 
  UserCheck, 
  Quote, 
  Users, 
  Heart, 
  Star,
  Sparkles
} from 'lucide-react';
import { MemberProfile, Testimonial } from '../types';

const MEMBERS: MemberProfile[] = [
  { name: "Bpk. Hendra", role: "Ketua Pengurus", quote: "Kepercayaan anggota adalah amanah terbesar kami.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" },
  { name: "Ibu Siti", role: "Anggota (Mitra UMKM)", quote: "Berkat GIAT, warung kelontong saya kini punya cabang.", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop" },
  { name: "Andi Wijaya", role: "Anggota Muda", quote: "Simpanan di GIAT bikin masa depan terasa lebih aman.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop" },
  { name: "Ibu Ratna", role: "Sekretaris Koperasi", quote: "Transparansi adalah kunci gotong royong modern.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop" },
  { name: "Bpk. Yusuf", role: "Mitra Petani", quote: "Pinjaman modal GIAT cair cepat saat musim tanam.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop" },
  { name: "Maya Sastra", role: "Anggota Kreatif", quote: "Komunitasnya hangat, terasa seperti keluarga sendiri.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop" },
  { name: "Bpk. Budi", role: "Dewan Pengawas", quote: "Kami memastikan setiap rupiah anggota aman dan produktif.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop" },
  { name: "Ibu Lani", role: "Anggota Senior", quote: "20 tahun bersama GIAT, saya saksi nyata pertumbuhannya.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop" },
];

const TESTIMONIALS: Testimonial[] = [
  { name: "Deni Saputra", city: "Bandung", content: "Proses pendaftaran sangat mudah. Admin responsif dan menjelaskan semua manfaat dengan sangat detail.", image: "https://i.pravatar.cc/150?u=deni" },
  { name: "Linda Kusuma", city: "Surabaya", content: "SHU yang dibagikan setiap tahun sangat membantu tambahan tabungan keluarga saya. Sangat terpercaya!", image: "https://i.pravatar.cc/150?u=linda" },
  { name: "Eko Prasetyo", city: "Yogyakarta", content: "Bukan sekadar simpan pinjam, pelatihan UKM dari GIAT benar-benar mengubah cara saya berbisnis.", image: "https://i.pravatar.cc/150?u=eko" },
];

const Membership: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section - Redesigned to be flush with Navbar */}
      <section className="relative bg-giat-red pt-32 pb-20 md:pt-48 md:pb-32 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
            <Sparkles size={16} className="text-yellow-300" />
            <span className="text-xs font-bold uppercase tracking-widest">Keluarga Besar GIAT</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Koperasi Ini <br />
            <span className="text-blue-100">Dibangun oleh Kita</span>
          </h1>
          <p className="text-red-50 max-w-2xl mx-auto text-xl font-medium opacity-90 leading-relaxed">
            Koperasi GIAT bukan sekadar institusi keuangan, melainkan komunitas nyata di mana setiap wajah memiliki cerita dan peran penting.
          </p>
        </div>
      </section>

      {/* Faces of GIAT Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-giat-blue font-black text-4xl">Wajah-Wajah GIAT</h2>
            <div className="w-24 h-1.5 bg-giat-red mx-auto rounded-full"></div>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Kenali lebih dekat orang-orang hebat yang bersama-sama menggerakkan roda ekonomi gotong royong di Koperasi GIAT.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {MEMBERS.map((member, idx) => (
              <div key={idx} className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-giat-blue via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                  <div className="bg-giat-red inline-block px-3 py-1 rounded-lg text-[10px] font-bold uppercase mb-2">
                    {member.role}
                  </div>
                  <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                  <p className="text-sm text-blue-100 italic opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    "{member.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simplified Benefits & Requirements */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Benefits List */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-giat-blue">Mengapa Gabung Bersama Kami?</h2>
                <p className="text-gray-500">Manfaat yang Anda dapatkan lebih dari sekadar bunga simpanan.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "SHU Tahunan", desc: "Pembagian sisa hasil usaha yang transparan.", icon: <Star className="text-giat-red" /> },
                  { title: "Bunga Rendah", desc: "Pinjaman modal dengan sistem yang meringankan.", icon: <Wallet className="text-giat-red" /> },
                  { title: "Pelatihan Gratis", desc: "Workshop bisnis & keuangan rutin untuk anggota.", icon: <Sparkles className="text-giat-red" /> },
                  { title: "Proteksi Sosial", desc: "Dana sosial bagi anggota yang membutuhkan.", icon: <Heart className="text-giat-red" /> },
                ].map((benefit, i) => (
                  <div key={i} className="flex space-x-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-red-50 p-3 rounded-xl h-fit">{benefit.icon}</div>
                    <div>
                      <h4 className="font-bold text-giat-blue">{benefit.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements Card */}
            <div className="lg:col-span-5">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-giat-red/5 rounded-full -mr-16 -mt-16"></div>
                <h3 className="text-2xl font-black text-giat-blue mb-8">Syarat Bergabung</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Dokumen</span>
                    <span className="text-sm font-bold text-giat-blue">KTP & NPWP</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Usia</span>
                    <span className="text-sm font-bold text-giat-blue">Min. 17 Tahun</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Setoran Pokok</span>
                    <span className="text-sm font-bold text-giat-red">Rp 100.000</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600 font-medium">Setoran Wajib</span>
                    <span className="text-sm font-bold text-giat-red">Rp 50.000/bln</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-400 bg-gray-50 p-4 rounded-xl">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  <p>Data Anda aman bersama kami dan dijamin kerahasiaannya.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-giat-blue">Kisah Sukses Anggota</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testi, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative hover:shadow-xl transition-all">
                <div className="absolute -top-4 -right-4 bg-giat-red text-white p-3 rounded-full shadow-lg">
                  <Quote size={20} fill="currentColor" />
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed italic">"{testi.content}"</p>
                <div className="flex items-center space-x-4">
                  <img src={testi.image} alt={testi.name} className="w-12 h-12 rounded-full border-2 border-giat-red" />
                  <div>
                    <h5 className="font-bold text-giat-blue">{testi.name}</h5>
                    <p className="text-xs text-gray-400">{testi.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Massive CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-giat-blue rounded-[3.5rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-10">
              <div className="flex justify-center -space-x-4 mb-4">
                {[1,2,3,4,5].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/150?img=${i+10}`} className="w-14 h-14 rounded-full border-4 border-giat-blue" alt="Avatar" />
                ))}
                <div className="w-14 h-14 rounded-full border-4 border-giat-blue bg-giat-red flex items-center justify-center font-bold text-sm">+5k</div>
              </div>
              <h2 className="text-3xl md:text-5xl font-black">Yuk Jadi Bagian dari <span className="text-giat-red">Keluarga GIAT</span></h2>
              <p className="text-xl text-blue-100/70">
                Langkah kecil Anda hari ini adalah awal dari kemandirian ekonomi yang lebih baik bagi semua.
              </p>
              <button className="bg-giat-red text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-red-700 transition-all shadow-2xl hover:shadow-red-500/50 hover:scale-105 active:scale-95">
                Daftar Jadi Anggota Sekarang
              </button>
              <p className="text-xs text-blue-100/30">Hanya membutuhkan waktu 5 menit untuk pendaftaran online.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
