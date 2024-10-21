import React from 'react';
import './Home.css';
import HomeHeader from '../HomeHeader.js';
import Findreport from './Findreport.js';
import Search from './search.js';
import { Link } from 'react-router-dom';
import OurCustomers from './OurCustomers.js';
import MobileHome from '../Mobile/MobileHome.js';
import house from '../asset/image1.png';
import search from '../asset/File_dock_search.png';
import house1 from '../asset/image3.png';
import check from '../asset/Check_fill.png';

const Home = () => {
  return (
    <div>
      <div className='mobile_home'>
        <MobileHome />
      </div>
      <div className="home">
        <HomeHeader />
        <div className="box1">        
          <div className='text1'>
            <h1>The home of porperty <br /> compliance and due diligence</h1>
            <p>Independent, Professional Reports</p>
          </div>
          <Search />          
        </div>
        <div className='box2'>
          <div className='img_container'>
            <img src={house} alt='house' />
            <div className='home_rectangle1'>
              <img src={search} alt='search' />
              <div className='rectangle1_1'>
                <h2>Building & <br /> Pest Inspection</h2>
              </div>
            </div>
            <div className='home_rectangle2'>
              <img src={search} alt='search' />
              <div className='rectangle2_1'>
                <h2>Building & <br /> Pest Inspection</h2>
              </div>
            </div>
            <img src={house1} alt='house' />
          </div>
          <div className='text_container'>
            <h3>GET YOUR REPORT IN <br /> 10 MINUTES!</h3>
            <p>Get informed Before You Buy. Have our qualified inspectors provide the reports 
              you need at the best possible priceGet informed Before You Buy. Have our 
              qualified inspectors provide the reports you need at the best possible price</p>
            <div className='get_report1'>
              <img src={check} alt='check' />
              <div className='steps'>
                <h4>Instant Report</h4>
                <p>Get informed Before You Buy. Have our qualified <br /> inspectors</p>
              </div>
            </div>
            <div className='get_report'>
              <img src={check} alt='check' />
              <div className='steps'>
                <h4>Insurance Covered</h4>
                <p>Get informed Before You Buy. Have our qualified <br /> inspectors pro</p>
              </div>
            </div>
            <div className='get_report'>
              <img src={check} alt='check' />
              <div className='steps'>
                <h4>Get informed Before You Buy.</h4>
                <p>Get informed Before You Buy. Have our 
                  qualified <br /> inspectors provide the reports yo</p>
              </div>
            </div>
            <div className='get_report'>
              <img src={check} alt='check' />
              <div className='steps'>
                <h4>Get informed Before You Buy.</h4>
                <p>Get informed Before You Buy. Have our 
                  qualified <br /> inspectors provide the reports yo</p>
              </div>
            </div>
            <div className='order_button'>
              <button><Link to='/purchasereport'>ORDER REPORT</Link></button>
            </div>
          </div>
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