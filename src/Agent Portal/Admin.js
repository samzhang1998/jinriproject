import React, { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import fill from '../asset/File_dock_fill.png';
import fill1 from '../asset/File_dock_fill (1).png';
import logout from '../asset/Sign_in_squre_fill.png';
import Header from "../Header";
import Changeorders from "./Changeorders";

const OrderStatus = () => {
    return (
        <div>
            <Changeorders />
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

const PropertyStatus = () => {
    return (
        <div>
            <h1>Property</h1>
        </div>
    );
};

const Admin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const { id } = useParams();
    const showOrderStatus = () => {
        setCurrentPage(1);
    };
    const showCustomer = () => {
        setCurrentPage(2);
    };
    const showSettings = () => {
        setCurrentPage(3);
    };
    const handleClick = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <div className="portal_page">
            <Header />
            <div className='header_bg'></div>
            <div className="portal">
                <div className="portal_selection">
                    <h1>Welcome {id}</h1>
                    <div 
                        onClick={showOrderStatus} 
                        className="to_details"
                        style={{
                            background: currentPage === 1 ? "#F4F4F4" : "#FFF",
                        }}
                    >
                        {currentPage === 1 && <img src={fill1} alt="fill1" />}
                        {currentPage !== 1 && <img src={fill} alt="fill" />}
                        <p
                            style={{
                                color: currentPage === 1 ? "#008286" : "#A4A4A4",
                            }}
                        >Order Status</p>
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
                        >Customer Status</p>
                    </div>
                    <div 
                        onClick={showSettings} 
                        className="to_details"
                        style={{
                            background: currentPage === 3 ? "#F4F4F4" : "#FFF",
                        }}
                    >
                        {currentPage === 3 && <img src={fill1} alt="fill1" />}
                        {currentPage !== 3 && <img src={fill} alt="fill" />}
                        <p
                            style={{
                                color: currentPage === 3 ? "#008286" : "#A4A4A4",
                            }}
                        >Property Status</p>
                    </div>
                    <div className="to_details" onClick={handleClick}>
                        <img src={logout} alt="logout" />
                        <p style={{color: '#A4A4A4'}}>Logout</p>                        
                    </div>
                </div>            
                <div className="portal_details">
                    {currentPage === 1 && <OrderStatus />}
                    {currentPage === 2 && <CustomerStatus />}
                    {currentPage === 3 && <PropertyStatus />}
                </div>
            </div>
        </div>
    );
};

export default Admin;