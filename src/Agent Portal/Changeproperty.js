import React,{ useState, useEffect } from "react";
import FetchFunc from "../API";

const Changeproperty = () => {
    const [property,setProperty] = useState([]);
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

    return (
        <div>
            {Array.isArray(property) && property.map((property) => (
                <div key={property.propertyId}>
                    <h1>{property.propertyAddress}</h1>
                    <p>{property.type}</p>
                </div>
            ))}
        </div>
    );
};

export default Changeproperty;