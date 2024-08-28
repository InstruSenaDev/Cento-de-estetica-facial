import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../../supabase/supabaseconfig';
import { Modal, Button } from 'react-bootstrap';
// import { Logo } from "../../../src/assets/images/Logo.png";
import './Factura.css';

const Facturacion = ({ token }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { fecha, duracion, idProfesional, servicio, idUsuario } = state;

    const [user, setUser] = useState(null);
    const [nombreProfesional, setNombreProfesional] = useState('');
    const [idHorario, setIdHorario] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            if (token && token.user) {
                setUser(token.user);
            } else {
                const { data, error } = await supabase.auth.getUser();
                if (error) {
                    console.error('Error fetching user:', error);
                } else {
                    setUser(data.user);
                }
            }
        };

        const fetchNombreProfesional = async () => {
            if (idProfesional) {
                const { data, error } = await supabase
                    .from('profesional')
                    .select('nombre_profesional')
                    .eq('id_profesional', idProfesional)
                    .single();

                if (error) {
                    console.error('Error fetching professional name:', error);
                } else {
                    setNombreProfesional(data?.nombre_profesional || '');
                }
            }
        };

        const fetchIdHorario = async () => {
            if (duracion) {
                const { data, error } = await supabase
                    .from('franja_horario')
                    .select('id_horario')
                    .eq('horario', duracion)
                    .single();

                if (error) {
                    console.error('Error fetching horario ID:', error);
                } else {
                    setIdHorario(data?.id_horario || null);
                }
            }
        };

        fetchUser();
        fetchNombreProfesional();
        fetchIdHorario();
    }, [idProfesional, idUsuario, token, duracion]);

    const handleGuardarCita = async () => {
        if (!user) {
            window.alert('Por favor, inicie sesión para continuar.');
            navigate('/loginsupa', { state: { from: '/Facturacion' } });
            return;
        }

        if (!idHorario) {
            console.error('No se pudo obtener el id_horario para la duración.');
            setModalMessage('No se pudo obtener el id_horario para la duración.');
            setShowModal(true);
            return;
        }

        const { data, error } = await supabase
            .from('cita')
            .insert([{
                fecha: fecha.toISOString().split('T')[0],
                franja_horaria: idHorario,
                profesional: idProfesional,
                servicio: servicio?.id_servicios,
                usuarios: user.id,
                duracion: duracion,
                estado: 'true'
            }]);

        if (error) {
            console.error('Error al guardar la cita:', error);
            setModalMessage(`Error al guardar la cita: ${error.message}`);
            setShowModal(true);
        } else {
            setModalMessage('Cita guardada con éxito. Un administrador verificará tu cita.');
            setShowModal(true);
            setTimeout(() => navigate('/'), 1500);
        }
    };

    return (
        <div className='contenedor_facturacion'>
        <div className="facturacion-container">
            <div className="invoice-header">
                <h1>Natalia Salazar Artist</h1>
                <hr />
            </div>

            <div className='explicacion_factura'>
                <h2>Factura</h2>
                <h2>id:factura</h2>
                <h2>Fecha: {fecha.toLocaleDateString()}</h2>
            </div>


            <div className="invoice-body">
                <div className="invoice-section">
                    <div className='titulo_invoice-section'>
                    <p>Detalles de la Cita</p>
                    <hr /></div>

                    <p><strong>Hora:</strong> {duracion}</p>
                    <p><strong>Profesional:</strong> {nombreProfesional}</p>
                    <p><strong>Servicio:</strong> {servicio?.nombre_servicio}</p>
                    <p><strong>Costo:</strong> {servicio?.precio}</p>
                    <p><strong>Cliente:</strong> {user ? user.user_metadata.full_name : 'No disponible'}</p>
                </div>
                <div className='contenido_invoice-section'>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </div>

            <div className="invoice-footer">
                <Button onClick={handleGuardarCita}>Confirmar Cita</Button>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        </div>
    );
};

export default Facturacion;
