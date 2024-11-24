// controllers/authorsapi.route.js
const express = require('express');
const router = express.Router();
const authorRepo = require('../utils/authors.repository');

// Routes
router.get('/list', authorListAction);
router.get('/show/:authorId', authorShowAction);
router.get('/del/:authorId', authorDelAction);
router.post('/update/:authorId', authorUpdateAction);

// http://localhost:9000/authorsapi/list
async function authorListAction(request, response) {
        var authors = await authorRepo.getAllAuthors();
        response.send(JSON.stringify(authors));
}

async function authorShowAction(request, response) {
    try {
        var oneAuthor = await authorRepo.getOneAuthor(request.params.authorId);
        response.send(JSON.stringify(oneAuthor));
    } catch (error) {
        response.status(500).send({ error: 'Failed to retrieve the author.' });
    }
}

async function authorDelAction(request, response) {
    try {
        // TODO: Add logic to handle dependent data if needed before deletion
        var numRows = await authorRepo.delOneAuthor(request.params.authorId);
        let result = { rowsDeleted: numRows };
        response.send(JSON.stringify(result));
    } catch (error) {
        response.status(500).send({ error: 'Failed to delete the author.' });
    }
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

module.exports = router;