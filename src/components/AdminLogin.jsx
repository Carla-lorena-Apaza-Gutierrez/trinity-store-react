import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

export default function AdminLogin({ setLogeadoAdmin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [esAdmin, setEsAdmin]   = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!esAdmin) {
      alert("Debés marcar que sos administrador para continuar.");
      return;
    }
    if (!email || !password) {
      alert("Ingresá tu correo y contraseña.");
      return;
    }

    setLogeadoAdmin(true);
    navigate("/admin");
  }

  return (
    <div className="admin-login-container">
      <h2>Login Administrador</h2>
      <form onSubmit={handleSubmit} className="admin-login-form">
        <label>
          Correo electrónico:
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label>
          Contraseña:
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={esAdmin}
            onChange={() => setEsAdmin(prev => !prev)}
          />
          Soy administrador
        </label>

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}