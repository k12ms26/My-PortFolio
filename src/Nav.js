import React, { Component, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app';
import 'firebase/auth';
import question_mark from './image/question_mark.png';
import firebaseConfig from './firebaseConfig';
import Question from './question';
import { Button } from '@material-ui/core';
// import { Modal } from './components/modal/Modal';

//const firebaseApp = firebase.initializeApp(firebaseConfig);

const Nav = (props) => {
    // render(){
    //     const {
    //         user,
    //         signOut,
    //         signInWithGoogle,
    //       } = this.props;
    
         const navStyle = {
            color:'white',
            textDecoration : 'none'
         };

        const [show, setShow] = useState(false);

        const closeModalHandler = () => setShow(false);
    
        return(
            <nav>
                <Link style={navStyle} to="/">
                    <h3 className="pfh3">My PF</h3>
                </Link>
                {/* { show ? <div onClick={closeModalHandler} className="back-drop"></div> : null }
                <button className="btn-openModal" onClick={() => setShow(true)}>Open Modal</button>
                <Modal show={show} close={closeModalHandler}/> */}
                {/* <button className="question_mark" onClick={"javascript:location.href="+{Modal}}><img className="question_mark2" src={question_mark} /></button> */}
                <ul className="nav-links">
                    {/* <Link style={navStyle} to="/countword">
                        <ul className="navtext">자기소개서 작성</ul>
                    </Link> */}
                    <Link style={navStyle} to="/shop">
                        <ul className="navfirst">대외활동 기록</ul>
                    </Link>
                    <Link style={navStyle} to="/countword">
                        <ul className="navsecond">글자 수 세기</ul>
                    </Link>
                    <Link style={navStyle} to="/new">
                        <ul className="navthird">자유 게시판</ul>
                    </Link>
                </ul>
                <Question name={props.name}>
                   
                </Question>
                <Button className="logoutlink" onClick={props.handleLogout}>
                    <text>로그아웃</text>
                    {/* <button className="logoutbtn" onClick={props.handleLogout}>로그아웃</button> */}
                </Button>
                {/* <Link className="logoutlink" to="/">
                    <button className="logoutbtn" onClick={props.handleLogout}></button> 
                </Link> */}
                {/* <div>
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
                    } */}
            
            </nav>
            
        );
    }


//const firebaseAppAuth = firebaseApp.auth();

//const providers = {
//  googleProvider: new firebase.auth.GoogleAuthProvider(),
//};

//export default withFirebaseAuth({
//  providers,
//  firebaseAppAuth,
//})(Nav);


export default Nav;