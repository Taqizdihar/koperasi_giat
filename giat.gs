
/**
 * GOOGLE APPS SCRIPT FOR KOPERASI GIAT CMS
 * Simpan file ini di Google Apps Script (Spreadsheet)
 */

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🚀 GIAT CMS')
    .addItem('Inisialisasi Database', 'initDatabase')
    .addToUi();
}

function initDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Sheet General Settings
  createSheet(ss, 'General', [
    ['Key', 'Value', 'Description'],
    ['site_name', 'Koperasi GIAT', 'Nama Koperasi'],
    ['tagline', 'Membangun Ekonomi Bersama & Berdikari', 'Tagline Hero'],
    ['hero_description', 'Koperasi GIAT menghadirkan solusi finansial cerdas berbasis semangat gotong royong.', 'Deskripsi Hero'],
    ['phone', '(021) 1234-5678', 'Nomor Telepon'],
    ['email', 'info@koperasigiat.co.id', 'Email Resmi'],
    ['address', 'Jl. Ekonomi Makmur No. 88, Jakarta Selatan', 'Alamat Kantor']
  ]);

  // 2. Sheet Services
  createSheet(ss, 'Services', [
    ['Title', 'Description', 'Icon (Lucide Name)'],
    ['Simpan Pinjam', 'Solusi keuangan aman dan terpercaya dengan bunga kompetitif.', 'Wallet'],
    ['Usaha Produktif', 'Pengembangan berbagai unit bisnis strategis.', 'TrendingUp'],
    ['Layanan Anggota', 'Fasilitas eksklusif dan kemudahan akses informasi.', 'Award'],
    ['Pemberdayaan', 'Program pelatihan dan pendampingan ekonomi.', 'ShieldCheck']
  ]);

  // 3. Sheet Members (Wajah GIAT)
  createSheet(ss, 'Members', [
    ['Name', 'Role', 'Quote', 'Image URL'],
    ['Bpk. Hendra', 'Ketua Pengurus', 'Kepercayaan anggota adalah amanah terbesar kami.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'],
    ['Ibu Siti', 'Mitra UMKM', 'Berkat GIAT, warung saya kini punya cabang.', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400'],
    ['Andi Wijaya', 'Anggota Muda', 'Simpanan di GIAT bikin masa depan aman.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400']
  ]);

  // 4. Sheet Testimonials
  createSheet(ss, 'Testimonials', [
    ['Name', 'City', 'Content', 'Image URL'],
    ['Deni Saputra', 'Bandung', 'Proses pendaftaran sangat mudah dan transparan.', 'https://i.pravatar.cc/150?u=1'],
    ['Linda Kusuma', 'Surabaya', 'SHU tahunan sangat membantu tabungan keluarga.', 'https://i.pravatar.cc/150?u=2']
  ]);

  // 5. Sheet FAQs
  createSheet(ss, 'FAQs', [
    ['Question', 'Answer'],
    ['Bagaimana cara mendaftar?', 'Anda bisa mengisi formulir di halaman Keanggotaan.'],
    ['Apa syarat pinjaman?', 'Menjadi anggota aktif minimal 3 bulan dan melengkapi dokumen KTP.']
  ]);

  SpreadsheetApp.getUi().alert('Database Berhasil Diinisialisasi! Silakan Deploy sebagai Web App.');
}

function createSheet(ss, name, data) {
  let sheet = ss.getSheetByName(name);
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet(name);
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  sheet.getRange(1, 1, 1, data[0].length).setFontWeight('bold').setBackground('#E11D48').setFontColor('#FFFFFF');
}

/**
 * SERVE DATA AS JSON
 */
function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const data = {
    general: getSheetData(ss.getSheetByName('General')),
    services: getSheetData(ss.getSheetByName('Services')),
    members: getSheetData(ss.getSheetByName('Members')),
    testimonials: getSheetData(ss.getSheetByName('Testimonials')),
    faqs: getSheetData(ss.getSheetByName('FAQs'))
  };
  
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheetData(sheet) {
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();
  return rows.map(row => {
    const obj = {};
    headers.forEach((h, i) => {
      const key = h.toLowerCase().replace(/ /g, '_').replace(/\(|\)/g, '');
      obj[key] = row[i];
    });
    return obj;
  });
}
