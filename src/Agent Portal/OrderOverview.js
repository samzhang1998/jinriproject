import React, { useState } from "react";
import "./OrderOverview.css";
import { Link, useParams,useNavigate } from "react-router-dom";
import FetchFunc from "../API";

const OrderOverview = () => {
    const parseAddress = (address) => {
        const addressRegex = /^(\d+[A-Za-z]?)\s+(.+?),\s+(.+?)\s+(NSW|VIC|QLD|WA|SA|TAS|NT|ACT)\s+(\d{4})(?:,\s*(.+))$/;
        const match = address.match(addressRegex);
    
        if (!match) {
            console.error("Invalid address format: " + address);
            return null;
        }
    
        const [_, streetNumber, streetName, suburb, state, postcode] = match;
        
        return {
            address,
            streetName,
            streetNumber,
            suburb,
            state,
            postcode,
        };
    };

    const [formData, setFormData] = useState({
        propertyId: '',
        address:'',
        type: '',
        streetNumber: '',
        streetName: '',
        suburb: '',
        state: '',
        roomNumber: 2,
        postcode: ''
    });
    const { id } = useParams();
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        setFormData((prevData) => ({
            ...prevData,
            address: query,
        }));
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
            ...parseAddress(query),
        };
        console.log(dataToSend);
        try {
            console.log('Data send:', dataToSend);
            const response = await FetchFunc(
                '/search/',
                'POST',
                JSON.stringify(dataToSend)
            );
            if (response.status === 200) {
                console.log('Response from server:', response);
                navigate(`/report`, { state: { query }});
            } else if (response.status === 404) {
                navigate(`/bookinspector`, { state: { query }});
            } else {
                console.log(response.text());
            }
        } catch (error) {
            console.error('Failed to submit address:', error);
        }
    };

    return (
        <div>
            <div className="agent_property_form">                
                <div className="agent_form_section">
                    <h1>Property Details</h1>
                    <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
                        <input 
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder="Property Address*"
                            style={{
                                padding: '0.625rem',
                                position: 'relative',                     
                                height: '1.875rem',
                                width:'90%',
                                marginRight: '0',
                                border: '1px solid #DDD',
                                outline: 'none',
                                borderRadius: '0.625rem',
                            }}
                        />
                        <p>Can't find property?<Link to="/address"><span>Click here</span></Link></p>
                        <h1>Order Overview</h1>
                        <h2>Address: {formData.address}</h2>
                        <h2>Inspector: {id}</h2>
                        <h2>ETA: 2-4 Business Days</h2>
                        <button 
                            className="order_now"
                            onClick={handleSearch}
                        >Order Now</button> 
                </div>               
            </div>
        </div>
    );
};

export default OrderOverview;
