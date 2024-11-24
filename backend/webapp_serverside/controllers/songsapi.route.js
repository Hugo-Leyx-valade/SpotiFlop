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
    response.send(JSON.stringify(oneSong));
}
async function songDelAction(request, response) {
    // TODO: first remove extras for car, unless the car cannot be removed!!!
    var numRows = await songRepo.delOneSong(request.params.songId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}
async function songUpdateAction(request, response) {
    // var json = JSON.stringify(request.body); // bodyParser can process json in body + regular POST form input too
    // console.log(json);
    // TODO: !!! INPUT VALIDATION !!!
    var songID = request.params.songID;
    if (songID==="0") songID = await songRepo.addOneSong(request.body.song_genre);
    var numRows = await songRepo.editOneSong(
        request.body.id_genre, 
        request.body.title, 
        request.body.duration, 
        request.body.number_of_streams, 
        request.body.date_of_post,
        request.body.lyrics,
        request.body.id_author,
        songID);
    let result = { rowsUpdated: numRows };
    response.send(JSON.stringify(result));
}

module.exports = router;