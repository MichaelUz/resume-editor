import React from 'react';

import classes from './PagingButtons.module.css';

const PagingButtons = (props) => {
    
    let next = null;
    let previous = null;

    let nextClasses = [classes.PagingButton, classes.Next].join(" ");
    let previousClasses = [classes.PagingButton, classes.Previous].join(" ");

    if(props.next) next = (
        <button onClick={props.goNext} className={nextClasses}>
            {'>'}
        </button>
    );

    if(props.previous) previous = (
        <button onClick={props.goPrevious} className={previousClasses}>
            {'<'}
        </button>
    )

    return(
        <div className={classes.Buttons}>
            {previous}
            {next}
        </div>
        
    );
}

export default PagingButtons;