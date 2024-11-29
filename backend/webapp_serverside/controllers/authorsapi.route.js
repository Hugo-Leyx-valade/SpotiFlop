// controllers/authorsapi.route.js
const express = require('express');
const router = express.Router();
const authorRepo = require('../utils/authors.repository');

// Routes
router.get('/list', authorListAction);
router.get('/show/:authorId',authorShowAction );
router.get('/del/:authorId', authorDelAction);
router.post('/update/:authorId', authorUpdateAction);
router.get("/songAuthor/:authorId",authorListSearchAction );
router.post('/add', authorAddAction);


// http://localhost:9000/authorsapi/list
async function authorListAction(request, response) {
        var authors = await authorRepo.getAllAuthors();
        response.send(JSON.stringify(authors));
}

async function authorShowAction(request, response) {
    try {
        var oneAuthor = await authorRepo.getOneAuthor(request.params.authorId);
        var songs = await authorRepo.getSongByAuthor(request.params.authorId);
        console.log( "caca" + JSON.stringify({ "author": oneAuthor, "songs": songs }));
        response.send(JSON.stringify({ "author": oneAuthor, "songs": songs }));
    } catch (error) {
        response.status(500).send({ error: 'Failed to retrieve the author.' });
    }
}

async function authorDelAction(request, response) {
        // TODO: Add logic to handle dependent data if needed before deletion
        var numRows = await authorRepo.delOneAuthor(request.params.authorId);
        let result = { rowsDeleted: numRows };
        response.send(JSON.stringify(result));
    }

async function authorUpdateAction(request, response) {
        // Validate input data if necessary
        var authorId = request.params.authorId;
        if (authorId === "0") authorId = await authorRepo.addOneAuthor(request.body.author_name);
        var numRows = await authorRepo.editOneAuthor(
            authorId,
            request.body.alias,
            request.body.first_name,
            request.body.last_name,
            request.body.biography,
            request.body.verified);
        let result = { rowsUpdated: numRows };
        response.send(JSON.stringify(result));
}

async function authorListSearchAction(request, response) {
    try {
        var songs = await authorRepo.getSongByAuthor(request.params.authorId);
        response.send(JSON.stringify(songs));
    } catch (error) {
        response.status(500).send({ error: 'Failed to retrieve the songs.' });
    }
}

async function authorAddAction(request, response) {
    // var json = JSON.stringify(request.body); // bodyParser can process json in body + regular POST form input too
    // console.log(json);    var songId = request.params.songId; 
    var numRows = await authorRepo.addOneAuthor(
            request.body.alias ?? "Unknown", 
            request.body.first_name ?? 'Unknown', 
            request.body.last_name ?? 'Unknown',
            request.body.biography ?? "Unknown",
            request.body.verified ?? 0,
        );
        let result = { rowsUpdated: numRows };
        response.send(JSON.stringify(result));
    }

module.exports = router;