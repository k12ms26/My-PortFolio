import React, { useState, useEffect } from 'react';
import fire from './firebaseConfig';
import './App.css';
import App_tmp from './App_tmp';
import Home from './Hero';
import Hero from './Hero';
import Nav from './Nav';
import Login from './Login';
import Question from './question';
import {Redirect, useHistory} from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const App = ({history}) => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin = () => {
        clearErrors();
        fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                switch(err.code){
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                }
            });

    }

    const handleSignup = () => {
        clearErrors();
        fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((err) => {
                switch(err.code){
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    }
    // const history = useHistory();

    const handleLogout = () => {
        fire.auth().signOut();
        
    }

    const authListener = () => {
        fire.auth().onAuthStateChanged((user) =>{
            if(user) {
                clearInputs();
                setUser(user);
            } else{
                setUser("");
            }
        });
    }
    var email_result = user.email
    useEffect(() => {
        authListener();
    }, []);
    return (
        <div className="App">
            {user ?(
                <Hero handleLogout={handleLogout} email_login={email_result.split("@")[0]}/>
            ) : (
                <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                emailError={emailError}
                passwordError={passwordError} />
            )}
        </div>
    );
};

export default App;