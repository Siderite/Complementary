"use strict";
class GuideColor extends HTMLElement {
    set color(value) {
        this.style.backgroundColor = value.toString();
    }
}

class ChoiceColors extends HTMLElement {
    connectedCallback() {
        this._clickHandler = this.onChoiceClick.bind(this);
        this.addEventListener('click', this._clickHandler, false);
    }
    disconnectedCallback() {
        this.removeEventListener('click', this._clickHandler, false);
    }
    onChoiceClick(ev) {
        const elem = ev.target;
        if (!(elem instanceof ChoiceColor)) {
            return;
        }
        const result = this._choiceHandler(elem.choiceIndex);
        elem.choiceResult = result;
    }
    setChoiceHandler(handler) {
        this._choiceHandler = handler;
    }
    set colors(value) {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
        for (let i = 0; i < value.length; i++) {
            const color = value[i];
            const elem = new ChoiceColor(color, i);
            this.appendChild(elem);
        }
    }
}

class ChoiceColor extends HTMLElement {
    constructor(color, index) {
        super();
        this.color = color;
        this.choiceIndex = index;
    }
    get choiceIndex() {
        return +this.getAttribute('data-index');
    }
    set choiceIndex(value) {
        this.setAttribute('data-index', value);
    }
    set choiceResult(value) {
        this.setAttribute('data-result', value);
    }
    set color(value) {
        this.style.backgroundColor = value.toString();
    }
}

class Scores extends HTMLElement {
    set scores(log) {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
        for (let i = log.length - 1; i >= 0; i--) {
            const value = log[i];
            const elem = new Score(value);
            this.appendChild(elem);
        }
    }
}

class Score extends HTMLElement {
    constructor(value) {
        super();
        this.innerText = value;
        this.className = value >= 50
            ? 'good'
            : 'bad';
    }
}

class Board extends HTMLElement {
    constructor() {
        super();
        this._guide = new GuideColor();
        this._choices = new ChoiceColors();
        this._score = new Scores();
    }
    connectedCallback() {
        this.appendChild(this._guide);
        this.appendChild(this._choices);
        this.appendChild(this._score);
    }
    setChoiceHandler(handler) {
        this._choices.setChoiceHandler(handler);
    }
    set guideColor(value) {
        this._guide.color = value;
    }
    set choiceColors(value) {
        this._choices.colors = value;
    }
    set scores(value) {
        this._score.scores = value;
    }
}

window.customElements.define('complementary-board', Board);
window.customElements.define('complementary-guide-color', GuideColor);
window.customElements.define('complementary-choice-colors', ChoiceColors);
window.customElements.define('complementary-choice-color', ChoiceColor);
window.customElements.define('complementary-scores', Scores);
window.customElements.define('complementary-score', Score);
