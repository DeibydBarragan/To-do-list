import React from 'react';

const Button = (props) => {
    
    const buttonClass = props.otherClasses + ' p-2 rounded-lg font-semibold text-lg drop-shadow-lg transition ease-in-out hover:scale-105 hover:bg-indigo-700 pointer-events:scale-100'
    return (
        <button className=  {buttonClass} >
            {props.children}
        </button>
    );
}

export default Button;
