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
                <p>We provide more than just a basic inspection—our thorough, accurate 
                    reports give clients the insights they need to make confident decisions. 
                    Our experienced team ensures every aspect of the property is carefully 
                    assessed, with results you can trust.</p>
                <p>Our commitment to service excellence means fast report turnaround, accessible 
                    digital storage, and easy-to-understand findings presented with clarity. 
                    Trusted by both buyers and real estate professionals, we strive to make the 
                    inspection process transparent and hassle-free. Choose us for a reliable inspection 
                    partner dedicated to quality, transparency, and your peace of mind.</p>
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