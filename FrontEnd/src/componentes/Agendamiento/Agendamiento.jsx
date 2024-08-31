import React, { useEffect, useState } from 'react';
import './Agendamiento.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import supabase from '../../supabase/supabaseconfig';
import FacturacionModal from '../Factura/Factura';

const getDiaSemana = (date) => {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return diasSemana[date.getDay()];
};

export const Agendamiento = () => {
    const [profesionales, setProfesionales] = useState([]);
    const [selectedProfesional, setSelectedProfesional] = useState('');
    const [selectedHora, setSelectedHora] = useState('');
    const [horariosOcupados, setHorariosOcupados] = useState([]);
    const [franjasHorarias, setFranjasHorarias] = useState([]);
    const [date, setDate] = useState(new Date());
    const [userId, setUserId] = useState(null);
    const [showModal, setShowModal] = useState(false);

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
                setProfesionales(data);
            }
        };

        const fetchFranjasHorarias = async () => {
            const { data, error } = await supabase
                .from('franja_horario')
                .select('id_horario, horario');
            if (error) {
                console.error('Error fetching franjas horarias:', error);
            } else {
                setFranjasHorarias(data);
            }
        };

        fetchUser();
        fetchProfesionales();
        fetchFranjasHorarias();
    }, []);

    useEffect(() => {
        const fetchHorariosOcupados = async () => {
            if (selectedProfesional && date) {
                const selectedDate = date.toISOString().split('T')[0];

                const { data, error } = await supabase
                    .from('cita')
                    .select('franja_horaria')
                    .eq('profesional', selectedProfesional)
                    .eq('fecha', selectedDate);

                if (error) {
                    console.error('Error fetching horarios ocupados:', error);
                } else {
                    setHorariosOcupados(data.map(cita => cita.franja_horaria));
                }
            }
        };

        fetchHorariosOcupados();
    }, [selectedProfesional, date]);

    const handleProfesionalChange = (event) => {
        const selectedId = event.target.value;
        setSelectedProfesional(selectedId);
        localStorage.setItem('selectedProfesional', selectedId);
        setSelectedHora('');
        setHorariosOcupados([]);
    };

    const handleHoraClick = (horario, franjaId) => {
        if (isOcupado(franjaId)) {
            return;
        }
        setSelectedHora(horario);
        localStorage.setItem('selectedHora', horario);
    };

    const isOcupado = (franjaId) => {
        return horariosOcupados.includes(franjaId);
    };

    const navigate = useNavigate();
    const { servicio } = useLocation().state || { servicio: { nombre_servicio: "Servicio no especificado", precio: "$0.00" } };
    
    const handleReservarClick = (event) => {
        event.preventDefault();
    
        if (!selectedProfesional || !selectedHora) {
            window.alert('Por favor, selecciona un profesional y una hora.');
            return;
        }

        setShowModal(true); 
    };

    return (
        <div className='todoingreso'>
            <div className='partleft'>
                <div className='escogerprof'>
                    <form action='#' method='post'>
                        <label className='escprof' htmlFor='prof'>
                            <h3>Profesionales</h3>
                        </label>
                        <select
                            name='profesionales'
                            id='prof'
                            onChange={handleProfesionalChange}
                            value={selectedProfesional}
                        >
                            <option value=''>--Escoge profesional--</option>
                            {profesionales.map(profesional => (
                                <option
                                    key={profesional.id_profesional}
                                    value={profesional.id_profesional}
                                >
                                    {profesional.nombre_profesional}
                                </option>
                            ))}
                        </select>
                    </form>
                </div>

                <div className='partright'>
                <Calendar
                    onChange={setDate}
                    value={date}
                    tileDisabled={({ date, view }) => view === 'month' && date < new Date()}
                />
                <div className='escogerhora'>
                    <form action='#' method='post'>

                        <p className='datosfecha'>
                            {getDiaSemana(date)} {date.getDate()} {date.toLocaleDateString('default', { month: 'short' })} {date.getFullYear()}
                        </p>

                    </form>
                </div>
            </div>

                <div className='TotalCuadros'> HORARIOS
                        {franjasHorarias.map(franja => (
                            <div
                                key={franja.id_horario}
                                className={`cuadros ${isOcupado(franja.id_horario) ? 'ocupado' : 'libre'}`}
                                onClick={() => handleHoraClick(franja.horario, franja.id_horario)}
                                style={{ cursor: isOcupado(franja.id_horario) ? 'not-allowed' : 'pointer' }}
                            >
                                {franja.horario}
                            </div>
                        ))}
                    </div>
                
                <div className='partetabla'>
                    <h3 className='resumen'>Agendamiento</h3>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={2} className='colorros'>
                                    {date.getDate()} {date.toLocaleDateString('default', { month: 'short' })} {date.getFullYear()} - {selectedHora}
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
                                <td colSpan={2} className='colorros'>
                                    <button className='botonreservar' onClick={handleReservarClick}>Reservar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div


                     className='TotalCuadros'> HORARIOS
                        {franjasHorarias.map(franja => (
                            <div
                                key={franja.id_horario}
                                className={`cuadros ${isOcupado(franja.id_horario) ? 'ocupado' : 'libre'}`}
                                onClick={() => handleHoraClick(franja.horario, franja.id_horario)}
                                style={{ cursor: isOcupado(franja.id_horario) ? 'not-allowed' : 'pointer' }}
                            >
                                {franja.horario}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='partright'>
                <Calendar
                    onChange={setDate}
                    value={date}
                    tileDisabled={({ date, view }) => view === 'month' && date < new Date()}
                />
                <div className='escogerhora'>
                    <form action='#' method='post'>
                        <p className='datosfecha'>
                            {getDiaSemana(date)} {date.getDate()} {date.toLocaleDateString('default', { month: 'short' })} {date.getFullYear()}
                        </p>
                    </form>
                </div>
                
            </div>

          
            <FacturacionModal 
            
                show={showModal} // Usar 'show' en lugar de 'showModal'
                onHide={() => setShowModal(false)} // Asegúrate de que 'onHide' esté configurado
                fecha={date}
                duracion={selectedHora}
                idProfesional={selectedProfesional}
                servicio={servicio}
                
                
                idUsuario={userId} // Asegúr
            />
            
        </div>
        
        
    );
    console.log(showModal)

    
};

export default Agendamiento;
