import React from 'react';
import Button from '../../Button/Button';

import classes from './ElementContainer.module.css';

const ElementContainer = (props) => {

    return(
        <div>
            <h2 className={classes.Title}>{props.title}</h2>
            <div className={classes.Form}>
                {props.children}
            </div>
            <Button color={'white'} click={props.save}>Save Section</Button>
        </div>
    );
}

export default ElementContainer;