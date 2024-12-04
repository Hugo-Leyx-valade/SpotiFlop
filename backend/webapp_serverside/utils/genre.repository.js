// utils/songs.repository.js
pool = require(__dirname + "\\db.include.js"); // use same folder as the current file



module.exports = {
    
    async getSongsFromGenreId(genreId) {
        try {
            let sql = "SELECT * FROM song inner join author on song.id_author = author.id_author WHERE id_genre=?;";
            const [rows, fields] = await pool.execute(sql, [genreId]);
            console.log("songs find: "+JSON.stringify(rows));

            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },

    async getGenreById(genreId) {
        try {
            let sql = "SELECT * FROM genre WHERE id_genre = ?";
            const [rows, fields] = await pool.execute(sql, [genreId]);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
},

    async getAllGenre() {
        try {
            let sql = "SELECT g.id_genre, g.name, COUNT(s.id_song) AS song_count FROM genre g LEFT JOIN song s ON g.id_genre = s.id_genre GROUP BY g.id_genre, g.name ORDER BY song_count desc;";
            const [rows, fields] = await pool.execute(sql);
            console.log("Genre FETCHED: "+rows.length);       
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    }


}   // end of module.exports
