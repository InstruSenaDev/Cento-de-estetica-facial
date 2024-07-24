import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceList = () => {
    const [services, setServices] = useState([]);

    const fetchServices = async () => {
        const res = await axios.get('/api/services');
        setServices(res.data);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const deleteService = async (id) => {
        try {
            await axios.delete(`/api/services/${id}`);
            fetchServices();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Services</h2>
            <ul>
                {services.map(service => (
                    <li key={service._id}>
                        <p>Name: {service.name}</p>
                        <p>Description: {service.description}</p>
                        <p>Price: {service.price}</p>
                        <button onClick={() => deleteService(service._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceList;