import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import { Servicios } from './pages/Servicios';
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
import { Sidebar } from "./componentes/SidebarLayout/Sidebar";
import { MyRoutes } from "./routers/routes";
import { Light, Dark } from "./Styles/Themes";

export const ThemeContext = React.createContext(null);

function Main() {
    const { setLoading } = useLoading();
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
    return (
        <LoadingProvider>
            <Router>
                <Main />
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
                    <Route path='/Ingresar' element={<Acceder />} />
                    <Route path='/registro' element={<Registro />} />
                    <Route path='/register' element={<RegistroCheck />} />
                    <Route path='/Recover' element={<Recuperar />} />
                    <Route path='/Recover2' element={<Recuperar2 />} />
                    <Route path='/Recover3' element={<Recuperar3 />} />
                    <Route path='/Recover4' element={<Recuperar4 />} />
                    <Route path='/Agendarcita' element={<Agendar />} />
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
        
        export default App;
