const express = require('express');
const router = express.Router();
const genreRepo = require('../utils/genre.repository');

router.get('/list', allGenresAction);
router.get('/show/:id', songFromGenreIdAction);


async function allGenresAction(request, response) {
    var infos = await genreRepo.getAllGenre();
    response.send(JSON.stringify(infos));
}

async function songFromGenreIdAction(request, response) {
    try{
        var errorState = 0;
        var genre = await genreRepo.getGenreById(request.params.id);
        console.log(genre.length===0);
        if(genre.length===0){
            errorState = 1;
        }
        console.log("error : " + JSON.stringify(errorState));
        var songs = await genreRepo.getSongsFromGenreId(request.params.id);
        response.send(JSON.stringify({"error":errorState,"object":{"genre": genre, "songs" : songs}}));
    } catch (error) {
        response.send(JSON.stringify({"error":1,"object":null}));
    }
}

module.exports = router;