CREATE DATABASE wow;

CREATE TABLE wow.user (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE wow.auth (
  `id` varchar(255) NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE wow.play (
  `id` int NOT NULL AUTO_INCREMENT,
  `playerId` int NOT NULL,
  `beginAt` datetime NOT NULL,
  `endAt` datetime NOT NULL,
  `dungeonCount` int NOT NULL,
  `raidCount` int NOT NULL,
  `playAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_play_user_idx` (`playerId`),
  CONSTRAINT `fk_play_user` FOREIGN KEY (`playerId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;