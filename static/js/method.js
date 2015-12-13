// 0 1 2
// 3 4 5
// 6 7 8
var size = 3;
var board = new Array(size);
for (var i = 0; i < size; i++) {
	board[i] = new Array(size);
}
var isFirstPlayer = true;

var socket = io();

socket.on('selection', function(squareLoc){
    console.log(squareLoc);
  });

function init() {
	var squares = document.getElementsByTagName('td');
	for (var s = 0; s < squares.length; s++) {
		var square = squares[s];
    	square.addEventListener('click', function(evt){squareSelected(evt);}, false);
   		
    	$(square).data('position', new Array(Math.floor(s / 3), s % 3));
    	$(square).data('clicked', false);
  	}
}

function squareSelected(evt) {
	var square = $(evt.target);
	if (square.data('clicked')) {
		alert('That square is already occupied!');
	}
	else {
		if (isFirstPlayer) {
			square.text('X');
		}
		else {
			square.text('O');
		}
		square.data('clicked', true);
		isFirstPlayer = !isFirstPlayer;
		updateBoard(square.data('position'), isFirstPlayer);
	}	
}

function updateBoard(squareLoc, player) {
	console.log(squareLoc);
	console.log(player);
	board[squareLoc[0]][squareLoc[1]] = player;
	console.log(board);
	socket.emit('selection', squareLoc);
	checkWinner(squareLoc, player);
}

function checkWinner(squareLoc, player) {
	var x = squareLoc[0],
		y = squareLoc[1];

	// row
	for (var i = 0; i < size && board[x][i] == player; i++) {
		if (i == size - 1) {
			console.log('WINNER row: ' + player);
		}
	}

	// column
	for (var i = 0; i < size && board[i][y] == player; i++) {
		if (i == size - 1) {
			console.log('WINNER column: ' + player);
		}
	}

	// diagonal
	if (x == y) {
		for (var i = 0; i < size && board[i][i] == player; i++) {
			if (i == size - 1) {
				console.log('WINNER diag: ' + player);
			}
		}
	}

	// other diagonal
	for (var i = 0; i < size && board[i][(size-1)-i] == player; i++) {
    	if (i == size - 1) {
    		console.log('WINNER: ' + player);
    	}
    }
}

