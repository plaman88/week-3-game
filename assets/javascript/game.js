//variable
var wordBank = ["hamburger", "fries", "cheeseburger", "milkshake", "salad"];
var targetWord = "";
var targetWordArray = [];
var wrongLetters = [];
var correctLetters = [];
var displayWord = [];
var valid;
var wins = 0;
var losses = 0;
var remainingGuesses = 10;
// var letterGuessed;

//functions

//selects a word from word bank and displays all info on gamescreen
function startGame()
{
	//selects random word
	targetWord = wordBank[Math.floor(Math.random()* wordBank.length)];
	targetWordArray = targetWord.split("");
	//transforms word to an array of dashes
	for(i=0; i<targetWord.length; i++)
	{
		displayWord.push(" _ ");
	}

	document.getElementById("array-box").innerHTML = displayWord.join("");
	document.getElementById("instruction-box").innerHTML = "Press a Key to Guess a Letter";
	document.getElementById("wins").innerHTML = "Wins: " + wins;
	document.getElementById("losses").innerHTML = "Losses: " + losses;
	document.getElementById("remaining-guesses").innerHTML = "Guesses Remaing: " + remainingGuesses;
	document.getElementById("letters-guessed-box").innerHTML = "Letters Guessed: " + wrongLetters;
}

//checks to see if letter entered by user is in the target word

function checkLetter(letter)
{
	var isInWord;
	for (i = 0; i < targetWordArray.length; i++)
	{
		if(letter == targetWordArray[i])
		{
			isInWord = true;
			replaceLetter(letter);
			correctLetters.push(letter);
		}
		else
		{
			isInWord = false;
		}
	}
	if(isInWord === false)
	{
		wrongLetters.push(letter);
		remainingGuesses = remainingGuesses - 1;
	}
	else
	{	
	}
	document.getElementById("array-box").innerHTML = displayWord.join("");
}

//resets the variables to original values
function reset()
{
	targetWord = "";s
	targetWordArray = [];
	wrongLetters = [];
	correctLetters = [];
	displayWord = [];
	remainingGuesses = 10;

}

//replaces  "-" with character on the screen
function replaceLetter(letter)
{
	var j = targetWordArray.indexOf(letter);
	displayWord.splice(j, 1, letter);
}

//evaluates if the game has been won
function checkForWin()
{
	if(correctLetters.length == targetWordArray.length)
	{
		wins = wins + 1;
		document.getElementById("wins").innerHTML = "Wins: " + wins;
		reset();
		startGame();
	}
}

//allows only characters that have not yet been guessed
function validateKey(keystroke)
{
	if (correctLetters.includes(letterGuessed) || wrongLetters.includes(letterGuessed))
	{
		valid = false;
	}
	else
	{
		valid = true;
	}
}

//plays chime

function playMusic(){
	document.getElementById("ring").play();
}




//game code

startGame();

document.onkeyup = function(event)
{
	console.log(targetWordArray);
	console.log(displayWord);
	letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	validateKey();
	if (valid == true)
	{
	checkLetter(letterGuessed);
	document.getElementById("remaining-guesses").innerHTML = "Guesses Remaing: " + remainingGuesses;
	document.getElementById("letters-guessed-box").innerHTML = "Letters Guessed: " + wrongLetters;

	checkForWin();

	if (remainingGuesses == 0)
	{
		reset();
		startGame();
		losses = losses + 1;
		document.getElementById("losses").innerHTML = "Losses: " + losses;
	}
	}
}


