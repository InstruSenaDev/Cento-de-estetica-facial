import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import supabase from '../../supabase/supabaseconfig';
// import jsPDF from 'jspdf';
import { ThemeContext } from '../../App';

export function PersonalAdmin() {
  const [personalList, setPersonalList] = useState([]);
  const [editingProfesional, setEditingProfesional] = useState(null);
  const [newProfesional, setNewProfesional] = useState({
    nombre_profesional: '',
    especialidad: '',
    celular: '',
    correo: '',
    estado: true,
    password: '',
  });
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchProfesionales = async () => {
      const { data, error } = await supabase.from('profesional').select('*');
      if (error) {
        console.log('Error fetching data: ', error);
      } else {
        // Asegúrate de que data sea un array antes de usarlo
        if (Array.isArray(data)) {
          setPersonalList(data);
        } else {
          console.log('Unexpected data format: ', data);
        }
      }
    };
    fetchProfesionales();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfesional({ ...newProfesional, [name]: value });
  };

  const generatePassword = () => {
    const { nombre_profesional, celular } = newProfesional;
    const password = `${nombre_profesional.substr(0, 3)}${celular.substr(-4)}`;
    setNewProfesional({ ...newProfesional, password });
    setPdfGenerated(false); // Ensure PDF has to be generated again
  };

  const addProfesional = async () => {
    if (!newProfesional.nombre_profesional || !newProfesional.password) {
      alert('Por favor complete todos los campos requeridos.');
      return;
    }

    console.log('Datos que se van a enviar: ', newProfesional); // Añadido para depuración

    try {
      const { data, error } = await supabase
        .from('profesional')
        .insert([newProfesional]);

      if (error) {
        console.error('Error adding professional: ', error.message);
        alert('Ocurrió un error al agregar el profesional. Revisa la consola para más detalles.');
      } else {
        if (Array.isArray(data)) {
          setPersonalList([...personalList, ...data]);
          resetForm();
        } else {
          console.log('Unexpected data format on insert: ', data);
        }
      }
    } catch (err) {
      console.error('Unexpected error: ', err.message);
      alert('Ocurrió un error inesperado. Revisa la consola para más detalles.');
    }
  };

  const resetForm = () => {
    setNewProfesional({
      nombre_profesional: '',
      especialidad: '',
      celular: '',
      correo: '',
      estado: true,
      password: '',
    });
    setPdfGenerated(false);
  };

  const generatePDF = (profesional) => {
    const doc = new jsPDF();

    // Fondo
    doc.setFillColor(240, 240, 240); // Color de fondo
    doc.rect(0, 0, 210, 297, 'F'); // Tamaño A4

    // Encabezado
    doc.setFillColor(255, 192, 203); // Rosa claro
    doc.rect(0, 0, 210, 40, 'F'); // Encabezado

    // Título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(0, 0, 0);
    doc.text("Natalia Salazar Artist", 10, 25);

    // Línea debajo del título
    doc.setLineWidth(1);
    doc.setDrawColor(255, 215, 0); // Dorado
    doc.line(10, 35, 200, 35);

    // Información del profesional
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Datos del Profesional Registrado", 10, 50);

    doc.setFontSize(14);
    const details = [
      `Nombre: ${profesional.nombre_profesional}`,
      `Especialidad: ${profesional.especialidad}`,
      `Celular: ${profesional.celular}`,
      `Correo: ${profesional.correo}`,
      `Contraseña: ${profesional.password}`
    ];

    details.forEach((detail, index) => {
      doc.text(detail, 10, 60 + (index * 10));
    });

    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150); // Gris claro
    doc.text("Confidencial - Natalia Salazar Artist", 10, 280);

    // Guardar el PDF
    doc.save(`${profesional.nombre_profesional}_datos.pdf`);
    setPdfGenerated(true);
  };

  const handleEdit = (profesional) => {
    setEditingProfesional(profesional);
    setNewProfesional(profesional);
  };

  const updateProfesional = async () => {
    const { data, error } = await supabase
      .from('profesional')
      .update({
        nombre_profesional: newProfesional.nombre_profesional,
        especialidad: newProfesional.especialidad,
        celular: newProfesional.celular,
        correo: newProfesional.correo,
        estado: newProfesional.estado,
      })
      .eq('id', editingProfesional.id);

    if (error) {
      console.log('Error updating professional: ', error);
    } else {
      if (Array.isArray(data)) {
        setPersonalList((prevList) =>
          prevList.map((p) =>
            p.id === editingProfesional.id ? { ...data[0] } : p
          )
        );
        setEditingProfesional(null);
        resetForm();
      } else {
        console.log('Unexpected data format on update: ', data);
      }
    }
  };

  const toggleEstado = async (profesional) => {
    const newState = !profesional.estado;
    const { data, error } = await supabase
      .from('profesional')
      .update({ estado: newState })
      .eq('id', profesional.id);

    if (error) {
      console.log('Error toggling state: ', error);
    } else {
      if (Array.isArray(data)) {
        setPersonalList((prevList) =>
          prevList.map((p) =>
            p.id === profesional.id ? { ...data[0] } : p
          )
        );
      } else {
        console.log('Unexpected data format on toggle: ', data);
      }
    }
  };

  return (
    <Container theme={theme}>
      <div className="contenedor_personal_Admin">
        <Header theme={theme}>
          <h1>Sección Personal</h1>
        </Header>

        <ListaPersonal theme={theme}>
          {personalList.map((profesional) => (
            <PersonalItem key={profesional.id} theme={theme} professionalStatus={profesional.estado}>
              <button
                className="boton_nombre_profesional_calendario"
                onClick={() => handleEdit(profesional)}
                disabled={!profesional.estado}
              >
                {profesional.nombre_profesional}
              </button>
              <p>{profesional.especialidad}</p>
              <p>{profesional.celular}</p>
              <p>{profesional.correo}</p>
              <p>{profesional.estado ? "Activo" : "Inactivo"}</p>
              <button onClick={() => toggleEstado(profesional)}>
                {profesional.estado ? "Marcar como Inactivo" : "Marcar como Activo"}
              </button>
            </PersonalItem>
          ))}
        </ListaPersonal>

        <Header theme={theme}>
          <h2>{editingProfesional ? "Editar Personal" : "Añadir Personal"}</h2>
        </Header>

        <FormContainer theme={theme}>
  <input
    type="text"
    name="nombre_profesional"
    value={newProfesional.nombre_profesional}
    placeholder="Nombre Profesional"
    onChange={handleChange}
  />
  <input
    type="text"
    name="especialidad"
    value={newProfesional.especialidad}
    placeholder="Especialidad"
    onChange={handleChange}
  />
  <input
    type="text"
    name="celular"
    value={newProfesional.celular}
    placeholder="Celular"
    onChange={handleChange}
  />
  <input
    type="email"
    name="correo"
    value={newProfesional.correo}
    placeholder="Correo"
    onChange={handleChange}
  />
  
  <Button  theme={theme} onClick={generatePassword}>Generar Contraseña</Button>
  
  <PasswordDisplay theme={theme}>
    Contraseña: {newProfesional.password}
  </PasswordDisplay>
  
  <Button theme={theme} onClick={editingProfesional ? updateProfesional : addProfesional}>
    {editingProfesional ? "Actualizar" : "Agregar"}
  </Button>

  <Button  theme={theme} onClick={() => generatePDF(newProfesional)}>
    Generar PDF
  </Button>
  
  {pdfGenerated && <SuccessMessage>PDF generado exitosamente.</SuccessMessage>}
</FormContainer>


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
  border: 10px solid ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
  border-radius: 10px;
  font-family: "Playfair Display", serif;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  
  
  h1, h2 {
    font-size: 30px;
    color: ${props => props.theme === 'light' ? '#202020' : '#fff'};
  }
`;

const ListaPersonal = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px;
  max-width: 1200px;
`;

const PersonalItem = styled.div`
  background-color: ${props => props.theme === 'light' ? '#ffffff' : '#424242'};
  border: 1px solid ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
  border-radius: 10px;
  padding: 15px;
  flex: 1;
  min-width: 280px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  color: ${props => props.professionalStatus ? (props.theme === 'light' ? '#202020' : '#fff') : '#999'};
  opacity: ${props => props.professionalStatus ? '1' : '0.6'};

  .boton_nombre_profesional_calendario {
    font-size: 18px;
    font-family: "Playfair Display", serif;
    font-weight: bold;
    color: ${props => props.professionalStatus ? (props.theme === 'light' ? '#c98695' : '#9247FC') : '#999'};
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    display: block;
    width: 100%;
    text-decoration: underline;
    transition: color 0.3s;

    &:hover {
      color: ${props => props.professionalStatus ? (props.theme === 'light' ? '#a75d53' : '#7522e6') : '#999'};
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
`;

const FormContainer = styled.div`
  background-color: ${props => props.theme === 'light' ? '#ffffff' : '#424242'};
  border: 1px solid ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  input {
    padding: 12px;
    background-color: ${props => props.theme === 'light' ? '#ffffff' : '#21252B'};
    border: 1px solid ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
    border-radius: 5px;
    font-size: 16px;
    width: calc(100% - 24px);
    margin-bottom: 10px;
    box-sizing: border-box;
    color: ${props => props.theme === 'light' ? '#202020' : '#fff'};

    &::placeholder {
      color: ${props => props.theme === 'light' ? '#969593' : '#a6a6a6'};
    }
  }
`;

const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.theme === 'light' ? '#c98695' : '#9247FC'}; /* Rosa en tema claro y morado en tema oscuro */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 10px 0; /* Añadir margen para separar los botones */
  width: 100%; /* Hacer que el botón ocupe el ancho completo del contenedor */

  &:hover {
    background-color: ${props => props.theme === 'light' ? '#a75d53' : '#7522e6'}; /* Rosa más oscuro en tema claro y morado más oscuro en tema oscuro */
  }
`;


const PasswordDisplay = styled.p`
  background-color: ${props => props.theme === 'light' ? '#e7f3fe' : '#424242'};
  color: ${props => props.theme === 'light' ? '#31708f' : '#fff'};
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  font-size: 16px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
  margin-top: 10px;
`;
