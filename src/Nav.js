import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Nav() {

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
                <p>회원님 반갑습니다</p>
            </div>
            <ul className="nav-login">
                <Link style={navStyle} to="/login">
                    <li>로그인</li>
                </Link>
                <li>로그아웃</li>
            </ul>
        </nav>
    );
}

export default Nav;