// import React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './Paymentdetail.css';
// import Policy from "./Policy";
// import FetchFunc from "../API";

// const Paymentdetail = ({ formPurchase, setFormPurchase }) => {
//     const [paymentMethod, setPaymentMethod] = useState('creditCard');
//     const [isPaypalSelected, setIsPaypalSelected] = useState(false);
//     const navigate = useNavigate();
//     const [formData,setFormData] = useState ({
//         cardHolderName: '',
//         cardNumber: '',
//         expireDate: '',
//         cvv: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Payload being sent:", JSON.stringify(formPurchase, null, 2));
//         try {
//             console.log(formPurchase)
//             const response = await FetchFunc('/customer-order/create', 'POST', JSON.stringify(formPurchase));
//             console.log('Payment Response:', response);
//             navigate('/thankyou');
//         } catch (error) {
//             console.error('Error submitting payment:', error);
//             alert('Error processing payment. Please try again.');
//         }
//     };

//     const handlePaymentMethodChange = (e) => {
//         setPaymentMethod(e.target.value);
//     };
//     const handlePaypalSelected = () => {
//         setIsPaypalSelected(true)
//     };
//     const handleCardSelected = () => {
//         setIsPaypalSelected(false)
//     };

//     const [showModal, setShowModal] = useState(false);
//     const [test, setTest] = useState(false);
//     const [isChecked, setIsChecked] = useState(false);
//     const handleCheckboxChange = () => {
//         const newCheckedState = !isChecked;
//         setIsChecked(newCheckedState);
//         if (newCheckedState) {
//             setShowModal(true); 
//         } else {
//             setShowModal(false);
//         }
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//     };

//     const handleClick = () => {
//         setTest(true);
//     };

//     return (
//         <div className="payment_detail">
//             <h1>Payment Details</h1>
//             <hr style={{background: '#DDD', width: '100%', marginBottom: '5%',}} />
//             <div className="payment_method">
//                 <label
//                     onClick={handleCardSelected}
//                     style={{
//                         background: isPaypalSelected ? '#F9F8F8' : 'rgba(0, 130, 134, 0.17)',
//                         border: isPaypalSelected ? '1px solid #BDBDBD' : '1px solid #008286',
//                         borderRadius: '1rem',
//                         width: '95%',
//                         height: '4.3rem',
//                         display: 'flex',
//                         alignItems: 'center',
//                         marginBottom: '5%',
//                         paddingLeft: '5%',
//                         cursor: 'pointer',
//                     }}
//                 >
//                     <input 
//                         type="radio"
//                         name="paymentMethod"
//                         value="creditCard"
//                         checked={paymentMethod === 'creditCard'}
//                         onChange={handlePaymentMethodChange}
//                         style={{ marginRight: '0.625rem', width: '1.2rem' }}
//                     />
//                     Credit Card
//                 </label>
//                 <label
//                     onClick={handlePaypalSelected}
//                     style={{
//                         background: isPaypalSelected ? 'rgba(0, 130, 134, 0.17)' :  '#F9F8F8',
//                         border: isPaypalSelected ? '1px solid #008286' :  '1px solid #BDBDBD',
//                         borderRadius: '1rem',
//                         width: '95%',
//                         height: '4.3rem',
//                         display: 'flex',
//                         alignItems: 'center',
//                         marginBottom: '5%',
//                         paddingLeft: '5%',
//                         cursor: 'pointer',
//                     }}
//                 >
//                     <input 
//                         type="radio"
//                         name="paymentMethod"
//                         value="paypal"
//                         checked={paymentMethod === 'paypal'}
//                         onChange={handlePaymentMethodChange}
//                         style={{ marginRight: '0.625rem', width: '1.2rem' }}
//                     />
//                     Paypal
//                 </label>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 {paymentMethod === 'creditCard' && (
//                     <div className="card_detail">
//                         <input 
//                             type="text"
//                             id="cardHolderName"
//                             name="cardHolderName"
//                             placeholder="Card Holder Name*"
//                             value={formData.cardHolderName}
//                             onChange={handleChange}
//                             required
//                         />
//                         <input 
//                             type="text"
//                             id="cardNumber"
//                             name="cardNumber"
//                             placeholder="Card Number*"
//                             value={formData.cardNumber}
//                             onChange={handleChange}
//                             required
//                         />
//                         <div className="cvv">
//                             <input 
//                                 type="text"
//                                 id="expireDate"
//                                 name="expireDate"
//                                 placeholder="Expired Date*"
//                                 value={formData.expireDate}
//                                 onChange={handleChange}
//                                 required
//                             />
//                             <input 
//                                 type="text"
//                                 id="cvv"
//                                 name="cvv"
//                                 placeholder="CVV*"
//                                 value={formData.cvv}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                     </div>
//                 )}
//                 <div className="check_for_sure">
//                     <h2>Check for Sure Terms & Conditions</h2>
//                     <p>*Please agree to the following to proceed with your order.</p>
//                     <label>
//                         <input
//                             checked={isChecked}
//                             onChange={handleCheckboxChange} 
//                             type="checkbox"
//                             style={{
//                                 width: '1.2rem',
//                             }}
//                             required
//                         />
//                         <span>I have read and agree to Check for sure's Terms & Conditions (which 
//                             includes our Collection Notice and Cancellation charges policy). 
//                             A 'Late Cancellation' could lead to cancellation charges that can 
//                             exceed your initial payment, up to a maximum of 50% of the retail 
//                             cost of a report.</span>
//                     </label>
//                 </div>
//                 <Policy showModal={showModal} onClose={handleCloseModal} />
//                 {/* <button 
//                     disabled={!isChecked} 
//                     type="submit" 
//                     className="pay_now"
//                 >Pay Now</button> */}
//                 <button
//                     disabled={!isChecked}  
//                     className="pay_now"
//                     onClick={handleClick}
//                 >
//                     Pay Now
//                 </button>
//                 {test === true && <div style={{ color: 'red'}}>This function is testing!</div>}
//             </form>
//         </div>
//     );
// };

// export default Paymentdetail;

import {
  PaymentElement,
  LinkAuthenticationElement
} from '@stripe/react-stripe-js'
import {useState} from 'react'
import {Elements, useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

export default function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    
    // const cardElement = elements.getElement(CardElement);
    
    // setIsLoading(true);
    // console.log(clientSecret)
    // const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: cardElement,
    //     billing_details: {
    //       name: 'John Doe', // Collect the user's name
    //     },
    //   },
    // });

    // if (error) {
    //   console.error(error.message);
    //   setPaymentStatus(`Payment failed: ${error.message}`);
    // } else if (paymentIntent && paymentIntent.status === 'succeeded') {
    //   setPaymentStatus('Payment successful!');
    // }
    
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/complete`, // Optional: Use if redirection is required
        },
      });
  
      if (error) {
        console.error("Payment failed:", error.message);
        setPaymentStatus(`Payment failed: ${error.message}`);
      } else {
        setPaymentStatus("Payment successful!");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setPaymentStatus("An unexpected error occurred. Please try again.");
    }
    
    
    // const { error } = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     // Make sure to change this to your payment completion page
    //     return_url: `${window.location.origin}/complete`,
    //   },
    // });

    // stripe
    //   .confirmCardPayment({clientSecret}, {
    //     payment_method: {
    //       card: elements,
    //       billing_details: {
    //         name: 'Jenny Rosen',
    //       },
    //     },
    //   })
    //   .then(function(result) {
    //     // Handle result.error or result.paymentIntent
    //   });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message);
    // } else {
    //   setMessage("An unexpected error occured.");
    // }

    setIsLoading(false);
  }

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* <LinkAuthenticationElement id="link-authentication-element"
        // Access the email value like so:
        // onChange={(event) => {
        //  setEmail(event.value.email);
        // }}
        //
        // Prefill the email field like so:
        // options={{defaultValues: {email: 'foo@bar.com'}}}
        /> */}
      <PaymentElement id="payment-element" />
      {/* <CardElement 
        options={{
          style: CARD_ELEMENT_OPTIONS,
          hidePostalCode: true, // Hides the postal code field
        }}
       id="card-element" /> */}
      <button disabled={isLoading || !stripe || !elements} id="submit" className='tostep3'>
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {paymentStatus && <div id="payment-message">{paymentStatus}</div>}
    </form>
  )
}