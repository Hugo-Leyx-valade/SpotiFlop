DROP SCHEMA projet_harone_hugo;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema projet_harone_hugo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS projet_harone_hugo DEFAULT CHARACTER SET utf8;
USE projet_harone_hugo;

-- -----------------------------------------------------
-- Table projet_harone_hugo.author
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS projet_harone_hugo.author (
  id_author INT NOT NULL AUTO_INCREMENT,
  alias VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  first_name VARCHAR(45),
  last_name VARCHAR(45),
  biography VARCHAR(1000),
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  image VARCHAR(50),
  PRIMARY KEY (id_author)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table projet_harone_hugo.user
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS projet_harone_hugo.user (
  id_user INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(45) NOT NULL DEFAULT 'user',
  date_of_birth DATE NOT NULL,
    genre INT,
  PRIMARY KEY (id_user),
  UNIQUE INDEX id_user_UNIQUE (id_user ASC) VISIBLE,
  UNIQUE INDEX username_UNIQUE (username ASC) VISIBLE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table projet_harone_hugo.song
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS projet_harone_hugo.song (
  id_song INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NOT NULL,
  duration VARCHAR(50),
  number_of_streams bigint,
  date_of_post DATE NOT NULL,
  lyrics VARCHAR(1000),
  id_author INT NOT NULL,
  id_genre INT NOT NULL, -- Add the new column here
  PRIMARY KEY (id_song, id_author),
  INDEX fk_song_author1_idx (id_author ASC) VISIBLE,
  INDEX fk_song_genre1_idx (id_genre ASC) VISIBLE, -- Add an index for the genre
  CONSTRAINT fk_song_author1
    FOREIGN KEY (id_author)
    REFERENCES projet_harone_hugo.author (id_author)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_song_genre1
    FOREIGN KEY (id_genre)
    REFERENCES projet_harone_hugo.genre (id_genre) -- Reference the genre table
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table projet_harone_hugo.playlist
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS projet_harone_hugo.playlist (
  id_playlist INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NOT NULL,
  date_of_post DATE NOT NULL,
  number_of_save INT DEFAULT 0,
  _description VARCHAR(500),
  state VARCHAR(45) DEFAULT 'private',
  user_id INT NOT NULL,
  PRIMARY KEY (id_playlist),
  INDEX fk_playlist_user1_idx (user_id ASC) VISIBLE,
  CONSTRAINT fk_playlist_user1
    FOREIGN KEY (user_id)
    REFERENCES projet_harone_hugo.user (id_user)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table projet_harone_hugo.genre
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS projet_harone_hugo.genre (
  id_genre INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_genre),
  UNIQUE INDEX name_UNIQUE (name ASC) VISIBLE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table projet_harone_hugo.playlist_has_song
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS projet_harone_hugo.playlist_has_song (
  playlist_id_playlist INT NOT NULL,
  song_id_song INT NOT NULL,
  PRIMARY KEY (playlist_id_playlist, song_id_song),
  INDEX fk_playlist_has_song_song1_idx (song_id_song ASC) VISIBLE,
  INDEX fk_playlist_has_song_playlist1_idx (playlist_id_playlist ASC) VISIBLE,
  CONSTRAINT fk_playlist_has_song_playlist1
    FOREIGN KEY (playlist_id_playlist)
    REFERENCES playlist (id_playlist)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_playlist_has_song_song1
    FOREIGN KEY (song_id_song)
    REFERENCES projet_harone_hugo.song (id_song)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO author (alias, first_name, last_name, biography, verified, image) VALUES
('Earth, Wind & Fire', NULL, NULL, NULL, 1, "EarthWindAndFire.jpg"),
('MJ', 'Michael', 'Jackson', NULL, 1, "MichaelJackson.jpg"),
('Imagine Dragons', NULL, NULL, NULL, 1,"ImagineDragons.jpeg"),
('The Weeknd', NULL, NULL, NULL, 1,"TheWeeknd.jpg"),
('Lady Gaga', 'Stefani', 'Germanotta', NULL, 1,"LadyGaga.jpg"),
('Eminem', 'Marshall Bruce', 'Mathers', NULL, 1,"eminem.jpg"),
('FEMTOGO', NULL, NULL, NULL, 0,"Femt0go.jpg"),
('Daft Punk', NULL, NULL, NULL, 1,"Daft_Punk.jpg"),
('Kenrick Lamar', 'Kendrick', 'Lamar', NULL, 1,"KendrickLamar.jpg"),
('David Guetta', 'David', 'Guetta', NULL, 1,"David_Guetta.jpg"),
('Adele', 'Adele', 'Adkins', NULL, 1,"Adele.jpg"),
('Beyoncé', 'Beyoncé', 'Knowles', NULL, 1,"Beyonce.png"),
('Ed Sheeran', 'Ed', 'Sheeran', NULL, 1,"EdSheeran.jpg"),
('Justin Bieber', 'Justin', 'Bieber', NULL, 1,"JustinBieber.jpg"),
('Bruno Mars', 'Bruno', 'Mars', NULL, 1,"BrunoMars.jpg"),
('Coldplay', NULL, NULL, NULL, 1,"ColdPlay.jpg"),
('Post Malone', 'Austin', 'Post', NULL, 1,"PostMalone.jpg"),
('Rihanna', 'Robyn', 'Fenty', NULL, 1,"Rihanna.jpg"),
('Drake', 'Aubrey', 'Graham', NULL, 1,"Drake.jpg"),
('Billie Eilish', 'Billie', 'Connell', NULL, 1,"BillieEilish.jpg");

-- Insert data into the user table
INSERT INTO user (id_user, username, first_name, last_name, email, password, role, date_of_birth, genre) VALUES
(1, 'kallan93', 'Kallan', 'Giraud', 'kallan.giraud@gmail.com', 'aZ4@pQr7nDgR', 'user', '1992-11-15', 1),
(2, 'mila86', 'Mila', 'Rochefort', 'mila.rochefort@yahoo.fr', '8Fg&kH%JxE12', 'admin', '1995-06-21', 0),
(3, 'levan_12', 'Levan', 'Aubert', 'levan.aubert@orange.fr', 'Vh!3fWq$97T', 'user', '1989-03-03', 1),
(4, 'camille92', 'Camille', 'Perret', 'camille.perret@gmail.com', 'jP7!9hR6cOpM2', 'user', '1996-09-12', 0),
(5, 'zoe74', 'Zoe', 'Fontaine', 'zoe.fontaine@sfr.fr', 'Nf3#bP9kYl8', 'admin', '1993-07-19', 0),
(6, 'jules23', 'Jules', 'Bernard', 'jules.bernard@hotmail.fr', 'xP2&aM4nT7qJ9', 'user', '2001-04-27', 1),
(7, 'mathis41', 'Mathis', 'Lemoine', 'mathis.lemoine@laposte.net', 'D4s$F7gA3vC6', 'user', '1997-02-11', 1),
(8, 'lea59', 'Lea', 'Renard', 'lea.renard@gmail.com', 'eB9&zW5rC3yK8', 'admin', '1998-08-30', 0),
(9, 'lucie84', 'Lucie', 'Descamps', 'lucie.descamps@yahoo.com', 'Qj6@pL8nF4dT2', 'user', '1994-11-05', 0),
(10, 'mael37', 'Mael', 'Dumont', 'mael.dumont@orange.fr', 'K7l!R2mB3vG5', 'user', '1990-05-23', 1),
(11, 'nina66', 'Nina', 'Gautier', 'nina.gautier@sfr.fr', 'Hj9*E3mW8xL6', 'admin', '1991-12-14', 0),
(12, 'axel49', 'Axel', 'Fleury', 'axel.fleury@gmail.com', 'uT2&gV7nL5pC4', 'user', '1999-03-18', 1),
(13, 'lola77', 'Lola', 'Collet', 'lola.collet@hotmail.fr', 'Rf3#D9bY2vG1', 'user', '1992-10-09', 0),
(14, 'ethan63', 'Ethan', 'Poulain', 'ethan.poulain@laposte.net', 'M6l@cR8zY3pG5', 'admin', '1996-12-28', 1),
(15, 'emma52', 'Emma', 'Blanc', 'emma.blanc@yahoo.fr', 'Xf8*V3jL2qR9', 'user', '1995-07-17', 0),
(16, 'leo88', 'Leo', 'Morel', 'leo.morel@orange.fr', 'T4k!P2jG5mC7', 'user', '2000-04-02', 1),
(17, 'alice38', 'Alice', 'Noir', 'alice.noir@sfr.fr', 'Bp7#T9kD3wV6', 'admin', '1997-05-13', 0),
(18, 'adam25', 'Adam', 'Girard', 'adam.girard@gmail.com', 'Hj5&L3qP9vT4', 'user', '1993-11-27', 1),
(19, 'ines53', 'Ines', 'Durand', 'ines.durand@hotmail.fr', 'F2m@K7pL8zT6', 'admin', '1994-06-02', 0),
(20, 'nathan44', 'Nathan', 'Martin', 'nathan.martin@laposte.net', 'G5v!T3wP7kD', 'user', '1991-09-19', 1),
(21, 'admin', 'admin', 'admin', 'admin.example@model.com', 'admin', 'admin', '1989-01-15', 1),
(22, 'user', 'user', 'user', 'user.example@model.com', 'user', 'user', '1989-01-15', 1);
ALTER TABLE user ADD COLUMN user_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
UPDATE user
SET password = SHA2(CONCAT(user_created, password), 224);
INSERT INTO genre (name) VALUES
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

-- Insert data into the song table
INSERT INTO song (title, duration, number_of_streams, date_of_post, lyrics, id_author,id_genre) VALUES
-- Earth, Wind & Fire
('Boogie Wonderland', 4.45, 702345678, '2013-09-01', NULL, 1, 16),
('September', 3.35, 912345678, '2013-09-01', NULL, 1, 16),
('Fantasy', 4.38, 812345678, '2013-09-01', NULL, 1, 16),
('Shining Star', 3.15, 562345678, '2013-09-01', NULL, 1, 16),
('After the Love Has Gone', 4.25, 482345678, '2013-09-01', NULL, 1, 16),
('Lets Groove',5.36, 597458154, '2013-09-01', NULL, 1, 16),

-- Michael Jackson (MJ)
('Billie Jean', 4.54, 1582345678, '1982-11-30', NULL, 2, 5),
('Thriller', 5.57, 1738345678, '1982-11-30', NULL, 2, 5),
('Beat It', 4.18, 1337345678, '1982-11-30', NULL, 2, 5),
('Black or White', 4.16, 1245345678, '1991-11-11', NULL, 2, 5),
('Bad', 4.07, 1456345678, '1987-08-31', NULL, 2, 5),
('Smooth Criminal', 9.25, 988804859, '2010-11-19', NULL, 2,5),

-- Imagine Dragons
('Radioactive', 3.06, 1897345678, '2012-09-18', NULL, 3, 1),
('Demons', 2.57, 1736345678, '2013-01-28', NULL, 3, 1),
('Believer', 3.37, 1632345678, '2017-02-01', NULL, 3, 1),
('Thunder', 3.07, 1526345678, '2017-04-27', NULL, 3, 1 ),
('Bones', 2.45, 1016345678, '2022-03-11', NULL, 3, 1),
('Enemy', 2.53, 1588206980, '2021-10-28', NULL, 3, 1),

-- The Weeknd
('Blinding Lights', 3.20, 2827345678, '2019-11-29', NULL, 4, 9),
('Save Your Tears', 3.36, 2327345678, '2020-03-20', NULL, 4, 9),
('Starboy', 3.50, 2027345678, '2016-09-21', NULL, 4, 9),
('Can’t Feel My Face', 3.35, 1827345678, '2015-06-08', NULL, 4, 9),
('In Your Eyes', 3.58, 1727345678, '2020-03-20', NULL, 4, 9),
('Heartless', 3.18, 1018698991, '2020-12-03', NULL, 4, 9),

-- Lady Gaga
('Just Dance', 4.01, 1927345678, '2008-04-08', NULL, 5, 5),
('Bad Romance', 4.55, 2127345678, '2009-10-26', NULL, 5, 5),
('Shallow', 3.36, 1427345678, '2018-09-27', NULL, 5, 5),
('Born This Way', 4.20, 1827345678, '2011-02-11', NULL, 5, 5),
('The Edge of Glory', 5.21, 1327345678, '2011-05-09', NULL, 5, 5),
('Poker Face', 3.57, 1398566907, '2009-12-20', NULL, 5, 5),

-- Eminem
('Lose Yourself', 5.20, 2037345678, '2002-10-28', NULL, 6, 3),
('Stan', 6.44, 1337345678, '2000-11-21', NULL, 6, 3),
('Love The Way You Lie', 4.23, 1837345678, '2010-06-21', NULL, 6, 3),
('Rap God', 6.09, 1627345678, '2013-10-14', NULL, 6, 3),
('Not Afraid', 4.10, 1527345678, '2010-04-29', NULL, 6, 3),
('Without Me', 4.50, 1398566907, '2009-06-17', NULL, 6, 3),

-- FEMTOGO
('Parallel Worlds', 3.33, 478590, '2023-01-01', NULL, 7, 13),
('Quantum Leap', 4.12, 567890, '2023-01-10', NULL, 7, 13),
('Echoes of Time', 3.59, 387590, '2023-02-15', NULL, 7, 13),
('Neural Networks', 4.22, 257890, '2023-03-01', NULL, 7, 13),
('Binary Dance', 2.58, 147890, '2023-04-01', NULL, 7, 13),
('SCOPOLAMINE', 2.29, 1876483, '2023-11-27', NULL, 7, 13),

-- Daft Punk
('Get Lucky', 6.09, 2037345678, '2013-04-19', NULL, 8, 6),
('Around the World', 7.10, 1277345678, '1997-03-17', NULL, 8, 6),
('Harder, Better, Faster, Stronger', 3.43, 1137345678, '2001-10-13', NULL, 8, 6),
('Instant Crush', 5.38, 1037345678, '2013-11-22', NULL, 8, 6),
('Digital Love', 5.00, 937345678, '2001-02-19', NULL, 8, 6),
('One More Time', 5.20, 638173590, '2001-03-12', NULL, 8,6),
('Veridis Quo', 5.20, 638173590, '2001-03-12', NULL, 8,6),

-- Kendrick Lamar
('HUMBLE.', 2.57, 2037345678, '2017-03-30', NULL, 9, 3),
('DNA.', 3.05, 1827345678, '2017-04-14', NULL, 9, 3),
('Alright', 3.39, 1527345678, '2015-06-30', NULL, 9, 3),
('King Kunta', 3.55, 1277345678, '2015-03-15', NULL, 9, 3),
('Swimming Pools Drank', 4.07, 1077345678, '2012-07-31', NULL, 9, 3),

-- David Guetta
('Titanium', 4.05, 1827345678, '2011-08-08', NULL, 10, 6),
('When Love Takes Over', 3.24, 1427345678, '2009-05-21', NULL, 10, 6),
('Memories', 3.31, 1137345678, '2010-02-15', NULL, 10, 6),
('Sexy Chick', 3.15, 932734567, '2009-06-24', NULL, 10, 6),
('Play Hard', 3.28, 872734567, '2013-03-22', NULL, 10, 6),

-- Adele
('Hello', 4.55, 2738945678, '2015-10-23', NULL, 11, 5),
('Rolling in the Deep', 3.48, 2138945678, '2010-11-29', NULL, 11, 15),
('Someone Like You', 4.45, 1938945678, '2011-01-24', NULL, 11, 5),
('Skyfall', 4.46, 1838945678, '2012-10-05', NULL, 11, 5),
('Set Fire to the Rain', 4.02, 1738945678, '2011-07-04', NULL, 11, 15),

-- Beyoncé
('Crazy In Love', 3.56, 1804567890, '2003-05-20', NULL, 12, 9),
('Halo', 4.21, 1902345678, '2008-01-20', NULL, 12, 5),
('Single Ladies', 3.13, 2003456789, '2008-10-13', NULL, 12, 9),
('Formation', 3.26, 1505678901, '2016-02-06', NULL, 12, 9),
('Irreplaceable', 3.47, 1601234567, '2006-10-23', NULL, 12, 5),

-- Ed Sheeran
('Shape of You', 3.53, 2803456789, '2017-01-06', NULL, 13, 5),
('Thinking Out Loud', 4.41, 2401234567, '2014-09-24', NULL, 13, 11),
('Perfect', 4.23, 2605678901, '2017-03-03', NULL, 13, 5),
('Photograph', 4.19, 2002345678, '2014-06-20', NULL, 13, 11),
('Bad Habits', 3.50, 1904567890, '2021-06-25', NULL, 13, 5),

-- Justin Bieber
('Bad Guy', 3.14, 2701234567, '2019-03-29', NULL, 19, 5),
('Lovely', 3.22, 1905678901, '2018-04-19', NULL, 19, 13),
('Ocean Eyes', 3.20, 1602345678, '2016-11-18', NULL, 19, 13),
('When the Party’s Over', 3.16, 1703456789, '2018-10-17', NULL, 19, 5),
('Everything I Wanted', 4.05, 1802345678, '2019-11-13', NULL, 19, 13),

-- Bruno Mars
('Uptown Funk', 4.30, 2406789012, '2014-11-10', NULL, 14, 16),
('Just the Way You Are', 3.41, 1801234567, '2010-07-20', NULL, 14, 5),
('Locked Out of Heaven', 3.53, 1602345678, '2012-10-01', NULL, 14, 16),
('Grenade', 3.42, 1703456789, '2010-09-28', NULL, 14, 5),
('24K Magic', 3.46, 1405678901, '2016-10-07', NULL, 14, 16),

-- Coldplay
('Fix You', 4.55, 2001234567, '2005-09-05', NULL, 15, 1),
('Viva La Vida', 4.04, 2304567890, '2008-06-12', NULL, 15, 1),
('Yellow', 4.26, 1902345678, '2000-06-26', NULL, 15, 1),
('The Scientist', 5.09, 1805678901, '2002-08-27', NULL, 15, 1),
('A Sky Full of Stars', 4.28, 2006789012, '2014-05-02', NULL, 15, 6),

-- Post Malone
('Circles', 3.35, 1802345678, '2019-08-30', NULL, 16, 3),
('Sunflower', 2.38, 2403456789, '2018-10-19', NULL, 16, 5),
('Rockstar', 3.38, 2605678901, '2017-09-15', NULL, 16, 3),
('Congratulations', 3.40, 2001234567, '2016-11-04', NULL, 16, 3),
('Wow.', 2.29, 1702345678, '2018-12-24', NULL, 16, 3),

-- Rihanna
('Umbrella', 4.36, 2303456789, '2007-03-29', NULL, 17, 9),
('Diamonds', 3.45, 2201234567, '2012-09-26', NULL, 17, 5),
('We Found Love', 3.37, 2405678901, '2011-09-22', NULL, 17, 5),
('Stay', 4.00, 2002345678, '2013-01-07', NULL, 17, 9),
('Work', 3.39, 1904567890, '2016-01-27', NULL, 17, 9),

-- Drake
('God’s Plan', 3.18, 2503456789, '2018-01-19', NULL, 18, 3),
('In My Feelings', 3.37, 2105678901, '2018-07-10', NULL, 18, 9),
('Hotline Bling', 4.27, 2001234567, '2015-07-31', NULL, 18, 9),
('Started From the Bottom', 2.53, 1902345678, '2013-02-01', NULL, 18, 3),
('One Dance', 2.54, 2204567890, '2016-04-05', NULL, 18, 9),

-- Billie Eilish

('Bad Guy', 3.14, 2701234567, '2019-03-29', NULL, 19, 5),
('Lovely', 3.22, 1905678901, '2018-04-19', NULL, 19, 13),
('Ocean Eyes', 3.20, 1602345678, '2016-11-18', NULL, 19, 13),
('When the Party’s Over', 3.16, 1703456789, '2018-10-17', NULL, 19, 5),
('Everything I Wanted', 4.05, 1802345678, '2019-11-13', NULL, 19, 13);


INSERT INTO playlist (title, date_of_post, number_of_save, _description, state, user_id) VALUES
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
    ('Blues Legends', '2020-11-08', 764, 'A playlist featuring the greatest blues legends of all time.', 'private', 10),
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
    ('Ambiance travail', '2022-06-20', 510, 'Les sons qui m\'aident à me concentrer et à travailler efficacement.', 'private', 5),
	('Ambiance', '2022-06-10', 40, 'Les sons qui m\'aident à me concentrer et à travailler efficacement.', 'public', 5);


INSERT INTO playlist_has_song VALUES 
    (1, 1),
    (2, 2);
    
    
    ALTER TABLE song ADD COLUMN formatted_duration VARCHAR(5);

UPDATE song
SET formatted_duration = CONCAT(
    LPAD(FLOOR(duration), 2, '0'), ':',
    LPAD(ROUND((duration - FLOOR(duration)) * 60), 2, '0')
);

ALTER TABLE song DROP COLUMN duration;

ALTER TABLE song CHANGE COLUMN formatted_duration duration VARCHAR(5);

select * from song;

select * from playlist_has_song;


select author.id_author, author.alias, count(author.id_author) as quantity from author inner join song on author.id_author = song.id_author group by author.id_author;

select id_playlist, title, date_of_post, number_of_save,_description, username from playlist inner join user on playlist.user_id = user.id_user where state='public' order by number_of_save desc;

INSERT INTO playlist_has_song (playlist_id_playlist, song_id_song) VALUES
-- Chill Vibes
(1, 31), (1, 45), (1, 48), (1, 49), (1, 50),

-- Workout Hits
(2, 7), (2, 8), (2, 13), (2, 23), (2, 44),

-- Soirée Electro
(3, 71), (3, 74), (3, 76), (3, 82), (3, 91),

-- Rock Classics
(4, 56), (4, 57), (4, 58), (4, 59), (4, 60),

-- Road Trip Tunes
(5, 14), (5, 24), (5, 33), (5, 42), (5, 65),

-- Jazz & Chill
(6, 90), (6, 92), (6, 94), (6, 96), (6, 98),

-- Summer Hits 2022
(7, 15), (7, 18), (7, 19), (7, 21), (7, 26),

-- Indie Discovery
(8, 32), (8, 41), (8, 43), (8, 46), (8, 66),

-- Party Bangers
(9, 73), (9, 78), (9, 80), (9, 83), (9, 85),

-- Acoustic Moods
(10, 67), (10, 69), (10, 71), (10, 75), (10, 77),

-- Deep House Grooves
(11, 12), (11, 17), (11, 19), (11, 25), (11, 33),

-- Throwback Jams
(12, 1), (12, 3), (12, 5), (12, 7), (12, 9),

-- Rap Français
(13, 56), (13, 58), (13, 62), (13, 64), (13, 66),

-- Classical Piano
(14, 91), (14, 93), (14, 95), (14, 97), (14, 99),

-- Afrobeats Vibes
(15, 27), (15, 29), (15, 31), (15, 33), (15, 35),

-- Feel Good Songs
(16, 4), (16, 8), (16, 10), (16, 12), (16, 14),

-- Late Night Jazz
(17, 87), (17, 88), (17, 89), (17, 90), (17, 92),

-- Lofi Study Beats
(18, 94), (18, 96), (18, 97), (18, 99), (18, 100),

-- Metal Mayhem
(19, 51), (19, 52), (19, 53), (19, 54), (19, 55),

-- Romantic Evening
(20, 40), (20, 42), (20, 44), (20, 46), (20, 48),

-- Festival Anthems
(1, 21), (1, 23), (1, 25), (1, 27), (1, 29),

-- Funky Grooves
(2, 63), (2, 65), (2, 67), (2, 69), (2, 71),

-- Latin Heat
(3, 15), (3, 17), (3, 19), (3, 21), (3, 23),

-- Ambient Soundscapes
(4, 91), (4, 93), (4, 95), (4, 97), (4, 99),

-- R&B Throwbacks
(5, 48), (5, 50), (5, 52), (5, 54), (5, 56),

-- Pop Hits 2020
(6, 21), (6, 23), (6, 25), (6, 27), (6, 29),

-- Psytrance Journey
(7, 84), (7, 86), (7, 88), (7, 90), (7, 92),

-- Soulful Sunday
(8, 67), (8, 69), (8, 71), (8, 73), (8, 75),

-- Techno Underground
(9, 75), (9, 77), (9, 79), (9, 81),

-- Blues Legends
(10, 56), (10, 58), (10, 60), (10, 62), (10, 64);



select * from playlist_has_song inner join song on song.id_song = song_id_song inner join playlist on playlist.id_playlist = playlist_id_playlist where playlist_id_playlist = ?;

select * from playlist where id_playlist = 1;

select * from author where id_author = 2;
select * from playlist inner join user on user.id_user=playlist.user_id where id_playlist = 2;
select * from song;
select username from playlist_has_song inner join song on song.id_song = song_id_song inner join playlist on playlist.id_playlist = playlist_id_playlist where playlist_id_playlist = 10 ;
select username from playlist inner join user on user.id_user = user_id where id_playlist = 7;
select author.alias, song.title, song.number_of_streams, song.date_of_post from playlist_has_song 
inner join song on song.id_song = song_id_song
inner join author on song.id_author = author.id_author  
inner join playlist on playlist.id_playlist = playlist_id_playlist 
where playlist_id_playlist = 7;
SELECT id_user,username,first_name,last_name,email,role,date_of_birth,genre,id_playlist,title,date_of_post,number_of_save,_description,state FROM user left join playlist on user.id_user = playlist.user_id WHERE user.id_user = 1;

select * from playlist where user_id=1;
select count(user.id_user) from playlist_has_song inner join playlist on playlist_id_playlist = id_playlist inner join user on playlist.user_id = id_user where id_user = 1;
DELETE playlist_has_song
FROM playlist_has_song
INNER JOIN playlist
ON playlist_id_playlist = id_playlist
WHERE playlist.user_id = 1;



SELECT
sum(SUBSTRING_INDEX(duration, ':', 1)) as minutes,
sum(SUBSTRING_INDEX(SUBSTRING_INDEX(duration, ':', -1), ':', 1)) as seconds
FROM song;

SELECT
    FLOOR(SUM(SUBSTRING_INDEX(duration, ':', 1))  + SUM(SUBSTRING_INDEX(SUBSTRING_INDEX(duration, ':', -1), ':', 1)) / 60) AS total_minutes,
    SUM(SUBSTRING_INDEX(SUBSTRING_INDEX(duration, ':', -1), ':', 1)) % 60 AS remaining_seconds
FROM song;

select * from playlist;

INSERT INTO playlist 
                (title, state,date_of_post, _description, user_id) 
                VALUES ("triks", "public","2024-10-12", "uoi", 1);


select * from song;
DELETE playlist_has_song FROM playlist_has_song inner join song on song.id_song = playlist_has_song.song_id_song where song.id_author = 1;
select * from user;

SELECT genre, role, COUNT(id_user) AS number_of_users FROM projet_harone_hugo.user GROUP BY genre, role ORDER BY genre ASC, role ASC;

SELECT genre, role, COUNT(id_user) AS number_of_users
FROM projet_harone_hugo.user
GROUP BY genre, role
UNION ALL
(SELECT 'Total' AS genre, 'All' AS role, COUNT(id_user) AS number_of_users
FROM projet_harone_hugo.user)
ORDER BY genre ASC, role ASC;
