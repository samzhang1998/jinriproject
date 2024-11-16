import React from 'react';
import Header from '../Header';
import Search from './search';
import './ForPartner.css';
import Introduction from './Introduction';
import Strength from './Strength';

const ForPartner = () => {
  return (
    <div>
      <div className="partner_box1">
        <div className='screen_partner'>  
          <Header />
        </div>
        <div className='mobile_partner'>
          <Header />
        </div>      
        <div className='partner_text1'>
          <h1>For Partner</h1>
          <p>Get informed Before You Buy. Have our qualified inspectors provide the reports 
            you need at the best possible priceGet informed Before You Buy. Have our qualified 
            inspectors provide the reports you need at the best possible price</p>
        </div>
        <Search />          
      </div>
      <Introduction />
      <Strength />
    </div>
  );
};

export default ForPartner;