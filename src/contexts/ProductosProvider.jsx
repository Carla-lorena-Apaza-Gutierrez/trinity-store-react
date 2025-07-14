import { useState } from "react";
import { ProductosContext } from "./ProductosContext"; 

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [productoEncontrado, setProductoEncontrado] = useState(null);

  async function obtenerProductos() {
    const res = await fetch("https://68100d8b27f2fdac24101ef5.mockapi.io/productos");
    const datos = await res.json();
    setProductos(datos);
    return datos;
  }

  async function obtenerProducto(id) {
    const todos = await obtenerProductos();
    const prod = todos.find(p => p.id === id);
    setProductoEncontrado(prod || null);
    if (!prod) throw new Error("Producto no encontrado");
    return prod;
  }

  async function editarProducto(producto) {
    const res = await fetch(
      `https://68100d8b27f2fdac24101ef5.mockapi.io/productos/${producto.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      }
    );
    if (!res.ok) throw new Error("Error al actualizar");
    const data = await res.json();
    setProductos(prev => prev.map(p => (p.id === data.id ? data : p)));
    return data;
  }

  async function eliminarProducto(id) {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    const res = await fetch(
      `https://68100d8b27f2fdac24101ef5.mockapi.io/productos/${id}`,
      { method: "DELETE" }
    );
    if (!res.ok) throw new Error("Error al eliminar");
    setProductos(prev => prev.filter(p => p.id !== id));
  }

  return (
    <ProductosContext.Provider
      value={{
        productos,
        productoEncontrado,
        obtenerProductos,
        obtenerProducto,
        editarProducto,
        eliminarProducto,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}
