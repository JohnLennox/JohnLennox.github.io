class LetterBox {

    constructor(x, y, resX, resY, targetWord) {
        this.x = x;
        this.y = y;
        this.resX = resX;
        this.resY = resY;
        this.letter = '';
        this.targetLetter = targetWord.charAt(this.x);
        this.targetWord = targetWord;
    }

    show() {
        stroke(1);
        this.getColour()
        rect(this.x * this.resX, this.y * this.resY, this.resX, this.resY);
        fill(0);
        textSize(32)
        text(this.letter, this.x * this.resX + this.resX / 2, this.y * this.resY + this.resY / 2);
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