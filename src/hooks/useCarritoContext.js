import { useContext } from "react";
import { CarritoContext } from "../contexts/CarritoContext";

export function useCarritoContext() {
  return useContext(CarritoContext);
}
