-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema projet_harone_hugo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema projet_harone_hugo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `projet_harone_hugo` DEFAULT CHARACTER SET utf8 ;
USE `projet_harone_hugo` ;

-- -----------------------------------------------------
-- Table `projet_harone_hugo`.`author`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projet_harone_hugo`.`author` (
  `id_author` INT NOT NULL AUTO_INCREMENT,
  `alias` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `first name` VARCHAR(45) NOT NULL,
  `last name` VARCHAR(45) NOT NULL,
  `biography` varchar(1000),
  `virified` boolean NOT NULL default Falseauthor,
  PRIMARY KEY (`id_author`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projet_harone_hugo`.`users_copy1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projet_harone_hugo`.`users_copy1` (
  `id_users` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `first name` VARCHAR(45) NOT NULL,
  `last name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `role` VARCHAR(45) NOT NULL DEFAULT 'user',
  `age` DATE NOT NULL,
  PRIMARY KEY (`id_users`),
  UNIQUE INDEX `idusers_UNIQUE` (`id_users` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projet_harone_hugo`.`song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projet_harone_hugo`.`song` (
  `id_song` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `duration` INT NULL,
  `number of stream` INT NULL,
  `date of post` DATE NOT NULL,
  `lyrics` VARCHAR(1000) NULL,
  `author_id_author` INT NOT NULL,
  PRIMARY KEY (`id_song`, `author_id_author`),
  INDEX `fk_song_author1_idx` (`author_id_author` ASC) VISIBLE,
  CONSTRAINT `fk_song_author1`
    FOREIGN KEY (`author_id_author`)
    REFERENCES `projet_harone_hugo`.`author` (`id_author`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projet_harone_hugo`.`playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projet_harone_hugo`.`playlist` (
  `id_playlist` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `date of post` DATE NOT NULL,
  `number of save` INT NULL,
  `description` VARCHAR(500) NULL,
  `state` VARCHAR(45) NULL DEFAULT 'private',
  `users_copy1_id_users` INT NOT NULL,
  PRIMARY KEY (`id_playlist`, `users_copy1_id_users`),
  INDEX `fk_playlist_users_copy11_idx` (`users_copy1_id_users` ASC) VISIBLE,
  CONSTRAINT `fk_playlist_users_copy11`
    FOREIGN KEY (`users_copy1_id_users`)
    REFERENCES `projet_harone_hugo`.`users_copy1` (`id_users`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projet_harone_hugo`.`genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projet_harone_hugo`.`genre` (
  `id_genre` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_genre`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projet_harone_hugo`.`playlist_has_song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projet_harone_hugo`.`playlist_has_song` (
  `playlist_id_playlist` INT NOT NULL,
  `song_id_song` INT NOT NULL,
  PRIMARY KEY (`playlist_id_playlist`, `song_id_song`),
  INDEX `fk_playlist_has_song_song1_idx` (`song_id_song` ASC) VISIBLE,
  INDEX `fk_playlist_has_song_playlist1_idx` (`playlist_id_playlist` ASC) VISIBLE,
  CONSTRAINT `fk_playlist_has_song_playlist1`
    FOREIGN KEY (`playlist_id_playlist`)
    REFERENCES `projet_harone_hugo`.`playlist` (`id_playlist`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_playlist_has_song_song1`
    FOREIGN KEY (`song_id_song`)
    REFERENCES `projet_harone_hugo`.`song` (`id_song`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projet_harone_hugo`.`genre_has_song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projet_harone_hugo`.`genre_has_song` (
  `genre_id_genre` INT NOT NULL,
  `song_id_song` INT NOT NULL,
  PRIMARY KEY (`genre_id_genre`, `song_id_song`),
  INDEX `fk_genre_has_song_song1_idx` (`song_id_song` ASC) VISIBLE,
  INDEX `fk_genre_has_song_genre1_idx` (`genre_id_genre` ASC) VISIBLE,
  CONSTRAINT `fk_genre_has_song_genre1`
    FOREIGN KEY (`genre_id_genre`)
    REFERENCES `projet_harone_hugo`.`genre` (`id_genre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_genre_has_song_song1`
    FOREIGN KEY (`song_id_song`)
    REFERENCES `projet_harone_hugo`.`song` (`id_song`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;