import React, { useState, useEffect } from 'react';
import './ServiciosDahs.css'; 

const ServiciosCe = () => {
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', duracion: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Aquí puedes cargar los servicios desde Supabase o una API
    // Simulación de datos iniciales
    const initialData = [
      { nombre: 'Servicio 1', descripcion: 'Descripción 1', precio: 100, duracion: '1h', habilitado: true },
      { nombre: 'Servicio 2', descripcion: 'Descripción 2', precio: 200, duracion: '2h', habilitado: true },
    ];
    setServicios(initialData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedServicios = servicios.map((servicio, index) =>
        index === editIndex ? { ...form, habilitado: true } : servicio
      );
      setServicios(updatedServicios);
      setEditIndex(null);
    } else {
      setServicios([...servicios, { ...form, habilitado: true }]);
    }
    setForm({ nombre: '', descripcion: '', precio: '', duracion: '' });
  };

  const handleEdit = (index) => {
    setForm(servicios[index]);
    setEditIndex(index);
  };

  const handleToggle = (index) => {
    const updatedServicios = servicios.map((servicio, idx) =>
      idx === index ? { ...servicio, habilitado: !servicio.habilitado } : servicio
    );
    setServicios(updatedServicios);
  };

  // Estadísticas
  const totalServicios = servicios.length;
  const habilitados = servicios.filter((servicio) => servicio.habilitado).length;
  const deshabilitados = totalServicios - habilitados;

  return (
    <div className="servicios-dashboard">
      <h1>Dashboard de Servicios</h1>
      
      <div className="stats">
        <div className="stat-item">
          <h2>Total Servicios</h2>
          <p>{totalServicios}</p>
        </div>
        <div className="stat-item">
          <h2>Servicios Habilitados</h2>
          <p>{habilitados}</p>
        </div>
        <div className="stat-item">
          <h2>Servicios Deshabilitados</h2>
          <p>{deshabilitados}</p>
        </div>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="duracion"
          placeholder="Duración"
          value={form.duracion}
          onChange={handleChange}
          required
        />
        <button type="submit">{editIndex !== null ? 'Actualizar Servicio' : 'Añadir Servicio'}</button>
      </form>

      <div className="table-container">
        <table className="services-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Duración</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio, index) => (
              <tr key={index} className={servicio.habilitado ? '' : 'deshabilitado'}>
                <td>{servicio.nombre}</td>
                <td>{servicio.descripcion}</td>
                <td>${servicio.precio}</td>
                <td>{servicio.duracion}</td>
                <td>{servicio.habilitado ? 'Habilitado' : 'Deshabilitado'}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Editar</button>
                  <button onClick={() => handleToggle(index)}>
                    {servicio.habilitado ? 'Deshabilitar' : 'Habilitar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Servicios;
