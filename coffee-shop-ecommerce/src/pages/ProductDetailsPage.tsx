import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductType } from '../types/Product';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    // Simulating fetching product data
    if (id === '1') {
      setProduct({
        id: '1',
        name: 'Espresso',
        price: 3.5,
        image: 'https://via.placeholder.com/150',
        description: 'Strong and rich coffee.',
      });
    } else if (id === '2') {
      setProduct({
        id: '2',
        name: 'Cappuccino',
        price: 4.0,
        image: 'https://via.placeholder.com/150',
        description: 'Coffee with steamed milk and a layer of foam.',
      });
    } else if (id === '3') {
      setProduct({
        id: '3',
        name: 'Latte',
        price: 4.5,
        image: 'https://via.placeholder.com/150',
        description: 'Coffee with steamed milk.',
      });
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ width: '200px' }} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button className="btn btn-primary">Add to Cart</button>
    </div>
  );
};

export default ProductDetailsPage;
