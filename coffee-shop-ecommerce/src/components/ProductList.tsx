import React, { useEffect, useState } from 'react';
import Product from './Product';
import { ProductType } from '../types/Product';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    // Simulating fetching data from an API
    setProducts([
      {
        id: '1',
        name: 'Espresso',
        price: 3.5,
        image: 'https://via.placeholder.com/150',
      },
      {
        id: '2',
        name: 'Cappuccino',
        price: 4.0,
        image: 'https://via.placeholder.com/150',
      },
      {
        id: '3',
        name: 'Latte',
        price: 4.5,
        image: 'https://via.placeholder.com/150',
      },
    ]);
  }, []);

  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-md-4" key={product.id}>
          <Product product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
