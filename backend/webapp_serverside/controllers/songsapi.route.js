// controllers/carsapi.route.js
const express = require('express');
const router = express.Router();
const songRepo = require('../utils/songs.repository');

router.get('/genre', genreListAction);
router.get('/list', songListAction);
router.get('/show/:songId', songShowAction);
router.get('/del/:songId', songDelAction);
router.post('/update/:songId', songUpdateAction);
router.post('/add', songAddAction);

// http://localhost:9000/carsapi/brands
async function genreListAction(request, response) {
    var genres = await songRepo.getAllGenre();
    response.send(JSON.stringify(genres));
}

async function songListAction(request, response) {
    console.log("je suis dans songListAction");
    var songs = await songRepo.getAllSongs();
    response.send(JSON.stringify(songs));
}
async function songShowAction(request, response) {
    try{
        var errorState = 0;
        var oneSong = await songRepo.getOneSong(request.params.songId);
        if(oneSong === false){
            errorState = 1;
        };
        response.send(JSON.stringify({"error":errorState, "object":oneSong}));
    }catch(error){
        response.send(JSON.stringify({"error":errorState, "object":null}));
    }
}


async function songDelAction(request, response) {
    // TODO: first remove extras for car, unless the car cannot be removed!!!
    try{
    var numRows = await songRepo.delOneSong(request.params.songId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
    }catch(error){
        response.send(JSON.stringify(false));
    }
}


function formatDate(dateString) {
    const date = new Date(dateString); // Parse the input date string
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;

}

async function songUpdateAction(request, response) {
    var songID = request.params.songId;
    if(request.body.title.length === 0){
        response.send(JSON.stringify(false));
    }
    else{
    var numRows = await songRepo.editOneSong(
            songID, 
            request.body.title, 
            request.body.duration, 
            request.body.number_of_streams,
            formatDate(request.body.date_of_post),
            request.body.lyrics,
            request.body.alias,
            request.body.name,
            );

        let result = { rowsUpdated: numRows };
        response.send(JSON.stringify(result));
    }
}



async function songAddAction(request, response) {
    // var json = JSON.stringify(request.body); // bodyParser can process json in body + regular POST form input too
    // console.log(json);    var songId = request.params.songId; 
    var numRows = await songRepo.addOneSong(
            request.body.title ?? "Unknown", 
            request.body.duration ?? 0, 
            request.body.number_of_streams ?? 0,
            formatDate(request.body.date_of_post) ?? formatDate(new Date()), 
            request.body.lyrics ?? "Unknown",
            request.body.alias ?? "Unknown",
            request.body.name  ?? "Unknown"
        );
        let result = { rowsUpdated: numRows };
        response.send(JSON.stringify(result));
    }


module.exports = router;