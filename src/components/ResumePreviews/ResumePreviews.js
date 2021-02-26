import React, { useState } from 'react';
import PagingButtons from '../PagingButtons/PagingButtons';

import classes from './ResumePreviews.module.css';

const ResumePreviews = (props) => {

    return (
        <div className={classes.ResumePreviews}>
            <h2>Here are your resumes...</h2>
            <div className={classes.Resumes}>
                {props.resumes}
            </div>            
        </div>
    );
};

export default ResumePreviews;