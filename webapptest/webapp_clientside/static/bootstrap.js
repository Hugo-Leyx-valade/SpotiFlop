const express = require("express");
const app = express();

app.listen(3000,()=>{
    console.log("Listen to 3000");
})

app.use("/css",express.static("./node_modules/bootstrap/dist/css"));
app.use("/js",express.static("./node_modules/bootstrap/dist/js"));
//or
app.use("/",express.static("./node_modules/bootstrap/dist/"));