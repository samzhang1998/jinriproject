import React, { useState } from "react";
import "./CheckAddress.css";
import { useNavigate } from "react-router-dom";
import { PostData } from "../API";
import Header from "../Header";
import back from '../asset/Expand_left.png';
import searchaddress from '../asset/Search_duotone.png';

const CheckAddress = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        unitType: '',
        unitNumber: '',
        streetNumber: '',
        streetName: '',
        streetType: '',
        suburb: '',
        state: '',
        postcode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await PostData('/submit-address', formData);
            navigate('/search2', { state: { 
                streetName: formData.streetName, 
                streetNumber: formData.streetNumber, 
                unitNumber: formData.unitNumber 
            }});
        } catch (error) {
            console.error('Failed to submit address:', error);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="check_address">
            <Header />
            <div className='header_bg'></div>
            <button className='back' onClick={handleBack}>
                <div className='back_text'>
                    <img src={back} alt='back' />
                    <p>Back</p>
                </div>
            </button>
            <div className="address_info">
                <img src={searchaddress} alt="address" />
                <h1>Please enter your full address</h1>
                <form onSubmit={handleSubmit}>
                    <select 
                        name="unitType" 
                        value={formData.unitType} 
                        onChange={handleChange}
                        className="select_input"
                    >
                        <option value="">Unit Type (Optional)</option>
                        <option value="Apartment">Apartment</option>
                        <option value="ATM">ATM</option>
                        <option value="Chambers">Chambers</option>
                        <option value="Suite">Suite</option>
                        <option value="Unit">Unit</option>
                    </select>
                    <div className="numbers">
                        <input
                            type="text"
                            name="unitNumber"
                            placeholder="Unit Number"
                            value={formData.unitNumber}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="streetNumber"
                            placeholder="Street Number"
                            value={formData.streetNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <input
                        type="text"
                        name="streetName"
                        placeholder="Street Name"
                        value={formData.streetName}
                        onChange={handleChange}
                    />
                    <select 
                        name="streetType" 
                        value={formData.streetType} 
                        onChange={handleChange}
                        className="street_type"
                    >
                        <option value="">Street Type</option>
                        <option value="Alley">Alley</option>
                        <option value="Avenue">Avenue</option>
                        <option value="Bend">Bend</option>
                        <option value="Street">Street</option>
                    </select>
                    <input
                        type="text"
                        name="suburb"
                        placeholder="Suburb"
                        value={formData.suburb}
                        onChange={handleChange}
                    />
                    <div className="state_postcode">
                        <select 
                            name="state" 
                            value={formData.state} 
                            onChange={handleChange}
                        >
                            <option value="">State</option>
                            <option value="NSW">NSW</option>
                            <option value="VIC">VIC</option>
                            <option value="QLD">QLD</option>
                            <option value="SA">SA</option>
                            <option value="WA">WA</option>
                            <option value="TAS">TAS</option>
                        </select>
                        <input
                            type="text"
                            name="postcode"
                            placeholder="Postcode"
                            value={formData.postcode}
                            onChange={handleChange}
                        />
                    </div>
                    {/* <button type="submit">Check your address</button> */}
                    <button className="check_ad_button" onClick={() => navigate('/search2')}>Check your address</button>
                </form>
                <button className="back_button1" onClick={handleBack}>← Back</button>
            </div>
        </div>
    );
};

export default CheckAddress;