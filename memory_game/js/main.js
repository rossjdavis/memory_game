console.log("Up and running!");

var cards = [
	{
		rank: "queen",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		rank: "queen",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "king",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "king",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	}
];

var cardsInPlay = [];

var score = 0;
var attempts = 0;

var checkForMatch = function () {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		score++;
		alert("You found a match " + score + " out of " + attempts + " attempts!");		
	} else {
		alert("Sorry, try again!");		
	}
};

var flipCard = function () {
	var cardId = this.getAttribute('data-id');
	console.log("User flipped " + cards[cardId].rank);
	cardsInPlay.push(cards[cardId].rank);
	console.log(cards[cardId].suit);
	console.log(cards[cardId].cardImage);
	this.setAttribute('src', cards[cardId].cardImage);
	if (cardsInPlay.length === 2) {
		attempts++;
		checkForMatch();
	}
};

var resetBoard = function () {
	console.log("Reset board");

	//location.reload();
	
	
	var gameBoard = document.getElementById('game-board');
	while (gameBoard.hasChildNodes()) {
		gameBoard.removeChild(gameBoard.firstChild);
	}

	while (cardsInPlay.length > 0) {
		cardsInPlay.pop();
	}
	
	createBoard();
	
}

var createBoard = function () {
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', "images/back.png");
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);

		var resetButton = document.getElementById('reset-board');
		resetButton.addEventListener('click', resetBoard);
	}
};

createBoard();
