import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

const Home: React.FC = () => {
  const categories = [
    { id: 1, name: 'Coffee', image: '/src/assets/coffee.jpeg', path: '/coffee' },
    { id: 2, name: 'Tea', image: '/src/assets/tea.jpeg', path: '/tea' },
    { id: 3, name: 'Beverages', image: '/src/assets/baverages.avif', path: '/beverages' },
    { id: 4, name: 'Pastries & Snacks', image: '/src/assets/patisserie.avif', path: '/snacks' },
    { id: 5, name: 'Cakes', image: '/src/assets/cake.avif', path: '/cake' },
    { id: 6, name: 'Coffee Beans & Merchandise', image: '/src/assets/coffee-beans-merchandise.jpeg', path: '/coffee-beans-merchandise' }
  ];
  
  return (
    <div className="dashboard vw-100 overflow-hidden p-0 m-0"> 
      {/* Hero Banner */}
      <div className="hero-banner position-relative vw-100 m-0 p-0">
        <img 
          src="/src/assets/coffee.avif" 
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
              <Link to={category.path} className="text-decoration-none"> 
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
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};


export default Home;