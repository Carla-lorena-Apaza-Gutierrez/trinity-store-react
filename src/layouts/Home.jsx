import { useNavigate } from "react-router-dom";
import nuevaTemporada from "../assets/nuevatemporada.png";
import Main from "../components/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .home-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px 60px;
        font-family: "Poppins", sans-serif;
        max-width: 100vw;
        overflow-x: hidden;
      }


      .carousel {
        width: 100%;
        max-width: 1000px;
        margin-bottom: 30px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(93, 58, 155, 0.1);
      }

      .carousel-img {
        height: 580px;
        object-fit: cover;
        width: 100%;
      }

      .cursor-pointer {
        cursor: pointer;
      }

      .carousel-caption {
        text-align: left;
        left: 2%;
        right: auto;
        bottom: 4%;
        background-color: rgba(0, 0, 0, 0.35);
        padding: 20px 30px;
        border-radius: 7px;
        max-width: 280px;
        position: absolute;
      }

      .carousel-caption h2,
      .carousel-caption h5 {
        font-size: 2rem;
        margin-bottom: 10px;
        color: #fff;
        text-shadow: 1px 1px 2px #333;
      }

      .carousel-caption p {
        font-size: 1.1rem;
        margin-bottom: 15px;
        color: #eee;
      }

      .carousel-caption .btn {
        background-color: #8b3a1d;
        border: none;
        font-weight: bold;
        color: white;
        border-radius: 6px;
        padding: 10px 20px;
        transition: background-color 0.3s ease;
      }

      .carousel-caption .btn:hover {
        background-color: #a66148;
      }

      @media (max-width: 768px) {
        .home-container {
          padding: 20px;
        }

        .carousel-img {
          height: 300px;
        }

        .carousel-caption {
          background-color: transparent;
          padding: 0;
          bottom: 10px;
          left: 10px;
          max-width: none;
        }

        .carousel-caption h2,
        .carousel-caption p {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <main className="home-container mt-3">
      <div
        id="carouselBanner"
        className="carousel slide mb-4"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active">
            <img
              src={nuevaTemporada}
              className="d-block w-100 carousel-img"
              alt="Nueva temporada"
            />
            <div className="carousel-caption d-block text-start">
              <h2>AURORA</h2>
              <p>Descubrí nuestra nueva colección de conjuntos</p>
              <button
                className="btn btn-primary px-4 py-2"
                onClick={() => navigate("/productos")}
              >
                Ver productos
              </button>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <img
              src="/imagenes/conjunto1.jpeg"
              className="d-block w-100 carousel-img cursor-pointer"
              alt="Conjunto destacado 1"
              onClick={() => navigate("/productos/1")}
            />
          </div>

          {/* Slide 3 */}
          <div className="carousel-item">
            <img
              src="/imagenes/conjunto2.jpeg"
              className="d-block w-100 carousel-img cursor-pointer"
              alt="Conjunto destacado 2"
              onClick={() => navigate("/productos/2")}
            />
          </div>
        </div>

        {/* Controles */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselBanner"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselBanner"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* Contenido adicional */}
      <Main />
    </main>
  );
}

export default Home;
