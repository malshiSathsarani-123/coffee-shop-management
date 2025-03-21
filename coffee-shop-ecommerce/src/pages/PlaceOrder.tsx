import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PlaceOrder = () => {
  const location = useLocation();
  const [rememberCard, setRememberCard] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const { cart, total }: { cart: CartItem[]; total: number } = location.state || { cart: [], total: 0 };
  const navigate = useNavigate();

  interface PaymentInfo {
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
    rememberCard: boolean;
  }

  interface CustomerInfo {
    name: string;
    address: string;
    contact: string;
    payment: PaymentInfo;
  }

  interface CartItem {
    name: string;
    quantity: number;
    price: number;
    id: string;
  }

  const [formData, setFormData] = useState<CustomerInfo>({
    name: "",
    address: "",
    contact: "",
    payment: {
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      rememberCard: false,
    },
  });

  const handleDateChange = (date: Date | null) => {
    setExpiryDate(date);
    if (date) {
      const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear().toString().slice(-2)}`;
      setFormData((prev) => ({
        ...prev,
        payment: { ...prev.payment, expiry: formattedDate },
      }));
    }
  };
  // useEffect(() => {
  //   const isValid =
  //     formData.name.trim() !== "" &&
  //     formData.address.trim() !== "" &&
  //     formData.contact.trim() !== "" &&
  //     formData.payment.cardName.trim() !== "" &&
  //     formData.payment.cardNumber.trim() !== "" &&
  //     formData.payment.expiry.trim() !== "" &&
  //     formData.payment.cvv.trim() !== "";

  //   setIsFormValid(isValid);
  // }, [formData]);

  useEffect(() => {
    const isValid =
      formData.name.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.contact.trim() !== "" &&
      formData.payment.cardName.trim() !== "" &&
      /^\d{16}$/.test(formData.payment.cardNumber.trim()) && 
      formData.payment.expiry.trim() !== "" &&
      /^\d{3}$/.test(formData.payment.cvv);
  
    setIsFormValid(isValid);
  }, [formData]);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === "rememberCard") {
      setRememberCard(checked);
      setFormData((prev) => ({
        ...prev,
        payment: { ...prev.payment, rememberCard: checked },
      }));
    } else if (["cardName", "cardNumber", "expiry", "cvv"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        payment: { ...prev.payment, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const orderData = {
      totalPrice: total,
      customerName: formData.name,
      customerAddress: formData.address,
      customerContact: formData.contact,
      orderItems: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    

    try {
      const response = await axios.post("http://localhost:5000/api/order/save", orderData);
      Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: `Order ID: ${response.data.orderId}`,
      }).then(() => {
        navigate(`/`);
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        Swal.fire({
          icon: "error",
          title: "Order Failed!",
          text: error.response?.data?.message || error.message,
        });
      } else if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Order Failed!",
          text: error.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Unknown Error",
          text: "An unknown error occurred",
        });
      }
    }
      
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="text-success">YourCompany</h2>
        <h4 className="bg-light py-2">Online Order Form</h4>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-4">
              <h5 className="mb-3">Cart Details</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.map((item: CartItem, index: number) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>RS. {item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-light p-2 d-flex justify-content-between">
                <h5 className="fw-bold">My Total:</h5>
                <h5 className="fw-bold">RS. {total}</h5>
              </div>
              <div className="mb-4">
                <h5 className="mb-3">Billing Details</h5>
                <input type="text" className="form-control mb-3" name="name" placeholder="Full Name" onChange={handleInputChange} required />
                <input type="text" className="form-control mb-3" name="address" placeholder="Billing Address" onChange={handleInputChange} required />
                <input type="text" className="form-control mb-3" name="contact" placeholder="Contact Number" onChange={handleInputChange} required />
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h1 className="fw-bold">RS: {total}.00</h1>
                  <input type="text" className="form-control mb-3" name="cardName" placeholder="Name on card" onChange={handleInputChange} required />
                  <input type="text" className="form-control mb-3" name="cardNumber" placeholder="Card Number" onChange={handleInputChange} required />
                  <div className="row mb-3">
                    <div className="col-6">
                    <DatePicker
                        selected={expiryDate}
                        onChange={handleDateChange}
                        dateFormat="MM/yy"
                        showMonthYearPicker
                        className="form-control"
                        placeholderText="MM/YY"
                      />
                      {/* <input type="text" className="form-control" name="expiry" placeholder="MM/YY" onChange={handleInputChange} required /> */}
                    </div>
                    <div className="col-6">
                      <input type="text" className="form-control" name="cvv" placeholder="CVV" onChange={handleInputChange} required />
                    </div>
                  </div>
                  <button type="submit" className={`btn btn-lg w-100 mb-3 ${isFormValid ? "btn-warning" : "btn-secondary"}`} disabled={!isFormValid}>
                    Pay
                  </button>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rememberCard" checked={rememberCard} onChange={handleInputChange} />
                    <label className="form-check-label text-muted" htmlFor="rememberCard">
                      Remember my card
                    </label>
                  </div>
                  <div className="text-center mt-4">
                    <div className="dropdown">
                      <button className="btn btn-light dropdown-toggle" type="button">
                        <i className="fas fa-globe me-2"></i> English
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">English</a></li>
                        <li><a className="dropdown-item" href="#">සිංහල</a></li>
                        <li><a className="dropdown-item" href="#">தமிழ்</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
