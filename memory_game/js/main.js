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
var randomIndex = [];

var tempCardsId = -1;

var score = 0;
var attempts = 0;

var checkForMatch = function () {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		score++;
		//alert("You found a match " + score + " out of " + attempts + " attempts!");		
		document.getElementById("alert").innerHTML = "You found a match!";
		document.getElementById("score").innerHTML = parseInt(score) + "|" + parseInt(attempts-score);
	} else {
		//alert("Sorry, try again!");		
		document.getElementById("alert").innerHTML = "Sorry, try again.";
		document.getElementById("score").innerHTML = parseInt(score) + "|" + parseInt(attempts-score);
	}
};

var flipCard = function () {
	var cardId = this.getAttribute('data-id');
	console.log("User flipped " + cards[cardId].rank);
	cardsInPlay.push(cards[cardId].rank);
	console.log(cards[cardId].suit);
	console.log(cards[cardId].cardImage);
	this.setAttribute('src', cards[cardId].cardImage);
	
	if (tempCardsId === -1) {
		tempCardsId = cardId;
	} else if (tempCardsId === cardId) {
		//alert("You cannot select the same card, cheater!");
		document.getElementById("alert").innerHTML = "You cannot select the same card.";
		resetBoard();
	} else if (cardsInPlay.length === 2) {
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

	while (randomIndex.length > 0) {
		randomIndex.pop();
	}

	tempCardsId = -1;
	
	createBoard();
	
}

var shuffleDeck = function () {
	
	var randomCardId;
	while (randomIndex.length < cards.length) {
		randomCardId = Math.floor(Math.random()*cards.length);
		if (randomIndex.indexOf(randomCardId) > -1) {
			continue;
		} else {
			randomIndex.push(randomCardId);
		}
	}
}

var createBoard = function () {
	shuffleDeck();

	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', "images/back.png");
		cardElement.setAttribute('data-id', randomIndex[i]);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);

	}

	var resetButton = document.getElementById('reset-board');
	resetButton.addEventListener('click', resetBoard);
};

createBoard();
