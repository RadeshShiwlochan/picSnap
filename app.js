var express = require('express'),
	path    = require('path'),
	bodyParser = require('body-parser'),
	ejsTemp = require('ejs'),ejs,
	mongoClient = require('mongodb').MongoClient,db,
	connect_url = 'mongodb://localhost:27017/picSnap',
	app = express();

mongoClient.connect(connect_url, function(err, database) {
	if(err)
		throw err;
	console.log('Sucessfully connected to the Database');
	db = database;
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', function(req, res) {
	res.render('home.ejs');
});

app.get('/about', function(req, res) {
	res.render('about.ejs');
});	

app.use(function(err, req, res, next) {
	console.error("Error Occurred");
	console.error(err.stack);
	res.status(500).render('error.ejs');
});

app.use(function(req,res, next) {
	console.error("PAGE NOT FOUND!!");
	res.render('error.ejs');
});

app.listen(3000, function() {
	console.log("App running on port:3000");
});