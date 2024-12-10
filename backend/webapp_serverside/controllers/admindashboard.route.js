// controllers/carsapi.route.js
const express = require('express');
const router = express.Router();
const infoRepo = require('../utils/adminpanel.repository');

router.get('/list', infoListAction);


async function infoListAction(request, response) {
    var infos = await infoRepo.getNumberOfSongPerAuthor();
    var population = await infoRepo.getPopulation();
    var genreStatistique = await infoRepo.getGenreStatistique();
    var authorsWithoutImage = await infoRepo.authorsWithoutImage();
    response.send(JSON.stringify({"numberOfSongPerAuthor": infos, 'population': population, 'genreStatistique': genreStatistique,"authorsWithoutImage":authorsWithoutImage }));
}

module.exports = router;