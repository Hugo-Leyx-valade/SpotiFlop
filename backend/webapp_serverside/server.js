// populate object process.env from the file .env
const dotenv = require('dotenv');
dotenv.config(); 

// create express.js webapp
const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.listen(process.env.WEB_PORT, '0.0.0.0',
    function() { console.log("Listening on "+process.env.WEB_PORT); }
);

// *** MIDDLEWARES ***
// app.use(callbackFunction1, callbackFunction2, callbackFunction3)

// process form input (create request.body from POST data or json in the http request)
const bodyParser = require("body-parser");
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// allow serverside session storage
const session = require("express-session");
app.use(session({
    secret: "SecretRandomStringDskghadslkghdlkghdghaksdghdksh",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: false, secure: false }, // 1 day in msec
    resave: false
})); 
// if (request.session.cart===undefined) request.session.cart = [];
// request.session.cart.push("xxxx");

// enable Cross Origin Resource Sharing (needed for cross-origin API)
const cors = require('cors');
app.use(cors({ origin: "http://localhost:8080", credentials: true, methods: [ 'GET', 'POST' ] }));

// configure passport
const auth = require("./utils/users.auth");
auth.initializeAuthentications(app);
app.use("/auth", require("./controllers/auth.route"));

// *** ROUTES/CONTROLLERS ***

// setup default route
app.get('/', (request, response) => { // 'GET' as a HTTP VERB, not as a 'getter'!
    let clientIp = request.ip;
    response.send(`Hello, dear ${clientIp}. I am a nodejs website...`);
    response.end(); // optional
});

// setup additional routes
// app.use(routeBase, callback);
app.use("/static", express.static(__dirname + '/static'));
app.use("/songsapi", require("./controllers/songsapi.route"));
app.use("/authorsapi", require("./controllers/authorsapi.route"));
app.use("/usersapi", require("./controllers/usersapi.route"));
app.use("/adminpanel", require("./controllers/admindashboard.route"));
app.use("/playlist", require("./controllers/playlistsapi.route"));
app.use("/genresapi", require("./controllers/genresapi.route"));
// app.use("/auth", require("./controllers/auth.route"));
