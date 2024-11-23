drop schema projet_harone_hugo;
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
  `verified` boolean NOT NULL default False,
  PRIMARY KEY (`id_author`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projet_harone_hugo`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projet_harone_hugo`.`user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `first name` VARCHAR(45) NOT NULL,
  `last name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `role` VARCHAR(45) NOT NULL DEFAULT 'user',
  `date_of_birth` DATE NOT NULL,
  `sexe` INT NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `iduser_UNIQUE` (`id_user` ASC) VISIBLE,
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
  `date_of_post` DATE NOT NULL,
  `number_of_save` INT NULL,
  `description` VARCHAR(500) NULL,
  `state` VARCHAR(45) NULL DEFAULT 'private',
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id_playlist`),
  INDEX `fk_playlist_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_playlist_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `projet_harone_hugo`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


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

INSERT INTO author (`alias`,`first name`,`last name`,`biography`,`verified`)  VALUES
("Earth, Wind & Fire", NULL , NULL,NULL,1),
("MJ", "Michael", "Jackson", NULL,1),
("Imagine Dragons", NULL, NULL, NULL,1),
("The Weeknd", NULL, NULL, NULL,1),
("Lady Gaga", "Stefani" , "Germanotta", NULL,1),
("Eminem", "Marshall Bruce", "Mathers", NULL,1),
("FEMTOGO", NULL, NULL, NULL,0),
("Daft Punk", NULL, NULL, NULL,1),
("Kenrick Lamar", "Kendrick", "Lamar", NULL,1),
("David Guetta", "David" , "Guetta", NULL,1);


INSERT INTO user (username, `first name`, `last name`, email, password, role, date_of_birth, sexe) VALUES
('kallan93', 'Kallan', 'Giraud', 'kallan.giraud@gmail.com', 'aZ4@pQr7nDgR', 'user', '1992-11-15', 1),
('mila86', 'Mila', 'Rochefort', 'mila.rochefort@yahoo.fr', '8Fg&kH%JxE12', 'admin', '1995-06-21', 2),
('levan_12', 'Levan', 'Aubert', 'levan.aubert@orange.fr', 'Vh!3fWq$97T', 'user', '1989-03-03', 1),
('camille92', 'Camille', 'Perret', 'camille.perret@gmail.com', 'jP7!9hR6cOpM2', 'user', '1996-09-12', 2),
('zoe74', 'Zoe', 'Fontaine', 'zoe.fontaine@sfr.fr', 'Nf3#bP9kYl8', 'admin', '1993-07-19', 2),
('jules23', 'Jules', 'Bernard', 'jules.bernard@hotmail.fr', 'xP2&aM4nT7qJ9', 'user', '2001-04-27', 1),
('mathis41', 'Mathis', 'Lemoine', 'mathis.lemoine@laposte.net', 'D4s$F7gA3vC6', 'user', '1997-02-11', 1),
('lea59', 'Lea', 'Renard', 'lea.renard@gmail.com', 'eB9&zW5rC3yK8', 'admin', '1998-08-30', 2),
('lucie84', 'Lucie', 'Descamps', 'lucie.descamps@yahoo.com', 'Qj6@pL8nF4dT2', 'user', '1994-11-05', 2),
('mael37', 'Mael', 'Dumont', 'mael.dumont@orange.fr', 'K7l!R2mB3vG5', 'user', '1990-05-23', 1),
('nina66', 'Nina', 'Gautier', 'nina.gautier@sfr.fr', 'Hj9*E3mW8xL6', 'admin', '1991-12-14', 2),
('axel49', 'Axel', 'Fleury', 'axel.fleury@gmail.com', 'uT2&gV7nL5pC4', 'user', '1999-03-18', 1),
('lola77', 'Lola', 'Collet', 'lola.collet@hotmail.fr', 'Rf3#D9bY2vG1', 'user', '1992-10-09', 2),
('ethan63', 'Ethan', 'Poulain', 'ethan.poulain@laposte.net', 'M6l@cR8zY3pG5', 'admin', '1996-12-28', 1),
('emma52', 'Emma', 'Blanc', 'emma.blanc@yahoo.fr', 'Xf8*V3jL2qR9', 'user', '1995-07-17', 2),
('leo88', 'Leo', 'Morel', 'leo.morel@orange.fr', 'T4k!P2jG5mC7', 'user', '2000-04-02', 1),
('alice38', 'Alice', 'Noir', 'alice.noir@sfr.fr', 'Bp7#T9kD3wV6', 'admin', '1997-05-13', 2),
('adam25', 'Adam', 'Girard', 'adam.girard@gmail.com', 'Hj5&L3qP9vT4', 'user', '1993-11-27', 1),
('ines53', 'Ines', 'Durand', 'ines.durand@hotmail.fr', 'F2m@K7pL8zT6', 'admin', '1994-06-02', 2),
('nathan44', 'Nathan', 'Martin', 'nathan.martin@laposte.net', 'J3q&F5kW9lT8', 'user', '1989-01-15', 1);



INSERT INTO song (`title`,`duration`, `number of stream`, `date of post`, `lyrics`, `author_id_author`) VALUES 
("Let's Groove", 336, 597458154, "2013-09-01", NULL, 1),
("Smooth Criminal", 565, 988804859, "2010-11-19", NULL, 2),
("Enemy", 173, 1588206980, "2021-10-28", NULL, 3),
("Heartless", 198, 1018698991, "2020-12-03", NULL, 4),
("Poker Face", 237, 1398566907, "2009-12-20", NULL, 5),
("Without Me", 290, 1398566907, "2009-06-17", NULL, 6),
("SCOPOLAMINE", 149, 1876483, "2023-11-27", NULL, 7),
("One More Time", 320, 638173590, "2001-03-12", NULL, 8),
("VeridisQuo", 320, 638173590, "2001-03-12", NULL, 8);


INSERT INTO playlist (`title`, `date of post`, `number of save`, `description`, `state`, `user_id`) VALUES
('Chill Vibes', '2021-06-15', 482, 'A playlist with relaxing tracks to wind down your day.', 'public', 1),
('Workout Hits', '2020-03-12', 1728, 'The perfect playlist to pump up your workout sessions.', 'public', 2),
('Soirée Electro', '2019-11-20', 1156, 'A mix of the best electro tracks for an unforgettable party.', 'public', 3),
('Rock Classics', '2022-01-05', 935, 'Classic rock anthems from the 70s, 80s, and 90s.', 'private', 4),
('Road Trip Tunes', '2021-08-30', 145, 'Perfect songs to accompany you on a long drive.', 'public', 5),
('Jazz & Chill', '2020-10-18', 368, 'A smooth blend of jazz for a calm and relaxing atmosphere.', 'private', 6),
('Summer Hits 2022', '2022-07-12', 1985, 'The hottest tracks of the summer 2022.', 'public', 7),
('Indie Discovery', '2021-04-09', 453, 'Discover the best indie tracks of the moment.', 'public', 8),
('Party Bangers', '2020-12-31', 1689, 'The ultimate playlist to get the party started.', 'public', 9),
('Acoustic Moods', '2019-05-16', 523, 'Beautiful acoustic songs to relax and enjoy.', 'private', 10),
('Deep House Grooves', '2019-08-22', 1248, 'Deep house tracks to set the perfect mood.', 'public', 11),
('Throwback Jams', '2021-02-17', 307, 'Hit songs from the early 2000s and 90s for nostalgia lovers.', 'private', 12),
('Rap Français', '2020-06-25', 1324, 'Best of French rap from classic to modern hits.', 'public', 13),
('Classical Piano', '2022-03-20', 641, 'A curated selection of classical piano pieces for focus and relaxation.', 'private', 14),
('Afrobeats Vibes', '2018-12-11', 894, 'Groovy and vibrant Afrobeats tracks.', 'public', 15),
('Feel Good Songs', '2019-07-14', 1203, 'Songs guaranteed to lift your mood.', 'public', 16),
('Late Night Jazz', '2021-11-01', 489, 'Smooth jazz tunes perfect for late-night relaxation.', 'private', 17),
('Lofi Study Beats', '2020-02-05', 1509, 'Chill lofi beats to help you stay focused while studying.', 'public', 18),
('Metal Mayhem', '2019-09-24', 213, 'Hard-hitting metal tracks for the true fans of the genre.', 'private', 19),
('Romantic Evening', '2021-02-14', 835, 'Soft and romantic songs perfect for a cozy evening.', 'public', 20),
('Festival Anthems', '2022-08-19', 1760, 'Top hits from festivals around the world.', 'public', 1),
('Funky Grooves', '2019-03-09', 672, 'A funky collection of the best grooves.', 'private', 2),
('Latin Heat', '2021-07-30', 1354, 'Hot Latin tracks to spice up your summer nights.', 'public', 3),
('Ambient Soundscapes', '2018-11-22', 245, 'Calming ambient music to help you relax and unwind.', 'private', 4),
('R&B Throwbacks', '2020-09-16', 1103, 'Throwback to the golden era of R&B.', 'public', 5),
('Pop Hits 2020', '2020-05-20', 1782, 'The best pop hits of the year 2020.', 'public', 6),
('Psytrance Journey', '2019-10-31', 592, 'Embark on a journey with mind-bending psytrance beats.', 'private', 7),
('Soulful Sunday', '2021-12-05', 412, 'A soulful collection for a laid-back Sunday.', 'private', 8),
('Techno Underground', '2022-04-14', 1951, 'Dark and driving techno for the underground scene lovers.', 'public', 9),
('Blues Legends', '2020-11-08', 764, 'A playlist featuring the greatest blues legends of all time.', 'private', 10);
('Mes chansons du matin', '2021-09-10', 512, 'Les chansons qui me donnent de l\'énergie chaque matin.', 'private', 11),
('Souvenirs d\'été 2019', '2019-09-01', 348, 'Les morceaux qui ont marqué mon été 2019.', 'private', 12),
('Road Trip Bretagne', '2022-07-18', 134, 'Ma playlist spéciale pour mon road trip en Bretagne.', 'private', 13),
('Chansons de ma jeunesse', '2020-03-04', 891, 'Les chansons que j\'écoutais en grandissant, pleine de nostalgie.', 'public', 14),
('Playlist du Dimanche Matin', '2021-12-19', 243, 'Des chansons calmes et relaxantes pour mes dimanches matins tranquilles.', 'private', 15),
('Ma playlist motivation', '2022-05-11', 1231, 'Les morceaux qui me motivent à fond pour mes objectifs.', 'public', 16),
('Best of soirées avec les potes', '2021-04-23', 1879, 'Les titres qui font bouger lors de nos soirées entre amis.', 'public', 17),
('Les sons de mes vacances 2020', '2020-08-12', 602, 'La bande sonore de mes vacances d\'été 2020.', 'private', 18),
('Mélancolie du soir', '2020-11-26', 431, 'Les morceaux que j\'écoute lorsque je me sens mélancolique en soirée.', 'private', 19),
('Les classiques de ma vie', '2019-06-30', 1029, 'Les chansons intemporelles qui m\'ont toujours accompagné.', 'public', 20),
('Mon top rap français', '2021-01-22', 1247, 'Ma sélection personnelle des meilleurs titres du rap français.', 'public', 1),
('Ma zone de confort', '2022-03-14', 698, 'Les chansons qui me mettent à l\'aise et me réconfortent.', 'private', 2),
('Soirées chill entre amis', '2020-07-28', 1368, 'Les morceaux parfaits pour une soirée détente entre amis.', 'public', 3),
('Moments inoubliables', '2019-10-17', 921, 'Les chansons qui accompagnent les moments inoubliables de ma vie.', 'private', 4),
('Ambiance travail', '2022-06-20', 510, 'Les sons qui m\'aident à me concentrer et à travailler efficacement.', 'private', 5);


INSERT INTO genre (`name`) VALUES
('Rock'),
('Jazz'),
('Hip Hop'),
('Classical'),
('Pop'),
('Electronic'),
('Reggae'),
('Blues'),
('R&B'),
('Country'),
('Folk'),
('Metal'),
('Indie'),
('Techno'),
('Soul'),
('Funk'),
('Psytrance'),
('Afrobeat'),
('Salsa'),
('Dubstep');

INSERT INTO playlist_has_song VALUES 
(1, 1),
(2,2);

INSERT INTO song_has_genre VALUES
(1,1),
(2,2);

INSERT INTO user (`username`, `first name`, `last name`, `email`, `password`, `role`, `date_of_birth`) VALUES 
('kallan93', 'Kallan', 'Giraud', 'kallan.giraud@gmail.com', 'aZ4@pQr7nDgR', 'user', '1992-11-15'), 
('mila86', 'Mila', 'Rochefort', 'mila.rochefort@yahoo.fr', '8Fg&kH%JxE12', 'admin', '1995-06-21'), 
('levan_12', 'Levan', 'Aubert', 'levan.aubert@orange.fr', 'Vh!3fWq$97T', 'user', '1989-03-03'), 
('camille92', 'Camille', 'Perret', 'camille.perret@gmail.com', 'jP7!9hR6cOpM2', 'user', '1996-09-12'), 
('zoe74', 'Zoe', 'Fontaine', 'zoe.fontaine@sfr.fr', 'Nf3#bP9kYl8', 'admin', '1993-07-19'), 
('jules23', 'Jules', 'Bernard', 'jules.bernard@hotmail.fr', 'xP2&aM4nT7qJ9', 'user', '2001-04-27'), 
('mathis41', 'Mathis', 'Lemoine', 'mathis.lemoine@laposte.net', 'D4s$F7gA3vC6', 'user', '1997-02-11'), 
('lea59', 'Lea', 'Renard', 'lea.renard@gmail.com', 'eB9&zW5rC3yK8', 'admin', '1998-08-30'), 
('lucie84', 'Lucie', 'Descamps', 'lucie.descamps@yahoo.com', 'Qj6@pL8nF4dT2', 'user', '1994-11-05'), 
('mael37', 'Mael', 'Dumont', 'mael.dumont@orange.fr', 'K7l!R2mB3vG5', 'user', '1990-05-23'), 
('nina66', 'Nina', 'Gautier', 'nina.gautier@sfr.fr', 'Hj9*E3mW8xL6', 'admin', '1991-12-14'), 
('axel49', 'Axel', 'Fleury', 'axel.fleury@gmail.com', 'uT2&gV7nL5pC4', 'user', '1999-03-18'), 
('lola77', 'Lola', 'Collet', 'lola.collet@hotmail.fr', 'Rf3#D9bY2vG1', 'user', '1992-10-09'), 
('ethan63', 'Ethan', 'Poulain', 'ethan.poulain@laposte.net', 'M6l@cR8zY3pG5', 'admin', '1996-12-28'), 
('emma52', 'Emma', 'Blanc', 'emma.blanc@yahoo.fr', 'Xf8*V3jL2qR9', 'user', '1995-07-17'), 
('leo88', 'Leo', 'Morel', 'leo.morel@orange.fr', 'T4k!P2jG5mC7', 'user', '2000-04-02'), 
('alice38', 'Alice', 'Noir', 'alice.noir@sfr.fr', 'Bp7#T9kD3wV6', 'admin', '1997-05-13'), 
('adam25', 'Adam', 'Girard', 'adam.girard@gmail.com', 'Hj5&L3qP9vT4', 'user', '1993-11-27'), 
('ines53', 'Ines', 'Durand', 'ines.durand@hotmail.fr', 'F2m@K7pL8zT6', 'admin', '1994-06-02'), 
('nathan44', 'Nathan', 'Martin', 'nathan.martin@laposte.net', 'J3q&F5kW9lT8', 'user', '1989-01-15')
