import React, { useState }from "react";
import "./UserSettings.css";
import FetchFunc from "../API";
import close from "../asset/Close_round.png";

const EmailModal = ({ closeModal }) => {
    const [email, setEmail] = useState('');
    const [status,setStatus] = useState('');
    const handleChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (value === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setStatus('');
        } else {
            setStatus('Invalid email format!');
        }       
    };
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('userId');
    
    const userData = {
        email: email,
        userId: id,
        firstName: '',
        lastName: '',
        mobile: null,
        company: '',
        oldPassword: '',
        newPassword: '',
        username: ''
    }
    const handleCustomerSave = async () => {
        try {            
            console.log('Data to be posted:', userData);
            const response = await FetchFunc(
                '/customer-profile/editEmail',
                'POST',
                JSON.stringify(userData)
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            localStorage.setItem('email', email);
            closeModal();
        } catch (error) {
            console.error('Failed to update email:', error);
        }
    };
    const handlePartnerSave = async () => {
        try {
            console.log('Data to be posted:', userData);
            const response = await FetchFunc(
                '/partner-profile/editEmail',
                'POST',
                JSON.stringify(userData)
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            localStorage.setItem('email', email);
            closeModal();
        } catch (error) {
            console.error('Failed to update email:', error);
        }
    };

    return (
        <div className="change_modal">
            <div className="change_modal_content">
                <div onClick={closeModal} className="close_modal">
                    <img src={close} alt="close" />
                </div>
                <h2>Change Your Email</h2>
                <input
                    type="email"
                    placeholder="Enter new email"
                    value={email}
                    onChange={handleChange}
                />
                {status && <p style={{color: 'red'}}>{status}</p>}
                {role === 'Partner' && <button
                    onClick={handlePartnerSave}
                    className="save_change"
                >Save</button>}
                {role === 'Customer' && <button
                    onClick={handleCustomerSave}
                    className="save_change"
                >Save</button>}
            </div>
        </div>
    );
};

const MobileModal = ({ closeModal, setBottomMobile }) => {
    const [mobile, setMobile] = useState();
    const [status,setStatus] = useState('');
    const handleChange = (e) => {
        const value = e.target.value;
        setMobile(value);
        if (value === '' || /^\d{0,15}$/.test(value)) {
            setStatus('');
        } else {
            setStatus('Invalid mobile number!');
        }        
    };
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('userId');
    const userData = {
        email: '',
        userId: id,
        firstName: '',
        lastName: '',
        mobile: mobile,
        company: '',
        oldPassword: '',
        newPassword: '',
        username: ''
    }
    const handleCustomerSave = async () => {
        try {
            console.log('Data to be posted:', userData);
            const response = await FetchFunc(
                '/customer-profile/editMobile',
                'POST',
                JSON.stringify(userData)
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            localStorage.setItem('mobile', mobile);
            closeModal();
        } catch (error) {
            console.error('Failed to update mobile:', error);
        } 
    };
    const handlePartnerSave = async () => {
        try {
            console.log('Data to be posted:', userData);
            const response = await FetchFunc(
                '/partner-profile/editMobile',
                'POST',
                JSON.stringify(userData)
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            localStorage.setItem('mobile', mobile);
            closeModal();
        } catch (error) {
            console.error('Failed to update mobile:', error);
        } 
    };

    return (
        <div className="change_modal">
            <div className="change_modal_content">
                <div onClick={closeModal} className="close_modal">
                    <img src={close} alt="close" />
                </div>
                <h2>Change Your Mobile</h2>
                <input
                    type="mobile"
                    placeholder="Enter new mobile"
                    value={mobile}
                    onChange={handleChange}
                />
                {status && <p style={{color: 'red'}}>{status}</p>}
                {role === 'Partner' && <button
                    onClick={handlePartnerSave}
                    className="save_change"
                >Save</button>}
                {role === 'Customer' && <button
                    onClick={handleCustomerSave}
                    className="save_change"
                >Save</button>}
            </div>
        </div>
    );
};

const PasswordModal = ({ closeModal }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('userId');
    const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const [status,setStatus] = useState('');
    const userData = {
        email: '',
        userId: id,
        firstName: '',
        lastName: '',
        mobile: null,
        company: '',
        oldPassword: oldPassword,
        newPassword: newPassword,
        username: ''
    }
    const handleCustomerSave = async () => {
        try {
            console.log('Data to be posted:', userData);
            const response = await FetchFunc(
                '/customer-profile/editPassword',
                'POST',
                JSON.stringify(userData)
            );
            if (response.status === 401) {
                setStatus('Old password is wrong!')
            } else if (!response.ok) {
                console.log(response.text());
            } else {
                console.log('Response from server:', response);
                closeModal();
            }            
        } catch (error) {
            console.error('Failed to update password:', error);
            setErrorMessage('Failed to update password');
        }
    };
    const handlePartnerSave = async () => {
        try {
            console.log('Data to be posted:', userData);
            const response = await FetchFunc(
                '/customer-profile/editPassword',
                'POST',
                JSON.stringify(userData)
            );
            if (response.status === 401) {
                setStatus('Old password is wrong!')
            } else if (!response.ok) {
                console.log(response.text());
            } else {
                console.log('Response from server:', response);
                closeModal();
            }
        } catch (error) {
            console.error('Failed to update password:', error);
            setErrorMessage('Failed to update password');
        }
    };

    return (
        <div className="change_modal">
            <div className="change_password_content">
                <div className="close_modal">
                    <img src={close} alt="close" onClick={closeModal}/>
                </div>
                <h2>Change Your Password</h2>
                <input
                    type="password"
                    placeholder="Enter old password"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                />
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                />
                {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
                {role === 'Partner' && <button
                    onClick={handlePartnerSave}
                    className="save_change"
                >Save</button>}
                {role === 'Customer' && <button
                    onClick={handleCustomerSave}
                    className="save_change"
                >Save</button>}
                {status && <p style={{color: 'red'}}>{status}</p>}
            </div>
        </div>
    );
};

const UserSettings = () => {
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showMobileModal, setShowMobileModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const useremail = localStorage.getItem('email');
    const usermobile = localStorage.getItem('mobile');
    console.log(useremail)
    console.log(usermobile)

    return (
        <div className="change_settings">
            <h1>Account Settings</h1>
            <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
            <div className="change">
                <div>
                    <h1>Email Address</h1>
                    <p>Your email address is {useremail}</p>
                </div>
                <button 
                    className="change1"
                    onClick={() => setShowEmailModal(true)}
                >Change</button>
                {showEmailModal && (
                    <EmailModal
                        closeModal={() => setShowEmailModal(false)}
                    />
                )}
            </div>
            <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
            <div className="change">
                <div>
                    <h1>Mobile Number</h1>
                    <p>Your mobile number is {usermobile}</p>
                </div>
                <button 
                    className="change1"
                    onClick={() => setShowMobileModal(true)}
                >Change</button>
                {showMobileModal && (
                    <MobileModal
                        closeModal={() => setShowMobileModal(false)}
                    />
                )}
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
                    onClick={() => setShowPasswordModal(true)}
                >Change</button>
                {showPasswordModal && (
                    <PasswordModal
                        closeModal={() => setShowPasswordModal(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default UserSettings;