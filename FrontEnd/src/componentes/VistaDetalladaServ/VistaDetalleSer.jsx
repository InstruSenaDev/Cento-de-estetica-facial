import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../Servicio_detalle/Serviciocejas';
import "./VistaDetalleservi.css"

export const VistaDetalle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { servicio } = location.state || {};

  const handleReservar = () => {
    navigate('/Agendarcita', { state: { servicio } });
  };


  return (
    <div className='contenedor_total' style={{flex:1}}>
      <div className='banneer'>
        <h1 className='detallserv'>Detalle del Servicio</h1>
      </div>

      <div className='content_total'>
        <div className='tarjeta'>
          <div className='contenido_ds'>
            <div className='titulo_ds'>
              <h1>{servicio.nombre_servicio}</h1>
            </div>
            <div className='detalle_ds'>
              <p>{servicio.descripcion}</p>
            </div>
            <div className='botontyp'>
              <div className='tiempo'>
                <h4>{servicio.duracion} </h4>
                <p>Tiempo</p>
              </div>
              <div className='precio'>
                <h4><b>{new Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                }).format(servicio.precio)}</b></h4>
                <p>Precio</p>
              </div>
            </div>
            <div className='botones'>
              <button className="button_R" onClick={handleReservar}>Reservar</button>
            </div>
          </div>
          <div className='imagen-contenedor'>
            <img className='imagen' src={servicio.url_img} alt={servicio.nombre_servicio} />
            <p className='leyenda'>Confía en nuestros expertos para obtener unas cejas perfectamente diseñadas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaDetalle;
