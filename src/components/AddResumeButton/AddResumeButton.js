import React from 'react';

import classes from './AddResumeButton.module.css';

const AddResumeButton = (props) => {

    return (
        <button onClick={props.click} className={classes.AddResumeButton}>
            +
        </button>
    );
}

export default AddResumeButton;