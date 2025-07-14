import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [usuarioLogeado, setUsuarioLogeado] = useState(null);
  const [esAdmin, setEsAdmin] = useState(false);
  const [authCargado, setAuthCargado] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    const storedAdmin = localStorage.getItem("esAdmin");

    if (storedUser) {
      setUsuarioLogeado(storedUser);
      setEsAdmin(storedAdmin === "true");
    }

    setAuthCargado(true); 
  }, []);

  function loginUsuario(email, isAdminChecked) {
    setUsuarioLogeado(email);
    setEsAdmin(isAdminChecked);
    localStorage.setItem("usuario", email);
    localStorage.setItem("esAdmin", isAdminChecked ? "true" : "false");

    Swal.fire(
      isAdminChecked ? "Bienvenido Admin" : "Inicio exitoso",
      isAdminChecked
        ? "Has iniciado sesión como administrador."
        : `¡Hola ${email}!`,
      "success"
    );
  }

  function logoutUsuario() {
    setUsuarioLogeado(null);
    setEsAdmin(false);
    localStorage.removeItem("usuario");
    localStorage.removeItem("esAdmin");

    Swal.fire("Sesión cerrada", "Tu sesión fue cerrada correctamente.", "info");
  }

  return (
    <AuthContext.Provider
      value={{ usuarioLogeado, loginUsuario, logoutUsuario, esAdmin, authCargado }}
    >
      {children}
    </AuthContext.Provider>
  );
}
