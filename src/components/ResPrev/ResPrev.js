import React from 'react';


import classes from './ResPrev.module.css';

const ResumePreview = (props) => {
    return(
        <div className={classes.container}>
            <div className={classes.ResPrev} onClick={props.click}>
                <p className={classes.p}>{props.title}</p>       
            </div>
            <button className={classes.button} onClick={props.delete}>X</button>
        </div>
    );
};

export default ResumePreview;