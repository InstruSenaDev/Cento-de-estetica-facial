import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        const res = await axios.get('/api/appointments');
        setAppointments(res.data);
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const deleteAppointment = async (id) => {
        try {
            await axios.delete(`/api/appointments/${id}`);
            fetchAppointments();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Appointments</h2>
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment._id}>
                        <p>Service: {appointment.service.name}</p>
                        <p>Date: {appointment.date}</p>
                        <p>Time: {appointment.time}</p>
                        <p>Customer: {appointment.customerName}</p>
                        <p>Email: {appointment.customerEmail}</p>
                        <button onClick={() => deleteAppointment(appointment._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;