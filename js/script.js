const guessLettersList = document.querySelector ('.guess-letters');
const guessLetterButton = document.querySelector('.guess');
const textInput = document.querySelector('.letter');
const guessProgress = document.querySelector('.in-progress');
const remainingGuesses = document.querySelector('.guess-remaining');
const remainingGuessLetters = document.querySelector('.guess-remaining-span');
const messages = document.querySelector('.messages')
const playAgainButton = document.querySelector('.play-again');

const word = "magnolia";



// Placeholder for the guessed words letters 

const placeholder = function (word) {
    const placeHolderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeHolderLetters.push("●");
    }
wordsInProgress.innerText = placeHolderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";

});