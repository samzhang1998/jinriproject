import React, {useState, useEffect} from "react";
import FetchFunc from "../API";

const Partnerorders = () => {
    const [order, setOrder] = useState([]);
    const [filter, setFilter] = useState('all');
    const [refresh, setRefresh] = useState(false);
    const [activeOrderId, setActiveOrderId] = useState(null);
    const [formData, setFormData] = useState({
        currentStatus: '',
        orderId: '',
        statusInfo: ''
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await FetchFunc(
                    `/admin/allPartnerOrders`,
                    'GET',
                );
                if (!response.ok) {
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
    }, []);

    const filteredOrders = order.filter(order => {
        if (filter === 'all') return true;
        return order.currentStatus.toLowerCase() === filter;
    });

    const handleOpenModal = (orderId) => {
        console.log(orderId)
        setActiveOrderId(orderId);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            orderId: order.orderId
        }));
    };
    
    const handleCloseModal = () => {
        setActiveOrderId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
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
            setRefresh(!refresh);
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
                {filteredOrders.map((order) => (
                    <div key={order.id} className="order_item">                        
                        <div className="order_detail">
                            <p>{order.createTime}</p>
                            <h1>Order #{order.orderId}</h1>
                            <h2>{order.info}</h2>
                        </div>
                        <div onClick={() => handleOpenModal(order.orderId)} className="edit_order">
                            Edit order
                        </div>
                    </div>
                ))}
            </div>
            {activeOrderId === order.orderId && (
                <div className="change_modal">
                    <div className="change_modal_content">
                        <p>{order.orderId}</p>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Status:
                                <select
                                    name="currentStatus"
                                    value={formData.currentStatus}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Complete">Complete</option>
                                </select>
                            </label>
                            <label>
                                History:
                                <input 
                                    name="statusInfo"
                                    value={formData.statusInfo}
                                    onChange={handleChange}
                                    required
                                />
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

export default Partnerorders;