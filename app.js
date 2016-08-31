var express = require('express'),
	path    = require('path'),
	bodyParser = require('body-parser'),
	app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res) {
	res.render('home.ejs');
});

app.get('/about', function(req, res) {
	res.render('about.ejs');
});	

app.listen(3000, function() {
	console.log("App running on port:3000");
});