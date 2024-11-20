import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Orders.css";
import { GetData } from "../API";

const Orders = ({ type,id }) => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await GetData();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
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