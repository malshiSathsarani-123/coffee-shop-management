// import { useCart } from "../context/CartContext";

// const Cart = () => {
//   const { cart, removeFromCart, updateQuantity } = useCart();

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
//   };

//   return (
//     <div className="container my-4">
//       <h1 className="mb-4">Shopping Cart</h1>
      
//       {cart.length > 0 ? (
//         <>
//           <div className="row mb-3 fw-bold border-bottom pb-2">
//             <div className="col-md-4">Product</div>
//             <div className="col-md-2 text-end">Available Qty</div>
//             <div className="col-md-2 text-end">Quantity</div>
//             <div className="col-md-2 text-end">Price</div>
//             <div className="col-md-2 text-end">Actions</div>
//           </div>
          
//           {cart.map((item, index) => (
//             <div key={index} className="row mb-4 pb-4 border-bottom align-items-center">
//               <div className="col-md-4 d-flex align-items-center">
//                 <img 
//                   src={`http://localhost:5000/${item.image}`} 
//                   alt={item.name} 
//                   className="img-fluid me-3" 
//                   style={{ maxWidth: "120px" }}
//                 />
//                 <h5 className="mb-0">{item.name}</h5>
//               </div>

//               <div className="col-md-2 text-end" >
//                 <span className="fw-bold">{item.qty.toLocaleString()}</span>
//               </div>
              
//               <div className="col-md-2 text-end">
//                 <div className="input-group">
//                   <button 
//                     className="btn btn-outline-secondary"
//                     type="button"
//                     onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
//                   >
//                     -
//                   </button>
//                   <input 
//                     type="text" 
//                     className="form-control text-center" 
//                     value={item.quantity || 1}
//                     readOnly
//                   />
//                   <button 
//                     className="btn btn-outline-secondary"
//                     type="button"
//                     onClick={() => updateQuantity(item.id, Math.min(item.qty, (item.quantity || 1) + 1))}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
              
//               <div className="col-md-2 text-end">
//                 <span className="fw-bold">RS. {item.price.toLocaleString()}</span>
//               </div>
              
//               <div className="col-md-2 text-end">
//                 <button 
//                   className="btn btn-link text-danger p-0"
//                   onClick={() => removeFromCart(item.id)}
//                 >
//                   <i className="bi bi-trash"></i> Remove
//                 </button>
//               </div>
//             </div>
//           ))}
          
//           <div className="row justify-content-end">
//             <div className="col-md-6">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="d-flex justify-content-between mb-3">
//                     <h5 className="card-title">Total:</h5>
//                     <h5>RS. {calculateTotal().toLocaleString()}</h5>
//                   </div>
//                   <button className="btn btn-primary w-100">Proceed to Checkout</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className="row">
//           <div className="col">
//             <div className="alert alert-info">
//               <p className="mb-0">Your cart is empty</p>
//             </div>
//             <a href="/" className="btn btn-primary">Continue Shopping</a>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate(); // Instantiate useNavigate hook

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const handleProceedToCheckout = () => {
    // Assuming you want to pass the cart details and total price to the next page
    navigate('/placeOrder', { state: { cart, total: calculateTotal() } });
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Shopping Cart</h1>
      
      {cart.length > 0 ? (
        <>
          <div className="row mb-3 fw-bold border-bottom pb-2">
            <div className="col-md-4">Product</div>
            <div className="col-md-2 text-end">Available Qty</div>
            <div className="col-md-2 text-end">Quantity</div>
            <div className="col-md-2 text-end">Price</div>
            <div className="col-md-2 text-end">Actions</div>
          </div>
          
          {cart.map((item, index) => (
            <div key={index} className="row mb-4 pb-4 border-bottom align-items-center">
              <div className="col-md-4 d-flex align-items-center">
                <img 
                  src={`http://localhost:5000/${item.image}`} 
                  alt={item.name} 
                  className="img-fluid me-3" 
                  style={{ maxWidth: "120px" }}
                />
                <h5 className="mb-0">{item.name}</h5>
              </div>

              <div className="col-md-2 text-end" >
                <span className="fw-bold">{item.qty.toLocaleString()}</span>
              </div>
              
              <div className="col-md-2 text-end">
                <div className="input-group">
                  <button 
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                  >
                    -
                  </button>
                  <input 
                    type="text" 
                    className="form-control text-center" 
                    value={item.quantity || 1}
                    readOnly
                  />
                  <button 
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => updateQuantity(item.id, Math.min(item.qty, (item.quantity || 1) + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="col-md-2 text-end">
                <span className="fw-bold">RS. {item.price.toLocaleString()}</span>
              </div>
              
              <div className="col-md-2 text-end">
                <button 
                  className="btn btn-link text-danger p-0"
                  onClick={() => removeFromCart(item.id)}
                >
                  <i className="bi bi-trash"></i> Remove
                </button>
              </div>
            </div>
          ))}
          
          <div className="row justify-content-end">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="card-title">Total:</h5>
                    <h5>RS. {calculateTotal().toLocaleString()}</h5>
                  </div>
                  <button 
                    className="btn btn-primary w-100" 
                    onClick={handleProceedToCheckout} // Trigger navigation
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="row">
          <div className="col">
            <div className="alert alert-info">
              <p className="mb-0">Your cart is empty</p>
            </div>
            <a href="/" className="btn btn-primary">Continue Shopping</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
