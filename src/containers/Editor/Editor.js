import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import ContextPanel from '../../components/ContextPanel/ContextPanel';
import ResumeDisplay from '../../components/ResumeDisplay/ResumeDisplay';
import MenuButton from '../../components/Button/MenuButton';
import MenuPanel from '../../components/MenuPanel/MenuPanel';
import { withRouter } from 'react-router-dom';

const Editor = (props) =>{

    const [menuOn, updateMenuOn] = useState(false);
    const [shouldRender, updateShouldRender] = useState(false);


    //Load resume on page load if we're coming from home
    useEffect(() => {

        if((props.resumeIndex === -1 && props.user.email !== 'Guest') || props.user === 'none'){
            props.history.push('/');
        }
        else{
            props.initResume(props.resumeIndex, () => updateShouldRender(true));
        }
    }, []);



    //Editor styling
    const style = {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
    const updateResume = (section, data) => {
        props.updateSection(section, data);
    }

    //Update meta in database
    const updateMetaDB = (meta) => {
        if(props.user.email === 'Guest') return; //Don't update if guest.
        props.db.ref(`resumes/${props.user.uid}/${props.resumeIndex}`).set(meta);
    }

    //Initialize editor elements if page should render
    let resumeDisplay = null;
    let contextPanel = null;

    if(props.resume !== 'none'){
        resumeDisplay = <ResumeDisplay title={props.meta.name} resume={props.resume}/>;

        if(window.innerWidth > 1000)
            contextPanel = <ContextPanel save={updateResume} data={props.resume} meta={props.meta} metaUpdate={updateMetaDB} user={props.user}/>;
    } 
        
    //Conditionnaly render
    let jsx = shouldRender ? 
        <div style={style}>
            <MenuButton click={() => updateMenuOn(true)}/>
            <MenuPanel 
                on={menuOn} 
                close={() => updateMenuOn(false)}
                email={props.user === 'none' ? 'Guest' : props.user.email}
                auth={props.auth}
                signOutCallback={props.resetState}
            />
            {resumeDisplay}
            {contextPanel}
        </div> :
        null;


    return jsx;
};

const mapStateToProps = (state) => {
    return {
        resume: state.Resume,
        user: state.User,
        resumeIndex: state.resumeIndex,
        meta: state.Meta
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        updateSection: (section, sectionData) => dispatch(actions.updateSection(section, sectionData)),
        initResume: (index, callback) => dispatch(actions.initResume(index, callback)),
        setUser: () => dispatch(actions.setUser()),
        resetState: () => dispatch(actions.resetState()),
    } 
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Editor));