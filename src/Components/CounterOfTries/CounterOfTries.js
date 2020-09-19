import React from 'react';
import './CounterOfTries.css';

const CounterOfTries = (props) => {
    return (
        <div className='counter_of_tries'>
            <p className='counter_of_tries__text'>{props.text}</p>
        </div>
    )
}

export default CounterOfTries;