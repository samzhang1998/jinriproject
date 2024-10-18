import React, { useState }from "react";
import "./UserSettings.css";

const ChangeEmail = ({ changeSettings }) => {
    return (
        <div><button onClick={changeSettings}>back</button></div>
    );
};

const ChangeContact = ({ changeSettings }) => {
    return (
        <div><button onClick={changeSettings}>back</button></div>
    );
};

const ChangePassword = ({ changeSettings }) => {
    return (
        <div><button onClick={changeSettings}>back</button></div>
    );
};

const ChangeSettings = ({ changeEmail, changeContact, changePassword }) => {
    return (
        <div className="change_settings">
            <h1>Account Settings</h1>
            <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
            <div className="change">
                <div>
                    <h1>Email Address</h1>
                    <p>Your email address is</p>
                </div>
                <button 
                    className="change1"
                    onClick={changeEmail}
                >Change</button>
            </div>
            <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
            <div className="change">
                <div>
                    <h1>Mobile Number</h1>
                    <p>Your mobile number is</p>
                </div>
                <button 
                    className="change1"
                    onClick={changeContact}
                >Change</button>
            </div>
            <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
            <div className="change">
                <div>
                    <h1>Password</h1>
                    <p>Remember not to store your password in email 
                        or <br /> cloud and don't share it with anyone</p>
                </div>
                <button 
                    className="change1"
                    onClick={changePassword}
                >Change</button>
            </div>
        </div>
    );
};

const UserSettings = () => {
    const [currentChange, setCurrentChange] = useState(1);
    const changeSettings = () => {
        setCurrentChange(1);
    };
    const changeEmail = () => {
        setCurrentChange(2);
    };
    const changeContact = () => {
        setCurrentChange(3);
    };
    const changePassword = () => {
        setCurrentChange(4);
    };

    return (
        <div>
            {currentChange === 1 && <ChangeSettings changeEmail={changeEmail} changeContact={changeContact} changePassword={changePassword}/>}
            {currentChange === 2 && <ChangeEmail changeSettings={changeSettings}/>}
            {currentChange === 3 && <ChangeContact changeSettings={changeSettings}/>}
            {currentChange === 4 && <ChangePassword changeSettings={changeSettings}/>}
        </div>
    );
};

export default UserSettings;