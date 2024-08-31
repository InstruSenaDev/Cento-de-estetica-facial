import React from 'react';
import "./RecoverCont.css"
import { Link } from 'react-router-dom';
import "./RecoverCont.css";

export const RecoverCont=() => {
return (
    <div className='bodySesion'>
        <div className='jajaxd'>
        <div className='titulosesion'><b>Recuperar contraseña</b></div>
        <div className='subtitsesion'>Por favor introduzca su correo electrónico:</div>

<div className='datosbody'>
    <div className='contenedorCorreo'>
    <input
              className="inputcontenedores"
              type="text"
              name='email'
              placeholder="Ingrese su correo"/>
              
              </div>
              <button className="botoningresar" type='submit'> <Link to={"/Recover2"}>Continuar</Link></button>
              <div className='forgotSign'> <Link to={'/loginsupa'}>Iniciar Sesión</Link></div>
              <div className='forgotRegister'> <Link to={'/Registrar'}>Crear una nueva cuenta</Link></div></div>


</div>
</div>

);
}

export default RecoverCont;