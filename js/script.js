const guessedLettersElement = document.querySelector('.guessed-letters');
const guessLetterButton = document.querySelector('.guess');
const letterInput = document.querySelector('.letter');
const wordInProgress = document.querySelector('.word-in-progress');
const remainingGuessesElement = document.querySelector('.remaining');
const remainingGuessSpan = document.querySelector('.remaining-span');
const message = document.querySelector('.message')
const playAgainButton = document.querySelector('.play-again');

const word = "magnolia";
const guessedLetters = [];
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
        console.log(letter);
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
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
        }
    };

    const showGuessedLetters = function () {
        // Clear list first
        guessedLettersElement.innerText = "";
        for (const letter of guessedLetters) {
            const li = document.createElement("li");
            li.innerText = letter;
            guessedLettersElement.append(li);
        }
    };

    const updateWordInProgress = function (guessedLetters) {
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
        message.innerText = `GAME  OVER! The word was <span class="highlight">${word}</span>`;
    } else if (remainingGuesses === 1) {
        remainingGuessSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessSpan.innerText = `${remainingGuesses} guesses`;
    }
};

  const confirmWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class=highlight "You guessed the correct word, Yippie!</p>`;
    }
};