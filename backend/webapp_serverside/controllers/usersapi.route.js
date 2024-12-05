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
    try {
        var errorState = 0;
        var oneUser = await userRepo.getOneUser(request.params.userId);
        if(oneUser === false){
            errorState = 1;
        }
        var playlists = await userRepo.getPlaylistByUserId(request.params.userId);
        response.send(JSON.stringify({"error":errorState,"object":{ "user": oneUser, "playlists": playlists}}));
    }catch (error) {
        response.send(JSON.stringify({"error":1,"object":null}));
    }   
}
async function userDelAction(request, response) {
    // TODO: first remove extras for car, unless the car cannot be removed!!!
    try{
        var numRows = await userRepo.delOneUser(request.params.userId);
        let result = { rowsDeleted: numRows };
        response.send(JSON.stringify(result));
    } catch (error) {
        response.send(JSON.stringify(false));
    }
}

function isEmailFormat(str) {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
}

async function userAddAction(request, response) {
    // var json = JSON.stringify(request.body); // bodyParser can process json in body + regular POST form input too
    // console.log(json);
    // TODO: !!! INPUT VALIDATION !!!
    var userId = request.params.userId;
    if (userId==="0"){
        if(request.body.username.length === 0 || request.body.first_name.length === 0 || request.body.last_name.length === 0 || request.body.email.length === 0 || isEmailFormat(request.body.email)===false || request.body.password.length === 0 || request.body.role.length === 0 || request.body.date_of_birth.length === 0){
            response.send(JSON.stringify(false));
        }else{
            userId = await userRepo.addOneUser(
            request.body.username, 
            request.body.first_name, 
            request.body.last_name, 
            request.body.email, 
            request.body.password,
            request.body.role,
            request.body.date_of_birth,
            request.body.genre);
        }
    }
}

async function userUpdateAction(request, response){

    var userId = request.params.userId;
    if(request.body.username.length === 0 || request.body.first_name.length === 0 || request.body.last_name.length === 0 || request.body.email.length === 0 || isEmailFormat(request.body.email)===false){
        response.send(JSON.stringify(false));
    }else{
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
        let result = { rowsUpdated: numRows };
        response.send(JSON.stringify(result));
        }

}

module.exports = router;