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
            let sql = "SELECT * FROM song";
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
            
            let sql = "SELECT * FROM song WHERE id_song = ?";
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


async deleteInPlaylist(songId){
    let sql = " DELETE FROM playlist_has_song WHERE song_id_song = ?";
    await pool.execute(sql,[songId]);
},


    async delOneSong(songId){ 
        try {
            deleteInPlaylist(songId)
            let sql = "DELETE FROM songs WHERE song_id = ?";
            const [okPacket, fields] = await pool.execute(sql, [ songId ]); 
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },








    async addOneSong(genreId){ 
        try {
            let sql = "INSERT INTO songs (song_id, song_genre) VALUES (NULL, ?) ";
            const [okPacket, fields] = await pool.execute(sql, [ genreId ]); 
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },


    
    async editOneSong(songGenre, songTitle, songDuration, songNumberOfStream, songDateOfPost,songLyrics, songAuthor, songId){ 
        try {
            let sql = "UPDATE song SET id_genre=?, title=?, duration=?, number_of_streams=?, date_of_post=?, lyrics = ?, id_author = ? WHERE id_song=? "; // positional parameters
            const [okPacket, fields] = await pool.execute(sql, 
                  [songGenre ?? 1, songTitle ?? " ", songDuration ?? 0, songNumberOfStream ?? 0, songDateOfPost ?? "00-13-2013",songLyrics ?? " ", songAuthor ?? 1, songId]); // positional parameters
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    }
};
