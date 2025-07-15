import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";


const FooterWrapper = styled.footer`
  background-color:rgb(237, 221, 226);
  padding: 30px 0;
  font-family: 'Poppins', sans-serif;
  color: #333;
  border-top: 1px solid #ddd;
  font-size: 0.95rem;

  a {
    color:rgb(118, 43, 121);
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  .footer-title {
    font-weight: bold;
    margin-bottom: 10px;
  }

  .social-icons {
    display: flex;
    gap: 12px;
    font-size: 1.4rem;
  }

  .payment-icons img,
  .shipping-icons img {
    height: 28px;
    margin: 4px;
  }

  @media (max-width: 576px) {
    text-align: center;

    .social-icons {
      justify-content: center;
      margin-top: 10px;
    }

    .mt-sm-3 {
      margin-top: 1rem !important;
    }
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <Row>
          <Col sm={4}>
            <p className="footer-title">Navegación</p>
            <ul className="list-unstyled">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
            </ul>
          </Col>

          <Col sm={4} className="mt-sm-3">
            <p className="footer-title">Contactános</p>
            <p>trinity@store.com</p>
            <p>+54 221 6031-112</p>
          </Col>

          <Col sm={4} className="mt-sm-3">
            <p className="footer-title">Sigamos conectadas</p>
            <div className="social-icons">
              <a
                href="https://www.instagram.com/trinity.underwear?igsh=dXRzdWJiNXd0OWc4"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
              <a href="https://wa.me/5491112345678" target="_blank" rel="noreferrer">
                <FaWhatsapp />
              </a>
            </div>
          </Col>
        </Row>

        <hr />

        <Row className="mt-4 text-center">
          <Col md={12} className="mb-3">
            <p className="footer-title">Medios de pago</p>
            <div className="payment-icons">
                  <img src="/imagenes/visa.png" alt="Visa" />
                  <img src="/imagenes/mastercard.png" alt="Mastercard" />
                  <img src="/imagenes/pagofacil.png" alt="Pago Fácil" />
                  <img src="/imagenes/rapipago.png" alt="Rapipago" />
                  <img src="/imagenes/M.P.png" alt="Mercado Pago" />

            </div>
          </Col>

          <Col md={12}>
            <p className="footer-title">Medios de envío</p>
            <div className="shipping-icons">
                  <img src="/imagenes/correoARG.png" alt="Correo Argentino" />
                  <img src="/imagenes/Andreani.png" alt="Andreani" />
            </div>
          </Col>
        </Row>

        <hr />

        <p className="text-center mt-3 mb-0">
          &copy; 2025 - Trinity Store. Todos los derechos reservados.
        </p>
      </Container>
    </FooterWrapper>
  );
}

export default Footer;
