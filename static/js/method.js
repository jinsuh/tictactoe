// 0 1 2
// 3 4 5
// 6 7 8
var board = new Array(9);
var isFirstPlayer = true;

function init() {
	var squares = document.getElementsByTagName("td");
	for (var s = 0; s < squares.length; s++) {
    	squares[s].addEventListener("click", function(evt){squareSelected(evt);}, false);
    	$(squares[s]).data('clicked', false);
  	}
  	console.log(board);
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
		updateBoard(square.id, isFirstPlayer);
	}	
}

function updateBoard(squareId, player) {
	console.log(squareId);
	board[squareId] = player;
	console.log(board[0]);
	console.log(board[1]);
}

