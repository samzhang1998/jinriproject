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
          <p>As a real estate agent, you can order our Building & Pest Reports at lower upfront 
            cost and fast track! Simply request the report, and we'll take care of everything — buyers can 
            purchase and download it directly.<br />This hassle-free process not only streamlines 
            the sales process but also eliminates the need for you to arrange multiple inspections, 
            saving valuable time and increasing the efficiency of report access for your buyers. 
            Partner with us today to provide added value to your clients and close deals faster!</p>
        </div>
        <Search />          
      </div>
      <Introduction />
      <Strength />
    </div>
  );
};

export default ForPartner;