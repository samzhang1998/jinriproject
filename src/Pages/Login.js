import React, { useState } from 'react';
import { authenticateUser } from '../API';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";
import Header from '../Header';
import back from '../asset/Expand_left.png';
import usericon from '../asset/usericon.png';
import passwordicon from '../asset/passwordicon.png';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('customer');
    const [loginStatus, setLoginStatus] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const isAuthenticated = authenticateUser(userId, password, userType);
        if (isAuthenticated) {
                navigate(`/${userType}/${userId}`);
        } else {
            setLoginStatus('Invalid user ID or password.');
        }
    };

    return (
        <div className='login_page'>
            <Header />
            <div className='header_bg'></div>
            <Link to='/'>
                <button className='back'>
                    <div className='back_text'>
                        <img src={back} alt='back' />
                        <p>Back</p>
                    </div>
                </button>
            </Link>
            <div className='login_box'>
                <h1>Login</h1>
                <div className='user_type'>
                    <h2 onClick={() => setUserType('customer')} 
                        style={{ color: userType === 'customer' ? "#008286" : "#A4A4A4"}}
                    >Individual</h2>
                    <div className='user_divide'>l</div>
                    <h2 onClick={() => setUserType('agent')} 
                        style={{ color: userType === 'agent' ? "#008286" : "#A4A4A4"}}
                    >Partner</h2>
                </div>
                <div className='login_detail'>
                    <label className="input_container">
                        <span className="icon">
                            <img src={usericon} alt="User Icon" />
                        </span>
                        <input 
                            type="text"
                            value={userId}
                            placeholder='Username'
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </label>
                    <label className="input_container">
                        <span className="icon">
                            <img src={passwordicon} alt="Password Icon" />
                        </span>
                        <input 
                            type="password"
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <div className='login_page_button'>
                    <button onClick={handleLogin}>SIGN IN</button>
                </div>
                {loginStatus && <p>{loginStatus}</p>}
                <h3>Forgot password?</h3>
                <h3>Don't have an account yet?<Link to="/signup"><span>Sign up</span></Link></h3>
            </div>
        </div>
    );
};

export default Login;