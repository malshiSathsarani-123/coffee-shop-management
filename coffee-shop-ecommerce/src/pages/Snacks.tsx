import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Cake.css';
import axios from 'axios';

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
  const [error, setError] = useState("");
      const [selectedCategory, setSelectedCategory] = useState("All Snacks");
      const navigate = useNavigate();

      const handleProductClick = (productId: number) => {
        navigate(`/add-to-cart/${productId}`);
      };
    useEffect(() => {
      fetchProducts();
    }, []);
  
    const fetchProducts = async () => {
      setSelectedCategory("All Snacks")
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/coffeeProduct/getByCategory`, {
          params: { category:"snacks" }
      });   
        setSnackProducts(response.data.response);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
   
    const fetchProductsBySubCategory = async (subCategory: string) => {
      setSelectedCategory(subCategory)
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/coffeeProduct/getBySubCategory`, 
          { params: { subCategory } }
        );   
        console.log(response.data.response) 
        setSnackProducts(response.data.response);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

 

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
            {[
              { name: "All Snacks", path: "all-snacks" },
              { name: "Salty Snacks", path: "salty-snacks" },
              { name: "Sweet Snacks", path: "sweet-snacks" },
              { name: "Crisps & Chips", path: "crisps" },
              { name: "Cookies & Biscuits", path: "cookies" },
              { name: "Nuts & Dry Fruits", path: "nuts" },
              { name: "Healthy Snacks", path: "healthy-snacks" }
            ].map(({ name, path }) => (
              <li key={path} className="nav-item">
                <button 
                  className={`nav-link ${selectedCategory === name ? "bg-purple text-white" : ""}`} 
                  onClick={() => (name === "All Snacks" ? fetchProducts() : fetchProductsBySubCategory(name))}
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
                snackProducts.map(product => (
                  <Col md={4} className="mb-4" key={product.id}>
                    <Card className="product-card h-100" onClick={() => handleProductClick(product.id)}>
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
                        <Card.Img 
                          variant="top" 
                          src={product.image ? `http://localhost:5000/${product.image}` : "No Image"} 
                          alt={product.name} 
                          className="product-image" 
                        />   
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
