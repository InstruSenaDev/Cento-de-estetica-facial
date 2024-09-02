import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './ServiciosAdmin.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import supabase from '../../supabase/supabaseconfig';

export function ServiciosAdmin() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [serviceTimes, setServiceTimes] = useState({});
  const [servicios, setServicios] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [editableService, setEditableService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newService, setNewService] = useState({
    nombre_servicio: '',
    descripcion: '',
    duracion: '',
    precio: ''
  });

  useEffect(() => {
    const fetchServicios = async () => {
      const { data, error } = await supabase.from('servicios').select('*');
      if (error) console.error('Error fetching servicios:', error);
      else setServicios(data);
    };

    fetchServicios();
  }, []);

  const handleEditClick = async (service) => {
    setEditableService(service);
    setModalOpen(true);
    setSelectedService(null); // Reset selected service to hide calendar
    setServiceTimes({}); // Clear service times
  };

  const handleSelectClick = async (service) => {
    setSelectedService(service);
    setEditableService(null); // Reset editable service
    setModalOpen(false); // Close modal if open
  
    // Reset service times and selected dates
    setServiceTimes({});
    setSelectedDates([]);
  
    // Fetch service times for the selected service using nombre_servicio
    const { data, error } = await supabase
      .from('franja_horaria_nueva')
      .select('*')
      .eq('nombre_servicio', service.nombre_servicio);
  
    if (error) console.error('Error fetching service times:', error);
    else {
      const serviceTimes = data.reduce((acc, item) => {
        const date = new Date(item.fecha);
        if (!acc[date.toDateString()]) {
          acc[date.toDateString()] = [];
        }
        acc[date.toDateString()].push(item.hora);
        return acc;
      }, {});
      setServiceTimes(serviceTimes);
      setSelectedDates(Object.keys(serviceTimes).map(date => new Date(date))); // Set selected dates for calendar
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditableService(null);
    setSelectedService(null); // Also reset the selected service to hide calendar
  };

  const handleServiceUpdate = async () => {
    if (!editableService) return;

    const { data, error } = await supabase
      .from('servicios')
      .update({
        nombre_servicio: editableService.nombre_servicio,
        descripcion: editableService.descripcion,
        duracion: editableService.duracion,
        precio: editableService.precio
      })
      .eq('id_servicios', editableService.id_servicios);

    if (error) {
      console.error('Error al actualizar servicio:', error);
      alert(`Error actualizando el servicio: ${error.message}`);
    } else {
      setServicios(prevServicios =>
        prevServicios.map(service =>
          service.id_servicios === editableService.id_servicios ? editableService : service
        )
      );
      handleModalClose();
    }
  };

  const handleAddService = async () => {
    if (!newService.nombre_servicio || !newService.descripcion || !newService.duracion || !newService.precio) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const { data, error } = await supabase
      .from('servicios')
      .insert([newService]);

    if (error) {
      console.error('Error al añadir servicio:', error);
      alert(`Error añadiendo el servicio: ${error.message}`);
    } else {
      setServicios([...servicios, ...data]);
      setNewService({
        nombre_servicio: '',
        descripcion: '',
        duracion: '',
        precio: ''
      });
    }
  };

  const handleDateChange = (date) => {
    if (selectedService) {
      const newSelectedDates = selectedDates.some(d => d.toDateString() === date.toDateString())
        ? selectedDates.filter(d => d.toDateString() !== date.toDateString())
        : [...selectedDates, date];

      setSelectedDates(newSelectedDates);
      const newServiceTimes = { ...serviceTimes };
      newSelectedDates.forEach(d => {
        if (!newServiceTimes[d.toDateString()]) {
          newServiceTimes[d.toDateString()] = [];
        }
      });
      setServiceTimes(newServiceTimes);
    }
  };
  const handleTimeChange = (date, index, value) => {
    if (selectedService) {
      const dateString = date.toDateString();
      const newServiceTimes = { ...serviceTimes };
  
      // Validar si la nueva hora ya existe
      if (newServiceTimes[dateString].includes(value)) {
        alert('Esta hora ya está seleccionada.');
        return;
      }
  
      newServiceTimes[dateString][index] = value;
      setServiceTimes(newServiceTimes);
    }
  };

  const addTime = (date) => {
    if (selectedService) {
      const dateString = date.toDateString();
      const newServiceTimes = { ...serviceTimes };
  
      // Validar si la hora '00:00' ya está presente
      if (newServiceTimes[dateString] && newServiceTimes[dateString].includes('00:00')) {
        alert('Esta hora ya está seleccionada.');
        return;
      }
  
      if (!newServiceTimes[dateString]) {
        newServiceTimes[dateString] = [];
      }
  
      newServiceTimes[dateString].push('00:00');
      setServiceTimes(newServiceTimes);
    }
  };

  const removeTime = (date, index) => {
    if (selectedService) {
      const dateString = date.toDateString();
      const newServiceTimes = { ...serviceTimes };
      newServiceTimes[dateString].splice(index, 1);
      setServiceTimes(newServiceTimes);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && selectedService) {
      return selectedDates.some(d => d.toDateString() === date.toDateString()) ? 'selected-date' : null;
    }
  };

  const handleUpdateAll = async () => {
  // Prepare data for update
  const allUpdates = Object.entries(serviceTimes).flatMap(([date, times]) => 
    times.map(time => ({
      nombre_servicio: selectedService.nombre_servicio,
      fecha: date,
      hora: time,
      estado: 'disponible' // Assuming default status is available
    }))
  );

  // Check for existing records with the same date and time
  for (let update of allUpdates) {
    const { data: existingRecords, error: checkError } = await supabase
      .from('franja_horaria')
      .select('*')
      .eq('nombre_servicio', update.nombre_servicio)
      .eq('fecha', update.fecha)
      .eq('hora', update.hora);

    if (checkError) {
      console.error('Error verificando duplicados:', checkError);
      alert(`Error verificando duplicados: ${checkError.message}`);
      return;
    }

    if (existingRecords.length > 0) {
      alert(`Ya existe una franja horaria para la fecha ${update.fecha} a las ${update.hora}. No se guardará.`);
      continue; // Skip this update
    }

    // Proceed with the upsert only if no duplicates found
    const { error: insertError } = await supabase.from('franja_horaria').upsert([update]);

    if (insertError) {
      console.error('Error al actualizar horarios de servicios:', insertError);
      alert(`Error actualizando horarios de servicios: ${insertError.message}`);
      return;
    }
  }

  alert('Horarios actualizados correctamente.');
  // Reset updates after successful submission
  setServiceTimes({});
};

  return (
    <Container>
      <div className="titulo_Header_Servicios_Admin">
        <h1>Sección Servicios</h1>
      </div>

      <div className="Tabla_Contenido_Servicios_Admin">
        <div className="titulo_Contenido_Header_Servicios_Admin">
          <h3>Servicios</h3>
          <h3>Ajustes</h3>
        </div>

        <div className="ediciones_header">
          <div className="contenido_Header_Servicios_Admin">
            {servicios.map(service => (
              <div key={service.id_servicios} className="edicion_contenido">
                <button className="nombre_servicio_boton" onClick={() => handleSelectClick(service)}>
                  {service.nombre_servicio}
                </button>

                <div className="ajustes_edicion_contenido">
                  <button className="edicion_contenido_boton" onClick={() => handleEditClick(service)}>
                    editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedService && (
          <div className="calendario_Contenido_Servicios_Admin">
            <div className="titulo_calendario_Contenido_Servicios_Admin">
              <h3>Calendario Citas</h3>
            </div>
            <div className='calendario-container'>
              <Calendar
                onChange={handleDateChange}
                value={null}
                tileClassName={tileClassName}
                prevLabel={null}
                nextLabel={null}
                showNeighboringMonth={false}
              />
            </div>
            <div className='escogerhora'>
              <form action='#' method='post'>
                <p className='datosfecha'>
                  {selectedDates.map(date => (
                    <div key={date.toDateString()} className="fecha-seleccionada">
                      <div>
                        {date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <div>
                        {serviceTimes[date.toDateString()] && serviceTimes[date.toDateString()].map((time, index) => (
                          <div key={index}>
                            <input
                              type="time"
                              value={time}
                              onChange={(e) => handleTimeChange(date, index, e.target.value)}
                            />
                            <button type="button" onClick={() => removeTime(date, index)}>Eliminar Hora</button>
                          </div>
                        ))}
                        <button type="button" className="añadirhora_servicios" onClick={() => addTime(date)}>Añadir Hora</button>
                      </div>
                    </div>
                  ))}
                </p>
              </form>
            </div>
          </div>
        )}

        <div className='actualizar_horario_servicio'>
          <button className='btn-flotante' onClick={handleUpdateAll}>Actualizar</button>
        </div>

        <div className='titulo-add-service'>
          <h2>Añadir Servicio</h2>
        </div>
        <div className="add-service-container">
          <p>Nombre:
            <input
              type="text"
              value={newService.nombre_servicio}
              onChange={(e) => setNewService({ ...newService, nombre_servicio: e.target.value })}
            />
          </p>
          <p>Descripción:
            <input
              type="text"
              value={newService.descripcion}
              onChange={(e) => setNewService({ ...newService, descripcion: e.target.value })}
            />
          </p>
          <p>Duración:
            <input
              type="text"
              value={newService.duracion}
              onChange={(e) => setNewService({ ...newService, duracion: e.target.value })}
            />
          </p>
          <p>Precio:
            <input
              type="number"
              value={newService.precio}
              onChange={(e) => setNewService({ ...newService, precio: e.target.value })}
            />
          </p>
          <button className="handleAddService" onClick={handleAddService}>Añadir Servicio</button>
        </div>

        {modalOpen && (
          <Modal>
            <div className="modal-content">
              <h2>{editableService ? 'Editar Servicio' : 'Ver Servicio'}</h2>
              {editableService && (
                <div className="modal-fields">
                  <p>ID: {editableService.id_servicios}</p>
                  <p>Nombre:
                    <input
                      type="text"
                      value={editableService.nombre_servicio}
                      onChange={(e) => setEditableService({ ...editableService, nombre_servicio: e.target.value })}
                    />
                  </p>
                  <p>Descripción:
                    <input
                      type="text"
                      value={editableService.descripcion}
                      onChange={(e) => setEditableService({ ...editableService, descripcion: e.target.value })}
                    />
                  </p>
                  <p>Duración:
                    <input
                      type="text"
                      value={editableService.duracion}
                      onChange={(e) => setEditableService({ ...editableService, duracion: e.target.value })}
                    />
                  </p>
                  <p>Precio:
                    <input
                      type="number"
                      value={editableService.precio}
                      onChange={(e) => setEditableService({ ...editableService, precio: e.target.value })}
                    />
                  </p>
                  <button onClick={handleServiceUpdate}>Actualizar</button>
                </div>
              )}
              <button onClick={handleModalClose}>Cerrar</button>
            </div>
          </Modal>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
