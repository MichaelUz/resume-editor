import React from 'react';

import classes from './MainTitle.module.css'

const MainTitle = (props) =>{
    return (
        <div className={classes.titleBox}>
                <div className={classes.titleText}>
                    <h1 className={classes.titleBlue}>My</h1>
                    <h1 className={classes.titleBlack}>Resume.</h1>
                </div>
        </div>
    );
}

export default MainTitle;