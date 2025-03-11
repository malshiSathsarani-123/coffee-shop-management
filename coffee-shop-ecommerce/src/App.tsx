import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/AppNavbar';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Cake from './pages/Cake';
import ProductDetailsPage from './pages/ProductDetailsPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cake" element={<Cake />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
