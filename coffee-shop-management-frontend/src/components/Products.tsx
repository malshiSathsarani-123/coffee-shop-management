import React, { useState } from "react";
import { Container, Card, Table, Button, Modal, Form ,Row,Col} from "react-bootstrap";
import Sidebar from "../components/Sidebar";

const Products: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  const [editProduct, setEditProduct] = useState({
    name: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  const [products, setProducts] = useState([
    { id: 1, name: "Cappuccino", price: "$5.00", category: "Coffee" ,imageUrl : ""},
    { id: 2, name: "Latte", price: "$4.50", category: "Coffee" ,imageUrl : ""},
    { id: 3, name: "Donut", price: "$2.00", category: "Snack" ,imageUrl : ""},
  ]);

  const handleAddProduct = () => {
    setShowModal(true);
  };

  const handleSaveProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      setProducts([...products, { id: products.length + 1, ...newProduct }]);
      setNewProduct({ name: "", price: "", category: "",imageUrl: "" });
      setShowModal(false);
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
                          onChange={(e) => setEditProduct({ ...newProduct, name: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter price"
                          value={editProduct.price}
                          onChange={(e) => setEditProduct({ ...newProduct, price: e.target.value })}
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
                          onChange={(e) => setEditProduct({ ...newProduct, category: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter image URL"
                          value={editProduct.imageUrl}
                          onChange={(e) => setEditProduct({ ...newProduct, imageUrl: e.target.value })}
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
                              <img src={product.imageUrl} alt={product.name} width="50" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

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
        </Modal>
      </Container>
    </div>
  );
};

export default Products;
