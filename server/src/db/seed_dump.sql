/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: portofolio_v2
-- ------------------------------------------------------
-- Server version	11.8.6-MariaDB-5ubuntu0.1 from Ubuntu

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES
('admin-fahmi-1','fahmi','fahmiibrahimdevs@gmail.com','$argon2id$v=19$m=65536,t=2,p=1$NPcprciOarMZVI2me8UHVPluyhiRFklGsfkjFJMP/hw$NYCxUC2QiXbTbw5WstAPhBmRHzBmyUaHze9MZ+kxIQc','Fahmi Ibrahim','2026-09-04 07:06:33','2026-09-04 12:59:41');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `article_categories`
--

DROP TABLE IF EXISTS `article_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_categories`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `article_categories` WRITE;
/*!40000 ALTER TABLE `article_categories` DISABLE KEYS */;
INSERT INTO `article_categories` VALUES
(1,'Languages'),
(2,'Databases'),
(3,'JavaScript Library'),
(4,'Framework'),
(5,'Microcontroller'),
(6,'Others'),
(7,'Server');
/*!40000 ALTER TABLE `article_categories` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `article_posts`
--

DROP TABLE IF EXISTS `article_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_posts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` text NOT NULL,
  `category_id` text NOT NULL,
  `sub_category_id` text NOT NULL,
  `thumbnail` text DEFAULT NULL,
  `date` text NOT NULL DEFAULT '2025-04-26',
  `title` text NOT NULL,
  `slug` text NOT NULL,
  `description` text NOT NULL,
  `fill_content` text NOT NULL,
  `status_publish` enum('Published','Privated','Draft') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_posts`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `article_posts` WRITE;
/*!40000 ALTER TABLE `article_posts` DISABLE KEYS */;
INSERT INTO `article_posts` VALUES
(1,'1','cat-languages','sk-html','/uploads/1788534842330_THUMB-1.png','2026-09-04','Struktur Dasar HTML: Fondasi Sebelum Bikin Website','struktur-dasar-html-fondasi-sebelum-bikin-website','Sebelum sibuk mempercantik website dengan CSS atau menambahkan interaksi dengan JavaScript, kamu perlu memahami struktur dasar HTML terlebih dahulu. Di artikel ini, kita akan membahas anatomi dokumen HTML, fungsi `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, hingga perbedaan antara tag dan element. Cocok untuk kamu yang baru mulai belajar web development dan ingin memahami HTML dari fondasinya.','# Struktur Dasar HTML: Fondasi Sebelum Bikin Website\n\nBayangin kamu mau bikin sebuah rumah.\n\nSebelum mikirin warna cat, lampu, sofa, atau desain interior, tentu kamu harus punya fondasinya dulu. Ada lantai, dinding, pintu, jendela, dan ruangan yang jelas fungsinya.\n\nKurang lebih seperti itulah HTML dalam sebuah website.\n\nHTML adalah kerangka yang menentukan bagaimana sebuah halaman web disusun. CSS nantinya bisa dipakai untuk membuat tampilannya lebih menarik, sedangkan JavaScript bisa menambahkan interaksi dan perilaku. Tapi sebelum semuanya itu, struktur HTML-nya harus benar terlebih dahulu.\n\nMasalahnya, banyak pemula justru langsung sibuk belajar CSS atau JavaScript tanpa benar-benar memahami struktur dasar HTML. Akibatnya, ketika layout berantakan atau muncul masalah saat debugging, mereka sering bingung mencari sumber masalahnya.\n\nJadi, sebelum bikin website yang kelihatan keren, kita kenalan dulu dengan fondasinya.\n\n## Apa Itu HTML?\n\nHTML adalah singkatan dari **HyperText Markup Language.**\n\nHTML bukan programming language seperti JavaScript, Python, atau C++. HTML termasuk markup language, yaitu bahasa yang digunakan untuk memberi struktur dan makna pada sebuah konten.\n\nMisalnya, kita punya teks:\n\n```HTML\n<h1>Belajar HTML</h1>\n<p>HTML adalah fondasi dalam pengembangan website.</p>\n```\n\nDari kode tersebut, browser bisa memahami bahwa \"Belajar HTML\" adalah sebuah heading dan kalimat berikutnya adalah paragraph.\n\nJadi, tugas utama HTML bukan menentukan apakah teks tersebut berwarna biru, ukurannya besar, atau posisinya di tengah. Itu lebih merupakan tugas CSS.\n\nHTML lebih fokus pada pertanyaan:\n\n> \"Konten ini sebenarnya apa?\"\n\nApakah ini heading? Paragraph? Image? Link? List? Form?\n\nKarena itu, HTML bisa dianggap sebagai struktur dan makna dari sebuah halaman web.\n\n## Struktur Dasar Dokumen HTML\n\nHampir setiap halaman HTML modern dimulai dengan struktur seperti berikut:\n\n```HTML\n<!DOCTYPE html>\n<html lang=\"id\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Belajar HTML</title>\n</head>\n<body>\n  <h1>Halo Dunia</h1>\n</body>\n</html>\n```\n\nWalaupun pendek, setiap bagiannya punya fungsi.\n\n`<!DOCTYPE html>`\n\nBaris ini memberi tahu browser bahwa dokumen menggunakan HTML5.\n\nDOCTYPE juga membantu browser menggunakan standards mode. Tanpanya, browser dapat masuk ke quirks mode, yang bisa membuat beberapa perilaku rendering berbeda.\n\nKarena itu, biasakan menempatkannya di baris pertama.\n\n`<html lang=\"id\">`\n\n`<html>` adalah root element, yaitu pembungkus utama seluruh dokumen HTML.\n\nSementara itu, `lang=\"id\"` adalah attribute yang menunjukkan bahwa bahasa utama halaman adalah Bahasa Indonesia.\n\nAttribute lang penting untuk accessibility, terutama agar screen reader dapat mengetahui bahasa yang digunakan, dan juga memberikan informasi bahasa kepada search engine.\n\n```HTML\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Belajar HTML</title>\n</head>\n```\n\nBagian `<head>` berisi metadata dan informasi tentang halaman.\n\nIsinya biasanya tidak menjadi konten utama yang terlihat di dalam halaman, tetapi tetap penting bagi browser dan layanan seperti search engine.\n\n```HTML\n<body>\n  <h1>Halo Dunia</h1>\n</body>\n```\n\nBerbeda dengan `<head>`, bagian `<body>` berisi konten utama yang ditampilkan kepada pengguna.\n\nJadi gampangnya:\n\n`<head>` = informasi tentang halaman\n`<body>` = isi halaman\n\n`<meta charset=\"UTF-8\">`\n\nElement ini menentukan character encoding dokumen.\n\n`UTF-8` memungkinkan browser membaca berbagai karakter dengan benar, termasuk karakter seperti é, ✓, dan emoji.\n\nTanpa encoding yang sesuai, karakter tertentu berpotensi tampil tidak semestinya. Karena itu, `UTF-8` hampir selalu digunakan pada dokumen HTML modern.\n\n## Tag vs Element\n\nIni salah satu hal yang sering bikin pemula tertukar.\n\nPerhatikan:\n\n```HTML\n<p>Halo Dunia</p>\n```\n\n`<p>` adalah tag.\n\nSedangkan keseluruhan:\n\n```HTML\n<p>Halo Dunia</p>\n```\n\nadalah sebuah element.\n\nSecara umum, element seperti `<p>` terdiri dari opening tag, content, dan closing tag.\n\n`<p>` = opening tag\n`</p>` = closing tag\n\nMemahami perbedaannya akan membantu ketika mulai belajar HTML lebih jauh.\n\n## Nested Element dan Indentation\n\nElement HTML bisa berada di dalam element lainnya. Ini disebut nesting.\n\nContohnya:\n\n```HTML\n<body>\n  <h1>Belajar HTML</h1>\n\n  <p>\n    Ini adalah <strong>paragraph</strong>.\n  </p>\n</body>\n```\n\nElement `<strong>` berada di dalam `<p>`, sedangkan `<p>` dan `<h1>` berada di dalam `<body>`.\n\nKarena itu, indentation penting agar struktur kode mudah dibaca.\n\nContoh yang rapi:\n\n```HTML\n<body>\n  <h1>Belajar HTML</h1>\n  <p>Ini paragraph.</p>\n</body>\n```\n\nBandingkan dengan kode tanpa indentation:\n\n```HTML\n<body>\n<h1>Belajar HTML</h1>\n<p>Ini paragraph.</p>\n</body>\n```\n\nBrowser mungkin tetap bisa membacanya, tetapi developer akan jauh lebih mudah bekerja dengan struktur yang rapi.\n\n## Kesalahan yang Sering Terjadi\n\nAda beberapa kesalahan dasar yang sering dilakukan saat baru belajar HTML.\n\nLupa closing tag:\n\n`<p>Halo Dunia`\n\nSeharusnya:\n\n`<p>Halo Dunia</p>`\n\nSalah nesting:\n```HTML\n<p>\n  <strong>Halo</p>\n</strong>\n```\n\nYang benar:\n```HTML\n<p>\n  <strong>Halo</strong>\n</p>\n```\n\nElement yang terakhir dibuka harus ditutup terlebih dahulu.\n\nLupa `<!DOCTYPE html>`\n\nWalaupun browser mungkin tetap menampilkan halaman, sebaiknya `<!DOCTYPE html>` selalu digunakan agar dokumen diproses dalam standards mode.\n\n## Kesimpulan\n\nStruktur dasar HTML sebenarnya cukup sederhana. Yang penting bukan menghafal semua tag, tetapi memahami bagaimana sebuah dokumen HTML disusun.\n\n`<!DOCTYPE html>` memberi tahu browser bahwa kita menggunakan HTML5. `<html>` menjadi root element, `<head>` berisi metadata, dan `<body>` berisi konten yang ditampilkan. Selain itu, kamu juga perlu memahami perbedaan tag dan element, serta bagaimana melakukan nesting dengan indentation yang rapi.\n\nBegitu fondasi ini sudah dipahami, belajar element HTML lainnya akan terasa jauh lebih mudah.\n\nDi artikel berikutnya, kita akan mulai masuk ke Text Elements: Heading, Paragraph, dan List yang menjadi dasar untuk menulis konten di dalam halaman HTML.\n','Published','2026-09-04 15:14:11','2026-09-04 15:58:40'),
(2,'1','cat-languages','sk-html','/uploads/1788537796089_THUMB-2.png','2026-09-04','Text Elements: Heading, Paragraph, dan List','text-elements-heading-paragraph-dan-list','Setelah memahami struktur dasar HTML, sekarang waktunya mulai mengisi halaman dengan konten. Di artikel ini, kita akan mengenal tiga text elements yang paling sering digunakan dalam HTML: **heading, paragraph, dan list**, sekaligus memahami kapan dan bagaimana menggunakannya dengan struktur yang benar.','Setelah punya kerangka HTML, tentunya halaman tersebut belum akan terasa seperti website kalau isinya masih kosong.\n\nNah, di sinilah kita mulai menggunakan **text elements** untuk menyusun konten. Tiga yang paling dasar dan paling sering kamu temui adalah **heading, paragraph, dan list.\n**\nKelihatannya sederhana, tapi cara menggunakannya tetap perlu dipahami sejak awal. Jangan sampai semua teks dibuat menggunakan `<div>` hanya karena \"yang penting muncul\".\n\n## Heading dengan <h1> sampai <h6>\n\nHeading digunakan untuk membuat judul atau subjudul dalam sebuah halaman.\n\nHTML menyediakan enam tingkat heading:\n\n```HTML\n<h1>Judul Utama</h1>\n<h2>Subjudul</h2>\n<h3>Subjudul Tingkat 3</h3>\n<h4>Subjudul Tingkat 4</h4>\n<h5>Subjudul Tingkat 5</h5>\n<h6>Subjudul Tingkat 6</h6>\n```\n\nSemakin besar angkanya, semakin rendah tingkat heading-nya.\n\nSecara sederhana, struktur tersebut bisa dibayangkan seperti outline sebuah artikel:\n\n```HTML\n<h1>Website Development\n    <h2>HTML\n        <h3>Text Elements\n        <h3>Links\n    <h2>CSS\n        <h3>Layout\n        <h3>Typography\n```\n\n`<h1>` bukan sekadar teks paling besar\n\nKesalahan yang sering dilakukan pemula adalah menganggap `<h1>` hanya untuk membuat tulisan besar.\n\nPadahal, heading mempunyai makna struktural. `h1` merupakan heading utama, sedangkan `h2`, `h3`, dan seterusnya menunjukkan tingkatan di bawahnya.\n\nJadi jangan memilih heading hanya berdasarkan ukurannya.\n\nMisalnya:\n\n```HTML\n<h1>Belajar HTML</h1>\n<h2>Text Elements</h2>\n<h2>Links</h2>\n```\n\nKalau nantinya ingin membuat teks menjadi lebih besar atau lebih kecil, gunakan CSS, bukan mengganti `<h2>` menjadi `<h1>` hanya karena tampilannya lebih sesuai.\n\n## Paragraph dengan `<p>`\n\nKalau heading digunakan untuk judul, maka `<p>` digunakan untuk paragraph.\n\nContohnya:\n\n```HTML\n<p>\n  HTML digunakan untuk membuat struktur sebuah halaman web.\n</p>\n```\n\nKamu bisa menggunakan beberapa `<p>` untuk memisahkan informasi menjadi paragraph yang berbeda:\n\n```HTML\n<p>HTML digunakan untuk membuat struktur halaman web.</p>\n```\n\n```HTML\n<p>\n  CSS digunakan untuk mengatur tampilan dan layout halaman.\n</p>\n```\n\nPemisahan ini bukan hanya soal tampilan. Paragraph membantu browser dan developer memahami bahwa setiap bagian merupakan blok informasi yang berbeda.\n\nJadi, jangan menggunakan banyak `<br>` hanya untuk membuat jarak antar teks.\n\nContoh yang kurang tepat:\n\n```HTML\n<p>\n  Saya sedang belajar HTML.<br><br><br>\n  HTML ternyata cukup mudah.\n</p>\n```\n\nLebih baik gunakan dua paragraph:\n\n```HTML\n<p>Saya sedang belajar HTML.</p>\n\n<p>HTML ternyata cukup mudah.</p>\n```\n\nKalau tujuanmu hanya ingin mengatur jarak atau tampilan, nanti gunakan CSS.\n\n## List dengan `<ul>`, `<ol>`, dan `<li>`\n\nKalau kamu punya beberapa item yang ingin ditampilkan sebagai daftar, gunakan list.\n\nHTML memiliki dua jenis list yang paling umum.\n\n### Unordered List\n\n`<ul>` digunakan untuk daftar yang tidak membutuhkan urutan tertentu.\n\nSetiap item menggunakan `<li>`:\n\n```HTML\n<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>\n```\n\nHasilnya akan terlihat seperti daftar dengan bullet.\n\nCocok digunakan misalnya untuk:\n\n  - daftar fitur\n  - daftar teknologi\n  - daftar barang belanja\n  - daftar menu\n  - Ordered List\n\nSedangkan `<ol>` digunakan ketika urutan item memiliki makna.\n\n```HTML\n<ol>\n  <li>Buka VS Code</li>\n  <li>Buat file HTML</li>\n  <li>Tulis struktur dasar</li>\n</ol>\n```\n\nHasilnya akan menggunakan nomor:\n\n  1. Buka VS Code\n  2. Buat file HTML\n  3. Tulis struktur dasar\n\nContohnya cocok untuk tutorial, langkah instalasi, ranking, atau proses yang memang harus dilakukan secara berurutan.\n\n### Jangan lupa `<li>`\n\n`<li>` berarti list item.\n\nElement ini digunakan untuk setiap item di dalam `<ul>` atau `<ol>`.\n\nStrukturnya:\n\n```HTML\n<ul>\n  <li>Item pertama</li>\n  <li>Item kedua</li>\n</ul>\n```\n\nBukan:\n\n```HTML\n<ul>\n  HTML\n  CSS\n  JavaScript\n</ul>\n```\n\nDengan struktur yang benar, browser dapat memahami bahwa setiap item memang merupakan bagian dari sebuah list.\n\n## Memilih Element Berdasarkan Maknanya\n\nSatu hal penting yang perlu dibiasakan sejak awal adalah menggunakan HTML berdasarkan makna kontennya, bukan sekadar bagaimana tampilannya.\n\nMisalnya, kalau sebuah teks merupakan judul utama, gunakan:\n\n```HTML\n<h1>Belajar HTML</h1>\n```\n\nKalau berupa paragraph:\n\n```HTML\n<p>HTML adalah markup language.</p>\n```\n\nKalau berupa daftar:\n\n```HTML\n<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>\n```\n\nJangan memilih element hanya karena hasil tampilannya terlihat cocok.\n\nKenapa?\n\nKarena struktur HTML yang semantik membantu browser, search engine, screen reader, dan developer lain memahami isi halaman dengan lebih baik.\n\n## Contoh Sederhana\n\nSekarang kita gabungkan semuanya:\n\n```HTML\n<h1>Belajar Web Development</h1>\n\n<p>\n  Web development terdiri dari berbagai teknologi yang saling melengkapi.\n</p>\n\n<h2>Teknologi Dasar</h2>\n\n<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>\n```\n\nDi sini kita punya satu heading utama, sebuah paragraph, kemudian subheading dan unordered list.\n\nStrukturnya sudah cukup untuk membuat konten sederhana yang jelas dan mudah dibaca.\n\n## Kesimpulan\n\nHeading digunakan untuk membangun hierarki judul dengan `<h1>` sampai `<h6>`. **Paragraph** menggunakan `<p>` untuk menyusun teks menjadi blok informasi. Sementara itu, list menggunakan `<ul>` atau `<ol>` yang berisi `<li>`, tergantung apakah urutannya penting atau tidak.\n\nKunci utamanya adalah jangan memilih element hanya berdasarkan tampilannya. Gunakan element sesuai makna dan fungsi kontennya, lalu gunakan CSS untuk mengatur tampilannya.\n\nSetelah memahami text elements, langkah berikutnya mulai menarik: bagaimana membuat teks atau elemen di halaman bisa **terhubung ke halaman lain, website lain, atau bahkan bagian tertentu dari halaman yang sama.**\n\nDi artikel selanjutnya, kita akan membahas **Links & Navigation: <a>, href, dan Cara Berpindah Halaman.**','Published','2026-09-04 16:12:56','2026-09-04 16:12:56'),
(3,'1','cat-languages','sk-html','/uploads/1788538642902_THUMB-3.png','2026-09-04','Links & Navigation: Mengenal Anchor dan href','links-navigation-mengenal-anchor-dan-href','Link adalah salah satu bagian paling penting dalam sebuah website karena memungkinkan pengguna berpindah dari satu halaman ke halaman lainnya. Di artikel ini, kita akan mengenal element `<a>`, attribute `href`**bold text**, cara membuat link ke halaman lain, website eksternal, file, hingga bagian tertentu dalam satu halaman.','Website yang hanya berisi teks tentu akan terasa cukup terbatas. Salah satu hal yang membuat web menjadi \"web\" adalah kemampuan untuk saling terhubung.\n\nSaat kamu menekan menu seperti `Home`, `About`, atau `Contact`, sebenarnya browser sedang menggunakan sebuah HTML element yang disebut anchor, yaitu `<a>`.\n\n## Mengenal Element `<a>`\n\nContoh paling sederhana:\n\n```HTML\n<a href=\"about.html\">About</a>\n```\n\nElement `<a>` digunakan untuk membuat link.\n\nBagian `About` adalah teks yang akan diklik oleh pengguna, sedangkan:\n\n`href=\"about.html\"`\n\nmenentukan ke mana link tersebut akan mengarah.\n\n`href` merupakan singkatan dari **Hypertext Reference** dan merupakan attribute penting pada `<a>`.\n\nSecara sederhana:\n\n<a>       → element untuk membuat link\nhref      → tujuan link\nAbout     → teks yang ditampilkan\n\n## Link ke Halaman Lain\n\nMisalnya kamu punya struktur project seperti ini:\n\nwebsite/\n├── index.html\n├── about.html\n└── contact.html\n\nDari index.html, kamu bisa membuat navigation sederhana:\n\n```HTML\n<nav>\n  <a href=\"index.html\">Home</a>\n  <a href=\"about.html\">About</a>\n  <a href=\"contact.html\">Contact</a>\n</nav>\n```\n\nKetika pengguna mengklik **About**, browser akan membuka `about.html`.\n\nInilah dasar dari navigation pada website.\n\n## Link ke Website Lain\n\n`href` juga bisa berisi URL lengkap.\n\n```HTML\n<a href=\"https://developer.mozilla.org\">\n  MDN Web Docs\n</a>\n```HTML\n\nKetika diklik, browser akan menuju website MDN.\n\nKalau kamu ingin link eksternal dibuka di tab baru, bisa menggunakan attribute target:\n\n```HTML\n<a \n  href=\"https://developer.mozilla.org\"\n  target=\"_blank\"\n>\n  Buka MDN\n</a>\n```\n\n`target=\"_blank\"` meminta browser membuka tujuan pada browsing context baru, yang pada browser modern umumnya berupa tab baru.\n\nUntuk link eksternal yang dibuka dengan cara ini, biasanya juga digunakan:\n\n`rel=\"noopener\"`\n\nContohnya:\n\n```HTML\n<a\n  href=\"https://developer.mozilla.org\"\n  target=\"_blank\"\n  rel=\"noopener\"\n>\n  MDN Web Docs\n</a>\n```\n\n## Relative URL vs Absolute URL\n\nAda dua bentuk URL yang sering digunakan pada href.\n\n### Relative URL\n\nRelative URL mengarah berdasarkan lokasi file saat ini.\n\n```HTML\n<a href=\"about.html\">About</a>\n```\n\nKalau `about.html` berada dalam folder yang sama, browser akan mencarinya di folder tersebut.\n\nMisalnya:\n\nwebsite/\n├── index.html\n└── pages/\n    └── about.html\n\nDari `index.html`, link-nya menjadi:\n\n```HTML\n<a href=\"pages/about.html\">About</a>\n```\n\n### Absolute URL\n\nAbsolute URL menggunakan alamat lengkap:\n\n```HTML\n<a href=\"https://example.com/about\">\n  About\n</a>\n```\n\nRelative URL lebih sering digunakan untuk halaman yang masih berada dalam project yang sama, sedangkan absolute URL umum digunakan untuk website atau resource eksternal.\n\n## Membuat Link ke Bagian Tertentu\n\nTernyata `<a>` tidak hanya bisa digunakan untuk berpindah halaman.\n\nKita juga bisa menggunakannya untuk berpindah ke bagian tertentu dalam halaman yang sama.\n\nMisalnya ada element:\n\n```HTML\n<h2 id=\"contact\">Contact</h2>\n```\n\nKemudian kita bisa membuat link:\n\n```HTML\n<a href=\"#contact\">Ke Contact</a>\n```\n\nKetika diklik, browser akan menuju element yang memiliki:\n\n`id=\"contact\"`\n\nTanda `#` menunjukkan bahwa yang dituju adalah fragment identifier berdasarkan id element.\n\nTeknik ini sering digunakan pada daftar isi atau navigation pada halaman yang panjang.\n\nContohnya:\n\n```HTML\n<nav>\n  <a href=\"#about\">About</a>\n  <a href=\"#services\">Services</a>\n  <a href=\"#contact\">Contact</a>\n</nav>\n\n<h2 id=\"about\">About</h2>\n<p>...</p>\n\n<h2 id=\"services\">Services</h2>\n<p>...</p>\n\n<h2 id=\"contact\">Contact</h2>\n<p>...</p>\n```\n\n## Link untuk Email dan Telepon\n\n`href` juga bisa digunakan untuk membuat aksi tertentu.\n\nUntuk email:\n\n```HTML\n<a href=\"mailto:hello@example.com\">\n  Kirim Email\n</a>\n```\n\nUntuk nomor telepon:\n\n```HTML\n<a href=\"tel:+6281234567890\">\n  Hubungi Kami\n</a>\n```\n\nKetika pengguna mengkliknya, browser atau sistem operasi dapat menawarkan aplikasi yang sesuai, seperti aplikasi email atau telepon.\n\n## Kesalahan yang Sering Terjadi\n\nSalah satu kesalahan paling umum adalah lupa menambahkan `href`.\n\n`<a>About</a>`\n\nElement tersebut memang tetap menjadi `<a>`, tetapi tidak memiliki tujuan navigasi.\n\nKesalahan lainnya adalah salah menuliskan path:\n\n```HTML\n<a href=\"abouts.html\">About</a>\n```\n\nPadahal file sebenarnya bernama:\n\n`about.html`\n\nPerbedaan kecil seperti ini bisa membuat link menghasilkan **404 Not Found** ketika diklik.\n\nKarena itu, saat link tidak bekerja, pertama-tama periksa kembali nilai `href` dan lokasi file yang dituju.\n\n## Kesimpulan\n\nElement `<a>` adalah fondasi navigation di HTML. Dengan `<a>` dan attribute `href`, kita bisa membuat link ke halaman lain, website eksternal, file, email, nomor telepon, bahkan bagian tertentu dari halaman yang sama.\n\nContoh paling dasarnya:\n\n```HTML\n<a href=\"about.html\">About</a>\n```\n\nYang perlu dipahami bukan hanya cara menulis syntax-nya, tetapi juga bagaimana menentukan tujuan link menggunakan URL, relative path, atau id.\n\nSetelah bisa menghubungkan halaman, langkah berikutnya adalah mulai memasukkan **gambar dan media** ke dalam website agar halaman tidak hanya berisi teks.','Published','2026-09-04 16:23:36','2026-09-04 16:23:36');
/*!40000 ALTER TABLE `article_posts` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `article_sub_categories`
--

DROP TABLE IF EXISTS `article_sub_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_sub_categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` text NOT NULL,
  `sub_category_name` text NOT NULL,
  `description` text NOT NULL DEFAULT '-',
  `image` text NOT NULL DEFAULT '-',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_sub_categories`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `article_sub_categories` WRITE;
/*!40000 ALTER TABLE `article_sub_categories` DISABLE KEYS */;
INSERT INTO `article_sub_categories` VALUES
(1,'1','HTML5','','HTML5.png'),
(2,'1','CSS3','','CSS3.png'),
(3,'1','JavaScript','','JavaScript.png'),
(4,'1','PHP','','php.svg'),
(5,'1','Python','','Python.png'),
(6,'1','Dart','','Dart.png'),
(7,'1','C++','','Cplusplus.png'),
(8,'2','MySQL','','MySQL.png'),
(9,'2','MariaDB','','MariaDB.png'),
(10,'3','NodeJS','','NodeJS.svg'),
(11,'4','Laravel','','Laravel.png'),
(12,'4','Tailwind','','TailwindCSS.png'),
(13,'4','Bootstrap','','Bootstrap.png'),
(14,'5','Arduino','','Arduino.png'),
(15,'5','ESP8266','','ESP8266.png'),
(16,'5','ESP32','','ESP32.png'),
(17,'6','jQuery','','jQuery.png'),
(18,'6','Github','','Github.png'),
(19,'6','Postman','','Postman.svg'),
(20,'6','EasyEDA','','EasyEDA.jpg'),
(21,'6','NGINX','','Nginx.png'),
(22,'6','MQTT','','MQTT.png'),
(23,'7','Ubuntu','','Ubuntu.png'),
(24,'7','Filezilla','','Filezilla.png'),
(25,'7','CLI','','CLI.jpg');
/*!40000 ALTER TABLE `article_sub_categories` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES
('356a192b7913b04c54574d18c28d46e6395428ab','i:2;',1775483200),
('356a192b7913b04c54574d18c28d46e6395428ab:timer','i:1775483200;',1775483200),
('42062e69e90960f178477edeadbfc110b407113a','i:24;',1779496406),
('42062e69e90960f178477edeadbfc110b407113a:timer','i:1779496406;',1779496406),
('a8a95f1f7ec879950017b44a4fa931d1021f0ba9','i:4;',1785395117),
('a8a95f1f7ec879950017b44a4fa931d1021f0ba9:timer','i:1785395117;',1785395117);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) DEFAULT '',
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `credentials`
--

DROP TABLE IF EXISTS `credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `credentials` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `issuer` varchar(255) NOT NULL,
  `issue_date` varchar(100) DEFAULT '',
  `expiry_date` varchar(100) DEFAULT 'No Expired',
  `credential_url` varchar(500) DEFAULT '',
  `file_url` varchar(500) DEFAULT '',
  `logo_url` varchar(500) DEFAULT '',
  `order_index` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credentials`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `credentials` WRITE;
/*!40000 ALTER TABLE `credentials` DISABLE KEYS */;
INSERT INTO `credentials` VALUES
('cred-intek-rnd','R&D Mechatronics - Intern','PT. Solusi Intek Indonesia','May 2023','No Expired','','/uploads/1788509647032_Sertifikat_PT_Solusi_Intek.pdf','/uploads/1788509632809_Intek.png',2,'2026-09-04 07:06:35','2026-09-04 13:01:26'),
('cred-itechnocup','Finalis IoT iTechnoCup','iTechnoCup 2025 PNJ','2025','No Expired','','/uploads/1788509711177_Sertifikat_Finalis_IoT_Fahmi_Ibrahim.png','/uploads/1788509692748_logo-itechnocup.png',4,'2026-09-04 07:06:35','2026-09-04 13:01:33'),
('cred-k3','K3 SAFETY','Expert Club Indonesia','2023','No Expired','','/uploads/1788509764059_Sertifikat_K3_Fahmi_Ibrahim.jpg','/uploads/1788509774073_logo-eci.jpg',5,'2026-09-04 07:06:35','2026-09-04 13:01:39'),
('cred-smkn5','BNSP Electronics','SMKN 5 Jakarta','May 2023','May 2023 - May 2026','','/uploads/1788509719780_Sertifikat_SMKN5JKT.pdf','/uploads/1788509665562_SMKN5.png',3,'2026-09-04 07:06:35','2026-09-04 13:00:58'),
('cred-udemy-nodejs','NodeJS Course PZN','Udemy','August 2023','No Expired','','/uploads/1788509603600_NodeJS_Course_Udemy.jpg','/uploads/1788509592918_Udemy.jpg',1,'2026-09-04 07:06:35','2026-09-04 08:13:29');
/*!40000 ALTER TABLE `credentials` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES
(1,'0001_01_01_000000_create_users_table',1),
(2,'0001_01_01_000001_create_cache_table',1),
(3,'0001_01_01_000002_create_jobs_table',1),
(4,'2024_11_23_131219_laratrust_setup_tables',1),
(5,'2024_11_23_215817_create_article_categories_table',1),
(6,'2024_11_23_215826_create_article_sub_categories_table',1),
(7,'2024_11_23_220432_create_article_posts_table',1),
(8,'2024_11_26_223926_create_project_categories_table',1),
(9,'2024_11_26_223933_create_project_sub_categories_table',1),
(10,'2024_11_26_224811_create_projects_table',1),
(11,'2024_11_26_230355_create_project_images_table',1),
(12,'2024_11_26_230405_create_project_details_table',1),
(13,'2024_11_27_172123_create_project_tags_table',1),
(14,'2026_01_04_093420_create_project_files_table',2),
(15,'2026_01_04_093424_create_project_boms_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `permission_role`
--

DROP TABLE IF EXISTS `permission_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission_role` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `permission_role_role_id_foreign` (`role_id`),
  CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_role`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `permission_role` WRITE;
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
INSERT INTO `permission_role` VALUES
(1,1),
(2,1),
(3,1),
(4,1),
(1,2),
(2,2),
(3,2),
(4,2);
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `permission_user`
--

DROP TABLE IF EXISTS `permission_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission_user` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `user_type` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`,`permission_id`,`user_type`),
  KEY `permission_user_permission_id_foreign` (`permission_id`),
  CONSTRAINT `permission_user_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_user`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `permission_user` WRITE;
/*!40000 ALTER TABLE `permission_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission_user` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES
(1,'users-create','Create Users','Create Users','2025-05-24 07:02:17','2025-05-24 07:02:17'),
(2,'users-read','Read Users','Read Users','2025-05-24 07:02:17','2025-05-24 07:02:17'),
(3,'users-update','Update Users','Update Users','2025-05-24 07:02:17','2025-05-24 07:02:17'),
(4,'users-delete','Delete Users','Delete Users','2025-05-24 07:02:17','2025-05-24 07:02:17');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `profile_settings`
--

DROP TABLE IF EXISTS `profile_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile_settings` (
  `id` varchar(50) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `tagline` varchar(255) DEFAULT '',
  `bio` text DEFAULT NULL,
  `avatar_url` varchar(500) DEFAULT '',
  `resume_url` varchar(500) DEFAULT '',
  `resume_filename` varchar(255) DEFAULT 'CV_Fahmi_Ibrahim.pdf',
  `email` varchar(255) DEFAULT '',
  `github_url` varchar(500) DEFAULT '',
  `linkedin_url` varchar(500) DEFAULT '',
  `youtube_url` varchar(500) DEFAULT '',
  `instagram_url` varchar(500) DEFAULT '',
  `location` varchar(255) DEFAULT 'Jakarta, Indonesia',
  `available_for_work` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_settings`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `profile_settings` WRITE;
/*!40000 ALTER TABLE `profile_settings` DISABLE KEYS */;
INSERT INTO `profile_settings` VALUES
('profile_main','Fahmi Ibrahim','Software Engineer & IoT Engineer','Software Engineer with experience in developing applications integrated with IoT hardware. Adept in application design, server-side development, and technical problem-solving. Committed to continuous learning and innovation, with a passion for tackling new challenges in the tech industry.','/uploads/1788508503286_Profile1.jpg','/uploads/1788509917083_CV_Fahmi_Ibrahim.pdf','CV_Fahmi_Ibrahim.pdf','fahmidev.ibrahim@gmail.com','https://github.com/fhmiibrhimdev/','https://www.linkedin.com/in/fahmiibrahimdev/','https://www.youtube.com/@midracode','https://instagram.com/fahmiibrahimdev_','Jakarta, Indonesia',1,'2026-09-04 07:06:33','2026-09-08 04:35:58');
/*!40000 ALTER TABLE `profile_settings` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `project_boms`
--

DROP TABLE IF EXISTS `project_boms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_boms` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_project` bigint(20) unsigned NOT NULL,
  `nama_barang` varchar(255) NOT NULL,
  `qty` int(11) NOT NULL,
  `harga` int(11) NOT NULL,
  `sub_total` int(11) NOT NULL,
  `min_pembelian` int(11) NOT NULL DEFAULT 1,
  `grand_total` int(11) NOT NULL,
  `link_pembelian` text DEFAULT NULL,
  `nama_toko` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_boms_id_project_foreign` (`id_project`),
  CONSTRAINT `project_boms_id_project_foreign` FOREIGN KEY (`id_project`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_boms`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `project_boms` WRITE;
/*!40000 ALTER TABLE `project_boms` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_boms` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `project_categories`
--

DROP TABLE IF EXISTS `project_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_name` text NOT NULL DEFAULT '-',
  `category_desc` text NOT NULL DEFAULT '-',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_categories`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `project_categories` WRITE;
/*!40000 ALTER TABLE `project_categories` DISABLE KEYS */;
INSERT INTO `project_categories` VALUES
(1,'Personal Project','Project yang saya kerjakan untuk eksplorasi pribadi.'),
(2,'Paid Project','Project berbayar untuk joki, klien, atau perusahaan.'),
(3,'Freelance Project','Project luar dari pekerjaan tetap.'),
(4,'Open Source','Project yang mana saya berkontribusi ke repositori publik.'),
(5,'Competition Project','Project dari hasil lomba atau challenge.'),
(6,'Campus Project','Project dari tugas kuliah, skripsi, atau penelitian.'),
(7,'Internship Project','Project yang saya lakukan selama magang.'),
(8,'Startup Project','Project dari usaha rintisan atau MVP (Minimum Viable Product).'),
(9,'Collab Project','Project dari hasil kerja tim atau komunitas.'),
(14,'Learning Project','Project hasil belajar dari youtube.');
/*!40000 ALTER TABLE `project_categories` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `project_details`
--

DROP TABLE IF EXISTS `project_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_details` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` text NOT NULL,
  `left_text` text NOT NULL DEFAULT '-',
  `right_text` text NOT NULL DEFAULT '-',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_details`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `project_details` WRITE;
/*!40000 ALTER TABLE `project_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_details` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `project_files`
--

DROP TABLE IF EXISTS `project_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_files` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_project` bigint(20) unsigned NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `file_type` varchar(50) NOT NULL,
  `size` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_files_id_project_foreign` (`id_project`),
  CONSTRAINT `project_files_id_project_foreign` FOREIGN KEY (`id_project`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_files`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `project_files` WRITE;
/*!40000 ALTER TABLE `project_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_files` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `project_images`
--

DROP TABLE IF EXISTS `project_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_images` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` text NOT NULL,
  `image` text NOT NULL DEFAULT '-',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_images`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `project_images` WRITE;
/*!40000 ALTER TABLE `project_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_images` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `project_tags`
--

DROP TABLE IF EXISTS `project_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_tags` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tag_name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_tags`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `project_tags` WRITE;
/*!40000 ALTER TABLE `project_tags` DISABLE KEYS */;
INSERT INTO `project_tags` VALUES
(1,'PHP'),
(2,'Laravel'),
(3,'MySQL'),
(4,'MariaDB'),
(5,'Bootstrap'),
(6,'Tailwind'),
(7,'MQTT'),
(8,'HTML'),
(9,'CSS'),
(10,'Javascript'),
(11,'Golang'),
(12,'ReactJS'),
(13,'Vite'),
(14,'EasyEDA'),
(15,'ESP8266'),
(16,'ESP32'),
(19,'Internet Of Things');
/*!40000 ALTER TABLE `project_tags` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` text NOT NULL,
  `category_id` text NOT NULL,
  `tag_id` text NOT NULL,
  `thumbnail` text DEFAULT NULL,
  `date` text NOT NULL DEFAULT '-',
  `title` text NOT NULL DEFAULT '-',
  `slug` text NOT NULL DEFAULT '-',
  `price` text NOT NULL DEFAULT '-',
  `short_desc` text NOT NULL DEFAULT '-',
  `description` text NOT NULL DEFAULT '-',
  `status_publish` enum('Published','Privated','Draft') NOT NULL,
  `version` text NOT NULL DEFAULT '1.0.0',
  `link_demo` text NOT NULL DEFAULT '-',
  `link_github` text NOT NULL DEFAULT '#',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES
(1,'1','1','sk-react,sk-ts,sk-tailwind,sk-e2c722db','thumbnail_maker_studio.webp','September 2026','Thumbnail Maker Studio — Multi-Image Showcase Generator','thumbnail-maker-studio','Free','Aplikasi web studio untuk merancang thumbnail mockup profesional, bento showcase, dan komposisi multi-gambar dengan presisi tinggi dan estetika modern.','Thumbnail Maker Studio adalah aplikasi web studio grafis modern yang dirancang khusus untuk mempermudah kreator konten, desainer, dan software engineer dalam menghasilkan thumbnail showcase produk, portfolio cover, presentasi proyek, dan banner media sosial berkualitas tinggi dengan format visual bento dan multi-frame yang elegan.\n\n### 1. MULTI-IMAGE INGESTION & RESPONSIVE CANVAS LAYOUT ENGINE\n- **Komposisi Multi-Gambar Dinamis**: Memungkinkan pengguna mengunggah beberapa tangkapan layar (screenshots) sekaligus dan menyusunnya dalam tata letak kanvas otomatis (Single Hero, Dual Split, Trio Bento Grid, Quad Showcase, hingga Multi-Device Showcase).\n- **Penyesuaian Posisi & Skala Bebas**: Kontrol intuitif untuk rotasi derajat kemiringan (tilt 3D), skala zoom, offset posisi X/Y, dan efek layering antar gambar tangkapan layar.\n- **Auto-Snap & Smart Alignment**: Garis bantu penyelarasan otomatis untuk memastikan elemen visual berada tepat di titik tengah simetris kanvas.\n\n### 2. PRESET RASIO ASPEK & ENGINE EKSPOR ULTRA-HD\n- **Multi-Platform Aspect Ratios**: Pilihan rasio kanvas standar industri yang siap pakai dalam sekali klik:\n  - **16:9** (1920x1080 / 3840x2160) — YouTube Thumbnail, Web Showcase Banner, LinkedIn Post\n  - **1:1** (1080x1080) — Instagram Feed, Square Portfolio Card\n  - **4:3 & 3:2** (1440x1080 / 1620x1080) — Dribbble Shot, Behance Gallery\n  - **9:16** (1080x1920) — TikTok, Instagram Reels & Story Cover\n  - **21:9** — Ultra-Wide Header & Presentation Banner\n- **Lossless Ultra-HD Image Export**: Engine rendering kanvas berkecepatan tinggi yang menghasilkan ekspor format WebP, PNG transparan, dan JPEG resolusi ultra-tajam tanpa kompresi artefak.\n\n### 3. RICH TYPOGRAPHY & HEADLINE STYLER\n- **Tipografi Hirarkis Modern**: Kustomisasi judul utama (headline), sub-judul (subtitle), dan badge tag dengan font pilihan Google Fonts (Plus Jakarta Sans, Inter, Poppins, JetBrains Mono).\n- **Gradient Text & Shadow Glow**: Pilihan efek gradasi teks dinamis, bayangan drop shadow multi-layer, dan efek glow subtil untuk meningkatkan keterbacaan di atas latar belakang kompleks.\n- **Dynamic Tag & Tech Badges**: Generator pill badge otomatis untuk menampilkan label teknologi (React, Flutter, Python, IoT, dll) dengan aksen warna yang selaras.\n\n### 4. DEVICE FRAME MOCKUP GENERATOR\n- **Browser Window Chrome**: Membungkus tangkapan layar dengan frame browser macOS modern (tombol kontrol merah-kuning-hijau, tab bar realistis, URL search bar).\n- **Laptop & Desktop Frame**: Mockup layar MacBook Pro dan iMac dengan bezel tipis dan bayangan ambient realistis.\n- **Mobile Smartphone Frame**: Bezel smartphone modern dengan dynamic island / punch-hole camera untuk showcase aplikasi mobile.\n\n### 5. BACKGROUND TEXTURE STUDIO & GLASSMORPHISM\n- **Matte Dark & Light Atmosphere**: Tema latar belakang gelap Slate (#020617) matte yang elegan dan bebas distorsi visual neon berlebih.\n- **Subtle Background Textures**: Generator tekstur latar belakang dinamis mencakup Dot Grid, Line Grid, Isometric Matrix, dan Radial Gradient Mesh.\n- **Glassmorphic Card Panels**: Panel kontainer bergaya frosted glass dengan efek backdrop blur, border semi-transparan, dan highlight sudut.\n\n### 6. LOCAL WORKSPACE STATE PERSISTENCE\n- **Penyimpanan Draft Otomatis**: Integrasi LocalStorage yang menyimpan seluruh konfigurasi kanvas, teks, gambar, dan warna secara instan tanpa khawatir kehilangan pekerjaan saat tab tertutup.\n- **Ekspor & Impor Konfigurasi Template JSON**: Kemampuan menyimpan dan membagikan struktur template desain dalam format berkas JSON untuk digunakan kembali di proyek berikutnya.\n\n### 7. ARSITEKTUR & TEKNOLOGI YANG DIGUNAKAN\n- **Frontend Framework**: React 18, TypeScript, Vite\n- **Styling & Design System**: Tailwind CSS v4, Lucide React Icons\n- **Canvas Rendering Engine**: HTML5 Canvas 2D Context API, WebGL Shader Filters\n- **Image Processing & Export**: Canvas-to-Blob Converter, FileSaver.js, Browser Image Compression','Published','1.0.0','-','https://github.com/fahmiibrahimdevs/thumbnail-maker','2026-09-09 04:40:08','2026-09-10 06:25:48'),
(2,'1','1','sk-react,sk-ts,sk-tailwind,sk-e2c722db,sk-de01e262,sk-mariadb','thumbnail_project_management.webp','September 2026','ProTrack — Multi-Project Management & Issue Tracking','protrack-project-management','Free','Platform manajemen proyek kolaboratif berbasis kanban board, pelacakan siklus hidup bug, dan telemetri kemajuan sprint tim rekayasa perangkat lunak.','ProTrack adalah platform manajemen proyek dan pelacakan isu (issue & bug tracking) terintegrasi yang dirancang untuk membantu tim pengembang perangkat lunak dalam merencanakan sprint, mengorganisasi backlog fitur, memantau alur kerja kanban, dan melacak telemetri produktivitas secara real-time.\n\n### 1. MULTI-WORKSPACE & KANBAN BOARD WORKFLOW\n- **Interactive Drag-and-Drop Board**: Papan kanban responsif dengan kapabilitas drag-and-drop mulus untuk memindahkan kartu tugas antar kolom status (Backlog, To Do, In Progress, Code Review, Testing, Done).\n- **Customizable Swimlanes & Columns**: Fleksibilitas untuk menambah, mengubah nama, dan mengurutkan tahapan kerja sesuai metodologi Scrum atau Kanban tim.\n- **Multi-Workspace Isolation**: Pengelolaan beberapa proyek atau tim secara terpisah dalam satu akun dengan ruang kerja (workspaces) yang terisolasi.\n\n### 2. ISSUE TRACKING & SIKLUS HIDUP BUG\n- **Klasifikasi Prioritas & Severity**: Pengkategorian tingkat keparahan isu menggunakan tag berwarna (Critical, High, Medium, Low) dan jenis tiket (Feature, Bug, Improvement, Refactor, Task).\n- **Smart Assignee Routing & Due Dates**: Penugasan tugas ke anggota tim tertentu dilengkapi batas tenggat waktu (*deadline*), estimasi waktu (*story points*), dan pengingat keterlambatan otomatis.\n- **Sub-tasks & Checklist Progression**: Pembagian tugas utama menjadi daftar subtugas dengan indikator persentase penyelesaian otomatis.\n\n### 3. RICH MARKDOWN & ATTACHMENT REPOSITORY\n- **WYSIWYG Markdown Editor**: Penulisan deskripsi tiket dengan format teks kaya, daftar terstruktur, blok kode dengan pewarnaan sintaksis, dan tabel komparasi.\n- **Pratinjau Gambar & Lampiran Berkas**: Unggah tangkapan layar bug dan dokumen pendukung langsung ke dalam tiket dengan fitur pratinjau instan.\n\n### 4. REAL-TIME ACTIVITY LOG & AUDIT TRAIL\n- **Kronologi Riwayat Perubahan**: Pencatatan riwayat setiap aksi secara detail (perubahan status, pergantian assignee, penambahan komentar, pengunggahan berkas) beserta stempel waktu.\n- **Thread Komentar Kolaboratif**: Ruang diskusi terintegrasi pada setiap kartu tugas dengan notifikasi real-time bagi anggota yang terlibat.\n\n### 5. MILESTONE ROADMAPPING & SPRINT TELEMETRY\n- **Visual Sprint Roadmaps**: Linimasa visual untuk memetakan rilis milestone fitur dari awal hingga tanggal target peluncuran.\n- **Burndown Chart & Metrik Produktivitas**: Grafik kalkulasi penurunan beban kerja sprint, kecepatan tim (*team velocity*), dan rasio penyelesaian tugas tepat waktu.\n\n### 6. ROLE-BASED ACCESS CONTROL (RBAC)\n- **Hierarki Hak Akses Pengguna**: Manajemen izin akses berlapis mencakup Super Admin, Project Manager/Maintainer, Developer/Contributor, dan Guest/Client Viewer.\n- **Proteksi Data Sensitif**: Pembatasan visibilitas anggaran proyek, konfigurasi rahasia, dan log audit hanya untuk pemilik ruang kerja.\n\n### 7. ARSITEKTUR & TEKNOLOGI YANG DIGUNAKAN\n- **Frontend Architecture**: React 18, TypeScript, Tailwind CSS, TanStack Virtual / DnD Kit\n- **Backend Services**: Node.js REST API Server, Express.js / Hono\n- **Database Engine**: PostgreSQL / MariaDB dengan Relational Constraints & Indexing\n- **Authentication & Security**: JWT Authentication, HttpOnly Cookies, CORS Security Policies','Published','1.0.0','https://pm.fahmiibrahim.my.id','https://github.com/fahmiibrahimdevs/project-management','2026-09-09 04:40:08','2026-09-10 06:25:48'),
(3,'1','1','sk-py,sk-5a1ff571,sk-tailwind,sk-123490c4','thumbnail_telebothub.webp','September 2026','TeleBotHub — Modular Telegram Bot Management Portal','telebot-hub-portal','Free','Portal manajemen terpusat untuk orkestrasi multi-bot Telegram, automasi broadcast terjadwal, analitik interaksi pengguna, dan sistem plugin modular.','TeleBotHub adalah platform portal manajemen dan orkestrasi terpadu untuk bot Telegram skala multi-instance. Platform ini memudahkan developer dan operator bisnis dalam mengelola token bot, membangun alur perintah otomatis, menyiarkan pesan massal (*broadcast*), dan menganalisis metrik percakapan secara terpusat tanpa harus menyentuh kode server secara manual.\n\n### 1. MULTI-BOT ORCHESTRATION & WEBHOOK ROUTING\n- **Manajemen Multi-Token Terpusat**: Registrasi dan konfigurasi beberapa akun bot Telegram dalam satu dashboard terintegrasi dengan validasi status aktif otomatis.\n- **Dynamic Webhook & Polling Switcher**: Kemampuan beralih antara metode Webhook dengan endpoint SSL terenkripsi atau Long Polling untuk lingkungan pengembangan lokal.\n- **Live Connection Health Monitor**: Pemantauan status latensi respon bot ke server Telegram API secara berkala dengan notifikasi peringatan jika terjadi gangguan koneksi.\n\n### 2. MODULAR COMMAND PLUGIN SYSTEM\n- **Visual Command Builder**: Pembuatan perintah kustom (seperti /start, /help, /info, /menu) dengan konfigurasi respon teks dinamis, tombol interaktif (*inline keyboard*), dan tombol navigasi (*reply keyboard*).\n- **Dynamic Variable Injection**: Kemampuan menyisipkan variabel dinamis ke dalam pesan respon bot (misalnya: username, id pelanggan, tanggal waktu, token acak).\n- **Custom Callback Query Handlers**: Logika penanganan event klik tombol inline keyboard bertingkat untuk pengalaman interaksi menyerupai menu aplikasi mini di dalam Telegram.\n\n### 3. AUTOMATED BROADCAST & AUDIENCE SEGMENTATION\n- **Penyiaran Pesan Massal Terjadwal**: Pengiriman pesan pengumuman atau konten promosi ke ribuan pelanggan bot secara serentak atau terjadwal pada waktu tertentu.\n- **Segmentasi Target Pengguna**: Pemfilteran penerima siaran berdasarkan status keaktifan, bahasa pengguna, tag kategori, atau tanggal pertama kali memulai bot.\n- **Anti-Rate Limit Throttling**: Algoritma antrean pesan cerdas (*message queue batching*) yang mematuhi batas kecepatan Telegram API (maksimal 30 pesan per detik) untuk mencegah pemblokiran bot (*429 Too Many Requests*).\n\n### 4. TELEMETRI ANALITIK & TRAFFIC INSIGHTS\n- **Grafik Interaksi Real-Time**: Visualisasi grafik tren pertumbuhan pengguna baru harian, jumlah interaksi per jam, dan perintah bot yang paling sering dieksekusi.\n- **User Database & History Explorer**: Direktori daftar pengguna yang pernah berinteraksi dengan bot dilengkapi detail nama, ID Telegram, username, dan riwayat obrolan terakhir.\n\n### 5. MEDIA DISPATCH & FILE STREAMING PIPELINE\n- **Dukungan Format Media Lengkap**: Kemampuan mengirim dan merespon dengan berbagai format berkas (Gambar HD, Dokumen PDF/ZIP, Audio MP3, Video MP4, Voice Note, dan Sticker).\n- **Optimasi Caption & Formatting**: Dukungan format teks HTML dan MarkdownV2 Telegram lengkap dengan tautan tersemat dan blok kutipan.\n\n### 6. KEAMANAN & ISOLASI LINGKUNGAN\n- **Penyimpanan Token Terenkripsi**: Enkripsi simetris AES-256 untuk seluruh token bot Telegram yang tersimpan di dalam basis data.\n- **Isolasi Sesi & Sandboxing**: Pemisahan alur kerja dan context state antar bot yang berbeda untuk mencegah kebocoran data (*cross-bot data leak*).\n\n### 7. ARSITEKTUR & TEKNOLOGI YANG DIGUNAKAN\n- **Backend & Event Runtime**: Node.js / TypeScript, Hono.js / Fastify, Telegram Bot API Engine\n- **Frontend Dashboard**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Chart.js\n- **Queue & Storage**: Redis Message Queue (BullMQ), MariaDB Relational Database, Encrypted Credential Vault','Published','1.0.0','https://telebot.fahmiibrahim.my.id','https://github.com/fahmiibrahimdevs/tele-bot-hub','2026-09-09 04:40:08','2026-09-10 06:25:48'),
(4,'1','1','sk-react,sk-ts,sk-tailwind,13','thumbnail_thermal_receipt_studio.webp','September 2026','Thermal Receipt 58mm Studio — POS Receipt Generator','thermal-receipt-58mm-studio','Free','Studio perancangan dan generator struk thermal POS 58mm/80mm berbasis web dengan engine binarisasi monokrom, barcode/QRIS generator, dan pencetakan langsung ESC/POS.','Thermal Receipt 58mm Studio adalah aplikasi web utilitas Point of Sale (POS) yang dirancang khusus untuk membuat, mengkustomisasi, dan mencetak struk transaksi kasir presisi tinggi untuk printer thermal mini standar 58mm (32 karakter/baris) dan 80mm (48 karakter/baris) tanpa bergantung pada driver printer sistem operasi yang rumit.\n\n### 1. LAYOUT BUILDER PRESISI KERTAS THERMAL 58MM & 80MM\n- **Grid Monospace Karakter Akurat**: Editor tata letak yang mensimulasikan lebar fisik kolom kertas thermal secara 1:1 murni (32 karakter per baris untuk 58mm, 48 karakter per baris untuk 80mm).\n- **Elemen Struk Komprehensif**: Modul siap pakai untuk Nama Toko, Alamat & Kontak, Nomor Transaksi, Waktu & Tanggal, Nama Kasir, Daftar Item Belanja, Ringkasan Pembayaran, dan Catatan Kaki (*Footer Note*).\n- **Garis Pembatas & Separator Kustom**: Pilihan gaya garis pemisah struk (garis putus-putus `- - -`, garis ganda `===`, garis titik `...`, atau garis solid).\n\n### 2. DINAMIKA ITEMISASI & KALKULASI FINANSIAL\n- **Kalkulasi Subtotal & Diskon Otomatis**: Perhitungan otomatis total belanja, diskon per item atau diskon faktur global (persentase maupun nominal), dan perhitungan pajak PPN/PB1.\n- **Manajemen Metode Pembayaran**: Format pembayaran tunai (*Cash*) dengan kalkulasi kembalian akurat, serta pencatatan non-tunai (Transfer Bank, Debit Card, E-Wallet, QRIS).\n\n### 3. ENGINE DITHERING MONOKROM & PENGOLAHAN LOGO\n- **Floyd-Steinberg Error Diffusion Dithering**: Algoritma konversi gambar logo berwarna atau grayscale menjadi format 1-bit monokrom murni (hitam-putih) yang sangat tajam dan tidak kabur saat dicetak pada kertas thermal.\n- **Penyesuaian Ambang Batas (Threshold Slider)**: Kontrol kontras interaktif untuk mendapatkan hasil cetak logo toko terbaik sesuai karakteristik kepala printer thermal.\n\n### 4. GENERATOR BARCODE & QR CODE VECTOR\n- **Generator Barcode Standar**: Pembuatan barcode 1D (CODE128, EAN-13, CODE39) untuk nomor struk atau pelacakan nomor resi pengiriman.\n- **Generator QRIS & Dinamis QR Code**: Pembuatan QR Code presisi tinggi yang dapat dipindai oleh semua aplikasi perbankan dan e-wallet untuk pembayaran digital langsung dari struk.\n\n### 5. PENCETAKAN LANGSUNG VIA WEB BLUETOOTH & WEB SERIAL\n- **Direct ESC/POS Command Dispatch**: Pengiriman *raw byte array* perintah ESC/POS (seperti inisialisasi printer, cetak teks tebal, perataan tengah/kiri/kanan, potong kertas otomatis / *auto cut*, dan sinyal pembuka laci kasir / *cash drawer pulse*).\n- **Koneksi Nirkabel Tanpa Driver**: Pencetakan langsung dari browser web di perangkat Android, iOS, Windows, atau macOS melalui protokol Web Bluetooth API dan Web Serial API.\n\n### 6. ARSIP TRANSAKSI & DUAL EXPORT PREVIEW\n- **Ekspor Dokumen Siap Cetak**: Kemampuan mengekspor struk menjadi berkas gambar PNG resolusi tinggi dan dokumen PDF siap kirim via WhatsApp atau email pelanggan.\n- **Penyimpanan Template Desain**: Simpan berbagai template struk (Struk Kafe/Restoran, Struk Ritel Minimarket, Struk Laundry, Struk Parkir, dan Tiket Antrean) di memori lokal peramban.\n\n### 7. ARSITEKTUR & TEKNOLOGI YANG DIGUNAKAN\n- **Frontend Core**: JavaScript ES6+, HTML5 Canvas 2D Bitmap Renderer, Tailwind CSS\n- **Hardware Integration Protocols**: Web Bluetooth API, Web USB / Serial API, ESC/POS Binary Standard\n- **Encoding & Matrix Libraries**: QRCode.js, JsBarcode Engine, Floyd-Steinberg Monochrome Converter','Draft','1.0.0','-','https://github.com/fahmiibrahimdevs/thermal-receipt-studio','2026-09-09 04:40:08','2026-09-10 06:25:48'),
(5,'1','7','sk-flutter,sk-dart,sk-mqtt,sk-c5b79749','thumbnail_smartworkshop.webp','Juli - Desember 2026','SmartWorkshop — Mobile IoT Ecosystem & Telemetry Client','smartworkshop-mobile-iot-ecosystem','-','Aplikasi mobile lintas platform berbasis Flutter untuk ekosistem IoT SmartWorkshop, menyajikan visualisasi telemetri, kontrol relai SONOFF Tasmota, IR Blaster AC, dan otomasi audio musholla.','SmartWorkshop adalah platform ekosistem Internet of Things (IoT) terpadu berbasis mobile dan mikrokontroler yang dirancang khusus untuk mengotomatisasi, memantau, dan mengontrol seluruh operasional perangkat keras di lingkungan bengkel (*workshop*), kantor operasional, ruang server, hingga fasilitas musholla secara nirkabel dan terpusat.\n\n### 1. ARSITEKTUR KOMUNIKASI IOT BERKECEPATAN TINGGI\n- **Koneksi Protokol MQTT 3.1.1 Real-Time**: Komunikasi data dua arah berlatensi sangat rendah (<50ms) menggunakan broker Eclipse Mosquitto yang di-hosting pada server Ubuntu Linux mandiri.\n- **Pengaturan QoS & Retain Message**: Penerapan Quality of Service (QoS 0 & 1) dengan status *Retained Message* untuk memastikan parameter perangkat terakhir selalu sinkron saat aplikasi mobile baru dibuka.\n- **Last Will and Testament (LWT)**: Fitur deteksi otomatis status *Online/Offline* setiap mikrokontroler secara instan jika perangkat mengalami pemadaman listrik atau kehilangan sinyal WiFi.\n\n### 2. KONTROL RELAI LISTRIK & MANAJEMEN DAYA\n- **Integrasi SONOFF Switch Controller**: Pengendalian relai daya tinggi (lampu penerangan utama, kompresor udara, mesin bor duduk, stopkontak perkakas, dan exhaust fan) berbasis saklar cerdas SONOFF.\n- **Firmware Open-Source Tasmota**: Firmware terstandarisasi yang stabil dan bebas ketergantungan cloud pihak ketiga, memungkinkan kendali lokal murni (*local fallback*) maupun kendali via internet publik.\n- **Sinkronisasi Status Multi-Arah**: Setiap perubahan saklar manual pada fisik perangkat akan secara instan memperbarui status switch di layar aplikasi mobile.\n\n### 3. KONTROL SMART AC & HVAC DENGAN IR BLASTER\n- **Transmitter IR 38kHz Kustom**: Modul WiFi IR Blaster berbasis mikrokontroler NodeMCU/ESP8266 yang memancarkan sinyal inframerah universal untuk mengontrol unit Air Conditioner (AC).\n- **Protokol IRhvac Multi-Merek**: Kompatibilitas luas terhadap berbagai merek AC terkemuka (Panasonic, Daikin, LG, Sharp, Samsung, Gree).\n- **Kontrol Parameter Komprehensif**: Pengaturan mode operasional (Cool, Dry, Auto, Fan), kecepatan hembusan angin (Fan Speed 1-5, Auto), arah ayunan kisi-kisi (Swing On/Off), dan status daya (*Power Toggle*).\n- **Interactive Temperature Dial & Keypad**: Antarmuka digital ergonomis dengan dial suhu dinamis, skema warna adaptif sesuai mode aktif, dan tombol keypad berumpan balik visual.\n\n### 4. OTOMASI AUDIO MUSHOLLA & JADWAL SHOLAT TERPADU\n- **Integrasi DFPlayer Mini MP3 Module**: Pemutar murottal Al-Qur\'an terintegrasi dengan daftar putar per surah (Surah Al-Fatihah, Al-Baqarah, Ali \'Imran, Yasin, Ar-Rahman, Al-Waqi\'ah, Al-Mulk) yang terhubung ke amplifier audio musholla.\n- **Presisi Pengaturan Volume Digital**: Slider volume bertingkat (Level 0 hingga 30) dengan visualisasi persentase akurat untuk modul suara DFPlayer Mini melalui perintah serial UART mikrokontroler.\n- **Kalkulasi Waktu Sholat Real-Time**: Sinkronisasi jadwal waktu sholat harian wilayah operasional bengkel berbasis API Aladhan (Metode Kemenag RI No. 20) lengkap dengan hitung mundur waktu (*countdown timer*) menjelang adzan berikutnya.\n\n### 5. MONITORING CUACA & PENGELOMPOKAN MULTI-RUANGAN\n- **Live Weather Telemetry**: Pemantauan kondisi cuaca real-time wilayah operasional bengkel melalui integrasi Open-Meteo API berbasis WMO Weather Interpretation Codes (Suhu udara, kelembaban relatif, kecepatan angin, dan deskripsi kondisi).\n- **Hierarki Multi-Ruangan**: Pengelompokan perangkat pintar berdasarkan zonasi ruangan kerja (Workshop Lantai 1, Ruang Admin/Office, Server Room, Resepsionis, Musholla, Mess Karyawan, Pantry).\n- **Pengaturan & Pemetaan Ikon Fleksibel**: Kustomisasi nama, ikon FontAwesome, dan topik MQTT perangkat langsung dari aplikasi mobile.\n\n### 6. RESILIENSI JARINGAN & AUTO-RECONNECT ENGINE\n- **Socket Heartbeat & Auto-Reconnect**: Mekanisme reconnect cerdas dengan algoritma exponential backoff jika koneksi jaringan seluler atau WiFi mengalami gangguan sementara.\n- **Offline Caching**: Penyimpanan data konfigurasi terakhir di memori lokal perangkat mobile menggunakan SQLite / SharedPreferences.\n\n### 7. DESAIN ANTARMUKA & PENGALAMAN PENGGUNA ERGONOMIS\n- **Dark Tactical Dashboard Theme**: Antarmuka bernuansa gelap elegan berbasis warna Slate 950 dan aksen Sky/Cyan yang nyaman di mata saat digunakan di lingkungan bengkel minim cahaya.\n- **Haptic & Visual Feedback**: Umpan balik getaran taktil halus (*haptic vibration*) dan animasi transisi halus saat menekan tombol saklar atau memutar dial suhu.\n\n### 8. HARDWARE BILL OF MATERIALS (BOM) & KOMPONEN ELEKTRONIKA\n- **SONOFF Smart Switch Series**: SONOFF Basic R2 / Dual R3 dengan Tasmota Firmware\n- **WiFi Microcontroller**: NodeMCU ESP8266 / ESP32 DevKit v1\n- **Infrared Transmitter**: High-Power 940nm IR LED + NPN Transistor Driver Circuit (38kHz Modulation)\n- **Audio Processing**: DFPlayer Mini MP3 Player IC, MicroSD Card FAT32, PAM8403 Mini Audio Amplifier\n- **Power Supplies**: 220V AC to 5V DC Isolated Step-Down Switching Power Supply Module\n\n### 9. SPESIFIKASI & TEKNOLOGI YANG DIGUNAKAN\n- **Mobile Framework**: Flutter 3.10+ (Dart Language)\n- **Design & Icons**: Tailwind Colors for Flutter (`flutter_tailwind_colors`), FontAwesome Flutter Icons\n- **Komunikasi Protokol**: MQTT 3.1.1 (`mqtt_client`), HTTP REST API (`http` / `dio`), Serial UART\n- **Server Infrastructure**: Eclipse Mosquitto MQTT Broker di Ubuntu VPS Server, Open-Meteo API, Aladhan Prayer Times API','Published','1.0.0','-','https://github.com/fahmiibrahimdevs/smartws-fsi','2026-09-09 04:40:08','2026-09-10 06:25:48'),
(6,'1','1','sk-react,sk-ts,sk-tailwind,sk-de01e262,sk-e2c722db,sk-mariadb','thumbnail_portofolio.webp','September 2026','Fahmi Ibrahim Portfolio & CMS — Fullstack Developer Portal','portfolio-v2-cms','Free','Platform portofolio web modern fullstack dan Content Management System (CMS) terintegrasi dengan arsitektur SPA React 18, Bun runtime, Hono API, MariaDB, dan visualisasi interaktif.','Fahmi Ibrahim Portfolio & CMS adalah platform portofolio web modern fullstack dan Content Management System (CMS) terintegrasi yang dirancang khusus untuk menyajikan rekam jejak rekayasa perangkat lunak, integrasi perangkat keras IoT, publikasi artikel teknis, dan sertifikasi profesional secara terpusat dengan performa tinggi dan standar UI/UX modern.\n\n### 1. SISTEM MANAJEMEN KONTEN ADMINISTRATIF (CMS DASHBOARD)\n- **Manajemen Modul Komprehensif**: Panel pengelolaan data mencakup Biodata Profil, Linimasa Pengalaman Kerja (*Work Experience*), Riwayat & Pencapaian Riset Kampus (*University Achievements*), Kategori & Tech Stack, Sertifikat & Kredensial, Portofolio Proyek, dan Artikel Teknis.\n- **Rich Text Markdown & Syntax Highlighting**: Editor konten terintegrasi dengan pratinjau langsung, dukungan format Markdown kaya, tabel komparasi, diagram alur, dan pewarnaan kode pemrograman via `highlight.js`.\n- **Live Companion Preview Panel**: Panel pratinjau kartu proyek dan artikel interaktif berdampingan secara *real-time* dengan estimasi waktu baca (*read time calculator*) dan skala 1:1 saat pengisian form di dashboard admin.\n- **Filtering & Search Multi-Parameter**: Pencarian instan dan penyaringan data berdasarkan status publikasi (Published / Draft), kategori, tag teknologi, dan kata kunci judul.\n\n### 2. SISTEM KEAMANAN & OTENTIKASI MULTILAPIS\n- **Otentikasi JWT & Argon2id Password Hashing**: Akses dashboard terproteksi token JSON Web Token dengan algoritma hashing password modern `Bun.password` (Argon2id) yang sangat tahan terhadap serangan brute-force.\n- **Sliding-Window IP Rate Limiter**: Proteksi cerdas terhadap serangan spam pada formulir kontak (maksimal 5 kiriman / 15 menit) dan pencegahan credential stuffing pada form login admin (maksimal 10 percobaan / 15 menit).\n- **Parameterized SQL & Strict Input Sanitation**: Pencegahan celah SQL Injection di seluruh query database MariaDB menggunakan parameterized prepared statements dan validasi tipe data runtime.\n\n### 3. PROGRESSIVE CLIENT-SIDE IMAGE COMPRESSION ENGINE\n- **Kompresi WebP Lanczos Otomatis**: Kompresi otomatis gambar resolusi tinggi (PNG/JPEG hingga 8K) menjadi format WebP 1080p sebelum berkas dikirimkan ke server backend, menghemat ukuran berkas hingga 98% (dari ~11MB menjadi ~150KB) tanpa mengorbankan ketajaman visual.\n- **Visual Stepper & Statistik Kompresi Real-Time**: Animasi indikator progres kompresi multi-tahap (Baca File ➔ Kompresi WebP ➔ Simpan) dan metrik penghematan kapasitas (persentase kompresi dan ukuran asli vs hasil).\n\n### 4. DESAIN ANTARMUKA & SISTEM TEMA DUA ARAH (UI/UX)\n- **Matte Dark Slate Atmosphere**: Mengadopsi prinsip desain *zero neon* berbasis Dark Slate 950 (#020617), aksen Sky/Cyan (#38bdf8), dan kontras teks yang nyaman di mata untuk sesi baca jangka panjang.\n- **Seamless Dual-Theme Switcher**: Transisi instan antara tema gelap dan tema terang tanpa kedipan (*flicker-free*) dengan persistensi preferensi di LocalStorage.\n- **Elevasi Z-Index & Badges Hierarki**: Penataan visual badge kategori, status publikasi (Published / Draft), dan versi proyek yang tetap konsisten di atas thumbnail gambar.\n\n### 5. INTERACTIVE CERTIFICATE VIEWER & MEDIA MODAL\n- **Pembaca Dokumen PDF Interaktif**: Komponen modal pembaca berkas dokumen PDF sertifikat terintegrasi langsung di dalam browser tanpa mengharuskan pengguna mengunduh berkas.\n- **Lightbox Preview & Zoom**: Penampil pratinjau gambar beresolusi tinggi dengan indikator verifikasi kredensial penerbit (*Credential ID & Issuer URL*).\n\n### 6. AUTOMATED REMOTE DEPLOYMENT & TWO-WAY DB SYNC\n- **Pipeline Deployment Otomatis**: Sinkronisasi kode dari repositori Git, kompilasi build Vite SPA di server produksi Ubuntu VPS, dan reload daemon systemd `portofolio-v2.service`.\n- **Two-Way Database Sync Engine**: Fitur sinkronisasi data dua arah antara lingkungan lokal WSL2 dan server VPS produksi dengan proteksi secret sync token.\n\n### 7. ARSITEKTUR & TEKNOLOGI YANG DIGUNAKAN\n- **Frontend SPA**: React 18, TypeScript, Vite, Tailwind CSS v4, Lucide React, TanStack Query\n- **Backend API Server**: Bun Runtime v1.2+, Hono.js v4 REST API Framework\n- **Database Engine**: MariaDB 11+ / MySQL 8.0 (Connection Pooling & Parameterized SQL)\n- **Security & Storage**: JWT Authentication, Argon2id, IP Sliding-Window Rate Limiter, Local Static Asset Storage','Published','2.0.0','https://fahmiibrahim.my.id','https://github.com/fahmiibrahimdevs/portofolio-v2','2026-09-10 04:29:07','2026-09-10 06:25:48'),
(7,'1','1','sk-py,sk-easyeda,sk-tailwind,sk-123490c4,sk-js','thumbnail_pcb_tiler.webp','September 2026','PCB Layout Tiler & Auto-Panelizer — 1:1 Precision Print Studio','pcb-layout-tiler-auto-panelizer','Free','Aplikasi web otomatisasi penataan (panelizer) multiple layout PCB ke lembar kertas A4 dengan skala 1:1 murni, auto-mirroring bottom copper, dan dual ekspor PDF 600 DPI & Word DOCX.','PCB Layout Tiler & Auto-Panelizer adalah aplikasi web utilitas rekayasa elektronika yang dirancang untuk mengotomatisasi proses penataan (*tiling / panelizing*), deteksi dimensi fisik, pencerminan jalur tembaga, dan perbanyakan layout PCB ke dalam selembar kertas standar A4 dengan skala 1:1 presisi tinggi untuk kebutuhan fabrikasi mandiri (*toner transfer / PCB etching*).\n\n### 1. PARSING VEKTOR PDF & DETEKSI DIMENSI OTOMATIS\n- **Multi-PDF & Multi-Layer Batch Upload**: Mengunggah beberapa berkas PDF sekaligus yang diekspor dari software EDA (EasyEDA, KiCad, Altium Designer, Autodesk Eagle) mencakup Top Layer dan Bottom Layer.\n- **Bounding Box Dimension Extraction**: Deteksi otomatis batas fisik jalur tembaga (Lebar x Tinggi dalam milimeter) dari metadata vektor PDF menggunakan engine PyMuPDF (`fitz`).\n- **Override Dimensi Manual**: Fleksibilitas untuk menyesuaikan ukuran target (Lebar & Tinggi mm) secara manual jika desain PCB memiliki margin batas khusus atau garis tepi (*outline border*).\n\n### 2. PENATAAN TATA LETAK & OPTIMASI LEMBAR A4\n- **Smart Horizontal Mirroring (Bottom Layer)**: Fitur pencerminan horizontal otomatis khusus untuk jalur tembaga sisi bawah (*bottom copper layer*) agar orientasi pin IC dan komponen tidak terbalik saat proses transfer panas ke papan PCB.\n- **Auto-Fill Maximum Copies Engine**: Algoritma kalkulasi grid otomatis yang menghitung kapasitas maksimal PCB yang dapat dimuat dalam 1 lembar A4 tanpa risiko saling tumpang tindih dengan margin tepi kertas.\n- **Garis Panduan Pemotongan (Cut Lines)**: Pembuatan garis batas potong (*cutting guide lines*) di sekeliling setiap unit PCB untuk mempermudah pemotongan papan tembaga pasca proses cetak.\n- **Pengaturan Spasi & Celah Fleksibel**: Kontrol jarak horizontal antar PCB (*gap spaces / tab gap mm*) dan jarak vertikal antar baris (*row gap mm*).\n\n### 3. DUAL EXPORT PRODUCTION (PDF 1:1 & WORD DOCX)\n- **PDF 1:1 Vector Print-Ready (600 DPI)**: Menghasilkan berkas PDF siap cetak dengan binarisasi tajam resolusi tinggi tanpa distorsi ukuran skala milimeter.\n- **Dokumen Microsoft Word (.docx)**: Ekspor ke format Word standar A4 dengan pengaturan *Narrow Margin* (12.7 mm) dan spasi presisi antar gambar untuk kemudahan pencetakan di berbagai lingkungan PC/Printer.\n\n### 4. INTERACTIVE LIVE CANVAS PREVIEW\n- **Render A4 Real-Time**: Kanvas interaktif yang memvisualisasikan penempatan PCB secara instan setiap kali parameter ukuran, jumlah salinan, atau mode cermin diubah.\n- **Slot Visibility Selector**: Kemampuan memilih dan mematikan slot PCB tertentu pada grid untuk mode pengujian (*test mode*) atau penghematan kertas.\n\n### 5. HETEROGENEOUS MULTI-BOARD TILING\n- **Penataan Beragam Ukuran PCB dalam 1 Lembar**: Fitur penggabungan beberapa desain sirkuit berbeda ukuran ke dalam satu lembar kertas cetak A4 yang sama untuk memaksimalkan efisiensi kertas glossy / transfer paper.\n\n### 6. WORKFLOW & INTEGRASI FABRIKASI MANDIRI\n- **Dukungan Metode Toner Transfer & UV Photoresist**: Format binarisasi hitam-pekat (*pure black 100% K*) yang optimal untuk printer laser toner pada kertas transfer paper, kalkir, maupun film transparansi OHP.\n\n### 7. ARSITEKTUR & TEKNOLOGI YANG DIGUNAKAN\n- **Backend & Vector Processing**: Python 3.10+, Flask 3.0 REST API, PyMuPDF 1.28 (`fitz`), Pillow (PIL), `python-docx`\n- **Frontend & UI Canvas**: HTML5 Canvas 2D, Tailwind CSS, Vanilla JavaScript ES6+, Lucide Icons\n- **Layout Math Engine**: Vector Bounding Box Detector, DPI Grid Scaler (600 DPI Binarization), Auto-Placement Matrix Calculator','Published','1.0.0','-','https://github.com/fahmiibrahimdevs/pcb-tiler','2026-09-10 04:29:07','2026-09-10 06:25:48');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_user` (
  `role_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `user_type` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`,`user_type`),
  KEY `role_user_role_id_foreign` (`role_id`),
  CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES
(1,1,'App\\Models\\User');
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES
(1,'admin','Admin','Admin','2025-05-24 07:02:17','2025-05-24 07:02:17'),
(2,'user','User','User','2025-05-24 07:02:17','2025-05-24 07:02:17');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES
('0BEzrm0D9nyWPGvg8rjnzgBVmenswuijIRxBlfgo',NULL,'45.148.10.18','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUWRiaHVtbndXTW5zYm5DblNRWTVjblFqWUg0NWJYdUxUWEthQXkweCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vZmFobWlpYnJhaGltLm15LmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788525038),
('6twzRJYiUcTOLC20FMKR4TtZrDsCPqP5v1oqbX2V',NULL,'66.249.65.194','Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.7922.173 Mobile Safari/537.36 (compatible; GoogleOther)','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUE1mOWM5UjRack1ISDhFejFKdEtoeUJpUUpmTmt2MW5ZdFlMcUhUdiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Njk6Imh0dHBzOi8vZmFobWlpYnJhaGltLm15LmlkL3Byb2plY3QvaW90LW1vbml0b3Jpbmctc3VodS1kYW4ta2VsZW1iYWJhbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788526186),
('BWtMYhKvob72cqKFiAzfMHRrLNaWBUbM9zYKNp88',NULL,'198.235.24.179','Hello from Palo Alto Networks, find out more about our scans in https://docs-cortex.paloaltonetworks.com/r/1/Cortex-Xpanse/Scanning-activity','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZzlRd1FOZE9xZExvWlhMd2p1dWJadU5SYUk1eGRuYXE1U1dLTmsyTCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vZmFobWlpYnJhaGltLm15LmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788523024),
('CSutPGTi5xtD4NiG4tnNY7bmSLCPlCqJxJVXMboF',NULL,'45.148.10.18','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZWxjbFNQWnljRGlST0pEVllPOGJrM0RXNXlBQ09WVVZTbWtrWVc2YSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTA3OiJodHRwczovL2ZhaG1paWJyYWhpbS5teS5pZC8/cGFnZT1ncmF2aXR5c210cC1jb25uZWN0aW9ucyZyZXN0X3JvdXRlPSUyRmdyYXZpdHlzbXRwJTJGdjElMkZ0ZXN0cyUyRm1vY2stZGF0YSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788525044),
('hCIIOy8pdxxM1MC06N5yUBzrWNoET9ExayC0zOCy',NULL,'74.7.242.57','Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.4; +https://openai.com/gptbot)','YTozOntzOjY6Il90b2tlbiI7czo0MDoiNmU1WHNnYTB3TEtROWZZV1BtdWtnS2kydWdzcjBiWDFJekhqQjNjZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vZmFobWlpYnJhaGltLm15LmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788517870),
('k6VoeqcYySPC3vpSw0CEI6ae79sxLw3xm4JcEbvb',NULL,'45.148.10.18','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWG5YMnFkV1ZJNmdSS1VYMnkycGZNTTRkRjZ3dVNOTDdkRUZNZjZ2VSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vZmFobWlpYnJhaGltLm15LmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788525248),
('qhb6BmlP5olnvPfIUEJpwOp49DaGj2R2zQIEcnYH',NULL,'182.253.251.86','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWjJpRk05V0l2Yml3NmN5aTNpWTh4cW9oRTJiY0xVNUhKVkRmS2JuQyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vZmFobWlpYnJhaGltLm15LmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788525870),
('qUll6uKfjgHI4YnxbgtxLQoN8SjSq2An1yzJP2li',NULL,'45.148.10.18','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVmhueHRvS3RoQ1dvaXk5UXZhcWJTaEtjWXVNZUtQMWczdExYZTdkOSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTA0OiJodHRwczovL2ZhaG1paWJyYWhpbS5teS5pZC8/cGFnZT1ncmF2aXR5c210cC1zZXR0aW5ncyZyZXN0X3JvdXRlPSUyRmdyYXZpdHlzbXRwJTJGdjElMkZ0ZXN0cyUyRm1vY2stZGF0YSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788525043),
('u2uPzcEdO5YMnFFreFuWW7XtPMO4ef1xQX8WqhtU',NULL,'66.249.65.193','Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.7922.173 Mobile Safari/537.36 (compatible; GoogleOther)','YTozOntzOjY6Il90b2tlbiI7czo0MDoieFd5ZmI3dkJrZ1NzdDdNbDBaU0VCbjRya0w3VzM4YmdvbEhTbldkRyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTc6Imh0dHBzOi8vZmFobWlpYnJhaGltLm15LmlkL3Byb2plY3Qvd2ViLWxhcmF2ZWwtcmVhY3Qtdml0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788526201),
('uIrPxEioCQbnWSqOvRdaVKVeoOnH4RvtJVai7Fzj',NULL,'66.249.65.193','Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.7922.173 Mobile Safari/537.36 (compatible; GoogleOther)','YTozOntzOjY6Il90b2tlbiI7czo0MDoibTdubGVZVTFpSkFBb1ZyV0lnN2ZBTjc5UG1IZlVMY3NmajlRZnFIUiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTc6Imh0dHBzOi8vZmFobWlpYnJhaGltLm15LmlkL3Byb2plY3Qvd2ViLWxhcmF2ZWwtcmVhY3Qtdml0ZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788525946),
('w2nPL10vwqv2sLUHOfoczQWe2zPaP6MOGnOMYBD7',NULL,'114.10.75.44','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Mobile Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiaWpFcnRvV2RXaVB1QVBQcWN0YlRpY3NrNG54eWVoYU1LdXliYmxhRSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vZmFobWlpYnJhaGltLm15LmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788522975),
('yW8oIYWuki3mq8iNwwLwg3n9PhrWMTEfETSwCnWA',NULL,'45.148.10.18','Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiNHVJSVZXTm1haTF6OXNiM09vQjlzTDJ1b1BCSGJmOThGSFpyYWVjOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTEzOiJodHRwczovL2ZhaG1paWJyYWhpbS5teS5pZC9pbmRleC5waHA/cGFnZT1ncmF2aXR5c210cC1zZXR0aW5ncyZyZXN0X3JvdXRlPSUyRmdyYXZpdHlzbXRwJTJGdjElMkZ0ZXN0cyUyRm1vY2stZGF0YSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788525048);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `tech_categories`
--

DROP TABLE IF EXISTS `tech_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tech_categories` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `order_index` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tech_categories`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `tech_categories` WRITE;
/*!40000 ALTER TABLE `tech_categories` DISABLE KEYS */;
INSERT INTO `tech_categories` VALUES
('cat-databases','Databases',3,'2026-09-04 07:06:34'),
('cat-frameworks','Frameworks & Libraries',2,'2026-09-04 07:06:34'),
('cat-iot','Microcontrollers & IoT',4,'2026-09-04 07:06:34'),
('cat-languages','Languages',1,'2026-09-04 07:06:34'),
('cat-tools','Tools & Others',5,'2026-09-04 07:06:34');
/*!40000 ALTER TABLE `tech_categories` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `tech_skills`
--

DROP TABLE IF EXISTS `tech_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tech_skills` (
  `id` varchar(50) NOT NULL,
  `category_id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `icon_url` varchar(500) DEFAULT '',
  `order_index` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tech_skills`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `tech_skills` WRITE;
/*!40000 ALTER TABLE `tech_skills` DISABLE KEYS */;
INSERT INTO `tech_skills` VALUES
('sk-075285a6','cat-frameworks','AdonisJS','/uploads/1788572123730_AdonisJS.png',9,'2026-09-05 01:35:26'),
('sk-0ba6438c','cat-tools','PM2','/uploads/1788572441879_PM2.webp',9,'2026-09-05 01:40:45'),
('sk-123490c4','cat-tools','Git','/uploads/1788749250011_GIT.webp',1,'2026-09-07 02:47:33'),
('sk-5a1ff571','cat-databases','SQLite','/uploads/1788572607418_SQLite.webp',4,'2026-09-05 01:43:05'),
('sk-638f6978','cat-tools','Laragon','/uploads/1788510731581_Laragon.webp',0,'2026-09-04 08:32:13'),
('sk-64c33255','cat-frameworks','jQuery','/uploads/1788507747239_jQuery.png',7,'2026-09-04 07:42:28'),
('sk-7196dc2f','cat-iot','NodeRed','/uploads/1788507436589_NodeRed.png',6,'2026-09-04 07:37:18'),
('sk-8d7a49de','cat-frameworks','Livewire','/uploads/1788508318778_Livewire.png',8,'2026-09-04 07:51:59'),
('sk-940359cd','cat-tools','Ubuntu OS','/uploads/1788507919419_Ubuntu.webp',5,'2026-09-04 07:45:20'),
('sk-9f76877d','cat-databases','PostgreSQL','/uploads/1788507380475_PostgreSQL.svg',3,'2026-09-04 07:36:26'),
('sk-a6516c7c','cat-frameworks','Bootstrap','/uploads/1788507526398_Bootstrap.png',7,'2026-09-04 07:38:48'),
('sk-arduino','cat-iot','Arduino','/uploads/1788748759363_ARDUINO.webp',1,'2026-09-04 07:06:35'),
('sk-c566eab1','cat-tools','NGINX','/uploads/1788508022891_NGINX.webp',6,'2026-09-04 07:46:13'),
('sk-c57f2fef','cat-tools','FileZilla','/uploads/1788508270329_FileZilla.jpg',7,'2026-09-04 07:51:12'),
('sk-c5b79749','cat-iot','Tasmota','/uploads/1788524598933_Tasmota.png',9,'2026-09-04 12:23:22'),
('sk-ce059ec5','cat-iot','PlatformIO','/uploads/1788508152565_PlatformIO.png',0,'2026-09-04 07:49:13'),
('sk-cpp','cat-languages','C++ Arduino','/uploads/1788507221998_Cplusplus.png',8,'2026-09-04 07:06:34'),
('sk-css','cat-languages','CSS3','/uploads/1788507117575_CSS3.png',2,'2026-09-04 07:06:34'),
('sk-dart','cat-languages','Dart','/uploads/1788507209791_Dart.png',7,'2026-09-04 07:06:34'),
('sk-dc8725d0','cat-iot','Wokwi','/uploads/1788508116013_Wokwi.png',0,'2026-09-04 07:48:36'),
('sk-de01e262','cat-frameworks','HonoJS','/uploads/1788507321077_HonoJS.png',0,'2026-09-04 07:35:22'),
('sk-e2c722db','cat-tools','BunJS','/uploads/1788507643328_BunJS.png',4,'2026-09-04 07:40:45'),
('sk-easyeda','cat-iot','EasyEDA / PCB','/uploads/1788748809120_EASYEDA.png',5,'2026-09-04 07:06:35'),
('sk-esp32','cat-iot','ESP32','/uploads/1788748669837_ESP32.jpg',3,'2026-09-04 07:06:35'),
('sk-esp8266','cat-iot','ESP8266','/uploads/1788748789503_ESP8266.webp',2,'2026-09-04 07:06:35'),
('sk-flutter','cat-frameworks','Flutter','/uploads/1788507295831_Flutter.png',5,'2026-09-04 07:06:35'),
('sk-git','cat-tools','GitHub','/uploads/1788749181326_GITHUB.png',1,'2026-09-04 07:06:35'),
('sk-hono','cat-tools','Node.js','/uploads/1788507263865_NodeJS.svg',3,'2026-09-04 07:06:34'),
('sk-html','cat-languages','HTML5','/uploads/1788507096572_HTML5.png',1,'2026-09-04 07:06:34'),
('sk-js','cat-languages','JavaScript','/uploads/1788507128896_JavaScript.png',3,'2026-09-04 07:06:34'),
('sk-laravel','cat-frameworks','Laravel','/uploads/1788507284722_Laravel.png',4,'2026-09-04 07:06:34'),
('sk-mariadb','cat-databases','MariaDB','/uploads/1788507357532_MariaDB.png',2,'2026-09-04 07:06:35'),
('sk-mqtt','cat-iot','MQTT','/uploads/1788748714870_MQTT.jpg',4,'2026-09-04 07:06:35'),
('sk-mysql','cat-databases','MySQL','/uploads/1788507341469_MySQL.png',1,'2026-09-04 07:06:35'),
('sk-php','cat-languages','PHP','/uploads/1788507181520_php.svg',5,'2026-09-04 07:06:34'),
('sk-postman','cat-tools','Postman','/uploads/1788749201365_POSTMAN.png',2,'2026-09-04 07:06:35'),
('sk-py','cat-languages','Python','/uploads/1788507196294_Python.png',6,'2026-09-04 07:06:34'),
('sk-react','cat-frameworks','React','/uploads/1788507238305_ReactJS.png',1,'2026-09-04 07:06:34'),
('sk-tailwind','cat-frameworks','Tailwind CSS','/uploads/1788507250584_TailwindCSS.png',2,'2026-09-04 07:06:34'),
('sk-ts','cat-languages','TypeScript','/uploads/1788507160540_TypeScript.png',4,'2026-09-04 07:06:34');
/*!40000 ALTER TABLE `tech_skills` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `university_achievements`
--

DROP TABLE IF EXISTS `university_achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `university_achievements` (
  `id` varchar(50) NOT NULL,
  `institution_name` varchar(255) NOT NULL,
  `institution_logo` varchar(500) DEFAULT '',
  `degree` varchar(255) NOT NULL,
  `period` varchar(100) NOT NULL,
  `order_index` int(11) DEFAULT 0,
  `organizational_involvement` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`organizational_involvement`)),
  `research_experience` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`research_experience`)),
  `key_projects` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`key_projects`)),
  `skills_gained` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`skills_gained`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university_achievements`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `university_achievements` WRITE;
/*!40000 ALTER TABLE `university_achievements` DISABLE KEYS */;
INSERT INTO `university_achievements` VALUES
('univ-b9d2271d','Politeknik Negeri Jakrta','/uploads/1788509106123_PNJ.png','Associate’s Degree – Industrial Electronics Engineering','Aug 2025 - Aug 2026',2,'[{\"name\":\"KSM Psychorobotic\",\"role\":\"Vice Chairman\",\"link\":\"https://www.instagram.com/psychorobotic_pnj/\",\"description\":\"\"},{\"name\":\"KSM Computer Student Club\",\"role\":\"Active Member\",\"link\":\"https://www.instagram.com/cscpnj/\",\"description\":\"\"}]','[{\"title\":\"SIMONLE – IoT-Based Smart Catfish Pond Monitoring & Automation System\",\"supervisor\":\"Purwanti, Ihsan Auditia Akhinov\",\"supervisor_link\":\"\",\"description\":\"Researched and developed an intelligent aquaculture monitoring and automation system (SIMONLE) designed to optimize catfish water quality. Integrated multi-parameter environmental sensors—including pH sensor, TDS (Total Dissolved Solids), water level sensor, and DS18B20 waterproof temperature sensor—with rigorous hardware calibration algorithms. Implemented automated water pump actuators triggered by customizable parameter thresholds, alongside a centralized database system for real-time telemetry logging and historical data analysis.\"}]','[]','[]','2026-09-04 08:05:07','2026-09-07 08:38:08'),
('univ-pnj','Politeknik Negeri Jakarta','/uploads/1788509517749_PNJ.png','Associate’s Degree – Industrial Electronics Engineering','Aug 2024 – Aug 2025',1,'[{\"name\":\"KSM Psychorobotic\",\"role\":\"Active Member\",\"link\":\"https://www.instagram.com/psychorobotic_pnj/\",\"description\":\"Active member in robotics and mechatronics student organization.\"}]','[{\"title\":\"Smart Solar Cell Project (Lecturer-led Research, 2025)\",\"supervisor\":\"Dr. Devi Handaya\",\"supervisor_link\":\"https://www.instagram.com/d.handaya/\",\"description\":\"Contributed to a research project focusing on the development of a smart solar panel monitoring system, involving temperature sensors, real-time data acquisition, and IoT-based analysis for performance optimization.\"}]','[{\"category\":\"Paid Projects\",\"items\":[{\"title\":\"Static panoramic 360 websites with Panolens.js (AEON Mall, Kasablanka Hall, JCC)\",\"url\":\"http://aeonmall.midragondev.my.id/\",\"description\":\"Developed interactive panoramic tours using WebGL & Panolens.js.\"},{\"title\":\"Dynamic CMS websites for Metalfest and Creativa\",\"url\":\"http://metalfest.micebgpnj.my.id/\",\"description\":\"Built responsive event and community portals with custom CMS.\"}]},{\"category\":\"Campus Projects\",\"items\":[{\"title\":\"RFID-based Web Attendance System\",\"url\":\"https://fahmiibrahim.my.id/project/web-iot-absensi-rfid\",\"description\":\"Integrated RFID card reader with real-time web attendance logger.\"},{\"title\":\"Film Project Management System Web App\",\"url\":\"https://fahmiibrahim.my.id/project/web-short-film\",\"description\":\"Collaborative project planner and asset manager for short film production.\"},{\"title\":\"5V Power Supply with custom 3D enclosure\",\"url\":\"\",\"description\":\"Designed schematic, etched PCB, and assembled hardware housing.\"},{\"title\":\"Digital Scoreboard System with button controller\",\"url\":\"\",\"description\":\"Engineered microcontroller-driven scoreboard display.\"}]}]','[{\"title\":\"Electronics fundamentals\",\"items\":[\"Basic Logic Gates\",\"Component Selection\",\"PCB Design\",\"Circuit Troubleshooting\"]},{\"title\":\"Embedded Systems & IoT\",\"items\":[\"Circuit Design\",\"Microcontroller Integration (ESP32/Arduino)\",\"Hardware-Software Interfacing\",\"MQTT\"]},{\"title\":\"Web Development\",\"items\":[\"Fullstack Architecture\",\"REST API Development\",\"Database Optimization\",\"Deployment & Infrastructure\"]}]','2026-09-04 07:06:33','2026-09-04 08:12:00');
/*!40000 ALTER TABLE `university_achievements` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `active` enum('0','1') NOT NULL DEFAULT '0',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'Fahmi Ibrahim','fahmi@admin.com','1',NULL,'$2y$12$pP6LwOh6dmW0MnLltdyhIuRVZlHmA8hvpEuIYj85XZCf3fvgE.pVa','','2025-05-24 07:02:17','2025-05-24 07:02:17');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `work_experiences`
--

DROP TABLE IF EXISTS `work_experiences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_experiences` (
  `id` varchar(50) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `company_url` varchar(500) DEFAULT '',
  `company_logo` varchar(500) DEFAULT '',
  `role_title` varchar(255) NOT NULL,
  `employment_type` varchar(100) DEFAULT 'Internship',
  `location` varchar(255) DEFAULT '',
  `start_date` varchar(100) NOT NULL,
  `end_date` varchar(100) DEFAULT 'Present',
  `is_current` tinyint(1) DEFAULT 0,
  `order_index` int(11) DEFAULT 0,
  `description_points` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`description_points`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_experiences`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `work_experiences` WRITE;
/*!40000 ALTER TABLE `work_experiences` DISABLE KEYS */;
INSERT INTO `work_experiences` VALUES
('exp-210c31e3','PT. Fortunet Solusi Indonesia','https://www.fortunetindonesia.com/','/uploads/1788506379942_logo-fsi-hd.png','Intern - IoT Engineer','Internship','Bekasi, Indonesia','1 July 2026','4 December 2026',0,1,'[\"Engineered and maintained a fullstack internal web application for project management and task tracking,   featuring Kanban workflows, role-based access, and real-time activity monitoring.\",\"Developed a cross-platform mobile app using Flutter for the SmartWorkshop IoT ecosystem, enabling real-time   remote monitoring, telemetry data visualization, and hardware device control.\",\"Built automated scheduling systems for IoT device control and managed cloud VPS infrastructure, DNS routing, domain configurations, and system uptime maintenance.\",\"Designed and deployed the official Company Profile website with modern responsive UI/UX, optimized performance, and clear   product/service showcase.\",\"Led and mentored vocational high school (SMK) internship students, providing technical guidance, code reviews, and   supervising their practical engineering projects.\"]','2026-09-04 07:27:25','2026-09-07 08:37:54'),
('exp-intek','PT. Solusi Intek Indonesia','https://intek.co.id/id/','/uploads/1788509538753_Intek.png','Intern - Mechatronics Research & Development','Internship','Bekasi, Indonesia','3 June 2022','10 February 2024',0,2,'[\"Contributed to IoT research by designing and assembling electronic circuits, integrating sensors, and programming microcontrollers (Arduino, ESP8266, ESP32).\",\"Managed server infrastructure, performed domain and DNS administration, and conducted routine maintenance to ensure application availability.\",\"Developed web-based applications and optimized database performance for better scalability and efficiency.\",\"Diagnosed and resolved hardware, software, and network issues to maintain smooth system operations.\",\"Utilized version control systems (e.g., Git) and maintained comprehensive technical documentation throughout the development lifecycle.\"]','2026-09-04 07:06:33','2026-09-07 08:37:50');
/*!40000 ALTER TABLE `work_experiences` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-09-10 13:48:27
