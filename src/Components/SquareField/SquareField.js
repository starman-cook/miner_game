import React from 'react';
import Square from '../Square/Square';


class SquareField {
    _allSquares = [];
    createAllSquaresArray() {
        const times = this._fieldWidth * this._fieldHeight;
        for (let i = 0; i < times; i++) {
            let squareParam = {
                hasItem: 'empty',
                state: 'closed',
                mine: 'noMine',
                id: 0
            }
            this._allSquares.push(squareParam);
            squareParam.id = i;
        }
        console.log(this._allSquares);
    }
    pickASquare(id) {
        const oneSquare = this.allSquares[id]
        oneSquare.state = 'open';
    }
    getSquareArray() {
        return this._allSquares;
    }

    clearSquareArray() {
        return this._allSquares = [];
    }
    constructor(fieldWidth, fieldHeight, squareSize, squareMargin) {
        this._fieldWidth = fieldWidth;
        this._fieldHeight = fieldHeight;
        this._squareSize = squareSize;
        this._squareMargin = squareMargin;
    }
  
    _squareStyle = {
        width: '100px',
        height: '100px',
        background: 'red',
        margin: '10px'
    }
    getSquareDiv() {
        const squaresDiv = (
       <div className="squareField">
           {
               this._allSquares.map((square) => {
                return(
                    <Square 
                    key = {square.id}
                    squareOpenOnClick = {() => {this.pickASquare(square.id)}}
                    squareClass = {square.state}
                    squareStyle = {this._squareStyle}
                    />
                )
               })
           }
       </div>
   )
return squaresDiv};
}

export default SquareField;