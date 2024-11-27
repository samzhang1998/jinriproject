import React from 'react';
import Search from './search';
import './ForIndividual.css';
import Header from '../Header';
import Introduction from './Introduction';
import Strength from './Strength';

const ForIndividual = () => {
  return (
    <div>
      <div className="individual_box1">
        <div className='screen_individual'>  
          <Header />
        </div>
        <div className='mobile_individual'>
          <Header />
        </div>      
        <div className='individual_text1'>
          <h1>For Individual</h1>
          <p>Buying a property is one of the biggest investments you'll ever make. Our 
            comprehensive Building & Pest Report provides you with a detailed overview of 
            the property's condition, including any structural issues or pest infestations. 
            With fast turnaround times and competitive pricing, our reports ensure you have 
            the information you need quickly and affordably. Protect your investment and make 
            an informed decision—get your report today</p>
        </div>
        <Search />          
      </div>
      <Introduction />
      <Strength />
    </div>
  );
};

export default ForIndividual;