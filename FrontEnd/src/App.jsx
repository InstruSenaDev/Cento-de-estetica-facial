import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import { Servicios } from './pages/Servicios';
import { Acerca_de } from './pages/Acerca_de';
import { Condiciones } from "./pages/Terminos";
import { Pageloader } from './componentes/Animación/Carga';
import { Acceder } from './pages/Acceder';
import { Registro } from "./pages/Registro";
import { RegistroCheck } from "./pages/RegistroCheck";
import { Recuperar } from "./pages/Recuperar";
import { Recuperar2 } from "./pages/Recuperar2";
import { Recuperar3 } from "./pages/Recuperar3";
import { Recuperar4 } from "./pages/Recuperar4";
import { Agendar } from "./pages/Agendar";
import { LoadingProvider, useLoading } from './componentes/Animación/Loadingcontext';
import styled, { ThemeProvider } from "styled-components";
import { Sidebar } from "./componentes/Sidebar/Sidebar";
import { MyRoutes } from "./componentes/PagesAdmin/routers/Route";
import { Light, Dark } from "./Styles/Themes";
export const ThemeContext = React.createContext(null);
import SignUp from './pages/SignUp';
import LoginUser from './pages/Login';
import { CitaAdmin } from "./componentes/Dahsboard/Citas";
import Facturaelectronica from './pages/FacturaElectronica'

function App() {
  const [token, setToken] = useState(false)

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }

  }, [])

  function Main() {
    const { setLoading } = useLoading();
    const { openModal } = useModal();
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
    }, [location, setLoading]);


    const [theme, setTheme] = useState("light");
    const themeStyle = theme === "light" ? Light : Dark;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <>
            <Pageloader />
            <ThemeContext.Provider value={{ setTheme, theme }}>
                <ThemeProvider theme={themeStyle}>
                    <Container className={sidebarOpen ? "sidebarState active" : ""}>
                        <Sidebar
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                        />
                        <MyRoutes />
                    </Container>
                </ThemeProvider>
            </ThemeContext.Provider>
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
                <Main />
                <Routes>

                <Route path="/" element={<Home />} />
                <Route path='/Facturacion' element={<Facturaelectronica />} />
                <Route path='/Registrar' element={<button onClick={() => openModal('SignUp')}>Regístrate</button>} />
                <Route path="/loginsupa" element={<button onClick={() => openModal('LoginUser')}>Inicia Sesión</button>} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/VistaDetalle" element={<VistaServicios />} />
                <Route path="/CitaPend" element={<CitaPend />} />
                <Route path="/acerca" element={<Acerca_de />} />
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
                    <Route path='/Ingresar' element={<Acceder />} />
                    <Route path='/registro' element={<Registro />} />
                    <Route path='/register' element={<RegistroCheck />} />
                    <Route path='/Recover' element={<Recuperar />} />
                    <Route path='/Recover2' element={<Recuperar2 />} />
                    <Route path='/Recover3' element={<Recuperar3 />} />
                    <Route path='/Recover4' element={<Recuperar4 />} />
                    <Route path='/Agendarcita' element={<Agendar />} />
                    <Route path='/Dahsboard'element={<Sidebar/>} />
                    <Route path='/CITA' element={<CitaAdmin/>}/>
                </Routes>
            </Router>
        </LoadingProvider>
    );
}

        const Container = styled.div`
        display: grid;
        grid-template-columns: 90px auto;
        background: ${({ theme }) => theme.bgtotal};
        transition: all 0.3s;
        &.active {grid-template-columns: 300px auto;}
        color: ${({ theme }) => theme.text};
        `;
        
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
