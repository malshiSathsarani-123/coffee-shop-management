import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Cake.css';
import axios from 'axios';

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
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Coffees");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleProductClick = (productId: number) => {
    navigate(`/add-to-cart/${productId}`);
  };

  const fetchProducts = async () => {
    setSelectedCategory("All Coffees")
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/coffeeProduct/getByCategory`, {
        params: { category:"coffee" }
    });   
      setCoffeeProducts(response.data.response);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   fetchProducts(selectedCategory);
  // }, [selectedCategory]);
  const fetchProductsBySubCategory = async (subCategory: string) => {
    setSelectedCategory(subCategory)
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/coffeeProduct/getBySubCategory`, 
        { params: { subCategory } }
      );   
      console.log(response.data.response) 
      setCoffeeProducts(response.data.response);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
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
            {[
              { name: "All Coffees", path: "all-coffees" },
              { name: "Espresso", path: "espresso" },
              { name: "Latte", path: "latte" },
              { name: "Cappuccino", path: "cappuccino" },
              { name: "Mocha", path: "mocha" },
              { name: "Cold Brew", path: "cold-brew" },
              { name: "Iced Coffee", path: "iced-coffee" },
              { name: "Specialty Coffee", path: "specialty-coffee" },
              { name: "Organic Coffee", path: "organic-coffee" }
            ].map(({ name, path }) => (
              <li key={path} className="nav-item">
                <button 
                  className={`nav-link ${selectedCategory === name ? "bg-purple text-white" : ""}`} 
                  onClick={() => (name === "All Coffees" ? fetchProducts() : fetchProductsBySubCategory(name))}
                >
                  {name}
                </button>
              </li>
            ))}
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
                    <Card className="product-card h-100" onClick={() => handleProductClick(product.id)}>
                      <div className="position-relative">
                        {product.isTopChoice && (
                          <Badge bg="warning" className="position-absolute top-0 start-0 mt-2 ms-2">
                            Top Choice
                          </Badge>
                        )}
                        {product.discount && (
                          <Badge bg="dark" className="position-absolute bottom-0 end-0 mb-2 me-2">
                            {product.discount}% off
                          </Badge>
                        )}
                        <Card.Img 
                          variant="top" 
                          src={product.image ? `http://localhost:5000/${product.image}` : "No Image"} 
                          alt={product.name} 
                          className="product-image" 
                        />
                      </div>
                      <Card.Body>
                        <Card.Title className="product-title text-truncate">{product.name}</Card.Title>
                        <Card.Text className="product-price">
                          RS. {product.price ? product.price.toLocaleString() : "N/A"}
                        </Card.Text>
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