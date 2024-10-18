import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="header">
            <Link to="/" className='logo_link'>
                <div className="logo">CHECK FOR SURE</div>
            </Link>
            <nav>
                <div className="burger-menu" onClick={toggleMenu}>
                    &#9776;
                </div>
                <ul className={`menu ${isOpen ? 'show' : ''}`}>
                    <li><Link to="/buyers">For Buyers</Link></li>
                    <li><Link to="/sellers">For Sellers</Link></li>
                    <li><Link to="/inspectors">For Inspectors</Link></li>
                    <li><Link to="/agents">For Sales Agents</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <div className='mobile_login'><Link to="/agentportal">Login</Link></div>
                </ul>
            </nav>
            <div className="login">
                <button>
                    <Link to="/agentportal">
                        <div className='login_text'>
                            <img src='/User_fill.png' alt='user' />
                            LOGIN
                        </div>
                    </Link>
                </button>
            </div>
        </header>
    );
};

export default Header;
