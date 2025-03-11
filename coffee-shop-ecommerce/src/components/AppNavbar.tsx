import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

const AppNavbar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-2 w-100">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="me-4">
          <h2 className="mb-0 text-white">
          <span style={{ color: "#ffcc00" }}>B</span>
            <span style={{ color: "#fff" }}>rew </span>
            <span style={{ color: "#ffcc00" }}>H</span>
            <span style={{ color: "#fff" }}>aven</span>
          </h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex flex-grow-1 mx-3 w-100">
            <Form.Control
              type="search"
              placeholder="SEARCH THE ENTIRE STORE..."
              className="me-2 flex-grow-1"
              aria-label="Search"
            />
            <Button variant="warning" className="px-3">
              <FaSearch />
            </Button>
          </Form>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/cart" className="text-white position-relative ms-3">
              <FaShoppingCart size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                0
              </span>
            </Nav.Link>
            <Nav.Link as={Link} to="/orders" className="text-white ms-3">
              <i className="bi bi-list-check"></i>
            </Nav.Link>
            <Nav.Link as={Link} to="/account" className="text-white ms-3">
              <FaUser size={20} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
