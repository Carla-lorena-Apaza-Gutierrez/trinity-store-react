import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCarritoContext } from "../hooks/useCarritoContext";
import { API_BASE } from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ProductoDetalle.css";

function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const { agregarProducto } = useCarritoContext();

  useEffect(() => {
    fetch(`${API_BASE}/productos/${id}`)
      .then((res) => res.json())
      .then((datos) => {
        setProducto(datos);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al cargar detalle:", error);
        setCargando(false);
      });
  }, [id]);

  if (cargando) return <p className="text-center">Cargando detalle...</p>;
  if (!producto) return <p className="text-center">Producto no encontrado</p>;

  const imagenSrc = producto.imagen.startsWith("http")
    ? producto.imagen
    : `/imagenes/${producto.imagen}`;

  function handleAgregar() {
    agregarProducto({ ...producto, cantidad: 1 });
    toast.success(`${producto.name} se añadió al carrito.`);
  }

  return (
    <div className="detalle-container">
      <img
        src={imagenSrc}
        alt={producto.name}
        className="detalle-imagen"
      />
      <div className="detalle-info">
        <h2 className="text-purple">{producto.name}</h2>
        <p>
          <strong>Precio:</strong> ${producto.price}
        </p>
        <p>
          <strong>Descripción:</strong> {producto.descripcion}
        </p>
        <button className="btn btn-purple mt-2" onClick={handleAgregar}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductoDetalle;
