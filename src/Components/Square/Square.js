import React from 'react';


const Square = (props) => {
return(
    <div onClick={props.squareOpenOnClick} className={props.squareClass} style ={props.squareStyle}></div>
)
}



export default Square;