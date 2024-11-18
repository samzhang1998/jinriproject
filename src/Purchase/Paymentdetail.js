import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Paymentdetail.css';
import Policy from "./Policy";
import { PostData } from "../API";

const Paymentdetail = () => {
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [isPaypalSelected, setIsPaypalSelected] = useState(false);
    const navigate = useNavigate();
    const [formData,setFormData] = useState ({
        cardHolderName: '',
        cardNumber: '',
        expireDate: '',
        cvv: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await PostData('/card', formData);
            console.log('Payment Response:', response);
            navigate('/thankyou');
        } catch (error) {
            console.error('Error submitting payment:', error);
            alert('Error processing payment. Please try again.');
        }
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };
    const handlePaypalSelected = () => {
        setIsPaypalSelected(true)
    };
    const handleCardSelected = () => {
        setIsPaypalSelected(false)
    };

    const [showModal, setShowModal] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        if (newCheckedState) {
            setShowModal(true); 
        } else {
            setShowModal(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="payment_detail">
            <h1>Payment Details</h1>
            <hr style={{background: '#DDD', width: '100%', marginBottom: '5%',}} />
            <div className="payment_method">
                <label
                    onClick={handleCardSelected}
                    style={{
                        background: isPaypalSelected ? '#F9F8F8' : 'rgba(0, 130, 134, 0.17)',
                        border: isPaypalSelected ? '1px solid #BDBDBD' : '1px solid #008286',
                        borderRadius: '1rem',
                        width: '95%',
                        height: '4.3rem',
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '5%',
                        paddingLeft: '5%',
                        cursor: 'pointer',
                    }}
                >
                    <input 
                        type="radio"
                        name="paymentMethod"
                        value="creditCard"
                        checked={paymentMethod === 'creditCard'}
                        onChange={handlePaymentMethodChange}
                        style={{ marginRight: '0.625rem', width: '1.2rem' }}
                    />
                    Credit Card
                </label>
                <label
                    onClick={handlePaypalSelected}
                    style={{
                        background: isPaypalSelected ? 'rgba(0, 130, 134, 0.17)' :  '#F9F8F8',
                        border: isPaypalSelected ? '1px solid #008286' :  '1px solid #BDBDBD',
                        borderRadius: '1rem',
                        width: '95%',
                        height: '4.3rem',
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '5%',
                        paddingLeft: '5%',
                        cursor: 'pointer',
                    }}
                >
                    <input 
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={handlePaymentMethodChange}
                        style={{ marginRight: '0.625rem', width: '1.2rem' }}
                    />
                    Paypal
                </label>
            </div>
            <form>
            {paymentMethod === 'creditCard' && (
                <div className="card_detail">
                    <input 
                        type="text"
                        id="cardHolderName"
                        name="cardHolderName"
                        placeholder="Card Holder Name*"
                        value={formData.cardHolderName}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="Card Number*"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                    />
                    <div className="cvv">
                        <input 
                            type="text"
                            id="expireDate"
                            name="expireDate"
                            placeholder="Expired Date*"
                            value={formData.expireDate}
                            onChange={handleChange}
                            required
                        />
                        <input 
                            type="text"
                            id="cvv"
                            name="cvv"
                            placeholder="CVV*"
                            value={formData.cvv}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            )}
            <div className="check_for_sure">
                <h2>Check for Sure Terms & Conditions</h2>
                <p>*Please agree to the following to proceed with your order.</p>
                <label>
                    <input
                        checked={isChecked}
                        onChange={handleCheckboxChange} 
                        type="checkbox"
                        style={{
                            width: '1.2rem',
                        }}
                        required
                    />
                    <span>I have read and agree to Check for sure's Terms & Conditions (which 
                    includes our Collection Notice and Cancellation charges policy). 
                    A 'Late Cancellation' could lead to cancellation charges that can 
                    exceed your initial payment, up to a maximum of 50% of the retail 
                    cost of a report.</span>
                </label>
            </div>
            <Policy showModal={showModal} onClose={handleCloseModal} />
            <button 
                disabled={!isChecked} 
                type="submit" 
                className="pay_now"
                onClick={handleSubmit}
            >Pay Now</button>
            </form>
        </div>
    );
};

export default Paymentdetail;