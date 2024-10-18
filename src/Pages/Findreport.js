import React from "react";
import "./Findreport.css"
import { Link } from "react-router-dom";

const Findreport = () => {
    return (
        <div className="find_report">
            <div className="text4">
                <h2>Find your report <br /> with us</h2>
                <p>We provide a complete service for the <br /> sale,
                purchase or rental of real estate.</p>            
                <div className="contact_button">
                    <button><Link to="/contact">CONTACT US</Link></button>
                </div>
            </div>
            <div className="building2">
                <img src="vecteezy_ai-generated-modern-cozy-house-with-pool-and-parking-for_35706666.png" alt="building2"></img>
            </div>
        </div>
    );
};

export default Findreport;