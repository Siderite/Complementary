"use strict";
class Game {
    constructor() {
        // how many color choices to have
        this._numberOfChoices = 5;
        // the list of user scores
        this._log = [];
    }
    init(doc) {
        this._document = doc;
        this._document.addEventListener('DOMContentLoaded', this.onLoad.bind(this), false);
    }
    onLoad() {
        this._board = this._document.getElementsByTagName('complementary-board')[0];
        this._board.setChoiceHandler(this.score.bind(this));
        this.startRound();
    }
    startRound() {
        // all game logic works with numeric data
        const guideColor = Color.random();
        this._roundData = {
            guideColor: guideColor,
            choiceColors: this.generateChoices(guideColor),
            tries: new Set()
        };
        // only this method transforms the data into visuals
        this.refreshUI();
    }
    generateChoices(guideColor) {
        const complementaryColor = guideColor.complement();
        const index = Math.floor(Math.random() * this._numberOfChoices);
        const choices = [];
        for (let i = 0; i < this._numberOfChoices; i++) {
            choices.push(i == index
                ? complementaryColor
                : Color.random());
        }
        return choices;
    }
    refreshUI() {
        this._board.guideColor = this._roundData.guideColor;
        this._board.choiceColors = this._roundData.choiceColors;
        this._board.scores = this._log;
    }
    score(index) {
        const expectedColor = this._roundData.guideColor.complement();
        const isCorrect = this._roundData.choiceColors[index].equals(expectedColor);
        if (!isCorrect) {
            this._roundData.tries.add(index);
        }
        if (isCorrect || this._roundData.tries.size >= this._numberOfChoices - 1) {
            const score = 1 / Math.pow(2, this._roundData.tries.size);
            this._log.push(Math.round(100 * score));
            this.startRound();
        }
        return isCorrect;
    }
}
