// export default Sidebar;
import React from 'react';
import { 
  BsHouseFill, 
  BsBoxFill, 
  BsCartFill, 
  BsCreditCard2Front
} from 'react-icons/bs';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  hasChildren?: boolean;
}

const SidebarItem = ({ icon, text, to, hasChildren = false }: SidebarItemProps) => {

  const navigate = useNavigate();

  return (
    <div 
      className="sidebar-item d-flex align-items-center py-3 px-4 cursor-pointer" 
      onClick={() => navigate(to)}
      style={{ cursor: "pointer" }}
    >
      <div className="icon-container me-3" style={{ color: '#004d40' }}>
        {icon}
      </div>
      <span className="fw-medium flex-grow-1" style={{ color: '#004d40' }}>{text}</span>
      {hasChildren && <FiChevronRight />}
    </div>
  );
};

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  return (
    <div className="sidebar bg-white shadow-sm" style={{ width: '20vw', height: '100vh' }}>
      <div className="sidebar-header p-3 mb-3">
        <h4 className="mb-4">☕ <strong>Coffee Shop</strong></h4>
      </div>

      <div className="sidebar-content">
        <SidebarItem icon={<BsHouseFill size={18} />} text="Dashboard" to="/dashboard" />
        <SidebarItem icon={<BsBoxFill size={18} />} text="Products" to="/products" />
        <SidebarItem icon={<BsCartFill size={18} />} text="Orders" to="/orders" />
        <SidebarItem icon={<BsCreditCard2Front size={18} />} text="Payments" to="/payment" />
      </div>

      <div className="sidebar-footer p-3 mt-auto position-absolute bottom-0" style={{ width: '20vw' }}>
        <button className="btn btn-primary w-100 py-2" style={{ backgroundColor: '#004d40', borderColor: '#004d40' }}
        onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
