import React, { useState } from 'react';

import classes from './SectionNavItem.module.css';

const SectionNavItem = (props) =>{

    const classNames = props.selected ? [classes.SectionNavItem, classes.Selected].join(' ') : classes.SectionNavItem;
    
    const svg = {
        width: '20%',
        height: '40%'
    }

    return(
        <button onClick={props.click} className={classNames}>
            {props.label}
        </button>
    );
}

export default SectionNavItem;