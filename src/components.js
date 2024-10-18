import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./components.css";

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
    const navigate = useNavigate();

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
            navigate('/search1');
        } else {
            navigate('/search2');
        }
    };

    return (
        <div className="search_box">
            <input className="screen_search"
                type="text"
                value={query}
                onChange={handleInputChange}
            />
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
    const navigate = useNavigate();

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
            navigate('/search1');
        } else {
            navigate('/search2');
        }
    };

    return (
        <div>
            <div className='mobile_search_box'>
                <div className='mobile_type_area'>
                    <img src='Pin_alt_fill.png' alt='fill' />
                    <input className="mobile_search"
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                    />
                </div>
                <p>Can't find property? Click here</p>
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

