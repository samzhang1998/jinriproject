import React from 'react';
import './Searchresult2.css';
import Header from '../Header';
import { Link,useParams } from "react-router-dom";
import Findreport from './Findreport';
import building from '../asset/图层 2 1.png';
import ok from '../asset/Check_fill.png';
import inner from '../asset/pexels-emrecan-2079246.png';
import outer from '../asset/pexels-tobiasbjorkli-2119713.png';

const Searchresult2 = () => {
    const { query } = useParams();
    return (
        <div className='search_result2'>
            <Header />
            <div className='page_header2'>
                <img src={building} alt='building' />
            </div>
            <div className='mobile_page_header2'></div>
            <div className='purchase2'>
                <div className='mobile_title2'>
                    <h2>Building & Pest Report</h2>
                </div>
                <div className='sell_price2'>
                    <h1>$499</h1>
                    <p>ETA: 2-4 Days</p>
                </div>
                <div className='details2'>
                    <div className='title2'>
                        <h2>Building & Pest Report</h2>
                    </div>
                    <h3>{query}</h3>
                    <div className='available2'>
                        <img src={ok} alt='ok' />
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
                    <div className="purchase_button2">
                        <button><Link to="/contact">Book Inspector</Link></button>
                    </div>
                </div>
            </div>
            <div className="mobile_purchase_button">
                <button><Link to="/contact">Book Inspector</Link></button>
            </div>
            <div className='check2'>
                <div className='check_text2'>
                    <h6>Check For Sure</h6>
                    <p>For most people, buying a property is the 
                        biggest financial decision of their life.</p>
                    <p>There are real risks involved - you could buy a “lemon” and be 
                        left paying thousands to fix a property that was hiding significant issues.</p>
                    <p>At BYB, we have a panel of independent inspectors that can 
                        help you with your property due diligence. We also have a cash 
                        back model to ensure that you don't waste money when looking 
                        at properties that you don't end up buying.</p>
                    <div className='dummy_text2'>
                        <img src={ok} alt='ok' />
                        <p>Lorem Ipsum is simply dummy text of the</p>
                    </div>
                    <div className='dummy_text2'>
                        <img src={ok} alt='ok' />
                        <p>Lorem Ipsum is simply dummy text of the</p>
                    </div>
                    <div className='dummy_text2'>
                        <img src={ok} alt='ok' />
                        <p>Lorem Ipsum is simply dummy text of the</p>
                    </div>
                    <div className='dummy_text2'>
                        <img src={ok} alt='ok' />
                        <p>Lorem Ipsum is simply dummy text of the</p>
                    </div>
                </div>
                <div className='check_img2'>
                    <div className='inner2'>
                        <img src={inner} alt='inner' />
                    </div>
                    <div className='outer2'>
                        <img src={outer} alt='outer' />
                    </div>
                </div>
            </div>
            <div className='mobile_search_result2'>
                <Findreport />
            </div>
        </div>
    );
};

export default Searchresult2;