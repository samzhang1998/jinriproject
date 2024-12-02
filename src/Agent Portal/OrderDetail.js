import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Header from "../Header";
import { Link } from "react-router-dom";
import FetchFunc from "../API";
import "./OrderDetail.css";
import add1 from '../asset/File_dock_add_fill (1).png';
import fill1 from '../asset/File_dock_fill (1).png';
import set from '../asset/Setting_fill.png';
import logout from '../asset/Sign_in_squre_fill.png';
import download from '../asset/Import_duotone_line.png';

const OrderDetail = () => {
    const { orderId, orderStatus, id, type } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    console.log('Params:', { orderId, orderStatus, id, type });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let url = '';
                if (type === 'Customer') {
                    url = '/customer-order/detail';
                } else if (type === 'Partner') {
                    url = '/partner-order/detail';
                } else {
                    console.error('Invalid role!');
                    return;
                }
                const response = await FetchFunc(
                    `${url}?orderId=${orderId}`,
                    'POST',
                );
                if (response.status === 401) {
                    navigate('/login');
                } else if (!response.ok) {
                    console.log(response.text());
                }
                console.log('Response from server:', response);
                const data = await response.json();
                console.log('data response:', data);
                setOrder(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [type, orderId, navigate]);

    if (!order) {
        return <p>Loading...</p>;
    }

    const handleClick = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        navigate('/');
    };

    const formatToISO = (dateString) => {
        const [day, month, yearAndTime] = dateString.split('-');
        const [year, time] = yearAndTime.split(' ');
        return `${year}-${month}-${day}T${time}`;
    };

    const handleDownload = async () => {
        try {
            const response = await FetchFunc(
                `/oss/download?fileName=${order.reportName}&reportType=${order.reportType}`,
                'GET',
            );
            if (!response.ok) {
                console.log(response.text());
            }
            console.log('Response from server:', response);
            const blob = await response.blob();

            // Create a temporary URL for the blob
            const downloadUrl = window.URL.createObjectURL(blob);
    
            // Create a link element and trigger the download
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = order.reportName || 'downloaded_file';
            document.body.appendChild(link);
            link.click();
    
            // Cleanup: Remove the link and revoke the URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
            
        } catch (error) {
            console.error('Failed to update password:', error);
        }
    };

    return (
        <div className="order_page">
            <Header />
            <div className='header_bg'></div>
            <div className="view_order">
                <div className="portal_selection">
                    <h1>Welcome, {id}</h1>
                    {type === "agent" && <Link to={{ pathname: `/${type}/${id}` }} style={{textDecoration: 'none'}}>
                        <div className="to_details">
                            <img src={add1} alt="add1" />
                            <p style={{color: '#A4A4A4'}}>Order Report</p>
                        </div>
                    </Link>}
                    <div className="to_details" style={{background: '#F4F4F4'}}>
                        <img src={fill1} alt="fill1" />
                        <p style={{color: '#008286'}}>Orders</p>
                    </div>
                    <Link to={{ pathname: `/${type}/${id}` }} 
                        state={{ showContent: 3 }} 
                        style={{textDecoration: 'none'}}
                    >
                        <div className="to_details">
                            <img src={set} alt="set" />
                            <p style={{color: '#A4A4A4'}}>Account Settings</p>
                        </div>
                    </Link>
                    <div className="to_details" onClick={handleClick}>
                        <img src={logout} alt="logout" />
                        <p style={{color: '#A4A4A4'}}>Logout</p>                        
                    </div>
                </div>
                <div className="download_order">
                    <h1>Order #{orderId}</h1>
                    <hr style={{background: "#DDD", height: '1px', border: 'none'}}/>
                    <div className="download">
                        <div className="processing">
                            <p>Your order is</p>
                            <h1>{orderStatus}</h1>
                            <h2>as on {order.createTime}</h2>
                            <h3>Last update on {order.lastUpdate}</h3>
                        </div>
                        {type === 'Customer' && <div className="download_area">
                            {order.status.toLowerCase() === 'completed' && order.reportName !== null ? (
                                <button onClick={handleDownload} className="download_report1">
                                    <img src={download} alt="download" />
                                    Download Report
                                </button>
                            ) : (
                                <button className="download_report">
                                    <img src={download} alt="download" />
                                    Download Report
                                </button>
                            )}
                        </div>}
                        <div className="question">
                            <p>If you have any questions about your order, please feel free to contact us.</p>
                            <hr style={{background: "#DDD", height: '1px', border: 'none'}}/>
                            <h2>info@checkforsure.com.au</h2>
                        </div>
                    </div>
                    <hr style={{background: "#DDD", height: '1px', border: 'none'}}/>
                    <div className="tracking">
                        <p>Tracking History</p>
                        {Object.entries(order.history)
                            .sort(([keyA], [keyB]) => new Date(formatToISO(keyB)) - new Date(formatToISO(keyA)))
                            .map(([key, value]) => (
                                value? (
                                    <div key={key} className="track_history">
                                        <p>{key}</p>
                                        <div className="track_circle">
                                            <div className="track_inside"></div>
                                        </div>
                                        <p>{value}</p>
                                    </div>
                                ) : null
                            ))
                        }
                    </div>
                    <button className="back_button2">
                        <Link to={{ pathname: `/${type}/${id}` }} 
                        state={{ showContent: 2 }} 
                        style={{textDecoration: 'none', color: '#008286'}}
                        >← Back</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;