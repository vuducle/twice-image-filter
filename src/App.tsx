import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Filter from "./Components/Filter";
import NewsPage from "./Components/NewsPage";
import { Col, Row } from "react-bootstrap";

function App() {
  const RedirectSite = () => {
    window.location.href = "/twice-memory.html";
    return <></>;
  };

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            KPOP-APP
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                TWICE-Filter-App
              </Nav.Link>
              <Nav.Link as={Link} to="/news">
                News-App
              </Nav.Link>
              <Nav.Link as={Link} to="/memory">
                TWICE-Memory-Game
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Filter />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/memory" element={<RedirectSite />} />
      </Routes>

      <footer className="bg bg-light">
        <Container>
          <Row className="py-2 d-flex align-items-center">
            <Col md={8}>
              <a
                href="https://github.com/vuducle"
                className="btn btn-secondary me-2"
                title="GitHub"
              >
                <i className="bi bi-github" style={{ color: "#fff" }}></i>
              </a>
              <a
                href="mailto:vuduc.le@icloud.com"
                className="btn btn-secondary me-2"
                title="E-Mail"
              >
                <i className="bi bi-envelope" style={{ color: "#fff" }}></i>
              </a>
              <a
                href="https://www.linkedin.com/in/vuducle97/"
                className="btn btn-primary"
                title="LinkedIn"
              >
                <i className="bi bi-linkedin" style={{ color: "#fff" }}></i>
              </a>
            </Col>
            <Col md={4}>&copy; - 2024</Col>
          </Row>
        </Container>
      </footer>
    </Router>
  );
}

export default App;
