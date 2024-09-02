import supabase from "../../supabase/supabaseconfig";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./PersonalAdmin.css";

export function PersonalAdmin() {
  const [personalList, setPersonalList] = useState([]);
  const [newProfesional, setNewProfesional] = useState({
    nombre_profesional: "",
    especialidad: "",
    celular: "",
    correo: "",
    estado: false
  });

  useEffect(() => {
    // Cargar la lista de profesionales desde Supabase
    const fetchProfesionales = async () => {
      const { data, error } = await supabase.from("profesional").select("*");
      if (error) console.log("Error fetching data: ", error);
      else setPersonalList(data);
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
      resetForm(); // Resetear el formulario
    }
  };

  const resetForm = () => {
    setNewProfesional({
      nombre_profesional: "",
      especialidad: "",
      celular: "",
      correo: "",
      estado: false
    });
  };

  return (
    <Container>
      <div className="contenidor_personal_Admin">
        <div className="header_personal_Admin">
          <h1>Sección Personal</h1>
        </div>

        <div className="Lista_personal_Admin">
          {personalList.map((profesional, index) => (
            <div key={index} className="personal_item">
              <button className="boton_nombre_profesional_calendario">{profesional.nombre_profesional}</button>
              <p>{profesional.especialidad}</p>
              <p>{profesional.celular}</p>
              <p>{profesional.correo}</p>
              <p>{profesional.estado ? "Activo" : "Inactivo"}</p>
            </div>
          ))}
        </div>
        <div className="titulo-add_personal_form">
          <h2>Añadir Personal</h2>
        </div>
        <div className="add_personal_form">
          <input
            type="text" name="nombre_profesional" value={newProfesional.nombre_profesional} placeholder="Nombre Profesional" onChange={handleChange} />

          <input
            type="text" name="especialidad" value={newProfesional.especialidad} placeholder="Especialidad" onChange={handleChange} />
          <input
            type="text" name="celular" value={newProfesional.celular} placeholder="Celular" onChange={handleChange} />
          <input
            type="email" name="correo" value={newProfesional.correo} placeholder="Correo" onChange={handleChange} />
          <button className="añadir_personal_boton" onClick={addProfesional}>Añadir Profesional</button>
        </div>
      </div>
      
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  padding: 20px;
`;

export default PersonalAdmin;
