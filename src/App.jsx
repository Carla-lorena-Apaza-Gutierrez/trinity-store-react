import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthProvider";
import { CarritoProvider } from "./contexts/CarritoProvider";
import { ProductosProvider } from "./contexts/ProductosProvider";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./layouts/Home";
import ProductosContainer from "./components/ProductosContainer";
import ProductoDetalle from "./components/ProductoDetalle";
import Carrito from "./components/Carrito";
import Login from "./components/Login";
import Admin from "./components/Admin";
import About from "./components/About";
import Contacto from "./components/Contacto";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <ProductosProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ProductosContainer />} />
            <Route path="/productos/:id" element={<ProductoDetalle />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute adminOnly>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route path="/nosotros" element={<About />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
          <Footer />
        </ProductosProvider>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
