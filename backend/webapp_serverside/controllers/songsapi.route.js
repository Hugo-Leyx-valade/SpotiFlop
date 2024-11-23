// controllers/carsapi.route.js
const express = require('express');
const router = express.Router();
const songRepo = require('../utils/songs.repository');

router.get('/genre', genreListAction);
router.get('/list', songListAction);
router.get('/show/:songId', songShowAction);
router.get('/del/:songId', songDelAction);
router.post('/update/:songId', songUpdateAction);

// http://localhost:9000/carsapi/brands
async function genreListAction(request, response) {
    var genres = await songRepo.getAllGenre();
    response.send(JSON.stringify(genres));
}

async function songListAction(request, response) {
    var songs = await songRepo.getAllSongs();
    response.send(JSON.stringify(songs));
}
async function songShowAction(request, response) {
    var oneSong = await songRepo.getOneSong(request.params.songId);
    console.log(oneSong);
    response.send(JSON.stringify(oneSong));
}
async function songDelAction(request, response) {
    // TODO: first remove extras for car, unless the car cannot be removed!!!
    var numRows = await songRepo.delOneSong(request.params.songId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}

function formatDate(incomingDate) {
    const date = new Date(incomingDate);
// Format the date (e.g., as 'YYYY-MM-DD')
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
}



async function songUpdateAction(request, response) {
    var songID = request.params.songId;
    console.log(request.body);

    /*if (songID === "0") {
        songID = await songRepo.addOneSong(
            request.body.song_genre
        );
    }*/

    var numRows = await songRepo.editOneSong(songID, 
            request.body.title, 
            request.body.duration, 
            request.body.number_of_streams, 
            request.body.lyrics,
            request.body.id_author, 
            formatDate(request.body.date_of_post),);

    let result = { rowsUpdated: numRows };
    response.send(JSON.stringify(result));
}

module.exports = router;