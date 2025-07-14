import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";

const FooterWrapper = styled.footer`
  background-color: #f8f9fa;
  padding: 30px 0;
  font-family: 'Poppins', sans-serif;
  color: #333;
  border-top: 1px solid #ddd;
  font-size: 0.95rem;

  a {
    color:rgb(129, 42, 132);
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
            <p className="footer-title">Contacto</p>
            <p>trinity@store.com</p>
            <p>+54 11 1234-5678</p>
          </Col>

          <Col sm={4} className="mt-sm-3">
            <p className="footer-title">Seguinos</p>
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
        <p className="text-center mt-3 mb-0">
          &copy; 2025 - Trinity Store. Todos los derechos reservados.
        </p>
      </Container>
    </FooterWrapper>
  );
}

export default Footer;
