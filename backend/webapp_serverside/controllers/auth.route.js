// controllers/auth.route.js
const express = require('express');
const router = express.Router();
const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");

// http://localhost:9000/auth
// USE AUTHORIZATION HERE (the method does not know if authorization is present)
// MAC/DAC/RBAC, Claims-based authorization, Policy-based authorization, Resource-based authorization
router.get("/user", auth.authorizeRequest("user"), userdataAction); // expose function only for USER roles
router.get("/admin", auth.authorizeRequest("admin"), userdataAction); // expose function only for ADMIN roles
router.get("/protected", protectedGetAction); // execute authorization in action method: needed for resource-based auth
router.post("/login", loginPostAction);
//router.post("/register", registerPostAction);
router.get("/logout", logoutAction);


// use same endpoints for both roles
async function userdataAction(request, response) {
  let userJson = JSON.stringify(request.user); 
  response.send(userJson);
}

async function protectedGetAction(request, response) {
  // TODO: authorize using all factors (resource / context / environment) ...
  let userRole = "";
  if (request.isAuthenticated()) {
    if (request.user.role === "admin") {
      userRole = "admin";
    } else {
      userRole = "user";
    }
  } 
  response.send(userRole);
}

async function loginPostAction(request, response) {
  // passport.authenticate('local', { successRedirect: '/' }));
  let areValid = await userRepo.areValidCredentials(request.body.username, request.body.userpass);

  if (areValid) {
    console.log(request.body.username + " is authenticated");
    user = await userRepo.getUserbyName(request.body.username);
    console.log("Request body username:", request.body.username);
    request.login(user, function (err) { 
      if (err) { 
        console.log("LOGINERROR");
        console.log(err); 
        areValid = false;
        // return next(err);
      }
      let resultObject = { "loginResult": areValid, "timestamp": new Date().toLocaleString() };
      response.send(resultObject);
    });
  } else {
    let resultObject = { "loginResult": areValid, "timestamp": new Date().toLocaleString() };
    response.send(resultObject);
  }
}


router.post("/register", async (req, res) => {
  const {
    username,
    first_name,
    last_name,
    email,
    password,
    date_of_birth,
    genre,
  } = req.body;

  // Vérifiez que tous les champs requis sont fournis
  if (!username || !first_name || !last_name || !email || !password || !date_of_birth || !genre) {
    return res.status(400).send({
      success: false,
      message: "Tous les champs sont obligatoires.",
    });
  }

  try {
    // Appeler la fonction `createUser` pour insérer l'utilisateur dans la base de données
    const result = await userRepo.createUser(
      username,
      first_name,
      last_name,
      email,
      password,
      date_of_birth,
      genre
    );

    if (result.success) {
      return res.status(201).send({
        success: true,
        message: "Inscription réussie ! Vous pouvez maintenant vous connecter.",
      });
    } else {
      return res.status(400).send({
        success: false,
        message: result.message || "Erreur lors de la création de l'utilisateur.",
      });
    }
  } catch (error) {
    console.error("Erreur dans registerPostAction :", error);
    return res.status(500).send({
      success: false,
      message: "Erreur interne du serveur. Veuillez réessayer plus tard.",
    });
  }
});


function logoutAction(request, response) {
  request.logout(function(err){
    let resultObject = { "logoutResult": true, "timestamp": new Date().toLocaleString() };
    if (err) { 
      console.log("LOGINERROR");
      console.log(err); 
      areValid = false;
      // return next(err);
    }
    response.send(JSON.stringify(resultObject));
  });
}

module.exports = router;