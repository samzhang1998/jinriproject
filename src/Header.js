import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import userfill from './asset/User_fill.png';
import logo1 from './asset/logo.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    return (
        <header className="header">
            <img src={logo1} alt='logo' onClick={() => navigate('/')}/>
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
                {!isLoggedIn ? (
                    <button>
                        <Link to="/login">
                            <div className='login_text'>
                                <img src={userfill} alt='user' />
                                LOGIN
                            </div>
                        </Link>
                    </button>
                ) : (
                    <button>
                        <Link to={{ pathname: `/${role}/${username}`}}>
                            <div className='login_text'>
                                <img src={userfill} alt='user' />
                                {username}
                            </div>
                        </Link>
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
