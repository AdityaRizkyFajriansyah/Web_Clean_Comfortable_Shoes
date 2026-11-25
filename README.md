# Clean Comfortable Shoes (CCS) - Web & AI Chatbot

Website resmi company profile **Clean Comfortable Shoes (CCS)** yang dilengkapi dengan **AI Chatbot Asisten Perawatan Sepatu (Multimodal RAG)**. Website ini menyediakan informasi layanan cuci sepatu, estimasi harga, galeri pengerjaan, dan konsultasi interaktif berbasis AI yang mampu menganalisis kondisi sepatu lewat teks maupun foto.

---

## 🚀 Fitur Utama

### 1. Website Company Profile (Frontend)
- **Desain Modern & Responsif**: Tampilan profesional yang nyaman dibuka di smartphone maupun desktop.
- **Daftar Layanan & Harga**: Rincian layanan seperti *Fast Cleaning*, *Deep Cleaning*, *Deep Cleaning Extreme*, *Unyellowing*, dan *Repaint*.
- **Integrasi Kontak & Lokasi**: Tautan langsung ke WhatsApp pemesanan dan peta Google Maps.
- **SEO Ready**: Menggunakan metadata Next.js, Open Graph, sitemap, dan `robots.txt`.

### 2. AI Chatbot Consultant (Backend & Widget)
- **Multimodal AI**: Mampu menerima pertanyaan teks sekaligus menganalisis foto sepatu yang diunggah pengguna.
- **RAG (Retrieval-Augmented Generation)**: Jawaban bot disesuaikan secara akurat dengan data SOP, jenis bahan sepatu, harga, dan layanan toko (`data_toko.txt`) menggunakan **ChromaDB Vector Store**.
- **Kompresi Gambar Cepat**: Optimasi ukuran gambar di sisi klien dan server sebelum diproses oleh model Gemini untuk kecepatan respons maksimal.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Library**: React 18
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid, Animasi)
- **Font**: Google Font (Manrope)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Server**: Uvicorn
- **AI / LLM Framework**: LangChain (`langchain-google-genai`, `langchain-chroma`)
- **Model**: Google Gemini (`gemini-2.5-flash` / `gemini-1.5-flash` & Embedding Gemini)
- **Image Processing**: Pillow (PIL)

---

## 📁 Struktur Direktori

```text
ccs-web/
├── app/
│   ├── components/      # (Opsional jika ingin menaruh komponen di sini)
│   ├── globals.css      # Styling global dan CSS Chatbot
│   ├── layout.js        # Root layout Next.js (memuat Chatbot)
│   ├── page.js          # Halaman utama landing page
│   ├── robots.js        # Konfigurasi robots.txt
│   └── sitemap.js       # Konfigurasi sitemap.xml
├── backend/
│   ├── .env             # Berisi API Key Google Gemini
│   ├── chat_optimized.py # Server FastAPI + Pipeline AI Multimodal RAG
│   ├── data_toko.txt    # Basis pengetahuan (knowledge base) toko sepatu
│   ├── requirements.txt # Dependensi Python
│   └── venv/            # Virtual environment Python
├── components/
│   └── Chatbot.js       # Komponen widget Chatbot (Floating UI)
├── public/
│   └── logo.jpeg        # Aset gambar & logo toko
├── next.config.js       # Konfigurasi Next.js
├── package.json         # Dependensi Node.js
└── README.md
```

---

## ⚙️ Panduan Instalasi & Menjalankan

### Prasyarat
- **Node.js** (v18.17 atau lebih baru)
- **Python** (v3.10 atau lebih baru)
- **Google Gemini API Key** ([Dapatkan di Google AI Studio](https://aistudio.google.com/))

---

### Langkah 1: Menjalankan Backend (FastAPI AI)

1. Buka terminal dan masuk ke folder `backend`:
   ```bash
   cd backend
   ```

2. Buat virtual environment (jika belum ada) dan aktifkan:
   - **Windows**:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - **macOS / Linux**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install dependensi:
   ```bash
   pip install -r requirements.txt
   ```

4. Buat file `.env` di dalam folder `backend/`:
   ```env
   api=AIzaSy...your_gemini_api_key_here
   ```

5. Jalankan server backend:
   ```bash
   python chat_optimized.py
   ```
   *Backend akan berjalan di `http://127.0.0.1:8000`*.

---

### Langkah 2: Menjalankan Frontend (Next.js)

1. Buka terminal baru di root folder project (`ccs web`):
   ```bash
   npm install
   ```

2. Jalankan server development:
   ```bash
   npm run dev
   ```

3. Buka browser dan akses:
   ```
   http://localhost:3000
   ```

---

## 📡 API Endpoint Backend

### `POST /chat`
Menerima pesan teks dan opsional foto sepatu dalam format base64.

- **Request Body**:
  ```json
  {
    "pesan": "Sepatu saya kena noda lumpur di bahan canvas, ambil paket apa?",
    "gambar": "base64_encoded_string_or_null"
  }
  ```

- **Response Body**:
  ```json
  {
    "status": "success",
    "jawaban": "Untuk bahan canvas dengan noda lumpur, kami sarankan mengambil paket Deep Cleaning..."
  }
  ```

---

## 📝 Lisensi & Kredit

Dikembangkan untuk **Clean Comfortable Shoes**. Hak cipta dilindungi.
