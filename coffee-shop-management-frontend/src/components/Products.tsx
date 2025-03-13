import React, { useEffect, useState } from "react";
import { Container, Card, Table, Button, Modal, Form ,Row,Col} from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import axios from 'axios';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editProduct, setEditProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    category: "",
    image: "",
  }); 
  
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState<{
    name: string;
    category: string;
    price: number;
    image: File | null; 
  }>({
    name: '',
    category: '',
    price: 0,
    image: null,  
  });
  
  interface Product {
    _id?: string;  
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
  }
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/coffeeProduct/coffee-products/get");
      console.log(response);
      
      setProducts(response.data.response);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewProduct({ ...newProduct, image: file });
    }
  };
  
  
  const handleSaveProduct = async () => {
    console.log(newProduct);
    
    if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.category) {
      alert("Please fill all required fields!");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("category", newProduct.category);
    formData.append("price", newProduct.price.toString());
    formData.append("image", newProduct.image); 
  
    try {
      const response = await axios.post("http://localhost:5000/api/coffeeProduct/coffee-products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchProducts();
      alert(response.data.message);
      setShowModal(false);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product");
    }
};

  
  
  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid className="p-4">
        <h3 className="mb-3">☕ Product Management</h3>
        <Card className="shadow-sm p-3 mb-3">
          <Card.Body>
            <Button variant="primary" onClick={handleAddProduct}>
              ➕ Add Product
            </Button>
          </Card.Body>
        </Card>
        <Row className="mb-3">
          <Col md={12}>
            <Card className="shadow-sm p-3">
              <Card.Body>
                <h6>Add New Product</h6>
                <Form>
                  <Row>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter product name"
                          value={editProduct.name}
                          onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter price"
                          value={editProduct?.price || ""}  // Use an empty string as fallback
                          onChange={(e) => {
                            const price = parseFloat(e.target.value);  // Convert to number
                            setEditProduct({ ...editProduct!, price: isNaN(price) ? 0 : price });  // Handle invalid input
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter category"
                          value={editProduct.category}
                          onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter image URL"
                          value={editProduct.image}
                          onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col className="text-end">
                      <Button variant="primary" onClick={handleAddProduct}>
                        Add Product
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Product List */}
        <Row className="mb-3">
          <Col md={12}>
            <Card className="shadow-sm p-3">
              <Card.Body>
                <h6>Product List</h6>

                {loading && <p>Loading...</p>}
                {error && <p className="text-danger">{error}</p>}

                {products.length === 0 ? (
                  <p className="text-muted">No products added yet.</p>
                ) : (
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => {
                        const price = parseFloat(product.price);
                        // const price = product.price;
                        return (
                          <tr
                            key={product.id}
                            onClick={() => setEditProduct(product)}
                            style={{ cursor: "pointer" }}
                          >
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>
                              {/* Check if the price is a valid number before displaying */}
                              {isNaN(price) ? 'Invalid price' : `$${price.toFixed(2)}`}
                            </td>
                            <td>{product.category}</td>
                            <td>
                              {product.image ? (
                                <img
                                  src={`http://localhost:5000/${product.image}`}
                                  alt={product.name}
                                  width="50"
                                />
                              ) : (
                                "No Image"
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* <Row className="mb-3">
          <Col md={12}>
            <Card className="shadow-sm p-3">
              <Card.Body>
                <h6>Product List</h6>
                {products.length === 0 ? (
                    <p className="text-muted">No products added yet.</p>
                  ) : (
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Product Name</th>
                          <th>Price</th>
                          <th>Category</th>
                          <th>Image</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} onClick={() => setEditProduct(product)} style={{ cursor: "pointer" }}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>
                              <img src={product.image} alt={product.name} width="50" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row> */}

        {/* Add Product Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  <option value="coffee">Coffee</option>
                  <option value="cake">Cake</option>
                  <option value="beverages">Beverages</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="success" onClick={handleSaveProduct}>
              Save Product
            </Button>
          </Modal.Footer>
        </Modal>


        {/* <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="success" onClick={handleSaveProduct}>
              Save Product
            </Button>
          </Modal.Footer>
        </Modal> */}
      </Container>
    </div>
  );
};

export default Products;
