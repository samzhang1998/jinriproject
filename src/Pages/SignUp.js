import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import FetchFunc from '../API';
import "./SignUp.css";
import SignUpIcon from '../asset/signupicon.png';
import Header from '../Header';
import back from '../asset/Expand_left.png';

const SignUp = () => {
    const [userType, setUserType] = useState('customer')
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        company: '',
        password: '',
        role: 'customer'
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
        };
        try {
            const response = await FetchFunc(
                '/signup/',
                'POST',
                JSON.stringify(dataToSend)
            );
            if (!response.ok) {
                console.log(response.text());
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            navigate('/login');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    return (
        <div className='sign_page'>
            <Header />
            <div className='header_bg'></div>
            <Link to='/login'>
                <button className='back'>
                    <div className='back_text'>
                        <img src={back} alt='back' />
                        <p>Back</p>
                    </div>
                </button>
            </Link>
            <div className='sign_up_step'>
                <h1>Create Account</h1>
                <div className='sign_up_selection'>
                    <h2
                        onClick={() => handleUserTypeChange('customer')}
                        style={{ color: userType === 'customer' ? "#008286" : "#A4A4A4" }}
                    >Individual</h2>
                    <div className='user_divide'>l</div>
                    <h2
                        onClick={() => handleUserTypeChange('partner')}
                        style={{ color: userType === 'partner' ? "#008286" : "#A4A4A4" }}
                    >Partner</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='name_sign_up'>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    {userType === 'partner' && (
                        <input
                            type="text"
                            name="company"
                            placeholder="Company Name"
                            value={formData.company}
                            onChange={handleInputChange}
                            required
                        />
                    )}
                    <div className='password_create'>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            required
                        />
                    </div>
                    <button type="submit" className='sign_up_button'>
                        <img src={SignUpIcon} alt='sign up' />
                        <p>SIGN UP</p>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;