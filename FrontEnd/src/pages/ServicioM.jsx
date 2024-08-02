import React from "react";
import { Navbar } from "../componentes/Navbar/Navbar";
import {Promociones} from "../componentes/Promociones/Promociones"
import {Micropigmentacion} from "../componentes/Servicio_detalle/serviciomicropigmentacion"

export const ServicioMcion = () => {
    return (
        <>
    <Promociones></Promociones>
    <Navbar></Navbar>
        <Micropigmentacion></Micropigmentacion>
        </>
    )
}
export default ServicioMcion;

