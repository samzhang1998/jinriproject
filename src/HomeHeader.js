import React, { useState } from 'react';
import './HomeHeader.css';
import { Link } from 'react-router-dom';
import logo from './asset/Group 8693 1.png';
import userfill from './asset/User_fill.png';

const HomeHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="home_header">
            <Link to="/" className='logo_link1'>
                <div className="logo1"><img src={logo} alt='logo' /></div>
            </Link>
            <nav>
                <div className="burger-menu1" onClick={toggleMenu}>
                    &#9776;
                </div>
                <ul className={`menu1 ${isOpen ? 'show' : ''}`}>
                    <li><Link to="/buyers">For Buyers</Link></li>
                    <li><Link to="/sellers">For Sellers</Link></li>
                    <li><Link to="/inspectors">For Inspectors</Link></li>
                    <li><Link to="/agents">For Sales Agents</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>
            </nav>
            <div className="login1">
                <button>
                    <Link to="/login">
                        <div className='login_text1'>
                            <img src={userfill} alt='user' />
                            LOGIN
                        </div>
                    </Link>
                </button>
            </div>
        </header>
    );
};

export default HomeHeader;
