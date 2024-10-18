import React, { useState } from "react";
import "./OurCustomers.css";

const OurCustomers = () => {
    const customerText = "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took”";
    const customers = [
        [
            { name: 'Gladina Samantha', location: 'NSW 2000', imgSrc: 'nsw.png' },
            { name: 'John Doe', location: 'VIC 3200', imgSrc: 'vic.png' }
        ],
        [
            { name: 'Jane Smith', location: 'NSW 2000', imgSrc: 'nsw.png' },
            { name: 'Emily Johnson', location: 'VIC 3200', imgSrc: 'vic.png' }
        ],
        [
            { name: 'Gladina Samantha', location: 'NSW 2000', imgSrc: 'nsw.png' },
            { name: 'John Doe', location: 'VIC 3200', imgSrc: 'vic.png' }
        ],
        [
            { name: 'Jane Smith', location: 'NSW 2000', imgSrc: 'nsw.png' },
            { name: 'Emily Johnson', location: 'VIC 3200', imgSrc: 'vic.png' }
        ]
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const nextPage = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % customers.length);
    };
    
    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + customers.length) % customers.length);
    };

    return (
        <div className="our_customer">
            <h1>What our customers are saying</h1>
            <div className="carousel">
                <button className="prev_button" onClick={prevPage}><img src="/ArrowSquareLeft.png" alt="left" /></button>
                <div className="carousel_content">
                    {customers[currentPage].map((customer, index) => (
                        <div key={index} className="carousel_item">
                            <div className="customer_card">
                                <div className="customer_card_up">
                                    <p>{customerText}</p>
                                    <img src={customer.imgSrc} alt={customer.name} />
                                </div>
                                <div className="customer_info">                                                                   
                                    <div>
                                        <h4>{customer.name}</h4>
                                        <p>{customer.location}</p>
                                    </div>
                                    <img src="/ico-quote.png" alt="info" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="next_button" onClick={nextPage}><img src="/ArrowSquareRight.png" alt="right" /></button>
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