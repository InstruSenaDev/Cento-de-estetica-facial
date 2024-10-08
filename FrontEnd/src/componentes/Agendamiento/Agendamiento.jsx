import React, { useEffect, useState } from 'react';
import './Agendamiento.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import supabase from '../../supabase/supabaseconfig';

export const Agendamiento = () => {
    const [profesionales, setProfesionales] = useState([]);
    const [selectedProfesional, setSelectedProfesional] = useState('');
    const [selectedHora, setSelectedHora] = useState('');
    const [horariosOcupados, setHorariosOcupados] = useState([]);
    const [franjasHorarias, setFranjasHorarias] = useState([]);
    const [date, setDate] = useState(null); // Cambiar a null inicialmente
    const [userId, setUserId] = useState(null);

    const navigate = useNavigate();
    const { servicio } = useLocation().state || { servicio: { nombre_servicio: "Servicio no especificado", precio: "$0.00" } };

    // Fetch user and professionals data
    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data) {
                setUserId(data.user.id);
            } else {
                console.error('Error fetching user:', error);
            }
        };

        const fetchProfesionales = async () => {
            const { data, error } = await supabase
                .from('profesional')
                .select('id_profesional, nombre_profesional');
            if (error) {
                console.error('Error fetching profesionales:', error);
            } else {
                setProfesionales(data || []);
            }
        };

        fetchUser();
        fetchProfesionales();
    }, []);

    // Fetch franjas horarias whenever date changes
    useEffect(() => {
        const fetchFranjasHorarias = async () => {
            if (date) {
                const selectedDate = date.toISOString().split('T')[0];
                const { data, error } = await supabase
                    .from('franja_horaria')
                    .select('id_horario, hora, estado, fecha')
                    .eq('fecha', selectedDate);

                if (error) {
                    console.error('Error fetching franjas horarias:', error);
                } else {
                    setFranjasHorarias(data || []);
                }
            }
        };

        fetchFranjasHorarias();
    }, [date]);

    useEffect(() => {
        const fetchHorariosOcupados = async () => {
            if (selectedProfesional && date && servicio) {
                const selectedDate = date.toISOString().split('T')[0];
                const { data, error } = await supabase
                    .from('cita')
                    .select('franja_horaria')
                    .eq('profesional', selectedProfesional)
                    .eq('fecha', selectedDate)
                    .eq('servicio', servicio.id_servicios);

                if (error) {
                    console.error('Error fetching horarios ocupados:', error);
                } else {
                    setHorariosOcupados(data.map(cita => cita.franja_horaria) || []);
                }
            }
        };

        fetchHorariosOcupados();
    }, [selectedProfesional, date, servicio]);

    const handleProfesionalChange = (event) => {
        const selectedId = event.target.value;
        setSelectedProfesional(selectedId);
        localStorage.setItem('selectedProfesional', selectedId);
        setSelectedHora('');
        setHorariosOcupados([]); // Reset horarios ocupados cuando se cambia el profesional
    };

    const handleHoraClick = (hora, franjaId) => {
        if (isOcupado(franjaId)) {
            alert('Esta hora ya está ocupada. Por favor, elige otra.');
            return;
        }
        setSelectedHora(hora);
        localStorage.setItem('selectedHora', hora);
    };

    const isOcupado = (franjaId) => {
        return horariosOcupados.includes(franjaId);
    };

    const handleReservarClick = (event) => {
        event.preventDefault();

        if (!selectedProfesional || !selectedHora) {
            window.alert('Por favor, selecciona un profesional y una hora.');
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
        today.setHours(0, 0, 0, 0); // Resetear la hora para comparación solo de fechas

        // Deshabilitar el día actual y días pasados
        if (date.toDateString() === today.toDateString()) {
            console.log('No se puede seleccionar el día actual. Por favor, elige una fecha futura.');
            return true;
        }
        return date < today; // Deshabilitar días pasados
    };

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
                                    {franjasHorarias.map(franja => (
                                        <div key={franja.id_horario}
                                             className={`cuadros ${isOcupado(franja.id_horario) ? 'ocupado' : 'libre'}`}
                                             onClick={() => handleHoraClick(franja.hora, franja.id_horario)}
                                             style={{ cursor: isOcupado(franja.id_horario) ? 'not-allowed' : 'pointer', opacity: isOcupado(franja.id_horario) ? 0.5 : 1 }}>
                                            {franja.hora}
                                        </div>
                                    ))}
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
                                        {date ? `${date.getDate()} ${date.toLocaleDateString('default', { month: 'short' })} ${date.getFullYear()} - ${selectedHora}` : 'Selecciona una fecha'}
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
                                    <th>Duración</th>
                                    <td>{selectedHora}</td>
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
                                    <td colSpan={2}>
                                        <button onClick={handleReservarClick}>Reservar</button>
                                    </td>
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
