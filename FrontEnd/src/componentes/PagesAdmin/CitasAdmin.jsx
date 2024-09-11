import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import supabase from '../../supabase/supabaseconfig';
import moment from 'moment';
import { ThemeContext } from "../../App";

const CitasAdmin = ({ token }) => {
  const [citas, setCitas] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const citasPerPage = 5;
  const { theme } = React.useContext(ThemeContext);

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
          .select('id_cita, fecha, estado, usuarios, servicio(nombre_servicio), profesional, duracion') // Traer nombre_servicio
          .eq('profesional', 1); // Filtrar por profesional si es necesario
        if (error) throw error;
        // Establecer estado por defecto como false
        const citasConEstado = data.map(cita => ({
          ...cita,
          estado: false // Todos sin aprobar por defecto
        }));
        setCitas(citasConEstado);
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
          .update({ estado: true }) // Cambiar a booleano
          .eq('id_cita', cita.id_cita);
        if (error) throw error;
        console.log('Cita aprobada correctamente');
        setCitas(citas.map(c => c.id_cita === cita.id_cita ? { ...c, estado: true } : c));
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
    <Container theme={theme}>
      <div className="Container_C_A">
        <Header theme={theme}>
          <h1>Citas Administrador</h1>
        </Header>
        <Content theme={theme}>
          <p>En esta sección encontrarás todas las citas apartadas (pendientes por confirmación) por los clientes.</p>
          <p><b>Nota:</b> Confirma el Estado de la cita por medio del Checklist <b>SOLO</b> si la cita fue abonada exitosamente con el 50%.</p>
        </Content>
        
        <SortControl theme={theme}>
          <Button onClick={toggleSortOrder} theme={theme}>
            Ordenar por fecha: {sortOrder === 'asc' ? 'Más antiguas primero' : 'Más recientes primero'}
          </Button>
        </SortControl>

        <Table theme={theme}>
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
                <td>{moment(cita.duracion, 'HH:mm').format('h:mm A')}</td>
                <td>{cita.servicio.nombre_servicio}</td> {/* Mostrar nombre_servicio */}
                <td>
                  <input 
                    type="checkbox" 
                    id={`estado${index}`} 
                    name={`estado${index}`} 
                    checked={cita.estado} // Comprobar si el estado es verdadero
                    onChange={() => handleAcceptCita(cita)} 
                    readOnly={cita.estado} // Solo se puede cambiar si es falso
                  />
                  <label htmlFor={`estado${index}`}>{cita.estado ? 'Aprobada' : 'Pendiente'}</label>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination theme={theme}>
          {[...Array(Math.ceil(citas.length / citasPerPage))].map((_, i) => (
            <Button key={i} onClick={() => paginate(i + 1)} theme={theme}>
              {i + 1}
            </Button>
          ))}
        </Pagination>
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
`;

const Header = styled.div`
  border: 10px solid ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
  border-radius: 10px;
  font-family: "Playfair Display", serif;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme === 'light' ? 'transparent' : '#313131'};
  
  h1 {
    font-size: 30px;
    color: ${props => props.theme === 'light' ? '#202020' : '#fff'};
  }
`;

const Content = styled.div`
  background-color: ${props => props.theme === 'light' ? 'transparent' : '#313131'};
  border: 1px solid ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SortControl = styled.div`
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: ${props => props.theme === 'light' ? 'transparent' : '#313131'};
  border: 1px solid ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
  border-radius: 10px;
  overflow: hidden;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
  }

  th {
    background-color: ${props => props.theme === 'light' ? '#FCEBF2' : '#2e2e2e'};
    color: ${props => props.theme === 'light' ? '#202020' : '#fff'};
  }

  tr:nth-child(even) {
    background-color: ${props => props.theme === 'light' ? '#f9f9f9' : '#2e2e2e'};
  }

  tr:hover {
    background-color: ${props => props.theme === 'light' ? '#f1f1f1' : '#3e3e3e'};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme === 'light' ? '#b57b7a' : '#7c3b8a'};
  }
`;

export default CitasAdmin;
