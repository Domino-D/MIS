-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2018-08-13 10:53:45
-- 服务器版本： 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mis`
--

-- --------------------------------------------------------

--
-- 表的结构 `partsdata`
--

CREATE TABLE `partsdata` (
  `id` int(20) UNSIGNED NOT NULL,
  `original` varchar(50) NOT NULL,
  `material` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `vandor` varchar(50) NOT NULL,
  `contributor` varchar(50) NOT NULL,
  `creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `marks` varchar(50) DEFAULT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `partsdata`
--

INSERT INTO `partsdata` (`id`, `original`, `material`, `description`, `vandor`, `contributor`, `creation`, `marks`, `status`) VALUES
(2, '912345', '112345', 'mech.seal', 'fristam', 'root@fisheep.com', '2018-07-17 21:39:09', '', 'closed'),
(3, '9123456', '1123456', 'seal ring', 'waukesha', 'root@fisheep.com', '2018-08-08 21:31:12', '', 'closed'),
(10, '77768', '17168', 'adfasfaa', 'asdf', 'root@fisheep.com', '2018-07-17 21:40:58', 'null', 'closed'),
(6, '9123490', '1123490', 'aadf', 'adsfa', 'root@fisheep.com', '2018-08-08 21:33:55', '', 'closed'),
(7, '78124', '18124', 'fdsaf', 'fasd', 'admin@fisheep.com', '2018-07-16 22:40:05', '', 'active'),
(8, '88124', '98124', 'adsf', 'adsf', 'admin@fisheep.com', '2018-07-16 22:45:59', '', 'closed'),
(9, '01999', '11999', 'asfd', 'fasdf', 'admin@fisheep.com', '2018-07-16 23:13:20', '', 'active');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `id` int(2) UNSIGNED NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `identity` varchar(10) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `identity`, `time`) VALUES
(1, 'root@fisheep.com', '6bf3004448d815caff2d1d03e4fdc38b', 'root', '2018-07-05 00:47:55'),
(2, 'admin@fisheep.com', 'd7c6c07a0a04ba4e65921e2f90726384', 'admin', '2018-07-05 01:13:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `partsdata`
--
ALTER TABLE `partsdata`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `original` (`original`,`material`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `partsdata`
--
ALTER TABLE `partsdata`
  MODIFY `id` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(2) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
