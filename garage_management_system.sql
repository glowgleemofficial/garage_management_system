-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 31, 2024 at 11:02 AM
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
-- Database: `garage_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `vehicle` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `contact` int(25) NOT NULL,
  `deals` varchar(20) NOT NULL,
  `customer` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `vehicle`, `description`, `date`, `contact`, `deals`, `customer`) VALUES
(1, '0', '0', '0', '0000-00-00', 487594387, 'Pending', 'old'),
(2, '0', '0', '0', '0000-00-00', 487594387, 'Pending', 'old'),
(3, 'testname', 'testvehicle', 'Testdescriptionskhd', '0000-00-00', 487594387, 'Pending', 'old'),
(4, 'sdasd', 'Crane: 50-Ton', 'asdsad', '2024-08-07', 0, 'Done', 'Old');

-- --------------------------------------------------------

--
-- Table structure for table `employeesalaary`
--

CREATE TABLE `employeesalaary` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `job_title` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `salary` decimal(10,2) NOT NULL,
  `salary_status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employeesalaary`
--

INSERT INTO `employeesalaary` (`id`, `name`, `job_title`, `date`, `salary`, `salary_status`) VALUES
(18, 'maijid', 'Crane operator', '2024-08-06', 300000.00, 'Pending'),
(19, 'sdsd', 'Crane operator', '2024-08-22', 213123.00, 'Pending'),
(20, 'next tes', 'Forklift operator', '2024-08-05', 2333.00, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `employee_task`
--

CREATE TABLE `employee_task` (
  `id` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `location` varchar(50) NOT NULL,
  `task` varchar(50) NOT NULL,
  `work_hours` int(10) NOT NULL,
  `date` date NOT NULL,
  `time` time(6) NOT NULL,
  `task_status` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_task`
--

INSERT INTO `employee_task` (`id`, `name`, `location`, `task`, `work_hours`, `date`, `time`, `task_status`) VALUES
(1, 'testname', 'Wah Cantt', 'xyz task is working', 10, '0000-00-00', '00:00:00.000000', 'Pending'),
(2, 'task1', 'g 11 4', 'sdasd', 2, '2024-08-05', '00:00:00.000000', 'Completed'),
(3, 'alevera', 'g 11 4', 'sdasd', 3, '2024-07-31', '00:00:00.000000', 'Completed'),
(4, 'asdsadsssss', 'asdasd', 'qed', 2, '2024-08-07', '00:00:00.000000', 'Pending'),
(5, 'asasd', 'asdasd', 'asasd', 3, '2024-08-29', '23:44:00.000000', 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` int(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `vehicle` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `amount` int(50) NOT NULL,
  `payment_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `name`, `vehicle`, `description`, `date`, `amount`, `payment_status`) VALUES
(1, 'testname', 'testvehicle', 'tesj;ksjlsfhsakj', '0000-00-00', 56456, 'Pending'),
(2, 'sdsd', 'Crane: 50-Ton', 'sadasd', '2024-08-05', 334234, 'Online'),
(3, 'sd', 'Crane: 50-Ton', 'asdasd', '2024-08-05', 23423, 'Online');

-- --------------------------------------------------------

--
-- Table structure for table `income`
--

CREATE TABLE `income` (
  `id` int(11) NOT NULL,
  `name` varchar(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `salary` int(50) NOT NULL,
  `salary_status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `income`
--

INSERT INTO `income` (`id`, `name`, `description`, `date`, `salary`, `salary_status`) VALUES
(1, '0', 'testDescription', '0000-00-00', 56534, 'Online'),
(2, 'testname', 'testDescription', '0000-00-00', 56534, 'Online'),
(3, 'testname', 'testDescription', '0000-00-00', 56534, 'Online'),
(4, 'testname', 'testDescription', '0000-00-00', 56534, 'Online'),
(5, 'knasd', 'adasd', '2024-08-05', 234234, 'Pending'),
(6, 'knasd', 'adasd', '2024-08-05', 234234, 'Pending'),
(7, 'sd', '23asdas', '2024-08-05', 2343, 'Paid');

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `id` int(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `vehicle` varchar(50) NOT NULL,
  `description` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `time` time(6) NOT NULL,
  `advance` int(50) NOT NULL,
  `pending` int(50) NOT NULL,
  `project_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`id`, `name`, `vehicle`, `description`, `date`, `time`, `advance`, `pending`, `project_status`) VALUES
(1, 'testname', 'testvehicle', 'Testdescriptionskhd', '0000-00-00', '00:00:00.000000', 8738, 476496, 'complete'),
(2, 'adasd', 'Crane: 50-Ton', 'asd', '2024-08-01', '00:00:00.000000', 234, 234, 'Pending'),
(3, 'aaa', 'Crane: 25-Ton', 'aaaa', '2024-07-31', '00:00:00.000000', 22222, 2222, 'Complete'),
(4, 'sadasd', 'Crane: 50-Ton', 'sdasd', '2024-08-07', '00:19:00.000000', 3234, 234234, 'Complete'),
(5, 'sadasd', 'Crane: 50-Ton', 'sdasd', '2024-08-07', '16:23:00.000000', 3234, 234234, 'Complete'),
(6, 'sadasd', 'Crane: 50-Ton', 'sdasd', '2024-08-07', '21:24:00.000000', 3234, 234234, 'Complete'),
(7, 'sadasd', 'Crane: 50-Ton', 'sdasd', '2024-08-07', '14:29:00.000000', 3234, 234234, 'Complete');

-- --------------------------------------------------------

--
-- Table structure for table `pending`
--

CREATE TABLE `pending` (
  `id` int(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `location` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `advance` int(50) NOT NULL,
  `pending` int(50) NOT NULL,
  `total` int(50) NOT NULL,
  `payment_status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pending`
--

INSERT INTO `pending` (`id`, `name`, `location`, `date`, `advance`, `pending`, `total`, `payment_status`) VALUES
(1, 'testname', 'wah cantt', '0000-00-00', 324566, 5645, 3463, 'Pending'),
(2, 'asdsad', 'asddsa', '2024-08-07', 32423, 234234, 34234, 'Successful');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `vehicle` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `location` varchar(50) NOT NULL,
  `charges` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `name`, `vehicle`, `description`, `date`, `location`, `charges`) VALUES
(1, 'testname', 'testvehicles', 'tsetskfhdjkfsdghkfghskj', '0000-00-00', 'wah', 56765),
(2, 'asdasd', 'Crane: 50-Ton', 'asdasd', '2024-08-05', 'aaaaa', 234234),
(3, 'sdsd', 'Crane: 50-Ton', 'asdasd', '2024-08-09', 'asdas', 234234);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employeesalaary`
--
ALTER TABLE `employeesalaary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_task`
--
ALTER TABLE `employee_task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `income`
--
ALTER TABLE `income`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pending`
--
ALTER TABLE `pending`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employeesalaary`
--
ALTER TABLE `employeesalaary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `employee_task`
--
ALTER TABLE `employee_task`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `income`
--
ALTER TABLE `income`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `pending`
--
ALTER TABLE `pending`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
