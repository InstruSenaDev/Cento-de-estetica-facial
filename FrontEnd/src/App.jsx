import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import {Servicios} from './pages/Servicios';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { InicioSesion } from './componentes/InicioSesion/InicioSesion';
import { Piedepagina } from './componentes/Footer/footer';
import { ServicioPestañas } from "./pages/ServicioP";
import { ServicioCjas } from "./pages/ServicioC";
import { ServicioMcion } from "./pages/ServicioM";
import { Condiciones } from "./pages/Terminos";
import { ComboHeyLifting } from "./pages/ComboC-Henna+Lifing";
import { ComboSombrayLifiting } from "./pages/comboC-Sombreado+Lifitng";
import { Combolamiyextension } from "./pages/ComboP-Lamc+Extension";
import { Combolaminylif } from "./pages/ComboP-Lamc+Lifting";
import { Pageloader } from './componentes/Animación/Carga';
import {Acceder} from './pages/Acceder';
import { Registro } from "./pages/Registro";
import { RegistroCheck } from "./pages/RegistroCheck";
import { Recuperar } from "./pages/Recuperar";
import { Recuperar2 } from "./pages/Recuperar2";
import { Recuperar3 } from "./pages/Recuperar3";
import { Recuperar4 } from "./pages/Recuperar4";
import { Agendar } from "./pages/Agendar";
// import { SidebarLayout } from "./pages/Sidebarpage";
import { LoadingProvider, useLoading } from './componentes/Animación/Loadingcontext';
import {AuthProvider} from './context/AuthProvider';
import {Dashboard} from './componentes/Dash_board/Dashboard';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import {Appointments} from './pages/AppointmentForm';
import {Services} from './pages/Services';

function Main() {
    const { setLoading } = useLoading();
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
    }, [location, setLoading]);

    return (
        <>
            <Pageloader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/inicio" element={<InicioSesion />} />
                <Route path="/politicas" element={<Condiciones />} />
                <Route path="/serviciocejas" element={<ServicioCjas />} />
                <Route path="/serviciopestañas" element={<ServicioPestañas />} />
                <Route path="/serviciomicropigmentacion" element={<ServicioMcion />} />
                <Route path="/combohennaylifting" element={<ComboHeyLifting />} />
                <Route path="/combosombreadoylifting" element={<ComboSombrayLifiting />} />
                <Route path="/combolaminacionyextension" element={<Combolamiyextension />} />
                <Route path="/combolaminacionylifting" element={<Combolaminylif />} />
                <Route path="/inicio" element={<InicioSesion />} />
                <Route path='/Ingresar' element={<Acceder />} />
                <Route path='/registro' element={<Registro />} />
                <Route path='/register' element={<RegistroCheck />} />
                <Route path='/Recover' element={<Recuperar />} />
                <Route path='/Recover2' element={<Recuperar2 />} />
                <Route path='/Recover3' element={<Recuperar3 />} />
                <Route path='/Recover4' element={<Recuperar4 />} />
                <Route path='/Agendarcita' element={<Agendar />} />

                <Route path="/" exact component={Dashboard} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/appointments" component={Appointments} />
                    <Route path="/services" component={Services} />

            
            </Routes>
        </>
    );
}

function App() {
    return (
        <LoadingProvider>
            <Router>
                <Main />
            </Router>
        </LoadingProvider>
    );
}

export default App;
