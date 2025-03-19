import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const AddToCart: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {  // Add null check here
      addToCart(product);
      navigate("/cart");
    }
  };
  
  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/coffeeProduct/getById/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.error("Error fetching product details:", error);
      alert("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!product) {
    return <Container className="text-center mt-5">Product not found</Container>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className="text-center">
          <Card>
            <Card.Img variant="top" src={`http://localhost:5000/${product.image}`} />
          </Card>
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <h4 className="text-muted">Rs. {product.price}</h4>
          <Button variant="warning" size="lg" className="w-100 mt-3" onClick={handleAddToCart}>
            🛒 Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AddToCart;