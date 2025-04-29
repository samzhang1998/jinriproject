import React, { useState,useEffect } from 'react';
import './Searchresult2.css';
import Header from '../Header';
import { useLocation, useNavigate } from "react-router-dom";
import FetchFunc from '../API';
import Findreport from './Findreport';
import building from '../asset/图层 2 1.png';
import ok from '../asset/Check_fill.png';
import inner from '../asset/pexels-emrecan-2079246.png';
import outer from '../asset/pexels-tobiasbjorkli-2119713.png';
import Policy from '../Purchase/Policy';

const Searchresult2 = () => {
    const location = useLocation();
    const { query } = location.state || {};
    const navigate = useNavigate();
    const [price,setPrice] = useState('');
    const [condition, setCondition] = useState(false);
    const isLoggedIn = localStorage.getItem('isLoggedIn') === "true";
    const role = localStorage.getItem('role');

    const handleSearch = () => {
        localStorage.setItem('reportOK', false);
        setCondition(true);
    };

    const handleConfirm = () => {
        setCondition(false);
        navigate('/purchasereport', { state: { query, price } });
    };

    const handleClose = () => {
        setCondition(false);
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await FetchFunc(
                    '/search/inspection',
                    'GET',
                );
                if (!response.ok) {
                    // console.log(response.text());
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // console.log('Response from server:', response);
                const data = await response.json();
                // console.log('data response:', data);
                setPrice(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchServices();
    }, []);

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
                    {role !== 'Partner' && <h1>${price}</h1>}
                    {role === 'Partner' && <h1>Report</h1>}
                    <p>ETA: 2-4 Days</p>
                </div>
                <div className='details2'>
                    <div className='title2'>
                        <h2>Building & Pest Report</h2>
                    </div>
                    <h3>{query}</h3>
                    <div className='available2'>
                        <img src={ok} alt='ok' />
                        <p>Report ready in 2-4 days!</p>
                    </div>
                    <h4>Details</h4>
                    <p>SUPERIOR SERVICE, EXCEPTIONAL VALUE. <br />At QC Property Inspections, 
                    our skilled professionals provide comprehensive visual assessments to ensure 
                    the safety and structural integrity of your property. Backed by over a decade 
                    of industry expertise, we are committed to helping you make informed and 
                    confident choices for your current property or future investment.</p>
                    <div className="purchase_button2">
                        {isLoggedIn && <button onClick={handleSearch}>Book Inspector</button>}
                        {!isLoggedIn && <button onClick={() => navigate('/login')}>Book Inspector</button>}
                    </div>                    
                </div>
            </div>
            <div className="mobile_purchase_button2">
                <button onClick={handleSearch}>Book Inspector</button>
            </div>
            {condition === true && <Policy showModal={handleSearch} onConfirm={handleConfirm} onClose={handleClose}/>}
            <div className='check2'>
                <div className='check_text2'>
                    <h6>Check For Sure</h6>
                    <p>For most people, buying a property is one of the biggest 
                        financial decisions of their life.</p>
                    <p>There are real risks involved -- you might end up purchasing a property 
                        with hidden issues, costing you thousands in unexpected repairs.</p>
                    <p>At Check For Sure, we offer access to a panel of independent, qualified 
                        inspectors to assist you with your property due diligence. Additionally, 
                        our unique cashback model ensures you don't waste money on properties 
                        that don't end up being the right fit for you.</p>
                    <div className='dummy_text2'>
                        <img src={ok} alt='ok' />
                        <p>Mitigate risks of hidden property issues</p>
                    </div>
                    <div className='dummy_text2'>
                        <img src={ok} alt='ok' />
                        <p>Access to trusted independent inspectors</p>
                    </div>
                    <div className='dummy_text2'>
                        <img src={ok} alt='ok' />
                        <p>Save money with cashback guarantee</p>
                    </div>
                    <div className='dummy_text2'>
                        <img src={ok} alt='ok' />
                        <p>Make confident, informed property decisions</p>
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