import { CmsPage } from '../types';

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

/**
 * Legacy service wrapper to maintain compatibility with older imports if any
 */
export const fetchCmsData = async () => {
  return await fetchCmsPages();
};
