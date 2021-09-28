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
//  количество мин на поле
//  и начальный цвет когда все клетки закрыты

// CREATION OF SQUARE FILED (WIDTH, HEIGHT, SizeOfEachSquareInPixels, MARGIN, COLOR)
const squareField = new SquareField(10, 10, 80, 5, 20, '#494949');
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
  const hardMode = () => {
    squareField.switchDifficultMode();
    resetTheGame()
  }
  const easyMode = () => {
    squareField.switchEasyMode();
    resetTheGame()
  }
  return (
    <div onClick={reloadField} className="container">
      {squareDiv}
      <CounterOfTries text={`Tries made:  ${squareField.counter}`} />
      <div className='switch_mode'>
        <ButtonReset
          btnOnClickReset={hardMode}
          text='Hard Game Mode'
        />
        <ButtonReset
          btnOnClickReset={resetTheGame}
          text='Reset the Game'
        />
        <ButtonReset
          btnOnClickReset={easyMode}
          text='Easy Game Mode'
        />
      </div>
      {squareField.congrats ?
        <CongratsMessage
          text={`Congratulations!!! You found the treasures and won the game! You have made ${squareField.counter} tries.`} />
        : null}
      {squareField.fail ?
        <CongratsMessage
          text='You have steped on pumkin-mine, the game is lost!((((' />
        : null}
      <p className='instructions'>
        Инструкция: на поле спрятан сундук, но на поле также есть мины,
        для помощи в легком режиме игры при клике на безопасную клетку вы видите есть ли мины возле вас,
        они обозначаются флажком.
        На сложном уровне игры вы столкнетесь с красными клетками, они означают, что
        мины либо сверху от вас, либо снизу, или слева или справа, при умелом счете вы
        сможете найти сокровища. Внутри App.js на 17 строчке вы также можете очень легко менять
        размеры поля, размер клеток, количество мин и дефолтный цвет клеток.
        Очень реомендую играть в Сложном Моде и плюс задать "10, 10, 50, 5, 30, '#494949'" полю, игра очень интересная в таком виде!.
        Приятной игры!
    </p>

    </div>
  );
}


export default App;
