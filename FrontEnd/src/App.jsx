import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import { Servicios } from './pages/Servicios';
import { Acerca_de } from './pages/Acerca_de';
import { Condiciones } from "./pages/Terminos";
import { Pageloader } from './componentes/Animación/Carga';
import { Agendar } from "./pages/Agendar";
import { LoadingProvider, useLoading } from './componentes/Animación/Loadingcontext';
import { ModalProvider, useModal } from './componentes/modal/ContextModal';
import Modalinicio from './componentes/modal/Modalinicio';
import ModalRegistro from './componentes/modal/ModalRegistro';
import Facturaelectronica from './pages/FacturaElectronica';
import { VistaServicios } from './pages/VistaServicios';
import CitaPend from './pages/CitasPendientes';
import RecoverPassword from './componentes/Recuperarcontraseña/Recuperarcontraseña';
import ResetPassword from './componentes/Recuperarcontraseña/Nuevacontraseña';

function Main() {
    const { setLoading } = useLoading();
    const { openModal } = useModal();
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
    }, [location, setLoading]);

    return (
        <>
            <Pageloader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/Facturacion' element={<Facturaelectronica />} />
                <Route path='/Registrar' element={<button onClick={() => openModal('SignUp')}>Regístrate</button>} />
                <Route path="/loginsupa" element={<button onClick={() => openModal('LoginUser')}>Inicia Sesión</button>} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/VistaDetalle" element={<VistaServicios />} />
                <Route path="/CitaPend" element={<CitaPend />} />
                <Route path="/acerca" element={<Acerca_de />} />
                <Route path="/politicas" element={<Condiciones />} />
                <Route path="/Agendarcita" element={<Agendar />} />
                <Route path="/recover" element={<RecoverPassword />} />
                <Route path="/NuevaContraseña" element={<ResetPassword />} />


            </Routes>
            <Modalinicio />
            <ModalRegistro />
        </>
    );
}

function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            setToken(JSON.parse(storedToken));
        }
    }, []);

    return (
        <LoadingProvider>
            <Router>
                <ModalProvider> 
                    <Main />
                </ModalProvider>
            </Router>
        </LoadingProvider>
    );
}

export default App;
