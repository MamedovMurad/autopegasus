-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2020 at 11:29 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `autopegasus`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bans`
--

CREATE TABLE `bans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ban_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ban_slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `car_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `car_slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `car_price` double(8,2) NOT NULL,
  `motor_size` int(11) NOT NULL,
  `start_production_year` int(11) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL,
  `fuel_type_id` bigint(20) UNSIGNED NOT NULL,
  `gear_box_id` bigint(20) UNSIGNED NOT NULL,
  `differ_id` bigint(20) UNSIGNED NOT NULL,
  `car_detail` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `ban_id` bigint(20) UNSIGNED NOT NULL,
  `used_km` int(11) NOT NULL,
  `color_id` bigint(20) UNSIGNED NOT NULL,
  `city_id` bigint(20) UNSIGNED NOT NULL,
  `car_photo_id` bigint(20) UNSIGNED NOT NULL,
  `sell_type_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `car_colors`
--

CREATE TABLE `car_colors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `color_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color_slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `car_photos`
--

CREATE TABLE `car_photos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `img_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `car_supplies`
--

CREATE TABLE `car_supplies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sell_type_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sell_type_slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `car_supply_connects`
--

CREATE TABLE `car_supply_connects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `car_id` bigint(20) UNSIGNED NOT NULL,
  `car_supply_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `city_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city_slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers_cars`
--

CREATE TABLE `customers_cars` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `car_price` double(8,2) NOT NULL,
  `motor_size` int(11) NOT NULL,
  `start_production_year` int(11) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL,
  `fuel_type_id` bigint(20) UNSIGNED NOT NULL,
  `gear_box_id` bigint(20) UNSIGNED NOT NULL,
  `differ_id` bigint(20) UNSIGNED NOT NULL,
  `ban_id` bigint(20) UNSIGNED NOT NULL,
  `used_km` int(11) NOT NULL,
  `color_id` bigint(20) UNSIGNED NOT NULL,
  `city_id` bigint(20) UNSIGNED NOT NULL,
  `car_photo_id` bigint(20) UNSIGNED NOT NULL,
  `sell_type_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `differs`
--

CREATE TABLE `differs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `differ_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `differ_slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fuel_types`
--

CREATE TABLE `fuel_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fuel_type_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fuel_type_slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gear_boxes`
--

CREATE TABLE `gear_boxes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `gear_box_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gear_box_slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `makes`
--

CREATE TABLE `makes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `make_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `make_slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2020_11_26_112004_admin', 1),
(2, '2020_11_29_144148_make', 1),
(3, '2020_11_29_145229_model', 1),
(4, '2020_11_30_054028_bans', 1),
(5, '2020_11_30_064826_gear_box', 1),
(6, '2020_11_30_070751_fuel_type', 1),
(7, '2020_11_30_070859_differ', 1),
(8, '2020_11_30_071134_car_color', 1),
(9, '2020_11_30_071206_city', 1),
(10, '2020_11_30_071240_car_photo', 1),
(11, '2020_11_30_071313_sell_type', 1),
(12, '2020_11_30_071506_car_supply', 1),
(13, '2020_11_30_080335_customers_car', 1),
(14, '2020_11_30_054623_cars', 2),
(15, '2020_11_30_071421_car_supply_connect', 2);

-- --------------------------------------------------------

--
-- Table structure for table `models`
--

CREATE TABLE `models` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `model_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `make_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sell_types`
--

CREATE TABLE `sell_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sell_type_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sell_type_slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bans`
--
ALTER TABLE `bans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cars_model_id_foreign` (`model_id`),
  ADD KEY `cars_fuel_type_id_foreign` (`fuel_type_id`),
  ADD KEY `cars_gear_box_id_foreign` (`gear_box_id`),
  ADD KEY `cars_differ_id_foreign` (`differ_id`),
  ADD KEY `cars_ban_id_foreign` (`ban_id`),
  ADD KEY `cars_color_id_foreign` (`color_id`),
  ADD KEY `cars_city_id_foreign` (`city_id`),
  ADD KEY `cars_car_photo_id_foreign` (`car_photo_id`),
  ADD KEY `cars_sell_type_id_foreign` (`sell_type_id`);

--
-- Indexes for table `car_colors`
--
ALTER TABLE `car_colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_photos`
--
ALTER TABLE `car_photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_supplies`
--
ALTER TABLE `car_supplies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_supply_connects`
--
ALTER TABLE `car_supply_connects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `car_supply_connects_car_id_foreign` (`car_id`),
  ADD KEY `car_supply_connects_car_supply_id_foreign` (`car_supply_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers_cars`
--
ALTER TABLE `customers_cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `differs`
--
ALTER TABLE `differs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fuel_types`
--
ALTER TABLE `fuel_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gear_boxes`
--
ALTER TABLE `gear_boxes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `makes`
--
ALTER TABLE `makes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `models`
--
ALTER TABLE `models`
  ADD PRIMARY KEY (`id`),
  ADD KEY `models_make_id_foreign` (`make_id`);

--
-- Indexes for table `sell_types`
--
ALTER TABLE `sell_types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bans`
--
ALTER TABLE `bans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_colors`
--
ALTER TABLE `car_colors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_photos`
--
ALTER TABLE `car_photos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_supplies`
--
ALTER TABLE `car_supplies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_supply_connects`
--
ALTER TABLE `car_supply_connects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers_cars`
--
ALTER TABLE `customers_cars`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `differs`
--
ALTER TABLE `differs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fuel_types`
--
ALTER TABLE `fuel_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gear_boxes`
--
ALTER TABLE `gear_boxes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `makes`
--
ALTER TABLE `makes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `models`
--
ALTER TABLE `models`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sell_types`
--
ALTER TABLE `sell_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `cars_ban_id_foreign` FOREIGN KEY (`ban_id`) REFERENCES `bans` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cars_car_photo_id_foreign` FOREIGN KEY (`car_photo_id`) REFERENCES `car_photos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cars_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cars_color_id_foreign` FOREIGN KEY (`color_id`) REFERENCES `car_colors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cars_differ_id_foreign` FOREIGN KEY (`differ_id`) REFERENCES `differs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cars_fuel_type_id_foreign` FOREIGN KEY (`fuel_type_id`) REFERENCES `fuel_types` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cars_gear_box_id_foreign` FOREIGN KEY (`gear_box_id`) REFERENCES `gear_boxes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cars_model_id_foreign` FOREIGN KEY (`model_id`) REFERENCES `models` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cars_sell_type_id_foreign` FOREIGN KEY (`sell_type_id`) REFERENCES `sell_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `car_supply_connects`
--
ALTER TABLE `car_supply_connects`
  ADD CONSTRAINT `car_supply_connects_car_id_foreign` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `car_supply_connects_car_supply_id_foreign` FOREIGN KEY (`car_supply_id`) REFERENCES `car_supplies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `models`
--
ALTER TABLE `models`
  ADD CONSTRAINT `models_make_id_foreign` FOREIGN KEY (`make_id`) REFERENCES `makes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
