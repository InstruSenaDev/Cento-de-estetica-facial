import React from 'react';
import "./Navbar.css";
import { NavLink } from 'react-router-dom';
import "../ModalRegistro/ModalRegistro"
import "../mostrarcontraseña"
import deco from "../../assets/images/decoración.png"
import decor from "../../assets/images/decor.png"
import o from "../../assets/images/OR.png"


export const Navbar = () => {
    return (
        
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse navbar-centrado" id="navbarNav">
                    <ul className="navbar-nav">
                  
                        <li className="nav-item">
                         
                        </li>
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link" >
                                HOME
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/servicios" className="nav-link">
                                SERVICIOS

                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/acerca-de" className="nav-link" >
                                ACERCA DE
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/contactanos" className="nav-link">
                                CITAS
                            </NavLink>
                            <div className='todoingreso'>


        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className='titini'>Iniciar sesión</div>
    <div className='subtit'>Complete los campos a continuación</div>
      <div className='datos'>
   
   
    <input type="text" name='correo' id='Inputmail1' placeholder= "Ingrese su correo"/>

    <input type="password" name='contraseña' id="Input1" placeholder = "Contraseña" />
    <span className='password1'><i className='bx bx-show'/></span>

    </div>

    <div className='botoningreso'><button type='submit'><b>Agendar</b></button></div>
</div>

<div className='decoraciones'>
<div className='deco1'><img className="img-dec" src={deco} /></div>
<div className='deco2'><img className="img-o" src={o} /></div>
<div className='deco3'><img className="img-decor" src={decor} /></div>
</div>

<div className='lodeabajo'>
<div className='acclog'>No tienes cuenta?</div>
<button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Registrarme</button>
</div>
      </div>

        
    </div>
  </div>
</div>
<div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <div className='titini'>Registrarse</div>
<div className='subtit'>Complete los campos a continuación</div>


<div className='datos'>
<input type="text" name='correo' id='Inputmail2' placeholder= "Ingrese su correo"/>
  
    <input type="password" name='contraseña' id="Input2" placeholder = "Contraseña" />
    <span className='password2'><i className='bx bx-show'/></span>
    


    
    <input type="password" name='repcontraseña'  id="Input3" placeholder = "Confirmar contraseña"/>
    <span className='password3'><i className='bx bx-show'/></span>

    <div className='botoningreso'><button type='submit'><b>Registrarse</b></button></div>
</div>

<div className='decoraciones'>
<div className='deco1'><img className="img-dec" src={deco} /></div>
<div className='deco2'><img className="img-o" src={o} /></div>
<div className='deco3'><img className="img-decor" src={decor} /></div>
</div>

<div className='lodeabajo'>
<div className='acclog'>ya tienes cuenta?</div>
<button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Iniciar sesión</button>
</div>

      </div>
    </div>
  </div>
</div>
<button className="btn btn-principal" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Iniciar sesión</button>

                        </li>
                        <li className="nav-item">
                            <NavLink to="/loginsupa" className="nav-link" >
                                Iniciar Sesion
                            </NavLink>
                        </li>






                    </ul>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
