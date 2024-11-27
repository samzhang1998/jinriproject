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
          <p>As a real estate agent, you can order our Building & Pest Reports at no upfront 
            cost! Simply request the report, and we'll handle the rest—your clients can review 
            and purchase it directly. This hassle-free process helps you provide added value 
            to your clients, streamline the sales process, and close deals faster. Partner with 
            us today and make property sales easier than ever!</p>
        </div>
        <Search />          
      </div>
      <Introduction />
      <Strength />
    </div>
  );
};

export default ForPartner;