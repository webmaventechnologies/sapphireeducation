-- phpMyAdmin SQL Dump
-- version 3.2.0.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 11, 2013 at 02:17 PM
-- Server version: 5.1.36
-- PHP Version: 5.3.0

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `registration`
--
CREATE DATABASE `registration` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `registration`;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `username`, `password`, `role`) VALUES
(1, 'pritesh', 'pritesh@admin', 1),
(2, 'darpan', 'darpan@admin', 1);

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE IF NOT EXISTS `registration` (
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `s_id` varchar(11) NOT NULL,
  `father_name` varchar(50) NOT NULL,
  `date` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `mobile_1` bigint(11) NOT NULL,
  `mobile_2` bigint(11) NOT NULL,
  `house_no` varchar(20) NOT NULL,
  `street_name` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `state` varchar(20) NOT NULL,
  `pincode` int(10) NOT NULL,
  `country` varchar(20) NOT NULL,
  `institute_name` varchar(40) NOT NULL,
  `course_name` varchar(20) NOT NULL,
  `date_of_joining` varchar(20) NOT NULL,
  `course_duration` varchar(30) NOT NULL,
  `total_fees` int(10) NOT NULL,
  `advance_paid` int(10) NOT NULL,
  `comment` varchar(1000) NOT NULL,
  `IP` varchar(20) NOT NULL,
  PRIMARY KEY (`s_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`first_name`, `last_name`, `s_id`, `father_name`, `date`, `email`, `password`, `mobile_1`, `mobile_2`, `house_no`, `street_name`, `city`, `state`, `pincode`, `country`, `institute_name`, `course_name`, `date_of_joining`, `course_duration`, `total_fees`, `advance_paid`, `comment`, `IP`) VALUES
('nikunj', 'Jain', 'SI_1008', 'kanhaiyalal', '11-08-2013', 'nikunj.star91@gmail.com', '', 9870042911, 9870042911, '101', 'zakeria Road', 'mumbai', 'maharashtra', 400078, 'India', 'Sapphire', 'test1', '01-05-2013', '2 Year', 10000, 10000, 'test comment', '127.0.0.1'),
('Darpan', 'jain', 'hello3', 'lkdjf', '11-08-2013', 'test@123.com', 'laxmi', 9987472419, 123, 'djdj', 'kdsjf', 'sdjf', 'sdfj', 232, 'KJDF', 'Sapphire Education', 'test4', 'sdkjf', '1212', 121, 121, '', '127.0.0.1'),
('Kanhaiyalal Jain', 'jain', 'hello5', '12-07-2013', '11-08-2013', 'abc@123.com', 'sldfj', 123, 123, 'djdj', 'kdsjf', 'sdjf', 'sdfj', 232, 'KJDF', 'kdfj', 'test6', 'sdkjf', '1212', 121, 121, '', '127.0.0.1'),
('tarun', 'jain', 'hello6', '12-07-2013', '27-07-2013', 'admin@admin.com', '9320526260', 2147483647, 0, 'djdj', 'kdsjf', 'sdjf', 'sdfj', 232, 'KJDF', 'kdfj', 'test7', 'sdkjf', '1212', 121, 121, '', '127.0.0.1'),
('Tapsvi ', 'oza', 'ELE1001', 'bhramadutta', '28-07-2013', 'tapasviojha@gmail.com', '123', 9324241424, 9324241424, '8/2 malad socity', 'ranisati marg', 'mumbai', 'maharashtra', 400097, 'india', 'xlri', 'Electronics', '01-02-2013', '12', 120000, 20000, '', '127.0.0.1'),
('admin', 'admin', 'admin', 'admin', 'admin', 'admin@sapphireeducation.in', 'admin', 9821123724, 9821123724, 'admin', 'admin', 'mumbai', 'maharashtra', 400055, 'India', 'Sapphire Education', 'admin', '01/07/2013', '1', 0, 0, '', '127.0.0.1'),
('tarun', 'jain', 'SI_1001', 'kanhaiyalal', '28-07-2013', 'nikunjjain1991@facebook.com', 'admin', 2147483647, 2147483647, 'Mahavir', 'zakeria', 'mumbai', 'maharashtra', 400064, 'India', 'met', 'dac', '07-03-2013', '6', 100000, 50000, '', '127.0.0.1'),
('tarun', 'jain', 'SI_1002', 'kanhaiyalal jain', '12-07-2013', 'nikunjjain1991', 'admin', 2147483647, 2147483647, 'Mahavir Darshan b/60', 'zakeria road', 'mumbai', 'maharashtra', 400064, 'India', 'met', 'dac', '07-03-2013', '6', 100000, 50000, '', '127.0.0.1'),
('Supriya ', 'Jain', 'CS1001', 'Yashwant Jain', '28-07-2013', 'casupriyajain09@gmail.com', 'CS1001', 7666277225, 7666277225, 'B/601,Mahavir Darsha', 'Zakeria Road', 'Mumbai', 'Maharashtra', 400064, 'India', 'Sapphire Education', 'Company Secretary', '01-08-2013', '24', 250000, 100000, '', '127.0.0.1'),
('Pritesh', 'Jain', 'MBA1005', 'Sohanlal Jain', '04-08-2013', 'pritesh@gmail.com', 'Next Installment Due', 1234567890, 1234567890, 'Rose villa', 'Jasmin Street', 'Mumbai', 'Maharashtra', 400095, 'India', 'Sapphire Education', 'MBA', '01-01-1988', '24', 500000, 100000, '', '127.0.0.1');

-- --------------------------------------------------------

--
-- Table structure for table `sapphire_master`
--

CREATE TABLE IF NOT EXISTS `sapphire_master` (
  `id` int(11) NOT NULL,
  `Notice` varchar(1000) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sapphire_master`
--

INSERT INTO `sapphire_master` (`id`, `Notice`) VALUES
(1, 'Happy Diwali to all the Students');
