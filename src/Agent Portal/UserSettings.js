import React, { useState }from "react";
import "./UserSettings.css";
import FetchFunc from "../API";
import close from "../asset/Close_round.png";

const EmailModal = ({ closeModal, setBottomEmail }) => {
    const [email, setEmail] = useState('');
    const handleChange = (e) => {
        setEmail(e.target.value);
    };
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('userId');
    const handleCustomerSave = async () => {
        try {
            const body = {
                email: email,
                id: id,
            }
            const response = await FetchFunc(
                '/customer-profile/editEmail',
                'POST',
                JSON.stringify(body)
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            setBottomEmail(email);
            closeModal();
        } catch (error) {
            console.error('Failed to update email:', error);
        }
    };
    const handlePartnerSave = async () => {
        try {
            const body = {
                email: email,
                id: id,
            }
            console.log('Data to be posted:', body);
            const response = await FetchFunc(
                '/partner-profile/editEmail',
                'POST',
                JSON.stringify(body)
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            setBottomEmail(email);
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
    const [mobile, setMobile] = useState('');
    const handleChange = (e) => {
        setMobile(e.target.value);
    };
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('userId');
    const handleCustomerSave = async () => {
        try {
            const body = {
                mobile: mobile,
                id: id,
            }
            const response = await FetchFunc(
                '/partner-profile/editMobile',
                'POST',
                JSON.stringify(body)
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            setBottomMobile(mobile);
            closeModal();
        } catch (error) {
            console.error('Failed to update mobile:', error);
        } 
    };
    const handlePartnerSave = async () => {
        try {
            const body = {
                mobile: mobile,
                id: id,
            }
            console.log('Data to be posted:', body);
            const response = await FetchFunc(
                '/partner-profile/editMobile',
                'POST',
                JSON.stringify(body)
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            setBottomMobile(mobile);
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
    const handleCustomerSave = async () => {
        try {
            const body = {
                id: id,
                oldPassword: oldPassword,
                newPassword: newPassword,
            }
            console.log('Data to be posted:', body);
            const response = await FetchFunc(
                '/customer-profile/editPassword',
                'POST',
                JSON.stringify(body)
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            closeModal();
        } catch (error) {
            console.error('Failed to update password:', error);
            setErrorMessage('Failed to update password');
        }
    };
    const handlePartnerSave = async () => {
        try {
            const body = {
                oldPassword: oldPassword,
                newPassword: newPassword,
            }
            console.log('Data to be posted:', body);
            const response = await FetchFunc(
                '/customer-profile/editPassword',
                'POST',
                JSON.stringify(body)
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            closeModal();
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
            </div>
        </div>
    );
};

const UserSettings = () => {
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [bottomEmail, setBottomEmail] = useState('');
    const [showMobileModal, setShowMobileModal] = useState(false);
    const [bottomMobile, setBottomMobile] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    return (
        <div className="change_settings">
            <h1>Account Settings</h1>
            <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
            <div className="change">
                <div>
                    <h1>Email Address</h1>
                    <p>Your email address is {bottomEmail}</p>
                </div>
                <button 
                    className="change1"
                    onClick={() => setShowEmailModal(true)}
                >Change</button>
                {showEmailModal && (
                    <EmailModal
                        closeModal={() => setShowEmailModal(false)}
                        setBottomEmail={setBottomEmail}
                    />
                )}
            </div>
            <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
            <div className="change">
                <div>
                    <h1>Mobile Number</h1>
                    <p>Your mobile number is {bottomMobile}</p>
                </div>
                <button 
                    className="change1"
                    onClick={() => setShowMobileModal(true)}
                >Change</button>
                {showMobileModal && (
                    <MobileModal
                        closeModal={() => setShowMobileModal(false)}
                        setBottomEmail={setBottomMobile}
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