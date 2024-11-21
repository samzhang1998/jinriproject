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

const UploadModal = ({ closeModal, type }) => {
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
            const response = await fetch(`http://localhost:8080/oss/upload?reportType=${type}`, {
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
            <div className="property_modal">
                <div onClick={closeModal} className="close_modal">
                    <img src={close} alt="close" />
                </div>
                <h2>Upload Report</h2>
                <input type="file" onChange={handleFileChange} />
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
    const [showPropertyModal, setShowPropertyModal] = useState(false);
    const [showNewModal, setShowNewModal] = useState(false);
    const [uploadModal, setUploadModal] = useState(false)
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
    const closePropertyModal = () => {
        setShowPropertyModal(false);
        window.location.reload();
    };
    const closeUploadModal = () => {
        setUploadModal(false);
        window.location.reload();
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
                        <span onClick={() => setShowPropertyModal(true)}>Edit Property</span>
                        {showPropertyModal && (
                            <ChangePropertyModal
                                id={property.propertyId}
                                closeModal={closePropertyModal}
                            />
                        )}
                    </div>
                    <div className="upload_report">
                        <p>Report: {property.reportName}</p>
                        <span onClick={() => setUploadModal(true)}>Upload Report</span>
                    </div>
                    {uploadModal && (
                        <UploadModal
                            type={property.type}
                            closeModal={closeUploadModal}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Changeproperty;