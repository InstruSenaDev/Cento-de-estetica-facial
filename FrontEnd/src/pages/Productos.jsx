import { styled } from "styled-components";
import { ServiciosCe } from "../componentes/Dahsboard/Servicios";
export function Productos(){
    return(

      
        <Container>
            <h1>Servicios</h1>
            <ServiciosCe/>
        </Container>
    );
}

const Container = styled.div``;