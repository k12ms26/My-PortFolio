import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

class Nav extends Component {
    render(){
        const {
            user,
            signOut,
            signInWithGoogle,
          } = this.props;
    
        const navStyle = {
            color:'white'
        };
    
        return(
            <nav>
                <Link style={navStyle} to="/">
                    <h3>제목 뭐할까</h3>
                </Link>
                <ul className="nav-links">
                    <Link style={navStyle} to="/about">
                        <li>편성표</li>
                    </Link>
                    <Link style={navStyle} to="/shop">
                        <li>추천받기</li>
                    </Link>
                    <Link style={navStyle} to="/new">
                        <li>마이페이지</li>
                    </Link>
                </ul>
                <div>
                    {
                        user 
                        ? <p>{user.displayName}님, 반갑습니다</p>
                        : <p>로그인 하세요</p>
                    }
                </div>
                    {
                        user
                        ? <button onClick={signOut}>로그아웃</button>
                        : <button onClick={signInWithGoogle}>로그인</button>
                    }
            </nav>
        );
    }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Nav);


//export default Nav;