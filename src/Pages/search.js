import React from 'react';
import Colorbutton1, { SearchBox, MobileSearchBox } from '../components';
import './search.css';
import fill from '../asset/Pin_alt_fill.png';
import { Link } from 'react-router-dom';

const Search = () => {
    return (
        <div className='searchbox'>
            <div className='color_button'>
                <Colorbutton1 />
            </div>
            <div className='search_content'>
                <div className='type_area'>
                    <img src={fill} alt='fill' />
                    <SearchBox />
                </div>
                <p>Can't find property? <Link to='/address' className='find_address'>Click here</Link></p>
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