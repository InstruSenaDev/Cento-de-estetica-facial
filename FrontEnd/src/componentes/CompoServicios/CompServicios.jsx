import React, { useState, useEffect } from 'react';
import "./CompServicios.css";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import supabase from '../../supabase/supabaseconfig';

export const CompServicios = () => {
  const [servicios, setServicios] = useState([]);
  const navigate = useNavigate(); // Usar useNavigate

  useEffect(() => {
    const fetchServicios = async () => {
      const { data, error } = await supabase
        .from('servicios')
        .select(`* , categorias ( nombreCategoria )`)
        .eq('estado', true);
      if (error) {
        console.error('Error fetching servicios:', error);
      } else {
        console.log('Servicios:', data);
        setServicios(data);
      }
    };
    fetchServicios();
  }, []);

  const  formatoCo = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

  const handleReservar = (servicio) => {
    navigate('/VistaDetalle', { state: { servicio } });
  };

  const renderServiciosPorCategoria = (npombre , titulo, claseTitulo, claseServicio) => (

    <div key={categoria} className={claseTitulo}>
      <h3>{titulo}</h3>
      <div className={claseServicio}>
        {servicios
      .filter(servicio => servicio.categorias && servicio.categorias.nombreCategoria === categoria)
          .map(servicio => (
            
            <div key={servicio.id_servicio} className='serviciosdetc'>
              <div><img src={servicio.url_img} alt={servicio.nombre_servicio} />
              </div>
              <h5>{servicio.nombre_servicio}</h5>
              <h5><b>{formatoCo.format(servicio.precio)}</b></h5>

              <div className="butonSs">
                <button className="button_s" onClick={() => handleReservar(servicio)}>Reservar </button>
              </div>

            </div>
            
          ))}
      </div>
    </div>
  );

  return (
    <div className='componenteServs'>
      <div className='Bannerserviciosg'>
        <div className='tituloserviciosg'>
          <h1>Nuestros servicios</h1>
        </div>
      </div>
      
      <div className='secciones_servicios'>
        {renderServiciosPorCategoria('Cejas', 'Servicio Cejas', 'Titulo_Servicio_Cejas', 'serviciodcejas')}
        {renderServiciosPorCategoria('Pestañas', 'Servicio Pestañas', 'Titulo_Servicio_Pestañas', 'serviciodpestañas')}
        {renderServiciosPorCategoria('Micropigmentación', 'Servicio de Micropigmentación', 'Titulo_Servicio_Microp', 'serviciodmicropig')}
      </div>
    </div>
  );
};

export default CompServicios;