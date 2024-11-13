import React, { useEffect, useState } from "react";
import { useNavigate,Link } from 'react-router-dom';
import "./components.css";
import fill from './asset/Pin_alt_fill.png';
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

// search button selection
const Colorbutton1 = () => {
    const [isGreenSelected, setIsGreenSelected] = useState(true);
    const handleWhiteClick = () => { 
        setIsGreenSelected(true); 
    };
    const handleGreenClick = () => {
        setIsGreenSelected(false);
    };

    return (
        <div className="select_button">
            <button
                onClick={handleGreenClick}
                style={{
                    backgroundColor: isGreenSelected ? 'white' : '#008286',
                    color: isGreenSelected ? 'black' : 'white',
                    borderRadius: '0.9rem 0.9rem 0px 0px',
                    width: '14rem',
                    height: '2.56rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontFamily: 'Montserrat',
                }}
            >
                Building & Pest inspection
            </button>

            <button
                onClick={handleWhiteClick}
                style={{
                    backgroundColor: isGreenSelected ? '#008286' : 'white',
                    color: isGreenSelected ? 'white' : 'black',
                    borderRadius: '0.9rem 0.9rem 0px 0px',
                    width: '8rem',
                    height: '2.56rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontFamily: 'Montserrat',
                }}
            >
                Strata Report        
            </button>
        </div>
    );
};

export default Colorbutton1;

// search box
const SearchBox = () => {
    const data = [
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
    };

    const handleSearch = () => {
        if (query.trim() === '') {
            alert('Please enter a search term.');
            return;
        }
        const results = data.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase())
        );
        
        if (results.length > 0) {
            navigate('/report', { state: { query } });
        } else {
            navigate('/bookinspector', { state: { query } });
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
    const data = [
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
        const results = data.filter((item) =>
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

