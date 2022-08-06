-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 22 juil. 2022 à 15:54
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 7.4.28
SET
  SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone="+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!40101 SET NAMES utf8mb4 */
;

--
-- Base de données : `groupomania`
--
-- --------------------------------------------------------
--
-- Structure de la table `comments`
--
CREATE TABLE
  `comments` (
    `c_id` int(11) NOT NULL,
    `c_uid` text NOT NULL,
    `c_content` varchar(255) NOT NULL,
    `c_creation_date` datetime NOT NULL DEFAULT current_timestamp(),
    `c_modification_date` datetime DEFAULT NULL ON UPDATE current_timestamp(),
    `c_fk_user_id` int(11) DEFAULT NULL,
    `c_fk_post_id` int(11) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
--
-- Structure de la table `posts`
--
CREATE TABLE
  `posts` (
    `p_id` int(11) NOT NULL,
    `p_uid` text NOT NULL DEFAULT 'UUID()',
    `p_content` text DEFAULT NULL,
    `p_post_img_url` varchar(255) DEFAULT NULL,
    `p_creation_date` datetime DEFAULT current_timestamp(),
    `p_title` varchar(255) DEFAULT NULL,
    `p_modification_date` datetime DEFAULT NULL ON UPDATE current_timestamp(),
    `p_fk_user_id` int(11) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
--
-- Structure de la table `posts_likes`
--
CREATE TABLE
  `posts_likes` (
    `pl_id` int(11) NOT NULL,
    `pl_value` tinyint(1) NOT NULL COMMENT '0: Grrr / 1: like / 2: mdr',
    `pl_fk_user_id` int(11) DEFAULT NULL,
    `pl_fk_post_id` int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
--
-- Structure de la table `users`
--
CREATE TABLE
  `users` (
    `u_id` int(11) NOT NULL,
    `u_uid` text NOT NULL,
    `u_username` varchar(50) NOT NULL,
    `u_email` varchar(150) NOT NULL,
    `u_password` varchar(255) DEFAULT NULL,
    `u_firstname` varchar(50) DEFAULT NULL,
    `u_lastname` varchar(50) DEFAULT NULL,
    `u_bio` text DEFAULT NULL,
    `u_avatar_url` varchar(255) DEFAULT '',
    `u_inscription_date` datetime NOT NULL DEFAULT current_timestamp(),
    `u_role` varchar(15) NOT NULL DEFAULT 'user'
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--
INSERT INTO
  `users` (
    `u_id`,
    `u_uid`,
    `u_username`,
    `u_email`,
    `u_password`,
    `u_inscription_date`,
    `u_role`
  )
VALUES
  (
    1,
    UUID(),
    'Admin',
    'admin@test.fr',
    '$2b$10$JO4QL5CL1i73tkqSEYPiCOX0EwioC9aTejqOFzTqD2uuydObH10Fi',
    NOW(),
    'admin'
  );

--
-- Index pour les tables déchargées
--
--
-- Index pour la table `comments`
--
ALTER TABLE
  `comments`
ADD
  PRIMARY KEY (`c_id`),
ADD
  UNIQUE KEY `uid` (`c_uid`) USING HASH,
ADD
  KEY `user_id` (`c_fk_user_id`) USING BTREE,
ADD
  KEY `post_id` (`c_fk_post_id`) USING BTREE;

--
-- Index pour la table `posts`
--
ALTER TABLE
  `posts`
ADD
  PRIMARY KEY (`p_id`),
ADD
  UNIQUE KEY `uid` (`p_uid`) USING HASH,
ADD
  KEY `p_fk_user_id` (`p_fk_user_id`);

--
-- Index pour la table `posts_likes`
--
ALTER TABLE
  `posts_likes`
ADD
  PRIMARY KEY (`pl_id`),
ADD
  KEY `user_id` (`pl_fk_user_id`) USING BTREE,
ADD
  KEY `post_id` (`pl_fk_post_id`) USING BTREE;

--
-- Index pour la table `users`
--
ALTER TABLE
  `users`
ADD
  PRIMARY KEY (`u_id`),
ADD
  UNIQUE KEY `username` (`u_username`),
ADD
  UNIQUE KEY `email` (`u_email`),
ADD
  KEY `uid` (`u_uid`(768));

--
-- AUTO_INCREMENT pour les tables déchargées
--
--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE
  `comments` MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE
  `posts` MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT pour la table `posts_likes`
--
ALTER TABLE
  `posts_likes` MODIFY `pl_id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE
  `users` MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--
--
-- Contraintes pour la table `comments`
--
ALTER TABLE
  `comments`
ADD
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`c_fk_post_id`) REFERENCES `posts` (`p_id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
  CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`c_fk_user_id`) REFERENCES `users` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE
  `posts`
ADD
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`p_fk_user_id`) REFERENCES `users` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts_likes`
--
ALTER TABLE
  `posts_likes`
ADD
  CONSTRAINT `posts_likes_ibfk_1` FOREIGN KEY (`pl_fk_user_id`) REFERENCES `users` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
  CONSTRAINT `posts_likes_ibfk_2` FOREIGN KEY (`pl_fk_post_id`) REFERENCES `posts` (`p_id`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;