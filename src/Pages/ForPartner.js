import React from 'react';
import Header from '../Header';
import Search from './search';
import './ForPartner.css';
import house from '../asset/image1.png';
import search from '../asset/File_dock_search.png';
import house1 from '../asset/image3.png';
import check from '../asset/Check_fill.png';
import Introduction from './Introduction';
import Strength from './Strength';

const ForPartner = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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