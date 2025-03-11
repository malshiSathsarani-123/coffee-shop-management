import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Cake.css';

interface TeaProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
  isTopChoice: boolean;
}

const Tea: React.FC = () => {
  const [teaProducts, setTeaProducts] = useState<TeaProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchTeaProducts = () => {
      setLoading(true);
      // Simulating API response with data for tea products
      const products: TeaProduct[] = [
        {
          id: 1,
          name: "Signature Green Tea",
          price: 3500,
          image: "/images/signature-green-tea.jpg",
          discount: 10,
          isTopChoice: true
        },
        {
          id: 2,
          name: "Chamomile Bliss",
          price: 3800,
          image: "/images/chamomile-bliss.jpg",
          discount: 15,
          isTopChoice: true
        },
        {
          id: 3,
          name: "Minty Iced Green Tea",
          price: 4000,
          image: "/images/minty-iced-green-tea.jpg",
          discount: 5,
          isTopChoice: true
        },
        {
          id: 4,
          name: "Earl Grey Delight",
          price: 4200,
          image: "/images/earl-grey-delight.jpg",
          discount: 10,
          isTopChoice: true
        },
        {
          id: 5,
          name: "Cinnamon Spiced Chai",
          price: 4500,
          image: "/images/cinnamon-spiced-chai.jpg",
          isTopChoice: true
        }
      ];      
      
      setTeaProducts(products);
      setLoading(false);
    };

    fetchTeaProducts();
  }, []);

  return (
    <div className="tea-page">
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <div className="combo-header p-4 bg-light">
              <h1 className="text-green">Teas from Brew Haven for Home Delivery</h1>
              <p className="text-muted">
                Indulge in the soothing flavors and relaxing aromas of Brew Haven’s premium tea selection, delivered straight to your doorstep. 
                Perfect for moments of calm and relaxation, our curated blends are ideal for any time of the day.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={3} className="mb-4">
            <div className="sidebar p-3 bg-light">
              <h4 className="text-uppercase text-green">Tea Categories</h4>
              <div className="category-nav">
                <div className="breadcrumb-nav mb-3">
                  <span>Home</span> / <span>Tea</span>
                </div>
                <ul className="nav flex-column category-list">
                  <li className="nav-item">
                    <Link to="/all-teas" className="nav-link bg-green text-white">
                      All Teas
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/green-tea" className="nav-link">
                      Green Tea
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/black-tea" className="nav-link">
                      Black Tea
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/herbal-tea" className="nav-link">
                      Herbal Tea
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/iced-tea" className="nav-link">
                      Iced Tea
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/chai-tea" className="nav-link">
                      Chai Tea
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/specialty-tea" className="nav-link">
                      Specialty Tea
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/organic-tea" className="nav-link">
                      Organic Tea
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
                  <div className="spinner-border text-green" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </Col>
              ) : (
                teaProducts.map(product => (
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

export default Tea;
