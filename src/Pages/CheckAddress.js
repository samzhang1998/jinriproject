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
                        <option value="Factory">Factory</option>
                        <option value="Flat">Flat</option>
                        <option value="Kiosk">Kiosk</option>
                        <option value="Marine Berth">Marine Berth</option>
                        <option value="Office">Office</option>
                        <option value="Room">Room</option>
                        <option value="Shed">Shed</option>
                        <option value="Shop">Shop</option>
                        <option value="Site">Site</option>
                        <option value="Store">Store</option>
                        <option value="Studio">Studio</option>
                        <option value="Suite">Suite</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Unit">Unit</option>
                        <option value="Ward">Ward</option>
                        <option value="Warehouse">Warehouse</option>
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
                        <option value="Access">Access</option>
                        <option value="Alley">Alley</option>
                        <option value="Amble">Amble</option>
                        <option value="Anchorage">Anchorage</option>
                        <option value="Avenue">Avenue</option>
                        <option value="Basin">Basin</option>
                        <option value="Bend">Bend</option>
                        <option value="Block">Block</option>
                        <option value="Boulevard">Boulevard</option>
                        <option value="Brace">Brace</option>
                        <option value="Brae">Brae</option>
                        <option value="Bridge">Bridge</option>
                        <option value="Brake">Brake</option>
                        <option value="Bypass">Bypass</option>
                        <option value="Causeway">Causeway</option>
                        <option value="Centre">Centre</option>
                        <option value="Centreway">Centreway</option>
                        <option value="Chase">Chase</option>
                        <option value="Circle">Circle</option>
                        <option value="Circuit">Circuit</option>
                        <option value="Close">Close</option>
                        <option value="Court">Court</option>
                        <option value="Crescent">Crescent</option>
                        <option value="Drive">Drive</option>
                        <option value="Edge">Edge</option>
                        <option value="Elbow">Elbow</option>
                        <option value="End">End</option>
                        <option value="Entrance">Entrance</option>
                        <option value="Esplanade">Esplanade</option>
                        <option value="Front">Front</option>
                        <option value="Glade">Glade</option>
                        <option value="Grove">Grove</option>
                        <option value="Highway">Highway</option>
                        <option value="Lane">Lane</option>
                        <option value="Link">Link</option>
                        <option value="Loop">Loop</option>
                        <option value="Mall">Mall</option>
                        <option value="Mews">Mews</option>
                        <option value="Parade">Parade</option>
                        <option value="Place">Place</option>
                        <option value="Promenade">Promenade</option>
                        <option value="Road">Road</option>
                        <option value="Rise">Rise</option>
                        <option value="Row">Row</option>
                        <option value="Square">Square</option>
                        <option value="Street">Street</option>
                        <option value="Terrace">Terrace</option>
                        <option value="Track">Track</option>
                        <option value="Walk">Walk</option>
                        <option value="Way">Way</option>
                        <option value="Vista">Vista</option>
                        <option value="Wynd">Wynd</option>
                        <option value="Yard">Yard</option>
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
                </form>
                <button className="back_button1" onClick={handleBack}>← Back</button>
            </div>
        </div>
    );
};

export default CheckAddress;