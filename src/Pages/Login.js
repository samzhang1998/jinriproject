import React, { useState } from 'react';
import { authenticateUser } from '../API';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";
import HomeHeader from '../HomeHeader';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
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

    if (!userType) {
        return (
          <div className='usertype'>
            <HomeHeader />
            <div className='usertype_box'>
                <h1>Login</h1>
                <div className='usertype_select'>
                    <button onClick={() => setUserType('customer')}>Login as Customer</button>
                    <button onClick={() => setUserType('agent')}>Login as Agent</button>
                    <button><Link to="/contact">Sign In</Link></button>
                </div>
            </div>
          </div>
        );
    }

    return (
        <div className='login_page'>
            <HomeHeader />
            <div className='login_box'>
                <h1>Login as {userType === 'customer' ? 'Customer' : 'Agent'}</h1>
                <div className='login_detail'>
                    <label>
                        User ID:
                        <input 
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </label>
                    <label>
                        Password:
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <div className='login_page_button'>
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={() => setUserType('')}>Back</button>
                </div>
                {loginStatus && <p>{loginStatus}</p>}
            </div>
        </div>
    );
};

export default Login;