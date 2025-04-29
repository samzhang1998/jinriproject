import React, { useState, useEffect } from 'react';
import './Searchresult1.css';
import Header from '../Header';
import { useNavigate, useParams } from "react-router-dom";
import Findreport from './Findreport';
import building from '../asset/图层 2 1.png';
import ok from '../asset/Check_fill.png';
import inner from '../asset/pexels-emrecan-2079246.png';
import outer from '../asset/pexels-tobiasbjorkli-2119713.png';
import Policy from '../Purchase/Policy';
import FetchFunc from '../API';

const Searchresult1 = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    // const { query } = location.state || {};
    // const price = localStorage.getItem('price');
    const [condition,setCondition] = useState(false);
    const { id, partner } = useParams();
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('')

    const handleSearch = () => {
        localStorage.setItem('reportOK', true);
        setCondition(true);        
    };

    const handleConfirm = () => {
        setCondition(false);
        navigate('/purchasereport', { state: { address, price } });
    };

    const handleClose = () => {
        setCondition(false);
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await FetchFunc(
                    `/search/${id}`,
                    'GET',
                );
                if (!response.ok) {
                    console.log(response.text());
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                localStorage.setItem("partnerId", partner);
                setAddress(data.propertyAddress);
                setPrice(data.reportPrice);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchServices();
    }, [id]);

    return (
        <div className='search_result1'>
            <Header />
            <div className='page_header'>
                <img src={building} alt='building' />
            </div>
            <div className='mobile_page_header'></div>
            <div className='purchase'>
                <div className='mobile_title'>
                    <h2>Building & Pest Report</h2>
                </div>
                <div className='sell_price'>
                    <h1>${price}</h1>
                    <p>ETA: Up to 30mins</p>
                    <p>Charge of $425 for successful property buyers</p>
                </div>
                <div className='details'>
                    <div className='title'>
                        <h2>Building & Pest Report</h2>
                    </div>
                    <h3>{address}</h3>
                    <div className='available'>
                        <img src={ok} alt='ok' />
                        <p>Report available now!</p>
                    </div>
                    <h4>Details</h4>
                    <p>SUPERIOR SERVICE, EXCEPTIONAL VALUE. <br />At QC Property Inspections, 
                    our skilled professionals provide comprehensive visual assessments to 
                    ensure the safety and structural integrity of your property. Backed by over 
                    a decade of industry expertise, we are committed to helping you make informed 
                    and confident choices for your current property or future investment.</p>
                    <div className="purchase_button">
                        <button onClick={handleSearch}>
                            Purchase Report
                        </button>
                    </div>
                </div>
            </div>
            <div className="mobile_purchase_button">
                <button onClick={handleSearch}>
                    Purchase Report
                </button>
            </div>
            {condition === true && <Policy showModal={handleSearch} onConfirm={handleConfirm} onClose={handleClose}/>}
            <div className='check'>
                <div className='check_text'>
                    <h6>Check For Sure</h6>
                    <p>For most people, buying a property is one of the biggest 
                        financial decisions of their life.</p>
                    <p>There are real risks involved -- you might end up purchasing a property 
                        with hidden issues, costing you thousands in unexpected repairs.</p>
                    <p>At Check For Sure, we offer access to a panel of independent, qualified 
                        inspectors to assist you with your property due diligence. Additionally, 
                        our unique cashback model ensures you don't waste money on properties 
                        that don't end up being the right fit for you.</p>
                    <div className='dummy_text'>
                        <img src={ok} alt='ok' />
                        <p>Mitigate risks of hidden property issues</p>
                    </div>
                    <div className='dummy_text'>
                        <img src={ok} alt='ok' />
                        <p>Access to trusted independent inspectors</p>
                    </div>
                    <div className='dummy_text'>
                        <img src={ok} alt='ok' />
                        <p>Save money with cashback guarantee</p>
                    </div>
                    <div className='dummy_text'>
                        <img src={ok} alt='ok' />
                        <p>Make confident, informed property decisions</p>
                    </div>
                </div>
                <div className='check_img'>
                    <div className='inner'>
                        <img src={inner} alt='inner' />
                    </div>
                    <div className='outer'>
                        <img src={outer} alt='outer' />
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