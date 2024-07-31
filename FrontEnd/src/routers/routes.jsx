import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Iniciocomponent } from "../pages/InicioC";
import { Productos } from "../pages/Productos";
import {Diagramas} from "../pages/Diagramas";
import {Reportes} from "../pages/Reportes";
import { Estadisticas} from "../pages/Estadistica";

export function MyRoutes() {
  return (
   
      <Routes>
        <Route path="/inicio" element={<Iniciocomponent />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/diagramas" element={<Diagramas />} />
        <Route path="/reportes" element={<Reportes />} />
      </Routes>
    
  );
}