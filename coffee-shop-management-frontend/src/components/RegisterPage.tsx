import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [role, setRole] = useState(""); 
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData = {
      name,
      email,
      password,
      role, 
    };
    try {
      const response = await fetch("http://localhost:5000/api/users/register", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please log in.");
        navigate("/");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert("Error: " + error.message); 
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="container-fluid vh-100 vw-100 d-flex align-items-center justify-content-center" style={{ background: "#f0f2f5" }}>
      <div className="row w-100 h-100 shadow-lg rounded-0 overflow-hidden" style={{ maxWidth: "1200px" }}>
        {/* Left Side */}
        <div className="col-md-6 text-white text-center d-flex flex-column justify-content-center align-items-center p-5"
          style={{ background: "linear-gradient(135deg, #004d40, #00796b)" }}>
          <img src="../assets/react.svg" alt="blueflame" className="mb-3" style={{ width: "60px" }} />
          <h2 className="fw-bold">Join Us!</h2>
          <p className="mt-2" style={{ fontSize: "14px" }}>Create your account to enjoy our services</p>
          <button className="btn btn-outline-light mt-3 px-4 py-2 rounded-pill">SIGN UP</button>
        </div>

        {/* Right Side */}
        <div className="col-md-6 bg-white d-flex flex-column justify-content-center align-items-center p-5">
          <h2 className="text-success fw-bold">Register</h2>
          <p className="text-muted mb-4">Create a new account to get started</p>
          <form onSubmit={handleRegister} style={{ width: "80%" }}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control rounded-pill px-3 py-2"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control rounded-pill px-3 py-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control rounded-pill px-3 py-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <select
                className="form-control rounded-pill px-3 py-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success w-100 py-2 rounded-pill">REGISTER</button>
          </form>
          <p className="mt-3" style={{ fontSize: "14px" }}>
            Already have an account? <Link to="/" className="text-success">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
