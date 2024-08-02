import React from 'react';
import "./CompServicios.css"
import { NavLink } from 'react-router-dom';


export const CompServicios = () => {
    return (
        <div className='componenteServs'>
            <div className='Bannerserviciosg'>
                <div className='tituloserviciosg'>
                    <h1>Nuestros servicios</h1>
                </div>

                {/* <div className='imgcar'>
                    <img className="img-tit" src={banner1} /></div> */}
            </div>

            <div className='secciones_servicios'>
                <div className='Titulo_Servicio_Cejas'>
                    <h3> Servicio Cejas</h3>
                    <div className='serviciodcejas'>
                        <div className='serviciosdetc'>
                            {/* <img className="img-cej" src={Sombreado} /> */}
                            <h5>Diseño-Depilación y sombreado</h5>
                            <h5><b>$29.000</b></h5>
                            <div className='butonSs'><NavLink to="/ServicioCejas"><button class="button_s">Reservar</button>
                            </NavLink> </div>
                        </div>


                        <div className='serviciosdetc'>
                            {/* <img className="img-cej" src={Henna} /> */}
                            <h5>Diseño-Depilación en Henna</h5>
                            <h5><b>$40.000</b></h5>
                            <div className='butonSs'><NavLink to="/ServicioCejas"> <button class="button_s">Reservar</button>
                            </NavLink> </div>
                        </div>

                        <div className='serviciosdetc'>
                            {/* <img className="img-cej" src={lamincacion} /> */}
                            <h5>Laminado de Cejas</h5>
                            <h5><b>$80.000</b></h5>
                            <div className='butonSs'>
                                <NavLink to="/ServicioCejas"> <button class="button_s">Reservar</button>
                                </NavLink> </div>
                        </div>
                    </div>
                </div>

                <div className='Titulo_Servicio_Pestañas'>
                    <h3> Servicio Pestaña</h3>
                    <div className='serviciodpestañas'>
                        <div className='serviciosdetp'>
                            {/* <img className="img-pes" src={liftingg} /> */}
                            <h5>Lifting de Pestañas</h5>
                            <h5><b>$90.000</b></h5>
                            <div className='butonSs'><NavLink to="/ServicioPestañas"><button class="button_s">Reservar</button>
                            </NavLink> </div>
                        </div>

                        <div className='serviciosdetp'>
                            {/* <img className="img-pes" src={extension} /> */}
                            <h5>Extensiones de Pestañas</h5>
                            <h5><b>$120.000</b></h5>
                            <div className='butonSs'><NavLink to="/ServicioPestañas"> <button class="button_s">Reservar</button>
                            </NavLink> </div>
                        </div>
                    </div>
                </div>

                <div className='Titulo_Servicio_Microp'></div>
                <h3> Servicio de Micropigmentación</h3>
                <div className='serviciodmicropig'>
                    <div className='serviciosdm'>
                        {/* <img className="img-mic" src={sstroke} /> */}
                        <h5>Micropigmentacion Hair Stroke </h5>
                        <h5><b>$500.000</b></h5>
                        <div className='butonSs'>
                            <NavLink to="/ServicioMicropigmentacion"> <button class="button_s">Reservar</button>
                            </NavLink> </div>
                    </div>

                    <div className='serviciosdm'>
                        {/* <img className="img-mic" src={microcejass } /> */}
                        <h5>Micropigmentación de Cejas Shadow </h5>
                        <h5><b>$350.000</b></h5>
                        <div className='butonSs'><NavLink to="/ServicioMicropigmentacion"> <button class="button_s">Reservar</button>
                        </NavLink> </div>
                    </div>

                    <div className='serviciosdm'>
                        {/* <img className="img-mic" src={mircrolabioss} /> */}
                        <h5>Micropigmentacion de Labios </h5>
                        <h5><b>$380.000</b></h5>
                        <div className='butonSs'><NavLink to="/ServicioMicropigmentacion"><button class="button_s">Reservar</button>
                        </NavLink> </div>
                    </div>
                </div>

                <div className='Titulo_servicio_combo'>
                    <h3> Combos</h3></div>
                <div className='serviciodecom'>
                    <div className='serviciocombo'>
                        {/* <img className="img-com" src={Sombreado} /> */}
                        <h5>Diseño depilacion en henna + lifting de pestañas </h5>
                        <h5><b>$120.000</b></h5>
                        <div className='butonSs'>
                            <NavLink to="/ComboHennayLifting"> <button class="button_s">Reservar</button>
                            </NavLink></div>
                    </div>
                    <div className='serviciocombo'>
                        {/* <img className="img-com" src={Sombreado} /> */}
                        <h5>Diseño depilacion en henna + extensiones de pestañas </h5>
                        <h5><b>$150.000</b></h5>
                        <div className='butonSs'>
                            <NavLink to="/ComboLaminacionyExtension"> <button class="button_s">Reservar</button>
                            </NavLink></div>
                    </div>
                    <div className='serviciocombo'>
                        {/* <img className="img-com" src={Sombreado} /> */}
                        <h5>Diseño depilacion y sombreado + lifting de pestañas </h5>
                        <h5><b>$100.000</b></h5>
                        <div className='butonSs'>
                            <NavLink to="/Combosombreadoylifting"> <button class="button_s">Reservar</button>
                            </NavLink></div>
                    </div>
                    <div className='serviciocombo'>
                        {/* <img className="img-com" src={Sombreado} alt="Laminación de cejas y lifting de pestañas" /> */}
                        <h5>Laminación de cejas + Lifting de pestañas</h5>
                        <h5><b>$150.000</b></h5>
                        <div className='learn-more'>
                            <NavLink to="/ComboLaminacionyLifting">
                                <button className="button_s">Reservar</button>
                            </NavLink>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default CompServicios;