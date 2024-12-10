const { getFreePort } = require("webpack-dev-server");

// utils/songs.repository.js
pool = require(__dirname + "\\db.include.js"); // use same folder as the current file

async function deleteInPlaylist(songId){
    let sql = " DELETE FROM playlist_has_song WHERE song_id_song = ?";
    await pool.execute(sql,[songId]);
}

function formatDate(dateString) {
    const date = new Date(dateString); // Parse the input date string
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}


module.exports = {
    

    async getNumberOfSongPerAuthor(){ 
        try {
            let sql = "select author.id_author, author.alias, count(author.id_author) as quantity from author inner join song on author.id_author = song.id_author group by author.id_author;";
            const [rows, fields] = await pool.execute(sql);
            return rows;
        }
        catch (err) {
            console.log(err + "hugo");
            throw err; 
        }
    },
   
    async getPopulation(){ 
        try {
            let sql = "SELECT genre, role, COUNT(id_user) AS number_of_users FROM projet_harone_hugo.user GROUP BY genre, role ORDER BY genre ASC, role ASC;";
            const [rows, fields] = await pool.execute(sql);
            return rows;
        }
        catch (err) {
            console.log(err + "hugo");
            throw err; 
        }
    },

    async getGenreStatistique(){
        try {
            let sql = "select genre.name, count(id_song) as count from song inner join genre on song.id_genre = genre.id_genre group by genre.name order by count desc;";
            const [rows, fields] = await pool.execute(sql);
            return rows;
        }
        catch (err) {
            console.log(err + "hugo");
            throw err; 
        }
    },

    async authorsWithoutImage(){
        try {
            let sql = "select author.id_author, author.alias from author where image='default.png';";
            const [rows, fields] = await pool.execute(sql);
            return rows;
        }
        catch (err) {
            console.log(err + "hugo");
            throw err; 
        }
    }

};