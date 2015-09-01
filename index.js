var express = require('express');
var basicAuth = require('basic-auth-connect');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var markdown = require('markdown').markdown;
var app = express();

// Settings
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

if(app.get('env') == 'development'){
    console.log('DEVELOPMENT');
}else{
    console.log('PRODUCTION');
}

// version >= 4
app.locals.pretty = true;

// version < 4
app.use(morgan('combined'));
// end settings

// Middlewares
app.use(bodyParser.urlencoded({ extended: false}));

app.use(function (req, res, next){
    d = new Date();
    console.log(d.toUTCString());
    next();
});

app.use(function (req, res, next){
    console.log("Après la date");
    next();
});

app.use(morgan('combined'));
// end middlewares

app.get('/register', function (req, res){
   res.send('register form'); 
});

app.use(basicAuth('toto', '0000'));

// GET, POST, PUT, DELETE
app.get('/', function(req, res){
    res.render("home", {prenom: 'toto'}); 
});

app.post('/md/converter', function(req, res){
    console.log('Converter...');
    console.log(req.body.md); // textarea name="md"
    res.send(markdown.toHTML(req.body.md));
});

app.use(express.static(__dirname + "/public"));

app.get('/test/:id', function(req, res){
   res.send("test id: " + req.params.id); 
});

app.listen(3000);