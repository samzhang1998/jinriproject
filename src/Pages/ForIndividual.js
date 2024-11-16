import React from 'react';
import Search from './search';
import './ForIndividual.css';
import house from '../asset/image1.png';
import search from '../asset/File_dock_search.png';
import house1 from '../asset/image3.png';
import check from '../asset/Check_fill.png';
import Header from '../Header';
import Introduction from './Introduction';
import Strength from './Strength';

const ForIndividual = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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

export default ForIndividual;