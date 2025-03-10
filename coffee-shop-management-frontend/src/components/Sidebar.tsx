import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-light vh-100 p-3 d-flex flex-column" style={{ width: "250px" }}>
      <h4 className="mb-4">☕ <strong>Coffee Shop</strong></h4>
      <Nav className="flex-column">
        <Nav.Link onClick={() => navigate("/")} className="text-dark">🏠 Home</Nav.Link>
        <Nav.Link onClick={() => navigate("/shopping")} className="text-dark">🛍 Shopping</Nav.Link>
        <Nav.Link onClick={() => navigate("/orders")} className="text-dark">📜 Order List</Nav.Link>
        <Nav.Link onClick={() => navigate("/products")} className="text-dark">☕ Add Items</Nav.Link>
        <Nav.Link onClick={() => navigate("/payment")} className="text-dark">💳 Payment</Nav.Link>
        <Nav.Link onClick={() => navigate("/settings")} className="text-dark">⚙ Settings</Nav.Link>
        <Nav.Link className="text-danger mt-3" onClick={handleLogout}>🚪 Log Out</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
