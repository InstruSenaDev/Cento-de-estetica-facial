import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Productos } from "../pages/Productos";
import {Diagramas} from "../pages/Diagramas";
import {Reportes} from "../pages/Reportes";
import { Estadisticas} from "../pages/Estadistica";

export function MyRoutes() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/diagramas" element={<Diagramas />} />
        <Route path="/reportes" element={<Reportes />} />
      </Routes>
    
  );
}