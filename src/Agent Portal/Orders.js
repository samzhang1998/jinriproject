import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Orders.css";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('all');
    useEffect(() => {
        const mockOrders = [
            {
                id: '1598723',
                date: '09-04-2023',
                address: 'Unit654/311 high Street, Kingsford NSW 2037',
                status: 'Processing'
            },
            {
                id: '1598724',
                date: '09-04-2023',
                address: 'Unit654/311 high Street, Kingsford NSW 2037',
                status: 'Completed'
            },
            {
                id: '16124256',
                date: '09-04-2023',
                address: '45 Hills street, Marricville NSW 2301',
                status: 'Completed'
            },
            {
                id: '16124257',
                date: '09-04-2023',
                address: '45 Hills street, Marricville NSW 2301',
                status: 'Processing'
            },
        ];
        setOrders(mockOrders);
    }, []);
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
                {filteredOrders.map((order) => (
                    <div key={order.id} className="order_item">                        
                        <div className="order_detail">
                            <p>{order.date}</p>
                            <h1>Order #{order.id}</h1>
                            <h2>{order.address}</h2>
                        </div>
                        <Link to={`/orders/${order.id}`} className="view_order">View order</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;