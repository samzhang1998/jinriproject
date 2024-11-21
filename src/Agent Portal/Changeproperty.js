import React,{ useState, useEffect } from "react";
import FetchFunc from "../API";
import "./Changeproperty.css";
import close from "../asset/Close_round.png";

const ChangePropertyModal = ({ closeModal,id }) => {
    const [property, setProperty] = useState({
        address: '',
        type: '',
        streetName: '',
        streetNumber: '',
        suburb: '',
        state: '',
        roomNumber: '',
        postcode: '',
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
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Response from server:', response);
            closeModal();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await FetchFunc(
                `/admin/deleteProperty?propertiesId=${id}`,
                'DELETE',
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
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
                <div className="close_modal">
                    <button onClick={handleDelete}>Delete this property</button>
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
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

const AddPropertyModal = ({ closeModal }) => {
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
                '/admin/addProperty',
                'POST',
                JSON.stringify(dataToSend)
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
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
                <div onClick={closeModal} className="close_modal">
                    <img src={close} alt="close" />
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
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

const UploadModal = ({ closeModal, type, name, id }) => {
    const [selectedFile, setSelectedFile] = useState(null);
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
            const response = await fetch(`http://localhost:8080/admin/uploadReport?reportType=${type}&fileName=${name}&propertyId=${id}`, {
                method: 'POST',
                body: formData,
                credentials:'include',
            });
            if (!response.ok) {
                console.log(response.text());
                setUploadStatus(`Upload failed. Status: ${response.status}`);
            }
            console.log('Response from server:', response);
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

const Changeproperty = () => {
    const [property,setProperty] = useState([]);
    const [filter, setFilter] = useState('all');
    const [showNewModal, setShowNewModal] = useState(false);
    const [activePropertyId, setActivePropertyId] = useState(null);
    const [uploadModalPropertyId, setUploadModalPropertyId] = useState(null);
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
    }, []);

    const filteredProperty = property.filter((item) => {
        if (filter === 'all') return true;
        if (filter === 'deleted') return item.isDeleted;
        if (filter === 'notDeleted') return !item.isDeleted;
        return true;
    });

    const openPropertyModal = (propertyId) => {
        setActivePropertyId(propertyId);
    };
    const closePropertyModal = () => {
        setActivePropertyId(null);
        // window.location.reload();
    };
    const openUploadModal = (propertyId) => {
        setUploadModalPropertyId(propertyId);
    };
    const closeUploadModal = () => {
        setUploadModalPropertyId(null);
        // window.location.reload();
    };

    return (
        <div className="orders">
            <div className="change_property_title">
                <h1>Properties</h1>
                <button onClick={() => setShowNewModal(true)}>Add a Property</button>
                {showNewModal && (
                    <AddPropertyModal
                        closeModal={() => setShowNewModal(false)}
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
                    onClick={() => setFilter('notDeleted')}
                    className={filter === 'notDeleted' ? 'active' : ''}
                >Active</span>
                <span 
                    onClick={() => setFilter('deleted')}
                    className={filter === 'deleted' ? 'active' : ''}
                >Deleted</span>
            </div>
            {Array.isArray(property) && filteredProperty.map((property) => (
                <div key={property.propertyId} className="admin_property">
                    <h2>{property.propertyAddress}</h2>
                    <div className="admin_property_detail">
                        <p>Property type: {property.type}</p>
                        <span onClick={() => openPropertyModal(property.propertyId)}>Edit Property</span>
                        {activePropertyId && (
                            <ChangePropertyModal
                                id={property.propertyId}
                                closeModal={closePropertyModal}
                            />
                        )}
                    </div>
                    <div className="upload_report">
                        <p>Report: {property.reportName}</p>
                        <span onClick={() => openUploadModal(property.propertyId)}>Upload Report</span>
                    </div>
                    {uploadModalPropertyId && (
                        <UploadModal
                            type={property.type}
                            id={property.propertyId}
                            name={property.reportName}
                            closeModal={closeUploadModal}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Changeproperty;