const guessLettersList = document.querySelector ('.guess-letters');
const guessLetterButton = document.querySelector('.guess');
const letterInput = document.querySelector('.letter');
const wordInProgress = document.querySelector('.words-in-progress');
const remainingGuesses = document.querySelector('.guess-remaining');
const remainingGuessLetters = document.querySelector('.guess-remaining-span');
const message = document.querySelector('.messages')
const playAgainButton = document.querySelector('.play-again');

const word = "magnolia";



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
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";

});