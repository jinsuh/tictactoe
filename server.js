var express = require("express"),
	request = require("request"),
	ejs = require("ejs"),
	app = express(),
	http = require("http").Server(app),
	io = require("socket.io")(http),
	port = process.env.PORT || 8080,
	mongoClient = require('mongodb').MongoClient;
	player = 0,
	game = 0,
	moves = new Array();

var url = 'mongodb://localhost:27017/matches';
mongoClient.connect(url, function(err, db) {
  if (err) {
  	console.log(err);
  }
  console.log("Connected correctly to mongodb server.");
  db.close();
});

app.engine("html", ejs.renderFile);
app.set("views", __dirname + "/templates");
app.use(express.static(__dirname + "/static"));

app.get("/", function(req, res) {
  res.render("index.html");
});

app.get("/history", function(req, res) {
	res.render("history.html");
});

app.post("/history", function(req, res) {
	mongoClient.connect(url, function(err, db) {
	  	if (err) {
	  		console.log(err);
	  	}
	  	else {
	  		db.collection('games').find().toArray(function(err, data) {
	  			if (err) {
	  				console.log(err);
	  			}
	  			else {
	  				res.send(data);
            		db.close();	
	  			}
        	});
	  	}
	});
});

io.on("connection", function(socket) {
	console.log("a user connected");
	io.emit("player", player);
	player = player + 1;
	socket.on("disconnect", function() {
		console.log("user disconnected");
	});
	socket.on("selection", function(squareLoc) {
		moves.push(squareLoc);
		io.emit("selection", squareLoc);
	});
	socket.on("end", function() {
		mongoClient.connect(url, function(err, db) {
  			if (err) {
  				console.log(err);
  			}
  			else {
  				insertGame(db, game, moves, function() {
      				db.close();
      				game = game + 1;
					moves = new Array();
  				});		
  			}
		});
		player = 0;
	});
	socket.on("start", function() {
		io.emit("start");
	});

});

var server = http.listen(port, function() {
	var port = server.address().port;
  	console.log("listening on port %s", port);
});

var insertGame = function(db, game, moves, callback) {
	console.log(moves);
	console.log(game);
   	db.collection('games').insertOne({
    	"game" : game,
    	"moves" : moves
   	}, function(err, result) {
	    if (err) {
	    	console.log(err);
	    }
	    else {
	    	console.log("Inserted a document into the restaurants collection.");
	    	callback(result);
	    }
  	});
};