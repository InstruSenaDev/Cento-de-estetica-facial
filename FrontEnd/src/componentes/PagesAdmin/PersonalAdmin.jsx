import React, { useState, useEffect } from "react";
import styled from "styled-components";
import supabase from "../../supabase/supabaseconfig";
import { ThemeContext } from "../../App";

export function PersonalAdmin() {
  const [personalList, setPersonalList] = useState([]);
  const [editingProfesional, setEditingProfesional] = useState(null);
  const [newProfesional, setNewProfesional] = useState({
    nombre_profesional: "",
    especialidad: "",
    celular: "",
    correo: "",
    estado: true
  });
  const { theme } = React.useContext(ThemeContext);

  useEffect(() => {
    const fetchProfesionales = async () => {
      const { data, error } = await supabase.from("profesional").select("*");
      if (error) {
        console.log("Error fetching data: ", error);
      } else {
        setPersonalList(data);
      }
    };
    fetchProfesionales();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfesional({ ...newProfesional, [name]: value });
  };

  const addProfesional = async () => {
    const { data, error } = await supabase.from("profesional").insert([newProfesional]);
    if (error) {
      console.log("Error adding professional: ", error);
    } else {
      setPersonalList([...personalList, data[0]]);
      resetForm();
    }
  };

  const resetForm = () => {
    setNewProfesional({
      nombre_profesional: "",
      especialidad: "",
      celular: "",
      correo: "",
      estado: true
    });
  };

  const toggleEstado = async (profesional) => {
    const updatedEstado = !profesional.estado;
    const { data, error } = await supabase
      .from("profesional")
      .update({ estado: updatedEstado })
      .eq("id", profesional.id);

    if (error) {
      console.log("Error updating estado: ", error);
    } else {
      setPersonalList((prevList) =>
        prevList.map((p) =>
          p.id === profesional.id ? { ...p, estado: updatedEstado } : p
        )
      );
    }
  };

  const handleEdit = (profesional) => {
    setEditingProfesional(profesional);
    setNewProfesional(profesional);
  };

  const updateProfesional = async () => {
    const { data, error } = await supabase
      .from("profesional")
      .update({
        nombre_profesional: newProfesional.nombre_profesional,
        especialidad: newProfesional.especialidad,
        celular: newProfesional.celular,
        correo: newProfesional.correo,
      })
      .eq("id", editingProfesional.id);

    if (error) {
      console.log("Error updating professional: ", error);
    } else {
      setPersonalList((prevList) =>
        prevList.map((p) =>
          p.id === editingProfesional.id ? { ...data[0] } : p
        )
      );
      setEditingProfesional(null);
      resetForm();
    }
  };

  return (
    <Container theme={theme}>
      <div className="contenidor_personal_Admin">
        <Header theme={theme}>
          <h1>Sección Personal</h1>
        </Header>
        
        <ListaPersonal theme={theme}>
          {personalList.map((profesional) => (
            <PersonalItem key={profesional.id} theme={theme}>
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
          {editingProfesional ? (
            <Button onClick={updateProfesional} theme={theme}>
              Actualizar Profesional
            </Button>
          ) : (
            <Button onClick={addProfesional} theme={theme}>
              Añadir Profesional
            </Button>
          )}
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
`;

const Header = styled.div`
  border: 10px solid ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
  border-radius: 10px;
  font-family: "Playfair Display", serif;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme === 'light' ? 'transparent' : '#313131'};
  
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
  background-color: ${props => props.theme === 'light' ? 'transparent' : '#313131'};
  border: 1px solid ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
  border-radius: 10px;
  padding: 15px;
  flex: 1;
  min-width: 280px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: ${props => props.theme === 'light' ? '#202020' : '#fff'};

  .boton_nombre_profesional_calendario {
    font-size: 18px;
    font-family: "Playfair Display", serif;
    font-weight: bold;
    color: ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    display: block;
    width: 100%;
    text-decoration: underline;
    transition: color 0.3s;

    &:hover {
      color: ${props => props.theme === 'light' ? '#a75d53' : '#7522e6'};
    }
  }
`;

const FormContainer = styled.div`
  background-color: ${props => props.theme === 'light' ? 'transparent' : '#313131'};
  border: 1px solid ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  input {
    padding: 12px;
    background-color: ${props => props.theme === 'light' ? 'transparent' : '#21252B'};
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
  background-color: ${props => props.theme === 'light' ? '#c98695' : '#9247FC'};
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme === 'light' ? '#a75d53' : '#7522e6'};
  }
`;
