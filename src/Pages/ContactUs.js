import React, { useState } from 'react';
import Header from '../Header';
import './ContactUs.css';
import email from '../asset/Message_alt_fill.png';
import phone from '../asset/Phone_fill.png';
import address from '../asset/Pin_alt_fill1.png';
import { PostData } from '../API';

const ContactUs = () => {
  const [formData,setFormData] = useState ({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    yourMessage: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PostData('/data', formData);
      setSuccess(true);
    } catch (err) {
      setError('Failed to send data');
    }
  };

  return (
    <div className='contact_us'>
      <div className='background1'>
        <Header />
        <div className='overlay_text1'>
          <h1>Contact Us</h1>
          <p>“Lorem Ipsum is simply dummy text of the printing and typesetting 
            industry. Lorem Ipsum has been the industry's standard dummy text 
            ever since the 1500s, when an unknown printer took”</p>
        </div>
      </div>
      <div className='contact_details'>
        <div className='contact_method'>
          <div className='contact_choice'>
            <div className='fill'>
              <img src={email} alt='email' />
            </div>
            <div>
              <h2>Email</h2>
              <p>sales@checkforsure.com.au</p>
            </div>
          </div>
          <div className='contact_choice'>
            <div className='fill'>
              <img src={phone} alt='phone' />
            </div>
            <div>
              <h2>Phone</h2>
              <p>02 6542 6877</p>
            </div>
          </div>
          <div className='contact_choice'>
            <div className='fill'>
              <img src={address} alt='address' />
            </div>
            <div>
              <h2>Address</h2>
              <p>118 Pitt Street, Sydney NSW 2000</p>
            </div>
          </div>
        </div>
        <div className='send_message'>
          <h1>Send Message</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting 
            industry. Lorem Ipsum has been the industry's standard dummy 
            text ever since the 1500s, when an unknown printer took</p>
          <form onSubmit={handleSubmit}>
            <div className='message_name'>
              <input 
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name*"
                required
              />
              <input 
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name*"
                required
              />
            </div>
            <div className='message_details'>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email*"
                required
              />
              <input 
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Mobile*"
                required
              />
            </div>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your message"
              rows="4"
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>
              Thank you for choosing us, our team will contact you soon!
            </p>}
            <button type='submit'>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;