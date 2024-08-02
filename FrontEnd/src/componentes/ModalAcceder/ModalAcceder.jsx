import React from 'react';
import "./ModalAcceder.css"
import deco from "../../assets/images/decoración.png"
import decor from "../../assets/images/decor.png"
import o from "../../assets/images/OR.png"
import { NavLink } from 'react-router-dom';
import "../ModalAcceder"

export const ModalAcceder=() => {
return (
    <div className='todoingreso'>
        <div className='all'>


<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalAcceder" data-bs-whatever="@mdo">Iniciar sesión</button>


<div class="modal fade" id="modalAcceder" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div className='titini'>Ingresa tus Datos</div>
    <div className='subtit'>Complete los campos a continuación</div>
      <div className='datos'>
    <input type="text" name='email' placeholder = "Ingrese su nombre"/>
    <input type="text" name='correo' placeholder = "Ingrese su correo"/>
    <input type="text" name='telefono' placeholder = "Ingrese su teléfono"/>
    <div className='botoningreso'><button type='submit'><b>Ingresar</b></button></div>
</div>

<div className='decoraciones'>
<div className='deco1'><img className="img-dec" src={deco} /></div>
<div className='deco2'><img className="img-o" src={o} /></div>
<div className='deco3'><img className="img-decor" src={decor} /></div>
</div>

<div className='lodeabajo'>
<div className='acclog'>No tienes cuenta?</div>
<NavLink to="/registro"><div className='accreg'>Registrate</div></NavLink>
</div>

</div>

      </div>
    </div>
  </div>
</div>
</div>

);
}

export default ModalAcceder;