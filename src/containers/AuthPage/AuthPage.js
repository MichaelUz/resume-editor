import React, { useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import MainTitle from '../../components/MainTitle/MainTitle';
import * as actions from '../../store/actions';
import logo from '../../assets/images/myresume_logo.png';
import { withRouter } from 'react-router-dom';


import classes from './AuthPage.module.css'

const AuthPage = (props) => {
    
    const [auth, updateAuth] = useState({
        email: '',
        password: '',
        login: true,
        errorMessage: ''
    });   

    const [width, updateWidth] = useState(window.innerWidth);

    useLayoutEffect(() => {
        const updateWidthFunc = () => updateWidth(window.innerWidth)
        window.addEventListener('resize', updateWidthFunc);

        return () => window.removeEventListener('resize', updateWidthFunc);
    }, []);

    const bottomMessage = auth.login ? "Don't have an account? Create an account." :
        "Already got an account? Login.";

    const toggleLogin = () => {
        updateAuth({
            ...auth,
            login: !auth.login
        });
    }


    const displayError = (message) => {
        updateAuth({
            ...auth,
            errorMessage: message
        });
    }

    const authenticate = () => {
        props.loginUser(auth.email, auth.password, auth.login, displayError);
    }

    const loginAsGuest = () => {
        props.setUser();
        props.history.push('/editor');
    }
    
    let jsx;
    if(width > 1000 ){
        jsx = 
            <div className={classes.bg}>
                <div className={classes.content}>
                    <img className={classes.logo} src={logo}/>
                    <div className={classes.vr}></div>
                    <div className={classes.authBox}>
                        <h1 className={classes.login}>{auth.login ? 'Login' : 'Register'}</h1>
                        <Input
                            label="Email"
                            width='60%'
                            update={(event) => updateAuth({...auth, email: event.target.value})}
                            val={auth.email}
                        />
                        <Input
                            label="Password"
                            width='60%'
                            type='password'
                            update={(event) => updateAuth({...auth, password: event.target.value})}
                            val={auth.password}
                        />
                        <p className={classes.bottomMessage} onClick={toggleLogin }>{bottomMessage}</p>
                        <div>
                            <Button click={authenticate}>{auth.login ? 'Login' : 'Register'}</Button>
                        </div>
                        <div>
                            <Button click={loginAsGuest}>Continue as Guest</Button>
                        </div>
                        <p className={classes.error}>{auth.errorMessage}</p>
                    </div>
                </div>
        </div> 
    }
    else{
        jsx = 
            <div className={classes.bg}>               
                <div className={classes.content}>
                    <MainTitle/>
                    <div className={classes.authBox}>
                        <h1 className={classes.login}>{auth.login ? 'Login' : 'Register'}</h1>
                        <Input
                            label="Email"
                            width='60%'
                            update={(event) => updateAuth({...auth, email: event.target.value})}
                            val={auth.email}
                        />
                        <Input
                            label="Password"
                            width='60%'
                            type='password'
                            update={(event) => updateAuth({...auth, password: event.target.value})}
                            val={auth.password}
                        />
                        <p className={classes.bottomMessage} onClick={toggleLogin }>{bottomMessage}</p>
                        <div>
                            <Button click={authenticate}>{auth.login ? 'Login' : 'Register'}</Button>
                        </div>
                        <div>
                            <Button click={loginAsGuest}>Continue as Guest</Button>
                        </div>
                        <p className={classes.error}>{auth.errorMessage}</p>
                    </div>
                </div>
            </div> 
    }

    return jsx;
}

const mapStateToProps = (state) => {
    return {
        user: state.User
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        loginUser: (email, password, login, errorFunc) => dispatch(actions.loginUser(email, password, login, errorFunc)),
        setUser: () => dispatch(actions.setUser())
    } 
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthPage));