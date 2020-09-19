import React from 'react';
import './App.css';
import SquareField from './Components/SquareField/SquareField';

// CREATEION OF SQUARE FILED (WIDTH, HEIGHT, SizeOfEachSquareInPixels, MARGIN, COLOR)
const squareField = new SquareField(3, 3, 100, 10, 'red');

const App = () => {

    squareField.createAllSquaresArray();
    const squareDiv = squareField.getSquareDiv();
 

    // console.log(squareField);
  return (
    <div className="container">
      {squareDiv}

    </div>
  );
}

export default App;
