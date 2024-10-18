import React, { useState,useEffect } from "react";
import OrderOverview from "./OrderOverview";
import Orders from "./Orders";
import Header from '../Header';
import { Link,useLocation } from "react-router-dom";
import UserSettings from "./UserSettings";
import "./AgentPortal.css";

const OrderRequirement = ({ showOrders }) => {
    return (
        <div>
            <OrderOverview />
            <button 
                className="order_now"
                onClick={showOrders}
            >Order Now</button>
        </div>
    );
};

const OrderProcess = () => {
    return (
        <div>
            <Orders />
        </div>
    );
};

const Settings = () => {
    return (
        <div>
            <UserSettings />
        </div>
    );
};

const AgentPortal = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const showOrderOverview = () => {
        setCurrentPage(1);
    };
    const showOrders = () => {
        setCurrentPage(2);
    };
    const showSettings = () => {
        setCurrentPage(3);
    };
    const location = useLocation();
    useEffect(() => {
        if (location.state && location.state.showContent) {
          setCurrentPage(location.state.showContent);
        }
    }, [location.state]);

    return (
        <div className="portal_page">
            <Header />
            <div className='header_bg'></div>
            <div className="portal">
                <div className="portal_selection">
                    <h1>Agent Portal</h1>
                    <div 
                        onClick={showOrderOverview} 
                        className="to_details"
                        style={{
                            background: currentPage === 1 ? "#F4F4F4" : "#FFF",
                        }}
                    >
                        {currentPage === 1 && <img src="/File_dock_add_fill.png" alt="add" />}
                        {currentPage !== 1 && <img src="/File_dock_add_fill (1).png" alt="add1" />}
                        <p
                            style={{
                                color: currentPage === 1 ? "#008286" : "#A4A4A4",
                            }}
                        >Order Report</p>
                    </div>
                    <div 
                        onClick={showOrders} 
                        className="to_details"
                        style={{
                            background: currentPage === 2 ? "#F4F4F4" : "#FFF",
                        }}
                    >
                        {currentPage === 2 && <img src="File_dock_fill (1).png" alt="fill"></img>}
                        {currentPage !== 2 && <img src="File_dock_fill.png" alt="fill1"></img>}
                        <p
                            style={{
                                color: currentPage === 2 ? "#008286" : "#A4A4A4",
                            }}
                        >Orders</p>
                    </div>
                    <div 
                        onClick={showSettings} 
                        className="to_details"
                        style={{
                            background: currentPage === 3 ? "#F4F4F4" : "#FFF",
                        }}
                    >
                        {currentPage === 3 && <img src="/Setting_fill (1).png" alt="set" />}
                        {currentPage !== 3 && <img src="/Setting_fill.png" alt="set1" />}
                        <p
                            style={{
                                color: currentPage === 3 ? "#008286" : "#A4A4A4",
                            }}
                        >Account Setting</p>
                    </div>
                    <Link to={"/"} style={{textDecoration: 'none'}}>
                        <div className="to_details">
                            <img src="/Sign_in_squre_fill.png" alt="logout" />
                            <p style={{color: '#A4A4A4'}}>Logout</p>                        
                        </div>
                    </Link>
                </div>            
                <div className="portal_details">
                    {currentPage === 1 && <OrderRequirement showOrders={showOrders}/>}
                    {currentPage === 2 && <OrderProcess />}
                    {currentPage === 3 && <Settings />}
                </div>
            </div>
        </div>
    );
};

export default AgentPortal;