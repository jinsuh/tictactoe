var express = require('express'),
	request = require('request'),
	ejs = require('ejs'),
	app = express(),
	http = require('http'),
	port = process.env.PORT || 8080;

app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/templates');
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('index.html');
});

var server = app.listen(port, function() {
	var port = server.address().port;
  	console.log('listening on port %s', port);
});