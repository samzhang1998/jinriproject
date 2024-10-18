import React, { useState, useEffect } from 'react';
import './Yourdetails.css';

const YourDetailsForm = () => {
    const [formData, setFormData] = useState ({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        contactNumber: '',
        homeAddress: '',
        secondPersonFirstName: '',
        secondPersonLastName: '',
        firstTimeBuyer: false,
        addSecondPerson: false,
        agentFirstName: '',
        agentLastName: '',
        agentEmail: '',
        agentContactNumber: '',
    });
    const [debouncedData, setDebouncedData] = useState(formData);
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox'? checked: value,
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedData(formData);
        }, 1000);

        return () => clearTimeout(timer);
    }, [formData]);

    useEffect(() => {
        const validateForm = () => {
            const errors = {};
            if (!formData.firstName) {
                errors.firstName = '*';
            }
            if (!formData.lastName) {
                errors.lastName = '*';
            }
            if (!formData.contactNumber) {
                errors.contactNumber = '*';
            }
            if (!formData.email) {
                errors.email = '*';
            }
            if (!formData.confirmEmail) {
                errors.confirmEmail = '*';
            }
            if (formData.email !== formData.confirmEmail) {
                errors.confirmEmail = '*';
            }
            return errors;
        };
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            const sendDataToBackend = async () => {
                try {
                    const res = fetch ("https://example.org/products.json", {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(debouncedData),
                    });
                    const result = await res.json();
                    console.log('Data sent successfully:', result);
                } catch (error) {
                    console.error('Error sending data:', error);
                }
            };
            if (debouncedData.firstName && debouncedData.lastName && debouncedData.email && debouncedData.confirmEmail && debouncedData.contactNumber) {
                sendDataToBackend();
            }
        } else {
            setFormErrors(errors);
        }
    }, [debouncedData, formData]);

    return (
        <div>
            <div className='your_details'>
                <form id='detailForm'>
                    <h1>Your Details</h1>
                    <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
                    <p>*Please ensure the name provided matches the name of the person 
                        interested in purchasing <br /> the property. This name will be 
                        used on the report to be relied upon if the buyer is successful <br /> in 
                        purchasing the property. The team are unable to change the name at a later date.</p>
                    <div className='user_name'>
                        <input 
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name*"
                            required
                        />
                        {formErrors.firstName && <p style={{ color: 'red' }}>{formErrors.firstName}</p>}
                        <input 
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name*"
                            required
                        />
                        {formErrors.lastName && <p style={{ color: 'red' }}>{formErrors.lastName}</p>}
                    </div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email*"
                        required
                    />
                    {/* {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>} */}
                    <input 
                        type="email"
                        name="confirmEmail"
                        value={formData.confirmEmail}
                        onChange={handleInputChange}
                        placeholder="Confirm Email*"
                        required
                    />
                    {/* {formErrors.confirmEmail && <p style={{ color: 'red' }}>{formErrors.confirmEmail}</p>} */}
                    {formErrors.confirmEmailMatch && <p style={{ color: 'red' }}>{formErrors.confirmEmailMatch}</p>}
                    <input 
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        placeholder="Contact Number*"
                        required
                    />
                    {/* {formErrors.contactNumber && <p style={{ color: 'red' }}>{formErrors.contactNumber}</p>} */}
                    <input 
                        type="text"
                        name="homeAddress"
                        value={formData.homeAddress}
                        onChange={handleInputChange}
                        placeholder="Home Address*"
                        required
                    />
                    <label>
                        <input 
                            type="checkbox"
                            name="addSecondPerson"
                            checked={formData.addSecondPerson}
                            onChange={handleInputChange}
                            style={{ width: '1.2rem' }}
                        />
                        Add a second person or a company name to the report if you are the successful buyer
                    </label>
                    {formData.addSecondPerson && (
                        <div className='second_user_name'>
                            <input 
                                type="text"
                                name="secondPersonFirstName"
                                value={formData.secondPersonFirstName}
                                onChange={handleInputChange}
                                placeholder="First Name or Company Name*"
                            />
                            <input 
                                type="text"
                                name="secondPersonLastName"
                                value={formData.secondPersonLastName}
                                onChange={handleInputChange}
                                placeholder="Last Name*"
                            />
                        </div>
                    )}
                    <label>
                        <input 
                            type="checkbox"
                            name="firstTimeBuyer"
                            checked={formData.firstTimeBuyer}
                            onChange={handleInputChange}
                            style={{ width: '1.2rem' }}
                        />
                        First time buyer?
                    </label>
                </form>
            </div>
            <div className='agent_details'>
                <form>
                    <h1>Selling Agent Details</h1>
                    <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
                    <p>*This information is required to organise access to the property.</p>
                    <div className='agent_name'>
                        <input 
                            type="text"
                            name="agentFirstName"
                            value={formData.agentFirstName}
                            onChange={handleInputChange}
                            placeholder="Agent First Name*"
                        />
                        <input 
                            type="text"
                            name="agentLastName"
                            value={formData.agentLastName}
                            onChange={handleInputChange}
                            placeholder="Agent Last Name*"
                        />
                    </div>
                    <input 
                        type="email"
                        name="agentEmail"
                        value={formData.agentEmail}
                        onChange={handleInputChange}
                        placeholder="Agent Email*"
                        required
                    />
                    <input 
                        type="text"
                        name="agentContactNumber"
                        value={formData.agentContactNumber}
                        onChange={handleInputChange}
                        placeholder="Agent Contact Number*"
                        required
                    />
                </form>                
            </div>
        </div>
    );
};

export default YourDetailsForm;

 
