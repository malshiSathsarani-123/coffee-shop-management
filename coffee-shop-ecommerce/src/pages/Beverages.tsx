import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Cake.css';
import axios from 'axios';

interface BeverageProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
  isTopChoice: boolean;
}

const Beverages: React.FC = () => {
  const [beverageProducts, setBeverageProducts] = useState<BeverageProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Beverages");
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/add-to-cart/${productId}`);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setSelectedCategory("All Beverages")
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/coffeeProduct/getByCategory`, {
        params: { category:"beverages" }
    });   
      setBeverageProducts(response.data.response);
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
      setBeverageProducts(response.data.response);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="beverages-page">
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <div className="combo-header p-4 bg-light">
              <h1 className="text-purple">Beverages in Brew Haven for Home Delivery</h1>
              <p className="text-muted">
                Experience the rich aroma and bold flavors of Brew Haven’s premium beverage selection, delivered straight to your doorstep.  
                Whether you crave a morning boost or a relaxing evening cup, our expertly crafted drinks are perfect for any moment.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
        <Col md={3} className="mb-4">
          <div className="sidebar p-3 bg-light">
            <h4 className="text-uppercase text-purple">Beverage Categories</h4>
            <div className="category-nav">
              <div className="breadcrumb-nav mb-3">
                <span>Home</span> / <span>Beverages</span>
              </div>
              <ul className="nav flex-column category-list">
                {[
                  { name: "All Beverages", path: "all-beverages" },
                  { name: "Smoothies", path: "smoothies" },
                  { name: "Juices", path: "juices" },
                  { name: "Organic Beverages", path: "organic-beverages" },
                ].map(({ name, path }) => (
                  <li key={path} className="nav-item">
                    <button 
                      className={`nav-link ${selectedCategory === name ? "bg-purple text-white" : ""}`} 
                      onClick={() => (name === "All Beverages" ? fetchProducts() : fetchProductsBySubCategory(name))}
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
                beverageProducts.map(product => (
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
                        />                      </div>
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

export default Beverages;
