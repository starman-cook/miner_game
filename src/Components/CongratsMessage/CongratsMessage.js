import React from 'react';
import './CongratsMessage.css';

const CongratsMessage = (props) => {
    return (
    <div className='congrats_block'>
        <p className='congrats_block__text'>{props.text}</p>
    </div>
    )
}


export default CongratsMessage;
