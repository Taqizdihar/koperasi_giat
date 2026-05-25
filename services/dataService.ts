import { CmsPage, CmsPost, CmsSettings } from '../types';

/**
 * Service untuk mengambil data dari CMS API Baru Koperasi Giat
 */

const DEFAULT_API_URL = 'https://uni-verse-headless-cms.onrender.com/api/v1/public/pages';
const DEFAULT_API_KEY = 'uni_d5929cec964d0fb5208bc3b33098761da92265b7b224c6ac';

// Helper to resolve real API url and key dynamically
const getApiConfig = () => {
  const envUrl = import.meta.env.VITE_CMS_API_URL || '';
  const envKey = import.meta.env.VITE_CMS_API_KEY || '';

  // Intercept dummy, empty, or outdated wrong endpoints (e.g. ending in /api/pages)
  const isDummyUrl = 
    !envUrl || 
    envUrl.includes('example.com') || 
    envUrl.includes('kopgiat.id') ||
    envUrl.endsWith('/api/pages') ||
    envUrl.endsWith('/api/pages/');
    
  const isDummyKey = !envKey || envKey === 'PLACEHOLDER_API_KEY';

  return {
    url: isDummyUrl ? DEFAULT_API_URL : envUrl,
    key: isDummyKey ? DEFAULT_API_KEY : envKey
  };
};

// Mock Data berdasarkan spesifikasi struktur JSON endpoint dari user
export const MOCK_CMS_PAGES: CmsPage[] = [
  {
    id: 82,
    tenant_id: 22,
    title: "Koperasi Giat",
    slug: "koperasi-giat",
    content: [
      {
        id: "1779351490842fk1yf1k",
        type: "hero",
        data: {
          headline: "Unit Usaha Produktif",
          sub_headline: "Kami mengembangkan berbagai unit bisnis kreatif untuk menciptakan nilai tambah dan bagi hasil yang maksimal bagi anggota. YYAHHHH",
          background_image: "",
          stats: [
            {
              label: "",
              value: ""
            }
          ]
        }
      },
      {
        id: "1779353465316kwxp3dv",
        type: "hero",
        data: {
          headline: "Unit Usaha Koperasi lagi",
          sub_headline: "Kami mengembangkan berbagai unit bisnis kreatif untuk menciptakan nilai tambah dan bagi hasil yang maksimal bagi anggota. YYAHHHH YG KEDUA",
          background_image: "",
          stats: []
        }
      },
      {
        id: "17793539316767v0c668",
        type: "hero",
        data: {
          headline: "unit usaha lagi",
          sub_headline: "ini yg lagi lagi",
          background_image: "",
          stats: []
        }
      },
      {
        id: "17794163166907xz3g1o",
        type: "features",
        data: {
          title: "Pencapaian Kami",
          subtitle: "Kepercayaan anggota adalah prioritas utama kami",
          items: [
            { icon_url: null, title: "15rb+", description: "Anggota Aktif", link_url: null },
            { icon_url: null, title: "50M+", description: "Aset Kelolaan", link_url: null },
            { icon_url: null, title: "12+", description: "Unit Usaha", link_url: null },
            { icon_url: null, title: "25th", description: "Dedikasi Luhur", link_url: null }
          ]
        }
      },
      {
        id: "1779419719692x53mfbs",
        type: "rich-text",
        data: {
          content: "<h2>INOVASI LAYANAN &amp; PRODUK</h2><h1>Ekosistem Mandiri.</h1><p>Platform digital pemberdayaan ekonomi yang dirancang untuk akselerasi kesejahteraan bersama.</p>"
        }
      },
      {
        id: "17794198551011z6z1jb",
        type: "features",
        data: {
          title: null,
          subtitle: null,
          items: [
            { icon_url: null, title: "Simpan Pinjam", description: "Solusi keuangan aman dan terpercaya dengan bunga kompetitif untuk kesejahteraan anggota.", link_url: null },
            { icon_url: null, title: "Usaha Produktif", description: "Pengembangan berbagai unit bisnis strategis yang memberikan nilai tambah bagi ekosistem koperasi.", link_url: null },
            { icon_url: null, title: "Layanan Anggota", description: "Fasilitas eksklusif dan kemudahan akses informasi bagi seluruh pemegang saham koperasi.", link_url: null },
            { icon_url: null, title: "Pemberdayaan", description: "Program pelatihan dan pendampingan untuk meningkatkan kapasitas ekonomi anggota.", link_url: null }
          ]
        }
      },
      {
        id: "1779420338166mtxrfmq",
        type: "hero",
        data: {
          headline: "Masa Depan Koperasi Kita.",
          sub_headline: "eKop GIAT App mengintegrasikan seluruh layanan koperasi dalam satu platform digital yang aman, cerdas, dan transparan.",
          background_image: "",
          stats: [
            { label: "Enkripsi tingkat tinggi untuk keamanan data Anda.", value: "Trusted Security" },
            { label: "Kemudahan pembayaran dan transfer digital.", value: "Instant Transaction" },
            { label: "Kelola simpanan dan pinjaman dalam satu klik.", value: "One-Touch Access" },
            { label: "Fitur eksklusif khusus untuk anggota koperasi.", value: "Community First" }
          ]
        }
      },
      {
        id: "1779420942124j08dx4x",
        type: "rich-text",
        data: {
          content: "<h2>UPDATE TERKINI</h2><h1>Informasi.</h1><p><a href=\"http://localhost:3000/#/informasi\" rel=\"noopener noreferrer\" target=\"_blank\">SEMUA BERITA</a></p><p></p>"
        }
      },
      {
        id: "1779421085074y2ix7i5",
        type: "dynamic-post-feed",
        data: {
          category: null,
          limit: 4,
          sort_order: "desc",
          selection_mode: "dynamic",
          selected_post_ids: null
        }
      },
      {
        id: "1779424494410fnrlkbb",
        type: "partners",
        data: {
          title: "MITRA KAMI",
          logos: [
            {
              partner_name: "Bank BCA",
              logo_url: null,
              website_url: null
            }
          ]
        }
      },
      {
        id: "17794358488076ohm4sa",
        type: "testimonials",
        data: {
          title: "Testimoni.",
          items: [
            {
              id: 1,
              name: "Budi Santoso",
              role: "ANGGOTA (UMKM)",
              content: "Koperasi GIAT sangat membantu dalam permodalan usaha saya. Bunganya sangat bersahabat dan prosesnya profesional.",
              image: null,
              rating: 5
            },
            {
              id: 2,
              name: "Siti Aminah",
              role: "Ibu Rumah Tangga",
              content: "Program simpanan berjangkanya sangat menguntungkan. Saya merasa aman menaruh masa depan keuangan keluarga di sini.",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
              rating: 5
            },
            {
              id: 3,
              name: "Andi Saputra",
              role: "Karyawan Swasta",
              content: "Aplikasi eKop GIAT mempermudah segalanya. Cek saldo dan pengajuan pinjaman jadi lebih cepat.",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
              rating: 5
            }
          ]
        }
      }
    ],
    status: "published",
    author_id: null,
    created_at: "2026-05-21T08:19:09.000Z",
    updated_at: "2026-05-22T03:18:59.000Z",
    is_in_navbar: 1,
    priority: 1,
    is_contact_form_active: true
  },
  {
    id: 91,
    tenant_id: 22,
    title: "Tentang Kami",
    slug: "tentang-kami",
    content: [
      {
        id: "1779603919912lz2z6e2",
        type: "hero",
        data: {
          headline: "Tentang Kami",
          sub_headline: "Mengenal lebih dekat visi, misi, dan sejarah panjang Koperasi GIAT dalam melayani anggota dengan penuh integritas.",
          background_image: "",
          stats: []
        }
      },
      {
        id: "1779604124929bviy9o5",
        type: "rich-text",
        data: {
          content: "<p><strong>Sejarah Kami</strong></p><h1><strong>Dua Dekade Mengabdi</strong></h1><p></p><p>Koperasi GIAT didirikan pada tahun 1999 oleh sekelompok profesional yang memiliki visi yang sama untuk memajukan ekonomi kerakyatan melalui sistem gotong royong yang modern.</p><p>Berawal dari hanya 50 anggota pendiri dengan modal swadaya, kini Koperasi GIAT telah tumbuh menjadi salah satu koperasi terbesar di wilayahnya dengan ribuan anggota yang tersebar di berbagai sektor industri.</p><p></p><p><em>Kami terus bertransformasi mengikuti perkembangan teknologi tanpa meninggalkan nilai-nilai dasar kekeluargaan yang telah menjadi pondasi kami selama lebih dari dua dekade.</em></p>"
        }
      },
      {
        id: "1779604674409c89bddz",
        type: "features",
        data: {
          title: null,
          subtitle: null,
          items: [
            {
              icon_url: null,
              title: "Visi Kami",
              description: "Menjadi lembaga ekonomi kerakyatan terdepan yang profesional, mandiri, dan inklusif untuk mewujudkan kesejahteraan anggota yang berkelanjutan di era digital.",
              link_url: null
            },
            {
              icon_url: null,
              title: "Misi Kami",
              description: "Menyelenggarakan unit usaha simpan pinjam yang aman dan transparan. Mengembangkan kemitraan strategis untuk memperluas manfaat ekonomi anggota. Meningkatkan literasi keuangan dan digital bagi seluruh anggota. Membangun ekosistem bisnis yang inovatif dan berorientasi pada hasil. ",
              link_url: null
            }
          ]
        }
      },
      {
        id: "1779604705341d0pvewo",
        type: "features",
        data: {
          title: "Nilai-Nilai Koperasi GIAT",
          subtitle: "Prinsip Kami",
          items: [
            {
              icon_url: null,
              title: "Integritas",
              description: "Bekerja dengan jujur, transparan, dan menjunjung tinggi kode etik profesional dalam setiap transaksi.",
              link_url: null
            },
            {
              icon_url: null,
              title: "Kekeluargaan",
              description: "Membangun hubungan erat antar anggota dan pengurus layaknya keluarga besar yang saling mendukung.",
              link_url: null
            },
            {
              icon_url: null,
              title: "Transparansi",
              description: "Keterbukaan informasi dan laporan keuangan yang akurat serta dapat diakses oleh seluruh anggota.",
              link_url: null
            }
          ]
        }
      },
      {
        id: "1779605135256jg2ddc4",
        type: "rich-text",
        data: {
          content: "<p><strong>Tim Kami</strong></p><h1><strong>Struktur Organisasi</strong></h1><p><strong>Dikelola oleh tenaga profesional dan berpengalaman untuk menjamin tata kelola koperasi yang baik dan berkelanjutan.</strong></p><p></p>"
        }
      },
      {
        id: "177960528110533v770c",
        type: "team",
        data: {
          title: "Dewan Pengawas",
          subtitle: null,
          members: [
            {
              name: "Dr. Ir. Ahmad Sudrajat",
              role: "Ketua Pengawas",
              photo_url: null,
              bio: null,
              social_links: null
            },
            {
              name: "Siti Aminah, M.Ak",
              role: "Anggota Pengawas",
              photo_url: null,
              bio: null,
              social_links: null
            }
          ]
        }
      },
      {
        id: "1779605337571bdve2iq",
        type: "team",
        data: {
          title: "Pengurus Koperasi",
          subtitle: null,
          members: [
            {
              name: "H. Bambang Irawan",
              role: "Ketua Koperasi",
              photo_url: null,
              bio: null,
              social_links: null
            },
            {
              name: "Dra. Elly Risman",
              role: "Bendahara",
              photo_url: null,
              bio: null,
              social_links: null
            },
            {
              name: "Budi Santoso, S.T",
              role: "Sekretaris",
              photo_url: null,
              bio: null,
              social_links: null
            }
          ]
        }
      },
      {
        id: "17796053935715phaqus",
        type: "team",
        data: {
          title: "Manajemen Operasional",
          subtitle: null,
          members: [
            {
              name: "Rizky Ramadhan, MBA",
              role: "Manager Koperasi",
              photo_url: null,
              bio: null,
              social_links: null
            }
          ]
        }
      },
      {
        id: "177960545198979tbkvb",
        type: "cta-banner",
        data: {
          headline: "Mari Tumbuh Bersama Kami",
          sub_headline: "Bergabunglah dengan ribuan anggota lainnya dan rasakan manfaat nyata dari ekonomi gotong royong yang modern.",
          button_text: "Mulai Bergabung Sekarang",
          button_link: null,
          background_image_url: null,
          background_color: "#163C8F"
        }
      }
    ],
    status: "published",
    author_id: null,
    created_at: "2026-05-24T06:22:13.000Z",
    updated_at: "2026-05-24T06:53:35.000Z",
    is_in_navbar: 1,
    priority: 2,
    is_contact_form_active: true
  },
  {
    id: 92,
    tenant_id: 22,
    title: "Informasi",
    slug: "informasi",
    content: [
      {
        id: "17796066560596e2ynqb",
        type: "rich-text",
        data: {
          content: "<p><strong>Pusat Informasi</strong></p><h1><strong>Info GIAT</strong></h1><p><strong>Kumpulan berita terbaru, inovasi layanan, dan pembaruan strategis dari ekosistem Koperasi GIAT.</strong></p>"
        }
      },
      {
        id: "1779606669108de5f8ra",
        type: "dynamic-post-feed",
        data: {
          category: null,
          limit: 6,
          sort_order: "desc",
          selection_mode: "dynamic",
          selected_post_ids: null
        }
      },
      {
        id: "1779606677608uetzro4",
        type: "dynamic-post-feed",
        data: {
          category: null,
          limit: 3,
          sort_order: "desc",
          selection_mode: "manual",
          selected_post_ids: [
            123
          ]
        }
      },
      {
        id: "17796075540365ks14m8",
        type: "cta-banner",
        data: {
          headline: "Ingin tahu lebih lanjut?",
          sub_headline: "Hubungi layanan bantuan kami untuk mendapatkan informasi mendalam mengenai program-program Koperasi GIAT.",
          button_text: "Hubungi Kami",
          button_link: null,
          background_image_url: null,
          background_color: "#F9FAFB"
        }
      }
    ],
    status: "published",
    author_id: null,
    created_at: "2026-05-24T07:11:59.000Z",
    updated_at: "2026-05-24T07:27:03.000Z",
    is_in_navbar: 1,
    priority: 3,
    is_contact_form_active: true
  },
  {
    id: 93,
    tenant_id: 22,
    title: "Kontak",
    slug: "kontak",
    content: [
      {
        id: "1779607672283crz1agv",
        type: "hero",
        data: {
          headline: "Kontak Kami",
          sub_headline: "Kami siap melayani dan menjawab setiap pertanyaan Anda tentang Koperasi GIAT dengan sepenuh hati.",
          background_image: "",
          stats: []
        }
      },
      {
        id: "177960772386873eti1m",
        type: "contacts",
        data: {
          title: "Informasi Kontak",
          phone_numbers: [
            "+62 812 3456 7890"
          ],
          emails: [
            "info@koperasigiat.co.id"
          ],
          addresses: [
            "Jl. Telekomunikasi No.1, Terusan, Kec. Buahbatu, Kabupaten Bandung, Jawa Barat 40257"
          ],
          map_location_url: "https://maps.app.goo.gl/iiTW4j6tM33NAkpj9",
          social_links: [],
          working_hours: "Senin - Jumat : 08.00-16.30"
        }
      }
    ],
    status: "published",
    author_id: null,
    created_at: "2026-05-24T07:29:49.000Z",
    updated_at: "2026-05-24T07:36:57.000Z",
    is_in_navbar: 1,
    priority: 4,
    is_contact_form_active: true
  },
  {
    id: 94,
    tenant_id: 22,
    title: "Layanan & Produk",
    slug: "layanan-produk",
    content: [
      {
        id: "1779610119626rvlj065",
        type: "cta-banner",
        data: {
          headline: "Layanan & Produk GIAT",
          sub_headline: "Kami menghadirkan ekosistem ekonomi gotong royong melalui akses simpan pinjam yang adil, pembiayaan modal usaha produktif, tabungan masa depan, serta program pemberdayaan UMKM, perlindungan asuransi, dan berbagai produk ekonomi kreatif bagi seluruh anggota.",
          button_text: "Konsultasi Sekarang",
          button_link: null,
          background_image_url: null,
          background_color: "#153B8F"
        }
      },
      {
        id: "17796102322039drkjo9",
        type: "features",
        data: {
          title: "Layanan & Produk Unggulan",
          subtitle: "Portofolio Kami",
          items: [
            {
              icon_url: null,
              title: "Simpan Pinjam",
              description: "Solusi keuangan aman dan terpercaya dengan bunga kompetitif untuk kesejahteraan anggota.\n\nBunga menurun yang ringan\nProses pencairan maksimal 2 hari kerja",
              link_url: null
            },
            {
              icon_url: null,
              title: "Pengadaan",
              description: "Layanan pengadaan barang dan jasa untuk kebutuhan operasional dan proyek mitra kerja.\n\nHarga kompetitif & transparan\nKualitas barang terjamin",
              link_url: null
            },
            {
              icon_url: null,
              title: "Ritel ",
              description: "Pengelolaan unit usaha dagang dan toko untuk menyediakan kebutuhan harian civitas akademika.\n\nLokasi strategis di area kampus\nHarga khusus untuk anggota GIAT\n",
              link_url: null
            },
            {
              icon_url: null,
              title: "Marketplace",
              description: "Platform jual beli antar anggota untuk memperluas jangkauan pasar produk kreatif anggota.\n\nAkses ke ribuan pembeli potensial\nSistem pembayaran aman",
              link_url: null
            },
            {
              icon_url: null,
              title: "Fotocopy ATK",
              description: "Layanan penggandaan dokumen dan penyediaan alat tulis kantor kualitas terbaik.\n\nHasil cetak tajam & bersih\nHarga pelajar & mahasiswa",
              link_url: null
            }
          ]
        }
      }
    ],
    status: "published",
    author_id: null,
    created_at: "2026-05-24T08:09:46.000Z",
    updated_at: "2026-05-24T08:15:32.000Z",
    is_in_navbar: 1,
    priority: 3,
    is_contact_form_active: true
  }
];

let cachedPages: CmsPage[] | null = null;

export const fetchCmsPages = async (forceRefresh = false): Promise<CmsPage[] | null> => {
  if (cachedPages && !forceRefresh) {
    return cachedPages;
  }

  const { url, key } = getApiConfig();

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
      'x-api-key': key
    };

    // Add cache-busting to ensure we always get the latest content from the CMS
    const fetchUrl = url.includes('?') ? `${url}&_t=${Date.now()}` : `${url}?_t=${Date.now()}`;
    console.log(`[CMS] Fetching pages from: ${fetchUrl}`);

    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: headers,
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil data CMS: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[CMS] Fetch success, received pages:', data);
    cachedPages = data;
    return data;
  } catch (error) {
    console.error("[CMS] API Error, falling back to mock data:", error);
    cachedPages = MOCK_CMS_PAGES;
    return MOCK_CMS_PAGES;
  }
};

export const MOCK_CMS_POSTS: CmsPost[] = [
  {
    "id": 124,
    "tenant_id": 22,
    "title": "Peluncuran Fitur eKop GIAT Mobile",
    "slug": "peluncuran-fitur-ekop-giat-mobile",
    "category": "Artikel",
    "excerpt": "Kini akses simpan pinjam lebih mudah menggunakan smartphone Anda.",
    "content": [
      {
        "excerpt": "Kini akses simpan pinjam lebih mudah menggunakan smartphone Anda.",
        "featured_image": null,
        "body_content": "<p>Setelah melalui tahap pengembangan intensif selama enam bulan, eKop GIAT Mobile resmi diluncurkan hari ini. Aplikasi ini dirancang untuk memberikan kemudahan bagi anggota dalam memantau saldo simpanan, mengajukan pinjaman darurat, hingga melakukan transaksi pembayaran rutin secara instan. Dengan fitur keamanan biometrik, autentikasi dua faktor, dan enkripsi tingkat tinggi, kami menjamin keamanan data finansial seluruh anggota tetap terjaga dari ancaman siber. Aplikasi ini juga memungkinkan anggota untuk melakukan transfer antar rekening koperasi tanpa biaya admin, yang merupakan salah satu keuntungan eksklusif bagi pemegang akun aktif. Kami terus berkomitmen untuk memperbarui aplikasi ini dengan fitur-fitur baru setiap bulannya berdasarkan masukan dari para pengguna. Saat ini, versi Android dan iOS sudah tersedia untuk diunduh di Google Play Store dan Apple App Store. Mari rasakan kemudahan bertransaksi di era ekonomi digital bersama GIAT.</p>",
        "tags": "Inovasi"
      }
    ],
    "featured_image_id": null,
    "status": "published",
    "author_id": null,
    "published_at": null,
    "created_at": "2026-05-24T07:17:18.000Z",
    "updated_at": "2026-05-24T07:17:18.000Z"
  },
  {
    "id": 123,
    "tenant_id": 22,
    "title": "Rapat Anggota Tahunan (RAT) 2026",
    "slug": "rapat-anggota-tahunan-rat-2026",
    "category": "Artikel",
    "excerpt": "Undangan resmi bagi seluruh anggota untuk menghadiri musyawarah tertinggi koperasi...",
    "content": [
      {
        "excerpt": "Undangan resmi bagi seluruh anggota untuk menghadiri musyawarah tertinggi koperasi...",
        "featured_image": "https://drive.google.com/thumbnail?id=1w5y6SCI6QCLHbnxy-B5vvMurKzCaUNrp&sz=w1200",
        "body_content": "<p>Rapat Anggota Tahunan (RAT) 2026 Koperasi GIAT akan diselenggarakan pada akhir bulan ini. Acara ini merupakan momen krusial bagi seluruh anggota untuk berpartisipasi dalam menentukan arah strategis koperasi untuk satu tahun ke depan. Agenda utama meliputi laporan pertanggungjawaban pengurus, rencana kerja tahun buku berjalan, serta pembagian Sisa Hasil Usaha (SHU). Kami mengundang kehadiran fisik maupun virtual demi terciptanya transparansi dan akuntabilitas. Dalam rapat tahun ini, kami juga akan memperkenalkan beberapa program baru yang fokus pada digitalisasi dan pemberdayaan komunitas hijau. Penting bagi setiap anggota untuk memahami bahwa suara Anda menentukan masa depan koperasi kita bersama. Selain itu, rapat kali ini akan memberikan penghargaan khusus bagi anggota paling aktif selama setahun terakhir sebagai bentuk apresiasi kami terhadap loyalitas Anda. Pastikan Anda telah terdaftar melalui aplikasi eKop untuk mendapatkan link akses zoom bagi yang hadir secara virtual.</p>",
        "tags": "Berita"
      }
    ],
    "featured_image_id": null,
    "status": "published",
    "author_id": null,
    "published_at": null,
    "created_at": "2026-05-24T07:10:33.000Z",
    "updated_at": "2026-05-24T07:18:12.000Z"
  }
];

let cachedPosts: CmsPost[] | null = null;

export const fetchCmsPosts = async (forceRefresh = false): Promise<CmsPost[] | null> => {
  if (cachedPosts && !forceRefresh) {
    return cachedPosts;
  }

  const { url, key } = getApiConfig();
  const postsUrl = url.replace(/\/pages$/, '/posts').replace(/\/pages\/$/, '/posts');

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
      'x-api-key': key
    };

    const fetchUrl = postsUrl.includes('?') ? `${postsUrl}&_t=${Date.now()}` : `${postsUrl}?_t=${Date.now()}`;
    console.log(`[CMS] Fetching posts from: ${fetchUrl}`);

    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: headers,
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil data CMS posts: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[CMS] Fetch posts success, received posts:', data);
    cachedPosts = data;
    return data;
  } catch (error) {
    console.error("[CMS] Posts API Error, falling back to mock data:", error);
    cachedPosts = MOCK_CMS_POSTS;
    return MOCK_CMS_POSTS;
  }
};

export const MOCK_CMS_SETTINGS: CmsSettings = {
  "site_name": "GIAT KOPERASI",
  "title": "GIAT KOPERASI",
  "tagline": "Membangun masa depan ekonomi Indonesia melalui inovasi koperasi digital yang inklusif dan berkelanjutan",
  "logo_url": "https://drive.google.com/thumbnail?id=19ubHZKwf8rH43uqb5QXHC1KCv2_GeU-Z&sz=w1200",
  "frontend_url": "",
  "support_email": "giatsejahterabersama@gmail.com",
  "copyright_text": "© 2026 Koperasi GIAT. Established 1999.",
  "footer_text": "Membangun masa depan ekonomi Indonesia melalui inovasi koperasi digital yang inklusif dan berkelanjutan.",
  "social_links": [
    {
      "icon": "instagram",
      "url": "https://www.instagram.com/giatsejahterabersama/?hl=en"
    },
    {
      "icon": "tiktok",
      "url": ""
    },
    {
      "icon": "linkedin",
      "url": ""
    }
  ],
  "footer_nav_1": [
    {
      "label": "Beranda",
      "url": ""
    },
    {
      "label": "Tentang Kami",
      "url": ""
    },
    {
      "label": "Layanan & Produk",
      "url": ""
    },
    {
      "label": "Informasi",
      "url": ""
    },
    {
      "label": "Kontak",
      "url": ""
    }
  ],
  "footer_nav_2": [
    {
      "label": "Syarat & Ketentuan",
      "url": ""
    },
    {
      "label": "Kebijakan Privasi",
      "url": ""
    },
    {
      "label": "Laporan Tahunan",
      "url": ""
    },
    {
      "label": "Tata Kelola",
      "url": ""
    }
  ],
  "footer_contacts": [
    {
      "label": "Alamat",
      "value": "Jl. Telekomunikasi No.1, Terusan, Kec. Buahbatu, Kabupaten Bandung, Jawa Barat 40257"
    },
    {
      "label": "No.Telp",
      "value": "08132427678"
    },
    {
      "label": "Email",
      "value": "giatsejahterabersama@gmail.com"
    }
  ],
  "google_maps_url": "Jl. Telekomunikasi No.1, Terusan, Kec. Buahbatu, Kabupaten Bandung, Jawa Barat 40257"
};

let cachedSettings: CmsSettings | null = null;

export const fetchCmsSettings = async (forceRefresh = false): Promise<CmsSettings> => {
  if (cachedSettings && !forceRefresh) {
    return cachedSettings;
  }

  const { url, key } = getApiConfig();
  // Replace the dynamic endpoint suffix (e.g. /pages or /pages/ with /settings)
  const settingsUrl = url.replace(/\/pages$/, '/settings').replace(/\/pages\/$/, '/settings');

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
      'x-api-key': key
    };

    const fetchUrl = settingsUrl.includes('?') ? `${settingsUrl}&_t=${Date.now()}` : `${settingsUrl}?_t=${Date.now()}`;
    console.log(`[CMS] Fetching settings from: ${fetchUrl}`);

    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: headers,
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil data CMS settings: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[CMS] Fetch settings success, received settings:', data);
    cachedSettings = data;
    return data;
  } catch (error) {
    console.error("[CMS] Settings API Error, falling back to mock data:", error);
    cachedSettings = MOCK_CMS_SETTINGS;
    return MOCK_CMS_SETTINGS;
  }
};

/**
 * Legacy service wrapper to maintain compatibility with older imports if any
 */
export const fetchCmsData = async () => {
  return await fetchCmsPages();
};
