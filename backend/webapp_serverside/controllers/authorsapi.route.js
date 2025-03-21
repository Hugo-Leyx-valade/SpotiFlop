const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../../webapp_clientside/src/assets');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

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
        var errorState = 0;
        var oneAuthor = await authorRepo.getOneAuthor(request.params.authorId);
        console.log('author des songs : ' + JSON.stringify(oneAuthor))
        if(oneAuthor === false){
            errorState = 1;
        }
        var songs = await authorRepo.getSongByAuthor(request.params.authorId);
        console.log( "caca" + JSON.stringify({"error": 0 , "object":{ "author": oneAuthor, "songs": songs }}.object.songs.length));
        response.send(JSON.stringify({"error": errorState , "object":{ "author": oneAuthor, "songs": songs }}));
    } catch (error) {
        response.send(JSON.stringify({"error": 1 , "object":null}));
    }
}

async function authorDelAction(request, response) {
        // TODO: Add logic to handle dependent data if needed before deletion
        try{
        var numRows = await authorRepo.delOneAuthor(request.params.authorId);
        let result = { rowsDeleted: numRows };
        response.send(JSON.stringify(result));
        }catch(error){
            response.send(JSON.stringify(false));
        }
    }

async function authorUpdateAction(request, response) {
        // Validate input data if necessary
        var authorId = request.params.authorId;
        if(request.body.alias.length === 0 || (parseInt(request.body.verified)!==0 && parseInt(request.body.verified)!==1) || await authorRepo.getAuthorByAlias(request.body.alias).length > 0){
            response.send(JSON.stringify(false));
        }
        else{
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
}

async function authorListSearchAction(request, response) {
    try {
        var songs = await authorRepo.getSongByAuthor(request.params.authorId);
        response.send(JSON.stringify(songs));
    } catch (error) {
        response.status(500).send({ error: 'Failed to retrieve the songs.' });
    }
}

function capitalizeFirstLetter(word) {
    if (!word) return ''; // Handle empty or null input
    return word.charAt(0).toUpperCase() + word.slice(1);
}

async function authorAddAction(request, response) {
    // var json = JSON.stringify(request.body); // bodyParser can process json in body + regular POST form input too
    // console.log(json);    var songId = request.params.songId; 
    var value = await authorRepo.getAuthorByAlias(request.body.alias);
    if(request.body.alias === undefined || (parseInt(request.body.verified)!==0 && parseInt(request.body.verified)!==1) || request.body.alias.length === 0 || request.body.verified.length === 0){
        response.send(JSON.stringify({"state":false, "message":"Alias or verified is not valid"}));
    }
    else if(value.length > 0){
        response.send(JSON.stringify({"state":false, "message":"Alias already exists"}));
    }
    else{
        if(request.body.image === null){
            request.body.image = "";
        }
        var numRows = await authorRepo.addOneAuthor(
            capitalizeFirstLetter(request.body.alias) ?? "undefined", 
            capitalizeFirstLetter(request.body.first_name) ?? "", 
            capitalizeFirstLetter(request.body.last_name) ?? "",
            request.body.biography ?? "J'ai une histoire... j'ai un background...",
            request.body.verified,
            request.body.image ?? "",
        );
        let result = { rowsUpdated: numRows };
        response.send(JSON.stringify(result));
    }
}

module.exports = router;