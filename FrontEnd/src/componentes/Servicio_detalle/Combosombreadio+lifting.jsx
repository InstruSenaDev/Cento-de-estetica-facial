import react from 'react';
import diseñodepilacionysombreado from "../../assets/images/diseñodepilacionysombreado.png";
import liftingdepestañas from "../../assets/images/liftingdepestañas.png";
import "./combos.css"

export const ComboSyLifting = () => {
    return (
        <div className='contenedorcombo'>
            <div className='encabezado'>
                <h1>Diseño depilacion y sombreado + lifting de pestañas  </h1>
            </div>
            <div className='subtitulo'>
                <h2>Nuestro Metodo:</h2>
            </div>

            <div className='contenedor_contenido'>
                <div className='contenido_combo1'>
                    <div className='conten_h3'>
                    <h3>Diseño de depilación y sombreado:</h3>
                    <ul>
                        <li>Análisis de forma y estructura del rostro para un diseño personalizado de las cejas.</li>
                        <li>Depilación y perfilado de cejas con técnica de hilo o cera.</li>
                        <li>Sombreado de cejas con maquillaje para definir y resaltar la mirada.</li>
                    </ul>
                    </div>

                    <div className='picture'>
                        <img className='picture1' src={diseñodepilacionysombreado}/>
                        </div>
                    </div>

                    <div className='contenido_combo2'>
                        <div className='conten_h3'>
                        <h3>Lifting de pestañas:</h3>
                        <ul>
                            <li>Elevación y rizado de las pestañas naturales para dar un efecto más abierto y expresivo a la mirada.</li>
                            <li>Aplicación de adhesivo especial y colocación de extensiones de pestañas.</li>
                            <li>Posibilidad de personalizar el largo y volumen de las pestañas.</li>
                        </ul></div>

                        <div className='picture'>
                        <img className='picture2' src={liftingdepestañas}/>
                        </div>
                    </div>
                    </div> 

                    <div className='content_boton'>   
                                <div className='combobotontyp'>  
                                    <div className='tiempo'>
                                        <h4>Tiempo</h4>
                                        <p>60 Minutos</p>
                                    </div>
                                    <div className='precio'>
                                        <h4>Precio</h4>
                                        <p>$120.000</p>
                                    </div>
                                    <div className='botones'>
                                <button id='boton'>Reservar Ahora</button>
                            </div>  
                                </div>
                            </div>
        </div>
    
        
    );    
};