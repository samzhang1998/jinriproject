import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import FetchFunc from "../API";
import close from "../asset/Close_round.png";

const EditGuestOrderModal = ({ id, closeModal,order }) => {   
    return (
        <div className="change_modal">
            <div className="change_order_modal_content">
                <div className="close_modal">                    
                    <img src={close} alt="close" onClick={closeModal} />
                </div>
                <h1>Order: {id}</h1>                
                <p>Address: {order.propertyAddress}</p>
                <p>Customer notes: {order.notes}</p>
                <div className="customer_order_detail_info">                    
                    <div className="order_detail_info">
                        <p>Customer: {order.firstName} {order.lastName}</p>
                        <p>Customer email: {order.email}</p>
                        <p>Customer mobile: {order.mobile}</p>
                        {order.secondContact === true &&
                            <p>Second Contact: {order.secondFirstName} {order.secondLastName}</p>
                        }
                    </div>
                    <div className="order_detail_info">
                        <p>Agent: {order.agentFirstName} {order.agentLastName}</p>
                        <p>Agent email: {order.agentEmail}</p>
                        <p>Agent mobile: {order.agentMobile}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Guestorders = () => {
    const [order, setOrder] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const [activeOrderId, setActiveOrderId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await FetchFunc(
                    `/admin/allGuestOrders`,
                    'GET',
                );
                if (response.status === 401) {
                    localStorage.setItem('isLoggedIn', false);
                    localStorage.removeItem('username');
                    localStorage.removeItem('role');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('email');
                    localStorage.removeItem('mobile');
                    navigate('/adminlogin');
                } else if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
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
    }, [refresh,navigate]);

    const formatToISO = (dateString) => {
        const [day, month, yearAndTime] = dateString.split('-');
        const [year, time] = yearAndTime.split(' ');
        return `${year}-${month}-${day}T${time}`;
    };

    const handleOpenModal = (orderId) => {
        console.log(orderId)
        setActiveOrderId(orderId);
    };
    
    const handleCloseModal = () => {
        setActiveOrderId(null);
    };

    const handleRecordDownload = async () => {
        try {
            const response = await FetchFunc(
                '/admin/exportGuestOrders',
                'GET',
            );
            if (response.status === 401) {
                localStorage.setItem('isLoggedIn', false);
                localStorage.removeItem('username');
                localStorage.removeItem('role');
                localStorage.removeItem('userId');
                localStorage.removeItem('email');
                localStorage.removeItem('mobile');
                navigate('/adminlogin');
            } else if (!response.ok) {
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
        <div className="orders">
            <div className="change_property_title">
                <h1>Orders</h1>
                <button onClick={handleRecordDownload} style={{width: '15rem'}}>Download Order Record</button>
            </div>
            <hr style={{background: '#DDD', width: '100%', border: 'none', height: '1px'}} />
            <div className="order_list">
                {order
                .sort((a, b) => new Date(formatToISO(b.createTime)) - new Date(formatToISO(a.createTime)))
                .map((order) => (
                    <div key={order.id} className="order_item">                        
                        <div className="order_detail">
                            <p>{order.createTime}</p>
                            <h1>Order #{order.id}</h1>
                            <h2>{order.propertyAddress}</h2>
                        </div>
                        <div onClick={() => handleOpenModal(order.orderId)} className="edit_order">
                            Show details
                        </div>
                        {activeOrderId === order.orderId && (
                            <EditGuestOrderModal 
                                id={order.id}
                                closeModal={handleCloseModal}
                                order={order}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Guestorders;