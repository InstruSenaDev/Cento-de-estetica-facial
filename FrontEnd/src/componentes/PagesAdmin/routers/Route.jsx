import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomeAdmin } from "../InicioAdmin";
import { PersonalAdmin } from "../PersonalAdmin";
import  Citas from '../CitasAdmin';
import { DiagramasAdmin } from "../DiagramasAdmin";
import { ServiciosAdmin } from "../ServiciosAdmin";

export function MyRoutes() {
  return (
   
     
      <Routes>
        <Route path="/HomeAdmin" element={<HomeAdmin />} />
        <Route path="/DiagramasAdmin" element={<DiagramasAdmin />} /> 
        <Route path="/PersonalAdmin" element={<PersonalAdmin />} />
        <Route path="/AdminCitas" element={< Citas/>}/>
        <Route path="/ServiciosAdmin" element={<ServiciosAdmin/>}/>
      </Routes>
    
  );
}