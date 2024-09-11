import React from "react";
import './Error404.css'; // Importamos el archivo de CSS

const Noseencuentra = () => {
  return (
    <div>
      <h1>Página de Error 404</h1>
      <p className="zoom-area">
        <b>Animaciones CSS</b> para una página 404 interactiva.
      </p>
      <section className="error-container">
        <span><span>4</span></span>
        <span>0</span>
        <span><span>4</span></span>
      </section>
      <div className="link-container">
        <a
          href="https://www.silocreativo.com/en/creative-examples-404-error-css/"
          className="more-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visita el artículo original
        </a>
      </div>
    </div>
  );
};

export default Noseencuentra;
