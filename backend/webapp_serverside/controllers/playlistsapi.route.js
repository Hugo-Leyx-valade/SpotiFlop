// controllers/carsapi.route.js
const express = require('express');
const router = express.Router();
const playlistRepo = require('../utils/playlist.repository');

router.get('/list', playlistListAction);
router.get('/show/:playlistId', playlistShowAction);
router.get('/del/:playlistId', playlistDelAction);
router.post('/update/:playlistId', playlistUpdateAction);

async function playlistListAction(request, response) {
    var playlists = await playlistRepo.getAllPlaylist();
    response.send(JSON.stringify(playlists));
}
async function playlistShowAction(request, response) {
    var onePlaylist = await playlistRepo.getOnePlaylist(request.params.playlistId);
    var songsOfPlaylist = await playlistRepo.getPlaylistSongsById(request.params.playlistId);
    console.log( "caca" + JSON.stringify(songsOfPlaylist ));
    response.send(JSON.stringify({ "playlist": onePlaylist, "songs": songsOfPlaylist}));
}
async function playlistDelAction(request, response) {
    // TODO: first remove extras for car, unless the car cannot be removed!!!
    var numRows = await playlistRepo.delOnePlaylist(request.params.playlistId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}
async function playlistUpdateAction(request, response) {
    // var json = JSON.stringify(request.body); // bodyParser can process json in body + regular POST form input too
    // console.log(json);
    // TODO: !!! INPUT VALIDATION !!!
    var playlistId = request.params.playlistId;
    if (playlistId==="0") playlistId = await playlistRepo.addOnePlaylist(request.body.title,request.body.date_of_post,request.body.number_of_save, request.body._description,request.body.id_user);
    else{
        var numRows = await playlistRepo.editOnePlaylist(
            request.body.title, 
            request.body.date_of_post, 
            request.body.number_of_save, 
            request.body._description, 
            request.body.id_playlist
        );
        }
    let result = { rowsUpdated: numRows };
    response.send(JSON.stringify(result));
}

module.exports = router;