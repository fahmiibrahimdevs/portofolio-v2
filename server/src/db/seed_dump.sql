/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.14-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: portofolio
-- ------------------------------------------------------
-- Server version	10.6.22-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

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

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES
('admin-fahmi-1','fahmi','fahmiibrahimdevs@gmail.com','$argon2id$v=19$m=65536,t=2,p=1$NPcprciOarMZVI2me8UHVPluyhiRFklGsfkjFJMP/hw$NYCxUC2QiXbTbw5WstAPhBmRHzBmyUaHze9MZ+kxIQc','Fahmi Ibrahim','2026-09-04 07:06:33','2026-09-04 12:59:41');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_posts`
--

LOCK TABLES `article_posts` WRITE;
/*!40000 ALTER TABLE `article_posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `article_posts` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `permission_role` WRITE;
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
INSERT INTO `permission_role` VALUES
(1,1),
(1,2),
(2,1),
(2,2),
(3,1),
(3,2),
(4,1),
(4,2);
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `permission_user` WRITE;
/*!40000 ALTER TABLE `permission_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission_user` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES
(1,'users-create','Create Users','Create Users','2025-05-24 07:02:17','2025-05-24 07:02:17'),
(2,'users-read','Read Users','Read Users','2025-05-24 07:02:17','2025-05-24 07:02:17'),
(3,'users-update','Update Users','Update Users','2025-05-24 07:02:17','2025-05-24 07:02:17'),
(4,'users-delete','Delete Users','Delete Users','2025-05-24 07:02:17','2025-05-24 07:02:17');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `profile_settings` WRITE;
/*!40000 ALTER TABLE `profile_settings` DISABLE KEYS */;
INSERT INTO `profile_settings` VALUES
('profile_main','Fahmi Ibrahim','Software Engineer & IoT Engineer','Software Engineer with experience in developing applications integrated with IoT hardware. Adept in application design, server-side development, and technical problem-solving. Committed to continuous learning and innovation, with a passion for tackling new challenges in the tech industry.','/uploads/1788508503286_Profile1.jpg','/uploads/1788509917083_CV_Fahmi_Ibrahim.pdf','CV_Fahmi_Ibrahim.pdf','fahmidev.ibrahim@gmail.com','https://github.com/fhmiibrhimdev/','https://www.linkedin.com/in/fahmiibrahimdev/','https://www.youtube.com/@midracode','https://instagram.com/fahmiibrahimdev_','Jakarta, Indonesia',1,'2026-09-04 07:06:33','2026-09-04 08:18:55');
/*!40000 ALTER TABLE `profile_settings` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `project_boms` WRITE;
/*!40000 ALTER TABLE `project_boms` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_boms` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `project_details` WRITE;
/*!40000 ALTER TABLE `project_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_details` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `project_files` WRITE;
/*!40000 ALTER TABLE `project_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_files` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `project_images` WRITE;
/*!40000 ALTER TABLE `project_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_images` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES
(1,1,'App\\Models\\User');
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES
(1,'admin','Admin','Admin','2025-05-24 07:02:17','2025-05-24 07:02:17'),
(2,'user','User','User','2025-05-24 07:02:17','2025-05-24 07:02:17');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `tech_skills` WRITE;
/*!40000 ALTER TABLE `tech_skills` DISABLE KEYS */;
INSERT INTO `tech_skills` VALUES
('sk-638f6978','cat-tools','Laragon','/uploads/1788510731581_Laragon.webp',0,'2026-09-04 08:32:13'),
('sk-64c33255','cat-frameworks','jQuery','/uploads/1788507747239_jQuery.png',7,'2026-09-04 07:42:28'),
('sk-7196dc2f','cat-iot','NodeRed','/uploads/1788507436589_NodeRed.png',6,'2026-09-04 07:37:18'),
('sk-8d7a49de','cat-frameworks','Livewire','/uploads/1788508318778_Livewire.png',8,'2026-09-04 07:51:59'),
('sk-940359cd','cat-tools','Ubuntu OS','/uploads/1788507919419_Ubuntu.webp',5,'2026-09-04 07:45:20'),
('sk-9f76877d','cat-databases','PostgreSQL','/uploads/1788507380475_PostgreSQL.svg',3,'2026-09-04 07:36:26'),
('sk-a6516c7c','cat-frameworks','Bootstrap','/uploads/1788507526398_Bootstrap.png',7,'2026-09-04 07:38:48'),
('sk-arduino','cat-iot','Arduino','https://fahmiibrahim.my.id/icons/Arduino.png',1,'2026-09-04 07:06:35'),
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
('sk-easyeda','cat-iot','EasyEDA / PCB','https://fahmiibrahim.my.id/icons/EasyEDA.jpg',5,'2026-09-04 07:06:35'),
('sk-esp32','cat-iot','ESP32','https://fahmiibrahim.my.id/icons/ESP32.png',3,'2026-09-04 07:06:35'),
('sk-esp8266','cat-iot','ESP8266','https://fahmiibrahim.my.id/icons/ESP8266.png',2,'2026-09-04 07:06:35'),
('sk-flutter','cat-frameworks','Flutter','/uploads/1788507295831_Flutter.png',5,'2026-09-04 07:06:35'),
('sk-git','cat-tools','GitHub / Git','https://fahmiibrahim.my.id/icons/Github.png',1,'2026-09-04 07:06:35'),
('sk-hono','cat-tools','Node.js','/uploads/1788507263865_NodeJS.svg',3,'2026-09-04 07:06:34'),
('sk-html','cat-languages','HTML5','/uploads/1788507096572_HTML5.png',1,'2026-09-04 07:06:34'),
('sk-js','cat-languages','JavaScript','/uploads/1788507128896_JavaScript.png',3,'2026-09-04 07:06:34'),
('sk-laravel','cat-frameworks','Laravel','/uploads/1788507284722_Laravel.png',4,'2026-09-04 07:06:34'),
('sk-mariadb','cat-databases','MariaDB','/uploads/1788507357532_MariaDB.png',2,'2026-09-04 07:06:35'),
('sk-mqtt','cat-iot','MQTT','https://fahmiibrahim.my.id/icons/MQTT.png',4,'2026-09-04 07:06:35'),
('sk-mysql','cat-databases','MySQL','/uploads/1788507341469_MySQL.png',1,'2026-09-04 07:06:35'),
('sk-php','cat-languages','PHP','/uploads/1788507181520_php.svg',5,'2026-09-04 07:06:34'),
('sk-postman','cat-tools','Postman','https://fahmiibrahim.my.id/icons/Postman.svg',2,'2026-09-04 07:06:35'),
('sk-py','cat-languages','Python','/uploads/1788507196294_Python.png',6,'2026-09-04 07:06:34'),
('sk-react','cat-frameworks','React','/uploads/1788507238305_ReactJS.png',1,'2026-09-04 07:06:34'),
('sk-tailwind','cat-frameworks','Tailwind CSS','/uploads/1788507250584_TailwindCSS.png',2,'2026-09-04 07:06:34'),
('sk-ts','cat-languages','TypeScript','/uploads/1788507160540_TypeScript.png',4,'2026-09-04 07:06:34');
/*!40000 ALTER TABLE `tech_skills` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `university_achievements` WRITE;
/*!40000 ALTER TABLE `university_achievements` DISABLE KEYS */;
INSERT INTO `university_achievements` VALUES
('univ-b9d2271d','Politeknik Negeri Jakrta','/uploads/1788509106123_PNJ.png','Associate’s Degree – Industrial Electronics Engineering','Aug 2025 - Aug 2026',2,'[{\"name\":\"KSM Psychorobotic\",\"role\":\"Vice Chairman\",\"link\":\"https://www.instagram.com/psychorobotic_pnj/\",\"description\":\"\"},{\"name\":\"KSM Computer Student Club\",\"role\":\"Active Member\",\"link\":\"https://www.instagram.com/cscpnj/\",\"description\":\"\"}]','[{\"title\":\"SIMONLE – IoT-Based Smart Catfish Pond Monitoring & Automation System\",\"supervisor\":\"Purwanti, Ihsan Auditia Akhinov\",\"supervisor_link\":\"\",\"description\":\"Researched and developed an intelligent aquaculture monitoring and automation system (SIMONLE) designed to optimize catfish water quality. Integrated multi-parameter environmental sensors—including pH sensor, TDS (Total Dissolved Solids), water level sensor, and DS18B20 waterproof temperature sensor—with rigorous hardware calibration algorithms. Implemented automated water pump actuators triggered by customizable parameter thresholds, alongside a centralized database system for real-time telemetry logging and historical data analysis.\"}]','[]','[]','2026-09-04 08:05:07','2026-09-04 08:05:07'),
('univ-pnj','Politeknik Negeri Jakarta','/uploads/1788509517749_PNJ.png','Associate’s Degree – Industrial Electronics Engineering','Aug 2024 – Aug 2025',1,'[{\"name\":\"KSM Psychorobotic\",\"role\":\"Active Member\",\"link\":\"https://www.instagram.com/psychorobotic_pnj/\",\"description\":\"Active member in robotics and mechatronics student organization.\"}]','[{\"title\":\"Smart Solar Cell Project (Lecturer-led Research, 2025)\",\"supervisor\":\"Dr. Devi Handaya\",\"supervisor_link\":\"https://www.instagram.com/d.handaya/\",\"description\":\"Contributed to a research project focusing on the development of a smart solar panel monitoring system, involving temperature sensors, real-time data acquisition, and IoT-based analysis for performance optimization.\"}]','[{\"category\":\"Paid Projects\",\"items\":[{\"title\":\"Static panoramic 360 websites with Panolens.js (AEON Mall, Kasablanka Hall, JCC)\",\"url\":\"http://aeonmall.midragondev.my.id/\",\"description\":\"Developed interactive panoramic tours using WebGL & Panolens.js.\"},{\"title\":\"Dynamic CMS websites for Metalfest and Creativa\",\"url\":\"http://metalfest.micebgpnj.my.id/\",\"description\":\"Built responsive event and community portals with custom CMS.\"}]},{\"category\":\"Campus Projects\",\"items\":[{\"title\":\"RFID-based Web Attendance System\",\"url\":\"https://fahmiibrahim.my.id/project/web-iot-absensi-rfid\",\"description\":\"Integrated RFID card reader with real-time web attendance logger.\"},{\"title\":\"Film Project Management System Web App\",\"url\":\"https://fahmiibrahim.my.id/project/web-short-film\",\"description\":\"Collaborative project planner and asset manager for short film production.\"},{\"title\":\"5V Power Supply with custom 3D enclosure\",\"url\":\"\",\"description\":\"Designed schematic, etched PCB, and assembled hardware housing.\"},{\"title\":\"Digital Scoreboard System with button controller\",\"url\":\"\",\"description\":\"Engineered microcontroller-driven scoreboard display.\"}]}]','[{\"title\":\"Electronics fundamentals\",\"items\":[\"Basic Logic Gates\",\"Component Selection\",\"PCB Design\",\"Circuit Troubleshooting\"]},{\"title\":\"Embedded Systems & IoT\",\"items\":[\"Circuit Design\",\"Microcontroller Integration (ESP32/Arduino)\",\"Hardware-Software Interfacing\",\"MQTT\"]},{\"title\":\"Web Development\",\"items\":[\"Fullstack Architecture\",\"REST API Development\",\"Database Optimization\",\"Deployment & Infrastructure\"]}]','2026-09-04 07:06:33','2026-09-04 08:12:00');
/*!40000 ALTER TABLE `university_achievements` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'Fahmi Ibrahim','fahmi@admin.com','1',NULL,'$2y$12$pP6LwOh6dmW0MnLltdyhIuRVZlHmA8hvpEuIYj85XZCf3fvgE.pVa','','2025-05-24 07:02:17','2025-05-24 07:02:17');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `work_experiences` WRITE;
/*!40000 ALTER TABLE `work_experiences` DISABLE KEYS */;
INSERT INTO `work_experiences` VALUES
('exp-210c31e3','PT. Fortunet Solusi Indonesia','https://www.fortunetindonesia.com/','/uploads/1788506379942_logo-fsi-hd.png','Intern - IoT Engineer','Internship','Bekasi, Indonesia','1 July 2026','4 December 2026',0,2,'[\"Engineered and maintained a fullstack internal web application for project management and task tracking,   featuring Kanban workflows, role-based access, and real-time activity monitoring.\",\"Developed a cross-platform mobile app using Flutter for the SmartWorkshop IoT ecosystem, enabling real-time   remote monitoring, telemetry data visualization, and hardware device control.\",\"Built automated scheduling systems for IoT device control and managed cloud VPS infrastructure, DNS routing, domain configurations, and system uptime maintenance.\",\"Designed and deployed the official Company Profile website with modern responsive UI/UX, optimized performance, and clear   product/service showcase.\",\"Led and mentored vocational high school (SMK) internship students, providing technical guidance, code reviews, and   supervising their practical engineering projects.\"]','2026-09-04 07:27:25','2026-09-04 07:27:25'),
('exp-intek','PT. Solusi Intek Indonesia','https://intek.co.id/id/','/uploads/1788509538753_Intek.png','Intern - Mechatronics Research & Development','Internship','Bekasi, Indonesia','3 June 2022','10 February 2024',0,1,'[\"Contributed to IoT research by designing and assembling electronic circuits, integrating sensors, and programming microcontrollers (Arduino, ESP8266, ESP32).\",\"Managed server infrastructure, performed domain and DNS administration, and conducted routine maintenance to ensure application availability.\",\"Developed web-based applications and optimized database performance for better scalability and efficiency.\",\"Diagnosed and resolved hardware, software, and network issues to maintain smooth system operations.\",\"Utilized version control systems (e.g., Git) and maintained comprehensive technical documentation throughout the development lifecycle.\"]','2026-09-04 07:06:33','2026-09-04 08:12:20');
/*!40000 ALTER TABLE `work_experiences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'portofolio'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-04 20:06:04
