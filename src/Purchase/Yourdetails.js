import React, { useState } from 'react';
import './Yourdetails.css';

const YourDetailsForm = ({ formPurchase, onUpdate}) => {
    const [addSecond,setAddSecond] = useState(false);
    // const handleUpdate = (e) => {
    //     const { name, value, type, checked } = e.target;
    //     if (type === 'checkbox') {
    //         onUpdate(name, checked);
    //     } else {
    //         onUpdate(name, value);
    //     }
    // };

    const handleClick = () => {
        const choose = !addSecond
        setAddSecond(choose);
    };

    const [errors, setErrors] = useState({});
    const validateField = (name, value, relatedValue) => {
        let error = '';

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = 'Invalid email format';
            }
        } else if (name === 'mobile') {
            const mobileRegex = /^\d{10,15}$/;
            if (!mobileRegex.test(value)) {
                error = 'Invalid mobile number';
            }
        } else if (name === 'confirmEmail') {
            if (value !== relatedValue) {
                error = 'Emails do not match';
            }
        } else if (name === 'agentEmail') {
            const agentEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!agentEmailRegex.test(value)) {
                error = 'Invalid email format';
            }
        } else if (name === 'agentMobile') {
            const agentMobileRegex = /^\d{10,15}$/;
            if (!agentMobileRegex.test(value)) {
                error = 'Invalid mobile number';
            }
        }

        return error;
    };

    const handleUpdate = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        const relatedValue = name === 'confirmEmail' ? formPurchase.email : null;

        const error = validateField(name, fieldValue, relatedValue);
        if (name === 'confirmEmail') {
            setErrors((prev) => ({ ...prev, [name]: error }));
            return;
        }

        setErrors((prev) => ({ ...prev, [name]: error }));
        
        onUpdate(name, fieldValue);
    };

    return (
        <div>
            <div className='your_details'>
                <h1>Your Details</h1>
                <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
                <p>*Please ensure the name provided matches the name of the person 
                    interested in purchasing the property. This name will be 
                    used on the report to be relied upon if the buyer is successful in 
                    purchasing the property. The team are unable to change the name at a later date.</p>
                <div className='user_name'>
                    <input 
                        type="text"
                        name="firstName"
                        value={formPurchase.firstName}
                        onChange={handleUpdate}
                        placeholder="First Name*"
                        required
                    />
                    <input 
                        type="text"
                        name="lastName"
                        value={formPurchase.lastName}
                        onChange={handleUpdate}
                        placeholder="Last Name*"
                        required
                    />
                </div>
                <input
                    type="email"
                    name="email"
                    value={formPurchase.email}
                    onChange={handleUpdate}
                    placeholder="Email*"
                    required
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                <input 
                    type="email"
                    name="confirmEmail"
                    placeholder="Confirm Email*"
                    onChange={handleUpdate}
                    required
                />
                {errors.confirmEmail && (
                    <p style={{ color: 'red' }}>{errors.confirmEmail}</p>
                )}
                <input 
                    type="text"
                    name="mobile"
                    value={formPurchase.mobile}
                    onChange={handleUpdate}
                    placeholder="Contact Number*"
                    required
                />
                {errors.mobile && <p style={{ color: 'red' }}>{errors.mobile}</p>}
                <input 
                    type="text"
                    name="homeAddress"
                    value={formPurchase.homeAddress}
                    onChange={handleUpdate}
                    placeholder="Home Address*"
                    required
                />
                <label>
                    <input 
                        type="checkbox"
                        name="addSecondPerson"
                        checked={addSecond}
                        onChange={handleClick}
                        style={{ width: '1.2rem' }}
                    />
                    Add a second person or a company name to the report if you are the successful buyer
                </label>
                {addSecond === true && (
                    <div className='second_user_name'>
                        <input 
                            type="text"
                            name="secondFirstName"
                            value={formPurchase.secondFirstName}
                            onChange={handleUpdate}
                            placeholder="First Name or Company Name*"
                        />
                        <input 
                            type="text"
                            name="secondLastName"
                            value={formPurchase.secondLastName}
                            onChange={handleUpdate}
                            placeholder="Last Name*"
                        />
                    </div>
                )}
                <label>
                    <input 
                        type="checkbox"
                        name="firstTimeBuyer"
                        checked={formPurchase.firstTimeBuyer}
                        onChange={handleUpdate}
                        style={{ width: '1.2rem' }}
                    />
                    First time buyer?
                </label>
            </div>
            <div className='agent_details'>
                <h1>Selling Agent Details</h1>
                <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
                <p>*This information is required to organise access to the property.</p>
                <div className='agent_name'>
                    <input 
                        type="text"
                        name="agentFirstName"
                        value={formPurchase.agentFirstName}
                        onChange={handleUpdate}
                        placeholder="Agent First Name*"
                    />
                    <input 
                        type="text"
                        name="agentLastName"
                        value={formPurchase.agentLastName}
                        onChange={handleUpdate}
                        placeholder="Agent Last Name*"
                    />
                </div>
                <input 
                    type="email"
                    name="agentEmail"
                    value={formPurchase.agentEmail}
                    onChange={handleUpdate}
                    placeholder="Agent Email*"
                    required
                />
                {errors.agentEmail && <p style={{ color: 'red' }}>{errors.agentEmail}</p>}
                <input 
                    type="text"
                    name="agentMobile"
                    value={formPurchase.agentMobile}
                    onChange={handleUpdate}
                    placeholder="Agent Contact Number*"
                    required
                />
                {errors.agentMobile && <p style={{ color: 'red' }}>{errors.agentMobile}</p>}                
            </div>
        </div>
    );
};

export default YourDetailsForm;

 
