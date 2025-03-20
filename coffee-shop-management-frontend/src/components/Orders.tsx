import React, { useEffect, useState } from "react";
import { Container, Card, Button, Table , Modal, Form ,Row,Col} from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import axios from 'axios';
import Swal from "sweetalert2";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [showModal, setShowModal] = useState(false);

  interface Order {
    _id?: string;  
    id: string;
    totalPrice: number;
    customerName: string,
    customerAddress: string,
    customerContact: string,
    status: string;
    createdAt:Date,
  }

  interface OrderItem {
    _id?: string;  
    orderId: string;
    productId:string,
    quantity: number;
    price: number;
  }

  const handleOrder = async (order:any) => {
    console.log(order.status)
    Swal.fire({
      icon: "info",
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }
    });
    try {
      const id = order.id;
      const status = "deliverd";
      const response = await axios.put(`http://localhost:5000/api/order/updateStatus/${id}/${status}`);
      setOrderItems(response.data);
    } catch (err) {
      setError("Failed to fetch orders details.");
    } finally {
      setLoading(false);
    }
  };

  const viewOrder = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/order/orderById/${id}`)
      setOrderItems(response.data);
      setShowModal(true)
    } catch (err) {
      setError("Failed to fetch orders details.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/order/getAll")
      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid className="p-4" style={{ width: "78vw" }}>
        <h3 className="mb-3"> Order Management</h3>
        {/* Order List */}
        <Row className="mb-3">
          <Col md={12}>
            <Card className="shadow-sm p-3">
              <Card.Body>
                <h6>Order List</h6>
                {loading && <p>Loading...</p>}
                {error && <p className="text-danger">{error}</p>}
                {orders.length === 0 ? (
                  <p className="text-muted">No orders added yet.</p>
                ) : (
                    <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Order Id</th>
                        <th>Date & Time</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Customer Details</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td>{order.totalPrice}</td>
                          <td>{order.status}</td>
                          <td>{order.customerName}<br/>
                          {order.customerAddress}<br/>
                          {order.customerContact}
                          </td>
                          <td className="d-flex flex-column">
                            <button 
                                className="btn btn-outline-success m-1 btn-sm"
                                onClick={() => viewOrder(order.id)}
                            >
                                View
                            </button>
                            <button
                                className="btn btn-outline-info m-1 btn-sm"
                                onClick={() => handleOrder(order)}
                                disabled={order.status == "deliverd"}
                            >
                                Deliver
                            </button>
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

        {/* View Order Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderItems.map((item, index) => (
                        <tr key={index}>
                        <td>{item.productId}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Orders;
