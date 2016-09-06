var express = require('express'),
	path    = require('path'),
	bodyParser = require('body-parser'),
	ejsTemp = require('ejs'),ejs,
	mongoClient = require('mongodb').MongoClient,db,
	connect_url = 'mongodb://localhost:27017/picSnap',
	multer      = require('multer'),
	app = express();

//mongoClient for handling connection to mondodb.
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

//get route for home page
app.get('/', function(req, res) {
	res.render('home.ejs');
});

//get route for about page
app.get('/about', function(req, res) {
	res.render('about.ejs');
});	

//post route for getting to userprofile
app.post('/signin', function(req, res) {
	var username = req.body.username,
		password = req.body.password;
	console.log('This is the username ', username, 
		        '  and this is the password', password);
	res.render('userProfile.ejs');
});

app.post('/backtohome', function(req, res) {
	res.render('home.ejs');
});

app.post('/useruploadpic', multer({dest: './public/images'}).single('upl'), function(req, res, next) {
	var title = req.body.title;
	var src   = req.file.filename;
	db.collection('profilePics').insertOne({title: title, src: src});
});

//error function for handling errors in the app
app.use(function(err, req, res, next) {
	console.error("Error Occurred");
	console.error(err.stack);
	res.status(500).render('error.ejs');
});

//error function for handling routes that do not exist
app.use(function(req,res, next) {
	console.error("PAGE NOT FOUND!!");
	res.render('error.ejs');
});

app.listen(3000, function() {
	console.log("App running on port:3000");
});