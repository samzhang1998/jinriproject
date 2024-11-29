import React,{ useState, useEffect } from "react";
import FetchFunc from "../API";
import "./Changeproperty.css";
import close from "../asset/Close_round.png";
import { useNavigate } from "react-router-dom";

const ChangePropertyModal = ({ closeModal, id, refresh, setRefresh, existingData,filter }) => {
    const navigate = useNavigate();
    const [property, setProperty] = useState({
        address: existingData.propertyAddress || '',
        type: existingData.type || '',
        streetName: existingData.streetName || '',
        streetNumber: existingData.streetNumber || '',
        suburb: existingData.suburb || '',
        state: existingData.state || '',
        roomNumber: existingData.roomNumber || '',
        postcode: existingData.postcode || '',
        propertyId: id
    });
    const Change = `${property.streetNumber} ${property.streetName}, ${property.suburb} ${property.state} ${property.postcode}`;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProperty((prevData) => ({
          ...prevData,
          [name]: value,
          address: Change,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...property,
        };
        try {
            console.log('data sent:', dataToSend);
            const response = await FetchFunc(
                '/admin/editProperty',
                'POST',
                JSON.stringify(dataToSend)
            );
            if (response === 401) {
                navigate('/login');
            } else if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            setRefresh(!refresh);
            closeModal();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleDelete = async () => {
        try {
            let url = '';
            if (filter === "notDeleted") {
                url = '/admin/deleteProperty';
            } else {
                url = '/admin/recoverProperty';
            }
            const response = await FetchFunc(
                `${url}?propertiesId=${id}`,
                'DELETE',
            );
            if (response === 401) {
                navigate('/login');
            } else if (!response.ok) {
                console.log(response.text());
            }
            console.log('Response from server:', response);
            closeModal();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="change_modal">
            <div className="property_modal">
                <div className="close_change_property_modal">
                    {filter === "notDeleted" && 
                        <button onClick={handleDelete}>Delete this property</button>
                    }
                    {filter === "deleted" && 
                        <button onClick={handleDelete}>Recover this property</button>
                    }
                    <img src={close} alt="close" onClick={closeModal} />
                </div>
                <form onSubmit={handleSubmit}>
                    <p>Property Street Number:</p>
                    <input
                        type="text"
                        name="streetNumber"
                        placeholder={existingData.streetNumber}
                        value={property.streetNumber}
                        onChange={handleInputChange}
                    />
                    <p>Property Street Name:</p>
                    <input
                        type="text"
                        name="streetName"
                        placeholder={existingData.streetName}
                        value={property.streetName}
                        onChange={handleInputChange}
                    />
                    <p>Property Suburb:</p>
                    <input
                        type="text"
                        name="suburb"
                        placeholder={existingData.suburb}
                        value={property.suburb}
                        onChange={handleInputChange}
                    />
                    <p>Property State:</p>
                    <input
                        type="text"
                        name="state"
                        placeholder={existingData.state}
                        value={property.state}
                        onChange={handleInputChange}
                    />
                    <p>Property Type:</p>
                    <input
                        type="text"
                        name="type"
                        placeholder={existingData.type}
                        value={property.type}
                        onChange={handleInputChange}
                    />
                    <p>Property Room Number:</p>
                    <input
                        type="text"
                        name="roomNumber"
                        placeholder={existingData.roomNumber}
                        value={property.roomNumber}
                        onChange={handleInputChange}
                    />
                    <p>Property Postcode:</p>
                    <input
                        type="text"
                        name="postcode"
                        placeholder={existingData.postcode}
                        value={property.postcode}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="save_change_modal">Save</button>
                </form>
            </div>
        </div>
    );
};

const AddPropertyModal = ({ closeModal, refresh, setRefresh }) => {
    const navigate = useNavigate();
    const [property, setProperty] = useState({
        address: '',
        type: '',
        streetName: '',
        streetNumber: '',
        suburb: '',
        state: '',
        roomNumber: '',
        postcode: '',
    });
    // const Change = `${property.streetNumber} ${property.streetName}, ${property.suburb} ${property.state} ${property.postcode}`;
    const getAddress = () => {
        const { streetNumber, streetName, suburb, state, postcode } = property;
        return `${streetNumber} ${streetName}, ${suburb} ${state} ${postcode}`.trim();
    };

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setProperty((prevData) => ({
    //       ...prevData,
    //       [name]: value,
    //       address: Change,
    //     }));
    // };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProperty((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...property,
            address: getAddress(),
        };
        try {
            console.log('data sent:', dataToSend);
            const response = await FetchFunc(
                '/admin/addProperty',
                'POST',
                JSON.stringify(dataToSend)
            );
            if (response === 401) {
                navigate('/login');
            } else if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            setRefresh(!refresh);
            closeModal();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="change_modal">
            <div className="property_modal">
                <div className="close_property_modal">
                    <h1>New Property</h1>
                    <img src={close} alt="close" onClick={closeModal} />
                </div>
                <form onSubmit={handleSubmit}>
                    <p>Property Street Number:</p>
                    <input
                        type="text"
                        name="streetNumber"
                        placeholder="Property Street Number"
                        value={property.streetNumber}
                        onChange={handleInputChange}
                        required
                    />
                    <p>Property Street Name:</p>
                    <input
                        type="text"
                        name="streetName"
                        placeholder="Property Street Name"
                        value={property.streetName}
                        onChange={handleInputChange}
                        required
                    />
                    <p>Property Suburb:</p>
                    <input
                        type="text"
                        name="suburb"
                        placeholder="Property Suburb"
                        value={property.suburb}
                        onChange={handleInputChange}
                        required
                    />
                    <p>Property State:</p>
                    <input
                        type="text"
                        name="state"
                        placeholder="Property State"
                        value={property.state}
                        onChange={handleInputChange}
                        required
                    />
                    <p>Property Type:</p>
                    <input
                        type="text"
                        name="type"
                        placeholder="Property Type"
                        value={property.type}
                        onChange={handleInputChange}
                        required
                    />
                    <p>Property Room Number:</p>
                    <input
                        type="text"
                        name="roomNumber"
                        placeholder="Property Room Number"
                        value={property.roomNumber}
                        onChange={handleInputChange}
                        required
                    />
                    <p>Property Postcode:</p>
                    <input
                        type="text"
                        name="postcode"
                        placeholder="Property Postcode"
                        value={property.postcode}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit" className="save_add_modal">Save</button>
                </form>
            </div>
        </div>
    );
};

const UploadModal = ({ closeModal, type, name, id, refresh, setRefresh }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const [uploadStatus, setUploadStatus] = useState('');
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('No file selected.');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            console.log('data sent:', formData);
            const response = await fetch(`/api/admin/uploadReport?reportType=${type}&fileName=${name}&propertyId=${id}`, {
                method: 'POST',
                body: formData,
                credentials:'include',
            });
            if (response === 401) {
                navigate('/login');
            } else if (!response.ok) {
                console.log(response.text());
                setUploadStatus(`Upload failed. Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            setRefresh(!refresh);
            setUploadStatus('File uploaded successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            setUploadStatus(`Upload failed. Error: ${error.message}`);
        }
    }

    return (
        <div className="change_modal">
            <div className="upload_modal">
                <div onClick={closeModal} className="close_modal">
                    <img src={close} alt="close" />
                </div>
                <h2>Upload Report {name}</h2>
                <input type="file" onChange={handleFileChange} className="upload_file"/>
                <button onClick={handleUpload}>Upload</button>
                <p style={{color: 'red'}}>{uploadStatus}</p>
                {uploadStatus === 'File uploaded successfully!' && 
                    <button onClick={() => closeModal()}>Finish</button>
                }   
            </div>
        </div>
    );
};

const PriceModal = ({ closeModal, id, refresh, setRefresh, prevPrice }) => {
    const [price, setPrice] = useState(parseFloat(prevPrice));
    const navigate = useNavigate();

    const handleChange = (e) => {
        const newValue = e.target.value;
        setPrice(parseFloat(newValue));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(price, id);
            const response = await FetchFunc(
                `/admin/editReportPrice/?price=${price}&propertyId=${id}`,
                'POST',
            );
            if (response === 401) {
                navigate('/login');
            } else if (!response.ok) {
                console.log(response.text())
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            setRefresh(!refresh);
            closeModal();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="change_modal">
            <div className="price_modal">
                <div className="close_modal">
                    <img src={close} alt="close" onClick={closeModal} />
                </div>
                <h1>Set Report Price</h1>
                <div className="set_price">
                    <p>Price:</p>
                    <input 
                        type="number"
                        value={price}
                        onChange={handleChange}
                        placeholder={prevPrice}
                        required
                    />
                </div>
                <button 
                    onClick={handleSubmit} 
                    className="save_add_modal"
                >Save</button>
            </div>
        </div>
    );
};

const Changeproperty = () => {
    const [property,setProperty] = useState([]);
    const [filter, setFilter] = useState('notDeleted');
    const [showNewModal, setShowNewModal] = useState(false);
    const [activePropertyId, setActivePropertyId] = useState(null);
    const [uploadModalPropertyId, setUploadModalPropertyId] = useState(null);
    const [pricePropertyId, setPricePropertyId] = useState(null);
    const [refresh, setRefresh] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FetchFunc(
                    '/admin/allProperties',
                    'Get',
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                console.log('Response from server:', response);
                const data = await response.json();
                console.log('data response:', data);
                setProperty(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchData();
    }, [refresh]);

    const filteredProperty = property.filter((item) => {
        if (filter === 'all') return true;
        if (filter === 'deleted') return item.isDeleted;
        if (filter === 'notDeleted') return !item.isDeleted;
        return true;
    });

    const openPropertyModal = (propertyId) => {
        console.log(propertyId)
        setActivePropertyId(propertyId);
    };
    const closePropertyModal = () => {
        setActivePropertyId(null);
    };
    const openUploadModal = (propertyId) => {
        console.log(propertyId)
        setUploadModalPropertyId(propertyId);
    };
    const closeUploadModal = () => {
        setUploadModalPropertyId(null);
    };
    const openPriceModal = (propertyId) => {
        console.log(propertyId)
        setPricePropertyId(propertyId);
    };
    const closePriceModal = () => {
        setPricePropertyId(null);
    };

     

    return (
        <div className="orders">
            <div className="change_property_title">
                <h1>Properties</h1>
                <button onClick={() => setShowNewModal(true)}>Add a Property</button>
                {showNewModal && (
                    <AddPropertyModal
                        closeModal={() => setShowNewModal(false)}
                        refresh={refresh}
                        setRefresh={setRefresh}
                    />
                )}
            </div>
            <hr style={{background: '#DDD', width: '100%', }} />
            <div className="order_status">
            <span 
                    onClick={() => setFilter('all')}
                    className={filter === 'all' ? 'active' : ''}
                >All</span>
                <span 
                    onClick={() => setFilter('deleted')}
                    className={filter === 'deleted' ? 'active' : ''}
                >Deleted</span>
                <span 
                    onClick={() => setFilter('notDeleted')}
                    className={filter === 'notDeleted' ? 'active' : ''}
                >Active</span>               
            </div>
            {Array.isArray(property) && filteredProperty.map((property) => (
                <div key={property.propertyId} className="admin_property">
                    <div className="property_price">
                        <h2>{property.propertyAddress}</h2>
                        <span onClick={() => openPriceModal(property.propertyId)}>Set Price</span>
                        {pricePropertyId === property.propertyId && (
                            <PriceModal 
                                id={property.propertyId}
                                closeModal={closePriceModal}
                                prevPrice={property.reportPrice}
                                refresh={refresh}
                                setRefresh={setRefresh}                           
                            />
                        )}
                    </div>
                    <div className="admin_property_detail">
                        <p>Property type: {property.type}</p>
                        <span onClick={() => openPropertyModal(property.propertyId)}>Edit Property</span>
                        {activePropertyId === property.propertyId && (
                            <ChangePropertyModal
                                id={property.propertyId}
                                closeModal={closePropertyModal}
                                refresh={refresh}
                                setRefresh={setRefresh}
                                existingData={property}
                                filter={filter}
                            />
                        )}
                    </div>
                    <div className="upload_report">
                        <p>Report: {property.reportName}</p>
                        <span onClick={() => openUploadModal(property.propertyId)}>Upload Report</span>
                    </div>
                    {uploadModalPropertyId === property.propertyId && (
                        <UploadModal
                            type={property.type}
                            id={property.propertyId}
                            name={property.reportName}
                            closeModal={closeUploadModal}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Changeproperty;