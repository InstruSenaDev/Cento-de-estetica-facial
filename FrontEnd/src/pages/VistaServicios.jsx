import React, { useContext, useState } from "react";
import Navbar from "../componentes/Navbar/Navbar";
import { VistaDetalle } from "../componentes/VistaDetalladaServ/VistaDetalleSer";
import { Piedepagina } from "../componentes/Footer/footer";




export const VistaServicios = () => {



    return (
        <>
        
        <Navbar></Navbar>
        <VistaDetalle></VistaDetalle>
        <Piedepagina></Piedepagina>


        
        </>





    );
};

