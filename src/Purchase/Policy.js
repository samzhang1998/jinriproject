import React, { useState, useRef } from 'react';
import './Policy.css';

const Policy = ({ showModal, onClose }) => {
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
    const contentRef = useRef(null);

    const handleScroll = () => {
        const content = contentRef.current;
        if (content) {
          const isBottom = content.scrollHeight - content.scrollTop === content.clientHeight;
          setIsScrolledToBottom(isBottom);
        }
    };

    const handleConfirm = () => {
        onClose();
        console.log('Confirmed!');
    };

    if (!showModal) return null;

    return (
        <div className='modal'>
            <div className='modal_content'>
                <h1>Terms & Conditions</h1>
                <div className='modal_body' ref={contentRef} onScroll={handleScroll}>
                    <p>I have read and agree to Check for sure's Terms & Conditions
                        (which includes our Collection Notice and Cancellation charges 
                        policy). A 'Late Cancellation' could lead to cancellation charges that
                        can exceed your initial payment, up to a maximum of 50% of the retail
                        cost of a report.</p>
                    <p>I have read and agree to Check for sure's Terms & Conditions
                        (which includes our Collection Notice and Cancellation charges 
                        policy). A 'Late Cancellation' could lead to cancellation charges that
                        can exceed your initial payment, up to a maximum of 50% of the retail
                        cost of a report.</p>
                    <p>I have read and agree to Check for sure's Terms & Conditions
                        (which includes our Collection Notice and Cancellation charges 
                        policy). A 'Late Cancellation' could lead to cancellation charges that
                        can exceed your initial payment, up to a maximum of 50% of the retail
                        cost of a report.</p>
                    <p>I have read and agree to Check for sure's Terms & Conditions
                        (which includes our Collection Notice and Cancellation charges 
                        policy). A 'Late Cancellation' could lead to cancellation charges that
                        can exceed your initial payment, up to a maximum of 50% of the retail
                        cost of a report.</p>
                    <p>I have read and agree to Check for sure's Terms & Conditions
                        (which includes our Collection Notice and Cancellation charges 
                        policy). A 'Late Cancellation' could lead to cancellation charges that
                        can exceed your initial payment, up to a maximum of 50% of the retail
                        cost of a report.</p>
                </div>
                <button
                    className='understand'
                    disabled={isScrolledToBottom}
                    onClick={handleConfirm}
                >I Understand</button>
            </div>
        </div>
    );
};

export default Policy;