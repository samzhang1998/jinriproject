import React from "react";
import { useNavigate } from "react-router-dom";
import image2 from "../asset/pexels-rdne-8293746.png";
import image1 from "../asset/pexels-rdne-8293635.png";
import group from "../asset/Group 8722.png";
import "./Introduction.css";

const Introduction = () => {
    const navigate = useNavigate();

    return (
        <div className="intro">
            <div className="intro_text">
                <h1>Why Choose Us</h1>
                <h2>for Your Inspection</h2>
                <p>At Check for Sure, we specialize in delivering the most accurate and detailed 
                    inspection reports in the industry.</p>
                <p>With Check for Sure, you can make informed decisions with confidence, knowing 
                    that our reports provide a complete and transparent picture. Whether you're 
                    a homeowner, buyer, or industry professional, trust us to set the standard for 
                    excellence in inspections.</p>
                <p>When it comes to inspections, don't just check -- Check for Sure!</p>
                <button 
                    className="intro_contact"
                    onClick={() => navigate('/contact')}
                >Contact us</button>
            </div>
            <div className="intro_img1">
                <img src={image1} alt="intro" style={{width: '90%', zIndex: '2'}}/>
                <div className="intro_img2">
                    <img src={group} 
                        alt="group" 
                        style={{
                            width: '20%', 
                            height: '20%',
                            marginBottom: '5%',
                            zIndex: '1'
                        }}
                    />
                    <img src={image2} alt="intro1" style={{width: '50%', zIndex: '2'}}/>                    
                </div>
            </div>
        </div>
    );
};

export default Introduction;