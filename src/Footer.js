import React, { useState } from "react";
import "./Footer.css";
import { Link, useNavigate } from 'react-router-dom';
import facebook from './asset/Facebook - Original.png';
import twitter from './asset/Twitter - Original.png';
import instagram from './asset/Group.png';
import linkedin from './asset/LinkedIn - Original.png';

const Footer = () => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const handleSearch = () => {
        navigate('/contact');
    };
    return (
        <footer className="footer">
            <div className="info">
                <div className="Logo_footer">CHECK FOR SURE</div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                     sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                     nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="socialmedia">
                    <a
                        href="https://www.facebook.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <img src={facebook} alt="facebook" />
                    </a>
                    <a
                        href="https://www.twitter.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <img src={twitter} alt="twitter" />
                    </a>
                    <a
                        href="https://www.instagram.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <img src={instagram} alt="instagram" />
                    </a>
                    <a
                        href="https://www.linkedin.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                    <img src={linkedin} alt="linkedin" />
                    </a>
                </div>
                <div className="rights">© 2024. All rights reserved.</div>
            </div>
            <div className="tour">
                <div className="take_a_tour">Take a tour</div>
                <nav className="menu_footer">
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/individual">For Individual</Link></li>
                        <li><Link to="/partner">For Partner</Link></li>
                        <li><Link to="/contact">Location</Link></li>
                        <li><Link to="/admin">Media</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="service">
                <div className="our_service">Our Service</div>
                <nav className="service_footer">
                    <ul>
                        <li><Link to="/search1">Building & Pest</Link></li>
                        <li><Link to="/search2">Inspection</Link></li>
                        <li><Link to="/search1">Strata Report</Link></li>
                        <li><Link to="/contact">Contact Review</Link></li>
                        <li><Link to="/contact">Pool Inspection</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="other">
                <div className="subscribe">Subscribe</div>
                <p>Subscribe to get latest property, <br /> blog news from us</p>
                <div className="contact_search">
                    <input 
                        type="text"
                        className="email_input"
                        placeholder="Email Address"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        ➔
                    </button>
                </div>
            </div>
            <div className="info1">
                <div className="Logo_footer">CHECH FOR SURE</div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                     sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                     nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="socialmedia">
                    <a
                        href="https://www.facebook.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <img src={facebook} alt="facebook" />
                    </a>
                    <a
                        href="https://www.twitter.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <img src={twitter} alt="twitter" />
                    </a>
                    <a
                        href="https://www.instagram.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <img src={instagram} alt="instagram" />
                    </a>
                    <a
                        href="https://www.linkedin.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                    <img src={linkedin} alt="linkedin" />
                    </a>
                </div>
                <div className="rights">© 2024. All rights reserved.</div>
            </div>
        </footer>
    );
};

export default Footer;