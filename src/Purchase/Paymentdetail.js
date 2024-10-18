import React from "react";
import { useState } from "react";
import './Paymentdetail.css';

const Paymentdetail = () => {
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [isPaypalSelected, setIsPaypalSelected] = useState(false);
    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };
    const handlePaypalSelected = () => {
        setIsPaypalSelected(true)
    };
    const handleCardSelected = () => {
        setIsPaypalSelected(false)
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
            {paymentMethod === 'creditCard' && (
                <div className="card_detail">
                    <input 
                        type="text"
                        placeholder="Card Holder Name*"
                        required
                    />
                    <input 
                        type="text"
                        placeholder="Card Number*"
                        required
                    />
                    <div className="cvv">
                        <input 
                            type="text"
                            placeholder="Expired Date*"
                            required
                        />
                        <input 
                            type="text"
                            placeholder="CVV*"
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
                <label>
                    <input 
                        type="checkbox"
                        style={{
                            width: '1.2rem',
                        }}
                        required
                    />
                    <span>I acknowledge that I am engaging a Third Party Service Provider(s). I agree 
                    to the Terms & Conditions of this Third Party Service Provider.</span>
                </label>
            </div>
            <button type="submit" className="pay_now">Pay Now</button>
        </div>
    );
};

export default Paymentdetail;