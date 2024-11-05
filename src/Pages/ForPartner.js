import React from 'react';
import Header from '../Header';
import Search from './search';
import './ForPartner.css';
import house from '../asset/image1.png';
import search from '../asset/File_dock_search.png';
import house1 from '../asset/image3.png';
import check from '../asset/Check_fill.png';

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
            <button onClick={scrollToTop}>ORDER REPORT</button>
          </div>
        </div>
      </div>
      <div className='mobile_individual1'>
        <div className="mobile_box2_img">
          <div className='mobile_home_rectangle1'>
            <img src={search} alt='search'></img>
            <div className='mobile_rectangle1_1'>
              <h2>Building & <br /> Pest Inspection</h2>
            </div>
          </div>
          <div className='mobile_home_rectangle2'>
            <img src={search} alt='search'></img>
            <div className='mobile_rectangle2_1'>
              <h2>Building & <br /> Pest Inspection</h2>
            </div>
          </div>
        </div>
        <div className="mobile_box2_text">
          <h3>GET YOUR REPORT IN <br /> 10 MINUTES!</h3>
          <p>Get informed Before You Buy. Have our qualified inspectors provide the reports 
            you need at the best possible priceGet informed Before You Buy. Have our 
            qualified inspectors provide the reports you need at the best possible price</p>
          <div className="mobile_home_text">
            <img src={check} alt='check' />
            <h1>Instant Report</h1>
          </div>
          <div className="mobile_home_text">
            <img src={check} alt='check' />
            <h1>Insurance Covered</h1>
          </div>
          <div className="mobile_home_text">
            <img src={check} alt='check' />
            <h1>Get informed Before You Buy.</h1>
          </div>
          <div className="mobile_home_text">
            <img src={check} alt='check' />
            <h1>Get informed Before You Buy.</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForPartner;