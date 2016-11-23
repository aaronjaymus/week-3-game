var word; //The word we will be guessing for the game
var guess; //When key is pressed, this will assume value of keystroke
var wordArray = []; //This will start as all underscores, the length of the word. But will fill in with letters as they are guessed
var guessArray = []; // This will contain the letters that have been guessed
var wordGroup = ["pabst", "bohemian", "whiskey", "brews", "hopfest"]
var wrongCount = 0; //this will track how many wrong guesses the user makes
var guessAmount = 10;




var game = {
	//this will select word from wordGroup based on random number selected.
	selectWord () {
		var random = Math.floor(Math.random() * wordGroup.length);
		console.log(random);
		word = wordGroup[random];
		console.log(word);
	}, 
	//this will set an array of all underscores to begin with, length of the word selected on page load
	setWordArray () {
		for (var i = 0; i < word.length; i++) {
			wordArray.push("_");
		}
		
		//console.log(wordArray);
	},
	//this will add letter to wordArray one at a time as letters are guessed. 
	fillWordArray (letter) {
		var index = word.indexOf(letter);

		console.log("Index: " + index);
		
		if (index !== -1) {
			wordArray[index] = letter;
		}
	},
	//adds guessed letter to guessArray
	fillGuessArray (letter){
		guessArray.push(letter);
	},
	//this will check that guessed letter is part of word selected. 
	checkLetter (letter) {
		var index1 = guessArray.indexOf(letter); //index of letter in the guessedArray
		console.log("Index1: " + index1);

		//checks if letter has already been guessed
		if(index1 === -1) {
			this.fillGuessArray(letter);

			var index2 = word.indexOf(letter); //index of letter in word to be guessed
		
			console.log("Index2: " + index2);
		
			if (index2 !== -1) {
				this.fillWordArray();
			} else {
				wrongCount += 1;
			}

		}	
		console.log("Wrong count: " + wrongCount);
	},
	//this will check to see if they've maxed out their wrong guesses. They get 10 wrong guesses.
	checkWrongCount () {
		if (wrongCount >= 10){
			alert("Your man has been hung! (Too dark?)")
			var refresh = confirm("Play again?");
			if(refresh) {
				location.reload();
			}
		}
	},
	checkWin () {
		var index = wordArray.indexOf("_");
		if(index === -1) {
			alert("You guessed " + word + " correctly!" + "\n" + "You win!");
			var refresh = confirm("Play again?");
			if(refresh) {
				location.reload();
			}
		}	
	},
	printGuessesLeft () {
		var guessCounter = document.getElementById("guessRemain");
		guessCounter.innerHTML = guessAmount - wrongCount;
	},
	printWordArray () {
		var printWord = document.getElementById("wordFill");
		printWord.innerHTML = "";
		for(var i=0; i < wordArray.length; i++){
			var printLetter = document.createElement("div");
			printLetter.innerHTML = wordArray[i];
			printWord.appendChild(printLetter);
		}
	},
	printGuessArray () {
		var printGuess = document.getElementById("guessMade");
		printGuess.innerHTML = "";
		var firstLetter = true;
		for (var i=0; i < guessArray.length; i++) {
			var newGuess = document.createElement("div");
			if(firstLetter) {
				newGuess.innerHTML = guessArray[i];
				firstLetter = false;
			} else {
				newGuess.innerHTML = ", " + guessArray[i];
			}
			printGuess.appendChild(newGuess);
		}
	}

}


window.onload = function () {
	game.selectWord();
   	game.setWordArray();
   	game.printGuessesLeft();
   	game.printWordArray();
}


document.onkeyup = function(event) {

	// Determines which key was pressed, then makes it lowercase. Assigns it to variable "guess". 
    guess = String.fromCharCode(event.keyCode).toLowerCase();

   	game.checkLetter(guess);
   	game.fillWordArray(guess);
   	game.printWordArray();
   	game.printGuessesLeft();
   	game.printGuessArray();
   	console.log(wordArray);
   	console.log(guessArray);
   	game.checkWrongCount();
   	game.checkWin();

}