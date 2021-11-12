const guessedLettersElement = document.querySelector('.guessed-letters');
const guessLetterButton = document.querySelector('.guess');
const letterInput = document.querySelector('.letter');
const wordInProgress = document.querySelector('.word-in-progress');
const remainingGuessesElement = document.querySelector('.remaining');
const remainingGuessesSpan = document.querySelector('.remaining span');
const message = document.querySelector('.message')
const playAgainButton = document.querySelector('.play-again');

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
  };



// Start Game
getWord();
// Placeholder for the guessed words letters 
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
       // console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
    };

// placeholder(word);

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    //empty message paragraph
    message.innerText = "";
    // Lets grab what was entered
    const guess = letterInput.value;
    // console.log(guess);
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        // Theres a letter, Make a guess!
        makeGuess(guess); 
    }
    letterInput.value = "";
});

 const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0 ) {
        // Is it empty ?
        message.innerText = "Make an entry.";
    } else if  (input.length > 1) {
        // More than one letter entered ?
        message.innerText = "Only a single letter, please."
    } else if (!input.match(acceptedLetter))  {     
        // Numbers and/or Special Characters are not allowed.
        message.innerText = "Enter any letter from A to Z";
    } else {
        // A single letter has been entered.
        return input;
    }
}; 

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You have guess that previously";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
        }
    };

    const showGuessedLetters = function () {
        // Clear list first
        guessedLettersElement.innerHTML = "";
        for (const letter of guessedLetters) {
            const li = document.createElement("li");
            li.innerText = letter;
            guessedLettersElement.append(li);
        }
    };

    const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter in wordArray) {
        if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
    } else {
        revealWord.push("●");
    }
}
    // console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        // Sorry, that is incorrect. Last Chance!
        message.innerText = `sorry, the word has no ${guess}`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Great! The word does have the letter ${guess} innit`; 
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `GAME  OVER! The word was <span class="highlight">${word}</span>`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

  const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class=highlight "You guessed the correct word, Yippie!</p>`;
    
    startOver();
    }
};

const startOver = function () {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function() {
//rest values
message.classList.remove("win");
guessedLetters = [];
remainingGuesses = 8;
remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
guessedLettersElement.innerHTML = "";
message.innerText = "";

// Grab new word
getWord();

// Show the UI
guessLetterButton.classList.remove("hide");
playAgainButton.classList.remove("hide");
remainingGuessesElement.classList.remove("hide");
guessedLettersElement.classList.remove("hide");

});