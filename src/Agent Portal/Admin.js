import React, { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import FetchFunc from "../API";
import fill from '../asset/File_dock_fill.png';
import fill1 from '../asset/File_dock_fill (1).png';
import logout from '../asset/Sign_in_squre_fill.png';
import Header from "../Header";
import Customerorders from "./Customerorders";
import Partnerorders from "./Partnerorders";
import Changeproperty from "./Changeproperty";
import ChangeService from "./ChangeService";
import Guestorders from "./Guestorders";

const Customerorder = () => {
    return (
        <div>
            <Customerorders />
        </div>
    );
};

const Partnerorder = () => {
    return (
        <div>
            <Partnerorders />
        </div>
    );
};

const Guestorder = () => {
    return (
        <div>
            <Guestorders />
        </div>
    );
};

const PropertyStatus = () => {    
    return (
        <div>
            <Changeproperty />
        </div>
    );
};

const ServiceStatus = () => {
    return (
        <div>
            <ChangeService />
        </div>
    );
};

const Admin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const { id } = useParams();
    const showGuest = () => {
        setCurrentPage(1);
    };
    const showCustomer = () => {
        setCurrentPage(2);
    };
    const showPartner = () => {
        setCurrentPage(3);
    }
    const showSettings = () => {
        setCurrentPage(4);
    };
    const showServices = () => {
        setCurrentPage(5);
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const role = localStorage.getItem('role');
            const username = localStorage.getItem('username'); 
            const body = {
                username: username,
                role: role,
            };
            const response = await FetchFunc(
                '/logout/',
                'POST',
                JSON.stringify(body)
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // console.log('Response from server:', response);
            const timeOutId = localStorage.getItem('timeOutId');
            if (timeOutId) {
                clearTimeout(parseInt(timeOutId, 10));
                localStorage.removeItem('timeOutId');
                // console.log('Timeout cleared');
            }
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            localStorage.removeItem('userId');
            navigate("/");
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="portal_page">
            <Header />
            <div className='header_bg'></div>
            <div className="portal">
                <div className="portal_selection">
                    <h1>Welcome {id}</h1>
                    <div 
                        onClick={showGuest} 
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
                        >Guest Orders</p>
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
                        >Customer Orders</p>
                    </div>
                    <div 
                        onClick={showPartner} 
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
                        >Partner Orders</p>
                    </div>
                    <div 
                        onClick={showSettings} 
                        className="to_details"
                        style={{
                            background: currentPage === 4 ? "#F4F4F4" : "#FFF",
                        }}
                    >
                        {currentPage === 4 && <img src={fill1} alt="fill1" />}
                        {currentPage !== 4 && <img src={fill} alt="fill" />}
                        <p
                            style={{
                                color: currentPage === 4 ? "#008286" : "#A4A4A4",
                            }}
                        >Property Status</p>
                    </div>
                    <div 
                        onClick={showServices} 
                        className="to_details"
                        style={{
                            background: currentPage === 5 ? "#F4F4F4" : "#FFF",
                        }}
                    >
                        {currentPage === 5 && <img src={fill1} alt="fill1" />}
                        {currentPage !== 5 && <img src={fill} alt="fill" />}
                        <p
                            style={{
                                color: currentPage === 5 ? "#008286" : "#A4A4A4",
                            }}
                        >Service Status</p>
                    </div>
                    <div className="to_details">
                        <img src={logout} alt="logout" onClick={handleLogout}/>
                        <p style={{color: '#A4A4A4'}} onClick={handleLogout}>Logout</p>                        
                    </div>
                </div>            
                <div className="portal_details">
                    {currentPage === 1 && <Guestorder />}
                    {currentPage === 2 && <Customerorder />}
                    {currentPage === 3 && <Partnerorder />}
                    {currentPage === 4 && <PropertyStatus />}
                    {currentPage === 5 && <ServiceStatus />}
                </div>
            </div>
        </div>
    );
};

export default Admin;