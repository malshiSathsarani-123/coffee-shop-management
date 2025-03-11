import React, { useState, MouseEvent } from 'react';
import { Button, Popover, Overlay, ListGroup } from 'react-bootstrap';
import { FaListUl, FaTimes, FaBirthdayCake,FaCoffee, FaCookie,FaMugHot, FaHamburger,FaGlassMartiniAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 

interface CategoriesDropdownProps {
  className?: string;
}

const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({ className }) => {
  const [show, setShow] = useState<boolean>(false);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  
  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setShow(!show);
    setTarget(event.currentTarget);
  };

const categories = [
  { name: "Coffee", icon: <FaCoffee className="text-warning" />,path: '/coffee' },
  { name: "Tea", icon: <FaMugHot className="text-success" /> , path: '/coffee'},
  { name: "Beverages", icon: <FaGlassMartiniAlt className="text-success" />,path: '/coffee' },
  { name: "Snacks", icon: <FaHamburger className="text-warning" />,path: '/coffee' },
  { name: "Cake", icon: <FaBirthdayCake className="text-danger" />,path: '/cake' },
  { name: "Coffee Beans & Merchandise", icon: <FaCookie className="text-brown" />,path: '/coffee' }, 
];

  return (
    <>
      <Button 
        variant="primary" 
        className={`d-flex align-items-center ${className || ''}`}
        onClick={handleClick}
      >
        {show ? <FaTimes className="me-2" /> : <FaListUl className="me-2" />}
        All Categories
        <span className="ms-2">{show ? '▲' : '▼'}</span>
      </Button>

      <Overlay
        show={show}
        target={target}
        placement="bottom-start"
        container={document.body}
        rootClose
        onHide={() => setShow(false)}
      >
        <Popover id="categories-popover" style={{ maxWidth: '300px', minWidth: '250px' }}>
          <Popover.Body className="p-0">
            <ListGroup variant="flush">
              {categories.map((category, index) => (
                <Link to={category.path} className="text-decoration-none"> 
                <ListGroup.Item 
                  key={index}
                  action
                  className="d-flex align-items-center py-3"
                >
                  <div className="me-3 rounded-circle bg-light d-flex align-items-center justify-content-center" 
                       style={{ width: '40px', height: '20px' }} >
                    {category.icon}
                  </div>
                  {category.name}
                </ListGroup.Item>
                </Link>    
              ))}
            </ListGroup>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
};

export default CategoriesDropdown;