import React, { useState } from 'react';
import * as  R from 'ramda';
import SectionNav from '../SectionNav/SectionNav';
import GeneralInfo from '../PanelElements/GeneralInfo/GeneralInfo';
import * as PanelElements from '../PanelElements/PanelElements';
import prettyPrint from '../../Js/PrettyPrint';

import classes from './ContextPanel.module.css'

const ContextPanel = (props) => {

    let [currentPanelIndex, updateCurrentPanel] = useState(0);
    let [myData, updateData] = useState(R.clone(props.data));
    const currentPanel = Panels[currentPanelIndex];

    const currentPanelHandler = (newCurrent) => {
        updateCurrentPanel(newCurrent);
    }

    const CurrentPanelJSX = PanelElements[currentPanel];
    const update = (newData) => {
        //Set data to object or array depending on section
        if(Array.isArray(myData[currentPanel])){
            updateData({
                ...myData,
                [currentPanel]: [
                    ...newData
                ]
            });  
        }
        else{
            updateData({
                ...myData,
                [currentPanel]: {
                    ...newData
                }
            });
        }
    }

    const save = (section) => {
        props.save(section, myData[section]);
    }

    return(
        <div className={classes.ContextPanel}>
            {props.user.email !== 'Guest' ? 
                <GeneralInfo save={(meta) => props.metaUpdate(meta)} meta={props.meta}/> : 
                <div style={{height: '30px'}}></div>}
            <SectionNav cur={currentPanelIndex} update={currentPanelHandler} sections={Panels}/>
            <CurrentPanelJSX
                title={prettyPrint(currentPanel)}
                save={() => save(currentPanel)} 
                data={myData[currentPanel] ? myData[currentPanel] : []}
                update={update}
            />
        </div>
    );
}

const Panels = [
    'PersonalInformation',   //0
    'Education',             //1
    'Experience',            //2
    'Projects',              //3
    'Skills',                //4
]

export default ContextPanel;