import { useNavigate, Link } from "react-router-dom";
import { useCarritoContext } from "../hooks/useCarritoContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { toast } from "react-toastify";
import "../styles/Carrito.css";

export default function Carrito() {
  const {
    productosCarrito,
    incrementarProducto,
    decrementarProducto,
    borrarProducto,
    vaciarCarrito,
  } = useCarritoContext();

  const { usuarioLogeado, logoutUsuario } = useAuthContext();
  const navigate = useNavigate();

  function handleLogout() {
    logoutUsuario();
    vaciarCarrito();
    navigate("/login");
  }

  if (!usuarioLogeado) {
    return (
      <div className="carrito-overlay" onClick={() => navigate(-1)}>
        <section className="carrito-container" onClick={(e) => e.stopPropagation()}>
          <header className="carrito-header">
            <h2>Carrito</h2>
            <button className="close-button" onClick={() => navigate(-1)}>&times;</button>
          </header>
          <div className="carrito-body">
            <p className="mensaje-vacio">Debés iniciar sesión para ver tu carrito.</p>
            <Link to="/login">
              <button className="boton-iniciar-sesion">Iniciar sesión</button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  if (productosCarrito.length === 0) {
    return (
      <div className="carrito-overlay" onClick={() => navigate(-1)}>
        <section className="carrito-container" onClick={(e) => e.stopPropagation()}>
          <header className="carrito-header">
            <h2>Carrito</h2>
            <button className="close-button" onClick={() => navigate(-1)}>&times;</button>
          </header>
          <div className="carrito-body">
            <p className="mensaje-vacio">Tu carrito está vacío.</p>
          </div>
          <div className="carrito-footer">
            <button className="btn btn-outline-secondary" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </section>
      </div>
    );
  }

  const total = productosCarrito.reduce(
    (acc, prod) => acc + Number(prod.price) * prod.cantidad,
    0
  );

  function handleVaciar() {
    vaciarCarrito();
    dispararSweetBasico("Carrito vacío", "Todos los productos han sido removidos.", "info", "Aceptar");
  }

  function handleFinalizar() {
    toast.success(`¡Compra finalizada! Total: $${total.toFixed(2)}`);
    vaciarCarrito();
  }

  function handleEliminar(id, name) {
    borrarProducto(id);
    dispararSweetBasico("Producto eliminado", `${name} fue removido del carrito.`, "warning", "Aceptar");
  }

  return (
    <div className="container my-4 carrito-responsive">
      <h2 className="text-center mb-4">Carrito de {usuarioLogeado}</h2>

      <ul className="list-group mb-4">
        {productosCarrito.map((producto) => {
          const precio = Number(producto.price);
          const subtotal = precio * producto.cantidad;

          return (
            <li key={producto.id} className="list-group-item d-flex flex-wrap align-items-center justify-content-between gap-3">
              <img
                src={`/imagenes/${producto.imagen}`}
                alt={producto.name}
                className="img-thumbnail carrito-img-responsive"
              />
              <div className="flex-grow-1">
                <h5>{producto.name}</h5>
                <p className="mb-1">${precio.toFixed(2)} c/u</p>

                <div className="d-flex align-items-center gap-2 mb-2">
                  <button className="btn btn-outline-secondary" onClick={() => decrementarProducto(producto.id)} disabled={producto.cantidad === 1}>−</button>
                  <span className="px-2">{producto.cantidad}</span>
                  <button className="btn btn-outline-secondary" onClick={() => incrementarProducto(producto.id)}>+</button>
                </div>

                <p className="mb-1">Subtotal: ${subtotal.toFixed(2)}</p>
              </div>

              <button className="btn btn-eliminar" onClick={() => handleEliminar(producto.id, producto.name)}>
                Eliminar
              </button>
            </li>
          );
        })}
      </ul>

      <div className="border-top pt-3 mb-3">
        <p className="text-muted">Envío gratis superando los $77.000</p>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <strong>Subtotal (sin envío):</strong>
          <span className="fs-5">${total.toFixed(2)}</span>
        </div>

        <div className="d-flex justify-content-between flex-wrap gap-2">
          <button className="btn btn-outline-secondary" onClick={handleLogout}>
            Cerrar sesión
          </button>

          <div className="d-flex gap-2">
            <button className="btn btn-vaciar" onClick={handleVaciar}>
              Vaciar carrito
            </button>
            <button className="btn btn-finalizar" onClick={handleFinalizar}>
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
