// controllers/auth.route.js
const express = require('express');
const router = express.Router();
const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");

// http://localhost:9000/auth
// USE AUTHORIZATION HERE (the method does not know if authorization is present)
// MAC/DAC/RBAC, Claims-based authorization, Policy-based authorization, Resource-based authorization
router.get("/user", auth.authorizeRequest("USER"), userdataAction); // expose function only for USER roles
router.get("/admin", auth.authorizeRequest("ADMIN"), userdataAction); // expose function only for ADMIN roles
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
  let userRole = "GUEST CONTENT";
  if (request.isAuthenticated()) {
    if (request.user.user_role === "ADMIN") {
      userRole = "ADMIN CONTENT";
    } else {
      userRole = "USER CONTENT";
    }
  } 
  response.send(userRole);
}

async function loginPostAction(request, response) {
  const { username, userpass } = request.body;

  if (!username || !userpass) {
    return response.status(400).json({
      error: "Le nom d'utilisateur et le mot de passe sont obligatoires.",
    });
  }

  try {
    const user = await userRepo.areValidCredentials(username, userpass);

    if (user) {
      request.login(user, function (err) {
        if (err) {
          return response.status(500).json({ error: "Erreur interne du serveur." });
        }
        response.json({
          loginResult: true,
          role: user.role, // Inclure le rôle dans la réponse
          timestamp: new Date().toLocaleString(),
        });
      });
    } else {
      response.json({
        loginResult: false,
        timestamp: new Date().toLocaleString(),
      });
    }
  } catch (error) {
    console.error("Erreur dans loginPostAction :", error);
    response.status(500).json({ error: "Erreur interne du serveur." });
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