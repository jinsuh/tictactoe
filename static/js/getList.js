 $.post("/history", function(data) {
 	var gameList = document.getElementById("game-list");
 	for (var i = 0; i < data.length; i++) {
 		var newGameItem = document.createElement("li");

        //create new text node
        var gameNumberItem = document.createTextNode("Game: " + data[i].game);


        //add text node to li element
        newGameItem.appendChild(gameNumberItem);
        if (i == 0) {
        	newGameItem.className = "selected";
        }


        //add new list element built in previous steps to unordered list
        //called numberList
        gameList.appendChild(newGameItem);

 	}
 	$('.sidebar-nav li').click(function(e) {
        $('.sidebar-nav li').removeClass('selected');
        $(this).addClass('selected');
        e.preventDefault();
    });
});