
import { GoogleGenAI } from "@google/genai";

export const getGiatAssistantResponse = async (userPrompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    Anda adalah Asisten Virtual resmi Koperasi GIAT.
    Koperasi GIAT adalah koperasi modern yang fokus pada gotong royong, profesionalisme, dan transparansi.
    
    Informasi Utama:
    - Nama: Koperasi GIAT
    - Warna Brand: Merah (Semangat) & Biru (Profesional)
    - Layanan: Simpan Pinjam, Unit Usaha Produktif, Pemberdayaan Anggota.
    - Nilai: Integritas, Inovasi, Kekeluargaan.
    
    Tugas Anda:
    1. Memberikan informasi tentang cara menjadi anggota.
    2. Menjelaskan manfaat bergabung dengan Koperasi GIAT.
    3. Menjawab pertanyaan seputar layanan secara ramah dan profesional dalam Bahasa Indonesia.
    4. Selalu dorong pengguna untuk menghubungi tim admin di halaman Kontak jika memerlukan bantuan teknis mendalam.
    
    Gunakan gaya bahasa yang formal namun tetap ramah (friendly professional).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text || "Maaf, saya sedang mengalami kendala teknis. Silakan coba lagi nanti.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Terjadi kesalahan saat menghubungi asisten. Mohon pastikan koneksi Anda stabil.";
  }
};
