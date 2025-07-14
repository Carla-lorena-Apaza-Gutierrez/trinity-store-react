import { useContext } from "react";
import { ProductosContext } from "../contexts/ProductosContext";

export function useProductosContext() {
  return useContext(ProductosContext);
}
