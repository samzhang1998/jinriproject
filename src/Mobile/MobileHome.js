import React from "react";
import Header from "../Header";
import "./MobileHome.css";
import Search from "../Pages/search";
import OurCustomers from "../Pages/OurCustomers";
import Findreport from "../Pages/Findreport";

const MobileHome = () => {
    return (
        <div className="mobile">
            <div className="mobile_box1">
                <Header />
                <h1>The home of property</h1>
                <h2>compliance and due diligence</h2>
                <p>Independent, Professional Reports</p>
                <Search />
            </div>
            <div className="mobile_box2">
                <div className="mobile_box2_img">
                    <div className='mobile_home_rectangle1'>
                        <img src='File_dock_search.png' alt='search'></img>
                        <div className='mobile_rectangle1_1'>
                            <h2>Building & <br /> Pest Inspection</h2>
                        </div>
                    </div>
                    <div className='mobile_home_rectangle2'>
                        <img src='File_dock_search.png' alt='search'></img>
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
                        <img src='/Check_fill.png' alt='check' />
                        <h1>Instant Report</h1>
                    </div>
                    <div className="mobile_home_text">
                        <img src='/Check_fill.png' alt='check' />
                        <h1>Insurance Covered</h1>
                    </div>
                    <div className="mobile_home_text">
                        <img src='/Check_fill.png' alt='check' />
                        <h1>Get informed Before You Buy.</h1>
                    </div>
                    <div className="mobile_home_text">
                        <img src='/Check_fill.png' alt='check' />
                        <h1>Get informed Before You Buy.</h1>
                    </div>
                </div>
                <div className="mobile_box4">
                    <OurCustomers />
                </div>
                <Findreport />
            </div>
        </div>
    );
};

export default MobileHome;