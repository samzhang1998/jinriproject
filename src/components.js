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

// search box
const SearchBox = () => {
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

    const [query, setQuery] = useState('');
    const [autocomplete, setAutocomplete] = useState(null);
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

    return (
        <div className="search_box">
            <Autocomplete 
                onLoad={onLoad} 
                onPlaceChanged={onPlaceChanged}
                bounds={bounds}
                options={{
                    strictBounds: true,
                    types: ['address']
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
    const address = [
        '36-38 Walker Street, Rhodes NSW 2138',
    ];

    const [query, setQuery] = useState('');
    const [autocomplete, setAutocomplete] = useState(null);
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
    };
    const handleSearch = () => {
        if (query.trim() === '') {
            alert('Please enter a search term.');
            return;
        }
        const results = address.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase())
        );
        
        if (results.length > 0) {
            navigate('/report', { state: { query } });
        } else {
            navigate('/bookinspector', { state: { query } });
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
                            strictBounds: true,
                            types: ['address']
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

