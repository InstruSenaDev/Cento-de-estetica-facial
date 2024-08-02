import React from "react";
import { Navbar } from "../componentes/Navbar/Navbar";
import {Promociones} from "../componentes/Promociones/Promociones"
import {Cejas} from "../componentes/Servicio_detalle/Serviciocejas"

export const ServicioCjas = () => {
    return (
        <>
    <Promociones></Promociones>
    <Navbar></Navbar>
        <Cejas></Cejas>
        </>
    )
}
export default ServicioCjas;

