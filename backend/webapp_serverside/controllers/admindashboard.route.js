// controllers/carsapi.route.js
const express = require('express');
const router = express.Router();
const infoRepo = require('../utils/adminpanel.repository');

router.get('/list', infoListAction);


async function infoListAction(request, response) {
    var infos = await infoRepo.getNumberOfSongPerAuthor();
    response.send(JSON.stringify(infos));
}

module.exports = router;