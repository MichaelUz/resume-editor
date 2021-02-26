import React from 'react';
import prettyPrint from '../../Js/PrettyPrint';

import classes from './Dropdown.module.css';

const Dropdowm = (props) => {

    let value;
    if(props.value === 'n/a') value = 'N/A';
    else value = prettyPrint(props.value);

    return(
        <select value={value} onChange={(event) => props.update(event)} className={classes.dropdown}>
                <option value='Strong'>Strong</option>
                <option value='Medium'>Medium</option>
                <option value='Familiar'>Familiar</option>
                <option value='N/A'>N/A</option>
        </select>
    );
}

export default Dropdowm;