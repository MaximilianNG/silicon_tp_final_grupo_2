CREATE DATABASE  IF NOT EXISTS `registrodetorneos` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `registrodetorneos`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: registrodetorneos
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(45) NOT NULL,
  `contraseña` varchar(45) NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_UNIQUE` (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamentos`
--

DROP TABLE IF EXISTS `departamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamentos`
--

LOCK TABLES `departamentos` WRITE;
/*!40000 ALTER TABLE `departamentos` DISABLE KEYS */;
INSERT INTO `departamentos` VALUES (1,'capital'),(2,'libertador general san martin');
/*!40000 ALTER TABLE `departamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipos`
--

DROP TABLE IF EXISTS `equipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `id_juego` int NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  KEY `ID_JUEGO_idx` (`id_juego`),
  CONSTRAINT `EQUIPOS_ID_JUEGO` FOREIGN KEY (`id_juego`) REFERENCES `juegos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos`
--

LOCK TABLES `equipos` WRITE;
/*!40000 ALTER TABLE `equipos` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipos_sponsors`
--

DROP TABLE IF EXISTS `equipos_sponsors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipos_sponsors` (
  `id_equipos_sponsors` int NOT NULL AUTO_INCREMENT,
  `id_equipo` int NOT NULL,
  `id_sponsor` int NOT NULL,
  PRIMARY KEY (`id_equipos_sponsors`),
  KEY `EQUIPOS_SPONSORS_ID_EQUIPO_idx` (`id_equipo`),
  KEY `EQUIPOS_SPONSORS_ID_SPONSOR_idx` (`id_sponsor`),
  CONSTRAINT `EQUIPOS_SPONSORS_ID_EQUIPO` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id`),
  CONSTRAINT `EQUIPOS_SPONSORS_ID_SPONSOR` FOREIGN KEY (`id_sponsor`) REFERENCES `sponsors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos_sponsors`
--

LOCK TABLES `equipos_sponsors` WRITE;
/*!40000 ALTER TABLE `equipos_sponsors` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipos_sponsors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juegos`
--

DROP TABLE IF EXISTS `juegos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juegos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juegos`
--

LOCK TABLES `juegos` WRITE;
/*!40000 ALTER TABLE `juegos` DISABLE KEYS */;
/*!40000 ALTER TABLE `juegos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jugadores`
--

DROP TABLE IF EXISTS `jugadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jugadores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `nombre_profesional` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `id_localidad` int NOT NULL,
  `id_equipo` int NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `nombre_profesional_UNIQUE` (`nombre_profesional`),
  KEY `ID_LOCALIDAD_idx` (`id_localidad`),
  KEY `ID_EQUIPO_idx` (`id_equipo`),
  CONSTRAINT `JUGADORES_ID_EQUIPO` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id`),
  CONSTRAINT `JUGADORES_ID_LOCALIDAD` FOREIGN KEY (`id_localidad`) REFERENCES `localidades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jugadores`
--

LOCK TABLES `jugadores` WRITE;
/*!40000 ALTER TABLE `jugadores` DISABLE KEYS */;
/*!40000 ALTER TABLE `jugadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localidades`
--

DROP TABLE IF EXISTS `localidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localidades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `id_departamento` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ID_DEPARTAMENTO_idx` (`id_departamento`),
  CONSTRAINT `LOCALIDADES_ID_DEPARTAMENTO` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localidades`
--

LOCK TABLES `localidades` WRITE;
/*!40000 ALTER TABLE `localidades` DISABLE KEYS */;
/*!40000 ALTER TABLE `localidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sponsors`
--

DROP TABLE IF EXISTS `sponsors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sponsors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sponsors`
--

LOCK TABLES `sponsors` WRITE;
/*!40000 ALTER TABLE `sponsors` DISABLE KEYS */;
/*!40000 ALTER TABLE `sponsors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `torneos`
--

DROP TABLE IF EXISTS `torneos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `torneos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `id_juego` int NOT NULL,
  `id_localidad` int NOT NULL,
  `id_primerPuesto` int NOT NULL,
  `id_segundoPuesto` int NOT NULL,
  `id_tercerPuesto` int NOT NULL,
  `estado` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `ID_JUEGO_idx` (`id_juego`),
  KEY `ID_LOCALIDAD_idx` (`id_localidad`),
  KEY `ID_PRIMER_PUESTO_idx` (`id_primerPuesto`),
  KEY `ID_SEGUNDO_PUESTO_idx` (`id_segundoPuesto`),
  KEY `ID_TERCER_PUESTO_idx` (`id_tercerPuesto`),
  CONSTRAINT `TORNEOS_ID_JUEGO` FOREIGN KEY (`id_juego`) REFERENCES `juegos` (`id`),
  CONSTRAINT `TORNEOS_ID_LOCALIDAD` FOREIGN KEY (`id_localidad`) REFERENCES `localidades` (`id`),
  CONSTRAINT `TORNEOS_ID_PRIMER_PUESTO` FOREIGN KEY (`id_primerPuesto`) REFERENCES `equipos` (`id`),
  CONSTRAINT `TORNEOS_ID_SEGUNDO_PUESTO` FOREIGN KEY (`id_segundoPuesto`) REFERENCES `equipos` (`id`),
  CONSTRAINT `TORNEOS_ID_TERCER_PUESTO` FOREIGN KEY (`id_tercerPuesto`) REFERENCES `equipos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `torneos`
--

LOCK TABLES `torneos` WRITE;
/*!40000 ALTER TABLE `torneos` DISABLE KEYS */;
/*!40000 ALTER TABLE `torneos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `torneos_sponsors`
--

DROP TABLE IF EXISTS `torneos_sponsors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `torneos_sponsors` (
  `id_torneos_sponsors` int NOT NULL AUTO_INCREMENT,
  `id_torneo` int NOT NULL,
  `id_sponsor` int NOT NULL,
  PRIMARY KEY (`id_torneos_sponsors`),
  KEY `TORNEOS_SPONSORS_ID_TORNEO_idx` (`id_torneo`),
  KEY `TORNEOS_SPONSOROS_ID_SPONSOR_idx` (`id_sponsor`),
  CONSTRAINT `TORNEOS_SPONSOROS_ID_SPONSOR` FOREIGN KEY (`id_sponsor`) REFERENCES `sponsors` (`id`),
  CONSTRAINT `TORNEOS_SPONSORS_ID_TORNEO` FOREIGN KEY (`id_torneo`) REFERENCES `torneos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `torneos_sponsors`
--

LOCK TABLES `torneos_sponsors` WRITE;
/*!40000 ALTER TABLE `torneos_sponsors` DISABLE KEYS */;
/*!40000 ALTER TABLE `torneos_sponsors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-14 20:11:47
