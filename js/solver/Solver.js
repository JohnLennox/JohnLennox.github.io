class Solver {
    constructor(words) {
        this.potentialWords = words;
        this.correctLetters = [];
        this.includedLetters = [];
        this.incorrectLetters = [];
        this.letterScores = [];

        this.scoreLetters();
        this.prioritiseWordList();
    }

    getGuess() {
        return this.potentialWords[0];
    }

    receiveLetter(letter, status, location) {
        if (status == "correctLocation") {
            this.correctLetters.push({letter: letter, loc: location});
            if (this.includedLetters.includes(letter)) {
                this.includedLetters.splice(this.includedLetters.indexOf(letter), 1);
            }
        } else if (status == "correct") {
            if (!this.includedLetters.includes(letter)) {
                this.includedLetters.push(letter);
            }
        } else if (status == "incorrect") {
            if (!this.incorrectLetters.includes(letter)) {
                this.incorrectLetters.push(letter);
            }
        }

        this.filterWordList();
    }

    filterWordList() {
        let validGuess = [];
        for (const word of this.potentialWords) {
            let valid = true;

            for (const incorrectLetter of this.incorrectLetters) {
                if (word.includes(incorrectLetter)) {
                    valid = false;
                }
            }

            if (valid) {
                for (const incLetter of this.includedLetters) {
                    if (!word.includes(incLetter)) {
                        valid = false;
                    }
                }
            }

            if (valid) {
                let guessLetters = word.split("");
                for (const correctLetter of this.correctLetters) {
                    if (!(guessLetters[correctLetter.loc] === correctLetter.letter)) {
                        valid = false;
                    }
                }
            }

            if (valid) {
                validGuess.push(word);
            }
        }

        this.potentialWords = validGuess;
    }

    prioritiseWordList() {
        let originalList = this.potentialWords;
        let wordScoredList = [];
        for (const originWord of originalList) {
            let word = originWord;
            let score = this.evaluateWord(word);
            wordScoredList.push({word: word, score: score});
        }
        wordScoredList.sort((a, b) => {
            return b.score - a.score;
        });
        this.potentialWords = wordScoredList.map(word => word.word);
    }

    evaluateWord(word) {
        let score = 0;
        for (const letter of word.split("")) {
            score += this.letterScores[letter];
        }
        return score;
    }

    scoreLetters() {
        for (const word of this.potentialWords) {
            for (const letter of word.split("")) {
                if (this.letterScores[letter] === undefined) {
                    this.letterScores[letter] = 1;
                } else {
                    this.letterScores[letter] += 1;
                }
            }
        }
    }
}