import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"; 
import { CarritoContext } from "./CarritoContext";       

export function CarritoProvider({ children }) {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const { usuarioLogeado } = useAuthContext();

  function agregarProducto(producto) {
    const existe = productosCarrito.find(p => p.id === producto.id);
    if (existe) {
      setProductosCarrito(productosCarrito.map(p =>
        p.id === producto.id
          ? { ...p, cantidad: p.cantidad + producto.cantidad }
          : p
      ));
    } else {
      setProductosCarrito([...productosCarrito, producto]);
    }
  }

  function incrementarProducto(id) {
    setProductosCarrito(prev =>
      prev.map(p =>
        p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );
  }

  function decrementarProducto(id) {
    setProductosCarrito(prev =>
      prev.map(p =>
        p.id === id && p.cantidad > 1 ? { ...p, cantidad: p.cantidad - 1 } : p
      )
    );
  }

  function borrarProducto(id) {
    setProductosCarrito(prev => prev.filter(p => p.id !== id));
  }

  function vaciarCarrito() {
    setProductosCarrito([]);
  }

  return (
    <CarritoContext.Provider
      value={{
        productosCarrito,
        agregarProducto,
        incrementarProducto,
        decrementarProducto,
        borrarProducto,
        vaciarCarrito,
        usuarioLogeado
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
