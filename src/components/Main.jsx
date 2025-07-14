import React from "react";
import { Helmet } from "react-helmet";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Main.css"; 

function Main() {
  return (
    <>
      <Helmet>
        <title>Inicio | Trinity Store</title>
        <meta name="description" content="Descubrí conjuntos cómodos y sensuales, pensados para vos. Trinity Store: calidad, diseño y confianza." />
        <meta name="keywords" content="lencería, ropa interior, conjuntos, trinity, comodidad, diseño" />
        <meta name="author" content="Trinity Store" />
      </Helmet>

      <section className="main-container">
        <p className="main-text">
          Descubrí nuestra colección de conjuntos cómodos y sensuales, pensados para vos
        </p>
      </section>
    </>
  );
}

export default Main;
