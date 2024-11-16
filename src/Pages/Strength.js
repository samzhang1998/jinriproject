import React from "react";
import group1 from "../asset/Mask group.png";
import group2 from "../asset/Mask group2.png";
import group3 from "../asset/Mask group3.png";
import group4 from "../asset/Mask group4.png";
import "./Strength.css";

const Strength = () => {
    return (
        <div className="strength">
            <div className="advantage">
                <img src={group1} alt="group1" />
                <h1>Detailed<br />Property Check</h1>
                <p>We inspect all essential areas, like structure, plumbing, and roofing.</p>
            </div>
            <div className="advantage">
                <img src={group2} alt="group2" />
                <h1>Clear, Visual<br />Reports</h1>
                <p>Our reports use simple language, photos, and graded sections.</p>
            </div>
            <div className="advantage">
                <img src={group3} alt="group3" />
                <h1>Fast<br />Delivery</h1>
                <p>Reports are delivered within 24-48 hours 
                    post-inspection, allowing for quick decisions.</p>
            </div>
            <div className="advantage">
                <img src={group4} alt="group4" />
                <h1>Easy<br />Digital Access</h1>
                <p>Access reports online with secure storage for future reference.</p>
            </div>
        </div>
    );
};

export default Strength;