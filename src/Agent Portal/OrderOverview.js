import React, { useState,useEffect } from "react";
import "./OrderOverview.css";
import { Link, useParams } from "react-router-dom";
import FetchFunc from "../API";

const OrderOverview = ({ showOrders }) => {
    const [status, setStatus] = useState('');
    const { id } = useParams();
    const [addSecond,setAddSecond] = useState(false);
    const [ address, setAddress ] = useState('');
    const [selectedServices,setSelectedServices] = useState([]);
    const [services,setServices] = useState([]);
    const [formPurchase,setFormPurchase] = useState({
        propertyAddress: null,
        coolingPeriod: false,
        acution: false,
        numberBedroom: null,
        grannyFlat: false,
        notes: null,
        firstName: null,
        lastName: null,
        email: null,
        mobile: null,
        homeAddress: null,
        secondContact: null,
        secondFirstName: null,
        secondLastName: null,
        firstTimeBuyer: false,
        agentFirstName: null,
        agentLastName: null,
        agentEmail: null,
        agentMobile: null,
        userId: id,
        service: [],
    });

    const handleUpdate = (event) => {
        const { name, value, type, checked } = event.target;

        setFormPurchase((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleChange = () => {
        const choose = !addSecond
        setAddSecond(choose);
    };
    const handleInput = (e) => {
        setAddress(e.target.value);
        setFormPurchase((prevData) => ({
            ...prevData,
            propertyAddress: address,
        }));
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await FetchFunc(
                    '/service/all',
                    'GET',
                );
                if (!response.ok) {
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
    }, []);

    const handleGetService = (id, serviceData) => {
        setSelectedServices((prevSelectedServices) => {
            // let updatedServices;
            // if (prevSelectedServices.includes(id)) {
            //     updatedServices = prevSelectedServices.filter((serviceId) => serviceId !== id);
            // } else {
            //     updatedServices = [...prevSelectedServices, id];
            // }            
            
            let updatedServices;
            if (prevSelectedServices.some((service) => service.serviceId === id)) {
                // Remove the service if it already exists
                updatedServices = prevSelectedServices.filter((service) => service.serviceId !== id);
            } else {
                // Add the full service object if it doesn't exist
                const newService = serviceData.find((service) => service.serviceId === id);
                if (newService) {
                    updatedServices = [...prevSelectedServices, newService];
                } else {
                    updatedServices = prevSelectedServices; // No change if service not found
                }
            }
            
            const updatedServiceIds = updatedServices.map((service) => service.serviceId);

            setFormPurchase((prevFormPurchase) => ({
                ...prevFormPurchase,
                services: updatedServiceIds, // Update service with IDs only
            }));            
            
            // const totalPrice = calculateTotalPrice(updatedServices); // Calculate the total price
            // updatePaymentSummary({
            //     getService: updatedServices, // Update the list of services
            //     servicePrice: totalPrice, // Update the total price
            // });            
            
            return updatedServices;
            
        });
        // updatePaymentSummary({ getService: selected, servicePrice: selected ? 0 : 0 });
    };

    const handlePartnerSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formPurchase,
        };
        try {
            console.log('data sent:', dataToSend)
            const response = await FetchFunc(
                '/partner-order/create',
                'POST',
                JSON.stringify(dataToSend)
            );
            if (!response.ok) {
                console.log(response.text());
            }
            console.log('Response from server:', response);
            setStatus('Order successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    };


    return (
        <div>
            <div className="agent_property_form">                
                <div className="agent_form_section">
                    <h1>Property Details</h1>
                    <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />                    
                    <h1>Order Overview</h1>
                    <h2>Address: {formPurchase.propertyAddress}</h2>
                    <h2>Inspector: {id}</h2>
                    <h2>ETA: 2-4 Business Days</h2>
                    <button 
                        className="order_now"
                        type="submit"
                    >Order Now</button>
                    <p style={{color: 'red'}}>{status}</p> 
                </div>               
            </div>
        </div>
    );
};

export default OrderOverview;
