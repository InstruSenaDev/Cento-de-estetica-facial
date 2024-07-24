import React, { useState } from 'react';
import AppointmentForm from '../AppoinmentForm/AppointmentForm';
import AppointmentList from '../AppoinmentForm/AppointmentList';
import ServiceForm from '../Servicee/ServiceForm';
import ServiceList from '../Servicee/ServiceList';

const Dashboard = () => {
    const [update, setUpdate] = useState(false);

    const handleUpdate = () => {
        setUpdate(!update);
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <h2>Add Appointment</h2>
                <AppointmentForm onAppointmentAdded={handleUpdate} />
                <AppointmentList key={update} />
            </div>
            <div>
                <h2>Add Service</h2>
                <ServiceForm onServiceAdded={handleUpdate} />
                <ServiceList key={update} />
            </div>
        </div>
        
    );
};

export default Dashboard;