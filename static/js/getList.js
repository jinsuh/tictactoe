var currentMoveList = null;
var currPosition = 0;
var movesByGame = new Array();

$.post("/history", function(data) {
 	var gameList = document.getElementById("game-list");
 	for (var i = 0; i < data.length; i++) {
 		var newGameItem = document.createElement("li");

        //create new text node
        var gameNumberItem = document.createTextNode("Game: " + data[i].game);

        movesByGame.push(data[i].moves);
        //add text node to li element
        newGameItem.appendChild(gameNumberItem);
        if (i == 0) {
        	var gameTitle = document.getElementById("game-title");
        	newGameItem.className = "selected";
        	gameTitle.innerText = "Game: " + data[i].game;
        	currentMoveList = data[i].moves;
        }


        //add new list element built in previous steps to unordered list
        //called numberList
        gameList.appendChild(newGameItem);

 	}
 	$('.sidebar-nav li').click(function(e) {
        $('.sidebar-nav li').removeClass('selected');
        $(this).addClass('selected');
        currentMoveList = movesByGame[($(this).index())];
        currPosition = 0;
        clearBoard();
        e.preventDefault();
    });
});

function previousMove() {
	if (currPosition > 0) {
		currPosition--;
		var squarePosition = currentMoveList[currPosition]
		var square = document.getElementById(squarePosition[0] * 3 + squarePosition[1])
		square.innerHTML = "";
	}


}

function nextMove() {
	if (currPosition < currentMoveList.length) {
		var squarePosition = currentMoveList[currPosition]
		var square = document.getElementById(squarePosition[0] * 3 + squarePosition[1]);
		if (currPosition % 2 == 0) {
			square.innerHTML = "X";
		}
		else {
			square.innerHTML = "O";
		}
		currPosition++;
	}
}

function clearBoard() {
	var squares = document.getElementsByClassName("square");
	for (var s = 0; s < squares.length; s++) {
		squares[s].innerHTML = "";
	}
}