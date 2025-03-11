import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Cake.css';

interface SnackProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
  isTopChoice: boolean;
}

const Snacks: React.FC = () => {
  const [snackProducts, setSnackProducts] = useState<SnackProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchSnackProducts = () => {
      setLoading(true);
      // Simulating API response with data from the image
      const products: SnackProduct[] = [
        {
          id: 1,
          name: "Cheese Stuffed Pretzels",
          price: 2500,
          image: "/images/cheese-pretzels.jpg",
          discount: 10,
          isTopChoice: true
        },
        {
          id: 2,
          name: "Crispy Veggie Chips",
          price: 1500,
          image: "/images/veggie-chips.jpg",
          discount: 15,
          isTopChoice: true
        },
        {
          id: 3,
          name: "Honey Glazed Nuts",
          price: 1200,
          image: "/images/honey-glazed-nuts.jpg",
          discount: 5,
          isTopChoice: true
        },
        {
          id: 4,
          name: "Spicy Nacho Bites",
          price: 1800,
          image: "/images/spicy-nacho-bites.jpg",
          discount: 10,
          isTopChoice: true
        },
        {
          id: 5,
          name: "Chocolate Chip Cookies",
          price: 2000,
          image: "/images/chocolate-chip-cookies.jpg",
          isTopChoice: true
        }
      ];      

      setSnackProducts(products);
      setLoading(false);
    };

    fetchSnackProducts();
  }, []);

  return (
    <div className="snack-page">
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <div className="combo-header p-4 bg-light">
              <h1 className="text-purple">Snacks in Snack Haven for Home Delivery</h1>
              <p className="text-muted">
                Indulge in a delightful selection of snacks from Snack Haven, delivered straight to your door.  
                Perfect for any occasion, our delicious treats are here to satisfy your cravings.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={3} className="mb-4">
            <div className="sidebar p-3 bg-light">
              <h4 className="text-uppercase text-purple">Snack Categories</h4>
              <div className="category-nav">
                <div className="breadcrumb-nav mb-3">
                  <span>Home</span> / <span>Snacks</span>
                </div>
                <ul className="nav flex-column category-list">
                  <li className="nav-item">
                    <Link to="/all-snacks" className="nav-link bg-purple text-white">
                      All Snacks
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/salty-snacks" className="nav-link">
                      Salty Snacks
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/sweet-snacks" className="nav-link">
                      Sweet Snacks
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/crisps" className="nav-link">
                      Crisps & Chips
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/cookies" className="nav-link">
                      Cookies & Biscuits
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/nuts" className="nav-link">
                      Nuts & Dry Fruits
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/healthy-snacks" className="nav-link">
                      Healthy Snacks
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col md={9}>
            <Row>
              {loading ? (
                <Col className="text-center py-5">
                  <div className="spinner-border text-purple" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </Col>
              ) : (
                snackProducts.map(product => (
                  <Col md={4} className="mb-4" key={product.id}>
                    <Card className="product-card h-100">
                      <div className="position-relative">
                        {product.isTopChoice && (
                          <div className="top-choice-badge">
                            <Badge bg="warning" className="position-absolute top-0 start-0 mt-2 ms-2">
                              Top Choices
                            </Badge>
                          </div>
                        )}
                        {product.discount && (
                          <div className="discount-badge">
                            <Badge bg="dark" className="position-absolute bottom-0 end-0 mb-2 me-2">
                              {product.discount}% off
                            </Badge>
                          </div>
                        )}
                        <Card.Img variant="top" src={product.image} alt={product.name} className="product-image" />
                      </div>
                      <Card.Body>
                        <Card.Title className="product-title text-truncate">{product.name}</Card.Title>
                        <Card.Text className="product-price">RS. {product.price.toLocaleString()}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Snacks;
