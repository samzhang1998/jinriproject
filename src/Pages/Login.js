import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FetchFunc from '../API';
import "./Login.css";
import Header from '../Header';
import back from '../asset/Expand_left.png';
import usericon from '../asset/usericon.png';
import passwordicon from '../asset/passwordicon.png';

const Login = () => {
    const [userType, setUserType] = useState('Customer');
    const [loginStatus, setLoginStatus] = useState('');
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        username: '',
        password: '',
        role: 'Customer',
    });

    const handleUserTypeChange = (type) => {
        setUserType(type);
        setFormData((prevData) => ({
            ...prevData,
            role: type,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const location = useLocation();

    const handleBack = () => {
        if (location.state?.from === '/signup') {
            navigate('/');
        } else {
            navigate(-1);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
        };
        try {
            console.log('Data send:', dataToSend);
            const response = await FetchFunc(
                '/login/',
                'POST',
                JSON.stringify(dataToSend)
            );
            const responseData = await response.json();
            console.log('Response from server:', response);
            if (response.status === 200) {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('username', responseData.username);
                localStorage.setItem('role', responseData.role);
                localStorage.setItem('userId', responseData.userId);
                localStorage.setItem('email', responseData.email);
                localStorage.setItem('mobile', responseData.mobile);
                handleBack();
                setTimeout(() => {
                    localStorage.setItem('isLoggedIn', false);
                    localStorage.removeItem('username');
                    localStorage.removeItem('role');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('email');
                    localStorage.removeItem('mobile');
                    console.log('Logged out due to timeout');
                    navigate('/');
                }, 60 * 60 * 1000);
            } else if (response.status === 401) {
                setLoginStatus("Unauthorized - Invalid Password!")
            } else if (response.status === 404) {
                setLoginStatus("Not Found - User doesn't exist!")
            } else {
                console.log('Error:', response);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className='login_page'>
            <Header />
            <div className='header_bg'></div>
            <button className='back' onClick={() => navigate(-1)}>
                <div className='back_text'>
                    <img src={back} alt='back' />
                    <p>Back</p>
                </div>
            </button>
            <div className='login_box'>
                <h1>Login</h1>
                <div className='user_type'>
                    <h2 onClick={() => handleUserTypeChange('Customer')} 
                        style={{ color: userType === 'Customer' ? "#008286" : "#A4A4A4"}}
                    >Individual</h2>
                    <div className='user_divide'>l</div>
                    <h2 onClick={() => handleUserTypeChange('Partner')} 
                        style={{ color: userType === 'Partner' ? "#008286" : "#A4A4A4"}}
                    >Partner</h2>
                </div>
                <div className='login_detail'>
                    <label className="input_container">
                        <span className="icon">
                            <img src={usericon} alt="User Icon" />
                        </span>
                        <input 
                            type="text"
                            name="username"
                            value={formData.username}
                            placeholder='Username'
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label className="input_container">
                        <span className="icon">
                            <img src={passwordicon} alt="Password Icon" />
                        </span>
                        <input 
                            type="password"
                            name="password"
                            value={formData.password}
                            placeholder='Password'
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div className='login_page_button'>
                    <button onClick={handleLogin}>SIGN IN</button>
                </div>
                {loginStatus && <p style={{color: 'red'}}>{loginStatus}</p>}
                {/* <h3>Forgot password?</h3> */}
                <h3>Don't have an account yet?<Link to="/signup"><span className='sign_up_span'>Sign up</span></Link></h3>
            </div>
        </div>
    );
};

export default Login;