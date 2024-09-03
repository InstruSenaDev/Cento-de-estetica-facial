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
          .from('citas')
          .select(`
            id_cita, fecha, hora, estado, id_profesional ( nombre_profesional ), id_servicio ( nombre_servicio )
          `)
          .eq('id_usuario', user.id);

        if (error) {
          console.error('Error fetching appointments:', error);
        } else {
          setAppointments(data || []);
        }
      }
    };

    fetchAppointments();
  }, [user]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const { data, error } = await supabase
          .from('citas')
          .select('*');
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
    if (window.confirm(`¿Estás seguro de aprobar la cita de ${cita.id_usuario} para el ${cita.fecha}?`)) {
      try {
        const { data, error } = await supabase
          .from('citas') 
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
      <h1>Citas Administrador</h1></div>
      <div className='Contenido_Citas_Admin'>
      <hr />
      <p>En esta sección encontraras todas las citas apartadas (pendientes por confirmación) por los clientes.</p>
      <hr />
      <p> <b>Nota:</b> Confirma el Estado de la cita por medio del Checklist <b>SOLO</b> sí la cita fue abonada exitosamente con el 50%.</p></div>

      <Table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Duración</th>
            <th>Servicio</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {currentCitas.map((cita, index) => (
            <tr key={cita.id_cita}>
              <td>{cita.id_usuario}</td>
              <td>{cita.fecha}</td>
              <td>{cita.hora}</td>
              <td>{cita.duracion}</td>
              <td>{cita.id_servicio.nombre_servicio}</td>
              <td>
                <input 
                  type="checkbox" 
                  id={`estado${index}`} 
                  name={`estado${index}`} 
                  checked={cita.estado === 'Abono'} 
                  onChange={() => handleAcceptCita(cita)} 
                  readOnly={cita.estado === 'Abono'}
                />
                <label htmlFor={`estado${index}`}>{cita.estado}</label>
              </td>
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
