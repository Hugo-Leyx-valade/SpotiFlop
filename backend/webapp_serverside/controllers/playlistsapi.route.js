// controllers/carsapi.route.js
const express = require('express');
const router = express.Router();
const playlistRepo = require('../utils/playlist.repository');

router.get('/list', playlistListAction);
router.get('/show/:playlistId', playlistShowAction);
router.get('/del/:playlistId', playlistDelAction);
router.post('/update/:playlistId', playlistUpdateAction);
router.post('/add', playlistAddAction);

async function playlistListAction(request, response) {
    var playlists = await playlistRepo.getAllPlaylist();
    response.send(JSON.stringify(playlists));
}
async function playlistShowAction(request, response) {
    try{
        const errorState = 0;
        var onePlaylist = await playlistRepo.getOnePlaylist(request.params.playlistId);
        if(onePlaylist === false){
            errorState = 1;
        }
        var songsOfPlaylist = await playlistRepo.getPlaylistSongsById(request.params.playlistId);
        console.log( "caca" + JSON.stringify(songsOfPlaylist ));
        response.send(JSON.stringify({"error":errorState,"object":{ "playlist": onePlaylist, "songs": songsOfPlaylist}}));
    }catch(error){
        response.send(JSON.stringify({"error":1,"object":null}));
    }
}
async function playlistDelAction(request, response) {
    // TODO: first remove extras for car, unless the car cannot be removed!!!
    try{
        var numRows = await playlistRepo.delOnePlaylist(request.params.playlistId);
        let result = { rowsDeleted: numRows };
        response.send(JSON.stringify(result));
    }catch(error){
        response.send(JSON.stringify(false));
    }
}


async function playlistAddAction(request, response) {
    // var json = JSON.stringify(request.body); // bodyParser can process json in body + regular POST form input too
    // console.log(json);    var songId = request.params.songId; 
    if(request.body.title.length === 0 || request.body.date_of_post.length === 0 || request.body.id_user === 0){
        response.send(JSON.stringify(false));
    }else{
    var numRows = await playlistRepo.addOnePlaylist(
            request.body.title, 
            request.body.state, 
            request.body._description,
            request.body.id_user
        );
        let result = { rowsUpdated: numRows };
        response.send(JSON.stringify(result));
    }
}

async function playlistUpdateAction(request, response) {
    // var json = JSON.stringify(request.body); // bodyParser can process json in body + regular POST form input too
    // console.log(json);
    // TODO: !!! INPUT VALIDATION !!!
    var playlistId = request.params.playlistId;
    if(request.body.title.length === 0 || request.body.date_of_post.length === 0){
        response.send(JSON.stringify(false));
    }else{
        var numRows = await playlistRepo.editOnePlaylist(
            request.body.title, 
            request.body.date_of_post, 
            request.body.number_of_save, 
            request.body._description, 
            request.body.id_playlist
        );
        let result = { rowsUpdated: numRows };
        response.send(JSON.stringify(result));
    }
}

module.exports = router;