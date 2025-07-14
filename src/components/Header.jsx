import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCarritoContext } from "../hooks/useCarritoContext";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../assets/logo.svg";
import { FaUser, FaShoppingCart, FaSearch, FaTimes } from "react-icons/fa";
import styled from "styled-components";


const StyledHeader = styled.header`
  background-color: #fef6ed;
  font-family: 'Poppins', sans-serif;
  padding: 10px 20px;

  overflow-x: hidden;
  width: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`;

const LogoImg = styled.img`
  width: 180px;
  max-width: 100%;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 140px;
  }
`;

const NavRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavGrid = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px 40px;
    justify-items: center;
    margin-top: 10px;
    margin-bottom: 15px;
  }
`;

const NavLinkStyled = styled(Link)`
  text-decoration: none;
  color: #5e2767;
  font-weight: 500;
  font-size: 22px;
  padding: 35px 30px;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    color: rgb(148, 98, 157);
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Icono = styled.span`
  font-size: 20px;
  cursor: pointer;
  color: #5e2767;
  transition: color 0.2s;

  &:hover {
    color: #9f75c3;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const CartWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const CartCounter = styled.span`
  position: absolute;
  top: -6px;
  right: -10px;
  background-color: #b264c4;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 12px;
`;


const ModalBusqueda = styled.div`
  position: absolute;
  top: 205px;
  right: 35px;
  background-color: #fef6ed;
  border: 2px solid #b264c4;
  border-radius: 10px;
  padding: 12px;
  z-index: 999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    position: fixed;
    top: auto;
    bottom: 70px;
    left: 15px;
    right: auto;
  }
`;

const InputBusqueda = styled.input`
  width: 240px;
  padding: 13px 16px;
  font-size: 16px;
  border: 1px solid #b264c4;
  border-radius: 8px;
  outline: none;
  font-family: 'Poppins', sans-serif;
  color: #5e2767;
  background-color: #fff;

  &::placeholder {
    color: #b264c4;
  }
`;

const CerrarModal = styled.button`
  position: absolute;
  top: 4px;
  right: 6px;
  background: none;
  border: none;
  font-size: 18px;
  color: #5e2767;
  cursor: pointer;
`;


const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fef6ed;
  border-top: 1px solid #ccc;
  padding: 10px 30px;
  display: flex;
  justify-content: space-around;
  z-index: 1000;

  @media (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const navigate = useNavigate();
  const { productosCarrito } = useCarritoContext();
  const { usuarioLogeado, esAdmin } = useAuthContext();
  const cantidadItems = productosCarrito.reduce((acc, prod) => acc + prod.cantidad, 0);

  const [busqueda, setBusqueda] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  function handleLoginClick() {
    if (!usuarioLogeado) {
      navigate("/login");
    } else if (esAdmin) {
      navigate("/admin");
    } else {
      navigate("/carrito");
    }
  }

  function handleBuscarSubmit(e) {
    e.preventDefault();
    if (busqueda.trim()) {
      navigate(`/productos?query=${encodeURIComponent(busqueda.trim())}`);
      setBusqueda("");
      setMostrarModal(false);
    }
  }

  return (
    <StyledHeader className="container-fluid">
      <LogoContainer>
        <Link to="/">
          <LogoImg src={logo} alt="Trinity Store Logo" />
        </Link>
      </LogoContainer>

      <NavRow>
        <NavLinkStyled to="/">Inicio</NavLinkStyled>
        <NavLinkStyled to="/productos">Productos</NavLinkStyled>
        <NavLinkStyled to="/nosotros">Nosotros</NavLinkStyled>
        <NavLinkStyled to="/contacto">Contacto</NavLinkStyled>

        <Icono title="Buscar productos" onClick={() => setMostrarModal(true)}><FaSearch /></Icono>
        <Icono title={usuarioLogeado ? "Ir a tu perfil" : "Iniciar sesión"} onClick={handleLoginClick}><FaUser /></Icono>
        <CartWrapper onClick={() => navigate("/carrito")}>
          <Icono title="Ver carrito"><FaShoppingCart /></Icono>
          {cantidadItems > 0 && <CartCounter>{cantidadItems}</CartCounter>}
        </CartWrapper>
      </NavRow>

      <NavGrid>
        <NavLinkStyled to="/">Inicio</NavLinkStyled>
        <NavLinkStyled to="/productos">Productos</NavLinkStyled>
        <NavLinkStyled to="/nosotros">Nosotros</NavLinkStyled>
        <NavLinkStyled to="/contacto">Contacto</NavLinkStyled>
      </NavGrid>

      {mostrarModal && (
        <ModalBusqueda>
          <CerrarModal onClick={() => setMostrarModal(false)}><FaTimes /></CerrarModal>
          <form onSubmit={handleBuscarSubmit}>
            <InputBusqueda
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              autoFocus
            />
          </form>
        </ModalBusqueda>
      )}

      <BottomBar>
        <Icono title="Buscar productos" onClick={() => setMostrarModal(true)}><FaSearch /></Icono>
        <Icono title={usuarioLogeado ? "Ir a tu perfil" : "Iniciar sesión"} onClick={handleLoginClick}><FaUser /></Icono>
        <CartWrapper onClick={() => navigate("/carrito")}>
          <Icono title="Ver carrito"><FaShoppingCart /></Icono>
          {cantidadItems > 0 && <CartCounter>{cantidadItems}</CartCounter>}
        </CartWrapper>
      </BottomBar>
    </StyledHeader>
  );
}
