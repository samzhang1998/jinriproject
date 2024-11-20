import React, { useState } from 'react';
import './Yourdetails.css';

const YourDetailsForm = ({ formPurchase, onUpdate}) => {
    const [addSecond,setAddSecond] = useState(false)
    const handleUpdate = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            onUpdate(name, checked);
        } else {
            onUpdate(name, value);
        }
    };

    const handleClick = () => {
        const choose = !addSecond
        setAddSecond(choose);
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
                <input 
                    type="email"
                    name="confirmEmail"
                    placeholder="Confirm Email*"
                    required
                />
                <input 
                    type="text"
                    name="mobile"
                    value={formPurchase.mobile}
                    onChange={handleUpdate}
                    placeholder="Contact Number*"
                    required
                />
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
                <input 
                    type="text"
                    name="agentMobile"
                    value={formPurchase.agentMobile}
                    onChange={handleUpdate}
                    placeholder="Agent Contact Number*"
                    required
                />                
            </div>
        </div>
    );
};

export default YourDetailsForm;

 
