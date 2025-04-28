import React, { useState, useRef } from 'react';
import './Policy.css';
import close from "../asset/Close_round.png";

const Policy = ({ showModal, onClose, onConfirm }) => {
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
        onConfirm();
        // console.log('Confirmed!');
    };

    const handleClose = () => {
        onClose();
    }

    if (!showModal) return null;

    return (
        <div className='modal'>
            <div className='modal_content'>
                <div className='modal_content_title'>
                    <h1>Terms & Conditions</h1>
                    <img src={close} alt="close" onClick={handleClose} />
                </div>
                <div className='modal_body' ref={contentRef} onScroll={handleScroll}>
                    <p>CheckForSure is a platform that facilitates access to independent building inspection 
                        services by connecting users with qualified building inspectors. CheckForSure itself 
                        does not carry out building inspections and does not verify, endorse, or guarantee the 
                        accuracy or completeness of any inspection report provided through the platform.</p>
                    <p>All inspections are conducted independently by third-party inspectors, who bear full 
                        responsibility for the quality, content, and conclusions of their reports.</p>
                    <p>CheckForSure accepts no liability whatsoever for any loss, damage, or claims arising 
                        from the use of or reliance on any inspection report obtained through the platform.</p>
                    <p>By using CheckForSure, you acknowledge and agree that any issues, disputes, or claims 
                        relating to an inspection or report must be directed to the individual inspector who 
                        provided the service.</p>
                </div>
                <button
                    className='understand'
                    disabled={!isScrolledToBottom}
                    onClick={handleConfirm}
                >I Understand</button>
            </div>
        </div>
    );
};

export default Policy;