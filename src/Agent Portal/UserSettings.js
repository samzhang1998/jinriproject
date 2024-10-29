import React, { useState }from "react";
import "./UserSettings.css";
import { PostData,GetData } from "../API";
import close from "../asset/Close_round.png";

const EmailModal = ({ closeModal, setBottomEmail }) => {
    const [email, setEmail] = useState('');
    const handleChange = (e) => {
        setEmail(e.target.value);
    };
    const handleSave = async () => {
        try {
            await PostData('/update-email', { email });
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
                <button
                    onClick={handleSave}
                    className="save_change"
                >Save</button>
            </div>
        </div>
    );
};

const MobileModal = ({ closeModal, setBottomMobile }) => {
    const [mobile, setMobile] = useState('');
    const handleChange = (e) => {
        setMobile(e.target.value);
    };
    const handleSave = async () => {
        try {
            await PostData('/update-mobile', { mobile });
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
                <button
                    onClick={handleSave}
                    className="save_change"
                >Save</button>
            </div>
        </div>
    );
};

const PasswordModal = ({ closeModal }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const handleSave = async () => {
        try {
            const storedPassword = await GetData('/get-password');
            if (storedPassword !== oldPassword) {
                setErrorMessage('Old password is incorrect');
                return;
            }
            await PostData('/update-password', { newPassword });
            alert('Password updated successfully');
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
                <button
                    onClick={handleSave}
                    className="save_change"
                >Save</button>
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