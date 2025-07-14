import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCarritoContext } from "../hooks/useCarritoContext";
import { API_BASE } from "../api";
import { toast } from "react-toastify";
import "../styles/ProductosContainer.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductosContainer() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { agregarProducto } = useCarritoContext();

  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 4;


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query")?.toLowerCase() || "";


  useEffect(() => {
    setPaginaActual(1);
  }, [query]);

  useEffect(() => {
    fetch(`${API_BASE}/productos`)
      .then((res) => res.json())
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        setCargando(false);
      });
  }, []);

  const productosFiltrados = productos.filter((prod) =>
    prod.name.toLowerCase().includes(query)
  );


  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const indiceFin = indiceInicio + productosPorPagina;
  const productosVisibles = productosFiltrados.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  function handleAgregar(prod) {
    agregarProducto({ ...prod, cantidad: 1 });
    toast.success(`${prod.name} se añadió al carrito 🛒`, {
      position: "top-right",
      autoClose: 1800,
    });
  }

  function cambiarPagina(nuevaPagina) {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  }

  if (cargando) return <p className="text-center">Cargando productos...</p>;

  return (
    <>
      <section className="productos-container">
        {productosVisibles.length === 0 ? (
          <p className="text-center mt-4">No se encontraron productos con ese nombre.</p>
        ) : (
          productosVisibles.map((prod) => (
            <div key={prod.id} className="producto-card">
              <img
                src={
                  prod.imagen.startsWith("http")
                    ? prod.imagen
                    : `/imagenes/${prod.imagen}`
                }
                alt={prod.name}
                className="producto-image"
              />
              <h3>{prod.name}</h3>
              <p className="precio">
                ${prod.price ? Number(prod.price).toFixed(2) : "0.00"}
              </p>
              <div className="card-buttons">
                <button
                  className="btn btn-purple w-100"
                  onClick={() => handleAgregar(prod)}
                >
                  Agregar al carrito
                </button>
                <Link
                  to={`/productos/${prod.id}`}
                  className="btn btn-outline-secondary w-100 card-button-link"
                >
                  Ver más
                </Link>
              </div>
            </div>
          ))
        )}
      </section>


      {productosFiltrados.length > 0 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => cambiarPagina(1)}>
                &laquo;
              </button>
            </li>
            <li className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => cambiarPagina(paginaActual - 1)}
              >
                &lsaquo;
              </button>
            </li>

            <li className="page-item disabled">
              <span className="page-link">
                {paginaActual} / {totalPaginas}
              </span>
            </li>

            <li
              className={`page-item ${
                paginaActual === totalPaginas ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => cambiarPagina(paginaActual + 1)}
              >
                &rsaquo;
              </button>
            </li>
            <li
              className={`page-item ${
                paginaActual === totalPaginas ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => cambiarPagina(totalPaginas)}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default ProductosContainer;
