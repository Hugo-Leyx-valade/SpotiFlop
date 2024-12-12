// utils/songs.repository.js
pool = require(__dirname + "\\db.include.js"); // use same folder as the current file

async function deleteInPlaylist(songId){
    let sql = " DELETE FROM playlist_has_song WHERE song_id_song = ?";
    await pool.execute(sql,[songId]);
    
}


async function isTimeFormated(time){
    // Regular expression for "mm:ss" format
    const timeRegex = /^[0-5]\d:[0-5]\d$/;

    // Test the string against the regex
    return timeRegex.test(time);
}

function formatDate(dateString) {
    const date = new Date(dateString); // Parse the input date string
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

async function getGenreIdByName(genreName) {
    let sql = "SELECT id_genre FROM genre WHERE upper(name) = upper(?);";
    const [rows, fields] = await pool.execute(sql, [genreName]);
    console.log(rows);
    // Check if a genre was found
    if (rows.length > 0) {
        return rows[0].id_genre; // Return the genre's ID
    } else {
        return false;
    }
}

async function getAuthorIdByAlias(authorAlias) {
    let sql = "SELECT id_author FROM author WHERE upper(alias) = upper(?)";
    const [rows, fields] = await pool.execute(sql, [authorAlias]);

    // Check if an author was found
    if (rows.length > 0) {
        return rows[0].id_author; // Return the author's ID
    } else {
        return false;
    }
}


module.exports = {
    getBlankSong(){ // defines the entity model
        return {
            "song_id": 0,
            "song_genre": 0,
            "song_name": "XXXX",
            "song_baseprice": 0,
            "song_isfancy": 0,
            "song_realprice": 0
        };
    },
    async getAllGenres(){ // TODO? move to genres.repository.js
        try {
            let sql = "SELECT * FROM genres";
			// .execute() does: getConnection() + prepare() + query() + releaseConnection()
            const [rows, fields] = await pool.execute(sql); 
            console.log("BRANDS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            // TODO: log/send error ... 
            console.log(err);
            throw err; // return false ???
        }
    },
    async getAllSongs(){ 
        try {
            let sql = "SELECT * FROM song inner join author on song.id_author = author.id_author inner join genre on song.id_genre = genre.id_genre order by id_song asc;";
            const [rows, fields] = await pool.execute(sql);
            console.log("SONGS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err + "hugo");
            throw err; 
        }
    },
    async getSongsByName(name){ 
        try {
            let sql = "SELECT * FROM songs INNER JOIN genres ON song_genre=genre_id WHERE upper(name) like upper(?)";
            const [rows, fields] = await pool.execute(sql, [ `%${name}%` ]);
            console.log("songs FILTERED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async getOneSong(songId){ 
        try {
            // sql = "SELECT * FROM songs INNER JOIN genres ON song_genre=genre_id WHERE song_id = "+songId; 
            // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input (not very good) OR prepared statements (good) OR use orm (GOOD!)
            
            let sql = "SELECT * FROM song inner join author on song.id_author = author.id_author inner join genre on song.id_genre = genre.id_genre WHERE id_song = ?";
            const [rows, fields] = await pool.execute(sql, [ songId ]);
            console.log("song car: "+rows.length);
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },



    async delOneSong(songId){ 
        try {
            deleteInPlaylist(songId)
            let sql = "DELETE FROM song WHERE id_song = ?";
            const [okPacket, fields] = await pool.execute(sql, [ songId ]);
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },



    async addOneSong(songTitle, songDuration, songNumberOfStream, songDateOfPost, songLyrics, songAuthor, songGenre) {
        try {
            if (!songGenre || typeof songGenre !== "string") {
                throw new Error("Invalid genre name provided.");
            }
            if (!songTitle || typeof songTitle !== "string") {
                throw new Error("Invalid song title provided.");
            }
            const genreId = await getGenreIdByName(songGenre);
            if(!genreId){
                return false;
            }
            const authorId = await getAuthorIdByAlias(songAuthor) // Translate genre name to ID
            if(!authorId){
                return false;
            }
            const time = await isTimeFormated(songDuration);
            if(time===false){
                return false;
            }
            let sql = `
                INSERT INTO song 
                (title, duration, number_of_streams, date_of_post, lyrics, id_author, id_genre) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const [okPacket, fields] = await pool.execute(sql, [
                songTitle,
                songDuration,
                parseInt(songNumberOfStream),
                songDateOfPost,
                songLyrics,
                authorId, // Use the fetched author ID
                genreId   // Use the fetched genre ID
            ]);
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId; // Return the new song's ID
        } catch (err) {
            return false;
        }
    },


    
    async editOneSong(songId, songTitle, songDuration, songNumberOfStream,dateOfPost, songLyrics, songAuthor, songGenre) {
        try {
            console.log(songGenre);
            const genreId = await getGenreIdByName(songGenre);
            if(genreId===false){
                console.log("genreId not found");
                return false;
            }
            const authorId = await getAuthorIdByAlias(songAuthor) // Translate genre name to ID
            if(!authorId){
                console.log("authorId not found");

                return false;
            }
            const time = await isTimeFormated(songDuration);
            if(time===false){
                console.log("time not found");
                return false;
            }
            let sql = `
                UPDATE song SET id_genre=?, title=?, duration=?, number_of_streams=?,date_of_post = ? , lyrics=?, id_author=? WHERE id_song=?
            `;
            const [okPacket] = await pool.execute(sql, [
                parseInt(genreId),
                songTitle,
                songDuration,
                songNumberOfStream,
                formatDate(dateOfPost),
                songLyrics,
                parseInt(authorId),
                songId
            ]);
            return okPacket.affectedRows;
        } catch (err) {
            return false;
        }
    },

};
