import { useState, useEffect } from 'react';
import supabase from '../../supabase/supabaseconfig';
import "./CitasPendientes.css";
import { ListGroup, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagenfondo from "../../assets/images/imagen_fondo.jpg";

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
        <Container className='citaspendientesbody'>
            <h3 className='citaspendientestitulo'>Tus Citas Pendientes, {userName}</h3>
            {appointments.length === 0 ? (
                <p>No tienes citas programadas</p>
            ) : (
                <div className='cartacompletacitas'>
                    {appointments.map((citas, index) => (
                        <div key={index} className='contenedorcarta'>
                           
                            <div className='subcarta'>
                                <img src={citas.servicio.url_img} alt={citas.servicio.nombre_servicio} className="imagen-servicio" />
                                <p className='contenedorTitulo'>{citas.servicio.nombre_servicio}</p>
                                <p className='contenedorsubtitulo'><b className='fechaAgendadaSubtitulo'>Fecha:</b> {new Date(citas.fecha).toLocaleDateString()}</p>
                                <p className='contenedorsubtitulo'><b className='fechaAgendadaSubtitulo'>Duración:</b> {citas.duracion}</p>
                                <p className='contenedorsubtitulo'><b className='fechaAgendadaSubtitulo'>Profesional:</b> {citas.profesional.nombre_profesional}</p>
                                <p className='contenedorsubtitulo'><b className='fechaAgendadaSubtitulo'>Estado:</b> {citas.estado ? 'Confirmada' : 'Pendiente'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Container>
    );
};

export default CitasPendientes;