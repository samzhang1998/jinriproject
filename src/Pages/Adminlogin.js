import React, { useState } from 'react';
import { authenticateUser } from '../API';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";
import Header from '../Header';
import back from '../asset/Expand_left.png';
import usericon from '../asset/usericon.png';
import passwordicon from '../asset/passwordicon.png';

const Adminlogin = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const userType = 'admin';
    const [loginStatus, setLoginStatus] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const isAuthenticated = authenticateUser(userId, password, userType);
        if (isAuthenticated) {
                navigate(`/admin/${userId}`);
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
                <h1>Admin Login</h1>
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
            </div>
        </div>
    );
};

export default Adminlogin;