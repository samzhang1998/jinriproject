import {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import FetchFunc from '../API';
import back from "../asset/Expand_left.png";
import { stripePromise } from './Payment';

function Completion() {
  const [ messageBody, setMessageBody ] = useState('');
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const { stripePromise } = props;
  // const stripePromise = loadStripe("pk_test_51QPcunABwpEZeajXo2pch6nBD11Mj3NckAnEKJIXBa6GVNbByataVG6CuGnlRlfWmoOt9RpHatjU47piXri1d1O700u6TfquCT");

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

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      
      if (error) {
        // setMessageBody(`> ${error.message}`);
        setErrorMsg(`> ${error.message}`);
      } else if (paymentIntent) {
        setMessageBody((
          <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
        ));
        // submitForm();
        setStatus(paymentIntent.status);
      }
      
      
    });
    
  }, []);
  
  useEffect(() => {
    if(status === 'succeeded') {
      submitForm();
    }
    console.log(status);
  }, status)
  
  
  // useEffect(() => {
  //   const submitForm = async () => {
  //     const formPurchase = sessionStorage.getItem("formPurchase");
  //     if (!formPurchase) {
  //       // console.error("No formPurchase data found in sessionStorage.");
  //       return; // Exit the function if the data is missing
  //     }
  //     try {
  //       const response = await FetchFunc(
  //         '/customer-order/create',
  //         'POST',
  //         formPurchase
  //       );
  
  //       if (!response.ok) {
  //         console.log(await response.text()); // Wait for the response text
  //       } else {
  //         console.log('Response from server:', await response.json()); // Process response
  //         sessionStorage.removeItem("formPurchase");
  //       }
  //     } catch (error) {
  //       console.error('Error submitting form:', error);
  //     }
  //   };
  
  //   submitForm();
  
  // }, [])
  

  const paymentContext = JSON.parse(sessionStorage.getItem("formPurchase"));
  console.log(paymentContext);

  return (
    <div className="thank_you">
      <Header />
      <div className='header_bg'></div>
        <button className='back' onClick={() => navigate('/')}>
          <div className='back_text'>
            <img src={back} alt='back' />
            <p>Back</p>
          </div>
        </button>
      {errorMsg ? 
        <div className="thank_you_text" id="messages" role="alert" style={messageBody ? {display: 'block'} : {}}><p>{messageBody}</p></div>
        :
        <div className="thank_you_text">
          <h1>Thank You!</h1>
          <p>A Confirmation has been sent to your email! 
            You can check via your email or our customer portal.</p>
          <Link to='/' style={{textDecoration: 'none'}}><button className="back_to_home">Back</button></Link>
        </div>
      }
    </div>
  );
}

export default Completion;