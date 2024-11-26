// controllers/carsapi.route.js
const express = require('express');
const router = express.Router();
const userRepo = require('../utils/users.repository');

router.get('/playlist', playlistAction);
router.get('/list', usersListAction)
router.get('/show/:userId', userShowAction);
router.get('/del/:userId', userDelAction);
router.post('/update/:userId', userUpdateAction);

// http://localhost:9000/carsapi/brands
async function playlistAction(request, response) {
    var playlists = await userRepo.getAllPlaylists();
    response.send(JSON.stringify(playlists));
}

async function usersListAction(request, response) {
    var users = await userRepo.getAllUsers();
    response.send(JSON.stringify(users));
}
async function userShowAction(request, response) {
    var oneUser = await userRepo.getOneUser(request.params.userId);
    response.send(JSON.stringify(oneUser));
}
async function userDelAction(request, response) {
    // TODO: first remove extras for car, unless the car cannot be removed!!!
    var numRows = await userRepo.delOneUser(request.params.userId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}

async function userUpdateAction(request, response) {
    // var json = JSON.stringify(request.body); // bodyParser can process json in body + regular POST form input too
    // console.log(json);
    // TODO: !!! INPUT VALIDATION !!!
    var userId = request.params.userId;
    if (userId==="0") userId = await userRepo.addOneUser(request.body.username, 
        request.body.first_name, 
        request.body.last_name, 
        request.body.email, 
        request.body.password,
        request.body.role,
        request.body.date_of_birth,
        request.body.genre);
    else{
        var numRows = await userRepo.editOneUser( 
            request.body.username, 
            request.body.first_name, 
            request.body.last_name, 
            request.body.email, 
            request.body.password,
            request.body.role,
            request.body.date_of_birth,
            request.body.genre,
            request.body.id_user);
        }
    let result = { rowsUpdated: numRows };
    response.send(JSON.stringify(result));
}

module.exports = router;