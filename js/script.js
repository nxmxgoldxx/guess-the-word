const guessLettersList = document.querySelector ('.guess-letters');
const guessLetterButton = document.querySelector('.guess');
const letterInput = document.querySelector('.letter');
const wordInProgress = document.querySelector('.word-in-progress');
const remainingGuesses = document.querySelector('.guess-remaining');
const remainingGuessLetters = document.querySelector('.guess-remaining-span');
const message = document.querySelector('.messages')
const playAgainButton = document.querySelector('.play-again');

const word = "magnolia";
const guessedLetters = [];


// Placeholder for the guessed words letters 

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
    };

placeholder(word);

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
        message.innerText = ("Only a single letter, please.")
    } else if (!input.match(acceptedLetter))  {     
        // Numbers and/or Special Characters are not allowed.
        message.innerText = "Enter any letter from A to Z";
    } else {
        // A single letter has been entered.
        return input;
    }
}; 

const makeGuess = function (guess) {
    guess = guess.UpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You have guess that previously";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
    };

const displayGuestLetters = function () {
    // Clear line 1
    guessedLettersList.innerText = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        guessedLettersList.append(li);
    }
};


    const guessedWordsUpdater = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray =wordUpper.split("");
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
    confirmWin();
};

confirmWin = function () {

if (word.toUpperCase() === wordInProgress.innerText) {
message.classList.add("win");
message.innerHTML = `<p class=highlight "You guessed the correct word, Yippie!</p>`;
}
};