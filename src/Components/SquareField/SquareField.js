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
                return(
                    <Square 
                    key = {square.id}
                    squareOpenOnClick = {() => {this.pickASquare(square.id)}}
                    squareClass = {`${square.state} ${square.hasItem} ${square.mine}`}
                    squareStyle = {this.setSquareStyle()}
                    />
                )
               })
           }
       </div>
   )
return squaresDiv
    }
    setFieldStyle () {
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
            width:  `${this._squareSize}px`,
            height: `${this._squareSize}px`,
            background: this._squareColor,
            margin: `${this._squareMargin}px`
        }
        return squareStyle
    }
    pickASquare(id) {
        const index = this._allSquares.findIndex((square) => square.id === id);
        const oneSquare = {...this._allSquares[index]};
        oneSquare.state = this.open;
        if(oneSquare.id === this.randomObject) {
            oneSquare.hasItem = this.objectFound;
            oneSquare.state = 'closed';
        }
        this._allSquares[index] = oneSquare;
    }
    clearSquareArray() {
        return this._allSquares = [];
    }
    makeRandomNumbers() {
        this.randomObject = Math.round(Math.random() * (this._fieldWidth * this._fieldHeight));
        this.minesArray = [];
        for (let i = 0; i < 5; i++){
            this.randomMine = Math.round(Math.random() * (this._fieldWidth * this._fieldHeight));
            if (this.randomObject === this.randomMine || this.minesArray.includes(this.randomMine)) {
                i--
                continue;
            } else {
                this.minesArray.push(this.randomMine);
        }
    }
    }
    constructor(fieldWidth, fieldHeight, squareSize, squareMargin, squareColor) {
        this._fieldWidth = fieldWidth;
        this._fieldHeight = fieldHeight;
        this._squareSize = String(squareSize);
        this._squareMargin = String(squareMargin);
        this._squareColor = squareColor;
    }
    _allSquares = [];
    open = 'open';
    mine = 'mine';
    objectFound = 'objectFound';
}

export default SquareField;