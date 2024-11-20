import React, { useState } from "react";
import "./CheckAddress.css";
import { useNavigate } from "react-router-dom";
import FetchFunc from "../API";
import Header from "../Header";
import back from '../asset/Expand_left.png';
import searchaddress from '../asset/Search_duotone.png';

const CheckAddress = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        address:'',
        type: '',
        streetNumber: '',
        streetName: '',
        suburb: '',
        state: '',
        roomNumber: 2,
        postcode: ''
    });
    const query = `${formData.streetNumber} ${formData.streetName}, ${formData.suburb} ${formData.state} ${formData.postcode}`;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          address: query,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
        };
        try {
            console.log('Data send:', dataToSend);
            const response = await FetchFunc(
                '/search/',
                'POST',
                JSON.stringify(dataToSend)
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            navigate(`/report`, { state: { query }});
        } catch (error) {
            console.error('Failed to submit address:', error);
            navigate(`/bookinspector`, { state: { query }});
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
                        name="type" 
                        value={formData.type} 
                        onChange={handleChange}
                        className="select_input"
                    >
                        <option value="">Unit Type (Optional)</option>
                        <option value="Apartment">Apartment</option>
                        <option value="ATM">ATM</option>
                        <option value="House">House</option>
                        <option value="Suite">Suite</option>
                        <option value="Unit">Unit</option>
                    </select>
                    <div className="numbers">
                        <input
                            type="text"
                            name="unitNumber"
                            placeholder="Unit Number"
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
                    <button type="submit" className="check_ad_button">Check your address</button>
                    {/* <button 
                        className="check_ad_button" 
                        onClick={() => navigate(`/bookinspector/${query}`)}
                    >Check your address</button> */}
                </form>
                <button className="back_button1" onClick={handleBack}>← Back</button>
            </div>
        </div>
    );
};

export default CheckAddress;