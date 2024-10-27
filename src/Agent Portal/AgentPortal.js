import React, { useState,useEffect } from "react";
import OrderOverview from "./OrderOverview";
import Orders from "./Orders";
import Header from '../Header';
import { Link,useLocation,useParams } from "react-router-dom";
import UserSettings from "./UserSettings";
import "./AgentPortal.css";
import add from '../asset/File_dock_add_fill.png';
import add1 from '../asset/File_dock_add_fill (1).png';
import fill from '../asset/File_dock_fill.png';
import fill1 from '../asset/File_dock_fill (1).png';
import set from '../asset/Setting_fill.png';
import set1 from '../asset/Setting_fill (1).png';
import logout from '../asset/Sign_in_squre_fill.png';

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
    const { id } = useParams();
    return (
        <div>
            <Orders id={id} />
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
    const { id } = useParams();
    const location = useLocation();
    const isAgent = location.pathname.includes('/agent');
    const showOrderOverview = () => {
        setCurrentPage(1);
    };
    const showOrders = () => {
        setCurrentPage(2);
    };
    const showSettings = () => {
        setCurrentPage(3);
    };

    useEffect(() => {
        if (isAgent) {
          setCurrentPage(1);
        } else {
          setCurrentPage(2);
        }
    }, [isAgent]);

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
                    <h1>Agent Portal {id}</h1>
                    {isAgent && (
                        <div 
                            onClick={showOrderOverview} 
                            className="to_details"
                            style={{
                                background: currentPage === 1 ? "#F4F4F4" : "#FFF",
                            }}
                        >
                            {currentPage === 1 && <img src={add} alt="add" />}
                            {currentPage !== 1 && <img src={add1} alt="add1" />}
                            <p
                                style={{
                                    color: currentPage === 1 ? "#008286" : "#A4A4A4",
                                }}
                            >Order Report</p>
                        </div>
                    )}
                    <div 
                        onClick={showOrders} 
                        className="to_details"
                        style={{
                            background: currentPage === 2 ? "#F4F4F4" : "#FFF",
                        }}
                    >
                        {currentPage === 2 && <img src={fill1} alt="fill1" />}
                        {currentPage !== 2 && <img src={fill} alt="fill" />}
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
                        {currentPage === 3 && <img src={set1} alt="set1" />}
                        {currentPage !== 3 && <img src={set} alt="set" />}
                        <p
                            style={{
                                color: currentPage === 3 ? "#008286" : "#A4A4A4",
                            }}
                        >Account Setting</p>
                    </div>
                    <Link to={"/"} style={{textDecoration: 'none'}}>
                        <div className="to_details">
                            <img src={logout} alt="logout" />
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