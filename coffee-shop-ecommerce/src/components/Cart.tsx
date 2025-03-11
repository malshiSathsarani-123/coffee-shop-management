// import React, { useState } from 'react';
import { ProductType } from '../types/Product';

interface CartProps {
  cartItems: ProductType[];
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemove }) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h3>Your Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                <div className="d-flex">
                  <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
                  <div>
                    <h5>{item.name}</h5>
                    <p>${item.price}</p>
                  </div>
                </div>
                <button className="btn btn-danger" onClick={() => onRemove(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <h5>Total: ${totalPrice.toFixed(2)}</h5>
            <button className="btn btn-primary">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
