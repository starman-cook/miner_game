import React from 'react';
import './ButtonReset.css';

const ButtonReset = (props) => {
    return (
        <div className='btn_reset'>
            <button className="btn_reset__btn" onClick={props.btnOnClickReset}>{props.text}</button>
        </div>
    )
}


export default ButtonReset;