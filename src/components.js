import React, { useEffect, useState } from "react";
import { useNavigate,Link } from 'react-router-dom';
import FetchFunc from "./API";
import "./components.css";
import fill from './asset/Pin_alt_fill.png';
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

// search button
const Colorbutton1 = () => {
    return (
        <div className="select_button">
            <button
                style={{
                    backgroundColor: '#008286',
                    color: 'white',
                    borderRadius: '0.9rem 0.9rem 0px 0px',
                    width: '14rem',
                    height: '2.56rem',
                    border: 'none',
                    fontSize: '0.875rem',
                    fontFamily: 'Montserrat',
                }}
            >
                Building & Pest inspection
            </button>
        </div>
    );
};

export default Colorbutton1;

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

const SearchBox = () => {
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
                const data = await response.json();
                localStorage.setItem('price', data.reportPrice);
                console.log(data);
                navigate(`/report`, { state: { query }});
            } else if (response.status === 404) {
                navigate(`/bookinspector`, { state: { query }});
            } else if (response.status === 401) {
                navigate('/login');
            } else {
                navigate(`/bookinspector`, { state: { query }});
                console.log(response.text());
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Failed to submit address:', error);
        }
    };

    return (
        <div className="search_box">
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
                <input className="screen_search"
                    type="text"
                    value={query}
                    placeholder=''
                    onChange={handleInputChange}
                />
            </Autocomplete>            
            <button className="screen_search_button"
                onClick={handleSearch}
            >
                SEARCH         
            </button>            
        </div>
    );
};

export { SearchBox };

const MobileSearchBox = () => {
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
    const [autocomplete, setAutocomplete] = useState(null);
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const libraries = ['places'];
    const [bounds, setBounds] = useState(null);

    useEffect(() => {
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

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyB5dIbLMMqePwB7XX-btMBvkzf__oVK67I',
        libraries: libraries,
    });

    const onLoad = (autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    };

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            setQuery(place.formatted_address);
            console.log('Selected Place:', place);
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    
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
                const data = await response.json();
                setPrice(data.reportPrice);
                navigate(`/report`, { state: { query, price }});
            } else if (response.status === 404) {
                navigate(`/bookinspector`, { state: { query }});
            } else if (response.status === 401) {
                navigate('/login');
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Failed to submit address:', error);
        }
    };

    return (
        <div>
            <div className='mobile_search_box'>
                <div className="mobile_select_button">
                    <button
                        style={{
                            backgroundColor: '#008286',
                            color: 'white',
                            borderRadius: '0.9rem',
                            width: '14rem',
                            height: '2.56rem',
                            border: 'none',
                            fontSize: '0.875rem',
                            fontFamily: 'Montserrat',
                        }}
                    >
                        Building & Pest inspection
                    </button>
                </div>
                <div className='mobile_type_area'>
                    <img src={fill} alt='fill' />
                    <Autocomplete 
                        onLoad={onLoad} 
                        onPlaceChanged={onPlaceChanged}
                        bounds={bounds}
                        options={{
                            // strictBounds: true,
                            // types: ['address'],
                            componentRestrictions: { country: "AU" }, // Restrict to Australia
                        }}
                    >
                        <input className="mobile_search"
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder=''
                        />
                    </Autocomplete>
                </div>
                <p>Can't find property? <Link to='/address' className='find_address'>Click here</Link></p>
            </div>
            <button className="mobile_search_button"
                onClick={handleSearch}
            >
                SEARCH         
            </button>
        </div>
    );
};

export { MobileSearchBox };

