import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Background.css';
import imagencompleta from "../../assets/images/completo.png";
import imagencejas from "../../assets/images/cejas.png";
import imagenlifting from "../../assets/images/lifting.png";
import imagenmaquillaje from "../../assets/images/maquillaje.png";
import imagenlifcejas from "../../assets/images/pestañas.png"
import imagenfondo from "../../assets/images/imagen_fondo.jpg"
import imagencejashenna from "../../assets/images/cejas_henna.jpg";



export const Background = () => {


    return (

        <div className='conteinergeneral'>
            <div className='iconos'>
                <div className="background">
                    <div className='containergoblal'>
                        <div className='Frase-background'>
                            <h2>
                                Se la mejor parte de ti
                            </h2>
                        </div>
                        <div className='Frase-background'>
                            <h1>
                                CONSIGUE TU <br></br> ESTILO

                            </h1>
                        </div>
                        <div className='Frase-background' >
                            <p> En nuestro centro de estética facial, te invitamos a descubrir una experiencia
                                única donde tu rostro se convierte en lienzo y nuestras manos expertas en pinceles. <br></br>
                                Con dedicación y profesionalismo, nuestro equipo de especialistas en cuidado facial
                                está comprometido en resaltar tu belleza natural, en cada línea, en cada gesto. .
                            </p>

                        </div>

                        <button type="button" class="btn btn-primary boton">AGENDAR  AHORA</button>
                    </div>


                    <div className='foto'>
                        <img src={imagenfondo} />
                    </div>
                </div>
                
                <div className='acercade'>
                    En <b>Natalia Salazar</b>, creemos que realzar tu mirada y tu sonrisa es el secreto para sentirte más bella y segura de ti misma.
                    Nuestros tratamientos destán diseñados para resaltar tu mirada, definir tus rasgos y dejar que tu sonrisa resplandezca.
                    Déjate consentir en nuestro oasis de belleza y encuentra tu resplandor interior.
                </div>

                <div className='fraseservicios'>
                    <strong>Renueva tu bienestar, descubre tu belleza</strong>
                    </div>
                
                <div className='imgservices'>
                    <img className="img-completa" src={imagencejashenna} />
                    <div className='todoimg'>
                       
                        <div className='oa'>
                            <img className="img-cejas" src={imagencejas} />
                            <img className="img-maquillaje" src={imagenmaquillaje} />
                        </div>

                        <div className='oaa'>
                            <img className="img-lifting" src={imagenlifting} />
                            <img className="img-lifcejas" src={imagenlifcejas} />
                        </div>
                        </div>
                        </div>
                
                <div className='bottoncentrado'>
                    <button type="button" class="buttonservi">SERVICIOS</button></div>
                    </div>





            <div className="backgroundtercero">
                <div className="enunciados">
                    <h2>¿Te gustaría separar una cita? <br></br>Te invito a conocer nuestros términos y condiciones de servicio para el año 2024.</h2>
                </div>
                
                <div className="mapa">
                    <iframe
                        title="mapa-google"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.252909459382!2d-76.28432612415621!3d3.528953850698741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3a04cfe462dcb5%3A0xb25c0482a0fa3512!2sCl.%2033%20B%20%23753%2C%20Palmira%2C%20Valle%20del%20Cauca!5e0!3m2!1ses-419!2sco!4v1717762104956!5m2!1ses-419!2sco"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>

                    <div className='Button_conoce'>
                        <NavLink to="/politicas"><button type="button">CONOCE MAS</button></NavLink>
                    </div>
                    </div>
                    </div>
                    </div>

    )

}

export default Background;
