import * as actionTypes from './actionTypes';
import firebase from '../firebase/firebase';

let db = firebase.database();

const initialState = {
    User: 'none',
    Resume: 'none',
    resumeIndex: -1,
    Meta: 'none'
}

const resetState = () => {
    return {...initialState};
}

const updateSection = (state, action) => {
    let newResume = {
            ...state.Resume,
            ...action.payload
    }
    if(state.User.email !== 'Guest')//Update databse if not a guest.
        db.ref(`resumeContents/${state.User.uid}/${state.resumeIndex}`).set(newResume);

    return {
        ...state,
        Resume: newResume
    }
}

const setMeta = (state, action) => {
    return {
        ...state,
        Meta: {...action.payload}
    }
}

const setResume = (state, action ) => {

    //Set resume and make sure array fields are there as empty arrays
    let arrayFields = [
        'Experience',
        'Projects',
        'Skills'
    ]

    let newResume = {
        ...action.payload
    }

    arrayFields.forEach((section) => {
        if(!newResume[section])
            newResume[section] = [];
            
    });

    return {
        ...state,
        Resume: newResume
    };
}

const setUser = (state, action) => {

    let newUser = {
        ...action.payload
    }

    return {
        ...state,
        User: newUser
    }
}

const setResumeIndex = (state, action) => {
    return {
        ...state,
        resumeIndex: action.payload
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_SECTION: return updateSection(state, action);
        case actionTypes.SET_RESUME: return setResume(state, action);
        case actionTypes.SET_USER: return setUser(state, action);
        case actionTypes.SET_RESUME_INDEX: return setResumeIndex(state, action);
        case actionTypes.RESET_STATE: return resetState();
        case actionTypes.SET_META: return setMeta(state, action);
        default: return state;
    }
}

export default reducer;