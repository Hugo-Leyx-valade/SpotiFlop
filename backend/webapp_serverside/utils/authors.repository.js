// utils/songs.repository.js
pool = require(__dirname + "\\db.include.js"); // use same folder as the current file

async function deleteSongRelation(authorId){
    let sql = " DELETE FROM song WHERE id_author = ?";
    await pool.execute(sql,[authorId]);
}


module.exports = {
    getBlankAuthor(){ // defines the entity model
        return {
            "author_id": 0,
            "author_alias": "",
            "author_first_name": "",
            "author_last_name": "",
            "author_biography": "",
            "author_veified": 0
        };
    },
    
    async getAllAuthors(){ 
        try {
            let sql = "SELECT * FROM author";
            const [rows, fields] = await pool.execute(sql);
            console.log(rows[1])
            console.log("Author FETCHED: "+rows.length);       
            return rows;
        }
        catch (err) {
            console.log(err + "hugo");
            throw err; 
        }
    },


    async getAuthorByAlias(name){ 
        try {
            let sql = "SELECT * FROM author WHERE upper(alias) like upper(?)";
            const [rows, fields] = await pool.execute(sql, [ `%${name}%` ]);
            console.log("songs FILTERED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },

    async getOneAuthor(authorId){ 
        try {
            // sql = "SELECT * FROM songs INNER JOIN genres ON song_genre=genre_id WHERE song_id = "+songId; 
            // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input (not very good) OR prepared statements (good) OR use orm (GOOD!)
            
            let sql = "SELECT * FROM author WHERE author.id_author = ?;";
            const [rows, fields] = await pool.execute(sql, [ authorId ]);
            console.log("author "+JSON.stringify(rows));
            if (rows.length > 0) {
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


    async delOneAuthor(authorId){ 
        try {
            deleteSongRelation(authorId)
            let sql = "DELETE FROM author WHERE id_author = ?";
            const [okPacket, fields] = await pool.execute(sql, [ authorId ]); 
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },








    async addOneAuthor(authorAlias,authorFirstName,authorLastName,authorBiography,authorVeified){ 
        try {

            let sql = "INSERT INTO author (alias,first_name,last_name,biography,verified) VALUES (?,?,?,?,?) ";
            const [okPacket, fields] = await pool.execute(sql, [ authorAlias,authorFirstName,authorLastName,authorBiography,authorVeified ]); 
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },



    async editOneAuthor(authorsId,authorAlias,authorFirstName,authorLastName,authorBiography,authorVeified){ 
        try {
            let sql = "UPDATE author SET alias=?, first_name=?, last_name=?, biography=?, verified=? WHERE id_author=? "; // positional parameters
            const [okPacket, fields] = await pool.execute(sql, 
                  [authorAlias ?? " ",authorFirstName ?? " ",authorLastName ?? " ",authorBiography ?? " ",authorVeified ?? 0 ,authorsId]); // positional parameters
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },


    async getSongByAuthor(authorId){
        try {
            let sql = "SELECT * FROM song WHERE id_author = ?";
            const [rows, fields] = await pool.execute(sql, [ authorId ]);
            /*console.log("songs author "+JSON.stringify(rows));*/
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
    }},

};
