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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin1','admin1',1),(2,'admin2','admin2',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamentos`
--

LOCK TABLES `departamentos` WRITE;
/*!40000 ALTER TABLE `departamentos` DISABLE KEYS */;
INSERT INTO `departamentos` VALUES (1,'Capital'),(2,'Libertador General San Martín'),(3,'Oberá'),(4,'Iguazú'),(5,'Eldorado'),(6,'Guaraní'),(7,'San Ignacio'),(8,'Cainguás'),(9,'Leandro N. Alem'),(10,'General Manuel Belgrano'),(11,'Apóstoles'),(12,'Montecarlo'),(13,'San Pedro'),(14,'25 de Mayo'),(15,'Candelaria'),(16,'San Javier'),(17,'Concepción');
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos`
--

LOCK TABLES `equipos` WRITE;
/*!40000 ALTER TABLE `equipos` DISABLE KEYS */;
INSERT INTO `equipos` VALUES (1,'Banzai',2,1),(2,'Crimson',1,1),(3,'Toxic',1,1),(4,'Gecko',1,0),(5,'Wasps',2,1),(6,'Silver',2,1),(7,'Kamikaze',2,1),(8,'Delta',2,0),(9,'Commando',3,1),(11,'El Nuevo Equipo',2,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos_sponsors`
--

LOCK TABLES `equipos_sponsors` WRITE;
/*!40000 ALTER TABLE `equipos_sponsors` DISABLE KEYS */;
INSERT INTO `equipos_sponsors` VALUES (2,1,2),(3,2,1),(4,3,4),(5,5,2),(6,6,3),(7,7,1),(8,3,7),(9,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juegos`
--

LOCK TABLES `juegos` WRITE;
/*!40000 ALTER TABLE `juegos` DISABLE KEYS */;
INSERT INTO `juegos` VALUES (1,'League of Legends',1),(2,'Valorant',1),(3,'CS: GO',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jugadores`
--

LOCK TABLES `jugadores` WRITE;
/*!40000 ALTER TABLE `jugadores` DISABLE KEYS */;
INSERT INTO `jugadores` VALUES (1,'Verónica','Rodenas','VR','veronicarodenas@gmail.com',1,1,1),(2,'Jamila','Montes','JaMon','jamilamontes@gmail.com',2,1,1),(3,'Juan','Cervera','Cerveza','juancervera@gmail.com',1,1,1),(4,'Nayara','Navas','Nay','nayaranavas@gmail.com',2,1,1),(5,'Fabio','Nogales','Fauno','fabionogales@gmail.com',3,1,1),(6,'Leticia','Valles','Levyy','leticiavalles@gmail.com',1,1,0),(7,'Azucena','Casals','Azure','azucenacasals@gmail.com',4,2,1),(8,'Luisa','Haro','Href','luisaharo@gmail.com',4,2,1),(9,'Leticia','Montserrat','Monse','leticiamontserrat@gmail.com',4,2,1),(10,'Sandra','Iniesta','Inii-san','sandrainiesta@gmail.com',4,2,1),(11,'Alejo','Camacho','Camacho','alejocamacho@gmail.com',3,2,1),(12,'Marcio','Manjón-Pastor','MM-P','marciomanjon-pastor@gmail.com',3,2,0),(13,'Pastora','Villanueva','Shepherd','pastoravillanueva@gmail.com',5,3,1),(14,'Ileana','Sans','Comic-Sans','ileanasans@gmail.com',5,3,1),(15,'Marc','Goñi','Goma','marcgoni@gmail.com',6,3,1),(16,'Vito','Roca','Vittoro','vitoroca@gmail.com',6,3,1),(17,'Sebastián','Montero','Monte','sebastianmontero@gmail.com',6,3,1),(18,'Román','Laguna','Lake','romanlaguna@gmail.com',1,3,0),(19,'Juan','Bosch','Bach','juanbosch@gmail.com',7,5,1),(20,'Jesús','Navarrete','Iesu','jesusnavarrete@gmail.com',7,5,1),(21,'Virginia','Rotela','Vir','virginiarotela@gmail.com',7,5,1),(22,'Mariana','Fernández','Stitch','marianfernandez@gmail.com',7,5,1),(23,'Adrián','Faín','Addrammelech','adrianfain@gmail.com',7,5,1),(24,'Félix','Arana','Ananá','felixarana@gmail.com',2,5,0),(25,'Isabela','Zapata','Zapato','isabelazapata@gmail.com',8,6,1),(26,'Manuela','Peguajó','Manuelita','manuelapeguajo@gmail.com',8,6,1),(27,'Blanca','Nieves','Snowhite','blancanieves@gmail.com',8,6,1),(28,'Alfredo','Azucena','Azu','alfredoazucena@gmail.com',8,6,1),(29,'Morena','Artigas','Generala Artigas','morenaartigas@gmail.com',8,6,1),(30,'Anastasio','Bolaños','Bolas','anastasiobolaños@gmail.com',2,6,0),(31,'Leoncio','Hurtado','Thief','leonciohurtado@gmail.com',9,7,1),(32,'Melisa','Pinedo-Ayilón','Mepiay','melinapinedo-ayilon@gmail.com',9,7,1),(33,'Dolores','Palomo','Palometa','dolorespalomo@gmail.com',9,7,1),(34,'Rufina','Aguado','Watery','rufinaaguado@gmail.com',9,7,1),(35,'Sebastián','Tejada','Techamos','sebastiantejada@gmail.com',9,7,1),(36,'Lilia','Salas','Lilith','liliasalas@gmail.com',6,7,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localidades`
--

LOCK TABLES `localidades` WRITE;
/*!40000 ALTER TABLE `localidades` DISABLE KEYS */;
INSERT INTO `localidades` VALUES (1,'Posadas',1),(2,'Garupá',1),(3,'Fachinal',1),(4,'Capioví',2),(5,'Puerto Rico',2),(6,'Garuhapé',2),(7,'Oberá',3),(8,'Los Helechos',3),(9,'Campo Viera',3),(10,'Puerto Esperanza',4),(11,'Puerto Iguazú',4),(12,'Puerto Libertad',4);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sponsors`
--

LOCK TABLES `sponsors` WRITE;
/*!40000 ALTER TABLE `sponsors` DISABLE KEYS */;
INSERT INTO `sponsors` VALUES (1,'Silicon',1),(2,'Misiones Group',1),(3,'California',1),(4,'Pinturerías del Centro',1),(5,'Petri',0),(6,'Doña Chola',0),(7,'Logex SRL',1);
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
  `nombre` varchar(45) NOT NULL,
  `fecha` date NOT NULL COMMENT 'Formato: YYYY-MM-DD (año-mes-día)',
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `torneos`
--

LOCK TABLES `torneos` WRITE;
/*!40000 ALTER TABLE `torneos` DISABLE KEYS */;
INSERT INTO `torneos` VALUES (1,'Drip Shot','2023-03-07',3,9,5,7,3,1),(2,'Aces','2023-02-17',2,2,6,5,7,1),(3,'KDA','2023-02-26',3,10,1,2,3,1),(4,'Net Set','2023-03-02',3,4,3,1,11,0),(5,'40-L','2023-02-10',1,5,9,1,3,1),(6,'Smash','2023-02-22',2,1,11,11,11,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `torneos_sponsors`
--

LOCK TABLES `torneos_sponsors` WRITE;
/*!40000 ALTER TABLE `torneos_sponsors` DISABLE KEYS */;
INSERT INTO `torneos_sponsors` VALUES (1,1,1),(2,1,2),(3,2,3),(4,2,4),(5,2,1);
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

-- Dump completed on 2023-03-05 17:09:57
