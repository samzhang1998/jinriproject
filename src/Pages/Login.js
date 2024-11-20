import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PostData } from '../API';
import "./Login.css";
import Header from '../Header';
import back from '../asset/Expand_left.png';
import usericon from '../asset/usericon.png';
import passwordicon from '../asset/passwordicon.png';

const Login = () => {
    const [userType, setUserType] = useState('Customer');
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

    const handleLogin = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
        };
        try {
            const response = await PostData('http://localhost:8080/login/', dataToSend);
            console.log('Response from server:', response);
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('username', response.username);
            localStorage.setItem('role', response.role);
            localStorage.setItem('userId', response.userId);
            navigate("/");
        } catch (error) {
            console.error('Error submitting form:', error);
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
                        />
                    </label>
                </div>
                <div className='login_page_button'>
                    <button onClick={handleLogin}>SIGN IN</button>
                </div>
                <h3>Forgot password?</h3>
                <h3>Don't have an account yet?<Link to="/signup"><span>Sign up</span></Link></h3>
            </div>
        </div>
    );
};

export default Login;