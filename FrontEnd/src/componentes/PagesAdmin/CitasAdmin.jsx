import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Pagination from './Pagination';
import "./CitasAdmin.css";
import supabase from '../../supabase/supabaseconfig';

const Citas = ({ token }) => {
  const [citas, setCitas] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [profesionalName, setProfesionalName] = useState(''); // Estado para almacenar el nombre del profesional
  const citasPerPage = 5;

  useEffect(() => {
    const fetchUser = async () => {
      if (token?.user) {
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

    fetchUser();
  }, [token]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('cita')
          .select(`
            fecha, duracion, estado, profesional (
              nombre_profesional
            ), servicio (
              nombre_servicio
            )`)
          .eq('usuarios', user.id);

        if (error) {
          console.error('Error fetching appointments:', error);
        } else {
          setAppointments(data || []);
          if (data && data.length > 0) {
            setProfesionalName(data[0].profesional.nombre_profesional); // Suponiendo que todos los datos tienen el mismo profesional
          }
        }
      }
    };

    fetchAppointments();
  }, [user]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const { data, error } = await supabase
          .from('cita')
          .select(`
            fecha, duracion, estado, profesional (
              nombre_profesional
            ), servicio (
              nombre_servicio
            )`);
        if (error) throw error;
        setCitas(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching citas:', error);
        setLoading(false);
      }
    };

    fetchCitas();
  }, []);

  const indexOfLastCita = currentPage * citasPerPage;
  const indexOfFirstCita = indexOfLastCita - citasPerPage;
  const currentCitas = citas.slice(indexOfFirstCita, indexOfLastCita);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAcceptCita = async (cita) => {
    if (window.confirm(`¿Estás seguro de aprobar la cita de ${cita.usuarios} para el ${cita.fecha}?`)) {
      try {
        const { data, error } = await supabase
          .from('cita') 
          .update({ estado: 'Abono' })
          .eq('id_cita', cita.id_cita);
        if (error) throw error;
        console.log('Cita aprobada correctamente');
        setCitas(citas.map(c => c.id_cita === cita.id_cita ? { ...c, estado: 'Abono' } : c));
      } catch (error) {
        console.error('Error al aprobar cita:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <div className='titulo_Citas_Admin'>
        <h1>{profesionalName ? `Citas con ${profesionalName}` : 'Citas Administrador'}</h1>
      </div>
      <div className='Contenido_Citas_Admin'>
        <hr />
        <p>En esta sección encontrarás todas las citas apartadas por los clientes.</p>
        <hr />
      </div>

      <Table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Duración</th>
            <th>Servicio</th>
            
          </tr>
        </thead>
        <tbody>
          {currentCitas.map((cita, index) => (
            <tr key={cita.id_cita}>
              <td>{cita.usuarios}</td>
              <td>{cita.fecha}</td>
              {/* <td>{cita.franja_horaria}</td> */}
              <td>{cita.duracion}</td>
              <td>1 hora</td>
              <td>{cita.servicio.nombre_servicio}</td> {/* Mostrar el nombre del servicio aquí */}
                
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination 
        citasPerPage={citasPerPage} 
        totalCitas={citas.length} 
        paginate={paginate} 
      />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: #FCEBF2;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  th, td {
    padding: 1rem;
    text-align: left;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  th {
    font-weight: bold;
  }
`;

export default Citas;
