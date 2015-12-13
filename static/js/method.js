// 0 1 2
// 3 4 5
// 6 7 8
var size = 3;
var board = new Array(size);
for (var i = 0; i < size; i++) {
	board[i] = new Array(size);
}
var isFirstPlayer = true,
	player = null,
	socket = io();

const SPECTATOR = "Spectating";
const WAITING = "Waiting for player's move...";
const MYTURN = "Make your move!";

socket.on("player", function(playerCount) {
	state = document.getElementById("status");
	if (player == null) {
		player = playerCount;
		if (player == 1) {
			socket.emit("start");
		}
	}
	
	if (player >= 2) {
		state.innerHTML = SPECTATOR;
	}
});

socket.on("start", function() {
	var state = document.getElementById("status");
	if (player == 0) {
		state.innerHTML = MYTURN;
		clickGrid(true);
	}
	else if (player == 1){
		state.innerHTML = WAITING;
		clickGrid(false);
	}
});

socket.on("selection", function(squareLoc, firstPlayerTurn){
    var id = squareLoc[0] * 3 + squareLoc[1];
    console.log(id.toString());
    var square = document.getElementById(id.toString());
    if (firstPlayerTurn) {
    	var icon = "X";
    }
    else {
    	var icon = "O";
    }
    square.innerHTML = icon;
    $(square).data("clicked", true);
    board[squareLoc[0]][squareLoc[1]] = firstPlayerTurn;
    if (checkWinner(squareLoc, firstPlayerTurn)) {

    }
    else {
    	var state = document.getElementById("status");
    	stateSwitch(!firstPlayerTurn);
    }
});

function init() {
	var squares = document.getElementsByTagName("td");
	for (var s = 0; s < squares.length; s++) {
		var square = squares[s];
    	$(square).data("position", new Array(Math.floor(s / 3), s % 3));
    	$(square).data("clicked", false);
  	}
}

var squareSelected = function(evt) {
	var square = $(evt.target);
	if (square.data("clicked")) {
		alert("That square is already occupied!");
	}
	else {
		socket.emit("selection", square.data("position"));
	}	
}

function checkWinner(squareLoc, player) {
	var x = squareLoc[0],
		y = squareLoc[1];
	// row
	for (var i = 0; i < size && board[x][i] == player; i++) {
		if (i == size - 1) {
			console.log("WINNER row: " + player);
			return true;
		}
	}
	// column
	for (var i = 0; i < size && board[i][y] == player; i++) {
		if (i == size - 1) {
			console.log("WINNER column: " + player);
			return true;
		}
	}
	// diagonal
	if (x == y) {
		for (var i = 0; i < size && board[i][i] == player; i++) {
			if (i == size - 1) {
				console.log("WINNER diag: " + player);
				return true;
			}
		}
	}
	// other diagonal
	for (var i = 0; i < size && board[i][(size-1)-i] == player; i++) {
    	if (i == size - 1) {
    		console.log("WINNER: " + player);
    		return true;
    	}
    }

    return false;
}

function clickGrid(enableClick) {
	var squares = document.getElementsByTagName("td");
	for (var s = 0; s < squares.length; s++) {
		var square = squares[s];
		if (enableClick) {
			square.addEventListener("click", squareSelected);
		}
		else {
			square.removeEventListener("click", squareSelected);
		}
  	}
}

function stateSwitch(firstPlayerTurn) {
	if (firstPlayerTurn) {
		if (player == 0) {
			state.innerHTML = MYTURN;
			clickGrid(true);
		}
		else if (player == 1){
			state.innerHTML = WAITING;
			clickGrid(false);
		}
	}
	else {
		if (player == 1) {
			state.innerHTML = MYTURN;
			clickGrid(true);
		}
		else if (player == 0){
			state.innerHTML = WAITING;
			clickGrid(false);
		}
	}
	
}

