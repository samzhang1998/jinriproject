import {useEffect, useState} from 'react';
import FetchFunc from '../API';

function Completion(props) {
  const [ messageBody, setMessageBody ] = useState('');
  const { stripePromise } = props;

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      setMessageBody(error ? `> ${error.message}` : (
        <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
      ));
    });
  }, [stripePromise]);
  
  useEffect(() => {
  
    const submitForm = async () => {
      const formPurchase = sessionStorage.getItem("formPurchase");
      if (!formPurchase) {
        // console.error("No formPurchase data found in sessionStorage.");
        return; // Exit the function if the data is missing
      }
      try {
        const response = await FetchFunc(
          '/customer-order/create',
          'POST',
          formPurchase
        );
  
        if (!response.ok) {
          console.log(await response.text()); // Wait for the response text
        } else {
          console.log('Response from server:', await response.json()); // Process response
          sessionStorage.removeItem("formPurchase");
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
  
    submitForm();
  
  }, [])
  

  const paymentContext = JSON.parse(sessionStorage.getItem("formPurchase"));
  console.log(paymentContext);

  return (
    <>
      <h1>Thank you!</h1>
      <a href="/">home</a>
      <div id="messages" role="alert" style={messageBody ? {display: 'block'} : {}}>{messageBody}</div>
    </>
  );
}

export default Completion;