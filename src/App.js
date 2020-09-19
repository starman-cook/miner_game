import React, { useState } from 'react';
import './App.css';
import SquareField from './Components/SquareField/SquareField';
import CounterOfTries from './Components/CounterOfTries/CounterOfTries';
import ButtonReset from './Components/ButtonReset/ButtonReset';
import CongratsMessage from './Components/CongratsMessage/CongratsMessage';

//  ВАЖНО: при создании объекта из класса SquareField можно задать параметры:
//  количество клеток по ширине
//  количество клеток по высоте
//  размер каждой клетки в пикселях
//  промежуток между клетками в пикселях
//  и начальный цвет когда все клетки закрыты

// CREATION OF SQUARE FILED (WIDTH, HEIGHT, SizeOfEachSquareInPixels, MARGIN, COLOR)
const squareField = new SquareField(6, 6, 100, 10, 'red');
squareField.createAllSquaresArray();
squareField.makeRandomNumbers();
squareField.findSidesForDetectionHidden();


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
    squareField.findSidesForDetectionHidden();
    squaresCopy.push(squareField.getSquareArray());
    squareField.counter = 0;
    squareField.gameIsOver = false;
    squareField.congrats = false;
    squareField.fail = false;
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
    {squareField.congrats ? 
    <CongratsMessage 
    text={`Congratulations!!! You found it! You have made ${squareField.counter} tries.`}/> 
    : null}
    {squareField.fail ? 
    <CongratsMessage 
    text='You have steped on mine, the game is lost!(((('/> 
    : null}
    </div>
  );
}


export default App;
