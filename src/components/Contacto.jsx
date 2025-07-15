import { toast } from 'react-toastify';
import "../styles/Contacto.css";

function Contacto() {
  const handleEnviar = () => {
    toast.success('¡Gracias por comunicarte!');
  };

  return (
    <div className="contacto-container">
      <h3 className="contacto-titulo">Formulario de Contacto</h3>
      <input type="text" className="form-control mb-3" placeholder="Nombre" />
      <input type="text" className="form-control mb-3" placeholder="Mensaje" />
      <input type="email" className="form-control mb-3" placeholder="Correo Electrónico" />
      <button className="btn btn-success w-100" onClick={handleEnviar}>Enviar</button>
    </div>
  );
}

export default Contacto;
