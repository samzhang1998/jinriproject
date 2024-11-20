import React, { useEffect, useState } from "react";
import "./Changeorders.css";
import { GetData, PostData } from "../API";

const Changeorders = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        address: '',
        status: '',
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await GetData();
                setOrders(data);
                setFormData({ address: data.address, status: data.status });
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

    const handleOpenModal = () => {
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await PostData({ ...formData, id: orders.id });
            setOrders({ ...orders, ...formData });
            setShowModal(false);
            alert('Data updated successfully');
        } catch (error) {
            console.error('Error updating data:', error);
            alert('Failed to update data');
        }
    };

    if (!orders) {
        return <p>Loading...</p>;
    }

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
                        <div onClick={handleOpenModal} className="edit_order">
                            Edit order
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="change_modal">
                    <div className="change_modal_content">
                        <form onSubmit={handleSubmit}>
                            <label>
                                Address:
                                <input 
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Status:
                                <select
                                    name="status"
                                    value={formData.status}
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

export default Changeorders;