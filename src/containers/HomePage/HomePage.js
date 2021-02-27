import React, { useState, useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import MainTitle from '../../components/MainTitle/MainTitle';
import ResumePreviews from '../../components/ResumePreviews/ResumePreviews';
import SearchBar from '../../components/SearchBar/SearchBar';
import ResPrev from '../../components/ResPrev/ResPrev';
import AuthPage from '../AuthPage/AuthPage';
import * as actions from '../../store/actions';
import emptyResume from '../../Js/emptyResume';
import { withRouter } from 'react-router-dom';


import classes from './HomePage.module.css';
import AddResumeButton from '../../components/AddResumeButton/AddResumeButton';

const HomePage = (props) => {
   
    let [renderState, updateRenderState] = useState('none');
    let [resumes, updateResumes] = useState([]);

    //Add event listener for screen width
    const [width, updateWidth] = useState(window.innerWidth);
    useLayoutEffect(() => {
        const updateWidthFunc = () => updateWidth(window.innerWidth)
        window.addEventListener('resize', updateWidthFunc);

        return () => window.removeEventListener('resize', updateWidthFunc);
    }, []);

    //Render login or home page based on if we're logged in.
    useEffect(() => {

        props.auth.onAuthStateChanged((user) =>  {
            if (user) {
                props.setUser();
                updateRenderState('home');
            }
            else{
                updateRenderState('auth');
            }
        });
    }, []);


    //Feth data once we render the home page
    useEffect(() => {
        if(renderState === 'home'){
            props.db.ref(`resumes/${props.user.uid}`).once('value').then((snapshot) => {
                if(snapshot.val())
                    updateResumes(snapshot.val());
            });
        }
    },[renderState]);


    //Loads selected resume and redirects to editor
    const loadResume = (index) => {
        props.setResumeIndex(index);
        props.history.push('/editor');
    }


    const addResume = () => {
        //Add resume to state
        let newResumes = [...resumes];
        newResumes.push({
            name: 'MyResume',
            filename: 'myresume.pdf'
        });
        updateResumes(newResumes);

        //Add resume name and contents to database
        props.db.ref(`resumes/${props.user.uid}`).set(newResumes);
        props.db.ref(`resumeContents/${props.user.uid}/${resumes.length}`).set(emptyResume);
    }

    const removeResume = (index) => {

        if(!window.confirm('Are you sure you want to delete this resume?')){
            return;
        }

        //Remove resume from state
        let newResumes = [...resumes];
        newResumes.splice(index, 1);
        updateResumes(newResumes);

        //Update database to reflect new resumes
        props.db.ref(`resumes/${props.user.uid}`).set(newResumes);

        props.db.ref(`resumeContents/${props.user.uid}`).once('value').then((snapshot) => {

            let newResumeContents = [...snapshot.val()];
            newResumeContents.splice(index, 1);
            props.db.ref(`resumeContents/${props.user.uid}`).set(newResumeContents);
        });
    }


    //Render resume previews
    let resumesJSX = resumes.map((resume, index) => {
        return <ResPrev 
                    delete={() => removeResume(index)}
                    click={() => loadResume(index)} 
                    key={'resprev' + index} 
                    title={resume.name}
                />
    });

    //Signout user
    const signout = () => {
        props.auth.signOut().then(() => {
            props.resetState();
            props.history.push('/');
        });
    }

    let jsx;
    switch(renderState){
        case 'none':
            jsx = null;
            break;

        case 'home':
            if(window.innerWidth > 1000){
                jsx = 
                    <div className={classes.HomePage}>
                        <MainTitle/>
                        <div className={classes.content}>
                            <div className={classes.infoCard}>
                                <div className={classes.infoCardText}>
                                    <p className={classes.welcome1}>Logged in as</p>
                                    <p className={classes.welcome2}>{props.user.email}</p>
                                </div>
                                <button onClick={signout} className={classes.signOut}>Sign out</button>
                            </div>
                            <div className={classes.vr}></div>
                            <ResumePreviews resumes={resumesJSX}/>
                        </div>
                    
                        <AddResumeButton click={addResume}/>
                    </div>;
            }
            else {
                jsx = 
                    <div className={classes.HomePage}>
                            <MainTitle/>
                            <div className={classes.content}>
                                <ResumePreviews resumes={resumesJSX}/>
                                <div className={classes.infoCard}>
                                    <p className={classes.welcome2}>{props.user.email}</p>
                                    <button onClick={signout} className={classes.signOut}>Sign out</button>
                                </div>
                            </div>
                            <AddResumeButton click={addResume}/>
                    </div>;
            }
            
            break;
        
        case 'auth':
            jsx = <AuthPage auth={props.auth}/>
            break;
    }

    return jsx;
}

const mapStateToProps = (state) => {
    return {
        user: state.User
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setUser: () => dispatch(actions.setUser()),
        setResumeIndex: (index) => dispatch(actions.setResumeIndex(index)),
        resetState: () => dispatch(actions.resetState()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));