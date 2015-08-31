var express = require('express');
var basicAuth = require('basic-auth-connect');

var app = express();

app.use(function (req, res, next){
    d = new Date();
    console.log(d.toUTCString());
    next();
});

app.use(function (req, res, next){
    console.log("Après la date");
    next();
});

app.get('/register', function (req, res){
   res.send('register form'); 
});

app.use(basicAuth('toto', '0000'));

app.use(express.static(__dirname + "/public"));

// GET, POST, PUT, DELETE
app.get('/', function(req, res){
   res.send("un message"); 
});

app.get('/test/:id', function(req, res){
   res.send("test id: " + req.params.id); 
});


app.listen(3000);