import React from 'react';
import 'boxicons'
import 'boxicons/css/boxicons.min.css';
import "./CheckReg.css"
import deco from "../../assets/images/decoración.png"
import decor from "../../assets/images/decor.png"
import o from "../../assets/images/OR.png"

export const CheckReg=() => {
return (
    <div className='todoingreso'>
        <div className='all'>
<div className='titini'>Registrarse</div>
<div className='subtit'>Complete los campos a continuación</div>


<div className='mensajecheck'>
    <div className='iconocheck'><i className='bx bx-badge-check'/></div>
    <div className='datocheck'>Le hemos enviado un correo electrónico, haga click en el enlace incluido para verificar su dirección de correo electrónico.</div>
</div>

<div className='decoraciones'>
<div className='deco1'><img className="img-dec" src={deco} /></div>
<div className='deco2'><img className="img-o" src={o} /></div>
<div className='deco3'><img className="img-decor" src={decor} /></div>
</div>

<div className='lodeabajo'>
<div className='acclog'>ya tienes cuenta?</div>
<div className='accini'>Iniciar sesión</div>
</div>



</div>
</div>

);
}

export default CheckReg;