import React, { useContext, useState } from "react";
import { Agendamiento } from "../componentes/Agendamiento/Agendamiento";
import {Promociones} from "../componentes/Promociones/Promociones";
import { Navbar } from "../componentes/Navbar/Navbar";

export const Agendar = () => {

  return (
    <>
       <Promociones></Promociones>
       <Navbar></Navbar>
    <body className="helloxd">
      <Agendamiento/>
    </body>
      

   
        
        

    </>
  );
};

export default Agendar;