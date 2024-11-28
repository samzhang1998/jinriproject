import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Orders.css";
import FetchFunc from "../API";

const Orders = ({ type,id }) => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('completed');

    useEffect(() => {
        const fetchOrders = async () => {
            const id = localStorage.getItem('userId');
            const role = localStorage.getItem('role');
            let url = '';
            if (role === 'Customer') {
                url = '/customer-order/all';
            } else if (role === 'Partner') {
                url = '/partner-order/all';
            } else {
                console.error('Invalid role!');
                return;
            }
            try {
                const response = await FetchFunc(
                    `${url}?customerId=${id}`,
                    'POST',
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
    }, [id]);

    console.log(orders);

    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true;
        return order.currentStatus.toLowerCase() === filter;
    });

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
                        <Link to={{ pathname: `/${type}/${id}/orders/${order.orderId}/${order.currentStatus}` }} className="view_order1">
                            View order
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;