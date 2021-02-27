import React from 'react';
import logo from '../../assets/images/myresume_logo.png';

import classes from './MainTitle.module.css'

const MainTitle = (props) =>{
    return (
        <div className={classes.container}>
            <img className={classes.logo} src={logo}/>
            <div className={classes.vr}></div>
            <div className={classes.titleBox}>
                <div className={classes.titleText}>
                    <h1 className={classes.titleBlue}>My</h1>
                    <h1 className={classes.titleBlack}>Resume.</h1>
                </div>
            </div>
        </div>
        
    );
}

export default MainTitle;