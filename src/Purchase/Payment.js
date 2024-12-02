import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import "./Payment.css";

// const CheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const cardElement = elements.getElement(CardElement);

//         const response = await fetch('http://localhost:8080/create-payment-intent', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ amount: 5000 }),
//         });

//         const { clientSecret } = await response.json();

//         const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: cardElement,
//             },
//         });

//         if (error) {
//             console.error('Payment failed:', error.message);
//         } else if (paymentIntent.status === 'succeeded') {
//             console.log('Payment succeeded!');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement />
//             <button type="submit" disabled={!stripe}>
//                 Pay
//             </button>
//         </form>
//     );
// };

function Payment({ clientSecret }) {
    const stripePromise = loadStripe("pk_test_51QPcunABwpEZeajXo2pch6nBD11Mj3NckAnEKJIXBa6GVNbByataVG6CuGnlRlfWmoOt9RpHatjU47piXri1d1O700u6TfquCT");
    console.log("payment here:" + clientSecret)
    return (
    <div className='payment_detail'>
        <h1>Payment</h1>
        <hr style={{
            background: '#DDD', 
            width: '100%', 
            marginTop: '5%', 
            marginBottom: '5%',
            border: 'none',
            height: '1px'
            }} 
        />
        {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret, locale: 'en' }}>
                <CheckoutForm clientSecret={clientSecret}/>
            </Elements>
        )}
    </div>
  );
}

export default Payment;