const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");

const app = express();

app.get("/", function(req, res){

  res.sendFile(__dirname + "/signup.html");

});


app.listen(5000, function(){

  console.log("server is up and running on port 300");

});
