import React, { useState } from 'react';
import axios from 'axios';

const ServiceForm = ({ onServiceAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: ''
    });

    const { name, description, price } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/api/services', formData);
            onServiceAdded();
            setFormData({ name: '', description: '', price: '' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Service Name"
                required
            />
            <textarea
                name="description"
                value={description}
                onChange={onChange}
                placeholder="Service Description"
                required
            />
            <input
                type="number"
                name="price"
                value={price}
                onChange={onChange}
                placeholder="Service Price"
                required
            />
            <button type="submit">Add Service</button>
        </form>
    );
};

export default ServiceForm;