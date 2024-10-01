					    ███████╗██████╗  ██████╗ ████████╗██╗███████╗██╗      ██████╗ ██████╗ 
					    ██╔════╝██╔══██╗██╔═══██╗╚══██╔══╝██║██╔════╝██║     ██╔═══██╗██╔══██╗
					    ███████╗██████╔╝██║   ██║   ██║   ██║█████╗  ██║     ██║   ██║██████╔╝
					    ╚════██║██╔═══╝ ██║   ██║   ██║   ██║██╔══╝  ██║     ██║   ██║██╔═══╝ 
					    ███████║██║     ╚██████╔╝   ██║   ██║██║     ███████╗╚██████╔╝██║     
					    ╚══════╝╚═╝      ╚═════╝    ╚═╝   ╚═╝╚═╝     ╚══════╝ ╚═════╝ ╚═╝     
								  
							    By Leyx-valade Hugo and Chitam Harone
                                                                               

Music is a subject that can be created by many artists with their own style. Furthermore, since music is made and listened to worldwide, it was necessary to categorize them into different categories and genres to make it easier for listeners to search for them. For example, if I like US rap, I can search for a specific category to find music that matches my taste.

Tables : 

-Author: has a primary key (id_author), an alias (like Orelsan), a first name and a last name,a biography (quick description of his life),a foreign key of song called "song_id_song", a number of listeners that represents the singer's community and finally a number of subscribers.

-Song: this table have as a primary key "id_song", "title" to name it, "duration" to know the length of a song, the number of time a song is heard (number of streams), the date of a song's post (date of post) and finally the "lyrics".

-Playlist : possesses a primary key (id_playlist), a name (title), the date of a playlist's post (date of post), how many users saved it (number of save), a brief explanation of the playlist about the types it contains (description) and finaly the attribute "state" signifying if the playlist is public or private.

-Users : has a primary key called "id_users", an username, a first and a last name, an email (jnzjkvnzjk@gmail.com), a password (Kjd?!LMo+), a role (if he is a user or a creator), an age (18y old) and finaly a foreign key of the playlist table (to make some relations between them).

-Genre : a really simple table that has an id (id_genre) and a name (name).




Their relations : 

-Playlist with Users and Song: Playlist has a relation with the "Song" table (1,N) and the song table also has a 1,N relation with the playlist which leads to the creation of a connecting table that has the primary key of each table. Furthermore, "Playlist" is also connected (1,1) with the "Users" table. "Users" has a 1,N relation with the "Playlist" table.

-song/author: The song table has a 1,1 relation with the author table while author has a 1,N relation with it.

-The table song with the tables playlist, author and genre : Song table has a 1,N relation with genre and playlist and they also has the same type of relation wich leads to the creation of the connectors tables "genre_has_song" and "playlist_has_song" that contains the primary keys of each tables as foreign keys.

