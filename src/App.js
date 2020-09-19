import React, { useEffect, useState } from 'react';
import './App.css';
import SquareField from './Components/SquareField/SquareField';

// CREATION OF SQUARE FILED (WIDTH, HEIGHT, SizeOfEachSquareInPixels, MARGIN, COLOR)
const squareField = new SquareField(3, 3, 100, 10, 'red');
squareField.createAllSquaresArray();



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
      if (square.state === 'open') {
      return CreationOfTheGame();
      }
    })
  }

  return (
    <div onClick={reloadField} className="container">
      {squareDiv}
  
<button onClick={CreationOfTheGame}>FUCK YOU</button>
    </div>
  );
}


export default App;
