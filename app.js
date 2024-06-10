const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");
const port=4000;

const app = express();

app.use(express.static("public"));//to get styles+img

app.use(bodyParser.urlencoded({extended:true}));
 // the bodyParser.urlencoded() middleware function is used
//  to parse URL-encoded data in the body of a POST request to the
//   /submit-form route. The parsed data is then available on the req.body object,
//    which can be used to access the submitted form data.

app.get("/", function(req, res){

  res.sendFile(__dirname + "/signup.html");

});

app.get("/failure",function(req,res){
  res.sendFile(__dirname+"/signup.html");});


app.post("/", function(req,res){

  const firstName = req.body.fName;

  const lastName = req.body.lName;

  const email = req.body.email;



  const data = {

    members:[

      {

        email_address: email,

        status: "subscribed",

        merge_fields:{

          FNAME:firstName,

          LNAME:lastName

        }

      }

    ]

  }

  const jsonData = JSON.stringify(data);

  const url = "https://us13.api.mailchimp.com/3.0/lists/171e8c605c";

  const options={

    method:"POST",

    auth:"Vitkov: 4fa52529da9570c6f479707ecadf882e-us13"



  }

  const request = https.request(url, options, function(response){

    if (response.statusCode === 200){

      res.sendFile(__dirname + "/success.html");

    } else{

      res.sendFile(__dirname + "/failure.html");

    }

    response.on("data", function(data){

      console.log(JSON.parse(data));

    })

  })

  request.write(jsonData);

  request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(port, function(){

  console.log("server is up and running on port ",port);

});
//API key :  727827155aa28d06d7f5b7dec806f36c-us6

//list // IDE :  ea805b25ab
// 4fa52529da9570c6f479707ecadf882e-us13
// 171e8c605c
