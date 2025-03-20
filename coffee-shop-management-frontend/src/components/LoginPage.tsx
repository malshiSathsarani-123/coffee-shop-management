import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"; 
import { Link } from "react-router-dom";

const LoginPage = () => {  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/dashboard"); 
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid credentials!.",
      })
    }
  };
  return (
    <div className="container-fluid vh-100 vw-100 d-flex align-items-center justify-content-center" style={{ background: "#f0f2f5" }}>
      <div className="row w-100 h-100 shadow-lg rounded-0 overflow-hidden" style={{ maxWidth: "1200px" }}>
        {/* Left Side */}
        <div className="col-md-6 text-white text-center d-flex flex-column justify-content-center align-items-center p-5" 
          style={{ background: "linear-gradient(135deg, #004d40, #00796b)" }}>
          <img src="../assets/react.svg" alt="blueflame" className="mb-3" style={{ width: "60px" }} />
          <h2 className="fw-bold">Welcome Back!</h2>
          <p className="mt-2" style={{ fontSize: "14px" }}>To stay connected with us, please login with your personal info</p>
          <button className="btn btn-outline-light mt-3 px-4 py-2 rounded-pill">SIGN IN</button>
        </div>

        {/* Right Side */}
        <div className="col-md-6 bg-white d-flex flex-column justify-content-center align-items-center p-5">
          <h2 className="text-success fw-bold">Welcome</h2>
          <p className="text-muted mb-4">Login into your account to continue</p>
          <form onSubmit={handleLogin} style={{ width: "80%" }}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control rounded-pill px-3 py-2"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control rounded-pill px-3 py-2"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p className="text-end">
              <a href="#" className="text-muted text-decoration-none">Forgot your password?</a>
            </p>
            <button type="submit" className="btn btn-success w-100 py-2 rounded-pill">LOG IN</button>
          </form>
          <p className="mt-3" style={{ fontSize: "14px" }}>
            Don't have an account? <Link to="/register" className="text-success">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
