import React from 'react';
import Square from '../Square/Square';
import './SquareField.css';


class SquareField {
    createAllSquaresArray() {
        const times = this._fieldWidth * this._fieldHeight;
        for (let i = 0; i < times; i++) {
            let squareParam = {
                hasItem: 'empty',
                state: 'closed',
                mine: 'chance',
                around: 'nothing',
                detection: 'noDetection',
                id: 0
            }
            this._allSquares.push(squareParam);
            squareParam.id = i;
        }
    }
    getSquareArray() {
        return this._allSquares;
    }
    getSquareDiv() {
        const squaresDiv = (
            <div style={this.setFieldStyle()} className="squareField">
                {
                    this._allSquares.map((square) => {
                        return (
                            <Square
                                key={square.id}
                                squareOpenOnClick={() => { this.pickASquare(square.id) }}
                                squareClass={`${square.state} ${square.hasItem} ${square.mine} ${square.detection} ${square.around}`}
                                squareStyle={this.setSquareStyle()}
                            />
                        )
                    })
                }
            </div>
        )
        return squaresDiv
    }
    setFieldStyle() {
        let fieldStyle = {
            width: `${this._fieldWidth * this._squareSize + this._fieldWidth * (this._squareMargin * 2)}px`,
            height: `${this._fieldHeight * this._squareSize + this._fieldHeight * (this._squareMargin * 2)}px`,
            display: 'flex',
            flexWrap: 'wrap'
        }
        return fieldStyle;
    }
    setSquareStyle() {
        let squareStyle = {
            width: `${this._squareSize}px`,
            height: `${this._squareSize}px`,
            background: this._squareColor,
            margin: `${this._squareMargin}px`
        }
        return squareStyle
    }
    pickASquare(id) {
        if (this.gameIsOver === true) {
            return;
        }
        let index = this._allSquares.findIndex((square) => square.id === id);
        const oneSquare = { ...this._allSquares[index] };
        if (oneSquare.state === 'closed') {
            oneSquare.state = this.open;
            if (oneSquare.id === this.randomObject) {
                oneSquare.hasItem = this.objectFound;
                this.gameIsOver = true;
                // add this if you don't want to count as try when you find object
                // this.counter--; 
                this.congrats = true;
            } else if (this.minesArray.includes(oneSquare.id)) {
                oneSquare.mine = this.mine;
                this.fail = true;
                this.gameIsOver = true;
            }

            // Mine detection
            // Hard level
            if (this.diffLevel === true) {
                if (this.minesArray.includes(oneSquare.id - 1) && !this.leftSide.includes(oneSquare.id)) {
                    oneSquare.around = this.around;
                }
                if (this.minesArray.includes(oneSquare.id + 1) && !this.rightSide.includes(oneSquare.id)) {
                    oneSquare.around = this.around;
                }
                if (
                    this.minesArray.includes(oneSquare.id - this._fieldWidth) ||
                    this.minesArray.includes(oneSquare.id + this._fieldWidth)) {
                    oneSquare.around = this.around;
                }
            }
            // Easy level
            if (this.diffLevel === false) {
                if (this.minesArray.includes(oneSquare.id - 1)) {
                    oneSquare.state = this.open;
                    if (this.leftSide.includes(oneSquare.id) || this.gameIsOver === true) {
                        // doing nothing)) Так задумано. do not use return!!!
                    } else {
                        this._allSquares[index - 1].detection = this.detection;
                    }
                }
                if (this.minesArray.includes(oneSquare.id + 1)) {
                    oneSquare.state = this.open;
                    if (this.rightSide.includes(oneSquare.id) || this.gameIsOver === true) {
                        //    do nothing)) do not use return!!!
                    } else {
                        this._allSquares[index + 1].detection = this.detection;
                    }
                }
                if (this.minesArray.includes(oneSquare.id - this._fieldWidth)) {
                    oneSquare.state = this.open;
                    if (this.gameIsOver === true) {
                        //    do nothing)) do not use return!!!
                    } else {
                        this._allSquares[index - this._fieldWidth].detection = this.detection;
                    }
                }
                if (this.minesArray.includes(oneSquare.id + this._fieldWidth)) {
                    oneSquare.state = this.open;
                    if (this.gameIsOver === true) {
                        //    do nothing))  do not use return!!!
                    } else {
                        this._allSquares[index + this._fieldWidth].detection = this.detection;
                    }
                }
            }
            this.counter++;

        }
        this._allSquares[index] = oneSquare;
    }
    clearSquareArray() {
        return this._allSquares = [];
    }
    makeRandomNumbers() {
        this.randomObject = Math.round(Math.random() * (this._fieldWidth * this._fieldHeight - 1));
        this.minesArray = [];
        for (let i = 0; i < this._amountOfMines; i++) {
            this.randomMine = Math.round(Math.random() * (this._fieldWidth * this._fieldHeight - 1));
            if (this.randomObject === this.randomMine || this.minesArray.includes(this.randomMine)) {
                i--
                continue;
            } else {
                this.minesArray.push(this.randomMine);
            }
        }
    }
    findSidesForDetectionHidden() {
        this.leftSide = [];
        this.rightSide = [];
        for (let i = 0; i < this._fieldHeight; i++) {
            this.leftSide.push(this._fieldWidth * i);
            this.rightSide.push((this._fieldWidth * i) - 1);
        }
    }
    switchDifficultMode() {
        console.log(this.diffLevel);
        return this.diffLevel = true;
    }
    switchEasyMode() {
        console.log(this.diffLevel);

        return this.diffLevel = false;
    }
    constructor(fieldWidth, fieldHeight, squareSize, squareMargin, amountOfMines, squareColor) {
        this._fieldWidth = fieldWidth;
        this._fieldHeight = fieldHeight;
        this._squareSize = String(squareSize);
        this._squareMargin = String(squareMargin);
        this._squareColor = squareColor;
        this._amountOfMines = amountOfMines;
    }
    _allSquares = [];
    open = 'open';
    mine = 'mine';
    objectFound = 'objectFound';
    detection = 'mineFound';
    around = 'around';
    gameIsOver = false;
    congrats = false;
    fail = false;
    counter = 0;
    diffLevel = false;
}

export default SquareField;