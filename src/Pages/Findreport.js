import React from "react";
import "./Findreport.css"
import { Link } from "react-router-dom";
import building2 from '../asset/pngwing.com.png';

const Findreport = () => {
    return (
        <div className="find_report">
            <div className="text4">
                <h2>Find your report <br /> with us</h2>
                <p>We provide a complete service for the sale,
                purchase or rental of real estate.</p>            
                <div className="contact_button">
                    <button><Link to="/contact">CONTACT US</Link></button>
                </div>
            </div>
            <div className="building2">
                <img src={building2} alt="building2" />
            </div>
        </div>
    );
};

export default Findreport;