import React, { useEffect, useState } from "react";
import "./Customerorders.css";
import FetchFunc from "../API";

const Customerorders = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('all');
    const [status, setStatus] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [activeOrderId, setActiveOrderId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await FetchFunc(
                    `/admin/allCustomerOrders`,
                    'GET',
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                console.log('Response from server:', response);
                const data = await response.json();
                console.log('data response:', data);
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true;
        return order.currentStatus.toLowerCase() === filter;
    });

    const handleOpenModal = (orderId) => {
        console.log(orderId)
        setActiveOrderId(orderId);
    };

    const handleChange = (e) => {
        setStatus(e.target.value);
    }
    
    const handleCloseModal = () => {
        setActiveOrderId(null);
    };

    const handleSubmit = async () => {
        const dataToSend = {
            status: status,
            orderId: activeOrderId,
        };
        try {
            console.log('data sent:', dataToSend);
            const response = await FetchFunc(
                '/admin/addPartnerOrderStatus',
                'POST',
                JSON.stringify(dataToSend)
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            // setRefresh(!refresh);
            handleCloseModal();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return (
        <div className="orders">
            <h1>Orders</h1>
            <hr style={{background: '#DDD', width: '100%', }} />
            <div className="order_status">
                <span 
                    onClick={() => setFilter('all')}
                    className={filter === 'all' ? 'active' : ''}
                >All</span>
                <span 
                    onClick={() => setFilter('processing')}
                    className={filter === 'processing' ? 'active' : ''}
                >Processing</span>
                <span 
                    onClick={() => setFilter('completed')}
                    className={filter === 'completed' ? 'active' : ''}
                >Completed</span>
            </div>
            <div className="order_list">
                {Array.isArray(filteredOrders) && filteredOrders.map((order) => (
                    <div key={order.orderId} className="order_item">                        
                        <div className="order_detail">
                            <p>{order.createTime}</p>
                            <h1>Order #{order.orderId}</h1>
                            <h2>{order.info}</h2>
                        </div>
                        <div onClick={() => handleOpenModal(orders.orderId)} className="edit_order">
                            Edit order
                        </div>
                    </div>
                ))}
            </div>
            {activeOrderId === orders.orderId && (
                <div className="change_modal">
                    <div className="change_modal_content">
                        <form onSubmit={handleSubmit}>
                            <label>
                                Status:
                                <select
                                    name="status"
                                    value={status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Complete">Complete</option>
                                </select>
                            </label>
                            <div className="confirm_change">
                                <button type="submit">Save</button>
                                <button type="button" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customerorders;