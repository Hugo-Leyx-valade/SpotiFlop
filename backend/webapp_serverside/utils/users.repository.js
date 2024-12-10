// utils/songs.repository.js
pool = require(__dirname + "\\db.include.js"); // use same folder as the current file
const crypto = require('crypto');

async function deleteInPlaylist(userId){
    let sql = " DELETE playlist_has_song FROM playlist_has_song INNER JOIN playlist ON playlist_id_playlist = id_playlist WHERE playlist.user_id = ?;";
    let sql2 = " DELETE FROM playlist WHERE user_id = ?;";
    await pool.execute(sql,[userId]);
    await pool.execute(sql2,[userId]);
}

function formatDate(dateString) {
    const date = new Date(dateString); // Parse the input date string
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

module.exports = {
    getBlankUser(){ // defines the entity model
        return {
            "song_id": 0,
            "song_genre": 0,
            "song_name": "XXXX",
            "song_baseprice": 0,
            "song_isfancy": 0,
            "song_realprice": 0
        };
    },
    async getAllPlaylist(){ // TODO? move to genres.repository.js
        try {
            let sql = "SELECT * FROM playlist";
			// .execute() does: getConnection() + prepare() + query() + releaseConnection()
            const [rows, fields] = await pool.execute(sql); 
            console.log("playlist FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            // TODO: log/send error ... 
            console.log(err);
            throw err; // return false ???
        }
    },
    async getAllUsers(){ 
        try {
            let sql = "SELECT * FROM user;";
            const [rows, fields] = await pool.execute(sql);
            console.log("users FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err + "hugo");
            throw err; 
        }
    },
    async getUserbyName(userName){ 
        /*try {
            let sql = "SELECT * FROM user where upper(name) like upper(?)";
            const [rows, fields] = await pool.execute(sql, [ `%${name}%` ]);
            console.log("songs FILTERED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }*/

        try {
            let conn = await pool.getConnection();
            let sql = "SELECT id_user,username,email,role FROM user WHERE username = ?"; 
            // must leave out the password+hash info from result!
            const [rows, fields] = await pool.execute(sql, [ userName ]);
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
    async getOneUser(userId){ 
        try {
            // sql = "SELECT * FROM songs INNER JOIN genres ON song_genre=genre_id WHERE song_id = "+songId; 
            // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input (not very good) OR prepared statements (good) OR use orm (GOOD!)
            if (!userId) {
                throw new Error("userId is undefined or null");
            }
            let sql = "select * from user where id_user=?;";
            const [rows, fields] = await pool.execute(sql, [ userId ]);
            console.log("user : "+rows.values);
            if (rows.length >= 0) {
                return rows[0];
            } else {
                return false;
            }
        }
        catch (err) {
            console.log("Error in getOneUser", err);
            throw err; 
        }
    },

    async areValidCredentials(username, password) {
        if (!username || !password) {
          throw new Error("Missing username or password for login.");
        }
        try {
          console.log("Vérification des identifiants :", { username, password });
          let sql = "SELECT * FROM user WHERE username = ? AND password COLLATE utf8mb4_general_ci  = sha2(concat(user_created, ?), 224) COLLATE utf8mb4_general_ci ";
          const [rows] = await pool.execute(sql, [username, password]);
          console.log("Résultats de la requête :", rows);
      
          if (rows.length === 1) {
            return rows[0]; // Retourne l'utilisateur
          } else {
            console.log("Aucune correspondance trouvée pour les identifiants.");
            return null;
          }
        } catch (err) {
          console.error("Erreur dans areValidCredentials :", err);
          throw err;
        }
      },

      async createUser(username, first_name, last_name, email, password, date_of_birth, genre) {
        if (!username || !email || !password) {
            throw new Error("Le nom d'utilisateur, l'email et le mot de passe sont obligatoires.");
        }
    
        try {
            const sqlInsert = `
                INSERT INTO user 
                (username, first_name, last_name, email, password, role, date_of_birth, genre, user_created) 
                VALUES (?, ?, ?, ?, SHA2(CONCAT(CURRENT_TIMESTAMP, ?), 224), 'user', ?, ?, CURRENT_TIMESTAMP)
            `;
            await pool.execute(sqlInsert, [
                username, first_name, last_name, email, password, formatDate(date_of_birth), genre,
            ]);
    
            return { success: true };
        } catch (err) {
            console.error("Erreur dans createUser :", err);
            return { success: false, message: err.message };
        }
    },
    

    async getPlaylistByUserId(userId){
        try {
            // sql = "SELECT * FROM songs INNER JOIN genres ON song_genre=genre_id WHERE song_id = "+songId; 
            // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input (not very good) OR prepared statements (good) OR use orm (GOOD!)
            
            let sql = "select * from playlist where user_id=?;";
            const [rows, fields] = await pool.execute(sql, [ userId ]);
            console.log("user : "+rows.values);
            if (rows.length >= 0) {
                return rows;
            } else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },


    async delOneUser(userId){ 
        try {
            deleteInPlaylist(userId);
            let sql = "DELETE FROM user WHERE id_user = ?";
            const [okPacket, fields] = await pool.execute(sql, [ userId ]);
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },



    async addOneSong(username, first_name, last_name, email, password, role, date_of_birth,id_genre) {
        try {
            // Fetch author ID based on the alias
            // Fetch genre ID based on the genre name

            let sql = `
                INSERT INTO user 
                (username, first_name, last_name, email, password, role, date_of_birth,id_genre) 
                VALUES (?, ?, ?, ?, ?, ?, ?,?)
            `;
            const [okPacket, fields] = await pool.execute(sql, [
                username, first_name, last_name, email, password, role, formatDate(date_of_birth),id_genre // Use the fetched genre ID
            ]);

            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId; // Return the new song's ID
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    
    async editOneUser(username, first_name, last_name, email, password, role, date_of_birth,genre,id_user) {
        try {
            
    
            let sql = `
                UPDATE user 
                SET username=?, first_name=?, last_name=?, email=?, password=?, role=?, date_of_birth=?,genre=? 
                WHERE id_user=?
            `;
            const [okPacket] = await pool.execute(sql, [
                username??"Unknown", first_name??"Unknown", last_name??"Unknown", email??"Unknown", password??"Unknown", role??0, formatDate(date_of_birth)??"2004-13-06",genre??1,id_user
            ]);
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

};
    