import React from "react";
import { Container, Row, Col, Card, Table, Navbar } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const dashboardStats = {
  totalOrders: 21375,
  newCustomers: 1012,
  totalSales: "24,254",
  orderGrowth: "↑ 12.5%",
  customerGrowth: "↑ 6.8%",
  salesGrowth: "↑ 9.2%",
};

const trendingCoffee = [
  { name: "☕ Cappuccino", price: "1200", orders: 240 },
  { name: "☕ Latte", price: "450", orders: 210 },
  { name: "☕ Frappuccino", price: "600", orders: 180 },
  { name: "☕ Mocha", price: "550", orders: 160 },
];

const salesLabels = ["9 AM", "12 PM", "3 PM", "6 PM", "9 PM", "12 AM"];
const salesValues = [100, 200, 300, 250, 150, 200];

const salesData = {
  labels: salesLabels,
  datasets: [
    {
      label: "Sales",
      data: salesValues,
      borderColor: "#ff8c42",
      backgroundColor: "rgba(255, 140, 66, 0.2)",
      borderWidth: 2,
    },
  ],
};

const Dashboard: React.FC = () => {
  const { isAuthenticated , currentUserEmail} = useAuth();
  if (!isAuthenticated) {
    return <p className="text-center mt-5">Please log in to access the dashboard.</p>;
  }
  return (
    <div className="d-flex">
     <Sidebar />

      {/* Main Dashboard */}
      <Container fluid style={{ padding: 0, marginLeft:"10px", width: "75vw" }}>

        {/* Top Navbar */}
        <div className="border p-1 bg-light">
          <Navbar expand="lg" className="mb-3">
            <Navbar.Brand>
              <h2 style={{color:"#004d40"}}>Welcome to Brave Havens</h2>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Admin: <strong>{currentUserEmail}</strong>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        </div>

        {/* Dashboard Stats */}
        <Row className="mb-3">
          <Col md={4} >
            <Card className="shadow-sm p-3">
              <Card.Body>
                <h6>Total Orders</h6>
                <h2>{dashboardStats.totalOrders}</h2>
                <p className="text-success">{dashboardStats.orderGrowth}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm p-3">
              <Card.Body>
                <h6>New Customers</h6>
                <h2>{dashboardStats.newCustomers}</h2>
                <p className="text-success">{dashboardStats.customerGrowth}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm p-3">
              <Card.Body>
                <h6>Total Sales</h6>
                <h2>{dashboardStats.totalSales}</h2>
                <p className="text-success">{dashboardStats.salesGrowth}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Sales Analytics */}
        <Row className="mb-3">
          <Col md={8}>
            <Card className="shadow-sm p-3">
              <Card.Body>
                <h6>Sales Analytics</h6>
                <Line data={salesData} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm p-3">
              <Card.Body>
                <h6>Trending Coffee</h6>
                <Table borderless size="sm">
                  <tbody>
                    {trendingCoffee.map((coffee, index) => (
                      <tr key={index}>
                        <td>{coffee.name}</td>
                        <td>{coffee.price}</td>
                        <td>{coffee.orders}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Orders */}
        {/* <Row>
          <Col md={12}>
            <Card className="shadow-sm p-3">
              <Card.Body>
                <h6>Recent Orders</h6>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Items</th>
                      <th>Date & Time</th>
                      <th>Table Number</th>
                      <th>Price</th>
                      <th>Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.item}</td>
                        <td>{order.date}</td>
                        <td>{order.table}</td>
                        <td>{order.price}</td>
                        <td>{order.payment}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
      </Container>
    </div>
  );
};

export default Dashboard;
