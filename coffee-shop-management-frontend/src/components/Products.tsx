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
    subCategory:"",
    image: "",
  }); 
  
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({} as Product);

  const [newProduct, setNewProduct] = useState<{
    name: string;
    category: string;
    subCategory: string;
    price: number;
    image: File | null; 
  }>({
    name: '',
    category: '',
    subCategory:'',
    price: 0,
    image: null,  
  });
  
  interface Product {
    _id?: string;  
    id: string;
    name: string;
    price: number;
    category: string;
    subCategory:string,
    image: string;
  }
  const categoryData: Record<string, string[]> = {
    coffee: ["Espresso", "Latte", "Cappuccino", "Mocha", "Cold Brew", "Iced Coffee", "Specialty Coffee", "Organic Coffee"],
    tea: ["Green Tea", "Black Tea", "Herbal Tea", "Iced Tea", "Chai Tea", "Specialty Tea", "Organic Tea"],
    cake: ["Chocolate Cakes", "Fruit Cakes", "Cake And Flower", "Gift Set And Cake", "Choco Gift And Cake", "Premium Cakes", "Birthday Cakes", "Wedding Cakes"],
    beverages: ["All Beverages", "Smoothies", "Juices", "Organic Beverages"],
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
        const response = await fetch("http://localhost:5000/api/coffeeProduct/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: selectedProduct.id, 
                name: selectedProduct.name,
                price: selectedProduct.price,
                image: selectedProduct.image,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to update product");
        }

        await response.json();
        fetchProducts()
        alert("Product updated successfully!");
        setShowUpdateModal(false);
    } catch (error) {
        console.error("Error updating product:", error);
        alert("Error updating product. Please try again.");
    }
};

  

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setNewProduct({
      ...newProduct,
      category: selectedCategory,
      subCategory: "" // Reset subcategory when category changes
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:5000/api/coffeeProduct/delete/${id}`);
      fetchProducts();  
      alert(response.data.message);
    } catch (error) {
      alert("Error deleting product. Please try again.");
    }
  };
  
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/coffeeProduct/get");
      
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
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => {
                        const price = parseFloat(product.price);
                        return (
                          <tr key={product.id} style={{ cursor: "pointer" }}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{isNaN(price) ? 'Invalid price' : `${price.toFixed(2)}`}</td>
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
                              className="btn btn-primary btn-sm me-2"
                              onClick={() => handleEdit(product)}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
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
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
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
        <Form.Label>Category</Form.Label>
        <Form.Select
          value={selectedProduct?.category || ""}
          onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {Object.keys(categoryData).map((category) => (
            <option key={category} value={category}>
              {category.replace(/-/g, " ")}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {selectedProduct?.category && (
        <Form.Group className="mb-3">
          <Form.Label>Sub Category</Form.Label>
          <Form.Select
            value={selectedProduct?.subCategory || ""}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, subCategory: e.target.value })}
          >
            <option value="">Select Subcategory</option>
            {categoryData[selectedProduct?.category]?.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter price"
          value={selectedProduct?.price || ""}
          onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Product Image</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />
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
