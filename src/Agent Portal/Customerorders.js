import React, { useEffect, useState } from "react";
import "./Customerorders.css";
import FetchFunc from "../API";
import { useNavigate } from "react-router-dom";
import close from "../asset/Close_round.png";

const EditCustomerOrderModal = ({ id, closeModal, refresh, setRefresh }) => {
    const navigate = useNavigate();
    const [customerOrder, setCustomerOrder] = useState([]);
    const [formData, setFormData] = useState({
        currentStatus: '',
        orderId: id,
        statusInfo: ''
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await FetchFunc(
                    `/admin/getCustomerOrderInfo?orderId=${id}`,
                    'GET',
                );
                if (response === 401) {
                    localStorage.setItem('isLoggedIn', false);
                    localStorage.removeItem('username');
                    localStorage.removeItem('role');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('email');
                    localStorage.removeItem('mobile');
                    navigate('/login');
                } else if (!response.ok) {
                    // console.log(response.text());
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // console.log('Response from server:', response);
                const data = await response.json();
                // console.log('data response:', data);
                setCustomerOrder(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [navigate,id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
        };
        try {
            // console.log('data sent:', dataToSend);
            const response = await FetchFunc(
                '/admin/addCustomerOrderStatus',
                'POST',
                JSON.stringify(dataToSend)
            );
            if (response === 401) {
                localStorage.setItem('isLoggedIn', false);
                localStorage.removeItem('username');
                localStorage.removeItem('role');
                localStorage.removeItem('userId');
                localStorage.removeItem('email');
                localStorage.removeItem('mobile');
                navigate('/login');
            } else if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // console.log('Response from server:', response);
            setRefresh(!refresh);
            closeModal();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="change_modal">
            <div className="change_order_modal_content">
                <div className="close_modal">
                    <img src={close} alt="close" onClick={closeModal} />
                </div>
                <h1>Order: {id}</h1>
                <div className="customer_order_detail_info">
                    <div className="order_detail_info">
                        <p>Customer: {customerOrder.firstName} {customerOrder.lastName}</p>
                        <p>Customer email: {customerOrder.email}</p>
                        <p>Customer mobile: {customerOrder.mobile}</p>
                    </div>
                    <div className="order_detail_info">
                        <p>Agent: {customerOrder.agentFirstName} {customerOrder.agentLastName}</p>
                        <p>Agent email: {customerOrder.agentEmail}</p>
                        <p>Agent mobile: {customerOrder.agentMobile}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Status:
                        <select
                            name="currentStatus"
                            value={formData.currentStatus}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Order Status</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </label>
                    <label>
                        History:
                        <input 
                            name="statusInfo"
                            value={formData.statusInfo}
                            onChange={handleChange}
                        />
                    </label>
                    <div className="confirm_change">
                        <button type="submit">Save</button>
                        <button type="button" onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const InspectionPriceModal = ({ closeModal, refresh, setRefresh }) => {
    const [price, setPrice] = useState(null);
    const [prevPrice, setPrevPrice] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await FetchFunc(
                    '/search/inspection',
                    'GET',
                );
                if (response.status === 401) {
                    localStorage.setItem('isLoggedIn', false);
                    localStorage.removeItem('username');
                    localStorage.removeItem('role');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('email');
                    localStorage.removeItem('mobile');
                    navigate('/login');
                } else if (!response.ok) {
                    // console.log(response.text());
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // console.log('Response from server:', response);
                const data = await response.json();
                // console.log('data response:', data);
                setPrevPrice(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchServices();
    }, [refresh, navigate]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setPrice(parseFloat(newValue));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log(price);
            const response = await FetchFunc(
                `/admin/editInspection/?price=${price}`,
                'POST',
            );
            if (response.status === 401) {
                localStorage.setItem('isLoggedIn', false);
                localStorage.removeItem('username');
                localStorage.removeItem('role');
                localStorage.removeItem('userId');
                localStorage.removeItem('email');
                localStorage.removeItem('mobile');
                navigate('/login');
            } else if (!response.ok) {
                // console.log(response.text())
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // console.log('Response from server:', response);
            setRefresh(!refresh);
            closeModal();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="change_modal">
            <div className="price_modal">
                <div className="close_modal">
                    <img src={close} alt="close" onClick={closeModal} />
                </div>
                <h1>Set Inspection Price</h1>
                <div className="set_price">
                    <p>Price:</p>
                    <input 
                        type="number"
                        value={price}
                        onChange={handleChange}
                        placeholder={prevPrice}
                        required
                    />
                </div>
                <button 
                    onClick={handleSubmit} 
                    className="save_add_modal"
                >Save</button>
            </div>
        </div>
    );
};

const Customerorders = () => {
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();
    const [filter, setFilter] = useState('completed');
    const [refresh, setRefresh] = useState(false);
    const [activeOrderId, setActiveOrderId] = useState(null);
    const [priceModal, setPriceModal] = useState(false);
    const [id, setId] = useState('');
    const [address, setAddress] = useState('');
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(null);
    const totalPages = Math.ceil(totalOrders / pageSize);
    const [searchedOrder, setSearchedOrder] = useState([]);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let response;
                if (filter) {
                    response = await FetchFunc(
                        `/admin/allCustomerOrders?status=${filter}&offset=${currentPage-1}&limit=${pageSize}`,
                        'GET',
                    );
                } else {
                    response = await FetchFunc(
                        `/admin/allCustomerOrders?offset=${currentPage-1}&limit=${pageSize}`,
                        'GET',
                    );
                }
                if (response.status === 401) {
                    localStorage.setItem('isLoggedIn', false);
                    localStorage.removeItem('username');
                    localStorage.removeItem('role');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('email');
                    localStorage.removeItem('mobile');
                    navigate('/login');
                } else if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // console.log('Response from server:', response);
                const data = await response.json();
                // console.log('data response:', data);
                setTotalOrders(data.totalElements);
                const sorted = data.content.slice().sort((a, b) => {
                    return new Date(b.createTime) - new Date(a.createTime);
                });
                setOrder(sorted);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [navigate, refresh, filter, currentPage, pageSize]);

    // const filteredOrders = order.filter(order => {
    //     if (filter === 'all') return true;
    //     return order.currentStatus.toLowerCase() === filter;
    // });

    const handleAddressSearch = (e) => {
        setAddress(e.target.value);
    }

    const handleIdSearch = (e) => {
        setId(e.target.value);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await FetchFunc(
                `/customer-order/search?orderId=${id}&address=${address}`,
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
            const data = await response.json();
            // console.log('data response:', data);
            setSearchedOrder(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleOpenModal = (orderId) => {
        // console.log(orderId)
        setActiveOrderId(orderId);
    };
    
    const handleCloseModal = () => {
        setActiveOrderId(null);
    };

    const handleChangePrice = () => {
        setPriceModal(true);
    };

    const handleFinishChangePrice = () => {
        setPriceModal(false);
    };

    const formatToISO = (dateString) => {
        const [day, month, yearAndTime] = dateString.split('-');
        const [year, time] = yearAndTime.split(' ');
        return `${year}-${month}-${day}T${time}`;
    };

    const handleRecordDownload = async () => {
        try {
            const response = await FetchFunc(
                '/admin/exportCustomerOrders',
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
                // console.log(response.text());
            }
            // console.log('Response from server:', response);
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
                <button onClick={handleChangePrice} style={{width: '15rem'}}>Edit Inspection Price</button>
                <button onClick={handleRecordDownload} style={{width: '15rem'}}>Download Order Record</button>
                {priceModal === true &&(
                    <InspectionPriceModal 
                        closeModal={handleFinishChangePrice}
                        refresh={refresh}
                        setRefresh={setRefresh}
                    />
                )}
            </div>
            <hr style={{background: '#DDD', width: '100%', border: 'none', height: '1px'}} />
            <div className="order_search">
                <input 
                    type="text"
                    value={id}
                    placeholder="Search order id"
                    onChange={handleIdSearch}
                />
                <input
                    type="text"
                    value={address}
                    placeholder="Search address"
                    onChange={handleAddressSearch}                    
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="order_list">
                {Array.isArray(searchedOrder) && 
                    searchedOrder
                    .sort((a, b) => new Date(formatToISO(b.createTime)) - new Date(formatToISO(a.createTime)))
                    .map((order) => (
                    <div key={order.orderId} className="order_item">                        
                        <div className="order_detail">
                            <p>{order.createTime}</p>
                            <h1>Order #{order.orderId}</h1>
                            <h2>{order.info}</h2>
                        </div>
                        <div onClick={() => handleOpenModal(order.orderId)} className="edit_order">
                            Edit order
                        </div>
                        {activeOrderId === order.orderId && (
                            <EditCustomerOrderModal 
                                id={order.orderId}
                                closeModal={handleCloseModal}
                                refresh={refresh}
                                setRefresh={setRefresh}
                            />
                        )}
                    </div>
                ))}
                <hr style={{background: '#DDD', width: '100%', border: 'none', height: '1px'}} />
            </div>
            <div className="order_status">
                <span 
                    onClick={() => setFilter('')}
                    className={filter === '' ? 'active' : ''}
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
                {Array.isArray(order) && 
                    order
                    .sort((a, b) => new Date(formatToISO(b.createTime)) - new Date(formatToISO(a.createTime)))
                    .map((order) => (
                    <div key={order.orderId} className="order_item">                        
                        <div className="order_detail">
                            <p>{order.createTime}</p>
                            <h1>Order #{order.orderId}</h1>
                            <h2>{order.info}</h2>
                        </div>
                        <div onClick={() => handleOpenModal(order.orderId)} className="edit_order">
                            Edit order
                        </div>
                        {activeOrderId === order.orderId && (
                            <EditCustomerOrderModal 
                                id={order.orderId}
                                closeModal={handleCloseModal}
                                refresh={refresh}
                                setRefresh={setRefresh}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center', gap: '5px'}}>
                <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Last Page
                </button>
                {[...Array(totalPages)].map((_, idx) => {
                    const page = idx + 1;
                    return (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            style={{
                                fontWeight: page === currentPage ? 'bold' : 'normal',
                            }}
                        >
                            {page}
                        </button>
                    );
                })}
                <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next Page
                </button>
            </div>
        </div>
    );
};

export default Customerorders;