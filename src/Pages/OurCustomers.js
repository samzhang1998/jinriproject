import React, { useState } from "react";
import "./OurCustomers.css";
import customer1 from '../asset/customer1.png';
import customer2 from '../asset/customer2.png';
import customer3 from '../asset/customer3.png';
import customer4 from '../asset/customer4.png';
import customer5 from '../asset/customer5.png';
import customer6 from '../asset/customer6.png';
import customer7 from '../asset/customer7.png';
import customer8 from '../asset/customer8.png';
import left from '../asset/ArrowSquareLeft.png';
import right from '../asset/ArrowSquareRight.png';
import info from '../asset/ico-quote.png';

const OurCustomers = () => {
    const customers = [
        [
            { name: 'Gladina Samantha', location: 'NSW 2000', imgSrc: customer1, text: 'The building and pest report I purchased was incredibly detailed and easy to understand. It gave me the confidence to proceed with my property purchase, knowing there were no hidden surprises. The service was quick and professional—I highly recommend it!' },
            { name: 'John Doe', location: 'VIC 3200', imgSrc: customer2, text: 'The inspection report I received was thorough and well-organized. It highlighted every detail I needed to know about the property, allowing me to move forward with confidence. The process was seamless, and the team was highly professional—highly recommended!' }
        ],
        [
            { name: 'Emily Carter', location: 'NSW 2000', imgSrc: customer3, text: 'I was impressed with how clear and concise the report was. It provided all the information I needed to make an informed decision. The team was prompt, reliable, and extremely helpful throughout the process. Definitely worth it!' },
            { name: 'James Bennett', location: 'VIC 3200', imgSrc: customer4, text: 'The property report exceeded my expectations. It was detailed, accurate, and very easy to follow. Thanks to their expert insights, I felt fully informed before making my purchase. The service was fantastic—efficient and friendly!' }
        ],
        [
            { name: 'Sophia Wright', location: 'NSW 2000', imgSrc: customer5, text: "This report was a game-changer for me. It outlined everything clearly, with no jargon, making the property's condition easy to understand. The team was professional and prompt, making the entire experience stress-free. I can't recommend them enough!" },
            { name: 'Michael Foster', location: 'VIC 3200', imgSrc: customer6, text: 'The level of detail in the report was outstanding. It covered every aspect I was concerned about and gave me peace of mind to move forward. The service was fast, and the inspectors were very knowledgeable—an excellent experience overall!' }
        ],
        [
            { name: 'Olivia Turner', location: 'NSW 2000', imgSrc: customer7, text: "I couldn't be happier with the quality of the building and pest report. It was detailed yet simple to understand, helping me avoid potential issues down the line. The team's professionalism and efficiency made the process a breeze. I'd highly recommend their service!" },
            { name: 'Daniel Hayes', location: 'VIC 3200', imgSrc: customer8, text: "From start to finish, the service was exceptional. The report was incredibly detailed, uncovering key insights about the property. It gave me confidence in my purchase and eliminated any guesswork. The team was professional and quick—I'd use them again in a heartbeat!" }
        ]
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const nextPage = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % customers.length);
    };
    
    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage === 0 ? customers.length - 1 : prevPage - 1);
    };

    return (
        <div className="our_customer">
            <h1>What our customers are saying</h1>
            <div className="carousel">
                <button className="prev_button" onClick={prevPage}><img src={left} alt="left" /></button>
                <div className="carousel_content">
                    {customers[currentPage].map((customer, index) => (
                        <div key={index} className="carousel_item">
                            <div className="customer_card">
                                <div className="customer_card_up">
                                    <p>{customer.text}</p>
                                    <img src={customer.imgSrc} alt={customer.name} />
                                </div>
                                <div className="customer_info">                                                                   
                                    <div>
                                        <h4>{customer.name}</h4>
                                        <p>{customer.location}</p>
                                    </div>
                                    <img src={info} alt="info" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="next_button" onClick={nextPage}><img src={right} alt="right" /></button>
            </div>
            <div className='points'>
                <div className='point' style={{
                    background: currentPage === 1 ? '#FFFFFF' : '#ABABAB'
                }}></div>
                <div className='point' style={{
                    background: currentPage === 2 ? '#FFFFFF' : '#ABABAB'
                }}></div>
                <div className='point' style={{
                    background: currentPage === 3 ? '#FFFFFF' : '#ABABAB'
                }}></div>
                <div className='point' style={{
                    background: currentPage === 0 ? '#FFFFFF' : '#ABABAB'
                }}></div>
            </div>
        </div>
    );
};

export default OurCustomers;