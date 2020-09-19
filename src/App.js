import React from 'react';
import './App.css';
import SquareField from './Components/SquareField/SquareField';


const squareField = new SquareField(4, 4, 1, 1);

const App = () => {

    squareField.createAllSquaresArray();
    const squareDiv = squareField.getSquareDiv();
 
  return (
    <div className="container">
      {squareDiv}

    </div>
  );
}

export default App;
