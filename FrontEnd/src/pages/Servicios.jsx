import React, { useContext, useState } from "react";
import { Navbar } from "../componentes/Navbar/Navbar";
import {Promociones} from "../componentes/Promociones/Promociones"
import {CompServicios} from "../componentes/CompoServicios/CompServicios"

export const Servicios = () => {
        return (
        <>
    <Promociones></Promociones>
    <Navbar></Navbar>
        <CompServicios></CompServicios>
        </>
    )
}
export default Servicios;

