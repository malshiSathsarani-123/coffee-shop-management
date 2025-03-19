import React, { useEffect, useState } from "react";
import { Container, Card, Table, Button, Modal, Form ,Row,Col} from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import axios from 'axios';
import "./styles.css"; 

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({} as Product);
  const token = localStorage.getItem("token");
  const [newProduct, setNewProduct] = useState<{
    name: string;
    category: string;
    subCategory: string;
    price: number;
    qty: number;
    image: File | null; 
  }>({
    name: '',
    category: '',
    subCategory:'',
    price: 0,
    qty:0,
    image: null,  
  });
  
  interface Product {
    _id?: string;  
    id: string;
    name: string;
    price: number;
    qty: number;
    category: string;
    subCategory:string,
    image: string | File; 
  }
  const categoryData: Record<string, string[]> = {
    coffee: ["Espresso", "Latte", "Cappuccino", "Mocha", "Cold Brew", "Iced Coffee", "Specialty Coffee", "Organic Coffee"],
    cake: ["Chocolate Cakes", "Fruit Cakes", "Cake And Flower", "Gift Set And Cake", "Choco Gift And Cake", "Premium Cakes", "Birthday Cakes", "Wedding Cakes"],
    beverages: ["Smoothies", "Juices", "Organic Beverages"],
    snacks: ["Salty Snacks", "Sweet Snacks", "Crisps & Chips", "Cookies & Biscuits", "Nuts & Dry Fruits", "Healthy Snacks"],
    "coffee-beans-merchandise": ["Coffee Beans", "Coffee Accessories", "Merchandise"]
  };
  

  const handleEdit = (product:any) => {
    setSelectedProduct(product);
    setShowUpdateModal(true); 
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    try {
        const formData = new FormData();
        formData.append("id", selectedProduct.id);
        formData.append("name", selectedProduct.name);
        formData.append("price", selectedProduct.price.toString());
        formData.append("qty", selectedProduct.qty.toString());

        if (selectedProduct.image instanceof File) {
            formData.append("image", selectedProduct.image);
        }

        const response = await fetch("http://localhost:5000/api/coffeeProduct/update", {
            method: "PUT",
            body: formData,
            headers: { Authorization: `Bearer ${token}` }, 
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to update product");
        }
        fetchProducts();
        alert("Product updated successfully!");
        setShowUpdateModal(false);
    } catch (error) {
        alert("Error updating product. Please try again.");
    }
  };


  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setNewProduct({
      ...newProduct,
      category: selectedCategory,
      subCategory: "" 
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
  
    if (!token) {
      alert("Authentication token is missing.");
      return;
    }
  
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/coffeeProduct/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.status === 200) {
        fetchProducts();  
        alert(response.data.message);
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert(`Error: ${error.response.data.message || "Something went wrong."}`);
        } else if (error.request) {
          alert("No response from server. Please try again later.");
        }
      } else {
        alert("Error: " + (error instanceof Error ? error.message : "An unknown error occurred."));
      }
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/coffeeProduct/get")
      
      setProducts(response.data.response);
    } catch (err) {
      setError("Failed to fetch products.");
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
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setSelectedProduct((prev) => ({
            ...prev,
            image: file,  
        }));
    }
  };

  const handleSaveProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.category) {
      alert("Please fill all required fields!");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("category", newProduct.category);
    formData.append("subCategory", newProduct.subCategory);
    formData.append("price", newProduct.price.toString());
    formData.append("image", newProduct.image); 
  
    try {
      const response = await axios.post("http://localhost:5000/api/coffeeProduct/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });
        fetchProducts();
        alert(response.data.message);
        setShowModal(false);
      } catch (error) {
        alert("Failed to save product");
      }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid className="p-4" style={{ width: "78vw" }}>
        <h1 className="mb-3">☕ Product Management</h1>
        <Card className="shadow-sm p-3 mb-3">
          <Card.Body>
            <Button variant="primary" onClick={handleAddProduct}>
              ➕ Add Product
            </Button>
          </Card.Body>
        </Card>

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
                        <th>Price
                          (Rs)</th>
                        <th>Qty</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => {
                        return (
                          <tr key={product.id} style={{ cursor: "pointer" }}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.qty}</td>
                          <td>{product.category}</td>
                          <td>{product.subCategory}</td>
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
                          <td>
                            <button
                              className="btn btn-outline-info m-1 btn-sm me-2"
                              onClick={() => handleEdit(product)}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-outline-danger m-1 btn-sm"
                              onClick={() => handleDelete(product.id)}
                            >
                              Delete
                            </button>
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
                <Form.Select value={newProduct.category} onChange={handleCategoryChange}>
                  <option value="">Select Category</option>
                  {Object.keys(categoryData).map((category) => (
                    <option key={category} value={category}>{category.replace(/-/g, " ")}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              {newProduct.category && (
              <Form.Group className="mb-3">
                <Form.Label>Sub Category</Form.Label>
                <Form.Select
                  value={newProduct.subCategory}
                  onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })}
                >
                <option value="">Select Subcategory</option>
                {categoryData[newProduct.category]?.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                    ))}
                </Form.Select>
              </Form.Group>
              )}
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: Number(e.target.value) })
                }
              />
              <Form.Group className="mb-3">
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e as React.ChangeEvent<HTMLInputElement>)} 
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

        {/*Update Product Modal */}
        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct ? "Update Product" : "Add New Product"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={selectedProduct?.name || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={selectedProduct?.price || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, price: Number(e.target.value) })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Qty</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Qty"
                  value={selectedProduct?.qty || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, qty: Number(e.target.value) })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Product Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={(e) => handleFileChange(e as React.ChangeEvent<HTMLInputElement>)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
              Close
            </Button>
            <Button variant="success" onClick={handleUpdateProduct}>
            Update Product
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Products;
