import React from 'react';
import Colorbutton1, { SearchBox, MobileSearchBox } from '../components';
import './search.css';

const Search = () => {
    return (
        <div className='searchbox'>
            <div className='color_button'>
                <Colorbutton1 />
            </div>
            <div className='search_content'>
                <div className='type_area'>
                    <img src='/Pin_alt_fill.png' alt='fill' />
                    <SearchBox />
                </div>
                <p>Can't find property? Click here</p>
            </div>
            <div className='mobile_search_content'>
                <MobileSearchBox />
            </div>
            <span>*If the report is already available, you will pay a lower price and may 
              receive cash back if it is repurchased</span>
        </div>
    );
};

export default Search;