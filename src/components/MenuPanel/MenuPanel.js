import React from 'react';
import classes from './MenuPanel.module.css';
import { withRouter } from 'react-router-dom';


const MenuPanel = (props) => {

    let bgClass = props.on ? classes.bgOn:
        classes.bg;

    let panelClass = props.on ? classes.panelOn :
        classes.panel;
    
    
    const signout = () => {
        if(window.confirm('Are you sure you want to leave? Unsaved changes will be lost.')){
            props.auth.signOut().then(() => {
                props.signOutCallback();
                props.history.push('/');
            });
        }
    }

    const goHome = () => {
        if(window.confirm('Are you sure you want to leave? Unsaved changes will be lost.')){
            props.history.push('/');
        }
    }

    let jsx = 
        <div>
            <div className={bgClass} onClick={props.close}></div>
            <div className={panelClass}>
                <h3 className={classes.email}>{props.email}</h3>
                <button onClick={goHome} className={classes.button}>{props.email === 'Guest' ? 'Exit' : 'Home'}</button>
                {props.email !== 'Guest' ? <button className={classes.button} onClick={signout}>Sign out</button> : null}
            </div>
        </div>

    if(window.innerWidth < 1000){
        jsx = null;
    }
    
    return jsx;
}

export default withRouter(MenuPanel);