const pool = require(__dirname + "\\db.include.js");

module.exports = {
    async getAllGenres() {
        try {
            let sql = "SELECT * FROM genre";
            const [rows, fields] = await pool.execute(sql);
            console.log("GENRES FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getGenreById(genreId) {
        try {
            let sql = "SELECT * FROM genre WHERE id_genre = ?";
            const [rows, fields] = await pool.execute(sql, [genreId]);
            if (rows.length === 1) {
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async addGenre(name) {
        try {
            let sql = "INSERT INTO genre (name) VALUES (?)";
            const [okPacket] = await pool.execute(sql, [name]);
            console.log("GENRE INSERTED: " + JSON.stringify(okPacket));
            return okPacket.insertId;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async editGenre(genreId, name) {
        try {
            let sql = "UPDATE genre SET name = ? WHERE id_genre = ?";
            const [okPacket] = await pool.execute(sql, [name, genreId]);
            console.log("GENRE UPDATED: " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async deleteGenre(genreId) {
        try {
            let sql = "DELETE FROM genre WHERE id_genre = ?";
            const [okPacket] = await pool.execute(sql, [genreId]);
            console.log("GENRE DELETED: " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
};
