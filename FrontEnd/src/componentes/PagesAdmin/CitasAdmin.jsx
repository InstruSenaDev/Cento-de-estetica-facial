import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import styled from "styled-components";
import "./CitasAdmin.css";
import supabase from '../../supabase/supabaseconfig';
import moment from 'moment';

const Citas = ({ token }) => {
  const [citas, setCitas] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
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
    const fetchCitas = async () => {
      try {
        const { data, error } = await supabase
          .from('cita')
          .select('id_cita, fecha, estado, usuarios, servicio, profesional, duracion')
          .eq('profesional', 1);
        if (error) throw error;
        setCitas(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching citas:', error);
        setLoading(false);
      }
    };

    fetchCitas();
  }, [user]);

  const sortedCitas = [...citas].sort((a, b) => {
    const dateA = new Date(a.fecha);
    const dateB = new Date(b.fecha);

    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const indexOfLastCita = currentPage * citasPerPage;
  const indexOfFirstCita = indexOfLastCita - citasPerPage;
  const currentCitas = sortedCitas.slice(indexOfFirstCita, indexOfLastCita);

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

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
    <div className="Container_C_A">
      <div className='titulo_Citas_Admin'>
        <h1>Citas Administrador</h1>
      </div>
      <div className='Contenido_Citas_Admin'>
        <hr />
        <p>En esta sección encontraras todas las citas apartadas (pendientes por confirmación) por los clientes.</p>
        <hr />
        <p><b>Nota:</b> Confirma el Estado de la cita por medio del Checklist <b>SOLO</b> sí la cita fue abonada exitosamente con el 50%.</p>
      </div>
      
      <div className="sort-control">
        <button onClick={toggleSortOrder} className="sort-button">
          Ordenar por fecha: {sortOrder === 'asc' ? 'Más antiguas primero' : 'Más recientes primero'}
        </button>
      </div>

      <table className="Table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Duración</th>
            <th>Servicio</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {currentCitas.map((cita, index) => (
            <tr key={cita.id_cita}>
              <td>{cita.usuarios}</td> 
              <td>{cita.fecha}</td>
              <td>{moment(cita.duracion, 'HH:mm').format('h:mm A')}</td> {/* Formatear la duración */}
              <td>{cita.servicio}</td>
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
      </table>

      <Pagination 
        citasPerPage={citasPerPage} 
        totalCitas={citas.length} 
        paginate={paginate} 
      />
    </div>
    </Container>
  );
}


const Container = styled.div`
  min-height: 100vh;  // Asegura que ocupe al menos todo el alto del viewport
  padding: 20px;
  box-sizing: border-box;
  margin-left: ${({ sidebarOpen }) => (sidebarOpen ? '300px' : '70px')};  
  transition: margin-left 0.3s;
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
