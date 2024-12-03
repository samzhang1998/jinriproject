import React from 'react';
import './AboutUs.css';
import Header from '../Header';
import Findreport from './Findreport';
import { Link } from 'react-router-dom';
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
          <p>Welcome to Check for Sure, the inspection platform you can trust. Our mission 
            is to provide comprehensive, all-encompassing inspection reports that leave no 
            detail unnoticed. Whether you're buying, selling, or managing a property, we deliver 
            accurate insights that empower you to make informed decisions.	</p>
        </div>
      </div>
      <div className='who_we_are'>
        <div className='container1'>
          <div className='introduction'>
            <h2>WHO WE ARE</h2>
            <p>CheckForSure provides instant, affordable building inspection reports at the 
              first open home, eliminating the need for separate arrangements and helping 
              buyers make faster, more informed decisions with greater efficiency.</p>
          </div>
          <div className='feature_box'>
            <div className='feature'>
              <div className='feature_left'>
                <div className='about_cricle'>1</div>
                <div className='line'></div>
              </div>
              <div className='feature_text'>
                <h2>Instant Access to Reports:</h2>
                <p>Building inspection reports are ready by the first open home, no need to wait.</p>
              </div>
            </div>
            <div className='feature'>
              <div className='feature_left'>
                <div className='about_cricle'>1</div>
                <div className='line'></div>
              </div>
              <div className='feature_text'>
                <h2>No Extra Arrangements:</h2>
                <p>Buyers don't need to separately order or arrange for a building inspector.</p>
              </div>
            </div>
            <div className='feature'>
              <div className='feature_left'>
                <div className='about_cricle'>1</div>
                <div className='line'></div>
              </div>
              <div className='feature_text'>
                <h2>Affordable Pricing:</h2>
                <p>Our reports are offered at a lower cost compared to traditional inspection services.</p>
              </div>
            </div>
            <div className='feature'>
              <div className='feature_left'>
                <div className='about_cricle'>1</div>
                <div className='line'></div>
              </div>
              <div className='feature_text'>
                <h2>Faster Decision-Making:</h2>
                <p>With pre-prepared reports, buyers can make quicker, informed decisions.</p>
              </div>
            </div>
            <div className='feature'>
              <div className='feature_left'>
                <div className='about_cricle'>1</div>
              </div>
              <div className='feature_text'>
                <h2>Increased Efficiency:</h2>
                <p>Saves time and streamlines the home-buying process, improving overall search efficiency.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='container2'>
          <h2>At Check For Sure</h2>
          <div className='container2_text1'>What sets us apart is our dedication to thoroughness 
            and reliability. Every report we produce is crafted with precision, covering every 
            aspect of the property to ensure you have a complete understanding of its condition. 
            From structural integrity to minor details, we provide a full picture so there are no 
            surprises.</div>
          <img src={office} alt='office' />
          {/* <div className='show_data'>
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
          </div> */}
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
        <div className='mobile_about_report'>
          <h1>Building & Pest Inspection</h1>
        </div>        
        <button className='mobile_book'><Link to='/contact'>BOOK INSPECTOR</Link></button>        
      </div>
    </div>
  );
};

export default AboutUs;