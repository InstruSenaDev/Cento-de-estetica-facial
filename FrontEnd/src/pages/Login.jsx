import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseconfig';
import flechaizq from "../assets/images/decoración.png";
import or from "../assets/images/OR.png";
import flechader from "../assets/images/decor.png";
import "./Estilos/Login.css";

const LoginUser = ({ closeModal }) => {
    let navigate = useNavigate();
    let location = useLocation(); // Use useLocation to capture the state

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                console.error("Supabase error:", error);
                throw error;
            }

            const redirectTo = location.state?.from || '/';
            navigate(redirectTo);
            closeModal(); 
        } catch (error) {
            console.error("Caught error:", error);
            alert(error.message);
        }
    }

    return (
        <div className='bodySesion'>
            <form onSubmit={handleSubmit}>
                <div className='titulosesion'><b>Iniciar sesión</b></div>
                <div className='subtitsesion'>Complete los campos</div>
                <div className='datosbody'>
                    <div className='contenedorCorreo'>
                        <input
                            className="inputcontenedores"
                            type="text"
                            name='email'
                            placeholder="Ingrese su correo"
                            onChange={handleChange}
                        />
                    </div>
                    <div className='contenedorContraseña'>
                        <input
                            className="inputcontenedores"
                            type="password"
                            name='password'
                            placeholder="Contraseña"
                            onChange={handleChange}
                        />
                    </div>
                    <div className='passwordforgot'> <Link to={'/Recover'}>Haz olvidado contraseña?</Link></div>
                </div>
                <button className="botoningresar" type='submit'>Ingresar</button>
                <div className='decoraciones'>
                    <div className='deco1'><img className="img-dec" src={flechaizq} alt="Decoración izquierda" /></div>
                    <div className='deco2'><img className="img-o" src={or} alt="OR" /></div>
                    <div className='deco3'><img className="img-decor" src={flechader} alt="Decoración derecha" /></div>
                </div>
            </form>
            <div className='redireccionamiento'>
                <div className='poncuenta'>¿No tienes cuenta?</div>
                <Link to="/Registrar" onClick={() => openModal('SignUp')}>Regístrate</Link>

            </div>
        </div>
    );
}

export default LoginUser;
