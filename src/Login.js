import React from 'react';

const Login = (props) => {

    const {email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount, emailError, passwordError} = props;
    return (
        <section className="login">
            <div className="loginContainer">
                <text className="labelpf">Make Your PortFolio</text>
                <label className="labelemail">이메일</label>
                <input
                    type="text"
                    autoFocus
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <p className="errorMsg">{emailError}</p>
                <label className="labelpwd">비밀번호</label>
                <input type="password"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)} />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ?(
                        <>
                            <button onClick={handleLogin}>로그인</button>
                            <p>계정이 없다면 ? <span onClick={() => setHasAccount(!hasAccount)}>회원가입</span></p>
                        </>
                    ) : (
                        <>
                            <button onClick={handleSignup}>회원가입</button>
                            <p>계정이 있다면 ? <span onClick={() => setHasAccount(!hasAccount)}>로그인</span> </p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Login;