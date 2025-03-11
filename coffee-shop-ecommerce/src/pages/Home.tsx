import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUser, FaTruck, FaTag, FaCalendarAlt, FaTags } from 'react-icons/fa';
import CategoriesDropdown from '../components/CategoriesDropdown'; 

const Home: React.FC = () => {
  // Sample category data for the circular thumbnails
  const categories = [
    { id: 1, name: 'Coffee', image: '/src/assets/coffee.jpeg' },
    { id: 2, name: 'Tea', image: '/src/assets/tea.jpeg' },
    { id: 3, name: 'Beverages', image: '/src/assets/snacks.jpeg' },
    { id: 4, name: 'Pastries & Snacks', image: '/src/assets/snacks.jpeg' },
    { id: 5, name: 'Cakes', image: '/src/assets/cake.jpeg' },
    { id: 6, name: 'Coffee Beans & Merchandise', image: '/src/assets/cake.jpeg' }
  ];
  
  return (
    <div className="dashboard vw-100 overflow-hidden p-0 m-0">
      {/* Categories Menu */}
      <div className="bg-light py-3 vw-100 m-0">
        <Container fluid className="px-0 mx-0 w-100">
          <Row className="g-2 align-items-center flex-nowrap overflow-auto mx-0 w-100">
            <Col xs="auto">
              <CategoriesDropdown />
            </Col>
            <Col xs="auto">
              <div className="d-flex align-items-center text-secondary">
                <FaTruck className="me-2" /> Rush delivery
              </div>
            </Col>
            <Col xs="auto">
              <div className="d-flex align-items-center text-secondary">
                <FaTag className="me-2" /> On Sale
              </div>
            </Col>
            <Col xs="auto">
              <div className="d-flex align-items-center text-secondary">
                <FaCalendarAlt className="me-2" /> Events
              </div>
            </Col>
            <Col xs="auto">
              <div className="d-flex align-items-center text-secondary">
                <FaTags className="me-2" /> Brands
              </div>
            </Col>
            <Col xs="auto" className="ms-auto">
              <div className="d-flex align-items-center text-secondary">
                <FaUser className="me-2" /> For You
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* Hero Banner */}
      <div className="hero-banner position-relative vw-100 m-0 p-0">
        <img 
          src="/src/assets/cofeeShopBackground.jpeg" 
          alt="Shop the Vibe, Wear the Trend" 
          className="vw-100"
          style={{ 
            height: '400px', 
            objectFit: 'cover',
            objectPosition: 'center',
            width: '100vw',
            maxWidth: '100vw'
          }}
        />
        <div className="position-absolute start-0 bottom-0 p-4">
          <h1 style={{ color: 'white' }} className="text-purple fw-bold">Cozy. Aromatic. Bustling. Inviting. Artisanal. Warm.</h1>
        </div>
      </div>
      
      {/* Category Circles */}
      <Container fluid className="my-4 px-0 mx-0 w-100">
        <Row className="g-4 mx-0 w-100">
          {categories.map(category => (
            <Col key={category.id} xs={6} sm={4} md={3} lg={2} className="text-center">
              <Card className="border-0 category-card h-100">
                <div className="rounded-circle overflow-hidden mx-auto" style={{ width: '120px', height: '120px' }}>
                  <Card.Img 
                    src={category.image} 
                    alt={category.name} 
                    className="img-fluid h-100 w-100 object-fit-cover"
                  />
                </div>
                <Card.Body className="p-2">
                  <Card.Title className="small">{category.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};


export default Home;