import React, { useState } from "react";
import "./OrderOverview.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import FetchFunc from "../API";

const OrderOverview = ({ showOrders }) => {
    const [status, setStatus] = useState('');
    const { id } = useParams();
    const [addSecond,setAddSecond] = useState(false);
    const [ address, setAddress ] = useState();
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

    const handleUpdate = (key, value) => {
        setFormPurchase((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };
    const handleChange = () => {
        const choose = !addSecond
        setAddSecond(choose);
    };
    // const handleInput = (e) => {
    //     setAddress(e.target.value);
    //     setFormPurchase((prevData) => ({
    //         ...prevData,
    //         propertyAddress: address,
    //     }));
    // };

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
            setStatus('File uploaded successfully!');
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
    const handleClick = () => {
        scrollToTop();
        showOrders();
    };

    return (
        <div>
            <div className="agent_property_form">                
                <div className="agent_form_section">
                    <h1>Property Details</h1>
                    <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
                    <form onSubmit={handlePartnerSubmit}>
                        <input 
                            type="text"
                            name="propertyAddress"
                            value={formPurchase.propertyAddress}
                            // onChange={handleInput}
                            placeholder="Property Address*"
                            style={{
                                padding: '0.625rem',
                                position: 'relative',                     
                                height: '1.875rem',
                                width:'90%',
                                marginRight: '0',
                                border: '1px solid #DDD',
                                outline: 'none',
                                borderRadius: '0.625rem',
                            }}
                        />
                        <p>Can't find property?<Link to="/address"><span>Click here</span></Link></p>
                        <div>
                            <label>Do you have an offer accepted and a cooling off period?</label>
                            <div className="agent_selection">
                                <label>
                                    <input 
                                        type="radio"
                                        name="coolingPeriod"  
                                        value="true"
                                        onChange={handleUpdate}
                                    /> Yes
                                </label>
                                <label>
                                    <input 
                                        type="radio"  
                                        name='coolingPeriod'
                                        value="false"
                                        onChange={handleUpdate}
                                    /> No
                                </label>
                            </div>
                            <label>Is the property going to auction?</label>
                            <div className="agent_selection">
                                <label>
                                    <input 
                                       type="radio" 
                                       name="auction" 
                                       value="true"
                                       onChange={handleUpdate}
                                    /> Yes
                                </label>
                                <label>
                                    <input 
                                        type="radio" 
                                        name="auction" 
                                        value="false"
                                        onChange={handleUpdate}
                                    /> No
                                </label>
                            </div>
                            <label>How many bedrooms does the property have?</label>
                            <div className="agent_selection">
                                {[1, 2, 3, 4, 5, '6 or more'].map((bedroom) => (
                                    <label key={bedroom}>
                                        <input 
                                            type="radio" 
                                            name="bedrooms" 
                                            value={bedroom}
                                            onChange={handleUpdate}
                                        /> {bedroom}
                                    </label>
                                ))}
                            </div>
                            <label>Does the property have an additional dwelling / granny flat?</label>
                            <div className="agent_selection">
                                <label>
                                    <input
                                        type="radio" 
                                        name="grannyFlat" 
                                        value="true"
                                        onChange={handleUpdate}
                                    /> Yes
                                </label>
                                <label>
                                    <input 
                                        type="radio" 
                                        name="grannyFlat" 
                                        value="false"
                                        onChange={handleUpdate}
                                    /> No
                                </label>
                            </div>
                        </div>
                        <label>Is there anything in particular you would like the inspector to look out for? (optional)</label>
                        <div>
                            <textarea
                                name='notes'
                                value={formPurchase.notes}
                                onChange={handleUpdate}
                                style={{
                                    width: '90%',
                                    height: '6.25rem',
                                    padding: '3%',  
                                    textAlign: 'left',
                                    resize: 'none',
                                    marginTop: '3%',
                                    marginBottom: '3%',
                                    borderRadius: '1rem',
                                    border: '1px solid #DDD',
                                    outline: 'none',
                                }}
                            />
                        </div>
                        <div className='user_name'>
                            <input 
                                type="text"
                                name="firstName"
                                value={formPurchase.firstName}
                                onChange={handleUpdate}
                                placeholder="First Name*"
                                required
                            />
                            <input 
                                type="text"
                                name="lastName"
                                value={formPurchase.lastName}
                                onChange={handleUpdate}
                                placeholder="Last Name*"
                                required
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formPurchase.email}
                            onChange={handleUpdate}
                            placeholder="Email*"
                            required
                        />
                        <input 
                            type="email"
                            name="confirmEmail"
                            placeholder="Confirm Email*"
                            required
                        />
                        <input 
                            type="text"
                            name="mobile"
                            value={formPurchase.mobile}
                            onChange={handleUpdate}
                            placeholder="Contact Number*"
                            required
                        />
                        <input 
                            type="text"
                            name="homeAddress"
                            value={formPurchase.homeAddress}
                            onChange={handleUpdate}
                            placeholder="Home Address*"
                            required
                        />
                        <label>
                            <input 
                                type="checkbox"
                                name="addSecondPerson"
                                checked={addSecond}
                                onChange={handleChange}
                                style={{ width: '1.2rem' }}
                            />   
                            Add a second person or a company name to the report if you are the successful buyer
                        </label>
                        {addSecond === true && (
                            <div className='second_user_name'>
                                <input 
                                    type="text"
                                    name="secondFirstName"
                                    value={formPurchase.secondFirstName}
                                    onChange={handleUpdate}
                                    placeholder="First Name or Company Name*"
                                />
                                <input 
                                    type="text"
                                    name="secondLastName"
                                    value={formPurchase.secondLastName}
                                    onChange={handleUpdate}
                                    placeholder="Last Name*"
                                />
                            </div>
                        )}
                        <label>
                            <input 
                                type="checkbox"
                                name="firstTimeBuyer"
                                value="true"
                                onChange={handleUpdate}
                                style={{ width: '1.2rem' }}
                            />
                            First time buyer?
                        </label>
                        <h1>Order Overview</h1>
                        <h2>Address: {formPurchase.propertyAddress}</h2>
                        <h2>Inspector: {id}</h2>
                        <h2>ETA: 2-4 Business Days</h2>
                        <button 
                            className="order_now"
                            type="submit"
                        >Order Now</button>
                        <p style={{color: 'red'}}>{status}</p> 
                    </form>
                </div>               
            </div>
        </div>
    );
};

export default OrderOverview;
