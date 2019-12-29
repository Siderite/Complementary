"use strict";
class Color {
    constructor(value = 0  /* black */) {
        this._value = value;
    }
    toString() {
        return '#' + this._value.toString(16).padStart(6, '0');
    }
    complement() {
        return new Color(0xFFFFFF - this._value);
    }
    equals(anotherColor) {
        return this._value === anotherColor._value;
    }
    static random() {
        return new Color(Math.round(Math.random() * 0xFFFFFF));
    }
}
