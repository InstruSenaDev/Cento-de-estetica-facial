import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './ServiciosAdmin.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import supabase from '../../supabase/supabaseconfig';
import { ThemeContext } from '../../App';

export function ServiciosAdmin() {
  const { theme } = React.useContext(ThemeContext);
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
    setSelectedService(null);
    setServiceTimes({});
  };

  const handleSelectClick = async (service) => {
    setSelectedService(service);
    setEditableService(null);
    setModalOpen(false);
    setServiceTimes({});
    setSelectedDates([]);

    const { data, error } = await supabase
      .from('franja_horaria')
      .select('*')
      .eq('nombre_servicio', service.nombre_servicio)
      .eq('id_profesional', 1); // Filtrar por id_profesional 1


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
      setSelectedDates(Object.keys(serviceTimes).map(date => new Date(date)));
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditableService(null);
    setSelectedService(null);
  };

  const handleServiceUpdate = async () => {
    if (!editableService) return;

    const { data, error } = await supabase
      .from('servicios')
      .update(editableService)
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
    const allUpdates = Object.entries(serviceTimes).flatMap(([date, times]) =>
      times.map(time => ({
        nombre_servicio: selectedService.nombre_servicio,
        fecha: date,
        hora: time,
        estado: 'disponible',
        id_profesional: 1 // Agregar id_profesional aquí
      }))
    );

    for (let update of allUpdates) {
      const { data: existingRecords, error: checkError } = await supabase
        .from('franja_horaria')
        .select('*')
        .eq('nombre_servicio', update.nombre_servicio)
        .eq('fecha', update.fecha)
        .eq('hora', update.hora)
        .eq('id_profesional', update.id_profesional); // Verificar por id_profesional

      if (checkError) {
        console.error('Error verificando duplicados:', checkError);
        alert(`Error verificando duplicados: ${checkError.message}`);
        return;
      }

      if (existingRecords.length > 0) {
        alert(`Ya existe una franja horaria para la fecha ${update.fecha} a las ${update.hora}. No se guardará.`);
        continue;
      }

      const { error: insertError } = await supabase.from('franja_horaria').upsert([update]);

      if (insertError) {
        console.error('Error al actualizar horarios de servicios:', insertError);
        alert(`Error actualizando horarios de servicios: ${insertError.message}`);
        return;
      }
    }

    alert('Horarios actualizados correctamente.');
    setServiceTimes({});
  };

  const handleToggleService = async () => {
    if (!editableService) return;

    // Cambiar el estado del servicio
    const updatedService = {
      ...editableService,
      estado: !editableService.estado // Cambiar el estado actual
    };

    const { data, error } = await supabase
      .from('servicios')
      .update(updatedService)
      .eq('id_servicios', updatedService.id_servicios);

    if (error) {
      console.error('Error al habilitar/deshabilitar servicio:', error);
      alert(`Error habilitando/deshabilitando el servicio: ${error.message}`);
    } else {
      setEditableService(updatedService);
      setServicios(prevServicios =>
        prevServicios.map(service =>
          service.id_servicios === updatedService.id_servicios ? updatedService : service
        )
      );
    }
  };

  return (
    <Container theme={theme}>
      <div className="contenedor_servicio_Admin">
        <Header theme={theme}>
          <h1>Sección Servicios</h1>
          <p>Hola, en esta sección podrás agregar las horas disponibles para las citas por cada servicio.</p>
          <p><strong>Recomendación</strong></p>
          <p>Agendar las citas de la semana con anticipación ya que al cliente no se le permite agendar citas para el mismo día.</p>
        </Header>

        <TableContainer>
          <TableHeader theme={theme}>
            <h3>Servicios</h3>
            <h3>Ajustes</h3>
          </TableHeader>

          <ServiceList>
            {servicios.map(service => (
              <ServiceItem key={service.id_servicios} theme={theme}>

                <ServiceButton theme={theme}
                  className={`nombre_servicio_boton ${service.estado ? 'habilitado' : 'inhabilitado'}`}
                  onClick={() => handleSelectClick(service)}>
                  <p> {service.nombre_servicio}</p>
                  <StatusDot active={service.estado} />
                </ServiceButton>
                <EditButton onClick={() => handleEditClick(service)} theme={theme} >editar</EditButton >
              </ServiceItem>
            ))}
          </ServiceList>

          {selectedService && (
            <CalendarContainer theme={theme} >
              <h3 theme={theme} >Agregar horas para {selectedService.nombre_servicio}</h3>
              <StyledCalendar
                onChange={handleDateChange}
                value={null}
                tileClassName={tileClassName}
                prevLabel={null}
                nextLabel={null}
                showNeighboringMonth={false}
              />
              <HourSelection>
                <form>
                  {selectedDates.map(date => (
                    <DateSelection key={date.toDateString()}>
                      <div>
                        {date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <div>
                        {serviceTimes[date.toDateString()] && serviceTimes[date.toDateString()].map((time, index) => (
                          <TimeInput key={index}>
                            <input
                              type="time"
                              value={time}
                              onChange={(e) => handleTimeChange(date, index, e.target.value)}
                            />
                            <button type="button" onClick={() => removeTime(date, index)}>Eliminar Hora</button>
                          </TimeInput>
                        ))}
                        <button type="button" onClick={() => addTime(date)}>Añadir Hora</button>
                      </div>
                    </DateSelection>
                  ))}
                </form>
              </HourSelection>
            </CalendarContainer>
          )}

          <UpdateButton>
            <FloatingButton onClick={handleUpdateAll} theme={theme}> Actualizar </FloatingButton>
          </UpdateButton>

          <AddServiceSection theme={theme} >
            <Titleservice theme={theme} >Añadir Servicio</Titleservice>
            <ServiceInput theme={theme} >
              <label>
                Nombre:
                <input type="text" value={newService.nombre_servicio} onChange={(e) => setNewService({ ...newService, nombre_servicio: e.target.value })} />
              </label>
              <label>
                Descripción:
                <input type="text" value={newService.descripcion} onChange={(e) => setNewService({ ...newService, descripcion: e.target.value })} />
              </label>
              <label>
                Duración:
                <input type="text" value={newService.duracion} onChange={(e) => setNewService({ ...newService, duracion: e.target.value })} />
              </label>
              <label>
                Precio:
                <input type="number" value={newService.precio} onChange={(e) => setNewService({ ...newService, precio: e.target.value })} />
              </label>
              <HandleAddServiceButton theme={theme} onClick={handleAddService}>Añadir Servicio</HandleAddServiceButton>
            </ServiceInput>
          </AddServiceSection>

          {modalOpen && (
            <Modal theme={theme}>
              <div className="modal-content">
                <h2>{editableService ? 'Editar Servicio' : 'Ver Servicio'}</h2>
                {editableService && (
                  <ModalFields>
                    <p>ID: {editableService.id_servicios}</p>
                    <p>Nombre:
                      <input type="text" value={editableService.nombre_servicio} onChange={(e) => setEditableService({ ...editableService, nombre_servicio: e.target.value })} />
                    </p>
                    <p>Descripción:
                      <input type="text" value={editableService.descripcion} onChange={(e) => setEditableService({ ...editableService, descripcion: e.target.value })} />
                    </p>
                    <p>Duración:
                      <input type="text" value={editableService.duracion} onChange={(e) => setEditableService({ ...editableService, duracion: e.target.value })} />
                    </p>
                    <p>Precio:
                      <input type="number" value={editableService.precio} onChange={(e) => setEditableService({ ...editableService, precio: e.target.value })} />
                    </p>
                    <p>
                      <label>
                        Habilitado:
                        <input type="checkbox" checked={editableService.estado} onChange={handleToggleService} />
                      </label>
                    </p>
                    <button theme={theme} onClick={handleServiceUpdate}>Actualizar</button>
                  </ModalFields>
                )}
                <button theme={theme} onClick={handleModalClose}>Cerrar</button>
              </div>
            </Modal>
          )}
        </TableContainer>
      </div>
    </Container>
  );
}


const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${props => props.theme === 'light' ? '#f5f5f5' : '#21252B'};
  color: ${props => props.theme === 'light' ? '#202020' : '#fff'};
  transition: all 0.3s ease;
  border-radius: 10px;
`;


const Header = styled.div`
  background-color: ${({ theme }) => theme === 'light' ? ' #fcebf2' : '#444'};
  
  h1, h2 {
    font-size: 30px;
    color: ${props => props.theme === 'light' ? '#202020' : '#fff'};
  }
 border: 10px solid ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
  border-radius: 10px;
text-align: center;
padding: 15px;
font-family: "Playfair Display", serif;
font-weight: normal;
margin-bottom: 20px;
`;

const TableContainer = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
`;

const TableHeader = styled.div`
  background-color: ${({ theme }) => theme === 'light' ? '#fcebf2' : '#333'};
  border: 2px solid ${({ theme }) => theme === 'light' ? '#c98695' : '#9247FC'};
  border-radius: 10px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  color: ${({ theme }) => theme === 'light' ? '#000' : '#fff'};
`;

const ServiceList = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`;

const ServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${({ theme }) => theme === 'light' ? '#ffffff' : '#444'};
  border: 1px solid ${({ theme }) => theme === 'light' ? '#e0e0e0' : '#666'};
  color: ${({ theme }) => theme === 'light' ? '#000' : '#fff'};

  border-radius: 5px;
  width: 100%;
    p {
    color: ${props => props.theme === 'light' ? '#202020' : '#fff'};
  }
`;

const ServiceButton = styled.button`
font-size: 17px;
background-color: transparent;
border: none;
color: #000;
cursor: pointer;
`;

const EditButton = styled.button`
  font-size: 14px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme === 'light' ? '#c98695' : '#6A5ACD'}; /* Cambia según el tema */
  color: #fff; /* Color del texto */
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme === 'light' ? '#a75d53' : '#483D8B'}; /* Cambia según el tema */
  }
`;


const CalendarContainer = styled.div`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
   background-color: ${props => props.theme === 'light' ? '#f5f5f5' : '#21252B'};
  color: ${props => props.theme === 'light' ? '#202020' : '#fff'};
  
  h3 {
    font-size: 30px;
    color: ${props => props.theme === 'light' ? '#202020' : '#fff'};
  
 border: 10px solid ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
  border-radius: 10px;
text-align: center;
padding: 15px;
font-family: "Playfair Display", serif;
font-weight: normal;
margin-bottom: 20px;
}
`;

// Estilos para el calendario
const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 100%;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;

  &__tile {
    border-radius: 5px;
    padding: 10px;
  }

  &__tile--active,
  &__tile--hasActive {
    background-color: ${({ theme }) => theme.activeBackground};
    color: ${({ theme }) => theme.activeColor};
  }
`;

// Otros estilos
const HourSelection = styled.div`
  margin-top: 10px;
`;

const DateSelection = styled.div`
  margin-bottom: 10px;
`;

const TimeInput = styled.div`
  margin: 5px 0;
`;

const UpdateButton = styled.div`
  margin-top: 20px;
`;



const FloatingButton = styled.button`
  font-size: 16px; /* Cambiar el tamaño de la tipografía */
  text-transform: uppercase; /* Texto en mayúsculas */
  font-weight: bold; /* Fuente en negrita */
  color: ${({ theme }) => theme === 'light' ? '#000000' : '#ffffff'}; /* Color del texto */
  border-radius: 5px; /* Borde del botón */
  letter-spacing: 2px; /* Espacio entre letras */
  background-color: ${({ theme }) => theme === 'light' ? '#fcebf2' : '#6A5ACD'}; /* Color de fondo */
  padding: 18px 30px; /* Relleno del botón */
  position: fixed;
  bottom: 40px;
  right: 40px;
  transition: all 300ms ease 0ms;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  z-index: 99;

  &:hover {
    background-color: ${({ theme }) => theme === 'light' ? '#c98695' : '#483D8B'}; /* Color de fondo al pasar el cursor */
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
    transform: translateY(-7px);
  }
`;

const AddServiceSection = styled.div`
  padding: auto;
  gap: 10px;
  margin: 15px;
  display: flex;
  flex-direction: column; /* Cambiado a columna para alineación vertical */
  justify-content: center;
  align-items: center;
`;

// Estilo para el título
const Titleservice = styled.h2`
 font-size: 30px;
    color: ${props => props.theme === 'light' ? '#202020' : '#fff'};
   background-color: ${({ theme }) => theme === 'light' ? ' #fcebf2' : '#444'};
 border: 10px solid ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
  border-radius: 10px;
text-align: center;
padding: 15px;
font-family: "Playfair Display", serif;
font-weight: normal;
margin-bottom: 20px;

`;

// Estilo para los inputs
const ServiceInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
   background-color: ${({ theme }) => theme === 'light' ? ' #fcebf2' : '#444'};
   border: 2px solid ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
    border-radius: 5px; 
    padding: 0.5rem;
    font-size: 16px;
    font-family: "Playfair Display", serif;
  }
`;

// Estilo para el botón
const HandleAddServiceButton = styled.button`
  background-color: ${({ theme }) => theme === 'light' ? ' #fcebf2' : '#444'};
   border: 2px solid ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
    border-radius: 5px; 
  padding: 1rem;
  font-size: 18px;
  font-family: "Playfair Display", serif;
  font-weight: bold;
  cursor: pointer;
   ${({ theme }) => theme === 'light' ? ' #fcebf2' : '#444'};

  &:hover {
   background-color: ${({ theme }) => theme === 'light' ? '#c98695' : '#483D8B'}; /* Color de fondo al pasar el cursor */
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
    color: ${({ theme }) => theme === 'light' ? ' #fcebf2' : '#fff'}
  }
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

const ModalFields = styled.div`
background: #fcebf2;
padding: 20px;
border-radius: 8px;
max-width: 500px;
width: 100%;
display: flex;
flex-direction: column;
gap: 10px;

input {
  width: calc(100% - 20px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #c98695;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #a75d53;
  }
}
`;

const StatusDot = styled.div`
width: 10px;
height: 10px;
border-radius: 50%;
background-color: ${({ active }) => (active ? 'green' : 'red')};
display: inline-block;
margin-left: 8px;
`;

export default ServiciosAdmin;