class LetterBox {

    constructor(x, y, res, targetWord) {
        this.x = x;
        this.y = y;
        this.res = res;
        this.letter = '';
        this.targetLetter = targetWord.charAt(this.x);
        this.targetWord = targetWord;
    }

    show() {
        stroke(1);
        this.getColour()
        rect(this.x * this.res, this.y * this.res, this.res, this.res);
        fill(0);
        text(this.letter, this.x * this.res + this.res / 2, this.y * this.res + this.res / 2);
    }

    setLetter(letter) {
        this.letter = letter;
    }

    getColour() {
        if (this.targetLetter === this.letter) {
            fill(0, 255, 0)
        } else {
            this.checkOtherLetters();
        }
    }

    checkOtherLetters() {
        let found = false;
        for (let i = 0; i < this.targetWord.length; i++) {
            if (targetWord.charAt(i) === this.letter) {
                fill(255, 215, 0)
                found = true;
            } else {
                fill(255)
            }
            if (found) {
                return;
            }
        }
    }

}