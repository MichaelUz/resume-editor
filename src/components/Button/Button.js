import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
    const className = props.color === 'blue' ? classes.ButtonBlue : classes.ButtonWhite;
    return(
        <button className={className} onClick={props.click}>{props.children}</button>
    );
}

export default Button;