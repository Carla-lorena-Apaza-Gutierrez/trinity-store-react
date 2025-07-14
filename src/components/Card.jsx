import { Link } from "react-router-dom";
import { dispararSweetBasico } from "../assets/sweetAlert";
import "../styles/Productos.css";

function Card({ producto, agregarProducto }) {

    function agregarAlCarrito() {
        const productoConCantidad = { ...producto, cantidad: 1 };
        agregarProducto(productoConCantidad);

        dispararSweetBasico(
            "Producto Agregado",
            "El producto fue agregado al carrito con éxito",
            "success",
            "Cerrar"
        );
    }

    return (
        <div className="producto-card">
            <Link to={"/productos/" + producto.id}>
                <img className="producto-image" src={`/imagenes/${producto.imagen}`} alt={producto.name} />
            </Link>

            <h3 className="producto-nombre">{producto.name}</h3>
            <p className="producto-precio">{producto.price} $</p>

            <div className="card-buttons">
                <Link to={`/productos/${producto.id}`} className="card-button-link">
                    <button className="boton-card">Ver detalles del producto</button>
                </Link>

                <button onClick={agregarAlCarrito} className="boton-card">
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
}

export default Card;
