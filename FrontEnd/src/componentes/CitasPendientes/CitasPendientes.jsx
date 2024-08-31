import { useState, useEffect } from 'react';
import supabase from '../../supabase/supabaseconfig';
import "./CitasPendientes.css";
import { ListGroup, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cipendendientes.css';

const CitasPendientes = ({ token }) => {
    const [appointments, setAppointments] = useState([]);
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');

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
                setUserName(currentUser.user_metadata.full_name);
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
                    .select(`
                        fecha,
                        duracion,
                        estado,
                        profesional (
                            nombre_profesional
                        ),
                        servicio (
                            nombre_servicio,
                            url_img
                        )
                    `)
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
            <h3>Tus Citas Pendientes  </h3></div>
            
            {appointments.length === 0 ? (
                <p>No tienes citas programadas. Porfavor inicia session para verificar tus citas </p>
            ) : ( 
                <ListGroup>
                    {appointments.map((appointment, index) => (
                        <ListGroup.Item key={index}>
                            <p>Fecha: {new Date(appointment.fecha).toLocaleDateString()}</p>
                            <p>Duración: {appointment.duracion}</p>
                            <p>Profesional: {appointment.profesional.nombre_profesional}</p>
                            <p>Servicio: {appointment.servicio.nombre_servicio}</p>
                            <p>Estado: {appointment.estado ? 'Confirmada' : 'Pendiente'}</p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Container>

       
    );
};

export default CitasPendientes;