# Trinity Underwear Store 

Bienvenidos a **Trinity Underwear Store**, un eCommerce desarrollado con **React + Vite**, que implementa un carrito de compras completo, autenticación de usuarios, CRUD de productos con MockAPI, diseño responsive, notificaciones interactivas, buscador, paginación y optimización para SEO.

---

## 🚀 Características Principales

### ✅ Requerimiento #1: Gestión del Carrito y Autenticación de Usuarios

- Carrito funcional con **Context API**.
- Permite **agregar, eliminar, vaciar** e incrementar/decrementar cantidad de productos.
- Autenticación simulada con **localStorage**.
- Rutas protegidas para `/carrito` y `/admin`.
- Login unificado con roles de usuario o administrador.
- Persistencia de sesión.

---

### ✅ Requerimiento #2: CRUD de Productos con MockAPI

- Gestión completa de productos: **crear, leer, editar y eliminar**.
- Formulario validado: nombre obligatorio, precio > 0, descripción mínima.
- Conexión a API externa:  
  👉 [`https://681e7399c1c291fa66341c13.mockapi.io/productos`](https://681e7399c1c291fa66341c13.mockapi.io/productos)
- Uso de `fetch`, `useEffect`, estados de carga y error.
- Confirmaciones con **SweetAlert2**.

---

### ✅ Requerimiento #3: Optimización de Diseño y Responsividad

- Diseño adaptable con **Bootstrap Grid** y **media queries**.
- Estilos personalizados con **styled-components**.
- Interacción mejorada con:
  - **React Toastify** (mensajes de éxito, error, advertencia).
  - **React Icons** (íconos de usuario y carrito).
- SEO básico con **React Helmet**:  
  Título y descripción para la página principal.

---

### ✅ Requerimiento #4: Funcionalidades de Búsqueda y Paginación

- **Buscador dinámico** de productos por nombre.
- Resultados actualizados en tiempo real.
- **Paginación** funcional con Bootstrap (4 productos por página).

---

### ✅ Requerimiento #5: Preparación para el Despliegue

- Verificado en **móviles, tablets y escritorio**.
- Código optimizado y modular.
- Estado global correctamente gestionado.
- Documentación incluida.

---

## 🛠️ Tecnologías Utilizadas

- React
- Vite
- React Router DOM
- Context API
- SweetAlert2
- MockAPI
- Bootstrap 5
- Styled-components
- React Icons
- React Toastify
- React Helmet

---

## 🧭 Estructura del Proyecto

```
src/
├── assets/             # Imágenes, íconos y alertas
├── components/         # Componentes reutilizables
├── contexts/           # Contextos: carrito y autenticación
├── styles/             # Estilos CSS por componente
├── api.js              # URL base para la API
├── App.jsx             # Rutas principales y protección de rutas
├── main.jsx            # Punto de entrada
```

---

## 🔐 Login y Rutas Protegidas

- Si el usuario no ha iniciado sesión, se redirige desde `/carrito` o `/admin` al login.
- Login con selección de rol ("Soy administrador").
- Redirección automática a `/admin` o `/carrito` según el tipo de usuario.
- Sesión persistente con `localStorage`.

---

## ▶️ Cómo Ejecutar el Proyecto

```bash
npm install     # Instala dependencias
npm run dev     # Inicia el servidor local (Vite)
```

---

## 🧑‍💻 Autora

Proyecto desarrollado por **Carla Lorena Apaza Gutierrez**  
como parte del curso de React - 2025.  
**Todos los derechos reservados.**