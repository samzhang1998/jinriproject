import React, { useEffect, useState } from 'react';
import './Yourdetails.css';

const YourDetailsForm = ({ formPurchase, onUpdate, validateCustomerField, errors, setConfirmEmail }) => {
    const [addSecond,setAddSecond] = useState(false);
    const role = localStorage.getItem('role');
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

    const [status, setStatus] = useState({});

    const handleUpdate = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        const relatedValue = name === 'confirmEmail' ? formPurchase.email : null;

        const error = validateCustomerField(name, fieldValue, relatedValue);
        if (name === 'confirmEmail') {
            setStatus((prev) => ({ ...prev, [name]: error }));
            setConfirmEmail(value);
            return;
        }

        setStatus((prev) => ({ ...prev, [name]: error }));
        
        onUpdate(name, fieldValue);
    };
    
    useEffect(() => {
        setStatus((prev) => ({ ...prev, ...errors }));
    }, [errors])
    console.log(status)
    return (
        <div>
            {(role === 'Customer' || role == null) && <div className='your_details'>
                <h1>Your Details</h1>
                <hr style={{
                    background: '#DDD', 
                    width: '100%', 
                    marginTop: '5%', 
                    marginBottom: '5%',
                    border: 'none',
                    height: '1px'
                    }} 
                />
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
                    {errors.firstName && <p style={{ color: 'red' }}>*</p>}
                    <input 
                        type="text"
                        name="lastName"
                        value={formPurchase.lastName}
                        onChange={handleUpdate}
                        placeholder="Last Name*"
                        required
                    />
                    {errors.lastName && <p style={{ color: 'red' }}>*</p>}
                </div>
                <input
                    type="email"
                    name="email"
                    value={formPurchase.email}
                    onChange={handleUpdate}
                    placeholder="Email*"
                    required
                />
                {status.email && <p style={{ color: 'red' }}>{status.email}</p>}
                <input 
                    type="email"
                    name="confirmEmail"
                    placeholder="Confirm Email*"
                    onChange={handleUpdate}
                    required
                />
                {status.confirmEmail && (
                    <p style={{ color: 'red' }}>{status.confirmEmail}</p>
                )}
                <input 
                    type="text"
                    name="mobile"
                    value={formPurchase.mobile}
                    onChange={handleUpdate}
                    placeholder="Contact Number*"
                    required
                />
                {status.mobile && <p style={{ color: 'red' }}>{status.mobile}</p>}
                <input 
                    type="text"
                    name="homeAddress"
                    value={formPurchase.homeAddress}
                    onChange={handleUpdate}
                    placeholder="Home Address*"
                    required
                />
                {errors.homeAddress && <p style={{ color: 'red' }}>*</p>}
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
            </div>}
            <div className='agent_details'>
                <h1>Selling Agent Details</h1>
                <hr style={{
                    background: '#DDD', 
                    width: '100%', 
                    marginTop: '5%', 
                    marginBottom: '5%',
                    border: 'none',
                    height: '1px'
                    }} 
                />
                <p>*This information is required to organise access to the property.</p>
                <div className='agent_name'>
                    <input 
                        type="text"
                        name="agentFirstName"
                        value={formPurchase.agentFirstName}
                        onChange={handleUpdate}
                        placeholder="Agent First Name*"
                    />
                    {errors.agentFirstName && <p style={{ color: 'red' }}>*</p>}
                    <input 
                        type="text"
                        name="agentLastName"
                        value={formPurchase.agentLastName}
                        onChange={handleUpdate}
                        placeholder="Agent Last Name*"
                    />
                    {errors.agentLastName && <p style={{ color: 'red' }}>*</p>}
                </div>
                <input 
                    type="email"
                    name="agentEmail"
                    value={formPurchase.agentEmail}
                    onChange={handleUpdate}
                    placeholder="Agent Email*"
                    required
                />
                {status.agentEmail && <p style={{ color: 'red' }}>{status.agentEmail}</p>}
                <input 
                    type="text"
                    name="agentMobile"
                    value={formPurchase.agentMobile}
                    onChange={handleUpdate}
                    placeholder="Agent Contact Number*"
                    required
                />
                {status.agentMobile && <p style={{ color: 'red' }}>{status.agentMobile}</p>}                
            </div>
        </div>
    );
};

export default YourDetailsForm;

 
