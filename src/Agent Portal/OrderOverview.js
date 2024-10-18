import React from "react";
import "./OrderOverview.css";

const OrderOverview = () => {
    return (
        <div>
            <div className="agent_property_form">                
                <div className="agent_form_section">
                    <h1>Property Details</h1>
                    <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
                    <input 
                        type="text"
                        placeholder="Property Address*"
                        style={{
                            padding: '0.625rem',
                            position: 'relative',                     
                            height: '1.875rem',
                            width:'90%',
                            marginRight: '0',
                            border: '1px solid #DDD',
                            outline: 'none',
                            borderRadius: '0.625rem',
                        }}
                    />
                    <p>Can't find property?<span>Click here</span></p>
                    <div>
                        <label>Do you have an offer accepted and a cooling off period?</label>
                        <div className="agent_selection">
                            <label>
                                <input 
                                    type="radio" 
                                    name="coolingOff" 
                                    value="yes"
                                    onChange={() => {}}
                                /> Yes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="coolingOff" 
                                    value="no"
                                    onChange={() => {}}
                                /> No
                            </label>
                        </div>
                        <label>Is the property going to auction?</label>
                        <div className="agent_selection">
                            <label>
                                <input 
                                    type="radio" 
                                    name="auction" 
                                    value="yes"
                                    onChange={() => {}}
                                /> Yes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="auction" 
                                    value="no"
                                    onChange={() => {}}
                                /> No
                            </label>
                        </div>
                        <label>How many bedrooms does the property have?</label>
                        <div className="agent_selection">
                            {[1, 2, 3, 4, 5, '6 or more'].map((bedroom) => (
                                <label key={bedroom}>
                                    <input 
                                        type="radio" 
                                        name="bedrooms" 
                                        value={bedroom}
                                        onChange={() => {}}
                                    /> {bedroom}
                                </label>
                            ))}
                        </div>
                        <label>Does the property have an additional dwelling / granny flat?</label>
                        <div className="agent_selection">
                            <label>
                                <input
                                    type="radio" 
                                    name="grannyFlat" 
                                    value="yes"
                                    onChange={() => {}}
                                /> Yes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="grannyFlat" 
                                    value="no"
                                    onChange={() => {}}
                                /> No
                            </label>
                        </div>
                    </div>
                    <label>Is there anything in particular you would like the inspector to look out for? (optional)</label>
                    <div>
                        <textarea
                            style={{
                                width: '90%',
                                height: '6.25rem',
                                padding: '3%',  
                                textAlign: 'left',
                                resize: 'none',
                                marginTop: '3%',
                                marginBottom: '3%',
                                borderRadius: '1rem',
                                border: '1px solid #DDD',
                                outline: 'none',
                            }}
                        />
                    </div>
                    <h1>Order Overview</h1>
                    <h2>Address: Unit654/311 high Street, Kingsford NSW 2037</h2>
                    <h2>Inspector: Max</h2>
                    <h2>ETA: 2-4 Business Days</h2>
                </div>                
            </div>
        </div>
    );
};

export default OrderOverview;
