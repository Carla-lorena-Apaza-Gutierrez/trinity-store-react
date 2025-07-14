import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function PrivateRoute({ children, adminOnly = false }) {
  const { usuarioLogeado, esAdmin, authCargado } = useAuthContext();

  if (!authCargado) return null; // Espera que cargue desde localStorage

  if (!usuarioLogeado) return <Navigate to="/login" replace />;
  if (adminOnly && !esAdmin) return <Navigate to="/" replace />;

  return children;
}
