import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { createClient } from '@supabase/supabase-js';
import { LineChart, BarChart, PieChart, Line, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DatePickerWithRange } from "./SimpleDateRangePicker";
import { InfoCircledIcon, ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import supabase from "../../supabase/supabaseconfig";
import "./InicioAdmin.css";

const HomeAdmin = () => {
  const [visitsData, setVisitsData] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date()
  });

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [visits, appointments, services] = await Promise.all([
        fetchVisitsData(),
        fetchAppointmentsData(),
        fetchServicesData()
      ]);
      setVisitsData(visits);
      setAppointmentsData(appointments);
      setServicesData(services);
    } catch (err) {
      setError('Error al cargar los datos. Por favor, intente nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  // const fetchAppointmentsData = async () => {
  //   const { data, error } = await supabase
  //     .from('citas')
  //     .select('fecha')
  //     .gte('fecha', format(dateRange.from, 'yyyy-MM-dd'))
  //     .lte('fecha', format(dateRange.to, 'yyyy-MM-dd'));
    
  //   if (error) throw error;
    
  //   const groupedData = data.reduce((acc, { fecha }) => {
  //     const date = format(new Date(fecha), 'dd/MM/yyyy');
  //     acc[date] = (acc[date] || 0) + 1;
  //     return acc;
  //   }, {});

    return Object.entries(groupedData).map(([date, count]) => ({ date, appointments: count }));
  };

  const fetchServicesData = async () => {
    const { data, error } = await supabase
      .from('citas')
      .select('servicios (nombre)')
      .gte('fecha', format(dateRange.from, 'yyyy-MM-dd'))
      .lte('fecha', format(dateRange.to, 'yyyy-MM-dd'));
    
    if (error) throw error;
    
    const serviceCounts = data.reduce((acc, { servicios }) => {
      const serviceName = servicios.nombre;
      acc[serviceName] = (acc[serviceName] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(serviceCounts).map(([service, count]) => ({ service, count }));
  };

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getTrend = (data, key) => {
    if (data.length < 2) return 0;
    const last = data[data.length - 1][key];
    const secondLast = data[data.length - 2][key];
    return ((last - secondLast) / secondLast) * 100;
  };

  return (
    <Container>
      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard de Administración</h1>
        
        <div className="filters-container">
          <h2 className="filters-title">Filtros y Controles</h2>
          <div className="filters-content">
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            <button onClick={fetchData} className="button">
              Actualizar Datos
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-destructive">
            <h3 className="alert-title">Error</h3>
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="grid-container">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  <span>Visitas a la página</span>
                  <InfoCircledIcon className="icon" title="Muestra el número de visitas diarias a la página" />
                </h3>
              </div>
              <div className="card-content">
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={visitsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip content={customTooltip} />
                      <Legend />
                      <Line type="monotone" dataKey="visits" stroke="#C98695" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="trend-indicator">
                  <span>Tendencia: </span>
                  {getTrend(visitsData, 'visits') > 0 ? (
                    <span className="trend-up">
                      <ArrowUpIcon className="icon" />
                      {getTrend(visitsData, 'visits').toFixed(2)}%
                    </span>
                  ) : (
                    <span className="trend-down">
                      <ArrowDownIcon className="icon" />
                      {Math.abs(getTrend(visitsData, 'visits')).toFixed(2)}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* You can add more cards here for appointments and services data */}
              
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Resumen de Estadísticas</h3>
              </div>
              <div className="card-content">
                <ul className="stats-list">
                  <li className="stats-item">
                    <span className="stats-label">
                      <InfoCircledIcon className="stats-icon" />
                      Total de visitas:
                    </span>
                    <strong>{visitsData.reduce((sum, item) => sum + item.visits, 0)}</strong>
                  </li>
                  <li className="stats-item">
                    <span className="stats-label">
                      <InfoCircledIcon className="stats-icon" />
                      Total de citas:
                    </span>
                    <strong>{appointmentsData.reduce((sum, item) => sum + item.appointments, 0)}</strong>
                  </li>
                  <li className="stats-item">
                    <span className="stats-label">
                      <InfoCircledIcon className="stats-icon" />
                      Servicio más popular:
                    </span>
                    <strong>{servicesData.sort((a, b) => b.count - a.count)[0]?.service}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
`;

export default HomeAdmin;