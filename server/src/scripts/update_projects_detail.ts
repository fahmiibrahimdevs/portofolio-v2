import { execute } from "../db/database";

async function main() {
  const projects = [
    {
      id: 1,
      user_id: '1',
      category_id: '1',
      tag_id: 'sk-react,sk-ts,sk-tailwind,sk-e2c722db',
      thumbnail: 'thumbnail_maker_studio.webp',
      date: 'September 2026',
      title: 'Thumbnail Maker Studio — Multi-Image Showcase Generator',
      slug: 'thumbnail-maker-studio',
      price: 'Free',
      short_desc: 'Studio pembuat visual mockup thumbnail showcase, OpenGraph banner, dan presentasi multi-gambar dengan estetika matte dark modern, 3D tilt, dan ekspor 4K Ultra Retina.',
      description: `Thumbnail Maker Studio adalah aplikasi web modern berbasis *client-side* untuk membuat visual showcase portofolio, banner sosial media, dan preview mockup multi-gambar (1 hingga 5 tangkapan layar) secara cepat, presisi, dan estetis.

1. ENGINE MULTI-SLOT IMAGE HANDLING & LAYOUT DINAMIS
- **Multi-Slot Image Uploader**: Mengunggah 1 hingga 5 gambar sekaligus dengan fitur drag-and-drop, individual zoom, pan/offset, dan mode rasio cover/contain.
- **Katalog Preset Tata Letak Responsif**:
  - *Solo Floating*: Tampilan tunggal elegan terpusat dengan efek bayangan berlapis.
  - *Overlapping Depth Cascade*: Susunan bertumpuk dinamis dengan persepsi kedalaman visual.
  - *Apple Keynote Fanned Deck*: Penataan menyebar mirip kartu presentasi Apple Keynote.
  - *Bento Grid Modern*: Tata letak modular bergaya bento untuk menampilkan multi-fitur aplikasi.

2. MOCKUP FRAME REALISTIS & EFEK ISOMETRIK 3D
- **4 Pilihan Mockup Frame**:
  - *macOS Window Frame*: Dilengkapi traffic light window controls (Close, Minimize, Expand).
  - *Modern Browser Bar*: Dilengkapi URL address bar minimalis dan tab navigation.
  - *Sleek Minimal Border*: Garis batas matte tipis modern.
  - *Smartphone Titanium Frame*: Frame ponsel pintar modern dengan notch / dynamic island.
- **3D Isometric Tilt & Depth Shadow**: Pengaturan sudut kemiringan 3D interaktif dan 3 tingkat bayangan studio (Soft, Deep Studio, Dramatic).

3. EXPORT ENGINE LOSSLESS & SALIN KE PAPAN KLIP
- **Ekspor PNG 4K Ultra Retina**: Render instan ke format gambar beresolusi tinggi 1x (Full HD) dan 2x (Ultra Retina / 4K) tanpa blur.
- **Direct Copy to Clipboard**: Fitur salin gambar instan langsung ke clipboard peramban untuk ditempel langsung ke Figma, Slack, WhatsApp, atau slide presentasi.

4. SPESIFIKASI & TEKNOLOGI YANG DIGUNAKAN
- **Frontend Framework**: React 19, TypeScript, Vite
- **Styling System**: Tailwind CSS v4 (Matte Dark Slate Palette)
- **Rendering & Canvas**: html-to-image, Canvas 2D Engine
- **Icons & Assets**: Lucide React
- **Runtime Environment**: Bun v1.2+`,
      status_publish: 'Published',
      version: '1.0.0',
      link_demo: '-',
      link_github: 'https://github.com/fahmiibrahimdevs/thumbnail-maker'
    },
    {
      id: 2,
      user_id: '1',
      category_id: '1',
      tag_id: 'sk-react,sk-ts,sk-tailwind,sk-e2c722db,sk-de01e262,sk-mariadb',
      thumbnail: 'thumbnail_project_management.webp',
      date: 'September 2026',
      title: 'ProTrack — Multi-Project Management & Issue Tracking',
      slug: 'protrack-project-management',
      price: 'Free',
      short_desc: 'Sistem manajemen proyek fullstack dengan alur kerja Kanban, pelacakan anggaran komponen (BOM), analitik performa tim, dan manajemen investigasi masalah lapangan (Root Cause Analysis).',
      description: `ProTrack adalah sistem manajemen proyek internal komprehensif yang dirancang untuk mendukung tim engineering dan manajemen dalam memonitor progress proyek dari tahap perencanaan hingga produksi massal.

1. ALUR KERJA KANBAN & MANAJEMEN TUGAS
- **Interactive Kanban Board**: Manajemen tugas drag-and-drop dengan pelacakan status (To Do, In Progress, Code Review, Testing, Completed).
- **Prioritas & Deadline Tracking**: Pengelompokan prioritas tugas (Low, Medium, High, Critical), estimasi jam kerja, dan penugasan anggota tim (*assignee*).
- **Subtask & Deliverables Breakdown**: Pembagian tugas utama ke dalam sub-tugas terukur dengan indikator persentase penyelesaian.

2. BUDGETING & BILL OF MATERIALS (BOM) MANAGEMENT
- **Perhitungan Otomatis Biaya Komponen**: Estimasi biaya perakitan perangkat per proyek, pencatatan harga satuan, kuantitas, subtotal, dan tautan supplier toko.
- **Estimasi Skala Produksi Batch**: Kalkulasi kebutuhan anggaran untuk produksi massal (10, 50, 100+ unit) secara otomatis.

3. ROOT CAUSE ANALYSIS (RCA) ISSUE TRACKER
- **Investigasi Kendala Lapangan**: Formulir pencatatan kendala teknis hardware dan software berbasis metodologi RCA (5-Whys Analysis).
- **Tindakan Korektif & Preventif**: Dokumentasi tindakan perbaikan langsung (*corrective actions*) dan langkah pencegahan permanen (*preventive measures*).

4. KEAMANAN MULTI-ROLE RBAC & SINKRONISASI OFFLINE-TO-CLOUD
- **Role-Based Access Control**: Pengaturan hak akses bertingkat (Super Admin, Project Manager, Lead Engineer, Team Member).
- **Offline-to-Cloud Database Sync**: Fitur sinkronisasi data dua arah antara lingkungan database lokal dan server VPS produksi.

5. SPESIFIKASI & TEKNOLOGI YANG DIGUNAKAN
- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React
- **Backend API**: Bun Runtime, Hono.js REST API
- **Database Engine**: MariaDB 11+ / MySQL 8.0 (Parameterized Query Pool)
- **Deployment**: Ubuntu VPS, Nginx Reverse Proxy, Systemd Service`,
      status_publish: 'Published',
      version: '1.0.0',
      link_demo: 'https://pm.fahmiibrahim.my.id',
      link_github: 'https://github.com/fahmiibrahimdevs/project-management'
    },
    {
      id: 3,
      user_id: '1',
      category_id: '1',
      tag_id: 'sk-py,sk-5a1ff571,sk-tailwind,sk-123490c4',
      thumbnail: 'thumbnail_telebothub.webp',
      date: 'September 2026',
      title: 'TeleBotHub — Modular Telegram Bot Management Portal',
      slug: 'telebot-hub-portal',
      price: 'Free',
      short_desc: 'Platform web dashboard interaktif untuk mengelola multi-bot Telegram secara modular, monitoring kesehatan server real-time (CPU, RAM, Disk), pengaturan kuota harian pengguna, dan analitik aktivitas.',
      description: `TeleBotHub adalah portal manajemen multi-bot Telegram terintegrasi yang memudahkan pengoperasian beberapa bot fungsional sekaligus dalam satu antarmuka web modern tanpa perlu restart server utama.

1. MANAJEMEN MULTI-BOT TELEGRAM SECARA MODULAR
- **Live Worker Management**: Menambah, mengonfigurasi, menghidupkan, dan mematikan bot Telegram tanpa perlu melakukan restart pada server utama.
- **Validasi Token Otomatis**: Integrasi langsung dengan Telegram Bot API untuk verifikasi identitas token dan hak akses bot.
- **Modular Plugin Architecture**: Penambahan handler fungsi bot baru (Downloader, Converter, Utility, AI Chatbot) berbasis struktur modular.

2. MONITORING KESEHATAN SERVER REAL-TIME
- **System Resource Telemetry**: Widget pemantauan utilisasi CPU (%), penggunaan RAM (Used/Total MB), dan kapasitas penyimpanan Disk Storage server secara *real-time*.
- **Task & Worker Lifecycle Tracker**: Pelacakan status proses aktif, antrean tugas background, dan waktu aktif (*uptime*).

3. MANAJEMEN PENGGUNA & KONTROL KUOTA HARIAN
- **Direktori Pengguna Terpusat**: Pencatatan riwayat interaksi pengguna bot lengkap dengan Telegram User ID, username, dan timestamp interaksi.
- **Daily Quota Enforcement**: Pembatasan kuota operasi per hari untuk pengguna reguler, fitur VIP/Unlimited toggle, dan sistem pemblokiran spammer otomatis.

4. ANALITIK INTERAKTIF & PEMELIHARAAN MEDIA
- **Visual Activity Chart**: Grafik tren penggunaan 7 hari terakhir dan diagram sebaran kategori bot menggunakan Chart.js.
- **Pembersihan Cache & Media Otomatis**: Penghitungan kapasitas file sementara (*temporary files*) dan tombol pembersihan cache sekali klik.

5. SPESIFIKASI & TEKNOLOGI YANG DIGUNAKAN
- **Backend Framework**: Python 3.10+, FastAPI, aiogram v3, Uvicorn ASGI
- **Media & Processing Engine**: yt-dlp, Pillow (PIL), img2pdf, FFmpeg
- **Frontend & Dashboard**: Jinja2 Templates, Tailwind CSS, Chart.js, Lucide Icons, SweetAlert2
- **Database Engine**: SQLite3 / MariaDB`,
      status_publish: 'Published',
      version: '1.0.0',
      link_demo: 'https://telebot.fahmiibrahim.my.id',
      link_github: 'https://github.com/fahmiibrahimdevs/tele-bot-hub'
    },
    {
      id: 4,
      user_id: '1',
      category_id: '1',
      tag_id: 'sk-react,sk-ts,sk-tailwind,13',
      thumbnail: 'thumbnail_thermal_receipt_studio.webp',
      date: 'September 2026',
      title: 'Thermal Receipt 58mm Studio — POS Receipt Generator',
      slug: 'thermal-receipt-58mm-studio',
      price: 'Free',
      short_desc: 'Generator struk kasir & template cetak printer thermal 58mm berbasis web dengan presisi tinggi tanpa risiko terpotong pada Windows Print Dialog.',
      description: `Thermal Receipt 58mm Studio adalah aplikasi web spesialis untuk mendesain dan mencetak struk transaksi kasir POS pada printer thermal ukuran 58mm dengan layout CSS media print yang presisi 1:1.

1. ENGINE CETAK PRESISI 58MM POS (PIXEL-PERFECT PRINT)
- **Area Cetak Efektif 48-52mm**: Mengeliminasi masalah klasik teks terpotong atau margin berlebih pada dialog cetak Windows dengan layout CSS Media Print presisi.
- **Dukungan Kertas Gulung Berkelanjutan**: Penyesuaian panjang struk dinamis mengikuti jumlah baris item belanja secara otomatis tanpa meninggalkan sisa kertas kosong.

2. KUSTOMISASI BRANDING TOKO & INVERSI LOGO
- **Inversi Logo Monokrom Otomatis**: Fitur upload logo toko dengan slider skala ukuran dan pemrosesan binarisasi monokrom (hitam-putih murni) untuk hasil cetak thermal yang tegas.
- **Profil Usaha Lengkap**: Kustomisasi nama toko, slogan usaha, alamat fisik, nomor telepon/WhatsApp, dan website/sosial media pada header struk.

3. TYPOGRAPHY KHUSUS THERMAL POS & PERHITUNGAN TRANSAKSI
- **8 Pilihan Font Struk Kasir**: Pilihan tipografi otentik POS mencakup *Share Tech Mono*, *Courier Prime*, *JetBrains Mono*, *Space Mono*, dan font dot-matrix retro *VT323*.
- **Kalkulator Transaksi Otomatis**: Perhitungan otomatis subtotal belanja, diskon (nominal/persen), pajak (PPN), nominal uang tunai, dan kembalian.
- **Multi Metode Pembayaran**: Dukungan label transaksi Tunai, QRIS, Kartu Debit, dan Transfer Bank.

4. GENERATOR BARCODE 1D & QR CODE 2D
- **Barcode Transaksi Otomatis**: Pembuatan kode batang barcode 1D (Code 128) untuk nomor struk transaksi.
- **Dynamic QR Code**: Pembuatan kode QR di bagian footer struk untuk verifikasi transaksi, tautan pembayaran QRIS, atau tautan ulasan Google Maps toko.

5. SPESIFIKASI & TEKNOLOGI YANG DIGUNAKAN
- **Frontend Framework**: React 18, TypeScript, Vite
- **Styling & Print CSS**: Tailwind CSS v4, Custom CSS Media Print (@media print)
- **Libraries**: JsBarcode, QRCode, Lucide React, html-to-image
- **Runtime**: Bun v1.2+`,
      status_publish: 'Draft',
      version: '1.0.0',
      link_demo: '-',
      link_github: 'https://github.com/fahmiibrahimdevs/thermal-receipt-studio'
    },
    {
      id: 5,
      user_id: '1',
      category_id: '7',
      tag_id: 'sk-flutter,sk-dart,sk-mqtt,sk-c5b79749',
      thumbnail: 'thumbnail_smartworkshop.webp',
      date: 'Juli - Desember 2026',
      title: 'SmartWorkshop — Mobile IoT Ecosystem & Telemetry Client',
      slug: 'smartworkshop-mobile-iot-ecosystem',
      price: '-',
      short_desc: 'Aplikasi mobile lintas platform berbasis Flutter untuk ekosistem IoT SmartWorkshop, menyajikan visualisasi telemetri sensor real-time dan kendali perangkat keras jarak jauh.',
      description: `SmartWorkshop adalah aplikasi mobile lintas platform berbasis **Flutter** untuk ekosistem otomasi dan pemantauan IoT industri dan bengkel terpadu, memungkinkan pengendalian perangkat keras pintar secara *real-time*, eksekusi perintah infra merah (*IR Blaster*), pemutar murottal otomatis di musholla, dan visualisasi telemetri lingkungan kerja melalui protokol MQTT berlatensi rendah.

1. MANAJEMEN DAYA & SAKLAR PINTAR (SONOFF & TASMOTA)
- **Kontrol Relai Jarak Jauh**: Menghidupkan dan mematikan perangkat kelistrikan, lampu penerangan, colokan bengkel, dan mesin perkakas secara instan via MQTT (\`cmnd/POWER\`).
- **Telemetry & State Tracking**: Mendeteksi status aktual saklar secara dua arah secara *real-time* melalui topic \`stat/POWER\` dan \`tele/STATE\`.
- **LWT (Last Will and Testament) Heartbeat**: Pelacakan status online/offline setiap modul Sonoff secara otomatis untuk mendeteksi gangguan jaringan atau pemadaman listrik.
- **Auto TelePeriod Query**: Pemicuan pembaruan informasi status jaringan dan IP Address perangkat saat terhubung kembali ke jaringan.

2. REMOTE AC & PERANGKAT INFRAMERAH (TUYA IR BLASTER & TASMOTA IR)
- **Universal AC Remote Controller**: Pengendalian unit pendingin ruangan (AC) berbagai merk ternama (Panasonic, ChangHong) menggunakan transmisi sinyal infra merah terenkode (*IRhvac / IRSEND*).
- **Pengaturan Suhu & Mode Operasi**:
  - Pilihan mode: *Cool*, *Auto*, *Dry*, *Heat*, dan *Fan*.
  - Pengaturan kecepatan hembusan kipas (*Fan Speed*): *Low*, *Medium*, *High*, dan *Auto*.
  - Fitur *Swing* (ayunan bilah udara) dan mode pendinginan instan *Turbo*.
- **Vendor Protocol Mapping**: Penyesuaian otomatis struktur payload IR Tasmota berdasarkan vendor AC (\`MIRAGE\` untuk ChangHong, \`COOLIX\` untuk Panasonic).
- **Interactive Temperature Dial & Keypad**: Antarmuka digital ergonomis dengan dial suhu dinamis, skema warna adaptif sesuai mode aktif, dan tombol keypad berumpan balik visual.

3. KONTROL AUDIO MUSHOLLA & JADWAL SHOLAT OTOMATIS
- **Integrasi DFPlayer Mini MP3 Module**: Pemutar murottal Al-Qur'an terintegrasi dengan daftar putar per surah (Surah Al-Fatihah, Al-Baqarah, Ali 'Imran, Yasin, Ar-Rahman, Al-Waqi'ah, Al-Mulk).
- **Presisi Pengaturan Volume Digital**: Slider volume bertingkat (Level 0 hingga 30) dengan visualisasi persentase akurat untuk modul suara DFPlayer.
- **Kalkulasi Waktu Sholat Real-Time**: Sinkronisasi jadwal waktu sholat harian wilayah Jakarta berbasis API Aladhan (Metode Kemenag RI No. 20) dengan hitung mundur waktu menjelang sholat berikutnya.

4. MONITORING CUACA & PENGELOMPOKAN RUANGAN
- **Live Weather Telemetry**: Pemantauan kondisi cuaca real-time wilayah operasional bengkel melalui integrasi Open-Meteo API berbasis WMO Weather Interpretation Codes.
- **Hierarki Multi-Ruangan**: Pengelompokan perangkat pintar berdasarkan zonasi ruangan kerja (Workshop, Ruang Admin/Office, Server Room, Resepsionis, Musholla, Mess, Pantry).
- **Pengaturan & Pemetaan Ikon Fleksibel**: Kustomisasi nama, ikon FontAwesome, dan topik MQTT perangkat langsung dari aplikasi mobile.

5. ARSITEKTUR & TEKNOLOGI YANG DIGUNAKAN
- **Mobile Framework**: Flutter 3.10+ (Dart)
- **UI & Design System**: Tailwind Colors for Flutter (\`flutter_tailwind_colors\`), FontAwesome Flutter Icons
- **Komunikasi & Protokol**: MQTT 3.1.1 (QoS 0/1, Retain Messages), HTTP REST API
- **Hardware & Perangkat**:
  - SONOFF Smart Switch (Relay Controller dengan Tasmota Firmware)
  - Universal WiFi IR Blaster Module (IRhvac Transmitter)
  - DFPlayer Mini MP3 Player Module & Speaker Amplifier
  - NodeMCU / ESP8266 Microcontroller
- **Server & Broker**: Mosquitto MQTT Broker di Ubuntu VPS Server, Cloud Database`,
      status_publish: 'Published',
      version: '1.0.0',
      link_demo: '-',
      link_github: 'https://github.com/fahmiibrahimdevs/smartws-fsi'
    },
    {
      id: 6,
      user_id: '1',
      category_id: '1',
      tag_id: 'sk-react,sk-ts,sk-tailwind,sk-de01e262,sk-e2c722db,sk-mariadb',
      thumbnail: 'thumbnail_portofolio.webp',
      date: 'September 2026',
      title: 'Fahmi Ibrahim Portfolio & CMS — Fullstack Developer Portal',
      slug: 'portfolio-v2-cms',
      price: 'Free',
      short_desc: 'Platform portofolio web modern fullstack dan Content Management System (CMS) terintegrasi dengan arsitektur Hono.js REST API, React 18, Tailwind CSS v4, otentikasi JWT, sliding-window rate limiter, dan engine kompresi WebP client-side.',
      description: `Platform portofolio web modern fullstack dan Content Management System (CMS) terintegrasi yang dirancang khusus untuk menyajikan rekam jejak rekayasa perangkat lunak, integrasi perangkat keras IoT, publikasi artikel teknis, dan sertifikasi profesional secara terpusat dengan performa tinggi.

1. SISTEM MANAJEMEN KONTEN ADMINISTRATIF (CMS DASHBOARD)
- **Manajemen Modul Komprehensif**: Panel pengelolaan lengkap mencakup Biodata Profil, Linimasa Pengalaman Kerja (*Work Experience*), Riwayat & Pencapaian Akademik Kampus (*University Achievements*), Kategori & Tech Stack, Sertifikat & Kredensial, Proyek, dan Artikel Teknis.
- **Rich Text Markdown & Syntax Highlighting**: Editor konten terintegrasi dengan pratinjau langsung, dukungan format Markdown kaya, tabel, diagram, dan pewarnaan kode pemrograman via \`highlight.js\`.
- **Live Companion Preview Panel**: Panel pratinjau kartu proyek dan artikel interaktif berdampingan secara *real-time* saat pengisian form di dashboard admin.

2. SISTEM KEAMANAN & OTENTIKASI MULTILAPIS
- **Otentikasi JWT & Argon2id**: Akses admin terproteksi token JSON Web Token dengan algoritma hashing password modern \`Bun.password\` (Argon2id).
- **Sliding-Window IP Rate Limiter**: Proteksi cerdas terhadap serangan spam dan brute-force pada formulir kontak (maksimal 5 kiriman / 15 menit) dan percobaan login admin (maksimal 10 percobaan / 15 menit).
- **Parameterized SQL Security**: Pencegahan celah SQL Injection di seluruh query database MariaDB menggunakan parameterized prepared statements.

3. ENGINE OPTIMASI MEDIA & KOMPRESI WEBP CLIENT-SIDE
- **Progressive Client-Side Image Compression**: Kompresi otomatis gambar beresolusi tinggi (PNG/JPEG) menjadi format WebP 1080p sebelum diunggah ke server, menghemat ukuran berkas hingga 98% (dari ~11MB menjadi ~150KB) tanpa mengorbankan ketajaman visual.
- **Visual Stepper & Statistik Kompresi**: Animasi indikator progres kompresi multi-tahap (Baca File ➔ Kompresi ➔ Simpan) dan metrik penghematan kapasitas real-time.

4. DESAIN ANTARMUKA & PENGALAMAN PENGGUNA (UI/UX)
- **Seamless Dual-Theme System**: Palet warna *Matte Slate* gelap dan terang yang elegan, kontras tinggi, bebas polusi neon, dan nyaman di mata.
- **Interactive PDF & Certificate Modal**: Pembaca berkas dokumen PDF sertifikat dan pratinjau gambar beresolusi tinggi dengan indikator verifikasi kredensial.
- **Automated API Sync Engine**: Fitur sinkronisasi data dua arah antara lingkungan lokal WSL2 dan server VPS produksi.

5. SPESIFIKASI & TEKNOLOGI YANG DIGUNAKAN
- **Frontend SPA**: React 18, TypeScript, Vite, Tailwind CSS v4, Lucide React, TanStack Query
- **Backend API Server**: Bun Runtime v1.2+, Hono.js v4 REST API
- **Database Engine**: MariaDB 11+ / MySQL 8.0 (Connection Pooling & Parameterized SQL)
- **Security & Storage**: JWT Auth, Argon2id, IP Sliding-Window Rate Limiter, Local Asset Storage`,
      status_publish: 'Published',
      version: '2.0.0',
      link_demo: 'https://fahmiibrahim.my.id',
      link_github: 'https://github.com/fahmiibrahimdevs/portofolio-v2'
    },
    {
      id: 7,
      user_id: '1',
      category_id: '1',
      tag_id: 'sk-py,sk-easyeda,sk-tailwind,sk-123490c4,sk-js',
      thumbnail: 'thumbnail_pcb_tiler.webp',
      date: 'September 2026',
      title: 'PCB Layout Tiler & Auto-Panelizer — 1:1 Precision Print Studio',
      slug: 'pcb-layout-tiler-auto-panelizer',
      price: 'Free',
      short_desc: 'Aplikasi web otomatisasi penataan (panelizer) multiple layout PCB ke lembar kertas A4 dengan skala 1:1 murni, deteksi dimensi fisik PDF otomatis, pencerminan layer Bottom, dan ekspor ganda ke PDF 300/600 DPI & Word DOCX.',
      description: `PCB Layout Tiler & Auto-Panelizer adalah aplikasi web utilitas rekayasa elektronika yang dirancang untuk mengotomatisasi proses penataan (*tiling / panelizing*), deteksi dimensi fisik, pencerminan jalur tembaga, dan perbanyakan layout PCB ke dalam selembar kertas standar A4 dengan skala 1:1 presisi tinggi untuk kebutuhan fabrikasi mandiri (*toner transfer / PCB etching*).

1. PARSING VEKTOR PDF & DETEKSI DIMENSI OTOMATIS
- **Multi-PDF & Multi-Layer Batch Upload**: Mengunggah beberapa berkas PDF sekaligus yang diekspor dari software EDA (EasyEDA, KiCad, Altium, Eagle) mencakup Top Layer dan Bottom Layer.
- **Bounding Box Dimension Extraction**: Deteksi otomatis batas fisik jalur tembaga (Lebar x Tinggi dalam milimeter) dari metadata vektor PDF menggunakan engine PyMuPDF.
- **Override Dimensi Manual**: Fleksibilitas untuk menyesuaikan ukuran target (Lebar & Tinggi mm) secara manual jika desain PCB memiliki margin batas khusus.

2. PENATAAN TATA LETAK & OPTIMASI LEMBAR A4
- **Smart Horizontal Mirroring (Bottom Layer)**: Fitur pencerminan horizontal otomatis khusus untuk jalur tembaga sisi bawah (*bottom copper layer*) agar orientasi pin IC dan komponen tidak terbalik saat proses transfer panas.
- **Auto-Fill Maximum Copies Engine**: Algoritma kalkulasi grid otomatis yang menghitung kapasitas maksimal PCB yang dapat dimuat dalam 1 lembar A4 tanpa risiko saling tumpang tindih.
- **Garis Panduan Pemotongan (Cut Lines)**: Pembuatan garis batas potong (*cutting guide lines*) di sekeliling setiap unit PCB untuk mempermudah pemotongan papan tembaga pasca cetak.
- **Pengaturan Spasi & Celah Fleksibel**: Kontrol jarak horizontal antar PCB (*gap spaces / tab gap*) dan jarak vertikal antar baris (*row gap mm*).

3. DUAL EXPORT PRODUCTION (PDF 1:1 & WORD DOCX)
- **PDF 1:1 Vector Print-Ready (300/600 DPI)**: Menghasilkan berkas PDF siap cetak dengan binarisasi tajam resolusi tinggi tanpa distorsi ukuran skala.
- **Dokumen Microsoft Word (.docx)**: Ekspor ke format Word standar A4 dengan pengaturan *Narrow Margin* (12.7 mm) dan spasi presisi antar gambar untuk kemudahan pencetakan di berbagai lingkungan PC/Printer.

4. INTERACTIVE LIVE CANVAS PREVIEW
- **Render A4 Real-Time**: Kanvas interaktif yang memvisualisasikan penempatan PCB secara instan setiap kali parameter ukuran, jumlah salinan, atau mode cermin diubah.
- **Slot Visibility Selector**: Kemampuan memilih dan mematikan slot PCB tertentu pada grid untuk mode pengujian (*test mode*).

5. SPESIFIKASI & TEKNOLOGI YANG DIGUNAKAN
- **Backend & Vector Processing**: Python 3.10+, Flask 3.0, PyMuPDF 1.28 (\`fitz\`), Pillow (PIL), python-docx
- **Frontend & UI Canvas**: HTML5 Canvas, Tailwind CSS, Vanilla JavaScript Modern, Lucide Icons
- **Layout Math Engine**: Vector Bounding Box Detector, DPI Grid Scaler (600 DPI Binarization), Auto-Placement Matrix`,
      status_publish: 'Published',
      version: '1.0.0',
      link_demo: '-',
      link_github: 'https://github.com/fahmiibrahimdevs/pcb-tiler'
    }
  ];

  for (const p of projects) {
    await execute(`
      INSERT INTO projects (
        id, user_id, category_id, tag_id, thumbnail, date, title, slug, price,
        short_desc, description, status_publish, version, link_demo, link_github,
        created_at, updated_at
      ) VALUES (
        :id, :user_id, :category_id, :tag_id, :thumbnail, :date, :title, :slug, :price,
        :short_desc, :description, :status_publish, :version, :link_demo, :link_github,
        NOW(), NOW()
      ) ON DUPLICATE KEY UPDATE
        user_id=VALUES(user_id), category_id=VALUES(category_id), tag_id=VALUES(tag_id),
        thumbnail=VALUES(thumbnail), date=VALUES(date), title=VALUES(title), slug=VALUES(slug),
        price=VALUES(price), short_desc=VALUES(short_desc), description=VALUES(description),
        status_publish=VALUES(status_publish), version=VALUES(version), link_demo=VALUES(link_demo),
        link_github=VALUES(link_github), updated_at=NOW()
    `, p);
  }

  console.log('✅ Successfully updated all 7 projects with structured detailed content!');
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Error updating projects:', err);
  process.exit(1);
});
