import React, { useState } from 'react';
import { ProductType } from '../types/Product';

interface ProductDetailsProps {
  product: ProductType;
  onAddToCart: (product: ProductType) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ width: '300px' }} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>

      <div className="d-flex align-items-center">
        <label className="me-2">Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="form-control w-25"
        />
      </div>

      <button className="btn btn-primary mt-3" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
