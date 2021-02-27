import React from 'react';
import classes from './MenuButton.module.css'

const MenuButton = (props) => {

    let jsx = 
        <div className={classes.MenuButton} onClick={props.click}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    
    if(window.innerWidth < 1000){
        jsx = null;
    }

    return jsx;

}

export default MenuButton;