const express = require('express');
const router = express.Router();
const genreRepo = require('../utils/genres.repository');

// Routes
router.get('/list', genreListAction);
router.get('/show/:genreId', genreShowAction);
router.post('/add', genreAddAction);
router.post('/update/:genreId', genreUpdateAction);
router.get('/del/:genreId', genreDeleteAction);

// List all genres
async function genreListAction(request, response) {
    try {
        const genres = await genreRepo.getAllGenres();
        response.send(genres);
    } catch (err) {
        console.error(err);
        response.status(500).send({ error: "Unable to fetch genres." });
    }
}

// Show details of a specific genre
async function genreShowAction(request, response) {
    try {
        const genre = await genreRepo.getGenreById(request.params.genreId);
        if (genre) {
            response.send(genre);
        } else {
            response.status(404).send({ error: "Genre not found." });
        }
    } catch (err) {
        console.error(err);
        response.status(500).send({ error: "Unable to fetch genre." });
    }
}

// Add a new genre
async function genreAddAction(request, response) {
    try {
        const name = request.body.name;
        if (!name) {
            throw new Error("Genre name is required.");
        }
        const genreId = await genreRepo.addGenre(name);
        response.send({ genreId });
    } catch (err) {
        console.error(err);
        response.status(400).send({ error: err.message });
    }
}

// Update an existing genre
async function genreUpdateAction(request, response) {
    try {
        const genreId = request.params.genreId;
        const name = request.body.name;
        if (!name) {
            throw new Error("Genre name is required.");
        }
        const numRows = await genreRepo.editGenre(genreId, name);
        response.send({ rowsUpdated: numRows });
    } catch (err) {
        console.error(err);
        response.status(400).send({ error: err.message });
    }
}

// Delete a genre
async function genreDeleteAction(request, response) {
    try {
        const genreId = request.params.genreId;
        const numRows = await genreRepo.deleteGenre(genreId);
        response.send({ rowsDeleted: numRows });
    } catch (err) {
        console.error(err);
        response.status(500).send({ error: "Unable to delete genre." });
    }
}

module.exports = router;
