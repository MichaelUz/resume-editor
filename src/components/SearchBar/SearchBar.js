import React from 'react';

import classes from './SearchBar.module.css';


const SearchBar = (props) => {
    return (
        <input className={classes.SearchBar} type="text" placeholder="Search"></input>
    );
}

export default SearchBar;