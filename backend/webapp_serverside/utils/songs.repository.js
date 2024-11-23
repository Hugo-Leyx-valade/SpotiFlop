// utils/songs.repository.js
pool = require(__dirname + "\\db.include.js"); // use same folder as the current file

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
            let sql = "SELECT * FROM song inner join genre on song.id_genre=genre.id_genre inner join author on song.id_author=author.id_author";
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
            
            let sql = "SELECT * FROM song inner join genre on song.id_genre=genre.id_genre inner join author on song.id_author=author.id_author WHERE id_song = ?";
            const [rows, fields] = await pool.execute(sql, [ songId ]);
            console.log("SINGLE CAR FETCHED: "+rows.length);
            if (rows.length == 1) {
                console.log("song car: "+rows[0]);
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
    async addOneSong(songId, songTitle, songDuration, songNumberOfPrice, songDate_OfPost, songLyrics, songIdAuthors){ 
        try {
            let sql = "INSERT INTO song (title, duration, number_of_streams, date_of_post, lyrics, id_author, id_genre) VALUES (?) ";
            const [okPacket, fields] = await pool.execute(sql, [ songId, songTitle, songDuration, songNumberOfPrice, songDate_OfPost, songLyrics, songIdAuthors ]); 
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },


    async editOneSong(songId, songTitle, songDuration, songNumberOfStreams, songLyrics, songIdAuthors,songDateOfPost) {
        const sql = `
            select * from song;
        `;
        try {
            const [okPacket, fields] = await pool.execute(sql, [
                songTitle, 
                songDuration, 
                songNumberOfStreams, 
                songDateOfPost,
                songLyrics, 
                songIdAuthors, 
                songId
            ]);
            console.log('Update Successful!', okPacket);
            return okPacket.affectedRows; // Return affected rows
        } catch (error) {
            console.error('Error updating song:', error.message);
            throw error;
        }
    }}

