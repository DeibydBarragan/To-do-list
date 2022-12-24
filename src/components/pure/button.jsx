import React from 'react';

const Button = (props) => {
    
    const buttonClass = props.otherClasses + '  outline outline-1 outline-indigo-400 p-2 rounded-lg font-semibold text-lg drop-shadow-lg transition ease-in-out hover:bg-indigo-700'
    return (
        <button className=  {buttonClass} >
            {props.children}
        </button>

    );
}

export default Button;
