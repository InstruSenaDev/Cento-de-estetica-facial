import React from 'react';
import {AppointmentForm} from '../componentes/AppoinmentForm/AppointmentForm';
import {AppointmentList} from '../componentes/AppoinmentForm/AppointmentList';

const Appointments = () => {
    return (
        <div>
            <h1>Appointments</h1>
            <AppointmentForm />
            <AppointmentList />
        </div>
    );
};

export default Appointments;