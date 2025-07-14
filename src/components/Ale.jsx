import { useState, useEffect } from "react";
import "../styles/Productos.css";
import { dispararSweetBasico } from "../assets/sweetAlert";
import Card from "./Card";

function ProductosAle({ functionCarrito }) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    fetch("https://68100d8b27f2fdac24101ef5.mockapi.io/productos")
        .then((res) => res.json())
        .then((datos) => {
        console.log(datos);
        setProductos(datos);
        setCargando(false);
        })
        .catch((error) => {
        console.log("Error", error);
        setError("Hubo un error al cargar los productos.");
        setCargando(false);
        });
    }, []);

    if (cargando) {
    return <p>Cargando productos...</p>;
    } else if (error) {
    return <p>{error}</p>;
    } else {
    return (
    <div className="productos-container">
        {productos.map((producto) => (
            <Card
            key={producto.id}
            producto={producto}
            funcionCarrito={(prod) => {
                functionCarrito(prod);
                dispararSweetBasico("Producto agregado", "Se añadió al carrito", "success", "OK");
            }}
            />
        ))}
        </div>
    );
    }
}

export default ProductosAle;
