import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import YourDetailsForm from './Yourdetails';
import Paymentdetail from './Paymentdetail';
import Header from '../Header';
import './Purchasereport.css';
import check from '../asset/Check_fill.png';
import back from '../asset/Expand_left.png';

const StepOne = ({ showStepTwo, updatePaymentSummary }) => {
    const [hasGrannyFlat, setHasGrannyFlat] = useState(false);
    
    const handleGrannyFlatChange = (e) => {
        const isSelected = e.target.value === 'yes';
        setHasGrannyFlat(isSelected);
        updatePaymentSummary({ hasGrannyFlat: isSelected, grannyFlatPrice: isSelected ? 99 : 0 }); 
    };

    return (
        <div>
            <div className="property_form">                
                <div className="form_section">
                    <h1>Property Details</h1>
                    <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
                    <div>
                        <label>Do you have an offer accepted and a cooling off period?</label>
                        <div className="selection">
                            <label>
                                <input 
                                    type="radio" 
                                    name="coolingOff" 
                                    value="yes"
                                    onChange={() => {}}
                                    style={{ width: '1.2rem' }}
                                /> Yes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="coolingOff" 
                                    value="no"
                                    onChange={() => {}}
                                    style={{ width: '1.2rem' }}
                                /> No
                            </label>
                        </div>
                        <label>Is the property going to auction?</label>
                        <div className="selection">
                            <label>
                                <input 
                                    type="radio" 
                                    name="auction" 
                                    value="yes"
                                    onChange={() => {}}
                                    style={{ width: '1.2rem' }}
                                /> Yes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="auction" 
                                    value="no"
                                    onChange={() => {}}
                                    style={{ width: '1.2rem' }}
                                /> No
                            </label>
                        </div>
                        <label>How many bedrooms does the property have?</label>
                        <div className="selection">
                            {[1, 2, 3, 4, 5, '6 or more'].map((bedroom) => (
                                <label key={bedroom}>
                                    <input 
                                        type="radio" 
                                        name="bedrooms" 
                                        value={bedroom}
                                        onChange={() => {}}
                                        style={{ width: '1.2rem' }}
                                    /> {bedroom}
                                </label>
                            ))}
                        </div>
                        <label>Does the property have an additional dwelling / granny flat?</label>
                        <div className="selection">
                            <label>
                                <input
                                    type="radio" 
                                    name="grannyFlat" 
                                    value="yes"
                                    checked={hasGrannyFlat === true}
                                    onChange={handleGrannyFlatChange}
                                    style={{ width: '1.2rem' }}
                                /> Yes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="grannyFlat" 
                                    value="no"
                                    checked={hasGrannyFlat === false}
                                    onChange={handleGrannyFlatChange}
                                    style={{ width: '1.2rem' }}
                                /> No
                            </label>
                        </div>
                    </div>
                    <label>Is there anything in particular you would like the inspector to look out for? (optional)</label>
                    <div>
                        <textarea
                            style={{
                                width: '100%',
                                height: '6.25rem',
                                padding: '0px',  
                                textAlign: 'left',
                                resize: 'none',
                                marginTop: '3%',
                                borderRadius: '1rem',
                                border: '1px solid #DDD',
                            }}
                        />
                    </div>
                </div>
            </div>
            <YourDetailsForm />
            <button 
                onClick={showStepTwo}
                style={{
                    background: '#008286',
                    width: '8.9rem',
                    height: '2.9rem',
                    color: '#FFF',
                    fontFamily: 'Montserrat',
                    fontSize: '1.125rem',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: '150%',                    
                    marginBottom: '8%',
                    cursor: 'pointer',
                    borderRadius: '1rem',
                    border: 'none',
                    marginTop: '5%',
                }}
            >NEXT</button>
        </div>
    );
};

const StepTwo = ({ showStepThree, showStepOne, updatePaymentSummary }) => {
    const [getMortgageAdvice,setGetMortgageAdvice] = useState(false);
    const [consultExpert,setConsultExpert] = useState(false);
    const [getValueReport,setGetValueReport] = useState(false);

    const handleMortgageAdviceChange = () => {
        const selected = !getMortgageAdvice;
        setGetMortgageAdvice(selected);
        updatePaymentSummary({ getMortgageAdvice: selected, mortgageAdvicePrice: selected ? 0 : 0 });
    };
    const handleConsultExpert = () => {
        const selected = !consultExpert;
        setConsultExpert(selected);
        updatePaymentSummary({ consultExpert: selected, consultExpertPrice: selected ? 0 : 0 });
    };
    const handleValueReportChange = () => {
        const selected = !getValueReport;
        setGetValueReport(selected);
        updatePaymentSummary({ getValueReport: selected, valueReportPrice: selected ? 0 : 0 });
    };
    return (
        <div>
            <div className="service_details">
                <h1>Addition Service</h1>
                <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
                <div
                    onClick={() => handleMortgageAdviceChange()}
                    style={{
                        background: getMortgageAdvice ? 'rgba(0, 130, 134, 0.17)' :  '#F9F8F8',
                        border: getMortgageAdvice ? '1px solid #008286' :  'none',
                        borderRadius: '1rem',
                        width: '95%',
                        marginBottom: '5%',
                        paddingLeft: '5%',
                        cursor: 'pointer',
                    }}
                >
                    <h2>Get advice about your mortgage</h2>
                    <p>
                        Sei Finance is your lifetime finance partner. We do more than securing 
                        a loan, we <br /> believe in helping you achieve your financial goals.
                    </p>
                </div>
                <div
                    onClick={handleConsultExpert}
                    style={{
                        background: consultExpert ? 'rgba(0, 130, 134, 0.17)' : '#F9F8F8',
                        border: consultExpert ? '1px solid #008286' : 'none',
                        borderRadius: '1rem',
                        width: '95%',
                        marginBottom: '5%',
                        paddingLeft: '5%',
                        cursor: 'pointer',
                    }}
                >
                    <h2>Consult with a negotiation expert</h2>
                    <p>
                        A independent valuation from Opteon will give you confidence in your 
                        property <br /> decision making. Our qualified local market experts will 
                        assess the true market <br /> value & highlight any risks associated with your 
                        dream home or investment <br /> property. Desktop assessments start from as 
                        little as $170.
                    </p>
                </div>
                <div
                   onClick={handleValueReportChange}
                   style={{
                       background: getValueReport ? 'rgba(0, 130, 134, 0.17)' : '#F9F8F8',
                       border: getValueReport ? '1px solid #008286' :  'none',
                       borderRadius: '1rem',
                       width: '95%',
                       marginBottom: '5%',
                       paddingLeft: '5%',
                       cursor: 'pointer',
                   }} 
                >
                    <h2>Get a valuation report for your property</h2>
                    <p>
                        A negotiation expert can help you get a property at the right price. If 
                        you aren't <br /> experienced with dealing with real estate agents and 
                        negotiating large financial <br /> transactions than you may want to have 
                        a free no obligation call with a negotiation <br /> expert to see if that 
                        is what you need. These experts buy properties from agents <br /> regularly 
                        and the best part is there is no fee if they're not successful for you!
                    </p>
                </div>
            </div>
            <button 
                onClick={showStepThree}
                style={{
                    background: '#008286',
                    width: '8.9rem',
                    height: '2.9rem',
                    color: '#FFF',
                    fontFamily: 'Montserrat',
                    fontSize: '1.125rem',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: '150%',                    
                    marginBottom: '8%',
                    marginTop: '5%',
                    cursor: 'pointer',
                    borderRadius: '1rem',
                    border: 'none',
                }}
            >NEXT</button>
        </div>
    );
};

const StepThree = ({ showStepTwo, showStepOne }) => {
    return (
        <div>
            <Paymentdetail />
        </div>
    );
};

const PaymentSummary = ({ summary }) => {
    return (
        <div className="order_summary">
            <h3>Order Summary</h3>
            <div className="address">
                <p>Unit 23/36-38 Walker Street, Rhodes NSW 2138</p>
            </div>
            <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
            <div>
                <div className="calculation"><p>Building & Pest Report</p><span>$199</span></div>
                <div className="report_available">
                    <img src={check} alt="check" />
                    <h4>Report available now!</h4>
                </div>
                {summary.hasGrannyFlat && (
                    <div className="calculation"><p>Second Dwelling / Granny Flat</p><span>$99</span></div>
                )}
            </div>
            <div>
                <div className="addition">Additional Services</div>
                {summary.getMortgageAdvice && (
                    <div className="calculation2"><p>Mortgage Advice</p><span>Free</span></div>
                )}
                {summary.consultExpert && (
                    <div className="calculation2"><p>Expert Consultation</p><span>Free</span></div>
                )}
                {summary.getValueReport && (
                    <div className="calculation2"><p>Value Report</p><span>Free</span></div>
                )}
            </div>
            <hr style={{background: '#DDD', width: '100%', marginTop: '5%', marginBottom: '5%',}} />
            <div className="total"><h4>Total <p>(GST Inc)</p>:</h4><h5>${199 + (summary.hasGrannyFlat ? 99 : 0)}</h5></div>
        </div>
    );
};

const PurchasePage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();
    const [paymentSummary, setPaymentSummary] = useState({
        hasGrannyFlat: false,
        grannyFlatPrice: 0,
        getMortgageAdvice: false,
        mortgageAdvicePrice: 0,
        consultExpert: false,
        consultExpertPrice: 0,
        getValueReport: false,
        valueReportPrice: 0,
    });

    const showStepTwo = () => {
        setCurrentStep(2);
    };
    const showStepThree = () => {
        setCurrentStep(3);
    };
    const showStepOne = () => {
        setCurrentStep(1);
    };

    const updatePaymentSummary = (newSummary) => {
        setPaymentSummary((prevSummary) => ({ ...prevSummary, ...newSummary }));
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className='purchase1'>
            <Header />
            <div className='header_bg'></div>
            {currentStep === 1 && (                
                <button className='back' onClick={handleBack}>
                        <div className='back_text'>
                            <img src={back} alt='back' />
                            <p>Back</p>
                        </div>
                </button>
            )}
            {currentStep === 2 && (                
                <button onClick={showStepOne} className='back'>
                    <div className='back_text'>
                        <img src={back} alt='back' />
                        <p>Back</p>
                    </div>
                </button>                
            )}
            {currentStep === 3 && (                
                <button onClick={showStepTwo} className='back'>
                    <div className='back_text'>
                        <img src={back} alt='back' />
                        <p>Back</p>
                    </div>
                </button>
            )}
            <div className='report_title'>Building & Pest Report</div>
            <div className='step_progress'>
                <div className="step1">
                    <div className="step-number">1</div>
                    <div className="step-label">Required Details</div>
                </div>
                <div className="step2" 
                    style={{
                        background: currentStep === 1 ? '#F2F2F2' : '#fff',
                    }}
                >
                    <div className="step-number2" 
                        style={{
                            background: currentStep === 1 ? '#A4A4A4' : '#008286',
                        }}
                    >2</div>
                    <div className="step-label2"
                        style={{
                            color: currentStep === 1 ? '#A4A4A4' : '#343434',
                        }}
                    >Additional Services</div>
                </div>
                <div className="step3" 
                    style={{
                        background: currentStep === 3 ? '#fff' : '#F2F2F2',
                    }}
                >
                    <div className="step-number3"
                        style={{
                            background: currentStep === 3 ? '#008286' : '#A4A4A4',
                        }}
                    >3</div>
                    <div className="step-label3" 
                        style={{
                            color: currentStep === 3 ? '#343434' : '#A4A4A4',
                        }}
                    >Payment</div>
                </div>
            </div>
            <div className='payment_steps'>
                <div className='payment_choice'>                        
                    {currentStep === 1 && <StepOne showStepTwo={showStepTwo} updatePaymentSummary={updatePaymentSummary} />}
                    {currentStep === 2 && (
                        <StepTwo showStepThree={showStepThree} showStepOne={showStepOne} updatePaymentSummary={updatePaymentSummary} />
                    )}
                    {currentStep === 3 && <StepThree showStepTwo={showStepTwo} showStepOne={showStepOne} updatePaymentSummary={updatePaymentSummary} />}
                </div>
                <div className='payment_summary'>
                    <PaymentSummary summary={paymentSummary} />
                </div>
            </div>
        </div>   
    );
};

export default PurchasePage;