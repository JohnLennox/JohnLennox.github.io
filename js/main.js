let gridLength;
let gridWidth;
let currentWordIndex;
let grid;
let resX;
let resy;
let targetWord = "";
let file;
let lettersUsed;
let myModal;

function preload() {
    file = loadStrings("resources/dictionary.txt");
}

function setup() {
    myModal = document.getElementById('myModal')
    lettersUsed = new Array();
    let canvas = createCanvas(windowWidth / 2, windowHeight / 2);
    canvas.parent('canvasContainer');
    canvas.id('mycanvas');
    gridLength = 6;
    gridWidth = 5;
    resX = windowWidth / 2 / gridWidth;
    resy = windowHeight / 2 / gridLength;

    grid = makeGrid(gridLength, gridWidth);
    currentWordIndex = 0;
    createTargetWord();
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridLength; j++) {
            let letterBox = new LetterBox(i, j, resX, resy, targetWord);
            grid[i][j] = letterBox;
        }
    }
}

function createTargetWord() {
    targetWord = file[floor(random(0, file.length))];
}

function makeGrid(x, y) {
    let grid = Array(x);
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            grid[i] = new Array(y);
        }
    }
    return grid;
}


function draw() {
    background(0);
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridLength; j++) {
            grid[i][j].show();
        }
    }
}

function disableSubmitButton() {
    let submitButton = document.getElementById("submitButton");
    submitButton.disabled = true;
}

function updateLettersUsed(word) {
    for (let i = 0; i < word.length; i++) {
        if (word[i] !== " " && !lettersUsed.includes(word[i])) {
            lettersUsed.push(word[i]);
        }
    }
    lettersUsed.sort();

    document.getElementById("lettersUsed").innerHTML = lettersUsed;

}

function setErrorMessage(message) {
    document.getElementById("errorText").innerHTML = message;
}

function showErrorMessage() {
    document.getElementById("errorMessage").hidden = false;
}

function hideErrorMessage() {
    document.getElementById("errorMessage").hidden = true;
}

function validateWord(word) {
    if (word.length !== gridWidth) {
        setErrorMessage("Word must be " + gridWidth + " letters long");
        return false;
    }
    if ((/\d/.test(word))) {
        setErrorMessage("Numbers are not allowed");
        return false;
    }
    if (!file.includes(word)) {
        setErrorMessage("Word not found in dictionary");
        return false;
    }
    return currentWordIndex !== gridLength;
}

function processWord(word) {
    let wordArray = word.split('');
    for (let i = 0; i < gridWidth; i++) {
        let currentLetter = grid[i][currentWordIndex];
        currentLetter.setLetter(wordArray[i]);
    }
    currentWordIndex++;
}

function submit() {
    let currentWord = document.getElementById('word').value.toLowerCase();
    if (validateWord(currentWord)) {
        hideErrorMessage();
        processWord(currentWord);
        updateLettersUsed(currentWord);
        if (currentWord === targetWord) {
            disableSubmitButton();
            victory();

        }
    } else {
        showErrorMessage();
    }

    if (currentWordIndex === gridLength && !targetWord.includes(currentWord)) {
        fail();
        disableSubmitButton();
    }
    document.getElementById('word').value = "";
}

function victory() {
    document.getElementById("modal-title").innerText = "Congratulations!";
    document.getElementById("modal-body").innerText = "You have completed the puzzle!";
    showModal();
}

function showModal() {
    $("#myModal").modal();
}

function fail() {
    document.getElementById("modal-title").innerText = "Sorry!";
    document.getElementById("modal-body").innerText = "You have failed the puzzle!" +
        " The correct word was " + targetWord;
    showModal();
}