import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentForm = ({ onAppointmentAdded }) => {
    const [formData, setFormData] = useState({
        service: '',
        date: '',
        time: '',
        customerName: '',
        customerEmail: ''
    });

    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const res = await axios.get('/api/services');
            setServices(res.data);
        };
        fetchServices();
    }, []);

    const { service, date, time, customerName, customerEmail } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/api/appointments', formData);
            onAppointmentAdded();
            setFormData({ service: '', date: '', time: '', customerName: '', customerEmail: '' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <select name="service" value={service} onChange={onChange} required>
                <option value="">Select Service</option>
                {services.map(service => (
                    <option key={service._id} value={service._id}>
                        {service.name}
                    </option>
                ))}
            </select>
            <input
                type="date"
                name="date"
                value={date}
                onChange={onChange}
                required
            />
            <input
                type="time"
                name="time"
                value={time}
                onChange={onChange}
                required
            />
            <input
                type="text"
                name="customerName"
                value={customerName}
                onChange={onChange}
                placeholder="Customer Name"
                required
            />
            <input
                type="email"
                name="customerEmail"
                value={customerEmail}
                onChange={onChange}
                placeholder="Customer Email"
                required
            />
            <button type="submit">Add Appointment</button>
        </form>
    );
};

export default AppointmentForm;