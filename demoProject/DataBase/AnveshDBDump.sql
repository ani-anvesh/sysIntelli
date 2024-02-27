CREATE DATABASE  IF NOT EXISTS `sysintelli` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sysintelli`;
-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (x86_64)
--
-- Host: localhost    Database: sysintelli
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Auth`
--

DROP TABLE IF EXISTS `Auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Auth` (
  `email` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `JWTtoken` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Auth`
--

LOCK TABLES `Auth` WRITE;
/*!40000 ALTER TABLE `Auth` DISABLE KEYS */;
INSERT INTO `Auth` VALUES ('postme@gmail.com','Ani@2000','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBvc3RtZUBnbWFpbC5jb20iLCJpYXQiOjE3MDkwMDY5MDIsImV4cCI6MTcwOTAwNzAyMn0.M7kcabh3n1pV7aNOxvx2ppRimUy6lylbrAvKJDY3R9Y');
/*!40000 ALTER TABLE `Auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_visit`
--

DROP TABLE IF EXISTS `person_visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_visit` (
  `vist_id` int NOT NULL,
  `pro_consession` int NOT NULL,
  `pro_name` varchar(255) DEFAULT NULL,
  `pro_qty` int NOT NULL,
  `pro_rate` int NOT NULL,
  `receipt_id` int NOT NULL,
  `ref_consession` int NOT NULL,
  `ref_name` varchar(255) DEFAULT NULL,
  `ref_qty` int NOT NULL,
  `ref_rate` int NOT NULL,
  `time_stamp` varchar(255) DEFAULT NULL,
  `visit_address` varchar(255) DEFAULT NULL,
  `person_id` int DEFAULT NULL,
  `pdfURL` varchar(2048) NOT NULL,
  PRIMARY KEY (`vist_id`),
  KEY `FK3bxdnuxp3s8ndxx43p4hp5rfv` (`person_id`),
  CONSTRAINT `FK3bxdnuxp3s8ndxx43p4hp5rfv` FOREIGN KEY (`person_id`) REFERENCES `personal_details` (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_visit`
--

LOCK TABLES `person_visit` WRITE;
/*!40000 ALTER TABLE `person_visit` DISABLE KEYS */;
/*!40000 ALTER TABLE `person_visit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_details`
--

DROP TABLE IF EXISTS `personal_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_details` (
  `person_id` int NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `person_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_details`
--

LOCK TABLES `personal_details` WRITE;
/*!40000 ALTER TABLE `personal_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `s3files`
--

DROP TABLE IF EXISTS `s3files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `s3files` (
  `fileName` varchar(255) DEFAULT NULL,
  `s3URL` varchar(1024) DEFAULT NULL,
  `person_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `s3files`
--

LOCK TABLES `s3files` WRITE;
/*!40000 ALTER TABLE `s3files` DISABLE KEYS */;
INSERT INTO `s3files` VALUES ('Image Spiderman.jpg','https://sysintelli-receipts-bucket.s3.us-east-2.amazonaws.com/Image%20Spiderman.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVRUVRT2OPWG6MOLE%2F20240227%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20240227T040752Z&X-Amz-Expires=900&X-Amz-Signature=42f30c3afeafbb24a556251702f013b3d86d9abf80c12b1972e026b59cf70237&X-Amz-SignedHeaders=host&x-id=GetObject','Anvesh'),('I-20.pdf','https://sysintelli-receipts-bucket.s3.us-east-2.amazonaws.com/I-20.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVRUVRT2OPWG6MOLE%2F20240227%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20240227T040851Z&X-Amz-Expires=900&X-Amz-Signature=edb76a1e233f0d451901e4c9a9db4f5f4f4b53c5fc055c12294798d95be5f49d&X-Amz-SignedHeaders=host&x-id=GetObject','Anvesh');
/*!40000 ALTER TABLE `s3files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sysintelli'
--

--
-- Dumping routines for database 'sysintelli'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-27  9:46:55
