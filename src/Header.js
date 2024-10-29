import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import userfill from './asset/User_fill.png';

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
                    <li><Link to="/individual">For Individual</Link></li>
                    <li><Link to="/partner">For Partner</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <div className='mobile_login'><Link to="/login">Login</Link></div>
                </ul>
            </nav>
            <div className="login">
                <button>
                    <Link to="/login">
                        <div className='login_text'>
                            <img src={userfill} alt='user' />
                            LOGIN
                        </div>
                    </Link>
                </button>
            </div>
        </header>
    );
};

export default Header;