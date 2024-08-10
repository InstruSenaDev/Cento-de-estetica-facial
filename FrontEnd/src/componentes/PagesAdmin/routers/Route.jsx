import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomeAdmin } from "../InicioAdmin";
import { PersonalAdmin } from "../PersonalAdmin";
import { CitasAdmin} from "../CitasAdmin";
import { DiagramasAdmin } from "../DiagramasAdmin";
import { ServiciosAdmin } from "../ServiciosAdmin";

export function MyRoutes() {
  return (
   
     
      <Routes>
        <Route path="/HomeAdmin" element={<HomeAdmin />} />
        <Route path="/DiagramasAdmin" element={<DiagramasAdmin />} />
        <Route path="/CitasAdmin" element={<CitasAdmin />} />
        <Route path="/PersonalAdmin" element={<PersonalAdmin />} />
        <Route path="/ServiciosAdmin" element={<ServiciosAdmin/>}/>
      </Routes>
    
  );
}