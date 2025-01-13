import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FetchFunc from "../API";
import "./ChangeService.css";
import close from "../asset/Close_round.png";

const ChangeService = () => {
    const [services,setServices] = useState([]);
    const [serviceModal, setServiceModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const [formService,setFormService] = useState({
        title: '',
        description: '',
        price: ''
    });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await FetchFunc(
                    '/service/all',
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
                setServices(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchServices();
    }, [refresh, navigate]);

    const handleAddService = () => {
        setServiceModal(true);
    };

    const closeModal = () => {
        setServiceModal(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormService((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formService,
        };
        try {
            console.log('data sent:', dataToSend);
            const response = await FetchFunc(
                '/admin/addService',
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
                navigate('/adminlogin');
            } else if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            setRefresh(!refresh);
            closeModal();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="orders">
            <div className="change_property_title">
                <h1>Services</h1>
                <button onClick={handleAddService}>Add a Service</button>
            </div>
            {serviceModal === true && (
                <div className="change_modal">
                    <div className="property_modal">
                        <div className="close_property_modal">
                            <h1>New Service</h1>
                            <img src={close} alt="close" onClick={closeModal} />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <p>Service title:</p>
                            <input 
                                name="title"
                                value={formService.title}
                                onChange={handleChange}
                                required
                            />
                            <p>Service description:</p>
                            <input 
                                name="description"
                                value={formService.description}
                                onChange={handleChange}
                                required
                            />
                            <p>Service price:</p>
                            <input 
                                name="price"
                                value={formService.price}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit" className="save_add_modal">Save</button>
                        </form>
                    </div>
                </div>
            )}
            <hr style={{background: '#DDD', width: '100%', border: 'none', height: '1px'}} />
            <div className="service_title">
                <h1>Service List</h1>
                <h1>Price</h1>
            </div>
            {Array.isArray(services) && services.map((service) => (
                <div key={service.serviceId} className="service_item">
                    <hr style={{background: '#DDD', width: '100%', }} />
                    <div className="service_id">
                        <p>{service.serviceId}</p>
                        <h1>{service.price}</h1>
                    </div>
                    <h1>{service.title}</h1>
                    <p>{service.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ChangeService;