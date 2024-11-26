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

const PropertyStatus = () => {    
    return (
        <div>
            <Changeproperty />
        </div>
    );
};

const Admin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const { id } = useParams();
    const showCustomer = () => {
        setCurrentPage(1);
    };
    const showPartner = () => {
        setCurrentPage(2);
    };
    const showSettings = () => {
        setCurrentPage(3);
    };
    // const handleClick = () => {
    //     localStorage.removeItem('isLoggedIn');
    //     localStorage.removeItem('username');
    //     navigate('/');
    // };
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
            console.log('Response from server:', response);
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
                        onClick={showCustomer} 
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
                        >Customer Orders</p>
                    </div>
                    <div 
                        onClick={showPartner} 
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
                        >Partner Orders</p>
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
                    <div className="to_details" onClick={handleLogout}>
                        <img src={logout} alt="logout" />
                        <p style={{color: '#A4A4A4'}}>Logout</p>                        
                    </div>
                </div>            
                <div className="portal_details">
                    {currentPage === 1 && <Customerorder />}
                    {currentPage === 2 && <Partnerorder />}
                    {currentPage === 3 && <PropertyStatus />}
                </div>
            </div>
        </div>
    );
};

export default Admin;