import react from 'react';
import extensionesdepestaña from "../../assets/images/diseñopilacionenhenna.png";
import liftingdepestañas from "../../assets/images/liftingdepestañas.png";
import "./combos.css"

export const ComboHyLifting = () => {
    return (
        <div className='contenedorcombo'>
            <div className='encabezado'>
                <h1>Diseño depilacion en henna + lifting de pestañas </h1>
            </div>
            <div className='subtitulo'>
                <h2>Nuestro Metodo:</h2>
            </div>

            <div className='contenedor_contenido'>
                <div className='contenido_combo1'>
                    <div className='conten_h3'>
                    <h3>Diseño de depilación en henna:</h3>
                    <ul>
                        <li>Análisis de la forma y estructura de las cejas para un diseño personalizado.</li>
                        <li>Aplicación de tinte de henna para teñir y definir las cejas.</li>
                        <li>Perfilado y moldeado de la forma de las cejas con técnica de hilo o pinzas.</li>
                    </ul></div>

                    <div className='picture'>
                        <img className='picture1' src={extensionesdepestaña}/>
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

                    <div className='contenido_botones'>
                    <div className='informacion'>
                        <p>120 Minutos</p>
                        <p>$120.000</p>
                        </div>
                        
                        <div className='botonera'>
                            <button id='boton'>Reservar Ahora</button>
                            </div>
                            </div>
        </div>
    
        
    );    
};