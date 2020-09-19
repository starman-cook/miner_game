import React, { useState } from 'react';
import './App.css';
import SquareField from './Components/SquareField/SquareField';
import CounterOfTries from './Components/CounterOfTries/CounterOfTries';
import ButtonReset from './Components/ButtonReset/ButtonReset';

// CREATION OF SQUARE FILED (WIDTH, HEIGHT, SizeOfEachSquareInPixels, MARGIN, COLOR)
const squareField = new SquareField(3, 3, 100, 10, 'red');
squareField.createAllSquaresArray();
squareField.makeRandomNumbers();


const App = () => {

  const [game, setGame] = useState(squareField.getSquareArray());
  
  let squareDiv = squareField.getSquareDiv();

  const CreationOfTheGame = () => {
    let squaresCopy = [...game];
    squaresCopy.push(squareField.getSquareArray());
    setGame(squaresCopy);
  }

  const reloadField = () => {
    squareField._allSquares.map((square) => {
      if (square.state === squareField.open) {
      return CreationOfTheGame();
      }
    })
  }

  const resetTheGame = () => {
    let squaresCopy = [...game];
    squareField.clearSquareArray();
    squareField.createAllSquaresArray();
    squareField.makeRandomNumbers();
    squaresCopy.push(squareField.getSquareArray());
    squareField.counter = 0;
    squareField.gameIsOver = false;
    setGame(squaresCopy);
    squareDiv = squareField.getSquareDiv();
  }

  return (
    <div onClick={reloadField} className="container">
      {squareDiv}
    <CounterOfTries text={squareField.counter} />
    <ButtonReset 
    btnOnClickReset={resetTheGame}
    text='Reset the Game'
    />
    </div>
  );
}


export default App;
