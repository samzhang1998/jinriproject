import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserSettings from "./UserSettings";
import add from '../asset/File_dock_add_fill.png';
import add1 from '../asset/File_dock_add_fill (1).png';
import fill from '../asset/File_dock_fill.png';
import fill1 from '../asset/File_dock_fill (1).png';
import set from '../asset/Setting_fill.png';
import set1 from '../asset/Setting_fill (1).png';
import logout from '../asset/Sign_in_squre_fill.png';
import Header from "../Header";

const OrderStatus = () => {
    return (
        <div>
            <h1>Order Status</h1>
        </div>
    );
};

const CustomerStatus = () => {
    return (
        <div>
            <h1>Customers</h1>
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

const Admin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const showOrderStatus = () => {
        setCurrentPage(1);
    };
    const showCustomer = () => {
        setCurrentPage(2);
    };
    const showSettings = () => {
        setCurrentPage(3);
    };

    return (
        <div className="portal_page">
            <Header />
            <div className='header_bg'></div>
            <div className="portal">
                <div className="portal_selection">
                    <h1>Welcome Admin</h1>
                    <div 
                        onClick={showOrderStatus} 
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
                    <div 
                        onClick={showCustomer} 
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
                    {currentPage === 1 && <OrderStatus />}
                    {currentPage === 2 && <CustomerStatus />}
                    {currentPage === 3 && <Settings />}
                </div>
            </div>
        </div>
    );
};

export default Admin;