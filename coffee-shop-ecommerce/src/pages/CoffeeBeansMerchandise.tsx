import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Cake.css';

interface CoffeeProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
  isTopChoice: boolean;
}

const CoffeeBeansMerchandise: React.FC = () => {
  const [products, setProducts] = useState<CoffeeProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchProducts = () => {
      setLoading(true);
      // Simulating API response with data from the image
      const items: CoffeeProduct[] = [
        {
          id: 1,
          name: "Premium Arabica Coffee Beans",
          price: 3500,
          image: "/images/arabica-beans.jpg",
          discount: 10,
          isTopChoice: true
        },
        {
          id: 2,
          name: "Robusta Coffee Beans",
          price: 4000,
          image: "/images/robusta-beans.jpg",
          discount: 15,
          isTopChoice: true
        },
        {
          id: 3,
          name: "Reusable Coffee Cups",
          price: 1200,
          image: "/images/reusable-cup.jpg",
          isTopChoice: true
        },
        {
          id: 4,
          name: "Coffee Grinder - Manual",
          price: 2500,
          image: "/images/manual-grinder.jpg",
          isTopChoice: true
        },
        {
          id: 5,
          name: "Coffee Bean Storage Jar",
          price: 1800,
          image: "/images/storage-jar.jpg",
          isTopChoice: true
        }
      ];

      setProducts(items);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="coffee-beans-page">
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <div className="combo-header p-4 bg-light">
              <h1 className="text-purple">Coffee Beans & Merchandise</h1>
              <p className="text-muted">
                Discover premium coffee beans and essential accessories for coffee lovers. 
                Our selection includes the finest coffee beans, grinders, mugs, and more—perfect for enhancing your coffee experience.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={3} className="mb-4">
            <div className="sidebar p-3 bg-light">
              <h4 className="text-uppercase text-purple">Product Categories</h4>
              <div className="category-nav">
                <div className="breadcrumb-nav mb-3">
                  <span>Home</span> / <span>Coffee Beans & Merchandise</span>
                </div>
                <ul className="nav flex-column category-list">
                  <li className="nav-item">
                    <Link to="/all-products" className="nav-link bg-purple text-white">
                      All Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/coffee-beans" className="nav-link">
                      Coffee Beans
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/coffee-accessories" className="nav-link">
                      Coffee Accessories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/merchandise" className="nav-link">
                      Merchandise
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
                products.map(product => (
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

export default CoffeeBeansMerchandise;
