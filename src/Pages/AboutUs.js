import React from 'react';
import './AboutUs.css';
import Header from '../Header';
import Findreport from './Findreport';
import { Link } from 'react-router-dom';
import circle from '../asset/Ellipse 181.png';
import office from '../asset/pexels-fauxels-3184360.png';
import mobile from '../asset/pexels-christa-grover-977018-2121120.png';
import logo from '../asset/Group 8693 1.png';

const AboutUs = () => {
  return (
    <div className='about_us'>
      <div className='background'>
        <Header />
        <div className='overlay_text'>
          <h1>About Us</h1>
          <p>“Lorem Ipsum is simply dummy text of the printing and typesetting industry.
           Lorem Ipsum has been the <br /> industry's standard dummy text ever since the 1500s,
            when an unknown printer took”	</p>
        </div>
      </div>
      <div className='who_we_are'>
        <div className='container1'>
          <div className='introduction'>
            <h2>WHO WE ARE</h2>
            <h3>A one-stop shop <br /> for all your property report</h3>
            <p>Get informed Before You Buy. Have our qualified inspectors 
              provide the reports you need at the best possible price</p>
          </div>
          <div className='feature'>
            <img src={circle} alt='circle' />
            <div className='feature_text'>
              <h2>Here is the Feature one</h2>
              <p>Get informed Before You Buy. Have our <br /> qualified inspectors</p>
            </div>
          </div>
          <div className='feature'>
            <img src={circle} alt='circle' />
            <div className='feature_text'>
              <h2>Here is the Feature two</h2>
              <p>Get informed Before You Buy. Have our <br /> qualified inspectors</p>
            </div>
          </div>
          <div className='feature'>
            <img src={circle} alt='circle' />
            <div className='feature_text'>
              <h2>Here is the Feature three</h2>
              <p>Get informed Before You Buy. Have our <br /> qualified inspectors</p>
            </div>
          </div>
        </div>
        <div className='container2'>
          <h2>Here is the <br /> Feature one</h2>
          <div className='container2_text1'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took“Lorem Ipsum 
            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industr</div>
          <img src={office} alt='office' />
          <div className='show_data'>
            <div className='report_data'>
              <h1>68k</h1>
              <p>Total Report</p>
            </div>
            <div className='divide'></div>
            <div className='report_data'>
              <h1>55</h1>
              <p>Employees</p>
            </div>
            <div className='divide'></div>
            <div className='report_data'>
              <h1>650</h1>
              <p>Inspectors</p>
            </div>
            <div className='divide'></div>
            <div className='report_data'>
              <h1>5</h1>
              <p>Location</p>
            </div>
          </div>
        </div>
      </div>
      <div className='screen_about'>
        <Findreport />
      </div>
      <div className='mobile_about'>
        <div className='img1'>
          <img src={mobile} alt='mobile' />
        </div>
        <div className='img2'>
          <img src={logo} alt='logo' />
        </div>
        <h1>Building & Pest Inspection</h1>        
        <button className='mobile_book'><Link to='/contact'>BOOK INSPECTOR</Link></button>        
      </div>
    </div>
  );
};

export default AboutUs;