import React, { useEffect, useState } from 'react';
import './App.css';
import SquareField from './Components/SquareField/SquareField';
import CounterOfTries from './Components/CounterOfTries/CounterOfTries';


// CREATION OF SQUARE FILED (WIDTH, HEIGHT, SizeOfEachSquareInPixels, MARGIN, COLOR)
const squareField = new SquareField(3, 3, 100, 10, 'red');
squareField.createAllSquaresArray();
squareField.makeRandomNumbers();


const App = () => {

  const [game, setGame] = useState(squareField.getSquareArray());
  
let squareDiv = squareField.getSquareDiv();
  const CreationOfTheGame = () => {
    let squaresCopy = [...game];
    squaresCopy = [];
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
  console.log(squareField.randomObject);
  console.log(squareField.minesArray);


  return (
    <div onClick={reloadField} className="container">
      {squareDiv}
    <CounterOfTries text={squareField.counter} />
    </div>
  );
}


export default App;
