import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { API_BASE } from "../api";
import Swal from "sweetalert2";
import { dispararSweetBasico } from "../assets/sweetAlert";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import "../styles/Admin.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Admin() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", price: "", imagen: "", descripcion: "" });
  const [nuevoProducto, setNuevoProducto] = useState({ name: "", price: "", imagen: "", descripcion: "" });
  const [imagenPreview, setImagenPreview] = useState("");
  const [imagenArchivo, setImagenArchivo] = useState(null);

  const { usuarioLogeado, esAdmin, logoutUsuario, authCargado } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authCargado) return;
    if (!usuarioLogeado || !esAdmin) {
      Swal.fire("Acceso denegado", "No tenés permisos para acceder al panel de administración.", "error");
      navigate("/login");
    }
  }, [usuarioLogeado, esAdmin, authCargado, navigate]);

  useEffect(() => {
    fetch(`${API_BASE}/productos`)
      .then(res => res.json())
      .then(datos => {
        setProductos(datos);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos.");
        setCargando(false);
      });
  }, []);

  function handleLogout() {
    logoutUsuario();
    navigate("/login");
  }

  function handleEditarClick(producto) {
    setEditandoId(producto.id);
    setEditForm({
      name: producto.name,
      price: producto.price,
      imagen: producto.imagen,
      descripcion: producto.descripcion || "",
    });
  }

  function handleCancelar() {
    setEditandoId(null);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  }

  function handleNuevoProductoChange(e) {
    const { name, value, files } = e.target;
    if (name === "imagen" && files && files[0]) {
      setImagenArchivo(files[0]);
      setImagenPreview(URL.createObjectURL(files[0]));
      setNuevoProducto(prev => ({ ...prev, imagen: "" }));
    } else {
      if (name === "imagen") {
        setImagenPreview(value);
        setImagenArchivo(null);
      }
      setNuevoProducto(prev => ({ ...prev, [name]: value }));
    }
  }

  async function handleCrearProducto() {
    const { name, price, descripcion } = nuevoProducto;
    if (!name.trim() || !price || price <= 0 || !descripcion || descripcion.length < 10) {
      return dispararSweetBasico("Error", "Completá todos los campos correctamente", "error", "Cerrar");
    }

    let imagenFinal = nuevoProducto.imagen;
    if (!imagenArchivo && !imagenPreview.match(/^https?:\/\/.+/)) {
      return dispararSweetBasico("Error", "Ingresá una imagen válida o cargá un archivo", "error", "Cerrar");
    }

    if (imagenArchivo) {
      try {
        const nombreUnico = `${Date.now()}-${imagenArchivo.name}`;
        const storageRef = ref(storage, `productos/${nombreUnico}`);
        await uploadBytes(storageRef, imagenArchivo);
        imagenFinal = await getDownloadURL(storageRef);
      } catch (error) {
        console.error("Error al subir a Firebase:", error);
        return dispararSweetBasico("Error", "No se pudo subir la imagen", "error", "Cerrar");
      }
    }

    const productoAEnviar = { ...nuevoProducto, imagen: imagenFinal };

    fetch(`${API_BASE}/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productoAEnviar),
    })
      .then(res => res.json())
      .then(nuevo => {
        setProductos(prev => [...prev, nuevo].sort((a, b) => Number(b.id) - Number(a.id)));
        setNuevoProducto({ name: "", price: "", imagen: "", descripcion: "" });
        setImagenPreview("");
        setImagenArchivo(null);
        dispararSweetBasico("Creado", "Producto agregado correctamente", "success", "Aceptar");
      })
      .catch(err => {
        console.error("Error al crear producto:", err);
        dispararSweetBasico("Error", "No se pudo crear el producto", "error", "Cerrar");
      });
  }

  function handleGuardar(id) {
    if (!editForm.name.trim() || !editForm.price || editForm.price <= 0 || !editForm.descripcion || editForm.descripcion.length < 10 || !editForm.imagen.trim()) {
      return dispararSweetBasico("Error", "Completá todos los campos correctamente", "error", "Cerrar");
    }
    const urlValida =
      editForm.imagen.match(/^https?:\/\/.*\.(jpg|jpeg|png|webp|gif|bmp)$/i) ||
      editForm.imagen.startsWith("https://encrypted-tbn") ||
      editForm.imagen.startsWith("https://firebasestorage") ||
      editForm.imagen.startsWith("https://");

    if (!urlValida) {
      return dispararSweetBasico("Error", "El nombre o URL de la imagen debe tener una extensión válida o ser una URL segura", "error", "Cerrar");
    }

    fetch(`${API_BASE}/productos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    })
      .then(res => res.json())
      .then(() => {
        const nuevosProductos = productos.map(p => p.id === id ? { ...p, ...editForm } : p);
        setProductos(nuevosProductos);
        setEditandoId(null);
        dispararSweetBasico("Actualizado", "Producto editado exitosamente", "success", "Aceptar");
      })
      .catch(err => {
        console.error("Error al guardar:", err);
        dispararSweetBasico("Error", "No se pudo guardar", "error", "Cerrar");
      });
  }

  function handleEliminar(id, nombre) {
    Swal.fire({
      title: `¿Eliminar "${nombre}"?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`${API_BASE}/productos/${id}`, { method: "DELETE" })
          .then(() => {
            setProductos(prev => prev.filter(p => p.id !== id));
            Swal.fire("Eliminado", `"${nombre}" fue eliminado.`, "success");
          })
          .catch(err => {
            console.error("Error al eliminar:", err);
            Swal.fire("Error", "No se pudo eliminar el producto.", "error");
          });
      }
    });
  }

  if (!authCargado) return <p className="admin-mensaje">Verificando acceso de administrador...</p>;
  if (cargando) return <p className="admin-mensaje">Cargando productos....</p>;
  if (error) return <p className="admin-mensaje">{error}</p>;

  return (
    <Container fluid className="admin-panel">
      <header className="admin-header">
        <h2>Panel de Administración</h2>
        <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
      </header>
      <p>Desde acá podes editar todos los productos.</p>

      <div className="nuevo-producto-form">
        <h3 className="nuevo-toggle" onClick={() => setMostrarFormularioNuevo(prev => !prev)}>
          ➕ Agregar nuevo producto
        </h3>

        {mostrarFormularioNuevo && (
          <Row>
            <Col xs={12} sm={6}>
              <input name="name" placeholder="Nombre" value={nuevoProducto.name} onChange={handleNuevoProductoChange} />
            </Col>
            <Col xs={12} sm={6}>
              <input name="price" type="number" placeholder="Precio" value={nuevoProducto.price} onChange={handleNuevoProductoChange} />
            </Col>
            <Col xs={12}>
              <textarea name="descripcion" placeholder="Descripción" value={nuevoProducto.descripcion} onChange={handleNuevoProductoChange} />
              <input name="imagen" placeholder="URL de imagen o dejalo vacío si subís archivo" value={nuevoProducto.imagen} onChange={handleNuevoProductoChange} className="mb-2" />
              <input type="file" accept="image/*" onChange={(e) => handleNuevoProductoChange({ target: { name: "imagen", files: e.target.files } })} className="mb-2" />
              {imagenPreview && (
                <div className="preview-container mb-2">
                  <p>Vista previa:</p>
                  <img src={imagenPreview} alt="preview" className="admin-img" />
                </div>
              )}
              <button className="btn-crear" onClick={handleCrearProducto}>Crear producto</button>
            </Col>
          </Row>
        )}
      </div>

      <div className="table-responsive">
        <table className="admin-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(producto => {
              const imagenSrc = producto.imagen.startsWith("http") ? producto.imagen : `/imagenes/${producto.imagen}`;
              return (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{editandoId === producto.id ? <input name="name" value={editForm.name} onChange={handleInputChange} /> : producto.name}</td>
                  <td>{editandoId === producto.id ? <input name="price" type="number" value={editForm.price} onChange={handleInputChange} /> : `${producto.price} $`}</td>
                  <td>{editandoId === producto.id ? <textarea name="descripcion" value={editForm.descripcion} onChange={handleInputChange} /> : producto.descripcion}</td>
                  <td>
                    {editandoId === producto.id ? (
                      <input name="imagen" value={editForm.imagen} onChange={handleInputChange} />
                    ) : (
                      <img src={imagenSrc} alt={producto.name} className="admin-img" />
                    )}
                  </td>
                  <td>
                    {editandoId === producto.id ? (
                      <>
                        <button className="btn-guardar" onClick={() => handleGuardar(producto.id)}>Guardar</button>
                        <button className="btn-cancelar" onClick={handleCancelar}>Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button className="btn-editar" onClick={() => handleEditarClick(producto)}>Editar</button>
                        <button className="btn-eliminar" onClick={() => handleEliminar(producto.id, producto.name)}>Eliminar</button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
