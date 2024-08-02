import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'boxicons'
import 'boxicons/css/boxicons.min.css';
import "./ModalRegistro.css"
import "../mostrarcontraseña"
import deco from "../../assets/images/decoración.png"
import decor from "../../assets/images/decor.png"
import o from "../../assets/images/OR.png"
import supabase from '../../supabase/supabaseconfig';

export const ModalRegistro = ({ setToken }) => {



  let navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '', password: ''
  })

  console.log(formData)

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }

    })

  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error
      console.log(data)
      setToken(data)
      navigate('/')


      //   alert('Check your email for verification link')


    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className='todoingreso'>
      <div className='all'>
        <form onSubmit={handleSubmit}>
          <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className='titini'>Iniciar sesión</div>
                  <div className='subtit'>Complete los campos a </div>
                  <div className='datos'>
                    <input type="text" name='correo'  placeholder="Ingrese su correo"  onChange={handleChange}/>
                    <div className='cont2'>
                      <input type="password" name='contraseña'  placeholder="Contraseña" onChange={handleChange} />
                      <i className='bx bx-show' />
                    </div>

                    <div className='botoningreso'><button type='submit'><b>Ingresar</b></button></div>
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
        </form>






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
                  <input type="text" name='correo' id='Inputmail2' placeholder="Ingrese su correo" />
                  <div className='cont2'>
                    <input type="password" name='contraseña' id="Input2" placeholder="Contraseña" />
                    <i className='bx bx-show' />
                  </div>

                  <div className='cont3'>

                    <input type="password" name='repcontraseña' id="Input3" placeholder="Confirmar contraseña" />
                    <i className='bx bx-show' />
                  </div>
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

      </div>
    </div>


  );
}

export default ModalRegistro;