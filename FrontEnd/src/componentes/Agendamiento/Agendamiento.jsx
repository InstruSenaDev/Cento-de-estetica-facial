import React, { useEffect, useState } from 'react';
import './Agendamiento.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import supabase from '../../supabase/supabaseconfig';
import moment from 'moment';

export const Agendamiento = () => {
    const [profesionales, setProfesionales] = useState([]);
    const [selectedProfesional, setSelectedProfesional] = useState('');
    const [selectedHora, setSelectedHora] = useState('');
    const [franjasHorarias, setFranjasHorarias] = useState([]);
    const [citasExistentes, setCitasExistentes] = useState([]);
    const [date, setDate] = useState(null);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { servicio } = useLocation().state || { servicio: { nombre_servicio: "Servicio no especificado", precio: "$0.00" } };

    useEffect(() => {
        const fetchUser = async () => {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
            if (sessionError || !sessionData.session) {
                console.error('Error: No active session:', sessionError);
                setError('No se encontró una sesión activa. Por favor, inicia sesión nuevamente.');
                // Redirige al usuario a la página de inicio de sesión si no hay sesión activa
                navigate('/login');
                return;
            }
    
            const { data, error } = await supabase.auth.getUser();
    
            if (error) {
                console.error('Error fetching user:', error);
                setError('Error al obtener información del usuario');
            } else {
                setUserId(data.user.id);
            }
        };
    


        const fetchProfesionales = async () => {
            const { data, error } = await supabase
                .from('profesional')
                .select('id_profesional, nombre_profesional');
            if (error) {
                console.error('Error fetching profesionales:', error);
                setError('Error al obtener lista de profesionales');
            } else {
                setProfesionales(data || []);
            }
        };

        fetchUser();
        fetchProfesionales();
    }, []);

  useEffect(() => {
    const fetchFranjasHorarias = async () => {
        if (date && selectedProfesional && servicio) {
            const selectedDate = date.toISOString().split('T')[0];
            console.log('Fecha seleccionada:', selectedDate);
            console.log('ID del profesional seleccionado:', selectedProfesional);

            // Agregar filtro por servicio
            const { data: franjas, error: franjasError } = await supabase
                .from('franja_horaria')
                .select('*')
                .eq('fecha', selectedDate)
                .eq('id_profesional', selectedProfesional)
                .eq('nombre_servicio', servicio.nombre_servicio); // Aquí filtramos por el nombre del servicio

            if (franjasError) {
                console.error('Error fetching franjas horarias:', franjasError);
                setError('Error al obtener franjas horarias');
            } else {
                console.log('Franjas horarias obtenidas:', franjas); // Verifica qué se está obteniendo aquí
                setFranjasHorarias(franjas || []);
            }
        }
    };

    fetchFranjasHorarias();
}, [date, selectedProfesional, servicio]);


    const handleProfesionalChange = (event) => {
        const selectedId = event.target.value;
        setSelectedProfesional(selectedId);
        localStorage.setItem('selectedProfesional', selectedId);
        setSelectedHora('');
    };

    // Cambiamos la lógica de validación usando id_horario
    const isHoraOcupada = (idHorario) => {
        return citasExistentes.some(cita => cita.id_horario === idHorario);
    };

    const handleHoraClick = (hora, idHorario) => {
        if (isHoraOcupada(idHorario)) {
            alert('Esta hora ya está ocupada. Por favor, elige otra.');
            return;
        }
        console.log('Hora seleccionada:', hora, 'ID Horario:', idHorario); // Depuración
        setSelectedHora(hora);
        localStorage.setItem('selectedHora', hora);
    };
    
    const handleReservarClick = async (event) => {
        event.preventDefault();
    
        if (!selectedProfesional || !selectedHora || !date) {
            window.alert('Por favor, selecciona un profesional, una fecha y una hora.');
            return;
        }
    
        const selectedDate = date.toISOString().split('T')[0];
    
        // Validar si ya hay una cita para el mismo profesional, fecha y hora
        const { data: citas, error: citasError } = await supabase
            .from('cita')
            .select('*')
            .eq('fecha', selectedDate)
            .eq('profesional', selectedProfesional)
            .eq('duracion', selectedHora);
    
        if (citasError) {
            console.error('Error fetching existing citas:', citasError);
            setError('Error al verificar citas existentes.');
            return;
        }
    
        if (citas.length > 0) {
            window.alert('Ya existe una cita en el horario seleccionado.');
            return;
        }
    
        const { error } = await supabase
            .from('cita')
            .insert({
                fecha: selectedDate,
                estado: 'reservado',
                usuarios: userId,
                servicios: servicio.id_servicio,
                profesional: selectedProfesional,
                duracion: selectedHora
            });
    
        if (error) {
            console.error('Error al crear la cita:', error);
            setError('Hubo un error al reservar la cita. Por favor, inténtalo de nuevo.');
            return;
        }
    
        navigate('/Facturacion', {
            state: {
                fecha: date,
                duracion: selectedHora,
                idProfesional: selectedProfesional,
                servicio: {
                    id_servicios: servicio.id_servicios,
                    nombre_servicio: servicio.nombre_servicio,
                    precio: servicio.precio
                }
            }
        });
    };
    
    
    const tileDisabled = ({ date }) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className='agendamiento-container'>
            <div className='header_agendamiento'>
                <h3>Agenda Tu Cita</h3>
            </div>

            <div className='main-content'>
                <div className='left-section'>
                    <div className='seleccion-container'>
                        <h3>Elige un Profesional</h3>
                        <div className='select_contenedor_profesionales'>
                            <select className="select_profesional" onChange={handleProfesionalChange} value={selectedProfesional}>
                                <option value=''>--Escoge profesional--</option>
                                {profesionales.map(profesional => (
                                    <option key={profesional.id_profesional} value={profesional.id_profesional}>
                                        {profesional.nombre_profesional}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='hr'>
                        <hr />
                    </div>

                    <div className='titulo_calendario_escoger_fecha'>
                        <h3>Escoge La fecha</h3>
                        <p>Selecciona el día de tu cita</p>
                    </div>

                    <div className='seccion_calendario_escoger_fecha'>
                        <div className='calendario-container'>
                            <Calendar
                                className="react_calendar_fecha"
                                onChange={setDate}
                                value={date}
                                tileDisabled={tileDisabled}
                            />

                            <div className='horarios-container'>
                                <div className='titulo_horarios'>
                                    <h3>Horarios Disponibles</h3>
                                </div>


                                <div className='horarios-grid'>
                                    
                                    {franjasHorarias.length > 0 ? ( franjasHorarias.map(franja => (
                                        
                                        <div key={franja.id_horario} className={`cuadros ${isHoraOcupada(franja.id_horario) ? 'ocupado' : 'libre'}`}
                                        onClick={() => handleHoraClick(franja.hora, franja.id_horario)} 
                                        style={{ cursor: isHoraOcupada(franja.id_horario) ? 'not-allowed' : 'pointer',
                                            opacity: isHoraOcupada(franja.id_horario) ? 0.5 : 1 }}>
                                                {moment(franja.hora, 'HH:mm').format('h:mm A')}
                                                </div>
                                                ))
                                            ) : ( <p>No hay franjas horarias disponibles</p>)
                                            }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='right-section'>
                    <div className='Resumendecompra_Agendamiento'>
                        <div className='titulo_Resumendecompra_Agendamiento'>
                            <h3>Resumen de Compra</h3>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={2}>
                                        {date ? `${date.getDate()} ${date.toLocaleDateString('default', { month: 'short' })} ${date.getFullYear()} - ${moment(selectedHora, 'HH:mm').format('h:mm A')}` : 'Selecciona una fecha'}
                                    </th>
                                </tr>
                                <tr>
                                    <th>Profesional</th>
                                    <td>{selectedProfesional}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Servicio</th>
                                    <td>{servicio.nombre_servicio}</td>
                                </tr>
                                <tr>
                                    <th>Hora</th>
                                    <td>{moment(selectedHora, 'HH:mm').format('h:mm A')}</td>
                                </tr>
                                <tr>
                                    <th>Costo</th>
                                    <td>
                                        <h5><b>{new Intl.NumberFormat('es-CO', {
                                            style: 'currency',
                                            currency: 'COP',
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 2
                                        }).format(servicio.precio)}</b></h5>
                                    </td>
                                </tr>
                                <tr>
                                    <div className='.boton_reservar_cita'>
                                        <td colSpan={2}>
                                            <button className='.boton_reservar_cita' onClick={handleReservarClick}>Reservar</button>
                                        </td> </div>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Agendamiento;
