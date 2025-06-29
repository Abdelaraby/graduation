-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 29, 2025 at 05:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `desertresque`
--
CREATE DATABASE IF NOT EXISTS `desertresque` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `desertresque`;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_356a192b7913b04c54574d18c28d46e6395428ab', 'i:1;', 1751156005),
('laravel_cache_356a192b7913b04c54574d18c28d46e6395428ab:timer', 'i:1751156005;', 1751156005),
('laravel_cache_livewire-rate-limiter:a17961fa74e9275d529f489537f179c05d50c2f3', 'i:1;', 1751147328),
('laravel_cache_livewire-rate-limiter:a17961fa74e9275d529f489537f179c05d50c2f3:timer', 'i:1751147328;', 1751147328);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `stock` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `image`, `created_at`, `updated_at`) VALUES
(3, 'وقود', 'e_comerce/01JYJYX00EGGZ1E5CQN0HR9SKB.jpg', '2025-06-25 04:12:40', '2025-06-25 04:12:40'),
(4, 'زيوت و شحوم', 'e_comerce/01JYKFCBRKCD5MRJFVVHFDXBB1.jpg', '2025-06-25 09:00:41', '2025-06-25 09:00:41'),
(5, 'قطع غيار', 'e_comerce/01JYKFZRXM12Z3PFVXFN9HTBCV.jpg', '2025-06-25 09:11:17', '2025-06-25 09:11:17'),
(6, 'اطارات', 'e_comerce/01JYMFPEFC68KWPZC9XB9KRBS8.png', '2025-06-25 18:25:26', '2025-06-25 18:25:26'),
(7, 'بطاريات', 'e_comerce/01JYMFVG74H4QYK7267NQ38MB4.png', '2025-06-25 18:28:11', '2025-06-25 18:28:11'),
(8, 'اعطال شائعه', 'e_comerce/01JYWDWKEVP01N266FZMQ7KXJH.jpg', '2025-06-28 20:27:46', '2025-06-28 20:27:46');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `user_id`, `name`, `email`, `message`, `created_at`, `updated_at`) VALUES
(1, 5, 'fatma', 'fitandfix@gmail.com', 'can you help me?', '2025-06-28 18:54:35', '2025-06-28 18:54:35');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

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
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_04_07_141727_create_personal_access_tokens_table', 1),
(5, '2025_04_07_193307_create_categories_table', 1),
(6, '2025_04_07_193308_create_products_table', 1),
(7, '2025_04_10_134725_create_cart_items_table', 1),
(8, '2025_04_11_182130_create_contacts_table', 1),
(9, '2025_04_13_175927_create_orders_table', 1),
(10, '2025_04_13_180035_create_order_items_table', 1),
(11, '2025_04_14_164238_add_paymob_fields_to_orders_table', 1),
(12, '2025_05_01_201436_add_remember_token_to_users_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `email_address` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `payment_type` varchar(255) NOT NULL,
  `cvc` varchar(255) DEFAULT NULL,
  `subtotal` decimal(8,2) NOT NULL,
  `shipping` decimal(8,2) NOT NULL DEFAULT 5.00,
  `tax` decimal(8,2) NOT NULL,
  `total` decimal(8,2) NOT NULL,
  `order_status` varchar(255) NOT NULL DEFAULT 'Processing',
  `order_date` datetime NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `paymob_order_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `email_address`, `address`, `city`, `country`, `region`, `postal_code`, `phone`, `payment_type`, `cvc`, `subtotal`, `shipping`, `tax`, `total`, `order_status`, `order_date`, `latitude`, `longitude`, `created_at`, `updated_at`, `paymob_order_id`) VALUES
(2, 3, 'abdoahmedm45@gmail.com', 'damaris', 'Al Minya', 'Egypt', 'Al Minya', '61516', '01012279600', 'paymob', NULL, 1926.00, 5.00, 385.20, 2316.20, 'Processing', '2025-06-27 21:14:50', 28.12717430, 30.74393920, '2025-06-27 18:14:50', '2025-06-27 18:14:50', '348035041'),
(3, 3, 'abdoahmedm45@gmail.com', 'fff', 'Al Minya', 'Egypt', 'Al Minya', '61516', '01012279600', 'paymob', NULL, 1386.00, 5.00, 277.20, 1668.20, 'Processing', '2025-06-27 21:28:03', 28.12717430, 30.74393920, '2025-06-27 18:28:03', '2025-06-27 18:28:03', '348040118'),
(4, 3, 'abody0115797@gmail.com', 'Qasr Al Doubara', 'Cairo', 'Egypt', 'Cairo', '11519', '01012279600', 'paymob', NULL, 2526.00, 5.00, 505.20, 3036.20, 'Processing', '2025-06-28 11:48:57', 30.04441960, 31.23571160, '2025-06-28 08:48:57', '2025-06-28 08:48:57', '348192114'),
(5, 4, 'abdoahmedm45@gmail.com', 'Qasr Al Doubara', 'Cairo', 'Egypt', 'Cairo', '11519', '01012279600', 'paymob', NULL, 1926.00, 5.00, 385.20, 2316.20, 'Processing', '2025-06-28 12:01:33', 30.04441960, 31.23571160, '2025-06-28 09:01:33', '2025-06-28 09:01:33', '348196521'),
(6, 4, 'abdoahmedm45@gmail.com', 'Qasr Al Doubara', 'Cairo', 'Egypt', 'Cairo', '11519', '01012279600', 'paymob', NULL, 1926.00, 5.00, 385.20, 2316.20, 'Processing', '2025-06-28 12:04:01', 30.04441960, 31.23571160, '2025-06-28 09:04:01', '2025-06-28 09:04:01', '348197441'),
(7, 4, 'abody0115797@gmail.com', 'Qasr Al Doubara', 'Cairo', 'Egypt', 'Cairo', '11519', '01012279600', 'paymob', NULL, 1200.00, 5.00, 240.00, 1445.00, 'Processing', '2025-06-28 12:05:24', 30.04441960, 31.23571160, '2025-06-28 09:05:24', '2025-06-28 09:05:24', '348197946'),
(8, 4, 'abody0115797@gmail.com', 'Qasr Al Doubara', 'Cairo', 'Egypt', 'Cairo', '11519', '01012279600', 'paymob', NULL, 1050.00, 5.00, 210.00, 1265.00, 'Processing', '2025-06-28 12:07:47', 30.04441960, 31.23571160, '2025-06-28 09:07:47', '2025-06-28 09:07:47', '348198825'),
(9, 4, 'asdjn@gmail.com', 'Qasr Al Doubara', 'Cairo', 'Egypt', 'Cairo', '11519', '01211111111', 'paymob', NULL, 2693.00, 5.00, 538.60, 3236.60, 'Processing', '2025-06-28 12:11:36', 30.04441960, 31.23571160, '2025-06-28 09:11:36', '2025-06-28 09:11:36', '348200163'),
(10, 4, 'abdjn@jdfnj.com', 'Qasr Al Doubara', 'Cairo', 'Egypt', 'Cairo', '11519', '01012279600', 'cash', NULL, 150.00, 5.00, 30.00, 185.00, 'Processing', '2025-06-28 12:16:18', 30.04441960, 31.23571160, '2025-06-28 09:16:18', '2025-06-28 09:16:18', NULL),
(11, 5, 'abdo@ahmed.xom', 'Qasr Al Doubara', 'Cairo', 'Egypt', 'Cairo', '11519', '9999999999999', 'paymob', NULL, 388.00, 5.00, 77.60, 470.60, 'Processing', '2025-06-28 12:19:16', 30.04441960, 31.23571160, '2025-06-28 09:19:16', '2025-06-28 09:19:16', '348203037'),
(12, 5, 'abdoahmedm45@gmail.com', 'Qasr Al Doubara', 'Cairo', 'Egypt', 'Cairo', '11519', '01223344555', 'cash', NULL, 23209.00, 5.00, 4641.80, 27855.80, 'Processing', '2025-06-28 13:50:33', 30.04441960, 31.23571160, '2025-06-28 10:50:33', '2025-06-28 10:50:33', NULL),
(13, 4, 'abdoahmedm45@gmail.com', 'Qasr Al Doubara', 'Cairo', 'Egypt', 'Cairo', '11519', '01012279600', 'paymob', NULL, 1926.00, 5.00, 385.20, 2316.20, 'Processing', '2025-06-28 17:07:31', 30.04441960, 31.23571160, '2025-06-28 14:07:31', '2025-06-28 14:07:31', '348319907'),
(14, 4, 'abdoahmedm45@gmail.com', 'Qasr Al Doubara', 'Cairo', 'Egypt', 'Cairo', '11519', '01012279600', 'paymob', NULL, 1926.00, 5.00, 385.20, 2316.20, 'Processing', '2025-06-28 17:15:52', 30.04441960, 31.23571160, '2025-06-28 14:15:52', '2025-06-28 14:15:52', '348323891'),
(15, 6, 'fatmahesen@gmail.com', 'minia', 'Al Minya', 'Egypt', 'Al Minya', '61516', '01126490568', 'cash', NULL, 4619.00, 5.00, 923.80, 5547.80, 'Processing', '2025-06-28 20:57:19', 28.12631080, 30.74302530, '2025-06-28 17:57:19', '2025-06-28 17:57:19', NULL),
(16, 6, 'fatmahesen@gmail.com', 'minia', 'Al Minya', 'Egypt', 'Al Minya', '61516', '01126490568', 'paymob', NULL, 1386.00, 5.00, 277.20, 1668.20, 'Processing', '2025-06-28 21:00:34', 28.12631080, 30.74302530, '2025-06-28 18:00:34', '2025-06-28 18:00:34', '348444717'),
(17, 5, 'fatmahesen@gmail.com', 'minia', 'Al Minya', 'Egypt', 'Al Minya', '61516', '01126490568', 'paymob', NULL, 1926.00, 5.00, 385.20, 2316.20, 'Processing', '2025-06-28 21:04:32', 28.12631080, 30.74302530, '2025-06-28 18:04:32', '2025-06-28 18:04:32', '348446608'),
(18, 5, 'fatma@gmail.com', 'minia', 'Al Minya', 'Egypt', 'Al Minya', '61516', '01126490568', 'paymob', NULL, 2693.00, 5.00, 538.60, 3236.60, 'Processing', '2025-06-28 21:26:18', 28.12631080, 30.74302530, '2025-06-28 18:26:18', '2025-06-28 18:26:18', '348454518');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `created_at`, `updated_at`) VALUES
(3, 2, 6, 1, 1926.00, '2025-06-27 18:14:50', '2025-06-27 18:14:50'),
(4, 3, 7, 1, 1386.00, '2025-06-27 18:28:03', '2025-06-27 18:28:03'),
(5, 4, 28, 1, 600.00, '2025-06-28 08:48:57', '2025-06-28 08:48:57'),
(6, 4, 6, 1, 1926.00, '2025-06-28 08:48:57', '2025-06-28 08:48:57'),
(7, 5, 6, 1, 1926.00, '2025-06-28 09:01:33', '2025-06-28 09:01:33'),
(8, 6, 6, 1, 1926.00, '2025-06-28 09:04:01', '2025-06-28 09:04:01'),
(9, 7, 11, 1, 1200.00, '2025-06-28 09:05:24', '2025-06-28 09:05:24'),
(10, 8, 9, 1, 1050.00, '2025-06-28 09:07:47', '2025-06-28 09:07:47'),
(11, 9, 5, 1, 2693.00, '2025-06-28 09:11:36', '2025-06-28 09:11:36'),
(12, 10, 10, 1, 150.00, '2025-06-28 09:16:18', '2025-06-28 09:16:18'),
(13, 11, 27, 1, 388.00, '2025-06-28 09:19:16', '2025-06-28 09:19:16'),
(14, 12, 38, 1, 23209.00, '2025-06-28 10:50:33', '2025-06-28 10:50:33'),
(15, 13, 6, 1, 1926.00, '2025-06-28 14:07:31', '2025-06-28 14:07:31'),
(16, 14, 6, 1, 1926.00, '2025-06-28 14:15:52', '2025-06-28 14:15:52'),
(17, 15, 5, 1, 2693.00, '2025-06-28 17:57:19', '2025-06-28 17:57:19'),
(18, 15, 6, 1, 1926.00, '2025-06-28 17:57:19', '2025-06-28 17:57:19'),
(19, 16, 7, 1, 1386.00, '2025-06-28 18:00:34', '2025-06-28 18:00:34'),
(20, 17, 6, 1, 1926.00, '2025-06-28 18:04:32', '2025-06-28 18:04:32'),
(21, 18, 5, 1, 2693.00, '2025-06-28 18:26:18', '2025-06-28 18:26:18');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 2, 'API TOKEN', '9e23776021e72d863ab52e1b56742117459ca9b083530a37fbafb00f6c55708d', '[\"*\"]', NULL, NULL, '2025-06-27 10:30:45', '2025-06-27 10:30:45'),
(2, 'App\\Models\\User', 3, 'API TOKEN', 'ea9090a6673de2a1555faf3cdb6f306ecba24952d30c5f2ce576327376bc54ca', '[\"*\"]', NULL, NULL, '2025-06-27 10:32:16', '2025-06-27 10:32:16'),
(3, 'App\\Models\\User', 3, 'auth_token', '1f7181f47be5f49bd6d8b77a32a19d68dc6ff0858538757c5b49ec7cba086d1a', '[\"*\"]', '2025-06-27 11:40:45', NULL, '2025-06-27 10:32:39', '2025-06-27 11:40:45'),
(4, 'App\\Models\\User', 3, 'auth_token', '5d9f2d92bdc29c24c3a4c455d0b5689f8e2a19b9b5df35ea9881239d0d699f7c', '[\"*\"]', '2025-06-27 11:43:03', NULL, '2025-06-27 11:42:49', '2025-06-27 11:43:03'),
(5, 'App\\Models\\User', 3, 'auth_token', '94940212ee3468c15a683448b92437dc146cc0bd6c255cc4e98f1e696c7d1687', '[\"*\"]', NULL, NULL, '2025-06-27 11:42:56', '2025-06-27 11:42:56'),
(6, 'App\\Models\\User', 3, 'auth_token', 'dbea0844c8a669646bc2188f2ca316cca184225e3f691ad1a6ecd9a63f7f0d4d', '[\"*\"]', '2025-06-27 11:43:48', NULL, '2025-06-27 11:43:34', '2025-06-27 11:43:48'),
(7, 'App\\Models\\User', 3, 'auth_token', 'd991f98e55bcc11be48634de8bffec4783b20b7683b0ef0ae914936757a88a6e', '[\"*\"]', '2025-06-28 08:58:26', NULL, '2025-06-27 11:43:41', '2025-06-28 08:58:26'),
(8, 'App\\Models\\User', 4, 'API TOKEN', 'f22d0d1f415421d1d7ee9ebdd10a03252ca510475e85ff31882c5ace9c03ddfa', '[\"*\"]', NULL, NULL, '2025-06-28 08:59:20', '2025-06-28 08:59:20'),
(9, 'App\\Models\\User', 4, 'auth_token', '81e2897901becaaa40bace3c74f2e777fcf8ab8e42e484d38d24e8fe8dc37f91', '[\"*\"]', '2025-06-28 09:16:48', NULL, '2025-06-28 09:00:04', '2025-06-28 09:16:48'),
(10, 'App\\Models\\User', 5, 'API TOKEN', '33727b5e0ded0a7a3ceeef246bd80521ab587d6b5466ab996b2b8d7ffe7373b3', '[\"*\"]', NULL, NULL, '2025-06-28 09:17:30', '2025-06-28 09:17:30'),
(11, 'App\\Models\\User', 5, 'auth_token', '6239576999bffe2167ea40004cc94bd4e957abccaeb354431c522c7354a4a8b9', '[\"*\"]', '2025-06-28 18:54:35', NULL, '2025-06-28 09:17:53', '2025-06-28 18:54:35'),
(12, 'App\\Models\\User', 4, 'auth_token', '9dedd72b8ed9d998a2d44ff749343474f6984a695872908be7f9fa1a7ede51e2', '[\"*\"]', '2025-06-28 14:06:08', NULL, '2025-06-28 14:05:57', '2025-06-28 14:06:08'),
(13, 'App\\Models\\User', 4, 'auth_token', 'e092eae1c92e44dac8a41c7f3aff23a33cf62c735f3db641a81dff2780ae4919', '[\"*\"]', '2025-06-28 14:07:23', NULL, '2025-06-28 14:06:03', '2025-06-28 14:07:23'),
(14, 'App\\Models\\User', 4, 'auth_token', 'c0154fb15911405f6691f783b00b1ac18e9100c791a0aa1f86e091f618f761f6', '[\"*\"]', '2025-06-28 14:14:08', NULL, '2025-06-28 14:13:42', '2025-06-28 14:14:08'),
(15, 'App\\Models\\User', 4, 'auth_token', '4d073cfecf399c5b4e3c594020113f12b700ebcc25934a9e364b8938b97e3dbf', '[\"*\"]', '2025-06-28 14:57:58', NULL, '2025-06-28 14:14:03', '2025-06-28 14:57:58'),
(16, 'App\\Models\\User', 6, 'API TOKEN', 'ba0665d5b67ba345062b10404a47218d4ed7041b32cc3e7d74e2f08893d71865', '[\"*\"]', NULL, NULL, '2025-06-28 17:47:53', '2025-06-28 17:47:53'),
(17, 'App\\Models\\User', 6, 'auth_token', '4ae19bbe15201873ce5ab48fb0ba662633b96006922ac72ed863c49d0d3279b3', '[\"*\"]', '2025-06-28 18:00:26', NULL, '2025-06-28 17:48:58', '2025-06-28 18:00:26');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `popularity` double NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `image`, `price`, `category_id`, `stock`, `quantity`, `popularity`, `description`, `created_at`, `updated_at`) VALUES
(5, 'زيت محرك ليكوي', 'e_comerce/01JYMG905C32G9YDN56EAQEKG8.jpg', 2693.00, 4, 6, 200, 7, 'زيت محرك ليكوي مولي 4200 5W-30 توب تيك - 5 لتر', '2025-06-25 18:35:34', '2025-06-28 18:26:18'),
(6, 'زيت محرك مانول', 'e_comerce/01JYMGCXDJF084N464TZASZ44F.jpg', 1926.00, 4, 1, 200, 7, NULL, '2025-06-25 18:37:42', '2025-06-28 18:04:32'),
(7, 'ELF EVOLUTION 900 FT 5W40', 'e_comerce/01JYMGG44YSJFM30S32N6W4CNZ.jpg', 1386.00, 4, 8, 200, 7, 'زيت محرك ELF EVOLUTION 900 FT 5W40 الاصطناعي للسيارات الخاصة سعة 4 لترات', '2025-06-25 18:39:27', '2025-06-28 18:00:34'),
(8, 'زيت موبيل - سوبر', 'e_comerce/01JYMGMHQ7FBAJC3MJ1AP3BDC9.jpg', 2069.00, 4, 10, 200, 7, 'زيت محرك السيارة موبيل 5W40 سوبر سينثتيك فورمولا بي، 4 لتر', '2025-06-25 18:41:52', '2025-06-25 18:41:52'),
(9, 'زيت تويوتا ', 'e_comerce/01JYMGQZNRK5N43ASCRMK19C8D.jpg', 1050.00, 4, 9, 200, 7, 'تويوتا 20w50 5000 كم 4 لتر', '2025-06-25 18:43:45', '2025-06-28 09:07:47'),
(10, 'زيت الفرامل والقابض', 'e_comerce/01JYMGXN848FZ958RSMQNQB69W.jpg', 150.00, 4, 9, 200, 7, 'زيت الفرامل والقابض Vaxxol Generic 180 مل', '2025-06-25 18:46:51', '2025-06-28 09:16:18'),
(11, 'زيت توتال إنرجيز ', 'e_comerce/01JYMH9BK806PZBB0HFTS3AYQC.jpg', 1200.00, 4, 9, 200, 7, 'زيت توتال إنرجيز كوارتز 7000 10W-40 بتقنية اصطناعية - 5 لترات', '2025-06-25 18:47:59', '2025-06-28 09:05:24'),
(12, 'زيت - موبيل ', 'e_comerce/01JYMHK75FRBSRN9M424T6Z1PT.png', 1300.00, 4, 10, 200, 7, 'زيت ', '2025-06-25 18:58:37', '2025-06-25 18:58:37'),
(13, 'موبيل 0-40 ', 'e_comerce/01JYMHPAMV7T8TA50AVE9BRNRA.png', 1500.00, 4, 10, 200, 7, 'زيت محرك ذات لزوجه عاليه', '2025-06-25 19:00:19', '2025-06-25 19:00:19'),
(14, 'زيت - موبيل 5-30', 'e_comerce/01JYMHSSWVH2F8YK0C2V9QYFVS.png', 1200.00, 4, 10, 200, 7, 'زيت موبيل لضمان عمر اطول للمحرك', '2025-06-25 19:02:13', '2025-06-25 19:02:13'),
(15, 'زيت شيل الترا', 'e_comerce/01JYMHW4XVW45ZFBBH2TNS4ATK.png', 1400.00, 4, 10, 200, 7, 'زيت شيل الترا وزن 1 لتر ', '2025-06-25 19:03:30', '2025-06-25 19:03:30'),
(16, 'بطارية ليثيوم أيون', 'e_comerce/01JYMJA02YVQ2HERW5DHZCA91T.jpg', 3300.00, 7, 10, 200, 7, 'بطارية ليثيوم أيون قابلة لإعادة الشحن 12 فولت 7 أمبير مع نظام إدارة البطارية (BMS) بديلة لبطارية حمضية', '2025-06-25 19:11:03', '2025-06-25 19:11:03'),
(17, 'بطاريه 12 فولت', 'e_comerce/01JYMKDXZKTQC7378HWV2J44XC.jpg', 3489.00, 7, 10, 200, 7, 'بطارية قابلة لإعادة الشحن Ultracell 78246 ذات صمام تنظيم الرصاص الحمضي (VRLA) سعة 7000 مللي أمبير/ساعة 12 فولت - 12 فولت - بيضاء', '2025-06-25 19:30:41', '2025-06-25 19:30:41'),
(18, 'بطاريه 70 امبير', 'e_comerce/01JYMKKW93R0B3HWNK5Q086K32.jpg', 3400.00, 7, 9, 200, 7, 'بطارية سيارة NS 70 12 فولت 70 أمبير/ساعة', '2025-06-25 19:33:56', '2025-06-25 19:33:56'),
(19, 'بطاريه 12 فولت ', 'e_comerce/01JYMKSS197YKGE4994F7MB39K.jpg', 4500.00, 7, 20, 400, 8, 'بطارية كونغ لونج 12 فولت 9 أمبير VRLA', '2025-06-25 19:37:09', '2025-06-25 19:37:09'),
(20, 'بطاريه كينج لونج ', 'e_comerce/01JYMM71TGST0KXZG6WPSAWG5M.jpg', 3600.00, 7, 30, 600, 8, 'بطارية حمض الرصاص القابلة لإعادة الشحن من KUNG LONG 12 فولت 18 أمبير/ساعة', '2025-06-25 19:39:10', '2025-06-25 19:44:24'),
(21, 'بطاريه بورش 44', 'e_comerce/01JYMMDWGSN6T3JDPYYPHJPARX.png', 2600.00, 7, 20, 400, 7, 'بطارية حمض الرصاص القابلة لإعادة الشحن من KUNG LONG 12 فولت 18 أمبير/ساعة', '2025-06-25 19:48:08', '2025-06-25 19:48:08'),
(22, 'بطاريه 500', 'e_comerce/01JYMMG63YWRNHFS7XNX4R8DEZ.png', 4800.00, 7, 40, 400, 7, 'بطارية حمض الرصاص القابلة لإعادة الشحن من KUNG LONG 12 فولت 18 أمبير/ساعة', '2025-06-25 19:49:23', '2025-06-25 19:49:23'),
(23, 'بطاريه ان 70', 'e_comerce/01JYMMHSKWMXDY796RRT17NDV0.png', 5100.00, 7, 0, 400, 9, 'بطارية حمض الرصاص القابلة لإعادة الشحن من KUNG LONG 12 فولت 18 أمبير/ساعة', '2025-06-25 19:50:16', '2025-06-25 19:50:16'),
(24, 'بطاريه ان 60', 'e_comerce/01JYMMN5QSR110H84WYHQREKQC.png', 4500.00, 7, 10, 400, 8, 'بطارية حمض الرصاص القابلة لإعادة الشحن من KUNG LONG 12 فولت 18 أمبير/ساعة', '2025-06-25 19:52:07', '2025-06-25 19:52:07'),
(25, 'بطاريه ان 62', 'e_comerce/01JYMMQBQ36S8ZN80G3B2DQH8M.png', 4780.00, 7, 0, 300, 20, 'بطارية حمض الرصاص القابلة لإعادة الشحن من KUNG LONG 12 فولت 18 أمبير/ساعة', '2025-06-25 19:53:18', '2025-06-25 19:53:18'),
(26, 'فلتر الزيت', 'e_comerce/01JYNQEBXFB0PE2KWT4MM5A2WK.jpg', 295.00, 5, 40, 500, 7, 'عنصر فلتر الزيت من بوش F026407006 - كروزا نيو، آدم، أسترا إتش، أسترا جي، كاسكادا، كورسا إي، إنسيجنيا إيه، موكا', '2025-06-26 06:00:04', '2025-06-26 06:00:04'),
(27, 'شمعة احتراق مزدوجة', 'e_comerce/01JYNQJCVF199RZQVSF6YQ5CQY.jpg', 388.00, 5, 139, 450, 8, 'شمعة احتراق مزدوجة من البلاتين من بوش، مقاس 14، طول سنها 26.5 مم - VR7SPP3', '2025-06-26 06:02:16', '2025-06-28 09:19:16'),
(28, 'BOSCH مصباح ', 'e_comerce/01JYNQQ8G4X3F2THV08HQN8892.jpg', 600.00, 5, 129, 400, 10, 'BOSCH\nمصباح أمامي H4 12V 60/55W مجموعة 2 قطعة', '2025-06-26 06:04:55', '2025-06-28 08:48:57'),
(29, 'فلتر هواء بوش', 'e_comerce/01JYNQTG41689BFXBHF0MFAKTA.jpg', 400.00, 5, 190, 130, 7, 'فلتر هواء بوش  M266 / W245 B150 ، W169 A150', '2025-06-26 06:06:41', '2025-06-26 06:06:41'),
(30, 'حزام بوش', 'e_comerce/01JYNQZQJZ66QKQE583BM36RZG.jpg', 539.00, 5, 120, 450, 7, 'حزام بوش المضلع على شكل حرف V - 6PK1740', '2025-06-26 06:09:33', '2025-06-26 06:09:33'),
(31, 'طقم تيل اماميه ', 'e_comerce/01JYNR2E3GNRBW0ZMJW6NN4BCC.jpg', 505.00, 5, 505, 480, 8, 'طقم تيل فرامل أمامية كورتكس لسيارات كيا سيراتو وI30 - 1600 سي سي', '2025-06-26 06:11:02', '2025-06-26 06:11:02'),
(32, 'شفرات مساحات الزجاج الامامي', 'e_comerce/01JYNR5RVDHRTYN69BB6X76184.jpg', 193.00, 5, 120, 125, 9, 'شفرات مساحات الزجاج الأمامي، متوافقة مع فيات برافو S590، مقاس 24/16 بوصة، مصنوعة من المطاط الطبيعي، مجموعة من قطعتين', '2025-06-26 06:12:51', '2025-06-26 06:12:51'),
(33, 'بلية عجل امامي ', 'e_comerce/01JYNR9A3E8RNQMFMEZBNN69VX.jpg', 2250.00, 5, 190, 310, 9, 'بلية عجل امامي اتش دي - سيراتو 2010 اصلي', '2025-06-26 06:14:47', '2025-06-26 06:14:47'),
(34, 'وحدة رفع زجاج السيارة', 'e_comerce/01JYNRCD90AEYFB3G7TEDAP4QW.jpg', 999.00, 5, 240, 340, 9, 'وحدة رفع زجاج السيارة تويوتا كورولا 2018-2014 (أوتوماتيك) 4 أبواب', '2025-06-26 06:16:28', '2025-06-26 06:16:28'),
(35, 'فلتر كابينه بوش', 'e_comerce/01JYNRKQMNV7Y4W5XVCYNSDE3X.jpg', 484.00, 5, 90, 245, 9, 'فلتر كابينة بوش 1987432397 - اوكتافيا A5، جولف 5، جولف 6، باسات B6', '2025-06-26 06:20:28', '2025-06-26 06:20:28'),
(36, 'اغطية محور العجله ', 'e_comerce/01JYNRP5GZJK4FTK0E53T2EQ04.jpg', 120.00, 5, 290, 300, 9, 'اغطية محور العجلة المركزية 4 قطع 60 مم من الكروم الاسود لسيارة هيونداي من Loky boy', '2025-06-26 06:21:48', '2025-06-26 06:21:48'),
(37, 'اطار سياره هانكوك', 'e_comerce/01JYNRRYRVR8XM8BHGJQBYGM2J.jpg', 3854.00, 6, 37, 300, 9, 'HANKOOK\nإطار سيارة هانكوك مقاس 15/60/195 عادي - كوريا', '2025-06-26 06:23:19', '2025-06-26 06:23:19'),
(38, 'اطار سياره بدون ثقوب ', 'e_comerce/01JYNRTZMMPT716KPYF21DGS3Z.jpg', 23209.00, 6, 899, 900, 9, 'يدجستون\nإطار سيارة Bridgestone مقاس 20/40/275 بدون ثقوب', '2025-06-26 06:24:26', '2025-06-28 10:50:33'),
(39, 'اطار سياره هانكوك', 'e_comerce/01JYNRX8CR7EASJG9JKTK1KB8T.jpg', 3400.00, 6, 978, 700, 9, 'إطار سيارة هانكوك مقاس 13/70/175 عادي - هانكوك كوري', '2025-06-26 06:25:40', '2025-06-26 06:25:40'),
(40, 'اطار سياره 15/60/195', 'e_comerce/01JYNS0ETGEDH9TFSQA73HRN4C.jpg', 3600.00, 6, 799, 700, 8, 'إطار سيارة Good Reed مقاس 15/60/195 عادي - تايلاند', '2025-06-26 06:27:25', '2025-06-26 06:27:25'),
(41, ' 155/65 R13 T (73) اطار هانكوك', 'e_comerce/01JYNS31P3JFB51PT6STDZ3YPK.jpg', 5700.00, 6, 590, 700, 9, 'هانكوك - كينيرجي إيكو 2 (K435)\n155/65 R13 T (73)', '2025-06-26 06:28:50', '2025-06-26 06:28:50'),
(42, 'اطار بيتلاس مقاس 185/60', 'e_comerce/01JYNS66MQ49VJAQK2JR28VZ9J.jpg', 2900.00, 6, 560, 340, 9, 'بيتلاس\nإطار سيارة 185/60R13 VELOX SPORT PT711 TL 80H', '2025-06-26 06:30:34', '2025-06-26 06:30:34'),
(43, 'ترانسمت اطار سياره', 'e_comerce/01JYNS9W9YWA96P6SGES51HWJQ.jpg', 5780.00, 6, 700, 800, 7, 'ترانسميت\nإطار سيارة 175/65R14 82H', '2025-06-26 06:32:34', '2025-06-26 06:32:34'),
(44, 'بنزين 80', 'e_comerce/01JYVZTT6B771KXF8C3PHMBJGW.jpg', 17.00, 3, 300, 600, 3, NULL, '2025-06-28 16:22:07', '2025-06-28 16:22:07'),
(45, 'بنزين 92', 'e_comerce/01JYW002J1PKZ8KWB1WB6NYSP9.jpg', 18.00, 3, 500, 7000, 1, NULL, '2025-06-28 16:24:59', '2025-06-28 16:24:59'),
(46, 'بنزين 95', 'e_comerce/01JYW01ZKR46G6361HXQ3ANKP9.jpg', 19.00, 3, 600, 700, 0, NULL, '2025-06-28 16:26:02', '2025-06-28 16:26:02'),
(47, 'المحرك مش بيشتغل', 'e_comerce/01JYWEKT5903PH7KRMPC7YQPQG.jpeg', 1.00, 8, 1, 1, 1, 'البطارية فاضية أو ضعيفة\nمشكلة في السلف (المارش)\nمضخة البنزين لا تعمل\nفيوزات أو كتاوتات محروقة', '2025-06-28 20:40:26', '2025-06-28 20:40:26'),
(48, 'اهتزاز أو رجّة في المحرك', 'e_comerce/01JYWEQKQVXZGCYFW61DXQG9FV.jpeg', 1.00, 8, 7000, 7000, 1, 'شمعات الاحتراق (البوجيهات) تحتاج تغيير\nضعف في البخاخات أو انسدادها\nمشاكل في الكويلات أو الحساسات', '2025-06-28 20:42:31', '2025-06-28 20:42:31'),
(49, 'سخونة المحرك', 'e_comerce/01JYWEW84JZWZ2XCKW5QVMSMZ1.jpeg', 1.00, 8, 7000, 7000, 1, 'نقص في مياه الردياتير\nتهريب مياه\nترموستات بايظة\nمروحة التبريد لا تعمل', '2025-06-28 20:45:03', '2025-06-28 20:45:03'),
(50, 'بطارية بتنزل بسرعة', 'e_comerce/01JYWF2JNRJPNRRVXEY85SH9RK.jpeg', 1.00, 8, 7000, 7000, 1, 'الدينامو لا يشحن البطارية كويس\nتسريب كهربائي في الدائرة\nالبطارية قديمة أو تالفة', '2025-06-28 20:48:30', '2025-06-28 20:48:30'),
(51, 'أضواء ضعيفة أو لا تعمل', 'e_comerce/01JYWFD4KA50V667Q69PK6CYA3.jpeg', 1.00, 8, 7000, 7000, 1, 'لمبات محروقة\nفيوزات أو كتاوتات مفصولة\nمشاكل في الأرضي (الأفياش)', '2025-06-28 20:54:16', '2025-06-28 20:54:16'),
(52, 'غاز طبيعي', 'e_comerce/01JYWGGPBBQAJ3C377381EYZFF.jpg', 7.00, 3, 7000, 8000, 1, 'السعر الحالي لغاز السيارات (CNG) في مصر مستقر عند 7 جنيه مصري لكل متر مكعب', '2025-06-28 21:13:41', '2025-06-28 21:13:41');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('3pdr6h0sHmiiGMxB3D8GpfBdcHy6chipVNVwDolJ', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTo2OntzOjY6Il90b2tlbiI7czo0MDoiQXpoSlJHSTdMb1dhNElOTWFTdjZnZmhHS2p3WXJ6bGNic2hBSkxONSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9jYXRlZ29yaWVzIjt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjE3OiJwYXNzd29yZF9oYXNoX3dlYiI7czo2MDoiJDJ5JDEyJHBJeVJHb3l0VHROc3JsbTFHbDU3RC5UNkVkNnNXTExDbFdFYXVtOWwyZ3NvaXVUSHlhOGUyIjtzOjg6ImZpbGFtZW50IjthOjA6e319', 1751156151);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_type` enum('admin','user') NOT NULL DEFAULT 'user',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `email`, `user_type`, `email_verified_at`, `password`, `created_at`, `updated_at`, `remember_token`) VALUES
(1, 'Admin ', 'user', 'Admin@gmail.com', 'admin', NULL, '$2y$12$pIyRGoytTtNsrlm1Gl57D.T6Ed6sWLLClWEaum9l2gsoiuTHya8e2', '2025-06-03 18:00:40', '2025-06-03 18:00:40', 'oW1x8abWnRAPFdixMVZW1YWwolAzyFDSA2WPCD77oisl6zv8BK9oTGsO1LTW'),
(2, 'fatma', 'hessen', 'cm674748@gmail.com', 'user', NULL, '$2y$12$NGC36y4pJTGJGoON2Jehuuxcmi3fChvQPU8fYCXVRJR8Flt5oy77O', '2025-06-27 10:30:45', '2025-06-27 10:30:45', NULL),
(3, 'fatma', 'hessen', 'fatmahessen@gmail.com', 'user', NULL, '$2y$12$wX.M98PEjmRsngnrolJH.OHZR5p/hqrc5d3HLOtVlBZIPb4bLdOzG', '2025-06-27 10:32:16', '2025-06-27 10:32:16', NULL),
(4, 'Abdulrahman', 'Ahmed', 'abdoahmedm45@gmail.com', 'user', NULL, '$2y$12$5UFjMTVzwrhAdOyZqqHXT.nybQ2nwLEy08hurgBx3S3TFTBCoFd6i', '2025-06-28 08:59:20', '2025-06-28 08:59:20', NULL),
(5, 'ALi', 'Ahmed', 'aliahmed@gmail.com', 'user', NULL, '$2y$12$.q3I1B9PxGh4F0XGDm2m9OXSPCg5FuKs8IBeh17nphCFs6m.sgNDu', '2025-06-28 09:17:30', '2025-06-28 09:17:30', NULL),
(6, 'fatma', 'Hessen', 'fatmahesen@gmail.com', 'user', NULL, '$2y$12$B.iaDYtvCjMpoeU.PWSD1ueUIDmOE6oaELyTcbsZ5u7ehX6yLY4lG', '2025-06-28 17:47:53', '2025-06-28 17:47:53', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_items_user_id_foreign` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contacts_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
--
-- Database: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Table structure for table `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `dbase` varchar(255) NOT NULL DEFAULT '',
  `user` varchar(255) NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `query` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Table structure for table `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) NOT NULL,
  `col_name` varchar(64) NOT NULL,
  `col_type` varchar(64) NOT NULL,
  `col_length` text DEFAULT NULL,
  `col_collation` varchar(64) NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) DEFAULT '',
  `col_default` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Table structure for table `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `column_name` varchar(64) NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `transformation` varchar(255) NOT NULL DEFAULT '',
  `transformation_options` varchar(255) NOT NULL DEFAULT '',
  `input_transformation` varchar(255) NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) NOT NULL,
  `settings_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

-- --------------------------------------------------------

--
-- Table structure for table `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL,
  `export_type` varchar(10) NOT NULL,
  `template_name` varchar(64) NOT NULL,
  `template_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

-- --------------------------------------------------------

--
-- Table structure for table `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Table structure for table `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db` varchar(64) NOT NULL DEFAULT '',
  `table` varchar(64) NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) NOT NULL,
  `item_name` varchar(64) NOT NULL,
  `item_type` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- Table structure for table `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Dumping data for table `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('root', '[{\"db\":\"desertresque\",\"table\":\"users\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) NOT NULL DEFAULT '',
  `master_table` varchar(64) NOT NULL DEFAULT '',
  `master_field` varchar(64) NOT NULL DEFAULT '',
  `foreign_db` varchar(64) NOT NULL DEFAULT '',
  `foreign_table` varchar(64) NOT NULL DEFAULT '',
  `foreign_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Table structure for table `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `search_name` varchar(64) NOT NULL DEFAULT '',
  `search_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `display_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `prefs` text NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

-- --------------------------------------------------------

--
-- Table structure for table `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text NOT NULL,
  `schema_sql` text DEFAULT NULL,
  `data_sql` longtext DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Dumping data for table `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2025-06-29 03:17:29', '{\"Console\\/Mode\":\"collapse\",\"NavigationWidth\":284}');

-- --------------------------------------------------------

--
-- Table structure for table `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) NOT NULL,
  `tab` varchar(64) NOT NULL,
  `allowed` enum('Y','N') NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Table structure for table `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) NOT NULL,
  `usergroup` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Indexes for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Indexes for table `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Indexes for table `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Indexes for table `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Indexes for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Indexes for table `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Indexes for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Indexes for table `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Indexes for table `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Indexes for table `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Indexes for table `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Indexes for table `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Indexes for table `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
