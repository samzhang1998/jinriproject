import React from "react";
import { Link } from "react-router-dom";
import "./ThankYou.css";
import Header from "../Header";
import back from "../asset/Expand_left.png";

const ThankYou = () => {
    return (
        <div className="thank_you">
            <Header />
            <div className='header_bg'></div>
            <Link to='/'>
                <button className='back'>
                    <div className='back_text'>
                        <img src={back} alt='back' />
                        <p>Back</p>
                    </div>
                </button>
            </Link>
            <div className="thank_you_text">
                <h1>Thank You!</h1>
                <p>A Confirmation has been send to your email! 
                    You can check via your email or our customer portal.</p>
                <Link to='/' style={{textDecoration: 'none'}}><button className="back_to_home">Back</button></Link>
            </div>
        </div>
    );
};

export default ThankYou;