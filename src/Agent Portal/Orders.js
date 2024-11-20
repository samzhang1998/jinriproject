import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Orders.css";
import FetchFunc from "../API";

const Orders = ({ type,id }) => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('all');

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

    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true;
        return order.status.toLowerCase() === filter;
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
                    <div key={order.id} className="order_item">                        
                        <div className="order_detail">
                            <p>{order.date}</p>
                            <h1>Order #{order.id}</h1>
                            <h2>{order.address}</h2>
                        </div>
                        <Link to={{ pathname: `/${type}/${id}/orders/${order.id}/${order.status}` }} className="view_order1">
                            View order
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;