import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Cake.css';

interface CakeProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
  isTopChoice: boolean;
}

const Cake: React.FC = () => {
  const [cakeProducts, setCakeProducts] = useState<CakeProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchCakeProducts = () => {
      setLoading(true);
      // Simulating API response with data from the image
      const products: CakeProduct[] = [
        {
          id: 1,
          name: "Eternal Love Kapruka Cake",
          price: 8900,
          image: "/images/eternal-love-cake.jpg",
          discount: 10,
          isTopChoice: true
        },
        {
          id: 2,
          name: "Love In Bloom Combo",
          price: 12910,
          image: "/images/love-bloom-combo.jpg",
          discount: 10,
          isTopChoice: true
        },
        {
          id: 3,
          name: "To My Better Half Kapruka",
          price: 8700,
          image: "/images/better-half-combo.jpg",
          discount: 10,
          isTopChoice: true
        },
        {
          id: 4,
          name: "Heartfelt Hugs And Roses",
          price: 13480,
          image: "/images/heartfelt-hugs-roses.jpg",
          discount: 10,
          isTopChoice: true
        },
        {
          id: 5,
          name: "I'm Here For You Chocolate",
          price: 7520,
          image: "/images/here-for-you-chocolate.jpg",
          isTopChoice: true
        }
      ];
      
      setCakeProducts(products);
      setLoading(false);
    };

    fetchCakeProducts();
  }, []);

  return (
    <div className="cake-page">
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <div className="combo-header p-4 bg-light">
                <h1 className="text-purple">Cakes in Brew Haven for Home Delivery</h1>
                <p className="text-muted">
                    Satisfy your sweet cravings with Brew Haven’s delightful selection of cakes, delivered straight to your doorstep.  
                    Explore our freshly baked treats, perfect for any celebration or simply indulging in a moment of sweetness.
                </p>
            </div>
          </Col>
        </Row>

        <Row>
        <Col md={3} className="mb-4">
            <div className="sidebar p-3 bg-light">
                <h4 className="text-uppercase text-purple">Cake Categories</h4>
                <div className="category-nav">
                <div className="breadcrumb-nav mb-3">
                    <span>Home</span> / <span>Cakes</span>
                </div>
                <ul className="nav flex-column category-list">
                    <li className="nav-item">
                    <Link to="/all-cakes" className="nav-link bg-purple text-white">
                        All Cakes
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/choco-cakes" className="nav-link">
                        Chocolate Cakes
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/fruit-cakes" className="nav-link">
                        Fruit Cakes
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/cake-and-flower" className="nav-link">
                        Cake And Flower (21)
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/gift-set-and-cake" className="nav-link">
                        Gift Set And Cake (11)
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/choco-gift-and-cake" className="nav-link">
                        Choco Gift And Cake
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/premium-cakes" className="nav-link">
                        Premium Cakes
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/birthday-cakes" className="nav-link">
                        Birthday Cakes
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/wedding-cakes" className="nav-link">
                        Wedding Cakes
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
                cakeProducts.map(product => (
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

export default Cake;