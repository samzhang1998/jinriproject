import React from 'react';
import './Searchresult1.css';
import Header from '../Header';
import { Link } from "react-router-dom";
import Findreport from './Findreport';

const Searchresult1 = () => {
    return (
        <div className='search_result1'>
            <Header />
            <div className='page_header'>
                <img src='/图层 2 1.png' alt='building' />
            </div>
            <div className='mobile_page_header'></div>
            <div className='purchase'>
                <div className='mobile_title'>
                    <h2>Building & Pest Report</h2>
                </div>
                <div className='sell_price'>
                    <h1>$199</h1>
                    <p>ETA: Up to 30mins</p>
                </div>
                <div className='details'>
                    <div className='title'>
                        <h2>Building & Pest Report</h2>
                    </div>
                    <h3>36-38 Walker Street, Rhodes NSW 2138</h3>
                    <div className='available'>
                        <img src='/Check_fill.png' alt='ok' />
                        <p>Report available now!</p>
                    </div>
                    <h4>Details</h4>
                    <p>SUPERIOR SERVICE, EXCEPTIONAL VALUE. <br />
                        At QC Property Inspections, our experienced inspectors ensure building 
                        safety and integrity through thorough visual inspections. With over 
                        10 years of industry exposure, we empower you to make confident 
                        decisions about your property or your next purchase.</p>
                    <h5>Inspectors</h5>
                    <span>Max</span>
                    <div className="purchase_button">
                        <button><Link to="/purchasereport">Purchase Report</Link></button>
                    </div>
                </div>
            </div>
            <div className="mobile_purchase_button">
                <button><Link to="/purchasereport">Purchase Report</Link></button>
            </div>
            <div className='check'>
                <div className='check_text'>
                    <h6>Check For Sure</h6>
                    <p>For most people, buying a property is the 
                        biggest financial decision of their life.</p>
                    <p>There are real risks involved - you could buy a “lemon” and be 
                        left paying thousands to fix a property that was hiding significant issues.</p>
                    <p>At BYB, we have a panel of independent inspectors that can 
                        help you with your property due diligence. We also have a cash 
                        back model to ensure that you don't waste money when looking 
                        at properties that you don't end up buying.</p>
                    <div className='dummy_text'>
                        <img src='/Check_fill.png' alt='ok' />
                        <p>Lorem Ipsum is simply dummy text of the</p>
                    </div>
                    <div className='dummy_text'>
                        <img src='/Check_fill.png' alt='ok' />
                        <p>Lorem Ipsum is simply dummy text of the</p>
                    </div>
                    <div className='dummy_text'>
                        <img src='/Check_fill.png' alt='ok' />
                        <p>Lorem Ipsum is simply dummy text of the</p>
                    </div>
                    <div className='dummy_text'>
                        <img src='/Check_fill.png' alt='ok' />
                        <p>Lorem Ipsum is simply dummy text of the</p>
                    </div>
                </div>
                <div className='check_img'>
                    <div className='inner'>
                        <img src='/pexels-emrecan-2079246.png' alt='inner' />
                    </div>
                    <div className='outer'>
                        <img src='/pexels-tobiasbjorkli-2119713.png' alt='outer' />
                    </div>
                </div>
            </div>
            <div className='mobile_search_result1'>
                <Findreport />
            </div>
        </div>
    );
};

export default Searchresult1;