import React, { useState, useEffect } from "react";
import "./OrderOverview.css";
import { Link, useParams,useNavigate } from "react-router-dom";
import FetchFunc from "../API";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

const OrderOverview = () => {

    const preprocessAddress = (address) => {
        // Ensure a space after commas
        return address.replace(/,([^\s])/g, ', $1').trim();
    };
    
    // search box
    const parseAddress = (address) => {
        const normalizedAddress = preprocessAddress(address);
        console.log("Normalized Address:", normalizedAddress);
        // const addressRegex = /^(\d+[A-Za-z]?)\s+(.+?),\s*(.+?)\s+(NSW|VIC|QLD|WA|SA|TAS|NT|ACT)\s+(\d{4})(?:,\s*(.+))$/i;
        // const match = normalizedAddress.match(addressRegex);
        const addressRegex = /^(\d+[A-Za-z]?)\s+([\w\s]+?),\s*([\w\s]+)\s+(NSW|VIC|QLD|WA|SA|TAS|NT|ACT)\s+(\d{4})(?:,\s*(.+))?$/i;
        const match = normalizedAddress.match(addressRegex);
    
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
    
    const libraries = ['places'];
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

    const [query, setQuery] = useState('');
    const { id } = useParams();
    const [autocomplete, setAutocomplete] = useState(null);
    const navigate = useNavigate();
    const [bounds, setBounds] = useState(null);

    useEffect(() => {
        if (!window.google || !window.google.maps) {
            console.error("Google Maps API is not loaded.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const userLocation = new window.google.maps.LatLng(latitude, longitude);
                const radius = 1000000;
                const circle = new window.google.maps.Circle({
                    center: userLocation,
                    radius: radius,
                });
                setBounds(circle.getBounds());
            },
            () => {
                console.error("Fail to get user location")
            }
        );
    }, []);

    React.useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            address: query,
        }));
    }, [query]);

    const onLoad = (autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    };

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyB5dIbLMMqePwB7XX-btMBvkzf__oVK67I',
        libraries: libraries,
    });
    
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            setQuery(place.formatted_address);
            console.log('Selected Place:', place);
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

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
            } else if (response.status === 401) {
                navigate('/login');
            } else {
                console.log(response.text());
                navigate(`/bookinspector`, { state: { query }})
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
                    <hr style={{
                        background: '#DDD', 
                        width: '100%', 
                        marginTop: '5%', 
                        marginBottom: '5%',
                        border: 'none',
                        height: '1px'
                        }} 
                    />
                    <Autocomplete 
                        onLoad={onLoad} 
                        onPlaceChanged={onPlaceChanged}
                        bounds={bounds}
                        options={{
                            strictBounds: true,
                            types: ['address'],
                            componentRestrictions: { country: "AU" },
                        }}
                    >
                        <input 
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder="Property Address*"
                            required
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
                    </Autocomplete>
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
