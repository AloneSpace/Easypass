-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 192.168.1.43
-- Generation Time: Mar 07, 2020 at 12:22 PM
-- Server version: 10.4.12-MariaDB-1:10.4.12+maria~bionic
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `easypassDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `id` int(255) NOT NULL,
  `username` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `password` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `fullname` text COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `username`, `password`, `fullname`, `type`) VALUES
(1, 'admin', '$2b$10$tx3HH.hC5JT36iTTgTYV0uZ9GUuxV.4fHRIrEGCsWOb77ekRVKPHm', 'Super admin', 'super_admin'),
(7, 'testalone', '$2b$10$ezuN.Iuw1bnYHA8bUwfGNeNwEv8WVtgFicjVRg/xLgmDepRXUNBg.', 'Elon Musk lnwsusu', 'user'),
(8, 'elon', '$2b$10$q93JKqZS6gS06BLCztGuye7Ici9tAyJmWNuI68GfzBZ6Ccn76aY3a', 'Tesla', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `mainDB`
--

CREATE TABLE `mainDB` (
  `vehicleID` varchar(13) COLLATE utf8_unicode_ci NOT NULL,
  `citizenID` varchar(13) COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` text COLLATE utf8_unicode_ci NOT NULL,
  `vehicleRegistration` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `vehicleType` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `entryDate` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `exitDate` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `comment` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `writeBy` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mainDB`
--
ALTER TABLE `mainDB`
  ADD PRIMARY KEY (`vehicleID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
