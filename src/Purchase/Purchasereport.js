import React, { useState,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FetchFunc from '../API';
import YourDetailsForm from './Yourdetails';
// import Paymentdetail from './CheckoutForm';
import Header from '../Header';
import './Purchasereport.css';
import check from '../asset/Check_fill.png';
import back from '../asset/Expand_left.png';
import Payment from './Payment';


// const Backend_url = 'http://localhost:8080';
const Backend_url = '/api';

const StepOne = ({ showStepTwo, updatePaymentSummary,formPurchase, onUpdate }) => {
    const isReportOk = localStorage.getItem('reportOK') === 'true';
    const [hasGrannyFlat, setHasGrannyFlat] = useState(formPurchase.grannyFlat);
    const [errors, setErrors] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const role = localStorage.getItem('role');

    const validateCustomerField = (name, value, relatedValue) => {
        let error = '';
        const requiredFields = ['firstName', 'lastName', 'homeAddress', 'mobile'];
        if (requiredFields.includes(name) && !value) {
            error = 'This field is required';
            return error;
        }

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = 'Invalid email format';
            }
        } else if (name === 'mobile') {
            const mobileRegex = /^(\+61|0)4\d{8}$/;
            if (!mobileRegex.test(value)) {
                error = 'Invalid mobile number';
            }
        } else if (name === 'confirmEmail') {
            if (value !== relatedValue) {
                error = 'Emails do not match';
            }
        }
        // console.log(`Validation result for ${name}: ${error}`);
        return error;
    };

    const validatePartnerField = (name, value) => {
        let error = '';
        const requiredFields = ['agentFirstName', 'agentLastName', 'agentMobile', 'agentEmail'];
        if (requiredFields.includes(name) && !value) {
            error = 'This field is required';
            return error;
        }

        if (name === 'agentEmail') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = 'Invalid email format';
            }
        } else if (name === 'agentMobile') {
            const mobileRegex = /^(\+61|0)4\d{8}$/;
            if (!mobileRegex.test(value)) {
                error = 'Invalid mobile number';
            }
        }
        // console.log(`Validation result for ${name}: ${error}`);
        return error;
    };

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    };
    const handleCustomerClick = (e) => {
        e.preventDefault();
        const newErrors = {};
        let isValid = true;
        Object.keys(formPurchase).forEach((key) => {
            const relatedValue = key === 'confirmEmail' ? formPurchase.email : null;
            const error = validateCustomerField(key, formPurchase[key], relatedValue);
            if (error) {
                isValid = false;
                newErrors[key] = error;
            }
        });
        if(formPurchase['email'] !== confirmEmail) {
            isValid = false;
            newErrors['confirmEmail'] = 'Emails do not match';
        }
        setErrors(newErrors);
        // console.log(newErrors)
        if (isValid) {
            // console.log('Data saved:', formPurchase);
            showStepTwo();
            scrollToTop();
        } else {
            // console.log('Form has errors:', newErrors);
        }        
    };

    const handlePartnerClick = (e) => {
        e.preventDefault();
        const newErrors = {};
        let isValid = true;
        Object.keys(formPurchase).forEach((key) => {
            const error = validatePartnerField(key, formPurchase[key]);
            if (error) {
                isValid = false;
                newErrors[key] = error;
            }
        });
        setErrors(newErrors);
        // console.log(newErrors)
        if (isValid) {
            // console.log('Data saved:', formPurchase);
            showStepTwo();
            scrollToTop();
        } else {
            // console.log('Form has errors:', newErrors);
        }        
    };

    const handleUpdate = (e) => {
        const { name, value, type, checked } = e.target;
        // console.log("check is " + checked + " value is " + value + " type " + type)
        if (type === 'checkbox') {
            onUpdate(name, checked);
        } else if (name === 'coolingPeriod' || name === 'auction') {
            onUpdate(name, value === 'true');
        } else {
            onUpdate(name, value);
        }
    };
    // console.log(formPurchase);
    
    const handleGrannyFlatChange = (e) => {
        const isSelected = e.target.value === 'yes';
        const { name, checked } = e.target;
        onUpdate(name, checked);
        setHasGrannyFlat(isSelected);
        updatePaymentSummary({ hasGrannyFlat: isSelected, grannyFlatPrice: isSelected ? 99 : 0 }); 
    };

    return (
        <div>
            <div className="property_form">                
                <div className="form_section">
                    <h1>Property Details</h1>
                    <hr style={{
                        background: '#DDD', 
                        width: '100%',
                        height: '1px', 
                        marginTop: '5%', 
                        marginBottom: '5%',
                        border: 'none',
                        }} 
                    />
                    <div>
                        <label>Do you have an offer accepted and a cooling off period?</label>
                        <div className="selection">
                            <label>
                                <input 
                                    type="radio"
                                    name="coolingPeriod"  
                                    value="true"
                                    checked={formPurchase.coolingPeriod === true}
                                    onChange={handleUpdate}
                                    style={{ width: '1.2rem' }}
                                /> Yes
                            </label>
                            <label>
                                <input 
                                    type="radio"  
                                    name='coolingPeriod'
                                    value="false"
                                    checked={formPurchase.coolingPeriod === false}
                                    onChange={handleUpdate}
                                    style={{ width: '1.2rem' }}
                                /> No
                            </label>
                        </div>
                        <label>Is the property going to auction?</label>
                        <div className="selection">
                            <label>
                                <input 
                                    type="radio" 
                                    name="auction" 
                                    value="true"
                                    checked={formPurchase.auction === true}
                                    onChange={handleUpdate}
                                    style={{ width: '1.2rem' }}
                                /> Yes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="auction" 
                                    value="false"
                                    checked={formPurchase.auction === false}
                                    onChange={handleUpdate}
                                    style={{ width: '1.2rem' }}
                                /> No
                            </label>
                        </div>
                        {!isReportOk && <label>How many bedrooms does the property have?</label>}
                        {!isReportOk && <div className="selection">
                            {['1', '2', '3', '4', '5', '6 or more'].map((bedroom) => (
                                <label key={bedroom}>
                                    <input 
                                        type="radio" 
                                        name="numberBedrooms" 
                                        value={bedroom}
                                        checked={formPurchase.numberBedrooms === bedroom}
                                        onChange={handleUpdate}
                                        style={{ width: '1.2rem' }}
                                    /> {bedroom}
                                </label>
                            ))}
                        </div>}
                        <label>Does the property have an additional dwelling / granny flat?</label>
                        <div className="selection">
                            <label>
                                <input
                                    type="radio" 
                                    name="grannyFlat" 
                                    value="yes"
                                    checked={hasGrannyFlat === true}
                                    onChange={handleGrannyFlatChange}
                                    style={{ width: '1.2rem' }}
                                /> Yes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="grannyFlat" 
                                    value="no"
                                    checked={hasGrannyFlat === false}
                                    onChange={handleGrannyFlatChange}
                                    style={{ width: '1.2rem' }}
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
                                padding: '5%',  
                                textAlign: 'left',
                                resize: 'none',
                                marginTop: '3%',
                                borderRadius: '1rem',
                                border: '1px solid #DDD',
                                outline: 'none',
                            }}
                        />
                    </div>
                </div>
            </div>
            <YourDetailsForm 
                formPurchase={formPurchase} 
                onUpdate={onUpdate}
                validateCustomerField={validateCustomerField}
                errors={errors}
                setConfirmEmail={setConfirmEmail}
            />
            {role !== 'Partner' && <button onClick={handleCustomerClick} className='tostep2'>NEXT</button>}
            {role === 'Partner' && <button onClick={handlePartnerClick} className='tostep2'>NEXT</button>}
        </div>
    );
};

const StepTwo = ({ showStepThree, updatePaymentSummary, formPurchase, setFormPurchase, clientSecret, setClientSecret, handlePartnerSubmit, summary, selectedServices, setSelectedServices }) => {
    // const [selectedServices,setSelectedServices] = useState([]);
    const [services,setServices] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const { price } = location.state || {};
    // console.log(price);
    const totalAmount = (parseFloat(price) + parseFloat(totalPrice) + parseFloat(summary.hasGrannyFlat ? 99 : 0)) * 100;
    // console.log(totalAmount);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await FetchFunc(
                    '/service/all',
                    'GET',
                );
                if (response.status === '401') {
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
                setServices(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchServices();
    }, [navigate]);

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    };

    const handleClick = () => {
        const dataToSend = {
            currency: 'aud',
            amount: totalAmount,
            paymentMethod: 'card',
            ...formPurchase,
        };    
        // console.log('Sending data:', dataToSend);    
        try {
            fetch(`${Backend_url}/create-payment-intent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse JSON response
            })
            .then(data => {
                if (data.clientSecret) {
                    // console.log('Client Secret:', data.clientSecret);
                    setClientSecret(data.clientSecret); // Set client secret
                    // console.log('Client Secret:', data.clientSecret);
                } else {
                    console.error("Client secret not found in response");
                }
            })

            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }
            // const secret = response.json();
            // setClientSecret(secret.clientSecret);
            // console.log('1111Client Secret:', clientSecret);
            showStepThree();
            scrollToTop();
        } catch (error) {
            console.error('Error creating payment intent:', error);
        }
    };

    const role = localStorage.getItem('role');

    const calculateTotalPrice = (services) => {
        return services.reduce((sum, service) => sum + (service.price || 0), 0);
    };

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
            
            const totalPrice = calculateTotalPrice(updatedServices); // Calculate the total price
            updatePaymentSummary({
                getService: updatedServices, // Update the list of services
                servicePrice: totalPrice, // Update the total price
            });
            setTotalPrice(totalPrice);            
            
            return updatedServices;
            
        });
        // updatePaymentSummary({ getService: selected, servicePrice: selected ? 0 : 0 });
    };
    // console.log(formPurchase)
    // console.log(selectedServices)
    return (
        <div>
            <div className="service_details">
                <h1>Addition Service</h1>
                <hr style={{
                    background: '#DDD', 
                    width: '100%', 
                    marginTop: '5%', 
                    marginBottom: '5%',
                    border: 'none',
                    height: '1px'
                    }} 
                />
                {Array.isArray(services) && services.map((service) => (
                    <div 
                        key={service.serviceId}
                        onClick={() => handleGetService(service.serviceId, services)}
                        style={{
                            background: selectedServices.some((selected) => selected.serviceId === service.serviceId)
                                ? 'rgba(0, 130, 134, 0.17)'
                                : '#F9F8F8',
                            border: selectedServices.some((selected) => selected.serviceId === service.serviceId)
                                ? '1px solid #008286'
                                : 'none',
                            borderRadius: '1rem',
                            width: '95%',
                            marginBottom: '5%',
                            paddingLeft: '5%',
                            cursor: 'pointer',
                        }}
                    >
                        <h1>{service.title}</h1>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
            {role === 'Partner' && <button 
                onClick={handlePartnerSubmit}
                className='tostep3'
            >ORDER</button>}
            {role !== 'Partner' && <button
                onClick={handleClick}
                className='tostep3'
            >NEXT</button>}
        </div>
    );
};

const StepThree = ({ clientSecret }) => {
    // console.log("here is secret: " + clientSecret)
    return (
        <div>
            <Payment clientSecret={clientSecret}/>
        </div>
    );
};

const PaymentSummary = ({ summary }) => {
    const location = useLocation();
    const role = localStorage.getItem('role');
    const { address, query, price } = location.state || {};
    const totalAmount = parseFloat(price) + parseFloat(summary.hasGrannyFlat ? 99 : 0) + parseFloat(summary.servicePrice);

    return (
        <div className="order_summary">
            <h3>Order Summary</h3>
            <div className="address">
                <p>{query || address}</p>
            </div>
            <hr style={{
                background: '#DDD', 
                width: '100%', 
                marginTop: '5%', 
                marginBottom: '5%',
                border: 'none',
                height: '1px'
                }} 
            />
            <div>
                <div className="calculation">
                    <p>Building & Pest Report</p>{role !== 'Partner' && <span>{price}</span>}
                </div>
                <div className="report_available">
                    <img src={check} alt="check" />
                    <h4>Report available now!</h4>
                </div>
                {summary.hasGrannyFlat && (
                    <div className="calculation">
                        <p>Second Dwelling / Granny Flat</p>{role !== 'Partner' && <span>$99</span>}
                    </div>
                )}
            </div>
            <div>
                <div className="addition">Additional Services</div>
                {summary.getService && summary.getService.map(item => (
                    //  <div className="calculation2"><p>{item.title}</p><span>{item.price}</span></div>
                    <div className="calculation2" key={item.serviceId}>
                        <p>{item.title}</p>
                        {role !== 'Partner' && <span>${item.price}</span>}
                    </div>
                ))}
            </div>
            <hr style={{
                background: '#DDD', 
                width: '100%', 
                marginTop: '5%', 
                marginBottom: '5%',
                border: 'none',
                height: '1px'
                }} 
            />
            {role !== 'Partner' && <div className="total"><h4>Total <p>(GST Inc)</p>:</h4><h5>${totalAmount}</h5></div>}
        </div>
    );
};

const PurchasePage = () => {
    const id = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const location = useLocation();
    const { query, address } = location.state || {};
    const [selectedServices,setSelectedServices] = useState([]);
    const [formPurchase,setFormPurchase] = useState({
        propertyAddress: address || query,
        coolingPeriod: false,
        auction: false,
        numberBedrooms: null,
        grannyFlat: false,
        notes: '',
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
        services: [],
    });

    const handleUpdate = (key, value) => {
        setFormPurchase((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handlePartnerSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formPurchase,
        };
        try {
            // console.log('data sent:', dataToSend)
            const response = await FetchFunc(
                '/partner-order/create',
                'POST',
                JSON.stringify(dataToSend)
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
            } else {
                // console.log('Response from server:', response);
                navigate('/thankyou');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState('');
    const [paymentSummary, setPaymentSummary] = useState({
        hasGrannyFlat: false,
        grannyFlatPrice: 0,
        getService: [],
        servicePrice: 0,
    });

    const showStepTwo = () => {
        setCurrentStep(2);
    };
    const showStepThree = () => {
        setCurrentStep(3);
    };
    const showStepOne = () => {
        setCurrentStep(1);
    };

    const updatePaymentSummary = (newSummary) => {
        setPaymentSummary((prevSummary) => ({ ...prevSummary, ...newSummary }));
    };

    // console.log(paymentSummary);

    const handleBack = () => {
        navigate(-1);
    };
    
    sessionStorage.setItem("formPurchase", JSON.stringify(formPurchase));

    return (
        <div className='purchase1'>
            <Header />
            <div className='header_bg'></div>
            {currentStep === 1 && (                
                <button className='back' onClick={handleBack}>
                        <div className='back_text'>
                            <img src={back} alt='back' />
                            <p>Back</p>
                        </div>
                </button>
            )}
            {currentStep === 2 && (                
                <button onClick={showStepOne} className='back'>
                    <div className='back_text'>
                        <img src={back} alt='back' />
                        <p>Back</p>
                    </div>
                </button>                
            )}
            {currentStep === 3 && (                
                <button onClick={showStepTwo} className='back'>
                    <div className='back_text'>
                        <img src={back} alt='back' />
                        <p>Back</p>
                    </div>
                </button>
            )}
            <div className='report_title'>Building & Pest Report</div>
            <div className='step_progress'>
                <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-label">Required Details</div>
                </div>
                <div className="step" 
                    style={{
                        background: currentStep === 1 ? '#F2F2F2' : '#fff',
                    }}
                >
                    <div className="step-number" 
                        style={{
                            background: currentStep === 1 ? '#A4A4A4' : '#008286',
                        }}
                    >2</div>
                    <div className="step-label"
                        style={{
                            color: currentStep === 1 ? '#A4A4A4' : '#343434',
                        }}
                    >Additional Services</div>
                </div>
                <div className="step" 
                    style={{
                        background: currentStep === 3 ? '#fff' : '#F2F2F2',
                    }}
                >
                    <div className="step-number"
                        style={{
                            background: currentStep === 3 ? '#008286' : '#A4A4A4',
                        }}
                    >3</div>
                    <div className="step-label" 
                        style={{
                            color: currentStep === 3 ? '#343434' : '#A4A4A4',
                        }}
                    >Payment</div>
                </div>
            </div>
            <div className='payment_steps'>
                {role === 'Admin' && <h1>Not Available</h1>}
                {role === 'Partner' && 
                    <div className='payment_choice'>                        
                        {currentStep === 1 && 
                            <StepOne 
                                showStepTwo={showStepTwo} 
                                updatePaymentSummary={updatePaymentSummary}
                                formPurchase={formPurchase} 
                                onUpdate={handleUpdate}
                                setFormPurchase={setFormPurchase}
                            />
                        }
                        {currentStep === 2 && (
                            <StepTwo showStepThree={showStepThree} 
                                showStepOne={showStepOne} 
                                updatePaymentSummary={updatePaymentSummary}
                                formPurchase={formPurchase} 
                                onUpdate={handleUpdate}
                                setFormPurchase={setFormPurchase}
                                handlePartnerSubmit={handlePartnerSubmit}
                                summary={paymentSummary}
                                selectedServices={selectedServices}
                                setSelectedServices={setSelectedServices}
                            />
                        )}
                        {currentStep === 3 && 
                            <StepThree showStepTwo={showStepTwo} 
                                showStepOne={showStepOne}
                                updatePaymentSummary={updatePaymentSummary}
                                formPurchase={formPurchase} 
                                onUpdate={handleUpdate}
                                setFormPurchase={setFormPurchase} 
                            />
                        }
                    </div>
                }
                {(role === 'Customer' || role == null) &&
                    <div className='payment_choice'>
                        {currentStep === 1 && 
                            <StepOne 
                                showStepTwo={showStepTwo} 
                                updatePaymentSummary={updatePaymentSummary}
                                formPurchase={formPurchase} 
                                onUpdate={handleUpdate}
                                setFormPurchase={setFormPurchase}
                            />
                        }
                        {currentStep === 2 && (
                            <StepTwo showStepThree={showStepThree} 
                                showStepOne={showStepOne}
                                updatePaymentSummary={updatePaymentSummary}
                                formPurchase={formPurchase} 
                                onUpdate={handleUpdate}
                                setFormPurchase={setFormPurchase}
                                setClientSecret={setClientSecret} 
                                clientSecret={clientSecret}
                                summary={paymentSummary}
                                selectedServices={selectedServices}
                                setSelectedServices={setSelectedServices}
                            />
                        )}
                        {currentStep === 3 &&                      
                            <StepThree showStepTwo={showStepTwo} 
                                showStepOne={showStepOne}
                                updatePaymentSummary={updatePaymentSummary}
                                formPurchase={formPurchase} 
                                onUpdate={handleUpdate}
                                setFormPurchase={setFormPurchase}
                                clientSecret={clientSecret}
                            />                    
                        }
                    </div>
                }                
                {role !== 'Admin' && <div className='payment_summary'>
                    <PaymentSummary summary={paymentSummary} />
                </div>}
            </div>
        </div>   
    );
};

export default PurchasePage;