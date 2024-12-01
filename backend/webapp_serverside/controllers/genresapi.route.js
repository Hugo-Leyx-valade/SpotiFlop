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
    var genre = await genreRepo.getGenreById(request.params.id);
    var songs = await genreRepo.getSongsFromGenreId(request.params.id);
    response.send(JSON.stringify({genre: genre, songs : songs}));
    } catch (error) {
        response.status(500).send({ error: 'Failed to retrieve the genre.' });
    }
}

module.exports = router;