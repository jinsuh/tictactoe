var express = require('express'),
	request = require('request'),
	ejs = require('ejs'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http)
	port = process.env.PORT || 8080;

app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/templates');
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('index.html');
});

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	socket.on('selection', function(squareLoc) {
		io.emit('selection', squareLoc);
	});
});

var server = http.listen(port, function() {
	var port = server.address().port;
  	console.log('listening on port %s', port);
});