import React from 'react';
import SectionNavItem from '../SectionNavItem/SectionNavItem';
import prettyPrint from '../../Js/PrettyPrint';

import classes from './SectionNav.module.css';

const SectionNav = (props) => {

    const navItems = props.sections.map((section, index) => (
    <SectionNavItem 
        click={() => props.update(index)}
        selected={index === props.cur} 
        key={section+index} 
        label={prettyPrint(section)}
    />));
    
    return (
        <div className={classes.SectionNav}>
            {navItems}
        </div>
    );
}

export default SectionNav;
