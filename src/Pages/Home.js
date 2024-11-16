import React from 'react';
import './Home.css';
import Header from '../Header.js';
import Findreport from './Findreport.js';
import Search from './search.js';
import OurCustomers from './OurCustomers.js';
import MobileHome from '../Mobile/MobileHome.js';
import Introduction from './Introduction.js';
import Strength from './Strength.js';

const Home = () => {
  return (
    <div>
      <div className='mobile_home'>
        <MobileHome />
      </div>
      <div className="home">
        <div className="box1">  
          <Header />      
          <div className='text1'>
            <h1>The home of property <br /> compliance and due diligence</h1>
            <p>Independent, Professional Reports</p>
          </div>
          <Search />          
        </div>
        <div className='box2'>
          <Introduction />
        </div>
        <div className='box3'>
          <Strength />
        </div>
        <div className='box4'>        
          <OurCustomers />
        </div>
        <Findreport />
      </div>
    </div>
  );
};

export default Home;