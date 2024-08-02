import React, { useState, useEffect } from 'react';
import '../Factura/Factura.css';
import { useLocation } from 'react-router-dom';


export const Facturaser = () => {

        const [hora, setHora] = useState(new Date().toLocaleTimeString());
      
        useEffect(() => {
          const actualizarHora = () => {
            setHora(new Date().toLocaleTimeString());
          };
      
          // Actualiza la hora cada segundo
          const intervalo = setInterval(actualizarHora, 1000);
      
          // Limpia el intervalo cuando el componente se desmonte
          return () => clearInterval(intervalo);
        }, []);
      

    const location = useLocation();
    const { service } = location.state || { service: { name: "Servicio no especificado", price: "$0.00" } };

    // Recupera la hora seleccionada del almacenamiento local
    const selectedHora = localStorage.getItem('selectedHora') || 'No especificada';
    // Recupera el nombre del profesional del almacenamiento local
    const selectedProfesional = localStorage.getItem('selectedProfesional') || 'No especificado';
    // Recupera la fecha seleccionada del almacenamiento local (opcional)
    const selectedDate = new Date(localStorage.getItem('selectedDate')) || new Date();
    const formattedDate = `${selectedDate.getDate()} ${selectedDate.toLocaleDateString('default', { month: 'short' })} ${selectedDate.getFullYear()}`;
    return (
        <div>
            <div className='apartadoizquierdo_factura'>
                <h2>Estás a un paso de reservar tu cita con nosotros</h2>
                <button>Confirmar</button>
            </div>
            <div className='apartado_derecho_factura'>
                <table>
                    <thead>
                        <tr>
                            <th>Factura</th>
                            <th>{hora}</th>
                            </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>ID Factura</th>
                            <td>factura</td>
                        </tr>
                        <tr>
                            <th>Profesional</th>
                            <td>{selectedProfesional}</td> {/* Muestra el nombre del profesional */}
                        </tr>
                        <tr>
                            <th>Cliente</th>
                            <td>nombre cliente</td>
                        </tr>
                        <tr>
                            <th>Servicio</th>
                            <td>{service.name}</td>
                        </tr>
                        <tr>
                            <th>Costo</th>
                            <td>{service.price}</td>
                        </tr>
                        <tr>
                            <th>Fecha</th>
                            <td>{formattedDate}</td> {/* Muestra la fecha seleccionada */}
                        </tr>
                        <tr>
                            <th>Hora</th>
                            <td>{selectedHora}</td> {/* Muestra la hora seleccionada */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Facturaser;
