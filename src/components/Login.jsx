import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../auth/firebase";
import { useAuthContext } from "../hooks/useAuthContext";
import Swal from "sweetalert2";
import "../styles/Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", nombre: "" });
  const [modoRegistro, setModoRegistro] = useState(false);
  const [checkAdmin, setCheckAdmin] = useState(false);

  const { usuarioLogeado, loginUsuario, logoutUsuario, esAdmin } = useAuthContext();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setCheckAdmin(checked);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      loginUsuario(form.email, checkAdmin);
      navigate(checkAdmin ? "/admin" : "/carrito");
    } catch (error) {
      console.error(error);
      Swal.fire("Error al iniciar sesión", error.message, "error");
    }
  }

  async function handleRegistro(e) {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.password) {
      Swal.fire("Campos incompletos", "Completa todos los campos para registrarte", "warning");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      loginUsuario(form.email, checkAdmin);
      Swal.fire("Registro exitoso", `¡Te registraste como ${form.email}!`, "success");
      navigate(checkAdmin ? "/admin" : "/carrito");
    } catch (error) {
      console.error(error);
      Swal.fire("Error al registrarse", error.message, "error");
    }
  }

  function handleLogout() {
    logoutUsuario();
    navigate("/login");
  }

  if (usuarioLogeado) {
    return (
      <section className="login-container bg-light shadow p-4 rounded text-center">
        <h2 className="mb-2 text-purple">Sesión iniciada como:</h2>
        <h3 className="login-email">{usuarioLogeado}</h3>
        {esAdmin && <p className="text-success">Rol: Administrador</p>}
        <button className="btn btn-purple mt-3 px-4 py-2" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </section>
    );
  }

  return (
    <section className="login-container p-4">
      <h2 className="mb-3">{modoRegistro ? "Registrarse" : "Iniciar sesión"}</h2>
      <form onSubmit={modoRegistro ? handleRegistro : handleLogin}>
        {modoRegistro && (
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="form-control mb-3"
            value={form.nombre}
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="form-control mb-3"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="form-control mb-3"
          value={form.password}
          onChange={handleChange}
          required
        />
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="checkAdmin"
            checked={checkAdmin}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="checkAdmin">
            Soy administrador
          </label>
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-2">
          {modoRegistro ? "Registrarse" : "Iniciar sesión"}
        </button>
      </form>
      <button
        onClick={() => setModoRegistro((prev) => !prev)}
        className="btn btn-outline-secondary w-100"
      >
        {modoRegistro ? "Ya tengo cuenta" : "Quiero registrarme"}
      </button>
    </section>
  );
}
