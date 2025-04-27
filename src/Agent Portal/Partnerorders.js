import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import FetchFunc from "../API";
import close from "../asset/Close_round.png";

const EditPartnerOrderModal = ({ id, closeModal, refresh, setRefresh }) => {
    const navigate = useNavigate();
    const [partnerOrder, setPartnerOrder] = useState([]);
    const [formData, setFormData] = useState({
        currentStatus: '',
        orderId: id,
        statusInfo: ''
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await FetchFunc(
                    `/admin/getPartnerOrderInfo?orderId=${id}`,
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
                setPartnerOrder(data);
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
                '/admin/addPartnerOrderStatus',
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
                <div className="order_detail_info">
                    <p>Agent: {partnerOrder.agentFirstName} {partnerOrder.agentLastName}</p>
                    <p>Agent email: {partnerOrder.agentEmail}</p>
                    <p>Agent mobile: {partnerOrder.agentMobile}</p>
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
                            <option value="Complete">Complete</option>
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

const Partnerorders = () => {
    const [order, setOrder] = useState([]);
    const [filter, setFilter] = useState('complete');
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const [activeOrderId, setActiveOrderId] = useState(null);
    const [id, setId] = useState('');
    const [address, setAddress] = useState('');
    const pageSize = 10
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(null);
    const totalPages = Math.ceil(totalOrders / pageSize);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await FetchFunc(
                    `/admin/allPartnerOrders?status=${filter}&offset=${(currentPage-1)*pageSize+1}&limit=${currentPage*pageSize}`,
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
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // console.log('Response from server:', response);
                const data = await response.json();
                // console.log('data response:', data);
                setTotalOrders(data.totalElements);
                setOrder(data.content);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [refresh,navigate]);

    const filteredOrders = order.filter(order => {
        if (filter === 'all') return true;
        return order.currentStatus.toLowerCase() === filter;
    });

    const handleAddressSearch = (e) => {
        setAddress(e.target.value);
    }

    const handleIdSearch = (e) => {
        setId(e.target.value);
    }

    const formatToISO = (dateString) => {
        const [day, month, yearAndTime] = dateString.split('-');
        const [year, time] = yearAndTime.split(' ');
        return `${year}-${month}-${day}T${time}`;
    };

    const handleOpenModal = (orderId) => {
        // console.log(orderId)
        setActiveOrderId(orderId);
    };
    
    const handleCloseModal = () => {
        setActiveOrderId(null);
    };

    const handleRecordDownload = async () => {
        try {
            const response = await FetchFunc(
                '/admin/exportPartnerOrders',
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
                <button onClick={handleRecordDownload} style={{width: '15rem'}}>Download Order Record</button>
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
                <button>Search</button>
            </div>
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
                    onClick={() => setFilter('complete')}
                    className={filter === 'complete' ? 'active' : ''}
                >Completed</span>
            </div>
            <div className="order_list">
                {filteredOrders
                .sort((a, b) => new Date(formatToISO(b.createTime)) - new Date(formatToISO(a.createTime)))
                .map((order) => (
                    <div key={order.id} className="order_item">                        
                        <div className="order_detail">
                            <p>{order.createTime}</p>
                            <h1>Order #{order.orderId}</h1>
                            <h2>{order.info}</h2>
                        </div>
                        <div onClick={() => handleOpenModal(order.orderId)} className="edit_order">
                            Edit order
                        </div>
                        {activeOrderId === order.orderId && (
                            <EditPartnerOrderModal 
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

export default Partnerorders;