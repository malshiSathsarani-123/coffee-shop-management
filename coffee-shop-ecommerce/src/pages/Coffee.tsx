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

const Coffee: React.FC = () => {
  const [coffeeProducts, setCoffeeProducts] = useState<CoffeeProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchCoffeeProducts = () => {
      setLoading(true);
      // Simulating API response with data from the image
      const products: CoffeeProduct[] = [
        {
          id: 1,
          name: "Signature Espresso Blend",
          price: 4500,
          image: "/images/signature-espresso.jpg",
          discount: 10,
          isTopChoice: true
        },
        {
          id: 2,
          name: "Velvet Mocha Delight",
          price: 5200,
          image: "/images/velvet-mocha.jpg",
          discount: 15,
          isTopChoice: true
        },
        {
          id: 3,
          name: "Hazelnut Caramel Latte",
          price: 4800,
          image: "/images/hazelnut-caramel-latte.jpg",
          discount: 5,
          isTopChoice: true
        },
        {
          id: 4,
          name: "Classic French Roast",
          price: 5000,
          image: "/images/classic-french-roast.jpg",
          discount: 10,
          isTopChoice: true
        },
        {
          id: 5,
          name: "Iced Vanilla Cold Brew",
          price: 5500,
          image: "/images/iced-vanilla-cold-brew.jpg",
          isTopChoice: true
        }
      ];      
      
      setCoffeeProducts(products);
      setLoading(false);
    };

    fetchCoffeeProducts();
  }, []);

  return (
    <div className="cake-page">
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <div className="combo-header p-4 bg-light">
              <h1 className="text-purple">Coffee in Brew Haven for Home Delivery</h1>
              <p className="text-muted">
                Experience the rich aroma and bold flavors of Brew Haven’s premium coffee selection, delivered straight to your doorstep.  
                Whether you crave a morning boost or a relaxing evening cup, our expertly crafted blends are perfect for any moment.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={3} className="mb-4">
            <div className="sidebar p-3 bg-light">
              <h4 className="text-uppercase text-purple">Coffee Categories</h4>
              <div className="category-nav">
                <div className="breadcrumb-nav mb-3">
                  <span>Home</span> / <span>Coffee</span>
                </div>
                <ul className="nav flex-column category-list">
                  <li className="nav-item">
                    <Link to="/all-coffees" className="nav-link bg-purple text-white">
                      All Coffees
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/espresso" className="nav-link">
                      Espresso
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/latte" className="nav-link">
                      Latte
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/cappuccino" className="nav-link">
                      Cappuccino
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/mocha" className="nav-link">
                      Mocha
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/cold-brew" className="nav-link">
                      Cold Brew
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/iced-coffee" className="nav-link">
                      Iced Coffee
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/specialty-coffee" className="nav-link">
                      Specialty Coffee
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/organic-coffee" className="nav-link">
                      Organic Coffee
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
                coffeeProducts.map(product => (
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

export default Coffee;