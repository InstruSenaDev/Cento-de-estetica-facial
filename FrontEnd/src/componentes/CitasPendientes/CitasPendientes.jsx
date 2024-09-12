import { useState, useEffect } from 'react';
import supabase from '../../supabase/supabaseconfig';
import "./CitasPendientes.css";
import { ListGroup, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CitasPendientes = ({ token }) => {
    const [appointments, setAppointments] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            let currentUser;
            if (token && token.user) {
                currentUser = token.user;
            } else {
                const { data, error } = await supabase.auth.getUser();
                if (error) {
                    console.error('Error fetching user:', error);
                    return;
                } else {
                    currentUser = data.user;
                }
            }
            if (currentUser) {
                setUser(currentUser);
                localStorage.setItem('userName', currentUser.user_metadata.full_name);
            }
        };

        fetchUser();
    }, [token]);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (user) {
                const { data, error } = await supabase
                    .from('cita')
                    .select(`fecha, duracion, estado, profesional (nombre_profesional), servicio (nombre_servicio)`)
                    .eq('usuarios', user.id);

                if (error) {
                    console.error('Error fetching appointments:', error);
                } else {
                    setAppointments(data || []);
                }
            }
        };

        if (user) {
            fetchAppointments();
        }
    }, [user]);

    return (
        <Container>
            <div className='titulo_citas'>
                <h3>Tus Citas Pendientes</h3>
            </div>
            
            {appointments.length === 0 ? (
                <p>No tienes citas programadas. Por favor inicia sesión para verificar tus citas.</p>
            ) : (
                <ListGroup>
                    {appointments.map((appointment, index) => {
                        const isPast = new Date(appointment.fecha) < new Date();
                        return (
                            <ListGroup.Item 
                                key={index} 
                                className={isPast ? 'past-appointment' : 'future-appointment'}
                            >
                                <p>Fecha: {new Date(appointment.fecha).toLocaleDateString()}</p>
                                <p>Duración: {appointment.duracion}</p>
                                <p>Profesional: {appointment.profesional.nombre_profesional}</p>
                                <p>Servicio: {appointment.servicio.nombre_servicio}</p>
                                <p>Estado: {appointment.estado ? 'Confirmada' : 'Pendiente'}</p>
                                {isPast && <span className='past-info'>Esta cita ya pasó</span>}
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            )}
        </Container>
    );
};

export default CitasPendientes;
